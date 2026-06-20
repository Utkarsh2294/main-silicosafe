const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const { DatabaseSync } = require("node:sqlite");

const dataDir = process.env.DATA_DIR
  ? path.resolve(process.env.DATA_DIR)
  : path.join(__dirname, "data");

fs.mkdirSync(dataDir, { recursive: true });

const dbPath = path.join(dataDir, "silicosafe.sqlite");
const db = new DatabaseSync(dbPath);

db.exec("PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;");

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'doctor',
  password_hash TEXT NOT NULL,
  password_salt TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS appointments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  phone TEXT,
  preferred_date TEXT NOT NULL,
  type TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS patients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  age INTEGER,
  sex TEXT,
  phone TEXT,
  district TEXT,
  state TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS xray_uploads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  patient_id INTEGER,
  original_filename TEXT,
  stored_filename TEXT,
  file_path TEXT,
  mime_type TEXT,
  size_bytes INTEGER,
  doctor_reviewed TEXT,
  doctor_findings TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS screenings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  patient_id INTEGER NOT NULL,
  clinical_score INTEGER NOT NULL,
  risk_level TEXT NOT NULL,
  confidence INTEGER NOT NULL,
  signals_json TEXT NOT NULL,
  form_data_json TEXT NOT NULL,
  xray_upload_id INTEGER,
  created_by_user_id INTEGER,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
  FOREIGN KEY (xray_upload_id) REFERENCES xray_uploads(id) ON DELETE SET NULL,
  FOREIGN KEY (created_by_user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS reports (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  screening_id INTEGER NOT NULL,
  report_en TEXT NOT NULL,
  report_hi TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (screening_id) REFERENCES screenings(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_patients_created_at ON patients(created_at);
CREATE INDEX IF NOT EXISTS idx_screenings_created_at ON screenings(created_at);
CREATE INDEX IF NOT EXISTS idx_appointments_created_at ON appointments(created_at);
CREATE INDEX IF NOT EXISTS idx_screenings_risk ON screenings(risk_level);
`);

// Keep existing databases compatible when new appointment fields are added.
const appointmentColumns = db.prepare("PRAGMA table_info(appointments)").all();
if (!appointmentColumns.some((column) => column.name === "preferred_time")) {
  db.exec("ALTER TABLE appointments ADD COLUMN preferred_time TEXT");
}

function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const hash = crypto
    .pbkdf2Sync(password, salt, 120000, 64, "sha512")
    .toString("hex");
  return { hash, salt };
}

function verifyPassword(password, salt, expectedHash) {
  const { hash } = hashPassword(password, salt);
  const left = Buffer.from(hash, "hex");
  const right = Buffer.from(expectedHash, "hex");
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

function seedAdminUser() {
  const adminCount = db
    .prepare("SELECT COUNT(*) AS count FROM users WHERE role = 'admin'")
    .get().count;

  if (adminCount > 0) return;

  const name = process.env.ADMIN_NAME || "SilicoSafe Admin";
  const email = (process.env.ADMIN_EMAIL || "admin@silicosafe.local").toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "Admin@12345";
  const { hash, salt } = hashPassword(password);

  db.prepare(`
    INSERT INTO users (name, email, role, password_hash, password_salt)
    VALUES (?, ?, 'admin', ?, ?)
  `).run(name, email, hash, salt);
}

module.exports = {
  db,
  dbPath,
  hashPassword,
  seedAdminUser,
  verifyPassword,
};
