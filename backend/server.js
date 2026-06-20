require("dotenv").config();

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const express = require("express");
const multer = require("multer");
const { db, hashPassword, seedAdminUser, verifyPassword } = require("./database");

const app = express();
const port = Number(process.env.PORT || 8000);
const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173,http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim().replace(/\/$/, ""))
  .filter(Boolean);

app.disable("x-powered-by");
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin.replace(/\/$/, ""))) return callback(null, true);
    return callback(new Error("Origin is not allowed by CORS"));
  },
}));
app.use(express.json({ limit: "2mb" }));

const uploadDir = process.env.UPLOAD_DIR
  ? path.resolve(process.env.UPLOAD_DIR)
  : path.join(__dirname, "uploads", "xrays");
fs.mkdirSync(uploadDir, { recursive: true });

const upload = multer({
  storage: multer.diskStorage({
    destination: uploadDir,
    filename(_req, file, callback) {
      const extension = path.extname(file.originalname).toLowerCase();
      callback(null, `${Date.now()}-${crypto.randomUUID()}${extension}`);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter(_req, file, callback) {
    if (["image/jpeg", "image/png"].includes(file.mimetype)) return callback(null, true);
    return callback(new Error("X-ray must be a JPG or PNG image"));
  },
});

const SESSION_TTL_MS = 12 * 60 * 60 * 1000;
const sessionSecret = process.env.SESSION_SECRET || "change-this-long-random-secret-before-deploying";
const validAppointmentStatuses = new Set(["pending", "confirmed", "completed", "cancelled"]);
const validRoles = new Set(["admin", "doctor", "clinic"]);

function cleanText(value, maxLength = 500) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function requiredText(value, field, maxLength = 500) {
  const cleaned = cleanText(value, maxLength);
  if (!cleaned) {
    const error = new Error(`${field} is required`);
    error.status = 400;
    throw error;
  }
  return cleaned;
}

function toInteger(value) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : null;
}

function parseJson(value, fallback) {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function publicUser(user) {
  return { id: user.id, name: user.name, email: user.email, role: user.role };
}

function mapAppointment(row) {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    preferredDate: row.preferred_date,
    preferredTime: row.preferred_time,
    type: row.type,
    description: row.description,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function issueToken(user) {
  const payload = Buffer.from(JSON.stringify({ userId: user.id, expiresAt: Date.now() + SESSION_TTL_MS }))
    .toString("base64url");
  const signature = crypto.createHmac("sha256", sessionSecret).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

function authenticate(req, res, next) {
  const token = (req.get("authorization") || "").replace(/^Bearer\s+/i, "");
  const [payload, suppliedSignature] = token.split(".");
  if (!payload || !suppliedSignature) {
    return res.status(401).json({ error: "Please sign in again" });
  }
  const expectedSignature = crypto.createHmac("sha256", sessionSecret).update(payload).digest("base64url");
  const left = Buffer.from(suppliedSignature);
  const right = Buffer.from(expectedSignature);
  if (left.length !== right.length || !crypto.timingSafeEqual(left, right)) {
    return res.status(401).json({ error: "Please sign in again" });
  }
  const session = parseJson(Buffer.from(payload, "base64url").toString("utf8"), null);
  if (!session || session.expiresAt <= Date.now()) return res.status(401).json({ error: "Please sign in again" });
  const user = db.prepare("SELECT id, name, email, role FROM users WHERE id = ?").get(session.userId);
  if (!user) return res.status(401).json({ error: "Account no longer exists" });
  req.user = user;
  next();
}

function requireAdmin(req, res, next) {
  if (req.user.role !== "admin") return res.status(403).json({ error: "Admin access is required" });
  next();
}

seedAdminUser();

app.get("/", (_req, res) => res.json({ status: "SilicoSafe backend running" }));
app.get("/api/health", (_req, res) => res.json({ status: "ok", service: "silicosafe-api" }));

app.post("/api/appointments", (req, res, next) => {
  try {
    const name = requiredText(req.body.name, "Name", 120);
    const preferredDate = requiredText(req.body.preferredDate, "Preferred date", 20);
    const type = requiredText(req.body.type, "Appointment type", 120);
    const result = db.prepare(`
      INSERT INTO appointments (name, phone, preferred_date, preferred_time, type, description)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      name,
      cleanText(req.body.phone, 40) || null,
      preferredDate,
      cleanText(req.body.preferredTime, 20) || null,
      type,
      cleanText(req.body.description, 1000) || null,
    );
    const appointment = db.prepare("SELECT * FROM appointments WHERE id = ?").get(result.lastInsertRowid);
    res.status(201).json({ appointment: mapAppointment(appointment) });
  } catch (error) {
    next(error);
  }
});

app.post("/api/auth/login", (req, res, next) => {
  try {
    const email = requiredText(req.body.email, "Email", 254).toLowerCase();
    const password = requiredText(req.body.password, "Password", 200);
    const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
    if (!user || !verifyPassword(password, user.password_salt, user.password_hash)) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    res.json({ token: issueToken(user), user: publicUser(user) });
  } catch (error) {
    next(error);
  }
});

app.get("/api/auth/me", authenticate, (req, res) => res.json({ user: publicUser(req.user) }));

app.get("/api/dashboard", authenticate, (_req, res) => {
  const totals = {
    appointments: db.prepare("SELECT COUNT(*) AS count FROM appointments").get().count,
    patients: db.prepare("SELECT COUNT(*) AS count FROM patients").get().count,
    screenings: db.prepare("SELECT COUNT(*) AS count FROM screenings").get().count,
    reports: db.prepare("SELECT COUNT(*) AS count FROM reports").get().count,
    xrays: db.prepare("SELECT COUNT(*) AS count FROM xray_uploads").get().count,
    users: db.prepare("SELECT COUNT(*) AS count FROM users").get().count,
    highRisk: db.prepare("SELECT COUNT(*) AS count FROM screenings WHERE risk_level = 'High'").get().count,
  };
  res.json({ totals });
});

app.get("/api/appointments", authenticate, (_req, res) => {
  const appointments = db.prepare("SELECT * FROM appointments ORDER BY created_at DESC, id DESC").all().map(mapAppointment);
  res.json({ appointments });
});

app.patch("/api/appointments/:id/status", authenticate, (req, res) => {
  const status = cleanText(req.body.status, 20).toLowerCase();
  if (!validAppointmentStatuses.has(status)) return res.status(400).json({ error: "Invalid appointment status" });
  const result = db.prepare("UPDATE appointments SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").run(status, req.params.id);
  if (!result.changes) return res.status(404).json({ error: "Appointment not found" });
  const appointment = db.prepare("SELECT * FROM appointments WHERE id = ?").get(req.params.id);
  res.json({ appointment: mapAppointment(appointment) });
});

app.post("/api/screenings", upload.single("xray"), (req, res, next) => {
  let transactionStarted = false;
  try {
    const payload = parseJson(req.body.payload, null);
    if (!payload || typeof payload !== "object") {
      const error = new Error("Valid screening payload is required");
      error.status = 400;
      throw error;
    }
    const patient = payload.patient || {};
    const screening = payload.screening || {};
    const report = payload.report || {};
    const xray = payload.xray || {};

    const patientName = requiredText(patient.name, "Patient name", 120);
    const clinicalScore = toInteger(screening.clinicalScore);
    const confidence = toInteger(screening.confidence);
    const riskLevel = requiredText(screening.riskLevel, "Risk level", 20);
    if (clinicalScore === null || clinicalScore < 0 || clinicalScore > 100 || confidence === null || confidence < 0 || confidence > 100) {
      const error = new Error("Screening score and confidence must be between 0 and 100");
      error.status = 400;
      throw error;
    }

    db.exec("BEGIN");
    transactionStarted = true;
    const patientResult = db.prepare(`
      INSERT INTO patients (name, age, sex, district, state)
      VALUES (?, ?, ?, ?, ?)
    `).run(
      patientName,
      toInteger(patient.age),
      cleanText(patient.sex, 30) || null,
      cleanText(patient.district, 100) || null,
      cleanText(patient.state, 100) || null,
    );
    const patientId = Number(patientResult.lastInsertRowid);

    let xrayUploadId = null;
    if (req.file) {
      const xrayResult = db.prepare(`
        INSERT INTO xray_uploads
          (patient_id, original_filename, stored_filename, file_path, mime_type, size_bytes, doctor_reviewed, doctor_findings)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        patientId,
        req.file.originalname,
        req.file.filename,
        req.file.path,
        req.file.mimetype,
        req.file.size,
        cleanText(xray.doctorReviewed, 30) || null,
        cleanText(xray.doctorFindings, 200) || null,
      );
      xrayUploadId = Number(xrayResult.lastInsertRowid);
    }

    const screeningResult = db.prepare(`
      INSERT INTO screenings
        (patient_id, clinical_score, risk_level, confidence, signals_json, form_data_json, xray_upload_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      patientId,
      clinicalScore,
      riskLevel,
      confidence,
      JSON.stringify(Array.isArray(screening.signals) ? screening.signals : []),
      JSON.stringify(payload.formData || {}),
      xrayUploadId,
    );
    const screeningId = Number(screeningResult.lastInsertRowid);
    const reportResult = db.prepare(`
      INSERT INTO reports (screening_id, report_en, report_hi)
      VALUES (?, ?, ?)
    `).run(screeningId, cleanText(report.en, 50000), cleanText(report.hi, 50000));
    const reportId = Number(reportResult.lastInsertRowid);
    db.exec("COMMIT");
    transactionStarted = false;
    res.status(201).json({ patientId, screeningId, reportId, xrayUploadId });
  } catch (error) {
    if (transactionStarted) db.exec("ROLLBACK");
    if (req.file) fs.rm(req.file.path, { force: true }, () => {});
    next(error);
  }
});

app.get("/api/patients", authenticate, (_req, res) => {
  const patients = db.prepare(`
    SELECT p.*, COUNT(s.id) AS screening_count
    FROM patients p LEFT JOIN screenings s ON s.patient_id = p.id
    GROUP BY p.id ORDER BY p.created_at DESC, p.id DESC
  `).all().map((row) => ({
    id: row.id, name: row.name, age: row.age, sex: row.sex, phone: row.phone,
    district: row.district, state: row.state, screeningCount: row.screening_count,
    createdAt: row.created_at, updatedAt: row.updated_at,
  }));
  res.json({ patients });
});

app.get("/api/screenings", authenticate, (_req, res) => {
  const screenings = db.prepare(`
    SELECT s.*, p.name AS patient_name, p.age, p.district, p.state
    FROM screenings s JOIN patients p ON p.id = s.patient_id
    ORDER BY s.created_at DESC, s.id DESC
  `).all().map((row) => ({
    id: row.id, patientId: row.patient_id, patientName: row.patient_name, age: row.age,
    district: row.district, state: row.state, clinicalScore: row.clinical_score,
    riskLevel: row.risk_level, confidence: row.confidence,
    signals: parseJson(row.signals_json, []), formData: parseJson(row.form_data_json, {}),
    xrayUploadId: row.xray_upload_id, createdAt: row.created_at,
  }));
  res.json({ screenings });
});

app.get("/api/reports", authenticate, (_req, res) => {
  const reports = db.prepare(`
    SELECT r.*, s.patient_id, p.name AS patient_name
    FROM reports r JOIN screenings s ON s.id = r.screening_id
    JOIN patients p ON p.id = s.patient_id
    ORDER BY r.created_at DESC, r.id DESC
  `).all().map((row) => ({
    id: row.id, screeningId: row.screening_id, patientId: row.patient_id,
    patientName: row.patient_name, reportEn: row.report_en, reportHi: row.report_hi,
    createdAt: row.created_at,
  }));
  res.json({ reports });
});

app.get("/api/xrays", authenticate, (_req, res) => {
  const xrays = db.prepare(`
    SELECT x.*, p.name AS patient_name FROM xray_uploads x
    LEFT JOIN patients p ON p.id = x.patient_id
    ORDER BY x.created_at DESC, x.id DESC
  `).all().map((row) => ({
    id: row.id, patientId: row.patient_id, patientName: row.patient_name,
    originalFilename: row.original_filename, storedFilename: row.stored_filename,
    mimeType: row.mime_type, sizeBytes: row.size_bytes,
    doctorReviewed: row.doctor_reviewed, doctorFindings: row.doctor_findings,
    createdAt: row.created_at,
  }));
  res.json({ xrays });
});

app.get("/api/users", authenticate, requireAdmin, (_req, res) => {
  const users = db.prepare("SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC, id DESC").all()
    .map((row) => ({ ...publicUser(row), createdAt: row.created_at }));
  res.json({ users });
});

app.post("/api/users", authenticate, requireAdmin, (req, res, next) => {
  try {
    const name = requiredText(req.body.name, "Name", 120);
    const email = requiredText(req.body.email, "Email", 254).toLowerCase();
    const password = requiredText(req.body.password, "Password", 200);
    const role = cleanText(req.body.role, 20).toLowerCase();
    if (!validRoles.has(role)) return res.status(400).json({ error: "Invalid account role" });
    if (password.length < 8) return res.status(400).json({ error: "Password must be at least 8 characters" });
    const { hash, salt } = hashPassword(password);
    const result = db.prepare(`
      INSERT INTO users (name, email, role, password_hash, password_salt)
      VALUES (?, ?, ?, ?, ?)
    `).run(name, email, role, hash, salt);
    const user = db.prepare("SELECT id, name, email, role FROM users WHERE id = ?").get(result.lastInsertRowid);
    res.status(201).json({ user: publicUser(user) });
  } catch (error) {
    if (String(error.message).includes("UNIQUE constraint failed")) {
      error.status = 409;
      error.message = "An account with this email already exists";
    }
    next(error);
  }
});

app.use((req, res) => res.status(404).json({ error: `Route not found: ${req.method} ${req.path}` }));
app.use((error, _req, res, _next) => {
  console.error(error);
  const status = error.status || (error instanceof multer.MulterError ? 400 : 500);
  res.status(status).json({ error: status >= 500 ? "Internal server error" : error.message });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`SilicoSafe API listening on http://localhost:${port}`);
  });
}

module.exports = app;
