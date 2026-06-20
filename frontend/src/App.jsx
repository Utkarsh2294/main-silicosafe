import { useState, useRef, useEffect, useCallback } from "react";

// ─── TRANSLATIONS ──────────────────────────────────────────────────────────────
const T = {
  en: {
    navHome: "Home", navAbout: "About", navFeatures: "Features",
    navAppointment: "Appointment", navTriage: "AI Triage", navSchemes: "Schemes",
    navBook: "Book Appointment",
    heroBadge: "AI-Powered Screening · Live in India",
    heroTitle1: "AI-Powered Detection for",
    heroTitle2: "Silicosis vs Tuberculosis",
    heroSub: "Prevent misdiagnosis, save lives, and enable fast, accurate screening in rural India — in under 5 seconds.",
    heroBtn1: "Start AI Triage →",
    heroBtn2: "Book Appointment",
    statsD1: "Screening Time", statsD2: "Accuracy Rate", statsD3: "Compensation Assisted", statsD4: "India Focus",
    featuresTag: "Why SilicoSafe",
    featuresTitle: "Designed for India's Healthcare Gaps",
    featuresSub: "Every feature built to tackle real-world challenges in rural and semi-urban radiology diagnostics.",
    f1t: "AI X-Ray Analysis", f1d: "Deep learning model trained on thousands of annotated chest X-rays for Silicosis and TB pattern recognition with 94%+ accuracy.",
    f2t: "Instant Results", f2d: "Complete AI screening in under 5 seconds — no waiting for specialist consultations or expensive lab delays.",
    f3t: "Rural Healthcare Focus", f3d: "Built for Tier-2 and Tier-3 clinics with limited bandwidth. Works on basic Android devices.",
    f4t: "Smart Risk Alerts", f4d: "Color-coded risk output (Green / Yellow / Red) with actionable clinical recommendations tailored for each case.",
    f5t: "Compensation Assist", f5d: "Auto-generates documentation required to claim ₹3 lakh government compensation for confirmed silicosis patients.",
    probTag: "The Problem",
    probTitle: "Silicosis is Routinely Misdiagnosed as TB",
    probSub: "In Tier-2 and Tier-3 India, Silicosis and Tuberculosis present nearly identical patterns on chest X-rays. Without AI tools, up to 40% of Silicosis cases are wrongly treated as TB.",
    p1: "6 months of unnecessary TB medication prescribed per patient",
    p2: "₹5,000–₹10,000 in treatment costs wasted per misdiagnosed case",
    p3: "₹3 lakh government compensation lost due to wrong diagnosis",
    p4: "Preventable deaths from untreated occupational lung disease",
    solTag: "How It Works",
    solTitle: "Accurate Screening in 4 Simple Steps",
    solSub: "SilicoSafe combines deep learning X-ray analysis with patient clinical data to deliver fast, explainable results.",
    s1t: "Patient Info", s1d: "Enter basic patient details and location.",
    s2t: "Work History", s2d: "Record silica dust exposure history.",
    s3t: "Symptoms", s3d: "Document current symptoms and TB history.",
    s4t: "X-Ray Upload", s4d: "Upload chest X-ray for AI heatmap analysis.",
    aboutTag: "About Us",
    aboutTitle: "Built for India's Most Underserved Patients",
    aboutSub1: "SilicoSafe was born from a simple question: why are thousands of miners and stone workers dying from a preventable, compensable disease — simply because no one could read their X-ray correctly?",
    aboutSub2: "We built an AI platform that bridges the gap between cutting-edge radiology and last-mile healthcare delivery. Our model is trained specifically on Indian patient data and occupational lung disease patterns.",
    aboutSub3: "We're not replacing doctors — we're giving every rural clinic a second opinion that is faster, cheaper, and always available.",
    aboutBtn: "Partner With Us →",
    missionTitle: "Our Mission",
    missionSub: "To eliminate preventable deaths caused by Silicosis misdiagnosis in India's mining belt — by making AI-powered radiology accessible to every rural clinic, regardless of specialist availability.",
    apptTag: "Get Started",
    apptTitle: "Book an Appointment",
    apptSub: "Consult our team for a demo, screening support, or to onboard your clinic onto SilicoSafe.",
    formName: "Full Name", formPhone: "Phone Number", formDate: "Preferred Date",
    formType: "Type of Appointment", formDesc: "Brief Description",
    formPH_name: "Dr. Ramesh Kumar", formPH_phone: "+91 98765 43210",
    formPH_desc: "Describe the patient's condition or purpose of the appointment...",
    formOpt1: "Patient Screening Support", formOpt2: "Clinic Demo",
    formOpt3: "Partnership Discussion", formOpt4: "Technical Integration",
    formBtn: "Book Appointment →",
    formSuccess: "✅ Appointment booked! Our team will contact you within 24 hours.",
    footerDesc: "AI-powered silicosis screening for rural India. Preventing misdiagnosis, saving lives, and enabling rightful compensation for workers.",
    footerPlatform: "Platform", footerSchemes: "Schemes", footerContact: "Contact",
    formTime: "Preferred Time",
    calToday: "Today",
    calMorning: "Morning",
    calAfternoon: "Afternoon",
    calEvening: "Evening",
    calSelectDate: "Select a date",
    calSelectTime: "Choose preferred time",
    fp1: "AI Screening", fp2: "X-Ray Upload", fp3: "Risk Reports", fp4: "Compensation Docs",
    fs1: "Rajasthan Policy", fs2: "ESIC Benefits", fs3: "PM-SYM Pension", fs4: "DMF Funds",
    footerCopy: "© 2025 SilicoSafe. All rights reserved. Built with care for India's workers.",
    footerLinks: "Privacy Policy · Terms of Service",
    triageHeader: "AI Screening Tool",
    triageTitle: "Silicosis Triage",
    triageSub: "Comprehensive patient assessment",
    step1: "Patient Info",
    step2: "Work History",
    step3: "Symptoms",
    step4: "X-Ray Upload",
    back: "← Back",
    continue: "Continue →",
    analyseBtn: "Analyse Patient ↗",
    skipXray: "No X-ray available — use history only",
    aiDisclaimer: "AI Screening Tool — Not a Medical Diagnosis",
    aiDisclaimerSub: "This tool assists trained health workers with preliminary risk assessment only. All results must be confirmed by a qualified physician before any clinical action is taken.",
    schemesNote: "Government schemes vary by state. Always verify current benefit amounts on the official portal.",
    schemesViewAll: "View All Schemes →",
    schemesApply: "Start Your Application",
    schemesApplySub: "Visit the national myScheme portal to find all government schemes for your state.",
    docsTitle: "Documents Required",
    docsSub: "Gather these documents before applying to any scheme.",
    benefitsTitle: "Benefits at a Glance",
    visitSite: "Visit Official Website",
    referralTitle: "Referral Directory",
    referralSub: "Find the nearest specialist centre for your patient's district.",
  },
  hi: {
    navHome: "होम", navAbout: "हमारे बारे में", navFeatures: "विशेषताएं",
    navAppointment: "अपॉइंटमेंट", navTriage: "AI जांच", navSchemes: "योजनाएं",
    navBook: "अपॉइंटमेंट बुक करें",
    heroBadge: "AI-संचालित जांच · भारत में लाइव",
    heroTitle1: "सिलिकोसिस और तपेदिक की",
    heroTitle2: "AI-संचालित पहचान",
    heroSub: "गलत निदान रोकें, जीवन बचाएं — ग्रामीण भारत में 5 सेकंड में सटीक जांच।",
    heroBtn1: "AI जांच शुरू करें →",
    heroBtn2: "अपॉइंटमेंट बुक करें",
    statsD1: "जांच का समय", statsD2: "सटीकता दर", statsD3: "मुआवज़ा दिलाया", statsD4: "भारत केंद्रित",
    featuresTag: "SilicoSafe क्यों चुनें",
    featuresTitle: "भारत की स्वास्थ्य सेवा की कमियों के लिए बनाया गया",
    featuresSub: "हर सुविधा ग्रामीण और अर्ध-शहरी क्षेत्रों की असली चुनौतियों को ध्यान में रखकर बनाई गई है।",
    f1t: "AI एक्स-रे विश्लेषण", f1d: "94%+ सटीकता के साथ सिलिकोसिस और तपेदिक की पहचान के लिए प्रशिक्षित डीप लर्निंग मॉडल।",
    f2t: "तत्काल परिणाम", f2d: "5 सेकंड से कम में पूरी AI जांच — किसी विशेषज्ञ की प्रतीक्षा नहीं।",
    f3t: "ग्रामीण स्वास्थ्य सेवा केंद्रित", f3d: "सीमित इंटरनेट वाले टियर-2 और टियर-3 क्लीनिकों के लिए बनाया गया।",
    f4t: "स्मार्ट जोखिम अलर्ट", f4d: "रंग-कोडित जोखिम परिणाम (हरा / पीला / लाल) के साथ कार्रवाई योग्य सिफारिशें।",
    f5t: "मुआवज़ा सहायता", f5d: "सिलिकोसिस की पुष्टि पर ₹3 लाख सरकारी मुआवज़े के लिए दस्तावेज़ स्वतः तैयार करता है।",
    probTag: "समस्या",
    probTitle: "सिलिकोसिस को अक्सर तपेदिक समझ लिया जाता है",
    probSub: "टियर-2 और टियर-3 भारत में सिलिकोसिस और तपेदिक के लक्षण छाती के एक्स-रे पर लगभग एक जैसे दिखते हैं।",
    p1: "प्रत्येक रोगी को 6 महीने की अनावश्यक तपेदिक दवाएं दी जाती हैं",
    p2: "गलत निदान से प्रति मामले ₹5,000–₹10,000 की बर्बादी",
    p3: "गलत निदान के कारण ₹3 लाख का सरकारी मुआवज़ा नहीं मिलता",
    p4: "व्यावसायिक फेफड़े की बीमारी से होने वाली रोके जाने योग्य मौतें",
    solTag: "यह कैसे काम करता है",
    solTitle: "4 आसान चरणों में सटीक जांच",
    solSub: "SilicoSafe तेज़ और स्पष्ट परिणाम देने के लिए AI एक्स-रे विश्लेषण और नैदानिक डेटा को एक साथ उपयोग करता है।",
    s1t: "रोगी की जानकारी", s1d: "रोगी का नाम, उम्र और स्थान दर्ज करें।",
    s2t: "काम का इतिहास", s2d: "सिलिका धूल के संपर्क का विवरण दर्ज करें।",
    s3t: "लक्षण", s3d: "वर्तमान लक्षण और तपेदिक का इतिहास दर्ज करें।",
    s4t: "एक्स-रे अपलोड", s4d: "AI हीटमैप विश्लेषण के लिए छाती का एक्स-रे अपलोड करें।",
    aboutTag: "हमारे बारे में",
    aboutTitle: "भारत के सबसे वंचित रोगियों के लिए बनाया गया",
    aboutSub1: "SilicoSafe एक सरल सवाल से उभरा: हज़ारों खनिक और पत्थर-कारीगर एक ऐसी बीमारी से क्यों मर रहे हैं जिसे रोका और मुआवज़ा दोनों दिया जा सकता है — सिर्फ इसलिए कि कोई उनका एक्स-रे सही तरह से नहीं पढ़ सका?",
    aboutSub2: "हमने एक AI मंच बनाया है जो आधुनिक रेडियोलॉजी और ग्रामीण स्वास्थ्य सेवा के बीच की खाई को पाटता है।",
    aboutSub3: "हम डॉक्टरों की जगह नहीं ले रहे — हम हर ग्रामीण क्लीनिक को एक दूसरी राय दे रहे हैं जो तेज़, सस्ती और हमेशा उपलब्ध है।",
    aboutBtn: "हमारे साथ साझेदारी करें →",
    missionTitle: "हमारा मिशन",
    missionSub: "भारत के खनन क्षेत्र में सिलिकोसिस के गलत निदान से होने वाली रोके जाने योग्य मौतों को समाप्त करना — हर ग्रामीण क्लीनिक में AI-संचालित रेडियोलॉजी उपलब्ध कराकर।",
    apptTag: "शुरू करें",
    apptTitle: "अपॉइंटमेंट बुक करें",
    apptSub: "डेमो, जांच सहायता या अपने क्लीनिक को SilicoSafe से जोड़ने के लिए हमारी टीम से बात करें।",
    formName: "पूरा नाम", formPhone: "फ़ोन नंबर", formDate: "पसंदीदा तारीख",
    formType: "अपॉइंटमेंट का प्रकार", formDesc: "संक्षिप्त विवरण",
    formPH_name: "डॉ. रमेश कुमार", formPH_phone: "+91 98765 43210",
    formPH_desc: "रोगी की स्थिति या अपॉइंटमेंट का उद्देश्य बताएं...",
    formOpt1: "रोगी जांच सहायता", formOpt2: "क्लीनिक डेमो",
    formOpt3: "साझेदारी चर्चा", formOpt4: "तकनीकी एकीकरण",
    formBtn: "अपॉइंटमेंट बुक करें →",
    formSuccess: "✅ अपॉइंटमेंट बुक हो गई! हमारी टीम 24 घंटे के भीतर संपर्क करेगी।",
    footerDesc: "ग्रामीण भारत के लिए AI-संचालित सिलिकोसिस जांच। गलत निदान रोकना, जीवन बचाना।",
    footerPlatform: "प्लेटफॉर्म", footerSchemes: "योजनाएं", footerContact: "संपर्क",
    formTime: "पसंदीदा समय",
    calToday: "आज",
    calMorning: "सुबह",
    calAfternoon: "दोपहर",
    calEvening: "शाम",
    calSelectDate: "तारीख चुनें",
    calSelectTime: "पसंदीदा समय चुनें",
    fp1: "AI जांच", fp2: "एक्स-रे अपलोड", fp3: "जोखिम रिपोर्ट", fp4: "मुआवज़ा दस्तावेज़",
    fs1: "राजस्थान नीति", fs2: "ESIC लाभ", fs3: "PM-SYM पेंशन", fs4: "DMF फंड",
    footerCopy: "© 2025 SilicoSafe. सर्वाधिकार सुरक्षित। भारत के श्रमिकों के लिए।",
    footerLinks: "गोपनीयता नीति · सेवा की शर्तें",
    triageHeader: "AI जांच उपकरण",
    triageTitle: "सिलिकोसिस जांच",
    triageSub: "व्यापक रोगी मूल्यांकन",
    step1: "रोगी की जानकारी",
    step2: "काम का इतिहास",
    step3: "लक्षण",
    step4: "एक्स-रे अपलोड",
    back: "← वापस",
    continue: "आगे बढ़ें →",
    analyseBtn: "जांच करें ↗",
    skipXray: "एक्स-रे उपलब्ध नहीं — केवल इतिहास से जांच करें",
    aiDisclaimer: "AI जांच उपकरण — यह चिकित्सीय निदान नहीं है",
    aiDisclaimerSub: "यह उपकरण केवल प्रारंभिक जोखिम मूल्यांकन में प्रशिक्षित स्वास्थ्य कर्मियों की सहायता करता है। किसी भी नैदानिक कदम से पहले एक योग्य चिकित्सक से पुष्टि अनिवार्य है।",
    schemesNote: "सरकारी योजनाएं राज्य के अनुसार अलग हो सकती हैं। आधिकारिक पोर्टल पर वर्तमान लाभ राशि की जांच करें।",
    schemesViewAll: "सभी योजनाएं देखें →",
    schemesApply: "अपना आवेदन शुरू करें",
    schemesApplySub: "अपने राज्य की सभी सरकारी योजनाएं खोजने के लिए myScheme पोर्टल पर जाएं।",
    docsTitle: "आवश्यक दस्तावेज़",
    docsSub: "किसी भी योजना में आवेदन करने से पहले ये दस्तावेज़ तैयार रखें।",
    benefitsTitle: "लाभ एक नजर में",
    visitSite: "आधिकारिक वेबसाइट देखें",
    referralTitle: "रेफरल निर्देशिका",
    referralSub: "अपने रोगी के जिले के लिए निकटतम विशेषज्ञ केंद्र खोजें।",
  },
};

Object.assign(T, {
  bn: {
    navHome: "হোম", navAbout: "আমাদের সম্পর্কে", navFeatures: "বৈশিষ্ট্য", navAppointment: "অ্যাপয়েন্টমেন্ট", navTriage: "AI স্ক্রিনিং", navSchemes: "স্কিম", navBook: "অ্যাপয়েন্টমেন্ট বুক করুন",
    heroBadge: "AI-চালিত স্ক্রিনিং · ভারতে চালু", heroTitle1: "সিলিকোসিস বনাম যক্ষ্মার", heroTitle2: "AI-চালিত শনাক্তকরণ", heroSub: "ভুল রোগনির্ণয় কমান, জীবন বাঁচান এবং গ্রামীণ ভারতে ৫ সেকেন্ডের মধ্যে দ্রুত, সঠিক স্ক্রিনিং করুন।", heroBtn1: "AI স্ক্রিনিং শুরু করুন →", heroBtn2: "অ্যাপয়েন্টমেন্ট বুক করুন",
    statsD1: "স্ক্রিনিং সময়", statsD2: "নির্ভুলতার হার", statsD3: "ক্ষতিপূরণ সহায়তা", statsD4: "ভারত-কেন্দ্রিক",
    featuresTag: "কেন SilicoSafe", featuresTitle: "ভারতের স্বাস্থ্যসেবার ঘাটতির জন্য তৈরি", featuresSub: "গ্রামীণ ও আধা-শহুরে রেডিওলজি সমস্যার বাস্তব চাহিদা মাথায় রেখে প্রতিটি সুবিধা তৈরি।",
    f1t: "AI X-ray বিশ্লেষণ", f1d: "সিলিকোসিস ও TB প্যাটার্ন শনাক্তে প্রশিক্ষিত ডিপ লার্নিং মডেল।", f2t: "তাৎক্ষণিক ফলাফল", f2d: "৫ সেকেন্ডের কম সময়ে AI স্ক্রিনিং — বিশেষজ্ঞের জন্য দীর্ঘ অপেক্ষা নেই।", f3t: "গ্রামীণ স্বাস্থ্যসেবা কেন্দ্রিক", f3d: "কম ব্যান্ডউইথের টিয়ার-২ ও টিয়ার-৩ ক্লিনিকের জন্য তৈরি।", f4t: "স্মার্ট ঝুঁকি সতর্কতা", f4d: "রঙভিত্তিক ঝুঁকি ফলাফল ও করণীয় পরামর্শ।", f5t: "ক্ষতিপূরণ সহায়তা", f5d: "নিশ্চিত সিলিকোসিস রোগীর সরকারি ক্ষতিপূরণ দাবির নথি তৈরিতে সহায়তা করে।",
    probTag: "সমস্যা", probTitle: "সিলিকোসিসকে প্রায়ই TB ধরে নেওয়া হয়", probSub: "টিয়ার-২ ও টিয়ার-৩ ভারতে সিলিকোসিস ও TB বুকের X-ray-তে অনেক সময় একই রকম দেখা যায়।", p1: "রোগীকে অপ্রয়োজনীয় TB ওষুধ দেওয়া হয়", p2: "ভুল রোগনির্ণয়ে চিকিৎসা খরচ নষ্ট হয়", p3: "ভুল রোগনির্ণয়ে সরকারি ক্ষতিপূরণ হারায়", p4: "পেশাগত ফুসফুস রোগে প্রতিরোধযোগ্য মৃত্যু",
    solTag: "কীভাবে কাজ করে", solTitle: "৪টি সহজ ধাপে সঠিক স্ক্রিনিং", solSub: "SilicoSafe X-ray বিশ্লেষণ ও ক্লিনিক্যাল তথ্য মিলিয়ে দ্রুত, ব্যাখ্যাযোগ্য ফল দেয়।", s1t: "রোগীর তথ্য", s1d: "রোগীর মৌলিক তথ্য ও অবস্থান লিখুন।", s2t: "কাজের ইতিহাস", s2d: "সিলিকা ধুলোর সংস্পর্শের ইতিহাস লিখুন।", s3t: "লক্ষণ", s3d: "বর্তমান লক্ষণ ও TB ইতিহাস লিখুন।", s4t: "X-ray আপলোড", s4d: "রিভিউয়ের জন্য বুকের X-ray আপলোড করুন।",
    aboutTag: "আমাদের সম্পর্কে", aboutTitle: "ভারতের সবচেয়ে বঞ্চিত রোগীদের জন্য তৈরি", aboutSub1: "SilicoSafe তৈরি হয়েছে একটি সহজ প্রশ্ন থেকে: প্রতিরোধযোগ্য ও ক্ষতিপূরণযোগ্য রোগে শ্রমিকেরা কেন মারা যাবেন শুধু সঠিক X-ray পড়া না হওয়ার কারণে?", aboutSub2: "আমরা আধুনিক রেডিওলজি ও শেষ-মাইল স্বাস্থ্যসেবার ফাঁক পূরণ করার জন্য একটি AI প্ল্যাটফর্ম তৈরি করেছি।", aboutSub3: "আমরা ডাক্তারদের বদলি নই — আমরা প্রতিটি গ্রামীণ ক্লিনিককে দ্রুত ও সহজলভ্য দ্বিতীয় মতামত দিই।", aboutBtn: "আমাদের সাথে অংশীদার হোন →", missionTitle: "আমাদের মিশন", missionSub: "ভারতের খনি অঞ্চলে সিলিকোসিসের ভুল রোগনির্ণয়জনিত প্রতিরোধযোগ্য মৃত্যু কমানো।",
    apptTag: "শুরু করুন", apptTitle: "অ্যাপয়েন্টমেন্ট বুক করুন", apptSub: "ডেমো, স্ক্রিনিং সহায়তা বা আপনার ক্লিনিককে SilicoSafe-এ যুক্ত করতে আমাদের দলের সাথে কথা বলুন।", formName: "পুরো নাম", formPhone: "ফোন নম্বর", formDate: "পছন্দের তারিখ", formType: "অ্যাপয়েন্টমেন্টের ধরন", formDesc: "সংক্ষিপ্ত বিবরণ", formPH_name: "ডা. রমেশ কুমার", formPH_phone: "+91 98765 43210", formPH_desc: "রোগীর অবস্থা বা অ্যাপয়েন্টমেন্টের উদ্দেশ্য লিখুন...", formOpt1: "রোগী স্ক্রিনিং সহায়তা", formOpt2: "ক্লিনিক ডেমো", formOpt3: "অংশীদারিত্ব আলোচনা", formOpt4: "টেকনিক্যাল ইন্টিগ্রেশন", formBtn: "অ্যাপয়েন্টমেন্ট বুক করুন →", formSuccess: "✅ অ্যাপয়েন্টমেন্ট বুক হয়েছে! আমাদের দল ২৪ ঘণ্টার মধ্যে যোগাযোগ করবে।",
    footerDesc: "গ্রামীণ ভারতের জন্য AI-চালিত সিলিকোসিস স্ক্রিনিং। ভুল রোগনির্ণয় কমানো, জীবন বাঁচানো এবং শ্রমিকদের ন্যায্য ক্ষতিপূরণে সহায়তা।", footerPlatform: "প্ল্যাটফর্ম", footerSchemes: "স্কিম", footerContact: "যোগাযোগ", formTime: "পছন্দের সময়", calToday: "আজ", calMorning: "সকাল", calAfternoon: "দুপুর", calEvening: "সন্ধ্যা", calSelectDate: "তারিখ নির্বাচন করুন", calSelectTime: "সময় নির্বাচন করুন", fp1: "AI স্ক্রিনিং", fp2: "X-ray আপলোড", fp3: "ঝুঁকি রিপোর্ট", fp4: "ক্ষতিপূরণ নথি", fs1: "রাজস্থান নীতি", fs2: "ESIC সুবিধা", fs3: "PM-SYM পেনশন", fs4: "DMF তহবিল", footerCopy: "© 2025 SilicoSafe. সর্বস্বত্ব সংরক্ষিত।", footerLinks: "গোপনীয়তা নীতি · পরিষেবার শর্ত",
    triageHeader: "AI স্ক্রিনিং টুল", triageTitle: "সিলিকোসিস স্ক্রিনিং", triageSub: "সম্পূর্ণ রোগী মূল্যায়ন", step1: "রোগীর তথ্য", step2: "কাজের ইতিহাস", step3: "লক্ষণ", step4: "X-ray আপলোড", back: "← ফিরে যান", continue: "চালিয়ে যান →", analyseBtn: "রোগী বিশ্লেষণ করুন ↗", skipXray: "X-ray নেই — শুধু ইতিহাস ব্যবহার করুন", aiDisclaimer: "AI স্ক্রিনিং টুল — চিকিৎসা নির্ণয় নয়", aiDisclaimerSub: "এটি প্রাথমিক ঝুঁকি মূল্যায়নে প্রশিক্ষিত স্বাস্থ্যকর্মীদের সহায়তা করে। সব ফল চিকিৎসকের মাধ্যমে নিশ্চিত করতে হবে।",
    schemesNote: "সরকারি স্কিম রাজ্যভেদে পরিবর্তিত হতে পারে। অফিসিয়াল পোর্টালে বর্তমান সুবিধা যাচাই করুন।", schemesViewAll: "সব স্কিম দেখুন →", schemesApply: "আবেদন শুরু করুন", schemesApplySub: "আপনার রাজ্যের সরকারি স্কিম খুঁজতে myScheme পোর্টালে যান।", docsTitle: "প্রয়োজনীয় নথি", docsSub: "স্কিমে আবেদন করার আগে এই নথিগুলি প্রস্তুত রাখুন।", benefitsTitle: "সুবিধা এক নজরে", visitSite: "অফিসিয়াল ওয়েবসাইট দেখুন", referralTitle: "রেফারেল ডিরেক্টরি", referralSub: "রোগীর জেলার নিকটতম বিশেষজ্ঞ কেন্দ্র খুঁজুন।",
  },
  mr: {
    navHome: "होम", navAbout: "आमच्याबद्दल", navFeatures: "वैशिष्ट्ये", navAppointment: "अपॉइंटमेंट", navTriage: "AI तपासणी", navSchemes: "योजना", navBook: "अपॉइंटमेंट बुक करा",
    heroBadge: "AI-संचालित तपासणी · भारतात उपलब्ध", heroTitle1: "सिलिकोसिस व क्षयरोगाची", heroTitle2: "AI-संचालित ओळख", heroSub: "चुकीचे निदान टाळा, जीव वाचवा आणि ग्रामीण भारतात ५ सेकंदांत जलद, अचूक तपासणी करा.", heroBtn1: "AI तपासणी सुरू करा →", heroBtn2: "अपॉइंटमेंट बुक करा",
    statsD1: "तपासणी वेळ", statsD2: "अचूकता दर", statsD3: "भरपाई सहाय्य", statsD4: "भारत केंद्रित",
    featuresTag: "SilicoSafe का", featuresTitle: "भारतातील आरोग्यसेवेतील उणिवांसाठी तयार", featuresSub: "ग्रामीण व निमशहरी रेडिओलॉजीच्या वास्तविक आव्हानांसाठी प्रत्येक सुविधा तयार केली आहे.",
    f1t: "AI X-ray विश्लेषण", f1d: "सिलिकोसिस व TB पॅटर्न ओळखण्यासाठी प्रशिक्षित डीप लर्निंग मॉडेल.", f2t: "तत्काळ निकाल", f2d: "५ सेकंदांपेक्षा कमी वेळेत AI तपासणी — तज्ज्ञांची वाट पाहण्याची गरज नाही.", f3t: "ग्रामीण आरोग्यसेवा केंद्रित", f3d: "मर्यादित इंटरनेट असलेल्या टियर-२ व टियर-३ क्लिनिकसाठी तयार.", f4t: "स्मार्ट जोखीम सूचना", f4d: "रंग-कोडित जोखीम आणि कृतीयोग्य शिफारसी.", f5t: "भरपाई सहाय्य", f5d: "निश्चित सिलिकोसिस रुग्णांसाठी सरकारी भरपाई कागदपत्रे तयार करण्यात मदत.",
    probTag: "समस्या", probTitle: "सिलिकोसिसला अनेकदा TB समजले जाते", probSub: "टियर-२ व टियर-३ भारतात सिलिकोसिस आणि TB चे X-ray नमुने सारखे दिसू शकतात.", p1: "रुग्णांना अनावश्यक TB औषधे दिली जातात", p2: "चुकीच्या निदानामुळे उपचार खर्च वाया जातो", p3: "सरकारी भरपाई गमावली जाते", p4: "व्यावसायिक फुफ्फुसरोगामुळे टाळता येणारे मृत्यू",
    solTag: "हे कसे काम करते", solTitle: "४ सोप्या टप्प्यांत अचूक तपासणी", solSub: "SilicoSafe X-ray विश्लेषण आणि क्लिनिकल माहिती एकत्र करून जलद, समजण्याजोगे निकाल देते.", s1t: "रुग्ण माहिती", s1d: "रुग्णाची मूलभूत माहिती व ठिकाण नोंदवा.", s2t: "कामाचा इतिहास", s2d: "सिलिका धूळ संपर्काची माहिती नोंदवा.", s3t: "लक्षणे", s3d: "सध्याची लक्षणे आणि TB इतिहास नोंदवा.", s4t: "X-ray अपलोड", s4d: "पुनरावलोकनासाठी छातीचा X-ray अपलोड करा.",
    aboutTag: "आमच्याबद्दल", aboutTitle: "भारतातील सर्वाधिक वंचित रुग्णांसाठी तयार", aboutSub1: "SilicoSafe एका सोप्या प्रश्नातून जन्मले: योग्य X-ray वाचला नाही म्हणून कामगारांनी टाळता येणाऱ्या रोगाने का मरावे?", aboutSub2: "आम्ही आधुनिक रेडिओलॉजी आणि शेवटच्या टप्प्यातील आरोग्यसेवा यांतील दरी भरून काढणारा AI प्लॅटफॉर्म तयार केला.", aboutSub3: "आम्ही डॉक्टरांची जागा घेत नाही — प्रत्येक ग्रामीण क्लिनिकला जलद, स्वस्त आणि उपलब्ध दुसरे मत देतो.", aboutBtn: "आमच्यासोबत भागीदारी करा →", missionTitle: "आमचे ध्येय", missionSub: "भारतातील खाण पट्ट्यात सिलिकोसिसच्या चुकीच्या निदानामुळे होणारे टाळता येणारे मृत्यू कमी करणे.",
    apptTag: "सुरू करा", apptTitle: "अपॉइंटमेंट बुक करा", apptSub: "डेमो, तपासणी सहाय्य किंवा आपले क्लिनिक SilicoSafe वर आणण्यासाठी आमच्या टीमशी बोला.", formName: "पूर्ण नाव", formPhone: "फोन नंबर", formDate: "पसंतीची तारीख", formType: "अपॉइंटमेंट प्रकार", formDesc: "संक्षिप्त वर्णन", formPH_name: "डॉ. रमेश कुमार", formPH_phone: "+91 98765 43210", formPH_desc: "रुग्णाची स्थिती किंवा अपॉइंटमेंटचा उद्देश लिहा...", formOpt1: "रुग्ण तपासणी सहाय्य", formOpt2: "क्लिनिक डेमो", formOpt3: "भागीदारी चर्चा", formOpt4: "तांत्रिक एकत्रीकरण", formBtn: "अपॉइंटमेंट बुक करा →", formSuccess: "✅ अपॉइंटमेंट बुक झाली! आमची टीम २४ तासांत संपर्क करेल.",
    footerDesc: "ग्रामीण भारतासाठी AI-संचालित सिलिकोसिस तपासणी. चुकीचे निदान टाळणे, जीव वाचवणे आणि कामगारांना योग्य भरपाई मिळवून देणे.", footerPlatform: "प्लॅटफॉर्म", footerSchemes: "योजना", footerContact: "संपर्क", formTime: "पसंतीचा वेळ", calToday: "आज", calMorning: "सकाळ", calAfternoon: "दुपार", calEvening: "संध्याकाळ", calSelectDate: "तारीख निवडा", calSelectTime: "वेळ निवडा", fp1: "AI तपासणी", fp2: "X-ray अपलोड", fp3: "जोखीम रिपोर्ट", fp4: "भरपाई कागदपत्रे", fs1: "राजस्थान धोरण", fs2: "ESIC लाभ", fs3: "PM-SYM पेन्शन", fs4: "DMF निधी", footerCopy: "© 2025 SilicoSafe. सर्व हक्क राखीव.", footerLinks: "गोपनीयता धोरण · सेवा अटी",
    triageHeader: "AI तपासणी साधन", triageTitle: "सिलिकोसिस तपासणी", triageSub: "संपूर्ण रुग्ण मूल्यांकन", step1: "रुग्ण माहिती", step2: "कामाचा इतिहास", step3: "लक्षणे", step4: "X-ray अपलोड", back: "← मागे", continue: "पुढे →", analyseBtn: "रुग्णाचे विश्लेषण करा ↗", skipXray: "X-ray उपलब्ध नाही — फक्त इतिहास वापरा", aiDisclaimer: "AI तपासणी साधन — वैद्यकीय निदान नाही", aiDisclaimerSub: "हे साधन प्रशिक्षित आरोग्य कर्मचाऱ्यांना प्राथमिक जोखीम मूल्यांकनात मदत करते. सर्व निष्कर्ष डॉक्टरांनी पुष्टी करावेत.",
    schemesNote: "सरकारी योजना राज्यानुसार बदलू शकतात. अधिकृत पोर्टलवर वर्तमान लाभ तपासा.", schemesViewAll: "सर्व योजना पहा →", schemesApply: "अर्ज सुरू करा", schemesApplySub: "आपल्या राज्यातील योजना शोधण्यासाठी myScheme पोर्टलला भेट द्या.", docsTitle: "आवश्यक कागदपत्रे", docsSub: "कोणत्याही योजनेसाठी अर्ज करण्यापूर्वी ही कागदपत्रे तयार ठेवा.", benefitsTitle: "लाभ एका नजरेत", visitSite: "अधिकृत वेबसाइट पहा", referralTitle: "रेफरल निर्देशिका", referralSub: "रुग्णाच्या जिल्ह्यातील जवळचे तज्ज्ञ केंद्र शोधा.",
  },
  te: {
    navHome: "హోమ్", navAbout: "మా గురించి", navFeatures: "ఫీచర్లు", navAppointment: "అపాయింట్మెంట్", navTriage: "AI స్క్రీనింగ్", navSchemes: "పథకాలు", navBook: "అపాయింట్మెంట్ బుక్ చేయండి",
    heroBadge: "AI ఆధారిత స్క్రీనింగ్ · భారతదేశంలో అందుబాటులో", heroTitle1: "సిలికోసిస్ వర్సెస్ టిబి", heroTitle2: "AI గుర్తింపు", heroSub: "తప్పుడు నిర్ధారణను తగ్గించి, ప్రాణాలను కాపాడి, గ్రామీణ భారతదేశంలో 5 సెకన్లలో వేగవంతమైన స్క్రీనింగ్ అందించండి.", heroBtn1: "AI స్క్రీనింగ్ ప్రారంభించండి →", heroBtn2: "అపాయింట్మెంట్ బుక్ చేయండి",
    statsD1: "స్క్రీనింగ్ సమయం", statsD2: "ఖచ్చితత్వం", statsD3: "పరిహార సహాయం", statsD4: "భారత్ కేంద్రితం",
    featuresTag: "SilicoSafe ఎందుకు", featuresTitle: "భారత ఆరోగ్య ఖాళీల కోసం రూపొందింది", featuresSub: "గ్రామీణ మరియు అర్ధపట్టణ రేడియాలజీ సవాళ్లను దృష్టిలో పెట్టుకొని ప్రతి ఫీచర్ రూపొందించబడింది.",
    f1t: "AI X-ray విశ్లేషణ", f1d: "సిలికోసిస్ మరియు TB నమూనాలను గుర్తించడానికి శిక్షణ పొందిన డీప్ లెర్నింగ్ మోడల్.", f2t: "తక్షణ ఫలితాలు", f2d: "5 సెకన్లలోపు AI స్క్రీనింగ్ — నిపుణుల కోసం వేచి ఉండాల్సిన అవసరం లేదు.", f3t: "గ్రామీణ ఆరోగ్యంపై దృష్టి", f3d: "తక్కువ ఇంటర్నెట్ ఉన్న టియర్-2, టియర్-3 క్లినిక్స్ కోసం రూపొందింది.", f4t: "స్మార్ట్ రిస్క్ అలర్ట్స్", f4d: "రంగుల ఆధారిత రిస్క్ ఫలితాలు మరియు చర్యల సూచనలు.", f5t: "పరిహార సహాయం", f5d: "నిర్ధారిత సిలికోసిస్ రోగుల ప్రభుత్వ పరిహార పత్రాలకు సహాయం చేస్తుంది.",
    probTag: "సమస్య", probTitle: "సిలికోసిస్‌ను తరచుగా TBగా భావిస్తారు", probSub: "టియర్-2, టియర్-3 భారతదేశంలో సిలికోసిస్ మరియు TB X-ray నమూనాలు చాలా దగ్గరగా కనిపించవచ్చు.", p1: "అనవసర TB మందులు రోగులకు ఇవ్వబడతాయి", p2: "తప్పు నిర్ధారణ వల్ల చికిత్స ఖర్చు వృథా", p3: "ప్రభుత్వ పరిహారం కోల్పోతారు", p4: "ఉద్యోగ సంబంధిత ఊపిరితిత్తుల వ్యాధితో నివారించగల మరణాలు",
    solTag: "ఇది ఎలా పనిచేస్తుంది", solTitle: "4 సులభ దశల్లో ఖచ్చితమైన స్క్రీనింగ్", solSub: "SilicoSafe X-ray విశ్లేషణను క్లినికల్ సమాచారంతో కలిపి వేగంగా అర్థమయ్యే ఫలితాలు ఇస్తుంది.", s1t: "రోగి సమాచారం", s1d: "రోగి ప్రాథమిక వివరాలు మరియు స్థానం నమోదు చేయండి.", s2t: "పని చరిత్ర", s2d: "సిలికా ధూళి పరిచయం చరిత్రను నమోదు చేయండి.", s3t: "లక్షణాలు", s3d: "ప్రస్తుత లక్షణాలు మరియు TB చరిత్ర నమోదు చేయండి.", s4t: "X-ray అప్‌లోడ్", s4d: "సమీక్ష కోసం ఛెస్ట్ X-ray అప్‌లోడ్ చేయండి.",
    aboutTag: "మా గురించి", aboutTitle: "భారతదేశంలోని అత్యంత నిర్లక్ష్యానికి గురైన రోగుల కోసం", aboutSub1: "సరైన X-ray చదవలేకపోవడం వల్ల నివారించగల వ్యాధితో కార్మికులు ఎందుకు చనిపోవాలి అన్న ప్రశ్నతో SilicoSafe ప్రారంభమైంది.", aboutSub2: "ఆధునిక రేడియాలజీ మరియు చివరి మైలు ఆరోగ్య సేవల మధ్య ఖాళీని పూడ్చే AI ప్లాట్‌ఫారమ్‌ను నిర్మించాము.", aboutSub3: "మేము వైద్యులను భర్తీ చేయము — ప్రతి గ్రామీణ క్లినిక్‌కు వేగవంతమైన రెండో అభిప్రాయం ఇస్తాము.", aboutBtn: "మాతో భాగస్వామ్యం చేయండి →", missionTitle: "మా లక్ష్యం", missionSub: "భారత గనుల ప్రాంతాల్లో సిలికోసిస్ తప్పు నిర్ధారణ వల్ల జరిగే నివారించగల మరణాలను తగ్గించడం.",
    apptTag: "ప్రారంభించండి", apptTitle: "అపాయింట్మెంట్ బుక్ చేయండి", apptSub: "డెమో, స్క్రీనింగ్ సహాయం లేదా క్లినిక్ ఆన్‌బోర్డింగ్ కోసం మా బృందంతో మాట్లాడండి.", formName: "పూర్తి పేరు", formPhone: "ఫోన్ నంబర్", formDate: "ఇష్టమైన తేదీ", formType: "అపాయింట్మెంట్ రకం", formDesc: "చిన్న వివరణ", formPH_name: "డా. రమేష్ కుమార్", formPH_phone: "+91 98765 43210", formPH_desc: "రోగి పరిస్థితి లేదా అపాయింట్మెంట్ ఉద్దేశం వివరించండి...", formOpt1: "రోగి స్క్రీనింగ్ సహాయం", formOpt2: "క్లినిక్ డెమో", formOpt3: "భాగస్వామ్య చర్చ", formOpt4: "టెక్నికల్ ఇంటిగ్రేషన్", formBtn: "అపాయింట్మెంట్ బుక్ చేయండి →", formSuccess: "✅ అపాయింట్మెంట్ బుక్ అయింది! మా బృందం 24 గంటల్లో సంప్రదిస్తుంది.",
    footerDesc: "గ్రామీణ భారతదేశం కోసం AI ఆధారిత సిలికోసిస్ స్క్రీనింగ్.", footerPlatform: "ప్లాట్‌ఫారమ్", footerSchemes: "పథకాలు", footerContact: "సంప్రదించండి", formTime: "ఇష్టమైన సమయం", calToday: "నేడు", calMorning: "ఉదయం", calAfternoon: "మధ్యాహ్నం", calEvening: "సాయంత్రం", calSelectDate: "తేదీ ఎంచుకోండి", calSelectTime: "సమయం ఎంచుకోండి", fp1: "AI స్క్రీనింగ్", fp2: "X-ray అప్‌లోడ్", fp3: "రిస్క్ రిపోర్ట్స్", fp4: "పరిహార పత్రాలు", fs1: "రాజస్థాన్ పాలసీ", fs2: "ESIC ప్రయోజనాలు", fs3: "PM-SYM పెన్షన్", fs4: "DMF నిధులు", footerCopy: "© 2025 SilicoSafe. అన్ని హక్కులు రిజర్వ్.", footerLinks: "గోప్యతా విధానం · సేవా నిబంధనలు",
    triageHeader: "AI స్క్రీనింగ్ టూల్", triageTitle: "సిలికోసిస్ స్క్రీనింగ్", triageSub: "సమగ్ర రోగి అంచనా", step1: "రోగి సమాచారం", step2: "పని చరిత్ర", step3: "లక్షణాలు", step4: "X-ray అప్‌లోడ్", back: "← వెనుకకు", continue: "కొనసాగించండి →", analyseBtn: "రోగిని విశ్లేషించండి ↗", skipXray: "X-ray లేదు — చరిత్ర మాత్రమే ఉపయోగించండి", aiDisclaimer: "AI స్క్రీనింగ్ టూల్ — వైద్య నిర్ధారణ కాదు", aiDisclaimerSub: "ఇది ప్రాథమిక రిస్క్ అంచనాలో శిక్షణ పొందిన ఆరోగ్య సిబ్బందికి సహాయపడుతుంది. అన్ని ఫలితాలను వైద్యుడు నిర్ధారించాలి.",
    schemesNote: "ప్రభుత్వ పథకాలు రాష్ట్రానుసారం మారవచ్చు. అధికారిక పోర్టల్‌లో ప్రయోజనాలను ధృవీకరించండి.", schemesViewAll: "అన్ని పథకాలు చూడండి →", schemesApply: "మీ దరఖాస్తు ప్రారంభించండి", schemesApplySub: "మీ రాష్ట్రంలోని పథకాలను కనుగొనడానికి myScheme పోర్టల్‌కు వెళ్లండి.", docsTitle: "అవసరమైన పత్రాలు", docsSub: "ఏ పథకానికైనా దరఖాస్తు చేసే ముందు ఈ పత్రాలు సిద్ధం పెట్టండి.", benefitsTitle: "ప్రయోజనాలు ఒక చూపులో", visitSite: "అధికారిక వెబ్‌సైట్ చూడండి", referralTitle: "రెఫరల్ డైరెక్టరీ", referralSub: "రోగి జిల్లాకు సమీప నిపుణుల కేంద్రాన్ని కనుగొనండి.",
  },
});

Object.assign(T, {
  ta: {
    navHome: "முகப்பு", navAbout: "எங்களை பற்றி", navFeatures: "அம்சங்கள்", navAppointment: "நேரம் பதிவு", navTriage: "AI திரையாய்வு", navSchemes: "திட்டங்கள்", navBook: "நேரம் பதிவு செய்யவும்",
    heroBadge: "AI இயக்கும் திரையாய்வு · இந்தியாவில் செயலில்", heroTitle1: "சிலிகோசிஸ் மற்றும் காசநோயை", heroTitle2: "AI மூலம் கண்டறிதல்", heroSub: "தவறான நோயறிதலை குறைத்து, உயிர்களை காப்பாற்றி, கிராமப்புற இந்தியாவில் 5 விநாடிகளில் வேகமான திரையாய்வு செய்யுங்கள்.", heroBtn1: "AI திரையாய்வு தொடங்கு →", heroBtn2: "நேரம் பதிவு செய்யவும்",
    statsD1: "திரையாய்வு நேரம்", statsD2: "துல்லிய விகிதம்", statsD3: "இழப்பீடு உதவி", statsD4: "இந்தியா மையம்",
    featuresTag: "ஏன் SilicoSafe", featuresTitle: "இந்திய சுகாதார இடைவெளிகளுக்காக வடிவமைக்கப்பட்டது", featuresSub: "கிராமப்புற மற்றும் அரைநகர ரேடியாலஜி சவால்களுக்கு ஒவ்வொரு அம்சமும் உருவாக்கப்பட்டது.",
    f1t: "AI X-ray பகுப்பாய்வு", f1d: "சிலிகோசிஸ் மற்றும் TB முறைமைகளை அறிய பயிற்சிபெற்ற டீப் லெர்னிங் மாடல்.", f2t: "உடனடி முடிவுகள்", f2d: "5 விநாடிகளில் AI திரையாய்வு — நிபுணருக்காக நீண்ட காத்திருப்பு இல்லை.", f3t: "கிராமப்புற சுகாதார கவனம்", f3d: "குறைந்த இணைய வசதி உள்ள டியர்-2, டியர்-3 கிளினிக்குகளுக்காக.", f4t: "ஸ்மார்ட் அபாய எச்சரிக்கை", f4d: "நிற அடிப்படையிலான அபாய முடிவுகள் மற்றும் செயல் பரிந்துரைகள்.", f5t: "இழப்பீடு உதவி", f5d: "உறுதி செய்யப்பட்ட சிலிகோசிஸ் நோயாளிகளுக்கான அரசு இழப்பீடு ஆவணங்களில் உதவுகிறது.",
    probTag: "பிரச்சனை", probTitle: "சிலிகோசிஸ் அடிக்கடி TB என தவறாக கருதப்படுகிறது", probSub: "டியர்-2 மற்றும் டியர்-3 இந்தியாவில் சிலிகோசிஸ் மற்றும் TB X-ray தோற்றங்கள் பல நேரங்களில் ஒரே போல இருக்கலாம்.", p1: "தேவையற்ற TB மருந்துகள் நோயாளிக்கு வழங்கப்படுகின்றன", p2: "தவறான நோயறிதலால் சிகிச்சை செலவு வீணாகிறது", p3: "அரசு இழப்பீடு இழக்கப்படுகிறது", p4: "தொழில் சார்ந்த நுரையீரல் நோயால் தவிர்க்கக்கூடிய மரணங்கள்",
    solTag: "இது எப்படி வேலை செய்கிறது", solTitle: "4 எளிய படிகளில் துல்லிய திரையாய்வு", solSub: "SilicoSafe X-ray பகுப்பாய்வையும் நோயாளி தரவையும் இணைத்து வேகமான விளக்கமான முடிவுகளை தருகிறது.", s1t: "நோயாளர் தகவல்", s1d: "நோயாளியின் அடிப்படை விவரங்கள் மற்றும் இடத்தை பதிவு செய்யுங்கள்.", s2t: "வேலை வரலாறு", s2d: "சிலிகா தூசி தொடர்பு வரலாற்றை பதிவு செய்யுங்கள்.", s3t: "அறிகுறிகள்", s3d: "தற்போதைய அறிகுறிகள் மற்றும் TB வரலாறு பதிவு செய்யுங்கள்.", s4t: "X-ray பதிவேற்றம்", s4d: "மதிப்பாய்வுக்காக மார்பு X-ray பதிவேற்றவும்.",
    aboutTag: "எங்களை பற்றி", aboutTitle: "இந்தியாவின் புறக்கணிக்கப்பட்ட நோயாளிகளுக்காக", aboutSub1: "சரியான X-ray வாசிப்பு இல்லாததால் தடுக்கக்கூடிய நோயால் தொழிலாளர்கள் ஏன் உயிரிழக்க வேண்டும் என்ற கேள்வியிலிருந்து SilicoSafe உருவானது.", aboutSub2: "நவீன ரேடியாலஜி மற்றும் கடைசி கட்ட சுகாதார சேவையிடையே உள்ள இடைவெளியை நிரப்பும் AI தளத்தை உருவாக்கினோம்.", aboutSub3: "நாங்கள் மருத்துவர்களை மாற்றவில்லை — ஒவ்வொரு கிராமப்புற கிளினிக்குக்கும் வேகமான இரண்டாவது கருத்தை வழங்குகிறோம்.", aboutBtn: "எங்களுடன் கூட்டாண்மை செய்யுங்கள் →", missionTitle: "எங்கள் பணி", missionSub: "இந்திய சுரங்கப் பகுதிகளில் சிலிகோசிஸ் தவறான நோயறிதலால் ஏற்படும் தவிர்க்கக்கூடிய மரணங்களை குறைப்பது.",
    apptTag: "தொடங்குங்கள்", apptTitle: "நேரம் பதிவு செய்யவும்", apptSub: "டெமோ, திரையாய்வு உதவி அல்லது உங்கள் கிளினிக்கை SilicoSafe-இல் சேர்க்க எங்கள் அணியுடன் பேசுங்கள்.", formName: "முழு பெயர்", formPhone: "தொலைபேசி எண்", formDate: "விருப்ப தேதி", formType: "நேரம் பதிவு வகை", formDesc: "சுருக்க விளக்கம்", formPH_name: "டாக்டர் ரமேஷ் குமார்", formPH_phone: "+91 98765 43210", formPH_desc: "நோயாளியின் நிலை அல்லது நோக்கம் எழுதுங்கள்...", formOpt1: "நோயாளர் திரையாய்வு உதவி", formOpt2: "கிளினிக் டெமோ", formOpt3: "கூட்டாண்மை விவாதம்", formOpt4: "தொழில்நுட்ப ஒருங்கிணைப்பு", formBtn: "நேரம் பதிவு செய்யவும் →", formSuccess: "✅ நேரம் பதிவு செய்யப்பட்டது! எங்கள் அணி 24 மணி நேரத்தில் தொடர்பு கொள்ளும்.",
    footerDesc: "கிராமப்புற இந்தியாவுக்கான AI இயக்கும் சிலிகோசிஸ் திரையாய்வு.", footerPlatform: "தளம்", footerSchemes: "திட்டங்கள்", footerContact: "தொடர்பு", formTime: "விருப்ப நேரம்", calToday: "இன்று", calMorning: "காலை", calAfternoon: "மதியம்", calEvening: "மாலை", calSelectDate: "தேதி தேர்வு", calSelectTime: "நேரம் தேர்வு", fp1: "AI திரையாய்வு", fp2: "X-ray பதிவேற்றம்", fp3: "அபாய அறிக்கைகள்", fp4: "இழப்பீடு ஆவணங்கள்", fs1: "ராஜஸ்தான் கொள்கை", fs2: "ESIC நன்மைகள்", fs3: "PM-SYM ஓய்வூதியம்", fs4: "DMF நிதி", footerCopy: "© 2025 SilicoSafe. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.", footerLinks: "தனியுரிமை கொள்கை · சேவை விதிமுறைகள்",
    triageHeader: "AI திரையாய்வு கருவி", triageTitle: "சிலிகோசிஸ் திரையாய்வு", triageSub: "முழுமையான நோயாளர் மதிப்பீடு", step1: "நோயாளர் தகவல்", step2: "வேலை வரலாறு", step3: "அறிகுறிகள்", step4: "X-ray பதிவேற்றம்", back: "← பின்", continue: "தொடரவும் →", analyseBtn: "நோயாளியை பகுப்பாய்வு செய் ↗", skipXray: "X-ray இல்லை — வரலாறு மட்டும் பயன்படுத்து", aiDisclaimer: "AI திரையாய்வு கருவி — மருத்துவ நோயறிதல் அல்ல", aiDisclaimerSub: "இது ஆரம்ப அபாய மதிப்பீட்டில் பயிற்சிபெற்ற சுகாதார பணியாளர்களுக்கு உதவும். அனைத்து முடிவுகளும் மருத்துவரால் உறுதிசெய்யப்பட வேண்டும்.",
    schemesNote: "அரசு திட்டங்கள் மாநிலத்துக்கு மாறலாம். அதிகாரப்பூர்வ தளத்தில் தற்போதைய நன்மைகளை சரிபார்க்கவும்.", schemesViewAll: "அனைத்து திட்டங்களையும் காண்க →", schemesApply: "விண்ணப்பத்தை தொடங்கு", schemesApplySub: "உங்கள் மாநில திட்டங்களை கண்டறிய myScheme தளத்துக்குச் செல்லுங்கள்.", docsTitle: "தேவையான ஆவணங்கள்", docsSub: "எந்த திட்டத்துக்கும் விண்ணப்பிக்கும் முன் இந்த ஆவணங்களை தயார் வைத்துக்கொள்ளுங்கள்.", benefitsTitle: "நன்மைகள் ஒரு பார்வையில்", visitSite: "அதிகாரப்பூர்வ இணையதளம்", referralTitle: "ரெஃபரல் பட்டியல்", referralSub: "நோயாளி மாவட்டத்திற்கு அருகிலுள்ள நிபுணர் மையத்தை கண்டறியுங்கள்.",
  },
  gu: {
    navHome: "હોમ", navAbout: "અમારા વિશે", navFeatures: "વિશેષતાઓ", navAppointment: "અપોઇન્ટમેન્ટ", navTriage: "AI સ્ક્રીનિંગ", navSchemes: "યોજનાઓ", navBook: "અપોઇન્ટમેન્ટ બુક કરો",
    heroBadge: "AI આધારિત સ્ક્રીનિંગ · ભારતમાં ઉપલબ્ધ", heroTitle1: "સિલિકોસિસ અને TB માટે", heroTitle2: "AI ઓળખ", heroSub: "ખોટું નિદાન રોકો, જીવ બચાવો અને ગ્રામિણ ભારતમાં 5 સેકન્ડમાં ઝડપી સ્ક્રીનિંગ કરો.", heroBtn1: "AI સ્ક્રીનિંગ શરૂ કરો →", heroBtn2: "અપોઇન્ટમેન્ટ બુક કરો",
    statsD1: "સ્ક્રીનિંગ સમય", statsD2: "ચોકસાઈ દર", statsD3: "વળતર સહાય", statsD4: "ભારત કેન્દ્રિત",
    featuresTag: "SilicoSafe કેમ", featuresTitle: "ભારતની આરોગ્ય ખામીઓ માટે બનાવેલું", featuresSub: "ગ્રામિણ અને અર્ધશહેરી રેડિયોલોજી પડકારોને ધ્યાનમાં રાખીને દરેક સુવિધા બનાવેલી.",
    f1t: "AI X-ray વિશ્લેષણ", f1d: "સિલિકોસિસ અને TB પેટર્ન ઓળખવા માટે તાલીમબદ્ધ ડીપ લર્નિંગ મોડેલ.", f2t: "તાત્કાલિક પરિણામ", f2d: "5 સેકન્ડથી ઓછા સમયમાં AI સ્ક્રીનિંગ.", f3t: "ગ્રામિણ આરોગ્ય કેન્દ્રિત", f3d: "મર્યાદિત ઇન્ટરનેટ ધરાવતા ટિયર-2 અને ટિયર-3 ક્લિનિક માટે.", f4t: "સ્માર્ટ જોખમ એલર્ટ", f4d: "રંગ આધારિત જોખમ અને કરવાના પગલાં.", f5t: "વળતર સહાય", f5d: "સરકારી વળતર માટે દસ્તાવેજોમાં સહાય કરે છે.",
    probTag: "સમस्या", probTitle: "સિલિકોસિસને ઘણીવાર TB માનવામાં આવે છે", probSub: "ટિયર-2 અને ટિયર-3 ભારતમાં સિલિકોસિસ અને TB X-ray દેખાવ ઘણીવાર સમાન હોઈ શકે છે.", p1: "અનાવશ્યક TB દવા આપવામાં આવે છે", p2: "ખોટા નિદાનથી સારવાર ખર્ચ વેડફાય છે", p3: "સરકારી વળતર ગુમાય છે", p4: "વ્યવસાયિક ફેફસાના રોગથી અટકાવી શકાય તેવી મૃત્યુ",
    solTag: "કેવી રીતે કામ કરે છે", solTitle: "4 સરળ પગલાંમાં ચોક્કસ સ્ક્રીનિંગ", solSub: "SilicoSafe X-ray વિશ્લેષણ અને દર્દી માહિતી જોડીને ઝડપી પરિણામ આપે છે.", s1t: "દર્દી માહિતી", s1d: "દર્દીની મૂળભૂત માહિતી અને સ્થાન દાખલ કરો.", s2t: "કામનો ઇતિહાસ", s2d: "સિલિકા ધૂળ સંપર્કનો ઇતિહાસ દાખલ કરો.", s3t: "લક્ષણો", s3d: "હાલના લક્ષણો અને TB ઇતિહાસ દાખલ કરો.", s4t: "X-ray અપલોડ", s4d: "સમીક્ષા માટે છાતીનો X-ray અપલોડ કરો.",
    aboutTag: "અમારા વિશે", aboutTitle: "ભારતના સૌથી વંચિત દર્દીઓ માટે", aboutSub1: "યોગ્ય X-ray વાંચન ન મળવાથી કામદારો અટકાવી શકાય તેવા રોગથી કેમ મરે — આ પ્રશ્નથી SilicoSafe શરૂ થયું.", aboutSub2: "અમે આધુનિક રેડિયોલોજી અને અંતિમ માઇલ આરોગ્ય સેવા વચ્ચેનો અંતર પૂરતો AI પ્લેટફોર્મ બનાવ્યો.", aboutSub3: "અમે ડૉક્ટરોને બદલી રહ્યા નથી — દરેક ગ્રામિણ ક્લિનિકને ઝડપી બીજો અભિપ્રાય આપીએ છીએ.", aboutBtn: "અમારા સાથે ભાગીદારી કરો →", missionTitle: "અમારું મિશન", missionSub: "ભારતના ખાણ વિસ્તારમાં સિલિકોસિસના ખોટા નિદાનથી થતા અટકાવી શકાય તેવા મૃત્યુ ઘટાડવા.",
    apptTag: "શરૂ કરો", apptTitle: "અપોઇન્ટમેન્ટ બુક કરો", apptSub: "ડેમો, સ્ક્રીનિંગ સહાય અથવા ક્લિનિક જોડાણ માટે અમારી ટીમ સાથે વાત કરો.", formName: "પૂર્ણ નામ", formPhone: "ફોન નંબર", formDate: "પસંદ તારીખ", formType: "અપોઇન્ટમેન્ટ પ્રકાર", formDesc: "ટૂંકું વર્ણન", formPH_name: "ડૉ. રમેશ કુમાર", formPH_phone: "+91 98765 43210", formPH_desc: "દર્દીની સ્થિતિ અથવા હેતુ લખો...", formOpt1: "દર્દી સ્ક્રીનિંગ સહાય", formOpt2: "ક્લિનિક ડેમો", formOpt3: "ભાગીદારી ચર્ચા", formOpt4: "ટેકનિકલ ઇન્ટિગ્રેશન", formBtn: "અપોઇન્ટમેન્ટ બુક કરો →", formSuccess: "✅ અપોઇન્ટમેન્ટ બુક થઈ! અમારી ટીમ 24 કલાકમાં સંપર્ક કરશે.",
    footerDesc: "ગ્રામિણ ભારત માટે AI આધારિત સિલિકોસિસ સ્ક્રીનિંગ.", footerPlatform: "પ્લેટફોર્મ", footerSchemes: "યોજનાઓ", footerContact: "સંપર્ક", formTime: "પસંદ સમય", calToday: "આજે", calMorning: "સવાર", calAfternoon: "બપોર", calEvening: "સાંજ", calSelectDate: "તારીખ પસંદ કરો", calSelectTime: "સમય પસંદ કરો", fp1: "AI સ્ક્રીનિંગ", fp2: "X-ray અપલોડ", fp3: "જોખમ રિપોર્ટ", fp4: "વળતર દસ્તાવેજ", fs1: "રાજસ્થાન નીતિ", fs2: "ESIC લાભ", fs3: "PM-SYM પેન્શન", fs4: "DMF ફંડ", footerCopy: "© 2025 SilicoSafe. સર્વ અધિકાર સુરક્ષિત.", footerLinks: "ગોપનીયતા નીતિ · સેવાની શરતો",
    triageHeader: "AI સ્ક્રીનિંગ સાધન", triageTitle: "સિલિકોસિસ સ્ક્રીનિંગ", triageSub: "સંપૂર્ણ દર્દી મૂલ્યાંકન", step1: "દર્દી માહિતી", step2: "કામનો ઇતિહાસ", step3: "લક્ષણો", step4: "X-ray અપલોડ", back: "← પાછા", continue: "ચાલુ રાખો →", analyseBtn: "દર્દીનું વિશ્લેષણ કરો ↗", skipXray: "X-ray નથી — ફક્ત ઇતિહાસ વાપરો", aiDisclaimer: "AI સ્ક્રીનિંગ સાધન — તબીબી નિદાન નથી", aiDisclaimerSub: "આ સાધન પ્રાથમિક જોખમ મૂલ્યાંકનમાં તાલીમબદ્ધ આરોગ્યકર્મીઓને મદદ કરે છે. તમામ પરિણામો ડૉક્ટરથી ખાતરી કરાવો.",
    schemesNote: "સરકારી યોજનાઓ રાજ્ય મુજબ બદલાઈ શકે છે. સત્તાવાર પોર્ટલ પર તપાસો.", schemesViewAll: "બધી યોજનાઓ જુઓ →", schemesApply: "અરજી શરૂ કરો", schemesApplySub: "તમારા રાજ્યની યોજનાઓ શોધવા myScheme પોર્ટલ પર જાઓ.", docsTitle: "જરૂરી દસ્તાવેજો", docsSub: "કોઈપણ યોજનામાં અરજી કરતા પહેલા આ દસ્તાવેજો તૈયાર રાખો.", benefitsTitle: "લાભ એક નજરમાં", visitSite: "સત્તાવાર વેબસાઇટ જુઓ", referralTitle: "રેફરલ ડિરેક્ટરી", referralSub: "દર્દીના જિલ્લામાં નજીકનું નિષ્ણાત કેન્દ્ર શોધો.",
  },
  ur: {
    navHome: "ہوم", navAbout: "ہمارے بارے میں", navFeatures: "خصوصیات", navAppointment: "اپائنٹمنٹ", navTriage: "AI اسکریننگ", navSchemes: "اسکیمیں", navBook: "اپائنٹمنٹ بک کریں",
    heroBadge: "AI سے چلنے والی اسکریننگ · بھارت میں دستیاب", heroTitle1: "سلیکوسس اور ٹی بی کی", heroTitle2: "AI شناخت", heroSub: "غلط تشخیص کم کریں، جانیں بچائیں، اور دیہی بھارت میں 5 سیکنڈ میں تیز اسکریننگ کریں۔", heroBtn1: "AI اسکریننگ شروع کریں →", heroBtn2: "اپائنٹمنٹ بک کریں",
    statsD1: "اسکریننگ وقت", statsD2: "درستگی", statsD3: "معاوضہ مدد", statsD4: "بھارت پر توجہ",
    featuresTag: "SilicoSafe کیوں", featuresTitle: "بھارت کی صحت سہولتوں کی کمی کے لیے بنایا گیا", featuresSub: "ہر خصوصیت دیہی اور نیم شہری ریڈیالوجی چیلنجز کے لیے بنائی گئی ہے۔",
    f1t: "AI X-ray تجزیہ", f1d: "سلیکوسس اور TB پیٹرن کی شناخت کے لیے تربیت یافتہ ماڈل۔", f2t: "فوری نتائج", f2d: "5 سیکنڈ سے کم میں AI اسکریننگ۔", f3t: "دیہی صحت پر توجہ", f3d: "کم انٹرنیٹ والے ٹیر-2 اور ٹیر-3 کلینک کے لیے۔", f4t: "اسمارٹ خطرہ الرٹ", f4d: "رنگوں کے ذریعے خطرہ اور عملی مشورے۔", f5t: "معاوضہ مدد", f5d: "سرکاری معاوضے کے کاغذات میں مدد کرتا ہے۔",
    probTag: "مسئلہ", probTitle: "سلیکوسس کو اکثر TB سمجھ لیا جاتا ہے", probSub: "ٹیر-2 اور ٹیر-3 بھارت میں سلیکوسس اور TB کے X-ray پیٹرن ملتے جلتے ہو سکتے ہیں۔", p1: "غیر ضروری TB دوا دی جاتی ہے", p2: "غلط تشخیص سے علاج کا خرچ ضائع ہوتا ہے", p3: "سرکاری معاوضہ چھوٹ جاتا ہے", p4: "پیشہ ورانہ پھیپھڑوں کی بیماری سے قابلِ روک اموات",
    solTag: "یہ کیسے کام کرتا ہے", solTitle: "4 آسان مراحل میں درست اسکریننگ", solSub: "SilicoSafe X-ray تجزیہ اور مریض کی معلومات ملا کر تیز نتائج دیتا ہے۔", s1t: "مریض کی معلومات", s1d: "بنیادی تفصیلات اور مقام درج کریں۔", s2t: "کام کی تاریخ", s2d: "سلیکا دھول سے رابطے کی تاریخ درج کریں۔", s3t: "علامات", s3d: "موجودہ علامات اور TB تاریخ درج کریں۔", s4t: "X-ray اپ لوڈ", s4d: "جائزے کے لیے سینے کا X-ray اپ لوڈ کریں۔",
    aboutTag: "ہمارے بارے میں", aboutTitle: "بھارت کے محروم مریضوں کے لیے", aboutSub1: "SilicoSafe اس سوال سے شروع ہوا کہ درست X-ray پڑھائی نہ ہونے سے مزدور قابلِ روک بیماری سے کیوں مریں؟", aboutSub2: "ہم نے جدید ریڈیالوجی اور آخری میل صحت خدمت کے درمیان خلا کم کرنے والا AI پلیٹ فارم بنایا۔", aboutSub3: "ہم ڈاکٹرز کی جگہ نہیں لے رہے — ہر دیہی کلینک کو فوری دوسری رائے دیتے ہیں۔", aboutBtn: "ہمارے ساتھ شراکت کریں →", missionTitle: "ہمارا مقصد", missionSub: "بھارت کے کان کنی علاقوں میں سلیکوسس کی غلط تشخیص سے ہونے والی قابلِ روک اموات کم کرنا۔",
    apptTag: "شروع کریں", apptTitle: "اپائنٹمنٹ بک کریں", apptSub: "ڈیمو، اسکریننگ مدد یا کلینک آن بورڈنگ کے لیے ہماری ٹیم سے بات کریں۔", formName: "پورا نام", formPhone: "فون نمبر", formDate: "پسندیدہ تاریخ", formType: "اپائنٹمنٹ کی قسم", formDesc: "مختصر تفصیل", formPH_name: "ڈاکٹر رمیش کمار", formPH_phone: "+91 98765 43210", formPH_desc: "مریض کی حالت یا مقصد لکھیں...", formOpt1: "مریض اسکریننگ مدد", formOpt2: "کلینک ڈیمو", formOpt3: "شراکت داری گفتگو", formOpt4: "تکنیکی انضمام", formBtn: "اپائنٹمنٹ بک کریں →", formSuccess: "✅ اپائنٹمنٹ بک ہو گئی! ہماری ٹیم 24 گھنٹے میں رابطہ کرے گی۔",
    footerDesc: "دیہی بھارت کے لیے AI سے چلنے والی سلیکوسس اسکریننگ۔", footerPlatform: "پلیٹ فارم", footerSchemes: "اسکیمیں", footerContact: "رابطہ", formTime: "پسندیدہ وقت", calToday: "آج", calMorning: "صبح", calAfternoon: "دوپہر", calEvening: "شام", calSelectDate: "تاریخ منتخب کریں", calSelectTime: "وقت منتخب کریں", fp1: "AI اسکریننگ", fp2: "X-ray اپ لوڈ", fp3: "خطرہ رپورٹس", fp4: "معاوضہ دستاویزات", fs1: "راجستھان پالیسی", fs2: "ESIC فوائد", fs3: "PM-SYM پنشن", fs4: "DMF فنڈز", footerCopy: "© 2025 SilicoSafe. جملہ حقوق محفوظ۔", footerLinks: "پرائیویسی پالیسی · سروس شرائط",
    triageHeader: "AI اسکریننگ ٹول", triageTitle: "سلیکوسس اسکریننگ", triageSub: "مکمل مریض جائزہ", step1: "مریض معلومات", step2: "کام کی تاریخ", step3: "علامات", step4: "X-ray اپ لوڈ", back: "← واپس", continue: "جاری رکھیں →", analyseBtn: "مریض کا تجزیہ کریں ↗", skipXray: "X-ray نہیں — صرف تاریخ استعمال کریں", aiDisclaimer: "AI اسکریننگ ٹول — طبی تشخیص نہیں", aiDisclaimerSub: "یہ ٹول ابتدائی خطرہ جائزے میں تربیت یافتہ صحت کارکنوں کی مدد کرتا ہے۔ تمام نتائج ڈاکٹر سے تصدیق کرائیں۔",
    schemesNote: "سرکاری اسکیمیں ریاست کے مطابق بدل سکتی ہیں۔ سرکاری پورٹل پر تصدیق کریں۔", schemesViewAll: "تمام اسکیمیں دیکھیں →", schemesApply: "درخواست شروع کریں", schemesApplySub: "اپنی ریاست کی اسکیمیں تلاش کرنے کے لیے myScheme پورٹل دیکھیں۔", docsTitle: "ضروری دستاویزات", docsSub: "کسی اسکیم میں درخواست سے پہلے یہ دستاویزات تیار رکھیں۔", benefitsTitle: "فوائد ایک نظر میں", visitSite: "سرکاری ویب سائٹ دیکھیں", referralTitle: "ریفرل ڈائریکٹری", referralSub: "مریض کے ضلع کا قریبی ماہر مرکز تلاش کریں۔",
  },
});

Object.assign(T, {
  kn: {
    navHome: "ಮುಖಪುಟ", navAbout: "ನಮ್ಮ ಬಗ್ಗೆ", navFeatures: "ವೈಶಿಷ್ಟ್ಯಗಳು", navAppointment: "ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್", navTriage: "AI ಸ್ಕ್ರೀನಿಂಗ್", navSchemes: "ಯೋಜನೆಗಳು", navBook: "ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಬುಕ್ ಮಾಡಿ",
    heroBadge: "AI ಆಧಾರಿತ ಸ್ಕ್ರೀನಿಂಗ್ · ಭಾರತದಲ್ಲಿ ಲಭ್ಯ", heroTitle1: "ಸಿಲಿಕೋಸಿಸ್ ಮತ್ತು TB ಯ", heroTitle2: "AI ಗುರುತಿಸುವಿಕೆ", heroSub: "ತಪ್ಪು ನಿರ್ಣಯವನ್ನು ಕಡಿಮೆ ಮಾಡಿ, ಜೀವಗಳನ್ನು ಉಳಿಸಿ, ಗ್ರಾಮೀಣ ಭಾರತದಲ್ಲಿ 5 ಸೆಕೆಂಡುಗಳಲ್ಲಿ ವೇಗವಾದ ಸ್ಕ್ರೀನಿಂಗ್ ಮಾಡಿ.", heroBtn1: "AI ಸ್ಕ್ರೀನಿಂಗ್ ಆರಂಭಿಸಿ →", heroBtn2: "ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಬುಕ್ ಮಾಡಿ",
    statsD1: "ಸ್ಕ್ರೀನಿಂಗ್ ಸಮಯ", statsD2: "ನಿಖರತೆ", statsD3: "ಪರಿಹಾರ ಸಹಾಯ", statsD4: "ಭಾರತ ಕೇಂದ್ರೀಕೃತ",
    featuresTag: "SilicoSafe ಏಕೆ", featuresTitle: "ಭಾರತದ ಆರೋಗ್ಯ ಕೊರತೆಗಳಿಗೆ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ", featuresSub: "ಗ್ರಾಮೀಣ ಮತ್ತು ಅರೆನಗರ ರೇಡಿಯಾಲಜಿ ಸವಾಲುಗಳನ್ನು ಗಮನಿಸಿ ಪ್ರತಿಯೊಂದು ವೈಶಿಷ್ಟ್ಯ ರೂಪಿಸಲಾಗಿದೆ.",
    f1t: "AI X-ray ವಿಶ್ಲೇಷಣೆ", f1d: "ಸಿಲಿಕೋಸಿಸ್ ಮತ್ತು TB ಮಾದರಿಗಳನ್ನು ಗುರುತಿಸಲು ತರಬೇತಿ ಪಡೆದ ಡೀಪ್ ಲರ್ನಿಂಗ್ ಮಾದರಿ.", f2t: "ತಕ್ಷಣದ ಫಲಿತಾಂಶ", f2d: "5 ಸೆಕೆಂಡುಗಳೊಳಗೆ AI ಸ್ಕ್ರೀನಿಂಗ್.", f3t: "ಗ್ರಾಮೀಣ ಆರೋಗ್ಯ ಕೇಂದ್ರೀಕೃತ", f3d: "ಕಡಿಮೆ ಇಂಟರ್ನೆಟ್ ಇರುವ ಟಿಯರ್-2 ಮತ್ತು ಟಿಯರ್-3 ಕ್ಲಿನಿಕ್‌ಗಳಿಗಾಗಿ.", f4t: "ಸ್ಮಾರ್ಟ್ ಅಪಾಯ ಎಚ್ಚರಿಕೆ", f4d: "ಬಣ್ಣ ಆಧಾರಿತ ಅಪಾಯ ಫಲಿತಾಂಶ ಮತ್ತು ಕ್ರಮ ಸಲಹೆಗಳು.", f5t: "ಪರಿಹಾರ ಸಹಾಯ", f5d: "ಸರ್ಕಾರಿ ಪರಿಹಾರದ ದಾಖಲೆಗಳಿಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ.",
    probTag: "ಸಮಸ್ಯೆ", probTitle: "ಸಿಲಿಕೋಸಿಸ್ ಅನ್ನು ಹೆಚ್ಚಾಗಿ TB ಎಂದು ತಪ್ಪಾಗಿ ತಿಳಿಯುತ್ತಾರೆ", probSub: "ಟಿಯರ್-2 ಮತ್ತು ಟಿಯರ್-3 ಭಾರತದಲ್ಲಿ ಸಿಲಿಕೋಸಿಸ್ ಮತ್ತು TB X-ray ರೂಪಗಳು ಒಂದೇ ತರ ಕಾಣಬಹುದು.", p1: "ಅನಗತ್ಯ TB ಔಷಧಿ ನೀಡಲಾಗುತ್ತದೆ", p2: "ತಪ್ಪು ನಿರ್ಣಯದಿಂದ ಚಿಕಿತ್ಸೆ ವೆಚ್ಚ ವ್ಯರ್ಥ", p3: "ಸರ್ಕಾರಿ ಪರಿಹಾರ ಕಳೆದುಹೋಗುತ್ತದೆ", p4: "ವೃತ್ತಿ ಸಂಬಂಧಿತ ಶ್ವಾಸಕೋಶ ರೋಗದಿಂದ ತಡೆಯಬಹುದಾದ ಸಾವುಗಳು",
    solTag: "ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ", solTitle: "4 ಸರಳ ಹಂತಗಳಲ್ಲಿ ನಿಖರ ಸ್ಕ್ರೀನಿಂಗ್", solSub: "SilicoSafe X-ray ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ರೋಗಿ ಮಾಹಿತಿಯನ್ನು ಸೇರಿಸಿ ವೇಗವಾದ ಫಲಿತಾಂಶ ನೀಡುತ್ತದೆ.", s1t: "ರೋಗಿ ಮಾಹಿತಿ", s1d: "ರೋಗಿಯ ಮೂಲ ವಿವರಗಳು ಮತ್ತು ಸ್ಥಳ ದಾಖಲಿಸಿ.", s2t: "ಕೆಲಸದ ಇತಿಹಾಸ", s2d: "ಸಿಲಿಕಾ ಧೂಳು ಸಂಪರ್ಕ ಇತಿಹಾಸ ದಾಖಲಿಸಿ.", s3t: "ಲಕ್ಷಣಗಳು", s3d: "ಪ್ರಸ್ತುತ ಲಕ್ಷಣಗಳು ಮತ್ತು TB ಇತಿಹಾಸ ದಾಖಲಿಸಿ.", s4t: "X-ray ಅಪ್‌ಲೋಡ್", s4d: "ಪರಿಶೀಲನೆಗೆ ಎದೆ X-ray ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",
    aboutTag: "ನಮ್ಮ ಬಗ್ಗೆ", aboutTitle: "ಭಾರತದ ಅತಿ ವಂಚಿತ ರೋಗಿಗಳಿಗಾಗಿ", aboutSub1: "ಸರಿಯಾದ X-ray ಓದದ ಕಾರಣ ತಡೆಯಬಹುದಾದ ರೋಗದಿಂದ ಕಾರ್ಮಿಕರು ಏಕೆ ಸಾಯಬೇಕು ಎಂಬ ಪ್ರಶ್ನೆಯಿಂದ SilicoSafe ಆರಂಭವಾಯಿತು.", aboutSub2: "ಆಧುನಿಕ ರೇಡಿಯಾಲಜಿ ಮತ್ತು ಕೊನೆಯ ಹಂತದ ಆರೋಗ್ಯಸೇವೆಯ ನಡುವೆ ಇರುವ ಅಂತರವನ್ನು ಕಡಿಮೆ ಮಾಡುವ AI ವೇದಿಕೆಯನ್ನು ನಿರ್ಮಿಸಿದ್ದೇವೆ.", aboutSub3: "ನಾವು ವೈದ್ಯರನ್ನು ಬದಲಿಸುವುದಿಲ್ಲ — ಪ್ರತಿಯೊಂದು ಗ್ರಾಮೀಣ ಕ್ಲಿನಿಕ್‌ಗೆ ವೇಗದ ಎರಡನೇ ಅಭಿಪ್ರಾಯ ನೀಡುತ್ತೇವೆ.", aboutBtn: "ನಮ್ಮೊಂದಿಗೆ ಪಾಲುದಾರರಾಗಿ →", missionTitle: "ನಮ್ಮ ಮಿಷನ್", missionSub: "ಭಾರತದ ಗಣಿಗಾರಿಕೆ ಪ್ರದೇಶಗಳಲ್ಲಿ ಸಿಲಿಕೋಸಿಸ್ ತಪ್ಪು ನಿರ್ಣಯದಿಂದಾಗುವ ತಡೆಯಬಹುದಾದ ಸಾವುಗಳನ್ನು ಕಡಿಮೆ ಮಾಡುವುದು.",
    apptTag: "ಪ್ರಾರಂಭಿಸಿ", apptTitle: "ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಬುಕ್ ಮಾಡಿ", apptSub: "ಡೆಮೊ, ಸ್ಕ್ರೀನಿಂಗ್ ಸಹಾಯ ಅಥವಾ ಕ್ಲಿನಿಕ್ ಸೇರಿಸಲು ನಮ್ಮ ತಂಡದೊಂದಿಗೆ ಮಾತನಾಡಿ.", formName: "ಪೂರ್ಣ ಹೆಸರು", formPhone: "ಫೋನ್ ಸಂಖ್ಯೆ", formDate: "ಇಷ್ಟದ ದಿನಾಂಕ", formType: "ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಪ್ರಕಾರ", formDesc: "ಸಣ್ಣ ವಿವರಣೆ", formPH_name: "ಡಾ. ರಮೇಶ್ ಕುಮಾರ್", formPH_phone: "+91 98765 43210", formPH_desc: "ರೋಗಿಯ ಸ್ಥಿತಿ ಅಥವಾ ಉದ್ದೇಶವನ್ನು ಬರೆಯಿರಿ...", formOpt1: "ರೋಗಿ ಸ್ಕ್ರೀನಿಂಗ್ ಸಹಾಯ", formOpt2: "ಕ್ಲಿನಿಕ್ ಡೆಮೊ", formOpt3: "ಪಾಲುದಾರಿಕೆ ಚರ್ಚೆ", formOpt4: "ತಾಂತ್ರಿಕ ಏಕೀಕರಣ", formBtn: "ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಬುಕ್ ಮಾಡಿ →", formSuccess: "✅ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಬುಕ್ ಆಯಿತು! ನಮ್ಮ ತಂಡ 24 ಗಂಟೆಗಳಲ್ಲಿ ಸಂಪರ್ಕಿಸುತ್ತದೆ.",
    footerDesc: "ಗ್ರಾಮೀಣ ಭಾರತಕ್ಕಾಗಿ AI ಆಧಾರಿತ ಸಿಲಿಕೋಸಿಸ್ ಸ್ಕ್ರೀನಿಂಗ್.", footerPlatform: "ಪ್ಲಾಟ್‌ಫಾರ್ಮ್", footerSchemes: "ಯೋಜನೆಗಳು", footerContact: "ಸಂಪರ್ಕ", formTime: "ಇಷ್ಟದ ಸಮಯ", calToday: "ಇಂದು", calMorning: "ಬೆಳಗ್ಗೆ", calAfternoon: "ಮಧ್ಯಾಹ್ನ", calEvening: "ಸಂಜೆ", calSelectDate: "ದಿನಾಂಕ ಆಯ್ಕೆಮಾಡಿ", calSelectTime: "ಸಮಯ ಆಯ್ಕೆಮಾಡಿ", fp1: "AI ಸ್ಕ್ರೀನಿಂಗ್", fp2: "X-ray ಅಪ್‌ಲೋಡ್", fp3: "ಅಪಾಯ ವರದಿಗಳು", fp4: "ಪರಿಹಾರ ದಾಖಲೆಗಳು", fs1: "ರಾಜಸ್ಥಾನ ನೀತಿ", fs2: "ESIC ಲಾಭಗಳು", fs3: "PM-SYM ಪಿಂಚಣಿ", fs4: "DMF ನಿಧಿ", footerCopy: "© 2025 SilicoSafe. ಎಲ್ಲಾ ಹಕ್ಕುಗಳು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.", footerLinks: "ಗೌಪ್ಯತಾ ನೀತಿ · ಸೇವಾ ನಿಯಮಗಳು",
    triageHeader: "AI ಸ್ಕ್ರೀನಿಂಗ್ ಸಾಧನ", triageTitle: "ಸಿಲಿಕೋಸಿಸ್ ಸ್ಕ್ರೀನಿಂಗ್", triageSub: "ಸಂಪೂರ್ಣ ರೋಗಿ ಮೌಲ್ಯಮಾಪನ", step1: "ರೋಗಿ ಮಾಹಿತಿ", step2: "ಕೆಲಸದ ಇತಿಹಾಸ", step3: "ಲಕ್ಷಣಗಳು", step4: "X-ray ಅಪ್‌ಲೋಡ್", back: "← ಹಿಂದೆ", continue: "ಮುಂದುವರಿಸಿ →", analyseBtn: "ರೋಗಿಯನ್ನು ವಿಶ್ಲೇಷಿಸಿ ↗", skipXray: "X-ray ಇಲ್ಲ — ಇತಿಹಾಸ ಮಾತ್ರ ಬಳಸಿ", aiDisclaimer: "AI ಸ್ಕ್ರೀನಿಂಗ್ ಸಾಧನ — ವೈದ್ಯಕೀಯ ನಿರ್ಣಯವಲ್ಲ", aiDisclaimerSub: "ಇದು ಪ್ರಾಥಮಿಕ ಅಪಾಯ ಮೌಲ್ಯಮಾಪನದಲ್ಲಿ ತರಬೇತಿ ಪಡೆದ ಆರೋಗ್ಯ ಸಿಬ್ಬಂದಿಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ. ಎಲ್ಲಾ ಫಲಿತಾಂಶಗಳನ್ನು ವೈದ್ಯರು ದೃಢೀಕರಿಸಬೇಕು.",
    schemesNote: "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು ರಾಜ್ಯಾನುಸಾರ ಬದಲಾಗಬಹುದು. ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಪರಿಶೀಲಿಸಿ.", schemesViewAll: "ಎಲ್ಲಾ ಯೋಜನೆಗಳನ್ನು ನೋಡಿ →", schemesApply: "ಅರ್ಜಿಯನ್ನು ಪ್ರಾರಂಭಿಸಿ", schemesApplySub: "ನಿಮ್ಮ ರಾಜ್ಯದ ಯೋಜನೆಗಳನ್ನು ಹುಡುಕಲು myScheme ಪೋರ್ಟಲ್‌ಗೆ ಭೇಟಿ ನೀಡಿ.", docsTitle: "ಅಗತ್ಯ ದಾಖಲೆಗಳು", docsSub: "ಯಾವುದೇ ಯೋಜನೆಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸುವ ಮೊದಲು ಈ ದಾಖಲೆಗಳನ್ನು ಸಿದ್ಧಪಡಿಸಿ.", benefitsTitle: "ಲಾಭಗಳು ಒಂದು ನೋಟದಲ್ಲಿ", visitSite: "ಅಧಿಕೃತ ವೆಬ್‌ಸೈಟ್ ನೋಡಿ", referralTitle: "ರೆಫರಲ್ ಡೈರೆಕ್ಟರಿ", referralSub: "ರೋಗಿಯ ಜಿಲ್ಲೆಗೆ ಸಮೀಪದ ತಜ್ಞ ಕೇಂದ್ರವನ್ನು ಹುಡುಕಿ.",
  },
  or: {
    navHome: "ହୋମ", navAbout: "ଆମ ବିଷୟରେ", navFeatures: "ବିଶେଷତା", navAppointment: "ଆପଏଣ୍ଟମେଣ୍ଟ", navTriage: "AI ସ୍କ୍ରିନିଂ", navSchemes: "ଯୋଜନା", navBook: "ଆପଏଣ୍ଟମେଣ୍ଟ ବୁକ୍ କରନ୍ତୁ",
    heroBadge: "AI ଆଧାରିତ ସ୍କ୍ରିନିଂ · ଭାରତରେ ଉପଲବ୍ଧ", heroTitle1: "ସିଲିକୋସିସ ଏବଂ TB ର", heroTitle2: "AI ଚିହ୍ନଟ", heroSub: "ଭୁଲ ନିଦାନ କମାନ୍ତୁ, ଜୀବନ ବଞ୍ଚାନ୍ତୁ ଏବଂ ଗ୍ରାମୀଣ ଭାରତରେ 5 ସେକେଣ୍ଡରେ ସ୍କ୍ରିନିଂ କରନ୍ତୁ।", heroBtn1: "AI ସ୍କ୍ରିନିଂ ଆରମ୍ଭ କରନ୍ତୁ →", heroBtn2: "ଆପଏଣ୍ଟମେଣ୍ଟ ବୁକ୍ କରନ୍ତୁ",
    statsD1: "ସ୍କ୍ରିନିଂ ସମୟ", statsD2: "ସଠିକତା", statsD3: "କ୍ଷତିପୂରଣ ସହାୟତା", statsD4: "ଭାରତ କେନ୍ଦ୍ରିତ",
    featuresTag: "SilicoSafe କାହିଁକି", featuresTitle: "ଭାରତର ସ୍ୱାସ୍ଥ୍ୟ ଖାଲିକୁ ପୂରଣ ପାଇଁ", featuresSub: "ଗ୍ରାମୀଣ ଏବଂ ଅର୍ଦ୍ଧ-ସହର ରେଡିଓଲୋଜି ସମସ୍ୟା ପାଇଁ ବିଶେଷ ଭାବେ ତିଆରି।",
    f1t: "AI X-ray ବିଶ୍ଳେଷଣ", f1d: "ସିଲିକୋସିସ ଏବଂ TB ପ୍ୟାଟର୍ନ ଚିହ୍ନଟ ପାଇଁ ଶିକ୍ଷିତ ମଡେଲ୍।", f2t: "ତୁରନ୍ତ ଫଳାଫଳ", f2d: "5 ସେକେଣ୍ଡ ଭିତରେ AI ସ୍କ୍ରିନିଂ।", f3t: "ଗ୍ରାମୀଣ ସ୍ୱାସ୍ଥ୍ୟ କେନ୍ଦ୍ରିତ", f3d: "କମ୍ ଇଣ୍ଟରନେଟ୍ ଥିବା ଟିଅର-2 ଓ ଟିଅର-3 କ୍ଲିନିକ ପାଇଁ।", f4t: "ସ୍ମାର୍ଟ ଜୋଖିମ ସତର୍କତା", f4d: "ରଙ୍ଗ ଆଧାରିତ ଜୋଖିମ ଫଳାଫଳ ଏବଂ କାର୍ଯ୍ୟ ସୁପାରିଶ।", f5t: "କ୍ଷତିପୂରଣ ସହାୟତା", f5d: "ସରକାରୀ କ୍ଷତିପୂରଣ ଦଳିଲରେ ସହାୟତା କରେ।",
    probTag: "ସମସ୍ୟା", probTitle: "ସିଲିକୋସିସକୁ ପ୍ରାୟତଃ TB ବୋଲି ଧରାଯାଏ", probSub: "ଟିଅର-2 ଓ ଟିଅର-3 ଭାରତରେ ସିଲିକୋସିସ ଏବଂ TB X-ray ଚିତ୍ର ସମାନ ଲାଗିପାରେ।", p1: "ଅନାବଶ୍ୟକ TB ଔଷଧ ଦିଆଯାଏ", p2: "ଭୁଲ ନିଦାନରେ ଚିକିତ୍ସା ଖର୍ଚ୍ଚ ବ୍ୟର୍ଥ", p3: "ସରକାରୀ କ୍ଷତିପୂରଣ ହାରାଯାଏ", p4: "ପେଶାଗତ ଫୁସଫୁସ ରୋଗରେ ରୋକାଯୋଗ୍ୟ ମୃତ୍ୟୁ",
    solTag: "ଏହା କିପରି କାମ କରେ", solTitle: "4 ସହଜ ପଦକ୍ଷେପରେ ସଠିକ ସ୍କ୍ରିନିଂ", solSub: "SilicoSafe X-ray ବିଶ୍ଳେଷଣ ଓ ରୋଗୀ ତଥ୍ୟ ମିଶାଇ ଦ୍ରୁତ ଫଳ ଦେଇଥାଏ।", s1t: "ରୋଗୀ ତଥ୍ୟ", s1d: "ରୋଗୀଙ୍କ ମୂଳ ତଥ୍ୟ ଓ ସ୍ଥାନ ଲେଖନ୍ତୁ।", s2t: "କାମ ଇତିହାସ", s2d: "ସିଲିକା ଧୁଳି ସଂସ୍ପର୍ଶ ଇତିହାସ ଲେଖନ୍ତୁ।", s3t: "ଲକ୍ଷଣ", s3d: "ବର୍ତ୍ତମାନ ଲକ୍ଷଣ ଓ TB ଇତିହାସ ଲେଖନ୍ତୁ।", s4t: "X-ray ଅପଲୋଡ୍", s4d: "ସମୀକ୍ଷା ପାଇଁ ଛାତି X-ray ଅପଲୋଡ୍ କରନ୍ତୁ।",
    aboutTag: "ଆମ ବିଷୟରେ", aboutTitle: "ଭାରତର ସବୁଠାରୁ ବଞ୍ଚିତ ରୋଗୀଙ୍କ ପାଇଁ", aboutSub1: "ଠିକ୍ X-ray ପଢ଼ା ନ ହେବାରୁ ଶ୍ରମିକମାନେ ରୋକାଯୋଗ୍ୟ ରୋଗରେ କାହିଁକି ମରିବେ — ଏହି ପ୍ରଶ୍ନରୁ SilicoSafe ଆରମ୍ଭ ହୋଇଛି।", aboutSub2: "ଆଧୁନିକ ରେଡିଓଲୋଜି ଓ ଶେଷ ମାଇଲ୍ ସ୍ୱାସ୍ଥ୍ୟସେବା ମଧ୍ୟର ଖାଲିକୁ ପୂରଣ କରିବାକୁ AI ମଞ୍ଚ ତିଆରି କଲୁ।", aboutSub3: "ଆମେ ଡାକ୍ତରଙ୍କୁ ବଦଳାଉନାହିଁ — ପ୍ରତ୍ୟେକ ଗ୍ରାମୀଣ କ୍ଲିନିକକୁ ଦ୍ରୁତ ଦ୍ୱିତୀୟ ମତ ଦେଉଛୁ।", aboutBtn: "ଆମ ସହ ଭାଗୀଦାର ହୁଅନ୍ତୁ →", missionTitle: "ଆମ ମିଶନ", missionSub: "ଭାରତର ଖଣି ଅଞ୍ଚଳରେ ସିଲିକୋସିସ ଭୁଲ ନିଦାନରୁ ହେଉଥିବା ରୋକାଯୋଗ୍ୟ ମୃତ୍ୟୁ କମାଇବା।",
    apptTag: "ଆରମ୍ଭ କରନ୍ତୁ", apptTitle: "ଆପଏଣ୍ଟମେଣ୍ଟ ବୁକ୍ କରନ୍ତୁ", apptSub: "ଡେମୋ, ସ୍କ୍ରିନିଂ ସହାୟତା କିମ୍ବା କ୍ଲିନିକ ଯୋଡ଼ିବାକୁ ଆମ ଟିମ୍ ସହ କଥା ହୁଅନ୍ତୁ।", formName: "ପୂରା ନାମ", formPhone: "ଫୋନ୍ ନମ୍ବର", formDate: "ପସନ୍ଦ ତାରିଖ", formType: "ଆପଏଣ୍ଟମେଣ୍ଟ ପ୍ରକାର", formDesc: "ସଂକ୍ଷିପ୍ତ ବର୍ଣ୍ଣନା", formPH_name: "ଡା. ରମେଶ କୁମାର", formPH_phone: "+91 98765 43210", formPH_desc: "ରୋଗୀଙ୍କ ଅବସ୍ଥା କିମ୍ବା ଉଦ୍ଦେଶ୍ୟ ଲେଖନ୍ତୁ...", formOpt1: "ରୋଗୀ ସ୍କ୍ରିନିଂ ସହାୟତା", formOpt2: "କ୍ଲିନିକ ଡେମୋ", formOpt3: "ଭାଗୀଦାରୀ ଆଲୋଚନା", formOpt4: "ଟେକ୍ନିକାଲ୍ ଇଣ୍ଟିଗ୍ରେସନ", formBtn: "ଆପଏଣ୍ଟମେଣ୍ଟ ବୁକ୍ କରନ୍ତୁ →", formSuccess: "✅ ଆପଏଣ୍ଟମେଣ୍ଟ ବୁକ୍ ହେଲା! ଆମ ଟିମ୍ 24 ଘଣ୍ଟା ମଧ୍ୟରେ ସଂପର୍କ କରିବ।",
    footerDesc: "ଗ୍ରାମୀଣ ଭାରତ ପାଇଁ AI ଆଧାରିତ ସିଲିକୋସିସ ସ୍କ୍ରିନିଂ।", footerPlatform: "ପ୍ଲାଟଫର୍ମ", footerSchemes: "ଯୋଜନା", footerContact: "ସଂପର୍କ", formTime: "ପସନ୍ଦ ସମୟ", calToday: "ଆଜି", calMorning: "ସକାଳ", calAfternoon: "ଦୁପର", calEvening: "ସନ୍ଧ୍ୟା", calSelectDate: "ତାରିଖ ବାଛନ୍ତୁ", calSelectTime: "ସମୟ ବାଛନ୍ତୁ", fp1: "AI ସ୍କ୍ରିନିଂ", fp2: "X-ray ଅପଲୋଡ୍", fp3: "ଜୋଖିମ ରିପୋର୍ଟ", fp4: "କ୍ଷତିପୂରଣ ଦଳିଲ", fs1: "ରାଜସ୍ଥାନ ନୀତି", fs2: "ESIC ଲାଭ", fs3: "PM-SYM ପେନସନ", fs4: "DMF ଫଣ୍ଡ", footerCopy: "© 2025 SilicoSafe. ସମସ୍ତ ଅଧିକାର ସଂରକ୍ଷିତ।", footerLinks: "ଗୋପନୀୟତା ନୀତି · ସେବା ସର୍ତ୍ତ",
    triageHeader: "AI ସ୍କ୍ରିନିଂ ଟୁଲ୍", triageTitle: "ସିଲିକୋସିସ ସ୍କ୍ରିନିଂ", triageSub: "ସମ୍ପୂର୍ଣ୍ଣ ରୋଗୀ ମୂଲ୍ୟାଙ୍କନ", step1: "ରୋଗୀ ତଥ୍ୟ", step2: "କାମ ଇତିହାସ", step3: "ଲକ୍ଷଣ", step4: "X-ray ଅପଲୋଡ୍", back: "← ପଛକୁ", continue: "ଆଗକୁ →", analyseBtn: "ରୋଗୀକୁ ବିଶ୍ଳେଷଣ କରନ୍ତୁ ↗", skipXray: "X-ray ନାହିଁ — କେବଳ ଇତିହାସ ବ୍ୟବହାର କରନ୍ତୁ", aiDisclaimer: "AI ସ୍କ୍ରିନିଂ ଟୁଲ୍ — ଚିକିତ୍ସା ନିଦାନ ନୁହେଁ", aiDisclaimerSub: "ଏହା ପ୍ରାରମ୍ଭିକ ଜୋଖିମ ମୂଲ୍ୟାଙ୍କନରେ ପ୍ରଶିକ୍ଷିତ ସ୍ୱାସ୍ଥ୍ୟକର୍ମୀଙ୍କୁ ସହାୟତା କରେ। ସମସ୍ତ ଫଳ ଡାକ୍ତରଙ୍କ ଦ୍ୱାରା ନିଶ୍ଚିତ କରାଯିବା ଆବଶ୍ୟକ।",
    schemesNote: "ସରକାରୀ ଯୋଜନା ରାଜ୍ୟ ଅନୁସାରେ ବଦଳିପାରେ। ଅଧିକୃତ ପୋର୍ଟାଲରେ ଯାଞ୍ଚ କରନ୍ତୁ।", schemesViewAll: "ସମସ୍ତ ଯୋଜନା ଦେଖନ୍ତୁ →", schemesApply: "ଆବେଦନ ଆରମ୍ଭ କରନ୍ତୁ", schemesApplySub: "ଆପଣଙ୍କ ରାଜ୍ୟର ଯୋଜନା ଖୋଜିବାକୁ myScheme ପୋର୍ଟାଲକୁ ଯାଆନ୍ତୁ।", docsTitle: "ଆବଶ୍ୟକ ଦଳିଲ", docsSub: "ଯେକୌଣସି ଯୋଜନାରେ ଆବେଦନ ପୂର୍ବରୁ ଏହି ଦଳିଲ ପ୍ରସ୍ତୁତ ରଖନ୍ତୁ।", benefitsTitle: "ଲାଭ ଏକ ନଜରରେ", visitSite: "ଅଧିକୃତ ୱେବସାଇଟ୍ ଦେଖନ୍ତୁ", referralTitle: "ରେଫରାଲ୍ ଡିରେକ୍ଟରି", referralSub: "ରୋଗୀଙ୍କ ଜିଲ୍ଲାର ନିକଟତମ ବିଶେଷଜ୍ଞ କେନ୍ଦ୍ର ଖୋଜନ୍ତୁ।",
  },
  ml: {
    navHome: "ഹോം", navAbout: "ഞങ്ങളെ കുറിച്ച്", navFeatures: "സവിശേഷതകൾ", navAppointment: "അപ്പോയിന്റ്മെന്റ്", navTriage: "AI സ്ക്രീനിംഗ്", navSchemes: "പദ്ധതികൾ", navBook: "അപ്പോയിന്റ്മെന്റ് ബുക്ക് ചെയ്യുക",
    heroBadge: "AI അധിഷ്ഠിത സ്ക്രീനിംഗ് · ഇന്ത്യയിൽ ലഭ്യം", heroTitle1: "സിലിക്കോസിസ് vs TB", heroTitle2: "AI തിരിച്ചറിയൽ", heroSub: "തെറ്റായ രോഗനിർണ്ണയം കുറച്ച്, ജീവൻ രക്ഷിച്ച്, ഗ്രാമീണ ഇന്ത്യയിൽ 5 സെക്കൻഡിൽ വേഗത്തിലുള്ള സ്ക്രീനിംഗ് നടത്തുക.", heroBtn1: "AI സ്ക്രീനിംഗ് ആരംഭിക്കുക →", heroBtn2: "അപ്പോയിന്റ്മെന്റ് ബുക്ക് ചെയ്യുക",
    statsD1: "സ്ക്രീനിംഗ് സമയം", statsD2: "കൃത്യത", statsD3: "നഷ്ടപരിഹാര സഹായം", statsD4: "ഇന്ത്യ കേന്ദ്രീകൃതം",
    featuresTag: "SilicoSafe എന്തിന്", featuresTitle: "ഇന്ത്യയിലെ ആരോഗ്യ സേവന ഇടവേളകൾക്കായി രൂപകൽപ്പന ചെയ്തത്", featuresSub: "ഗ്രാമീണ, അർധനഗര റേഡിയോളജി വെല്ലുവിളികൾക്കായി ഓരോ സവിശേഷതയും രൂപപ്പെടുത്തിയിരിക്കുന്നു.",
    f1t: "AI X-ray വിശകലനം", f1d: "സിലിക്കോസിസ്, TB മാതൃകകൾ തിരിച്ചറിയാൻ പരിശീലിപ്പിച്ച മോഡൽ.", f2t: "ഉടൻ ഫലങ്ങൾ", f2d: "5 സെക്കൻഡിനുള്ളിൽ AI സ്ക്രീനിംഗ്.", f3t: "ഗ്രാമീണ ആരോഗ്യ ശ്രദ്ധ", f3d: "കുറഞ്ഞ ഇന്റർനെറ്റ് ഉള്ള ടിയർ-2, ടിയർ-3 ക്ലിനിക്കുകൾക്കായി.", f4t: "സ്മാർട്ട് റിസ്‌ക് അലർട്ട്", f4d: "നിറം അടിസ്ഥാനമാക്കിയ റിസ്‌ക് ഫലങ്ങളും നിർദ്ദേശങ്ങളും.", f5t: "നഷ്ടപരിഹാര സഹായം", f5d: "സർക്കാർ നഷ്ടപരിഹാര രേഖകൾ തയ്യാറാക്കാൻ സഹായിക്കുന്നു.",
    probTag: "പ്രശ്നം", probTitle: "സിലിക്കോസിസ് പലപ്പോഴും TB ആയി തെറ്റിദ്ധരിക്കുന്നു", probSub: "ടിയർ-2, ടിയർ-3 ഇന്ത്യയിൽ സിലിക്കോസിസ്, TB X-ray രൂപങ്ങൾ സമാനമായി തോന്നാം.", p1: "അനാവശ്യ TB മരുന്നുകൾ നൽകപ്പെടുന്നു", p2: "തെറ്റായ നിർണ്ണയത്തിൽ ചികിത്സാചെലവ് പാഴാകും", p3: "സർക്കാർ നഷ്ടപരിഹാരം നഷ്ടമാകും", p4: "തൊഴിൽബന്ധിത ശ്വാസകോശരോഗത്താൽ തടയാവുന്ന മരണങ്ങൾ",
    solTag: "ഇത് എങ്ങനെ പ്രവർത്തിക്കുന്നു", solTitle: "4 ലളിത ഘട്ടങ്ങളിൽ കൃത്യമായ സ്ക്രീനിംഗ്", solSub: "SilicoSafe X-ray വിശകലനവും രോഗിവിവരവും ചേർത്ത് വേഗത്തിൽ ഫലങ്ങൾ നൽകുന്നു.", s1t: "രോഗി വിവരം", s1d: "അടിസ്ഥാന വിവരങ്ങളും സ്ഥലം രേഖപ്പെടുത്തുക.", s2t: "ജോലി ചരിത്രം", s2d: "സിലിക്കാ പൊടി സമ്പർക്ക ചരിത്രം രേഖപ്പെടുത്തുക.", s3t: "ലക്ഷണങ്ങൾ", s3d: "നിലവിലെ ലക്ഷണങ്ങളും TB ചരിത്രവും രേഖപ്പെടുത്തുക.", s4t: "X-ray അപ്‌ലോഡ്", s4d: "റിവ്യൂവിനായി നെഞ്ച് X-ray അപ്‌ലോഡ് ചെയ്യുക.",
    aboutTag: "ഞങ്ങളെ കുറിച്ച്", aboutTitle: "ഇന്ത്യയിലെ ഏറ്റവും അവഗണിക്കപ്പെട്ട രോഗികൾക്കായി", aboutSub1: "ശരിയായ X-ray വായന ഇല്ലാത്തതിനാൽ തൊഴിലാളികൾ തടയാവുന്ന രോഗത്തിൽ എന്തിന് മരിക്കണം എന്ന ചോദ്യത്തിൽ നിന്നാണ് SilicoSafe തുടങ്ങിയത്.", aboutSub2: "ആധുനിക റേഡിയോളജിയും അവസാന മൈൽ ആരോഗ്യ സേവനവും തമ്മിലുള്ള ഇടവേള കുറയ്ക്കുന്ന AI പ്ലാറ്റ്ഫോം നിർമ്മിച്ചു.", aboutSub3: "ഞങ്ങൾ ഡോക്ടർമാരെ മാറ്റുന്നില്ല — ഓരോ ഗ്രാമീണ ക്ലിനിക്കിനും വേഗത്തിലുള്ള രണ്ടാം അഭിപ്രായം നൽകുന്നു.", aboutBtn: "ഞങ്ങളോടൊപ്പം പങ്കാളിയാകൂ →", missionTitle: "ഞങ്ങളുടെ ദൗത്യം", missionSub: "ഇന്ത്യയിലെ ഖനന മേഖലകളിൽ സിലിക്കോസിസ് തെറ്റായ നിർണ്ണയത്തിൽ നിന്നുള്ള തടയാവുന്ന മരണങ്ങൾ കുറയ്ക്കുക.",
    apptTag: "തുടങ്ങുക", apptTitle: "അപ്പോയിന്റ്മെന്റ് ബുക്ക് ചെയ്യുക", apptSub: "ഡെമോ, സ്ക്രീനിംഗ് സഹായം, ക്ലിനിക്ക് ഓൺബോർഡിംഗ് എന്നിവയ്ക്കായി ഞങ്ങളുടെ ടീമുമായി സംസാരിക്കുക.", formName: "പൂർണ്ണ പേര്", formPhone: "ഫോൺ നമ്പർ", formDate: "ഇഷ്ട തീയതി", formType: "അപ്പോയിന്റ്മെന്റ് തരം", formDesc: "ചുരുക്ക വിവരണം", formPH_name: "ഡോ. രമേഷ് കുമാർ", formPH_phone: "+91 98765 43210", formPH_desc: "രോഗിയുടെ അവസ്ഥ അല്ലെങ്കിൽ ഉദ്ദേശ്യം എഴുതുക...", formOpt1: "രോഗി സ്ക്രീനിംഗ് സഹായം", formOpt2: "ക്ലിനിക്ക് ഡെമോ", formOpt3: "പങ്കാളിത്ത ചർച്ച", formOpt4: "ടെക്നിക്കൽ ഇന്റഗ്രേഷൻ", formBtn: "അപ്പോയിന്റ്മെന്റ് ബുക്ക് ചെയ്യുക →", formSuccess: "✅ അപ്പോയിന്റ്മെന്റ് ബുക്ക് ചെയ്തു! ഞങ്ങളുടെ ടീം 24 മണിക്കൂറിനകം ബന്ധപ്പെടും.",
    footerDesc: "ഗ്രാമീണ ഇന്ത്യയ്ക്കായി AI അധിഷ്ഠിത സിലിക്കോസിസ് സ്ക്രീനിംഗ്.", footerPlatform: "പ്ലാറ്റ്ഫോം", footerSchemes: "പദ്ധതികൾ", footerContact: "ബന്ധപ്പെടുക", formTime: "ഇഷ്ട സമയം", calToday: "ഇന്ന്", calMorning: "രാവിലെ", calAfternoon: "ഉച്ചയ്ക്ക്", calEvening: "വൈകുന്നേരം", calSelectDate: "തീയതി തിരഞ്ഞെടുക്കുക", calSelectTime: "സമയം തിരഞ്ഞെടുക്കുക", fp1: "AI സ്ക്രീനിംഗ്", fp2: "X-ray അപ്‌ലോഡ്", fp3: "റിസ്‌ക് റിപ്പോർട്ടുകൾ", fp4: "നഷ്ടപരിഹാര രേഖകൾ", fs1: "രാജസ്ഥാൻ നയം", fs2: "ESIC ആനുകൂല്യങ്ങൾ", fs3: "PM-SYM പെൻഷൻ", fs4: "DMF ഫണ്ടുകൾ", footerCopy: "© 2025 SilicoSafe. എല്ലാ അവകാശങ്ങളും സംരക്ഷിതം.", footerLinks: "സ്വകാര്യതാ നയം · സേവന വ്യവസ്ഥകൾ",
    triageHeader: "AI സ്ക്രീനിംഗ് ടൂൾ", triageTitle: "സിലിക്കോസിസ് സ്ക്രീനിംഗ്", triageSub: "സമ്പൂർണ്ണ രോഗി വിലയിരുത്തൽ", step1: "രോഗി വിവരം", step2: "ജോലി ചരിത്രം", step3: "ലക്ഷണങ്ങൾ", step4: "X-ray അപ്‌ലോഡ്", back: "← പിന്നോട്ട്", continue: "തുടരുക →", analyseBtn: "രോഗിയെ വിശകലനം ചെയ്യുക ↗", skipXray: "X-ray ലഭ്യമല്ല — ചരിത്രം മാത്രം ഉപയോഗിക്കുക", aiDisclaimer: "AI സ്ക്രീനിംഗ് ടൂൾ — മെഡിക്കൽ രോഗനിർണ്ണയം അല്ല", aiDisclaimerSub: "ഇത് പ്രാഥമിക റിസ്‌ക് വിലയിരുത്തലിൽ പരിശീലനം നേടിയ ആരോഗ്യപ്രവർത്തകരെ സഹായിക്കുന്നു. എല്ലാ ഫലങ്ങളും ഡോക്ടർ സ്ഥിരീകരിക്കണം.",
    schemesNote: "സർക്കാർ പദ്ധതികൾ സംസ്ഥാനമനുസരിച്ച് മാറാം. ഔദ്യോഗിക പോർട്ടലിൽ പരിശോധിക്കുക.", schemesViewAll: "എല്ലാ പദ്ധതികളും കാണുക →", schemesApply: "അപേക്ഷ ആരംഭിക്കുക", schemesApplySub: "നിങ്ങളുടെ സംസ്ഥാന പദ്ധതികൾ കണ്ടെത്താൻ myScheme പോർട്ടലിലേക്ക് പോകുക.", docsTitle: "ആവശ്യമായ രേഖകൾ", docsSub: "ഏതെങ്കിലും പദ്ധതിക്ക് അപേക്ഷിക്കുന്നതിന് മുമ്പ് ഈ രേഖകൾ തയ്യാറാക്കുക.", benefitsTitle: "ആനുകൂല്യങ്ങൾ ഒറ്റനോട്ടത്തിൽ", visitSite: "ഔദ്യോഗിക വെബ്‌സൈറ്റ് കാണുക", referralTitle: "റഫറൽ ഡയറക്ടറി", referralSub: "രോഗിയുടെ ജില്ലയ്ക്കടുത്തുള്ള വിദഗ്ധ കേന്ദ്രം കണ്ടെത്തുക.",
  },
});

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const LANGUAGE_OPTIONS = [
  { code: "en", name: "English", nativeName: "English", speech: "en-IN" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", speech: "hi-IN" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", speech: "bn-IN" },
  { code: "mr", name: "Marathi", nativeName: "मराठी", speech: "mr-IN" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", speech: "te-IN" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", speech: "ta-IN" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી", speech: "gu-IN" },
  { code: "ur", name: "Urdu", nativeName: "اردو", speech: "ur-IN" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", speech: "kn-IN" },
  { code: "or", name: "Odia", nativeName: "ଓଡ଼ିଆ", speech: "or-IN" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം", speech: "ml-IN" },
];

function getT(lang) {
  return { ...T.en, ...(T[lang] || {}) };
}

function getLanguageOption(lang) {
  return LANGUAGE_OPTIONS.find(option => option.code === lang) || LANGUAGE_OPTIONS[0];
}

const C = {
  g1: "#0a7f5a", g2: "#0d9e6f", g3: "#2ecc71", g4: "#e8f8f0",
  green: "#1D9E75", greenDark: "#0F6E56", greenLight: "#E1F5EE", greenMid: "#9FE1CB",
  red: "#E24B4A", redLight: "#FCEBEB", redDark: "#A32D2D",
  amber: "#BA7517", amberLight: "#FAEEDA",
  text: "#1a1a1a", text2: "#6b6b6b", text3: "#9a9a9a",
  bg: "#ffffff", bg2: "#f5f5f3", bg3: "#ededeb",
  border: "rgba(0,0,0,0.11)", border2: "rgba(0,0,0,0.2)",
  dark: "#0c1a13", mid: "#4a7c62", light: "#f2faf6",
  muted: "#5a7a6a", borderC: "#d0ecde",
};

const FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.5)} }
  @keyframes scan { 0%{top:0} 100%{top:100%} }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideUp { from { transform: translateY(36px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  @keyframes badgePulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.5)} }
  @keyframes slideIn { from { opacity:0; transform: translateX(12px); } to { opacity:1; transform: translateX(0); } }
  @keyframes floatUp { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
  @keyframes pathDraw { from{stroke-dashoffset:300} to{stroke-dashoffset:0} }
`;

// ─── AI DISCLAIMER BANNER ─────────────────────────────────────────────────────
const API_BASE = (import.meta.env.VITE_API_URL || "http://localhost:8000").replace(/\/$/, "");
const AUTH_STORAGE_KEY = "silicosafe_auth";

async function apiRequest(path, options = {}) {
  const { token, headers = {}, body, ...rest } = options;
  const isFormData = body instanceof FormData;
  let response;
  try {
    response = await fetch(`${API_BASE}${path}`, {
      ...rest,
      body: isFormData ? body : body ? JSON.stringify(body) : undefined,
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
    });
  } catch {
    throw new Error(
      `Cannot connect to the SilicoSafe server at ${API_BASE}.\n\n` +
      `सर्वर से कनेक्ट नहीं हो पा रहा (${API_BASE}).\n\n` +
      `Fix: Open a new terminal → cd backend → npm install → npm run dev\n` +
      `Then try again. Both frontend and backend must run simultaneously.`
    );
  }
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || "Request failed");
  }
  return data;
}

function stripHtml(value = "") {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function getStoredAuth() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) || "null");
  } catch {
    return null;
  }
}

function AIDisclaimer({ lang, compact = false }) {
  const t = getT(lang);
  if (compact) {
    return (
      <div style={{
        display: "flex", alignItems: "flex-start", gap: 10,
        background: "rgba(186,117,23,0.08)", border: "1px solid rgba(186,117,23,0.25)",
        borderRadius: 10, padding: "10px 14px", marginBottom: 16,
      }}>
        <span style={{ fontSize: 15, flexShrink: 0, marginTop: 1 }}>⚕️</span>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.amber }}>{t.aiDisclaimer}</div>
          <div style={{ fontSize: 11, color: "#7a5a1a", marginTop: 2, lineHeight: 1.5 }}>{t.aiDisclaimerSub}</div>
        </div>
      </div>
    );
  }
  return (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: 12,
      background: "rgba(186,117,23,0.07)", border: "1px solid rgba(186,117,23,0.22)",
      borderRadius: 12, padding: "14px 18px", marginBottom: 20,
    }}>
      <span style={{ fontSize: 18, flexShrink: 0, marginTop: 2 }}>⚕️</span>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.amber, marginBottom: 3 }}>{t.aiDisclaimer}</div>
        <div style={{ fontSize: 12, color: "#7a5a1a", lineHeight: 1.6 }}>{t.aiDisclaimerSub}</div>
      </div>
    </div>
  );
}

// ─── LANGUAGE TOGGLE ──────────────────────────────────────────────────────────
function LangToggle({ lang, setLang }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 3,
      background: "rgba(10,127,90,0.08)", borderRadius: 20,
      padding: "3px", border: `1px solid ${C.borderC}`,
    }}>
      {[["en", "EN"], ["hi", "हि"]].map(([code, label]) => (
        <button key={code} onClick={() => setLang(code)} style={{
          padding: "5px 13px", borderRadius: 16, fontSize: 12, fontWeight: 700,
          border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
          background: lang === code ? C.g1 : "transparent",
          color: lang === code ? "white" : C.muted,
          transition: "all .2s",
        }}>{label}</button>
      ))}
    </div>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function LanguageSelect({ lang, setLang }) {
  const selected = getLanguageOption(lang);
  return (
    <label style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(10,127,90,0.08)", borderRadius: 20, padding: "4px 8px", border: `1px solid ${C.borderC}` }}>
      <span style={{ fontSize: 13, color: C.g1, fontWeight: 800 }}>भाषा</span>
      <select
        value={selected.code}
        onChange={e => setLang(e.target.value)}
        title="Choose language"
        style={{ border: "none", background: "transparent", color: C.dark, fontWeight: 700, fontSize: 12, outline: "none", cursor: "pointer", maxWidth: 138 }}
      >
        {LANGUAGE_OPTIONS.map(option => (
          <option key={option.code} value={option.code}>{option.nativeName}</option>
        ))}
      </select>
    </label>
  );
}

function Navbar({ currentPage, setPage, lang, setLang }) {
  const t = getT(lang);
  const links = [
    { label: t.navHome, page: "home" },
    { label: t.navAbout, page: "home", anchor: "about" },
    { label: t.navFeatures, page: "home", anchor: "features" },
    { label: t.navAppointment, page: "home", anchor: "appointment" },
    { label: t.navTriage, page: "triage" },
    { label: t.navSchemes, page: "schemes" },
    { label: lang === "en" ? "Admin" : "एडमिन", page: "admin" },
  ];

  const handleNav = (link) => {
    setPage(link.page);
    if (link.anchor) {
      setTimeout(() => {
        const el = document.getElementById(link.anchor);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <style>{FONTS}</style>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
        background: "rgba(255,255,255,0.97)", backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${C.borderC}`, height: 68,
        display: "flex", alignItems: "center",
      }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          maxWidth: 1240, margin: "0 auto", padding: "0 32px", width: "100%",
        }}>
          <div onClick={() => { setPage("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 22, fontWeight: 800, color: C.g1 }}>
            <div style={{ width: 38, height: 38, background: `linear-gradient(135deg,${C.g1},${C.g3})`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" /></svg>
            </div>
            SilicoSafe
          </div>
          <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {links.map(link => (
              <span key={link.label} onClick={() => handleNav(link)}
                style={{ fontSize: 14, fontWeight: 500, cursor: "pointer", color: (currentPage === link.page && !link.anchor) ? C.g1 : C.muted, transition: "color .2s" }}>
                {link.label}
              </span>
            ))}
            <LanguageSelect lang={lang} setLang={setLang} />
            <button onClick={() => handleNav({ page: "home", anchor: "appointment" })}
              style={{ background: `linear-gradient(135deg,${C.g1},${C.g2})`, color: "white", padding: "10px 22px", borderRadius: 25, fontSize: 13, fontWeight: 700, border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
              {t.navBook}
            </button>
          </div>
        </div>
      </nav>
      <div style={{ height: 68 }} />
    </>
  );
}

// ─── HERO ILLUSTRATION: Worker-to-Doctor AI Bridge ───────────────────────────
function HeroIllustration({ lang }) {
  return (
    <div style={{
      background: "white", borderRadius: 24, border: `1px solid #c8eedd`,
      padding: 28, width: "min(380px, 100%)",
      boxShadow: "0 24px 64px rgba(10,127,90,.13)",
      overflow: "hidden", position: "relative",
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: C.g1, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
          {lang === "en" ? "Patient Journey · AI Assisted" : "रोगी यात्रा · AI सहायता"}
        </span>
        <span style={{ background: `linear-gradient(135deg,${C.g1},${C.g3})`, color: "white", fontSize: 10, fontWeight: 800, padding: "4px 10px", borderRadius: 12, letterSpacing: ".8px" }}>LIVE</span>
      </div>

      {/* SVG illustration: miner → clinic → AI → doctor */}
      <svg viewBox="0 0 324 190" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto", display: "block", marginBottom: 16 }}>
        {/* Background */}
        <rect width="324" height="190" rx="14" fill="#f2faf6" />

        {/* ── MINER (left) ── */}
        {/* body */}
        <rect x="20" y="100" width="30" height="42" rx="6" fill="#e07b39" />
        {/* head */}
        <circle cx="35" cy="90" r="13" fill="#f5c5a0" />
        {/* hard hat */}
        <ellipse cx="35" cy="80" rx="15" ry="5" fill="#f0b429" />
        <rect x="22" y="76" width="26" height="8" rx="4" fill="#f0b429" />
        {/* arm holding pickaxe */}
        <line x1="50" y1="110" x2="66" y2="128" stroke="#e07b39" strokeWidth="5" strokeLinecap="round" />
        {/* pickaxe */}
        <line x1="58" y1="136" x2="74" y2="120" stroke="#8B6914" strokeWidth="3" strokeLinecap="round" />
        <path d="M74 120 L82 112 L78 124 Z" fill="#8B6914" />
        {/* legs */}
        <rect x="22" y="138" width="10" height="18" rx="3" fill="#5a4a3a" />
        <rect x="34" y="138" width="10" height="18" rx="3" fill="#5a4a3a" />
        {/* dust particles */}
        <circle cx="80" cy="118" r="2.5" fill="#ccc" opacity="0.7" />
        <circle cx="88" cy="112" r="2" fill="#ccc" opacity="0.5" />
        <circle cx="76" cy="108" r="1.5" fill="#ccc" opacity="0.6" />
        {/* Label */}
        <text x="35" y="168" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="9" fill="#5a7a6a" fontWeight="600">
          {lang === "en" ? "Miner" : "खनिक"}
        </text>

        {/* ── ARROW 1 ── */}
        <path d="M78 130 Q105 130 108 130" stroke="#0a7f5a" strokeWidth="2" strokeDasharray="4,3" fill="none" />
        <polygon points="108,127 114,130 108,133" fill="#0a7f5a" />

        {/* ── CLINIC / TABLET (center) ── */}
        {/* tablet frame */}
        <rect x="118" y="74" width="88" height="64" rx="8" fill="#0c1a13" />
        <rect x="122" y="78" width="80" height="56" rx="5" fill="#0d2a1e" />
        {/* lung outline left */}
        <ellipse cx="147" cy="106" rx="16" ry="20" fill="none" stroke="#2a5a3a" strokeWidth="1.2" />
        <ellipse cx="147" cy="106" rx="10" ry="13" fill="#1a3a28" stroke="#3a7a50" strokeWidth="0.8" />
        {/* lung outline right */}
        <ellipse cx="177" cy="106" rx="16" ry="20" fill="none" stroke="#2a5a3a" strokeWidth="1.2" />
        <ellipse cx="177" cy="106" rx="10" ry="13" fill="#1a3a28" stroke="#3a7a50" strokeWidth="0.8" />
        {/* spine */}
        <line x1="162" y1="84" x2="162" y2="128" stroke="#4a9a6a" strokeWidth="1.8" />
        {/* scan line animation */}
        <rect x="122" y="78" width="80" height="2" fill="rgba(46,204,113,0.6)">
          <animateTransform attributeName="transform" type="translate" values="0,0;0,54;0,0" dur="3s" repeatCount="indefinite" />
        </rect>
        {/* AI label on tablet */}
        <text x="162" y="144" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="#2ecc71" opacity="0.8">AI SCAN</text>
        {/* Label */}
        <text x="162" y="168" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="9" fill="#5a7a6a" fontWeight="600">
          {lang === "en" ? "AI Analysis" : "AI जांच"}
        </text>

        {/* ── ARROW 2 ── */}
        <path d="M210 106 Q215 106 218 106" stroke="#0a7f5a" strokeWidth="2" strokeDasharray="4,3" fill="none" />
        <polygon points="218,103 224,106 218,109" fill="#0a7f5a" />

        {/* ── DOCTOR (right) ── */}
        {/* white coat body */}
        <rect x="232" y="100" width="34" height="44" rx="6" fill="white" stroke="#d0ecde" strokeWidth="1.5" />
        {/* stethoscope */}
        <path d="M240 108 Q238 118 244 122 Q252 126 256 118" stroke="#0a7f5a" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="257" cy="117" r="3.5" fill="#0a7f5a" opacity="0.7" />
        {/* head */}
        <circle cx="249" cy="89" r="13" fill="#f5c5a0" />
        {/* hair */}
        <path d="M237 87 Q249 78 261 87" stroke="#5a3a1a" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        {/* clipboard */}
        <rect x="256" y="106" width="14" height="18" rx="2" fill="#e8f8f0" stroke="#9FE1CB" strokeWidth="1" />
        <line x1="259" y1="111" x2="267" y2="111" stroke="#0a7f5a" strokeWidth="1" />
        <line x1="259" y1="114" x2="267" y2="114" stroke="#0a7f5a" strokeWidth="1" />
        <line x1="259" y1="117" x2="264" y2="117" stroke="#0a7f5a" strokeWidth="1" />
        {/* legs */}
        <rect x="234" y="140" width="10" height="18" rx="3" fill="#3a5a4a" />
        <rect x="248" y="140" width="10" height="18" rx="3" fill="#3a5a4a" />
        {/* Label */}
        <text x="249" y="168" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="9" fill="#5a7a6a" fontWeight="600">
          {lang === "en" ? "Doctor" : "डॉक्टर"}
        </text>

        {/* ── CHECK MARK / RESULT bubble ── */}
        <circle cx="295" cy="80" r="16" fill="#e0f9ee" stroke="#9FE1CB" strokeWidth="1.5" />
        <path d="M287 80 L293 86 L303 73" stroke="#0a7f5a" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />

        {/* ── Top tagline ── */}
        <text x="162" y="24" textAnchor="middle" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="10" fill="#0a7f5a" fontWeight="700" letterSpacing="0.5">
          {lang === "en" ? "FROM MINE TO DIAGNOSIS IN SECONDS" : "सेकंडों में खदान से निदान तक"}
        </text>
        <line x1="60" y1="30" x2="264" y2="30" stroke="#9FE1CB" strokeWidth="0.8" />

        {/* ── Step indicators ── */}
        <circle cx="35" cy="50" r="8" fill="#0a7f5a" />
        <text x="35" y="54" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="9" fill="white" fontWeight="700">1</text>
        <circle cx="162" cy="50" r="8" fill="#0a7f5a" />
        <text x="162" y="54" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="9" fill="white" fontWeight="700">2</text>
        <circle cx="249" cy="50" r="8" fill="#0a7f5a" />
        <text x="249" y="54" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="9" fill="white" fontWeight="700">3</text>
        <line x1="43" y1="50" x2="154" y2="50" stroke="#9FE1CB" strokeWidth="1" strokeDasharray="3,2" />
        <line x1="170" y1="50" x2="241" y2="50" stroke="#9FE1CB" strokeWidth="1" strokeDasharray="3,2" />
      </svg>

      {/* Bottom info cards */}
      <div style={{ display: "flex", gap: 8 }}>
        <div style={{ flex: 1, background: "#e0f9ee", borderRadius: 10, padding: "10px 10px", border: "1px solid #88dfb2", textAlign: "center" }}>
          <div style={{ fontSize: 12, color: C.muted, marginBottom: 2 }}>{lang === "en" ? "Workers at Risk" : "जोखिम में श्रमिक"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: C.g1, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>3 Lakh+</div>
        </div>
        <div style={{ flex: 1, background: "#e0f9ee", borderRadius: 10, padding: "10px 10px", border: "1px solid #88dfb2", textAlign: "center" }}>
          <div style={{ fontSize: 12, color: C.muted, marginBottom: 2 }}>{lang === "en" ? "Compensation" : "मुआवज़ा"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: C.g1, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>₹3 Lakh</div>
        </div>
        <div style={{ flex: 1, background: "#e0f9ee", borderRadius: 10, padding: "10px 10px", border: "1px solid #88dfb2", textAlign: "center" }}>
          <div style={{ fontSize: 12, color: C.muted, marginBottom: 2 }}>{lang === "en" ? "Screen Time" : "जांच समय"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: C.g1, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>5 sec</div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// HOME PAGE
// ══════════════════════════════════════════════════════════════════════════════
function HomePage({ setPage, lang }) {
  const t = getT(lang);
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: C.dark, background: C.bg }}>
      {/* HERO */}
      <section id="home" style={{ padding: "100px 32px", background: `linear-gradient(160deg,${C.light} 0%,#d4f4e6 45%,${C.bg} 100%)`, minHeight: "100vh", display: "flex", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 64, maxWidth: 1240, margin: "0 auto", width: "100%", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#e0f9ee", color: C.g1, fontSize: 12, fontWeight: 700, padding: "7px 16px", borderRadius: 20, marginBottom: 28, border: "1px solid #b0e8cc", letterSpacing: ".5px" }}>
              <div style={{ width: 7, height: 7, background: C.g3, borderRadius: "50%", animation: "badgePulse 1.8s infinite" }} />
              {t.heroBadge}
            </div>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(30px,4.5vw,52px)", fontWeight: 800, lineHeight: 1.15, color: C.dark, marginBottom: 22 }}>
              {t.heroTitle1}{" "}
              <span style={{ background: `linear-gradient(135deg,${C.g1},${C.g3})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{t.heroTitle2}</span>
            </h1>
            <p style={{ fontSize: 18, color: C.muted, lineHeight: 1.75, marginBottom: 40, maxWidth: 520 }}>{t.heroSub}</p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button className="hero-btn-triage" onClick={() => setPage("triage")} style={{ background: `linear-gradient(135deg,${C.g1},${C.g2})`, color: "white", padding: "15px 32px", borderRadius: 30, fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>{t.heroBtn1}</button>
              <button className="hero-btn-book" onClick={() => scrollTo("appointment")} style={{ background: "white", color: C.g1, padding: "15px 32px", borderRadius: 30, fontSize: 15, fontWeight: 700, border: `2px solid ${C.g1}`, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>{t.heroBtn2}</button>
            </div>
          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "center", minWidth: 280 }}>
            <HeroIllustration lang={lang} />
          </div>
        </div>
      </section>

      {/* STATS */}
      <div style={{ background: C.g1, padding: "44px 32px" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 28 }}>
          {[
            { num: "5 sec", lbl: t.statsD1 }, { num: "94%+", lbl: t.statsD2 },
            { num: "₹3 L", lbl: t.statsD3 }, { num: "Tier 2–3", lbl: t.statsD4 },
          ].map(s => (
            <div key={s.lbl} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 36, fontWeight: 800, color: "white", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{s.num}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,.72)", marginTop: 4 }}>{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <section id="features" style={{ background: C.light, padding: "100px 32px" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.g1, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 12 }}>{t.featuresTag}</div>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(24px,4vw,38px)", fontWeight: 800, color: C.dark, marginBottom: 16 }}>{t.featuresTitle}</h2>
            <p style={{ fontSize: 17, color: C.muted, lineHeight: 1.75, maxWidth: 580, margin: "0 auto" }}>{t.featuresSub}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 22 }}>
            {[
              { icon: "🤖", title: t.f1t, desc: t.f1d },
              { icon: "⚡", title: t.f2t, desc: t.f2d },
              { icon: "🏥", title: t.f3t, desc: t.f3d },
              { icon: "🚨", title: t.f4t, desc: t.f4d },
              { icon: "💰", title: t.f5t, desc: t.f5d },
            ].map(f => (
              <div key={f.title} style={{ background: "white", borderRadius: 20, padding: "30px 24px", border: `1px solid ${C.borderC}`, transition: "transform .25s, box-shadow .25s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(10,127,90,.13)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
                <div style={{ width: 54, height: 54, background: `linear-gradient(135deg,${C.g4},#c8f2de)`, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, fontSize: 26 }}>{f.icon}</div>
                <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 16, fontWeight: 700, color: C.dark, marginBottom: 8 }}>{f.title}</div>
                <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.7 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="solution" style={{ background: C.light, padding: "80px 32px" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.g1, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 12 }}>{t.solTag}</div>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(24px,4vw,38px)", fontWeight: 800, color: C.dark, marginBottom: 16 }}>{t.solTitle}</h2>
            <p style={{ fontSize: 17, color: C.muted, lineHeight: 1.75, maxWidth: 580, margin: "0 auto" }}>{t.solSub}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 20 }}>
            {[
              { n: 1, emoji: "👤", title: t.s1t, desc: t.s1d },
              { n: 2, emoji: "⛏️", title: t.s2t, desc: t.s2d },
              { n: 3, emoji: "🩺", title: t.s3t, desc: t.s3d },
              { n: 4, emoji: "🩻", title: t.s4t, desc: t.s4d },
            ].map(s => (
              <div key={s.n} style={{ background: "white", borderRadius: 20, padding: "30px 20px", border: `1px solid ${C.borderC}`, textAlign: "center" }}>
                <div style={{ width: 42, height: 42, background: `linear-gradient(135deg,${C.g1},${C.g3})`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: "white", margin: "0 auto 14px" }}>{s.n}</div>
                <div style={{ fontSize: 26, marginBottom: 12 }}>{s.emoji}</div>
                <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14, fontWeight: 700, color: C.dark, marginBottom: 8 }}>{s.title}</div>
                <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.65 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ background: "white", padding: "100px 32px" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <div style={{ background: `linear-gradient(160deg,${C.g1},#0d5c44)`, borderRadius: 24, padding: "44px 40px", color: "white" }}>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 26, fontWeight: 800, marginBottom: 14 }}>{t.missionTitle}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.8, opacity: .88, marginBottom: 32 }}>{t.missionSub}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[{ num: "₹3L", lbl: lang === "en" ? "Compensation per patient" : "प्रति रोगी मुआवज़ा" }, { num: "5 sec", lbl: lang === "en" ? "Time to screening result" : "जांच परिणाम का समय" }, { num: "94%", lbl: lang === "en" ? "Screening accuracy rate" : "जांच सटीकता दर" }, { num: "0", lbl: lang === "en" ? "On-site specialists needed" : "ऑन-साइट विशेषज्ञ आवश्यक" }].map(ic => (
                  <div key={ic.num} style={{ background: "rgba(255,255,255,.12)", borderRadius: 14, padding: 18, border: "1px solid rgba(255,255,255,.2)" }}>
                    <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 22, fontWeight: 800, color: C.g3 }}>{ic.num}</div>
                    <div style={{ fontSize: 11, opacity: .8, marginTop: 4, lineHeight: 1.4 }}>{ic.lbl}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.g1, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 12 }}>{t.aboutTag}</div>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 34, fontWeight: 800, color: C.dark, marginBottom: 18, lineHeight: 1.3 }}>{t.aboutTitle}</h2>
              <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.8, marginBottom: 16 }}>{t.aboutSub1}</p>
              <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.8, marginBottom: 16 }}>{t.aboutSub2}</p>
              <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.8, marginBottom: 24 }}>{t.aboutSub3}</p>
              <button onClick={() => scrollTo("appointment")} style={{ background: `linear-gradient(135deg,${C.g1},${C.g2})`, color: "white", padding: "15px 32px", borderRadius: 30, fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>{t.aboutBtn}</button>
            </div>
          </div>
        </div>
      </section>

      {/* APPOINTMENT */}
      <section id="appointment" style={{ background: `linear-gradient(160deg,${C.light},white)`, padding: "100px 32px" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.g1, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 12 }}>{t.apptTag}</div>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(24px,4vw,38px)", fontWeight: 800, color: C.dark, marginBottom: 16 }}>{t.apptTitle}</h2>
            <p style={{ fontSize: 17, color: C.muted, lineHeight: 1.75, maxWidth: 580, margin: "0 auto" }}>{t.apptSub}</p>
          </div>
          <AppointmentForm lang={lang} />
        </div>
      </section>

      <HomeFooter setPage={setPage} lang={lang} />
    </div>
  );
}

// ─── SLIDE CALENDAR ───────────────────────────────────────────────────────────
function SlideCalendar({ value, onChange, lang }) {
  const t = getT(lang);
  const scrollRef = useRef(null);
  const days = [];
  const dayNames = lang === "hi"
    ? ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"]
    : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = lang === "hi"
    ? ["जन", "फर", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अग", "सित", "अक्टू", "नव", "दिस"]
    : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  for (let i = 0; i < 30; i++) {
    const d = new Date(); d.setDate(d.getDate() + i);
    const iso = d.toISOString().split("T")[0];
    days.push({ iso, day: d.getDate(), dow: dayNames[d.getDay()], month: monthNames[d.getMonth()], isToday: i === 0 });
  }
  const scroll = (dir) => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: dir * 240, behavior: "smooth" });
  };
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <label style={{ fontSize: 13, fontWeight: 600, color: C.dark }}>{t.calSelectDate || t.formDate}</label>
        <div style={{ display: "flex", gap: 6 }}>
          <button onClick={() => scroll(-1)} style={{ width: 30, height: 30, borderRadius: "50%", border: `1px solid ${C.borderC}`, background: "white", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>←</button>
          <button onClick={() => scroll(1)} style={{ width: 30, height: 30, borderRadius: "50%", border: `1px solid ${C.borderC}`, background: "white", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>→</button>
        </div>
      </div>
      <div ref={scrollRef} style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8, scrollbarWidth: "none", msOverflowStyle: "none" }}>
        {days.map(d => {
          const sel = value === d.iso;
          return (
            <div key={d.iso} onClick={() => onChange(d.iso)} style={{
              minWidth: 62, padding: "10px 8px", borderRadius: 14, textAlign: "center", cursor: "pointer",
              background: sel ? `linear-gradient(135deg,${C.g1},${C.g2})` : d.isToday ? C.greenLight : "white",
              border: `1.5px solid ${sel ? C.g1 : d.isToday ? C.greenMid : C.borderC}`,
              transition: "all .2s", flexShrink: 0,
            }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: sel ? "rgba(255,255,255,.7)" : C.muted, marginBottom: 2, textTransform: "uppercase" }}>{d.dow}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: sel ? "white" : C.dark, lineHeight: 1.2 }}>{d.day}</div>
              <div style={{ fontSize: 10, color: sel ? "rgba(255,255,255,.7)" : C.text3, marginTop: 2 }}>{d.month}</div>
              {d.isToday && <div style={{ fontSize: 9, fontWeight: 700, color: sel ? "white" : C.g1, marginTop: 3, letterSpacing: ".5px" }}>{t.calToday || "Today"}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── TIME SLOT PICKER ─────────────────────────────────────────────────────────
function TimeSlotPicker({ value, onChange, lang }) {
  const t = getT(lang);
  const groups = [
    { label: t.calMorning || "Morning", icon: "🌅", slots: ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30"] },
    { label: t.calAfternoon || "Afternoon", icon: "☀️", slots: ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30"] },
    { label: t.calEvening || "Evening", icon: "🌇", slots: ["16:00", "16:30", "17:00", "17:30", "18:00", "18:30"] },
  ];
  const fmt = (s) => {
    const [h, m] = s.split(":");
    const hr = parseInt(h);
    return `${hr > 12 ? hr - 12 : hr}:${m} ${hr >= 12 ? "PM" : "AM"}`;
  };
  return (
    <div>
      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.dark, marginBottom: 10 }}>{t.calSelectTime || t.formTime || "Preferred Time"}</label>
      {groups.map(g => (
        <div key={g.label} style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }}>
            <span>{g.icon}</span> {g.label}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {g.slots.map(s => {
              const sel = value === s;
              return (
                <button key={s} onClick={() => onChange(s)} style={{
                  padding: "8px 14px", borderRadius: 10, fontSize: 12, fontWeight: sel ? 700 : 500,
                  border: `1.5px solid ${sel ? C.g1 : C.borderC}`,
                  background: sel ? C.greenLight : "white",
                  color: sel ? C.greenDark : C.text2,
                  cursor: "pointer", transition: "all .15s", fontFamily: "'DM Sans',sans-serif",
                }}>{fmt(s)}</button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function AppointmentForm({ lang }) {
  const t = getT(lang);
  const [form, setForm] = useState({ name: "", phone: "", date: "", time: "", type: "", desc: "" });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const submit = async () => {
    if (!form.name || !form.date || !form.type) { alert(lang === "en" ? "Please fill in required fields." : "कृपया आवश्यक फ़ील्ड भरें।"); return; }
    setLoading(true);
    setError("");
    try {
      await apiRequest("/api/appointments", {
        method: "POST",
        body: {
          name: form.name,
          phone: form.phone,
          preferredDate: form.date,
          preferredTime: form.time,
          type: form.type,
          description: form.desc,
        },
      });
      setSuccess(true); setForm({ name: "", phone: "", date: "", time: "", type: "", desc: "" });
      setTimeout(() => setSuccess(false), 6000);
    } catch (err) {
      setError(err.message || "Could not save appointment");
    } finally {
      setLoading(false);
    }
  };
  const inp = { width: "100%", padding: "13px 16px", border: `1.5px solid ${C.borderC}`, borderRadius: 12, fontSize: 14, color: C.dark, background: C.light, outline: "none", fontFamily: "'DM Sans',sans-serif" };
  return (
    <div style={{ background: "white", borderRadius: 28, border: `1px solid ${C.borderC}`, padding: "52px 56px", maxWidth: 700, margin: "0 auto", boxShadow: "0 20px 60px rgba(10,127,90,.08)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
        <div><label style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.dark, marginBottom: 8 }}>{t.formName}</label><input style={inp} placeholder={t.formPH_name} value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} /></div>
        <div><label style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.dark, marginBottom: 8 }}>{t.formPhone}</label><input style={inp} placeholder={t.formPH_phone} value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} /></div>
      </div>
      <div style={{ marginBottom: 20 }}>
        <SlideCalendar value={form.date} onChange={v => setForm(p => ({ ...p, date: v }))} lang={lang} />
      </div>
      <div style={{ marginBottom: 20 }}>
        <TimeSlotPicker value={form.time} onChange={v => setForm(p => ({ ...p, time: v }))} lang={lang} />
      </div>
      <div style={{ marginBottom: 20 }}>
        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.dark, marginBottom: 8 }}>{t.formType}</label>
        <select style={inp} value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}>
          <option value="">{lang === "en" ? "Select type..." : "प्रकार चुनें..."}</option>
          <option>{t.formOpt1}</option><option>{t.formOpt2}</option><option>{t.formOpt3}</option><option>{t.formOpt4}</option>
        </select>
      </div>
      <div style={{ marginBottom: 20 }}><label style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.dark, marginBottom: 8 }}>{t.formDesc}</label><textarea style={{ ...inp, height: 90, resize: "vertical" }} placeholder={t.formPH_desc} value={form.desc} onChange={e => setForm(p => ({ ...p, desc: e.target.value }))} /></div>
      <button onClick={submit} disabled={loading} style={{ width: "100%", padding: 16, background: loading ? C.muted : `linear-gradient(135deg,${C.g1},${C.g2})`, color: "white", fontSize: 16, fontWeight: 700, border: "none", borderRadius: 14, cursor: loading ? "not-allowed" : "pointer", fontFamily: "'DM Sans',sans-serif" }}>{loading ? (lang === "en" ? "Saving..." : "सहेजा जा रहा है...") : t.formBtn}</button>
      {success && <div style={{ textAlign: "center", padding: 20, background: C.g4, borderRadius: 14, color: C.g1, fontWeight: 600, fontSize: 15, marginTop: 16, border: "1px solid #b0e8cc" }}>{t.formSuccess}</div>}
      {error && <div style={{ textAlign: "center", padding: 14, background: C.redLight, borderRadius: 14, color: C.redDark, fontWeight: 600, fontSize: 14, marginTop: 16, border: "1px solid #f2b6b6" }}>{error}</div>}
    </div>
  );
}

function HomeFooter({ setPage, lang }) {
  const t = getT(lang);
  return (
    <footer style={{ background: C.dark, padding: "60px 32px 32px" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 20, fontWeight: 800, color: C.g3, marginBottom: 16 }}>
              <div style={{ width: 34, height: 34, background: `linear-gradient(135deg,${C.g1},${C.g3})`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" /></svg>
              </div>
              SilicoSafe
            </div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,.5)", lineHeight: 1.75 }}>{t.footerDesc}</p>
          </div>
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: "white", marginBottom: 18 }}>{t.footerPlatform}</h4>
            {[t.fp1, t.fp2, t.fp3, t.fp4].map(l => (<div key={l} onClick={() => { setPage("triage"); window.scrollTo({ top: 0 }); }} style={{ fontSize: 13, color: "rgba(255,255,255,.5)", marginBottom: 10, cursor: "pointer" }}>{l}</div>))}
          </div>
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: "white", marginBottom: 18 }}>{t.footerSchemes}</h4>
            {[t.fs1, t.fs2, t.fs3, t.fs4].map(l => (<div key={l} onClick={() => { setPage("schemes"); window.scrollTo({ top: 0 }); }} style={{ fontSize: 13, color: "rgba(255,255,255,.5)", marginBottom: 10, cursor: "pointer" }}>{l}</div>))}
          </div>
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: "white", marginBottom: 18 }}>{t.footerContact}</h4>
            {["info@silicoSafe.in", "+91 98765 43210", "New Delhi, India", "Support Center"].map(l => (<div key={l} style={{ fontSize: 13, color: "rgba(255,255,255,.5)", marginBottom: 10 }}>{l}</div>))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,.1)", paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,.3)" }}>{t.footerCopy}</p>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,.3)" }}>{t.footerLinks}</p>
        </div>
      </div>
    </footer>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// REFERRAL DATA
// ══════════════════════════════════════════════════════════════════════════════
const REFERRAL_CENTRES = [
  { state: "Rajasthan", districts: ["Jodhpur", "Nagaur", "Pali", "Barmer", "Jaisalmer", "Sirohi"], centres: [
    { name: "Mahatma Gandhi Hospital, Jodhpur", type: "Pneumoconiosis Board", phone: "0291-2434374", address: "Mahatma Gandhi Hospital, Jodhpur, Rajasthan 342001" },
    { name: "ESIC Model Hospital, Jodhpur", type: "ESIC Specialist", phone: "0291-2781626", address: "Pal Link Road, Jodhpur 342008" },
  ]},
  { state: "Rajasthan", districts: ["Jaipur", "Alwar", "Tonk", "Dausa", "Sawai Madhopur"], centres: [
    { name: "SMS Medical College & Hospital, Jaipur", type: "Pneumoconiosis Board", phone: "0141-2518501", address: "JLN Marg, Jaipur, Rajasthan 302004" },
    { name: "ESIC Hospital, Jaipur", type: "ESIC Specialist", phone: "0141-2712541", address: "Central Spine, Vidhyadhar Nagar, Jaipur 302023" },
  ]},
  { state: "Jharkhand", districts: ["Dhanbad", "Bokaro", "Ramgarh", "Hazaribagh", "Giridih"], centres: [
    { name: "PMCH Dhanbad (Patliputra Medical College)", type: "Pneumoconiosis Board", phone: "0326-2301616", address: "Saraidhela, Dhanbad, Jharkhand 826001" },
    { name: "ESIC Hospital, Dhanbad", type: "ESIC Specialist", phone: "0326-2302251", address: "ESIC Campus, Saraidhela, Dhanbad" },
  ]},
  { state: "Jharkhand", districts: ["Ranchi", "Lohardaga", "Gumla", "Simdega", "Khunti"], centres: [
    { name: "Rajendra Institute of Medical Sciences (RIMS)", type: "Pneumoconiosis Board", phone: "0651-2545297", address: "Bariatu Road, Ranchi, Jharkhand 834009" },
    { name: "ESIC Model Hospital, Ranchi", type: "ESIC Specialist", phone: "0651-2223531", address: "Namkum, Ranchi 834010" },
  ]},
  { state: "Odisha", districts: ["Keonjhar", "Sundargarh", "Jajpur", "Angul", "Dhenkanal"], centres: [
    { name: "Shri Ram Chandra Bhanj Medical College, Cuttack", type: "Pneumoconiosis Board", phone: "0671-2414080", address: "Mangalabag, Cuttack, Odisha 753007" },
    { name: "ESIC Hospital, Bhubaneswar", type: "ESIC Specialist", phone: "0674-2951766", address: "Unit-9, Bhubaneswar 751022" },
  ]},
  { state: "Gujarat", districts: ["Morbi", "Rajkot", "Jamnagar", "Surendranagar", "Bhavnagar"], centres: [
    { name: "Government Medical College, Bhavnagar", type: "Pneumoconiosis Board", phone: "0278-2428771", address: "Near SIR T Hospital, Bhavnagar 364001" },
    { name: "ESIC Hospital, Ahmedabad", type: "ESIC Specialist", phone: "079-22683721", address: "Ramol, Ahmedabad 382449" },
  ]},
  { state: "Madhya Pradesh", districts: ["Singrauli", "Shahdol", "Anuppur", "Umaria", "Katni"], centres: [
    { name: "Gandhi Medical College, Bhopal", type: "Pneumoconiosis Board", phone: "0755-2540275", address: "Royal Market, Sultania Road, Bhopal 462001" },
    { name: "ESIC Hospital, Indore", type: "ESIC Specialist", phone: "0731-2420116", address: "Palasia, Indore 452001" },
  ]},
];

const NATIONAL_REFERRAL = [
  { name: "National Institute of Occupational Health (NIOH), Ahmedabad", type: "National Referral Centre", phone: "079-22688000", address: "Meghani Nagar, Ahmedabad, Gujarat 380016", url: "https://nioh.gov.in" },
  { name: "Vallabhbhai Patel Chest Institute, Delhi", type: "National Referral Centre", phone: "011-27666174", address: "University of Delhi, North Campus, Delhi 110007", url: "https://vpci.uod.ac.in" },
];

function getReferralCentres(district, state) {
  if (!district && !state) return null;
  const match = REFERRAL_CENTRES.find(r =>
    (state && r.state.toLowerCase().includes(state.toLowerCase())) ||
    (district && r.districts.some(d => district.toLowerCase().includes(d.toLowerCase()) || d.toLowerCase().includes(district.toLowerCase())))
  );
  return match ? match.centres : null;
}

// ══════════════════════════════════════════════════════════════════════════════
// TRIAGE PAGE
// ══════════════════════════════════════════════════════════════════════════════
const emptyData = {
  name: "", age: "", sex: "", district: "", state: "",
  dustExposed: "",
  work: "", years: "", mask: "", maskType: "", dusty: "", prevjob: "",
  symptoms: [], duration: "", tb: "", tbcontact: "",
  xrayFile: null, xrayFindings: "", xrayDoctorSeen: ""
};

function calcScore(d) {
  let s = 0;
  if (d.dustExposed === "no") return 5;
  const highRisk = ["stone-crushing", "mining", "quarrying", "sandblasting", "gem-cutting", "ceramics"];
  if (highRisk.includes(d.work)) s += 35;
  else if (d.work === "construction") s += 18;
  else if (d.work === "other-dusty") s += 10;
  const yearsMap = { lt1: 0, "1-5": 10, "5-10": 20, "10-20": 30, "20plus": 40 };
  s += yearsMap[d.years] || 0;
  const maskBaseMap = { always: 0, sometimes: 5, rarely: 12, never: 18 };
  let maskScore = maskBaseMap[d.mask] || 0;
  if (d.mask === "always" || d.mask === "sometimes") {
    if (d.maskType === "cloth") maskScore += 10;
    else if (d.maskType === "n95") maskScore += 0;
    else if (d.maskType === "employer") maskScore += 3;
    else maskScore += 6;
  }
  s += maskScore;
  const dustMap = { 1: 0, 2: 2, 3: 5, 4: 9, 5: 14 };
  s += dustMap[d.dusty] || 0;
  if (d.prevjob === "yes") s += 8;
  if (d.prevjob === "unsure") s += 4;
  if (d.symptoms.includes("dry-cough")) s += 4;
  if (d.symptoms.includes("sob-ex")) s += 5;
  if (d.symptoms.includes("sob-rest")) s += 8;
  if (d.symptoms.includes("chest-pain")) s += 3;
  if (d.symptoms.includes("fever")) s -= 5;
  if (d.symptoms.includes("night-sweats")) s -= 4;
  if (d.symptoms.includes("weight-loss")) s -= 2;
  if (d.symptoms.includes("haemoptysis")) s -= 3;
  if (d.duration === "1yplus") s += 5;
  if (d.tb === "tb-ongoing") s -= 10;
  if (d.tbcontact === "yes") s -= 6;
  const xrayMap = { "upper-opacity": 14, nodular: 12, bilateral: 8, hilar: 5 };
  s += xrayMap[d.xrayFindings] || 0;
  if (d.xrayFile) s += 8;
  return Math.min(98, Math.max(5, s));
}

function buildSignals(d, lang = "en") {
  const tr = (en, hi) => lang === "hi" ? hi : en;
  const sigs = [];
  const highRisk = ["stone-crushing", "mining", "quarrying", "sandblasting", "gem-cutting", "ceramics"];
  if (d.dustExposed === "no") { sigs.push(tr("No significant silica dust exposure reported", "सिलिका धूल का महत्वपूर्ण संपर्क दर्ज नहीं हुआ")); return sigs; }
  if (highRisk.includes(d.work)) sigs.push(tr("High-risk occupation: ", "उच्च जोखिम वाला व्यवसाय: ") + d.work.replace(/-/g, " "));
  if (["10-20", "20plus"].includes(d.years)) sigs.push(tr("Long-term exposure: ", "लंबे समय का संपर्क: ") + d.years.replace("-", "–") + tr(" years", " वर्ष"));
  if (["rarely", "never"].includes(d.mask)) sigs.push(tr("Inadequate respiratory protection", "अपर्याप्त श्वसन सुरक्षा"));
  if (d.mask !== "never" && d.maskType === "cloth") sigs.push(tr("Cloth mask used — provides no silica dust protection", "कपड़े का मास्क सिलिका धूल से सुरक्षा नहीं देता"));
  if (["4", "5"].includes(String(d.dusty))) sigs.push(tr("Heavy dust environment", "अधिक धूल वाला वातावरण") + " (" + d.dusty + "/5)");
  if (["upper-opacity", "nodular", "bilateral"].includes(d.xrayFindings)) sigs.push(tr("X-ray finding: ", "एक्स-रे निष्कर्ष: ") + d.xrayFindings.replace(/-/g, " "));
  if (d.xrayFile) sigs.push(tr("X-ray uploaded for record review", "रिकॉर्ड समीक्षा के लिए एक्स-रे अपलोड किया गया"));
  if (d.symptoms.includes("dry-cough") && d.symptoms.includes("sob-ex")) sigs.push(tr("Classic presentation: dry cough + exertional breathlessness", "विशिष्ट लक्षण: सूखी खाँसी और मेहनत पर सांस फूलना"));
  if (d.prevjob === "unsure") sigs.push(tr("Previous occupational history unclear — recommend detailed interview", "पिछला व्यावसायिक इतिहास स्पष्ट नहीं — विस्तृत पूछताछ करें"));
  if (!sigs.length) sigs.push(tr("History-based assessment — upload X-ray for higher confidence", "इतिहास-आधारित आकलन — अधिक विश्वास के लिए एक्स-रे अपलोड करें"));
  return sigs;
}

function buildReports(d, risk, confidence) {
  const name = d.name || "Patient";
  const age = d.age || "—";
  const loc = [d.district, d.state].filter(Boolean).join(", ") || "—";
  const wl = (d.work || "stone crusher").replace(/-/g, " ");
  const yl = d.years || "several years";
  const syms = d.symptoms.length ? d.symptoms.join(", ").replace(/-/g, " ") : "not specified";
  const en = `Patient: <strong>${name}</strong>, ${age} years, ${loc}.<br><br>Significant occupational history of silica dust exposure as a ${wl} for ${yl}. Respiratory protection: ${d.mask || "unknown"}${d.maskType ? " (" + d.maskType + ")" : ""}. Symptoms: ${syms}.<br><br><strong>SilicoSafe AI Screening: ${risk.toUpperCase()} SILICOSIS RISK — ${confidence}% confidence.</strong><br><br><em>This is an AI-assisted screening result, not a medical diagnosis. All findings must be confirmed by a qualified physician. Do NOT initiate empirical anti-TB treatment until silicosis is excluded by HRCT.</em><br><br>Patient may be eligible for ₹3 lakh compensation under the Silicosis Rehabilitation Scheme.`;
  const hi = `रोगी: <strong>${name}</strong>, ${age} वर्ष, ${loc}।<br><br>व्यावसायिक इतिहास: ${yl} तक ${wl} के रूप में कार्य किया। मास्क: ${d.mask || "अज्ञात"}${d.maskType ? " (" + d.maskType + ")" : ""}। लक्षण: ${syms}।<br><br><strong>SilicoSafe AI जांच: सिलिकोसिस का ${risk === "High" ? "उच्च" : risk === "Moderate" ? "मध्यम" : "कम"} खतरा — ${confidence}% विश्वास।</strong><br><br><em>यह एक AI-सहायता प्राप्त जांच परिणाम है, चिकित्सीय निदान नहीं। किसी भी नैदानिक कदम से पहले एक योग्य चिकित्सक से पुष्टि अनिवार्य है। HRCT जांच के बिना तपेदिक की दवाएं शुरू न करें।</em><br><br>रोगी सिलिकोसिस पुनर्वास योजना के तहत ₹3 लाख मुआवज़े के पात्र हो सकते हैं।`;
  return { en, hi };
}

function FieldChips({ options, value, onChange, multi = false }) {
  const toggle = (v) => {
    if (multi) {
      const arr = Array.isArray(value) ? value : [];
      onChange(arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v]);
    } else { onChange(v === value ? "" : v); }
  };
  const isOn = (v) => multi ? (Array.isArray(value) && value.includes(v)) : value === v;
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {options.map(({ label, value: v }) => (
        <button key={v} onClick={() => toggle(v)} style={{
          padding: "10px 18px", borderRadius: 22, fontSize: 13, minHeight: 44,
          border: `1.5px solid ${isOn(v) ? C.g1 : C.borderC}`,
          background: isOn(v) ? C.greenLight : "white",
          color: isOn(v) ? C.greenDark : C.text2,
          fontWeight: isOn(v) ? 600 : 400,
          cursor: "pointer", transition: "all 0.13s", fontFamily: "'DM Sans',sans-serif",
        }}>{label}</button>
      ))}
    </div>
  );
}

function FieldLabel({ children, hint }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: C.dark, marginBottom: hint ? 3 : 0 }}>{children}</div>
      {hint && <div style={{ fontSize: 11, color: C.text3 }}>{hint}</div>}
    </div>
  );
}

function StepBar({ step, steps, setStep, lang }) {
  const timeLabels = lang === "en"
    ? ["~1 min", "~1 min", "~1 min", "~1 min"]
    : ["~1 मिनट", "~1 मिनट", "~1 मिनट", "~1 मिनट"];
  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 28, alignItems: "center" }}>
      {steps.map((s, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 0, flex: i < steps.length - 1 ? "1" : "initial" }}>
          <div onClick={() => i < step && setStep(i)} style={{
            display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 24, whiteSpace: "nowrap",
            background: i === step ? C.g1 : i < step ? C.greenLight : "white",
            border: `1.5px solid ${i === step ? C.g1 : i < step ? C.greenMid : C.borderC}`,
            cursor: i < step ? "pointer" : "default", transition: "all .2s",
          }}>
            <div style={{
              width: 22, height: 22, borderRadius: "50%",
              background: i === step ? "rgba(255,255,255,.25)" : i < step ? C.g1 : C.bg3,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, fontWeight: 700, color: i === step ? "white" : i < step ? "white" : C.text3, flexShrink: 0
            }}>{i < step ? "✓" : i + 1}</div>
            <span style={{ fontSize: 13, fontWeight: 600, color: i === step ? "white" : i < step ? C.greenDark : C.text2 }}>{s}</span>
            {i === step && <span style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", marginLeft: 2 }}>{timeLabels[i]}</span>}
          </div>
          {i < steps.length - 1 && (
            <div style={{ flex: 1, height: 2, background: i < step ? C.greenMid : C.borderC, margin: "0 4px", minWidth: 12 }} />
          )}
        </div>
      ))}
    </div>
  );
}

function VoiceMic({ lang, onResult }) {
  const [listening, setListening] = useState(false);
  const recRef = useRef(null);
  const supported = typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);
  if (!supported) return null;
  const speechCode = getLanguageOption(lang).speech || "en-IN";
  const start = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new SR();
    rec.lang = speechCode; rec.continuous = false; rec.interimResults = false;
    rec.onresult = (e) => { onResult(e.results[0][0].transcript); setListening(false); };
    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);
    recRef.current = rec; rec.start(); setListening(true);
  };
  const stop = () => { recRef.current && recRef.current.stop(); setListening(false); };
  return (
    <button onClick={listening ? stop : start} title={listening ? "Stop" : "Voice input"}
      style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: listening ? "#fee2e2" : C.greenLight, border: `1.5px solid ${listening ? C.red : C.greenMid}`, borderRadius: "50%", width: 34, height: 34, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, transition: "all .2s", animation: listening ? "badgePulse 1.2s infinite" : "none" }}>
      {listening ? "⏹" : "🎤"}
    </button>
  );
}

function VoiceInput({ lang, value, onChange, placeholder, style }) {
  return (
    <div style={{ position: "relative" }}>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{ ...style, paddingRight: 48 }} />
      <VoiceMic lang={lang} onResult={onChange} />
    </div>
  );
}

function TriagePage({ lang }) {
  const t = getT(lang);
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ ...emptyData });
  const [result, setResult] = useState(null);
  const [xrayPreview, setXrayPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resultTab, setResultTab] = useState("diagnosis");
  const [reportLang, setReportLang] = useState(lang);
  const set = k => v => setData(p => ({ ...p, [k]: v }));

  const steps = [t.step1, t.step2, t.step3, t.step4];

  const handleAnalyse = async () => {
    if (!data.name.trim()) {
      alert(lang === "en" ? "Enter the patient's name before analysis." : "जांच से पहले रोगी का नाम दर्ज करें।");
      setStep(0);
      return;
    }
    if (data.xrayFile) setXrayPreview(previous => {
      if (previous) URL.revokeObjectURL(previous);
      return URL.createObjectURL(data.xrayFile);
    });
    setLoading(true);
    await new Promise(r => setTimeout(r, 2200));
    const score = calcScore(data);
    const confidence = Math.min(97, 58 + Math.round(score * 0.37));
    const risk = score >= 60 ? "High" : score >= 35 ? "Moderate" : "Low";
    const signals = buildSignals(data, lang);
    const { en, hi } = buildReports(data, risk, confidence);
    const referralCentres = getReferralCentres(data.district, data.state);
    let savedIds = null;
    let saveError = "";
    try {
      const { xrayFile, ...formData } = data;
      const payload = {
        patient: {
          name: data.name,
          age: data.age,
          sex: data.sex,
          district: data.district,
          state: data.state,
        },
        screening: {
          clinicalScore: score,
          riskLevel: risk,
          confidence,
          signals,
        },
        report: { en, hi },
        xray: {
          doctorReviewed: data.xrayDoctorSeen,
          doctorFindings: data.xrayFindings,
        },
        formData,
      };
      const body = new FormData();
      body.append("payload", JSON.stringify(payload));
      if (xrayFile) body.append("xray", xrayFile);
      savedIds = await apiRequest("/api/screenings", {
        method: "POST",
        body,
        token: getStoredAuth()?.token || "",
      });
    } catch (err) {
      saveError = err.message || "Could not save screening to database";
    }
    setResult({ clinicalScore: score, risk, confidence, name: data.name, age: data.age, loc: [data.district, data.state].filter(Boolean).join(", "), signals, reportEn: en, reportHi: hi, referralCentres, savedIds, saveError });
    setLoading(false);
    setStep(4);
  };

  const handleReset = () => {
    setData({ ...emptyData }); setResult(null);
    if (xrayPreview) URL.revokeObjectURL(xrayPreview);
    setXrayPreview(null); setLoading(false); setStep(0); setResultTab("diagnosis");
  };

  useEffect(() => () => {
    if (xrayPreview) URL.revokeObjectURL(xrayPreview);
  }, [xrayPreview]);

  const copyReport = async () => {
    const report = stripHtml(reportLang === "en" ? result.reportEn : result.reportHi);
    try {
      await navigator.clipboard.writeText(report);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = report;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
    alert(lang === "en" ? "Report copied!" : "रिपोर्ट कॉपी हुई!");
  };

  const openSmsReferral = () => {
    const report = stripHtml(reportLang === "en" ? result.reportEn : result.reportHi);
    window.location.href = `sms:?body=${encodeURIComponent(report)}`;
  };

  const inp = { width: "100%", padding: "11px 14px", fontSize: 14, border: `1.5px solid ${C.borderC}`, borderRadius: 10, background: "#f9fdfb", color: C.dark, fontFamily: "'DM Sans',sans-serif", outline: "none", boxSizing: "border-box" };

  const riskColor = result ? (result.risk === "High" ? C.red : result.risk === "Moderate" ? C.amber : C.green) : C.green;
  const riskBg = result ? (result.risk === "High" ? C.redLight : result.risk === "Moderate" ? C.amberLight : C.greenLight) : C.greenLight;

  return (
    <div style={{ minHeight: "100vh", background: "#eef2ef", padding: "40px 32px", fontFamily: "'DM Sans',sans-serif" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.g1, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 6 }}>{t.triageHeader}</div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 28, fontWeight: 800, color: C.dark }}>{t.triageTitle}</h1>
          <p style={{ fontSize: 14, color: C.muted, marginTop: 4 }}>{t.triageSub}</p>
        </div>

        {step < 4 && <StepBar step={step} steps={steps} setStep={setStep} lang={lang} />}

        <div style={{ display: "grid", gridTemplateColumns: step === 4 ? "1fr 1fr" : "1.1fr 0.9fr", gap: 24, alignItems: "start" }}>
          {/* LEFT PANEL */}
          <div style={{ background: "white", borderRadius: 20, padding: "32px 36px", border: `1px solid ${C.borderC}`, boxShadow: "0 4px 24px rgba(10,127,90,.07)", animation: "slideIn .25s ease" }}>

            {step === 0 && (
              <div>
                <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 20, fontWeight: 700, color: C.dark, marginBottom: 4 }}>{t.step1}</h2>
                <p style={{ fontSize: 13, color: C.muted, marginBottom: 24 }}>{lang === "en" ? "Basic patient information to begin the assessment." : "जांच शुरू करने के लिए रोगी की बुनियादी जानकारी दर्ज करें।"}</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                  <div>
                    <FieldLabel>{lang === "en" ? "Patient full name" : "रोगी का पूरा नाम"}</FieldLabel>
                    <VoiceInput lang={lang} value={data.name} onChange={set("name")} placeholder={lang === "en" ? "e.g. Ramesh Kumar" : "जैसे रमेश कुमार"} style={inp} />
                  </div>
                  <div>
                    <FieldLabel>{lang === "en" ? "Age" : "उम्र"}</FieldLabel>
                    <input type="number" style={inp} value={data.age} onChange={e => set("age")(e.target.value)} placeholder="e.g. 42" />
                  </div>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <FieldLabel>{lang === "en" ? "Sex" : "लिंग"}</FieldLabel>
                  <FieldChips options={[{ label: lang === "en" ? "Male" : "पुरुष", value: "male" }, { label: lang === "en" ? "Female" : "महिला", value: "female" }, { label: lang === "en" ? "Prefer not to say" : "बताना नहीं चाहते", value: "prefer-not" }]} value={data.sex} onChange={set("sex")} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
                  <div>
                    <FieldLabel>{lang === "en" ? "District" : "जिला"}</FieldLabel>
                    <VoiceInput lang={lang} value={data.district} onChange={set("district")} placeholder={lang === "en" ? "e.g. Jodhpur" : "जैसे जोधपुर"} style={inp} />
                  </div>
                  <div>
                    <FieldLabel>{lang === "en" ? "State" : "राज्य"}</FieldLabel>
                    <select style={inp} value={data.state} onChange={e => set("state")(e.target.value)}>
                      <option value="">{lang === "en" ? "Select state..." : "राज्य चुनें..."}</option>
                      {["Andhra Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Odisha","Punjab","Rajasthan","Tamil Nadu","Telangana","Uttar Pradesh","Uttarakhand","West Bengal","Delhi"].map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <button onClick={() => data.name.trim() ? setStep(1) : alert(lang === "en" ? "Patient name is required." : "रोगी का नाम आवश्यक है।")} style={{ padding: "13px 32px", background: `linear-gradient(135deg,${C.g1},${C.g2})`, color: "white", borderRadius: 12, fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>{t.continue}</button>
              </div>
            )}

            {step === 1 && (
              <div>
                <button onClick={() => setStep(0)} style={{ fontSize: 13, color: C.muted, background: "none", border: "none", cursor: "pointer", marginBottom: 16, fontFamily: "'DM Sans',sans-serif", padding: 0 }}>{t.back}</button>
                <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 20, fontWeight: 700, color: C.dark, marginBottom: 4 }}>{t.step2}</h2>
                <p style={{ fontSize: 13, color: C.muted, marginBottom: 24 }}>{lang === "en" ? "Silica dust exposure is the primary cause of silicosis." : "सिलिका धूल का संपर्क सिलिकोसिस का मुख्य कारण है।"}</p>
                <div style={{ marginBottom: 22, padding: "16px 20px", background: C.greenLight, borderRadius: 14, border: `1px solid ${C.greenMid}` }}>
                  <FieldLabel>{lang === "en" ? "Does this patient work with silica dust?" : "क्या यह रोगी सिलिका धूल के साथ काम करता/करती है?"}</FieldLabel>
                  <FieldChips options={[{ label: lang === "en" ? "Yes — works with dust" : "हाँ — धूल में काम करते हैं", value: "yes" }, { label: lang === "en" ? "No dust exposure" : "नहीं — धूल का संपर्क नहीं", value: "no" }]} value={data.dustExposed} onChange={set("dustExposed")} />
                </div>
                {data.dustExposed === "yes" && (
                  <>
                    <div style={{ marginBottom: 18 }}>
                      <FieldLabel>{lang === "en" ? "Type of dusty work" : "काम का प्रकार"}</FieldLabel>
                      <FieldChips options={[{ label: lang === "en" ? "Stone crushing" : "पत्थर तोड़ना", value: "stone-crushing" }, { label: lang === "en" ? "Mining" : "खनन", value: "mining" }, { label: lang === "en" ? "Quarrying" : "खदान", value: "quarrying" }, { label: lang === "en" ? "Sandblasting" : "सैंडब्लास्टिंग", value: "sandblasting" }, { label: lang === "en" ? "Gem cutting" : "रत्न-काटना", value: "gem-cutting" }, { label: lang === "en" ? "Ceramics / pottery" : "मिट्टी के बर्तन", value: "ceramics" }, { label: lang === "en" ? "Construction" : "निर्माण", value: "construction" }, { label: lang === "en" ? "Other dusty work" : "अन्य धूल का काम", value: "other-dusty" }]} value={data.work} onChange={set("work")} />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 18 }}>
                      <div>
                        <FieldLabel>{lang === "en" ? "Years in this work" : "इस काम में कितने साल"}</FieldLabel>
                        <FieldChips options={[{ label: "<1", value: "lt1" }, { label: "1–5", value: "1-5" }, { label: "5–10", value: "5-10" }, { label: "10–20", value: "10-20" }, { label: "20+", value: "20plus" }]} value={data.years} onChange={set("years")} />
                      </div>
                      <div>
                        <FieldLabel>{lang === "en" ? "Any other dusty jobs before this?" : "पहले कोई और धूल भरा काम?"}</FieldLabel>
                        <FieldChips options={[{ label: lang === "en" ? "Yes" : "हाँ", value: "yes" }, { label: lang === "en" ? "No" : "नहीं", value: "no" }, { label: lang === "en" ? "Not sure" : "पता नहीं", value: "unsure" }]} value={data.prevjob} onChange={set("prevjob")} />
                      </div>
                    </div>
                    <div style={{ marginBottom: 14 }}>
                      <FieldLabel>{lang === "en" ? "Does the patient use a face mask / respirator?" : "क्या रोगी मास्क पहनते हैं?"}</FieldLabel>
                      <FieldChips options={[{ label: lang === "en" ? "Always" : "हमेशा", value: "always" }, { label: lang === "en" ? "Sometimes" : "कभी-कभी", value: "sometimes" }, { label: lang === "en" ? "Rarely" : "कभी-कभार", value: "rarely" }, { label: lang === "en" ? "Never" : "कभी नहीं", value: "never" }]} value={data.mask} onChange={set("mask")} />
                    </div>
                    {(data.mask === "always" || data.mask === "sometimes") && (
                      <div style={{ marginBottom: 18, marginLeft: 8, paddingLeft: 12, borderLeft: `3px solid ${C.greenMid}` }}>
                        <FieldLabel>{lang === "en" ? "What type of mask?" : "किस प्रकार का मास्क?"}</FieldLabel>
                        <FieldChips options={[{ label: lang === "en" ? "Cloth / cotton" : "कपड़े / सूती", value: "cloth" }, { label: lang === "en" ? "N95 / P100" : "N95 / P100", value: "n95" }, { label: lang === "en" ? "Given by employer" : "नियोक्ता ने दिया", value: "employer" }, { label: lang === "en" ? "Not sure" : "पता नहीं", value: "unknown" }]} value={data.maskType} onChange={set("maskType")} />
                        {data.maskType === "cloth" && (<div style={{ marginTop: 8, padding: "8px 12px", background: C.redLight, borderRadius: 8, fontSize: 12, color: C.redDark }}>⚠ {lang === "en" ? "Cloth masks do not protect against silica dust particles." : "कपड़े के मास्क सिलिका धूल से बचाव नहीं करते।"}</div>)}
                      </div>
                    )}
                    <div style={{ marginBottom: 24 }}>
                      <FieldLabel hint={lang === "en" ? "1 = barely visible dust   5 = thick cloud of dust visible in the air" : "1 = मुश्किल से दिखती धूल   5 = हवा में घनी धूल की परत"}>{lang === "en" ? "How dusty is the work environment?" : "काम की जगह पर धूल कितनी होती है?"}</FieldLabel>
                      <FieldChips options={[{ label: lang === "en" ? "1 — Clear" : "1 — साफ", value: "1" }, { label: lang === "en" ? "2 — Light" : "2 — हल्की", value: "2" }, { label: lang === "en" ? "3 — Moderate" : "3 — मध्यम", value: "3" }, { label: lang === "en" ? "4 — Heavy" : "4 — भारी", value: "4" }, { label: lang === "en" ? "5 — Dense cloud" : "5 — घनी धूल", value: "5" }]} value={String(data.dusty)} onChange={set("dusty")} />
                    </div>
                  </>
                )}
                {data.dustExposed === "no" && (
                  <div style={{ padding: "14px 18px", background: C.greenLight, borderRadius: 12, border: `1px solid ${C.greenMid}`, marginBottom: 20 }}>
                    <div style={{ fontSize: 13, color: C.greenDark }}>ℹ {lang === "en" ? "No significant dust exposure — silicosis risk will be assessed as low. You can still continue to check for other risk factors." : "कोई महत्वपूर्ण धूल संपर्क नहीं — सिलिकोसिस का जोखिम कम माना जाएगा। आप अन्य जोखिम कारकों की जांच के लिए आगे बढ़ सकते हैं।"}</div>
                  </div>
                )}
                <button onClick={() => setStep(2)} disabled={!data.dustExposed} style={{ padding: "13px 32px", background: data.dustExposed ? `linear-gradient(135deg,${C.g1},${C.g2})` : C.bg3, color: data.dustExposed ? "white" : C.text3, borderRadius: 12, fontSize: 15, fontWeight: 700, border: "none", cursor: data.dustExposed ? "pointer" : "not-allowed", fontFamily: "'DM Sans',sans-serif" }}>{t.continue}</button>
              </div>
            )}

            {step === 2 && (
              <div>
                <button onClick={() => setStep(1)} style={{ fontSize: 13, color: C.muted, background: "none", border: "none", cursor: "pointer", marginBottom: 16, fontFamily: "'DM Sans',sans-serif", padding: 0 }}>{t.back}</button>
                <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 20, fontWeight: 700, color: C.dark, marginBottom: 4 }}>{t.step3}</h2>
                <p style={{ fontSize: 13, color: C.muted, marginBottom: 24 }}>{lang === "en" ? "Select all symptoms the patient currently has." : "रोगी के सभी वर्तमान लक्षण चुनें।"}</p>
                <div style={{ marginBottom: 18 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: C.g1, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 8 }}>{lang === "en" ? "Lung symptoms" : "फेफड़े के लक्षण"}</div>
                  <FieldChips multi options={[{ label: lang === "en" ? "Dry cough" : "सूखी खाँसी", value: "dry-cough" }, { label: lang === "en" ? "Cough with sputum" : "बलगम वाली खाँसी", value: "wet-cough" }, { label: lang === "en" ? "Breathlessness on exertion" : "चलने पर सांस फूलना", value: "sob-ex" }, { label: lang === "en" ? "Breathlessness at rest" : "आराम में भी सांस फूलना", value: "sob-rest" }, { label: lang === "en" ? "Chest pain or tightness" : "सीने में दर्द या जकड़न", value: "chest-pain" }]} value={data.symptoms} onChange={set("symptoms")} />
                </div>
                <div style={{ marginBottom: 18 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#b05a1a", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 8 }}>{lang === "en" ? "Infection-type symptoms" : "संक्रमण जैसे लक्षण"}</div>
                  <FieldChips multi options={[{ label: lang === "en" ? "Fever" : "बुखार", value: "fever" }, { label: lang === "en" ? "Night sweats" : "रात को पसीना", value: "night-sweats" }, { label: lang === "en" ? "Unexplained weight loss" : "वजन घटना", value: "weight-loss" }, { label: lang === "en" ? "Blood in sputum" : "बलगम में खून", value: "haemoptysis" }]} value={data.symptoms} onChange={set("symptoms")} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 18 }}>
                  <div>
                    <FieldLabel>{lang === "en" ? "How long have symptoms been present?" : "लक्षण कितने समय से हैं?"}</FieldLabel>
                    <FieldChips options={[{ label: lang === "en" ? "<2 weeks" : "<2 हफ्ते", value: "lt2w" }, { label: lang === "en" ? "2 weeks – 3 months" : "2 हफ्ते – 3 माह", value: "2w-3m" }, { label: lang === "en" ? "3 months – 1 year" : "3 माह – 1 साल", value: "3m-1y" }, { label: lang === "en" ? "Over 1 year" : "1 साल से ज्यादा", value: "1yplus" }]} value={data.duration} onChange={set("duration")} />
                  </div>
                  <div>
                    <FieldLabel>{lang === "en" ? "TB contact in the household?" : "घर में किसी को तपेदिक?"}</FieldLabel>
                    <FieldChips options={[{ label: lang === "en" ? "Yes" : "हाँ", value: "yes" }, { label: lang === "en" ? "No" : "नहीं", value: "no" }, { label: lang === "en" ? "Not known" : "पता नहीं", value: "unk" }]} value={data.tbcontact} onChange={set("tbcontact")} />
                  </div>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <FieldLabel>{lang === "en" ? "Has this patient ever been treated for TB?" : "क्या इस रोगी का तपेदिक का इलाज हुआ है?"}</FieldLabel>
                  <FieldChips options={[{ label: lang === "en" ? "Yes — treatment completed" : "हाँ — इलाज पूरा हो गया", value: "tb-done" }, { label: lang === "en" ? "Yes — currently on TB treatment" : "हाँ — अभी इलाज चल रहा है", value: "tb-ongoing" }, { label: lang === "en" ? "No" : "नहीं", value: "tb-no" }, { label: lang === "en" ? "Not known" : "पता नहीं", value: "tb-unk" }]} value={data.tb} onChange={set("tb")} />
                </div>
                {data.tb === "tb-ongoing" && (
                  <div style={{ background: "#fff3cd", border: "1.5px solid #ffc107", borderRadius: 12, padding: "14px 18px", marginBottom: 16 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#856404", marginBottom: 4 }}>⚠ {lang === "en" ? "Important clinical flag" : "महत्वपूर्ण नैदानिक संकेत"}</div>
                    <div style={{ fontSize: 12, color: "#5a4200", lineHeight: 1.6 }}>{lang === "en" ? "If this patient is on TB treatment but NOT improving, they may have silicosis instead of — or in addition to — TB. Do not continue current treatment without HRCT chest scan." : "यदि यह रोगी तपेदिक का इलाज ले रहे हैं लेकिन ठीक नहीं हो रहे, तो उन्हें सिलिकोसिस हो सकता है। HRCT जांच के बिना वर्तमान इलाज जारी न रखें।"}</div>
                  </div>
                )}
                <div style={{ padding: "10px 14px", background: C.greenLight, borderRadius: "0 8px 8px 0", borderLeft: `3px solid ${C.green}`, marginBottom: 24 }}>
                  <div style={{ fontSize: 12, color: C.greenDark, lineHeight: 1.6 }}>ℹ {lang === "en" ? "Silicosis typically causes dry cough and breathlessness without fever. Fever and night sweats suggest TB but can overlap." : "सिलिकोसिस में आमतौर पर सूखी खाँसी और सांस फूलना होती है, बुखार नहीं। बुखार और रात को पसीना तपेदिक का संकेत हो सकता है।"}</div>
                </div>
                <button onClick={() => setStep(3)} style={{ padding: "13px 32px", background: `linear-gradient(135deg,${C.g1},${C.g2})`, color: "white", borderRadius: 12, fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>{t.continue}</button>
              </div>
            )}

            {step === 3 && (
              <TriageStep3 data={data} onAnalyse={handleAnalyse} onBack={() => setStep(2)} loading={loading} lang={lang} set={set} t={t} />
            )}

            {step === 4 && result && !loading && (
              <div style={{ animation: "fadeIn .4s ease" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                  <div>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 20, background: riskBg, fontSize: 12, fontWeight: 700, color: riskColor, marginBottom: 8 }}>
                      <div style={{ width: 7, height: 7, borderRadius: "50%", background: riskColor }} />
                      {lang === "en" ? "Screening complete" : "जांच पूरी हुई"}
                    </div>
                    <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 22, fontWeight: 800, color: C.dark }}>{result.name}{result.age ? `, ${result.age} ${lang === "en" ? "yrs" : "वर्ष"}` : ""}</h2>
                    <div style={{ fontSize: 13, color: C.muted }}>{result.loc}</div>
                  </div>
                  <button onClick={handleReset} style={{ padding: "9px 18px", background: C.greenLight, color: C.greenDark, borderRadius: 10, fontSize: 13, fontWeight: 700, border: `1px solid ${C.greenMid}`, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>+ {lang === "en" ? "New patient" : "नया रोगी"}</button>
                </div>
                <AIDisclaimer lang={lang} compact />
                {result.savedIds && (
                  <div style={{ padding: "11px 14px", background: C.greenLight, border: `1px solid ${C.greenMid}`, borderRadius: 10, color: C.greenDark, fontSize: 13, fontWeight: 600, marginBottom: 14 }}>
                    {lang === "en" ? "Saved to database" : "डेटाबेस में सहेजा गया"}: {lang === "en" ? "Patient" : "रोगी"} #{result.savedIds.patientId}, {lang === "en" ? "Screening" : "जांच"} #{result.savedIds.screeningId}, {lang === "en" ? "Report" : "रिपोर्ट"} #{result.savedIds.reportId}
                    {result.savedIds.xrayUploadId ? `, X-ray #${result.savedIds.xrayUploadId}` : ""}
                  </div>
                )}
                {result.saveError && (
                  <div style={{ padding: "11px 14px", background: C.redLight, border: "1px solid #f2b6b6", borderRadius: 10, color: C.redDark, fontSize: 13, fontWeight: 600, marginBottom: 14 }}>
                    {lang === "en" ? "Screening generated, but database save failed" : "जांच तैयार हुई, लेकिन डेटाबेस में सहेजी नहीं जा सकी"}: {result.saveError}
                  </div>
                )}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 16 }}>
                  {[{ v: `${result.confidence}%`, l: lang === "en" ? "Confidence" : "विश्वास" }, { v: result.risk === "High" ? (lang === "en" ? "High" : "उच्च") : result.risk === "Moderate" ? (lang === "en" ? "Moderate" : "मध्यम") : (lang === "en" ? "Low" : "कम"), l: lang === "en" ? "Silicosis risk" : "सिलिकोसिस जोखिम", color: riskColor }, { v: "<5s", l: lang === "en" ? "Analysis time" : "विश्लेषण समय" }].map(({ v, l, color }) => (
                    <div key={l} style={{ background: "#f5faf7", borderRadius: 12, padding: "14px 16px", border: `1px solid ${C.borderC}` }}>
                      <div style={{ fontSize: 22, fontWeight: 800, color: color || C.dark, letterSpacing: "-0.5px" }}>{v}</div>
                      <div style={{ fontSize: 11, color: C.muted, marginTop: 2, textTransform: "uppercase", letterSpacing: "0.05em" }}>{l}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", background: "#f0f5f2", borderRadius: 10, padding: "4px", gap: 3, marginBottom: 18 }}>
                  {[["diagnosis", lang === "en" ? "Diagnosis" : "निदान"], ["report", lang === "en" ? "Report" : "रिपोर्ट"], ["referral", lang === "en" ? "Referral" : "रेफरल"]].map(([tab, label]) => (
                    <button key={tab} onClick={() => setResultTab(tab)} style={{ flex: 1, padding: "9px 4px", textAlign: "center", fontSize: 13, fontWeight: resultTab === tab ? 700 : 500, borderRadius: 8, cursor: "pointer", background: resultTab === tab ? "white" : "transparent", border: "none", color: resultTab === tab ? C.dark : C.muted, boxShadow: resultTab === tab ? "0 1px 4px rgba(0,0,0,0.08)" : "none", fontFamily: "'DM Sans',sans-serif" }}>{label}</button>
                  ))}
                </div>
                {resultTab === "diagnosis" && (
                  <div>
                    <div style={{ background: "#f5faf7", borderRadius: 12, padding: "14px 16px", marginBottom: 12, border: `1px solid ${C.borderC}` }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>{lang === "en" ? "Clinical history score" : "नैदानिक इतिहास स्कोर"}</div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                        <span style={{ fontSize: 13, color: C.dark }}>{lang === "en" ? "Occupational exposure model" : "व्यावसायिक संपर्क मॉडल"}</span>
                        <span style={{ fontSize: 16, fontWeight: 800, color: riskColor }}>{result.clinicalScore}/100</span>
                      </div>
                      <div style={{ height: 7, background: C.bg3, borderRadius: 4, overflow: "hidden" }}>
                        <div style={{ height: "100%", borderRadius: 4, background: riskColor, width: `${result.clinicalScore}%`, transition: "width 1s ease" }} />
                      </div>
                    </div>
                    <div style={{ background: "#f5faf7", borderRadius: 12, padding: "14px 16px", marginBottom: 12, border: `1px solid ${C.borderC}` }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>{lang === "en" ? "Key signals detected" : "मुख्य संकेत मिले"}</div>
                      {buildSignals(data, lang).map((s, i) => (<div key={i} style={{ fontSize: 13, color: C.dark, lineHeight: 1.9 }}>• {s}</div>))}
                    </div>
                    <div style={{ borderRadius: 8, padding: "11px 13px", marginBottom: 9, background: C.redLight, borderLeft: `3px solid ${C.red}` }}>
                      <div style={{ fontSize: 13, color: "#6b1515", lineHeight: 1.5 }}>⚠ <strong>{lang === "en" ? "Do not start TB treatment." : "तपेदिक का इलाज शुरू न करें।"}</strong> {lang === "en" ? "Clinical picture is consistent with silicosis." : "नैदानिक चित्र सिलिकोसिस को दर्शाता है।"}</div>
                    </div>
                    <div style={{ borderRadius: 8, padding: "11px 13px", marginBottom: 12, background: C.greenLight, borderLeft: `3px solid ${C.green}` }}>
                      <div style={{ fontSize: 13, color: C.greenDark, lineHeight: 1.5 }}>ℹ {lang === "en" ? "Patient may be eligible for" : "रोगी पात्र हो सकते हैं"} <strong>₹3 {lang === "en" ? "lakh compensation" : "लाख मुआवज़े"}</strong> {lang === "en" ? "under Silicosis Rehabilitation Scheme." : "सिलिकोसिस पुनर्वास योजना के तहत।"}</div>
                    </div>
                    <div style={{ background: "#f5faf7", borderRadius: 12, padding: "14px 16px", border: `1px solid ${C.borderC}` }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 10 }}>{lang === "en" ? "Recommended next steps" : "अनुशंसित अगले कदम"}</div>
                      {(lang === "en" ? ["Refer urgently to pulmonologist or chest specialist", "Order HRCT chest scan for confirmation", "Do NOT initiate empirical anti-TB treatment", "File silicosis compensation claim with district collector", "Remove patient from all dust exposure immediately"] : ["फेफड़े के विशेषज्ञ को तुरंत रेफर करें", "पुष्टि के लिए HRCT छाती स्कैन करवाएं", "तपेदिक का इलाज शुरू न करें", "जिला अधिकारी के पास मुआवज़ा दावा दर्ज करें", "रोगी को धूल के संपर्क से तुरंत हटाएं"]).map((s, i) => (
                        <div key={i} style={{ display: "flex", gap: 10, padding: "7px 0", borderBottom: i < 4 ? `1px solid ${C.borderC}` : "none" }}>
                          <div style={{ width: 22, height: 22, borderRadius: "50%", background: "white", border: `1px solid ${C.borderC}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: C.muted, flexShrink: 0, marginTop: 2 }}>{i + 1}</div>
                          <div style={{ fontSize: 13, color: C.dark, lineHeight: 1.5 }}>{s}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {resultTab === "report" && (
                  <div>
                    <div style={{ display: "flex", background: "#f0f5f2", borderRadius: 8, padding: "3px", marginBottom: 12 }}>
                      {[["en", "English"], ["hi", "हिन्दी"]].map(([code, label]) => (
                        <button key={code} onClick={() => setReportLang(code)} style={{ flex: 1, padding: "7px 4px", textAlign: "center", fontSize: 13, fontWeight: reportLang === code ? 700 : 500, borderRadius: 6, cursor: "pointer", background: reportLang === code ? "white" : "transparent", border: "none", color: reportLang === code ? C.dark : C.muted, fontFamily: "'DM Sans',sans-serif" }}>{label}</button>
                      ))}
                    </div>
                    <div style={{ background: "#f5faf7", borderRadius: 10, padding: "14px 16px", marginBottom: 12, border: `1px solid ${C.borderC}` }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>{lang === "en" ? "Referral note" : "रेफरल नोट"} — {reportLang === "en" ? "English" : "हिन्दी"}</div>
                      <div style={{ fontSize: 13, color: C.dark, lineHeight: 1.8 }} dangerouslySetInnerHTML={{ __html: reportLang === "en" ? result.reportEn : result.reportHi }} />
                    </div>
                    <button onClick={copyReport}
                      style={{ width: "100%", padding: "13px", background: C.greenDark, color: "white", borderRadius: 10, fontSize: 14, fontWeight: 700, border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", marginBottom: 10 }}>
                      {lang === "en" ? "Copy report to clipboard" : "रिपोर्ट कॉपी करें"}
                    </button>
                    <button onClick={openSmsReferral}
                      style={{ width: "100%", padding: "13px", background: "transparent", color: C.muted, borderRadius: 10, fontSize: 14, fontWeight: 600, border: `1px solid ${C.borderC}`, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>
                      {lang === "en" ? "Open referral in SMS app" : "SMS ऐप में रेफरल खोलें"}
                    </button>
                  </div>
                )}
                {resultTab === "referral" && (<ReferralTab result={result} lang={lang} data={data} />)}
              </div>
            )}

            {loading && (
              <div style={{ textAlign: "center", padding: "64px 20px" }}>
                <div style={{ width: 52, height: 52, border: `3px solid ${C.borderC}`, borderTopColor: C.g1, borderRadius: "50%", animation: "spin 0.75s linear infinite", margin: "0 auto 24px" }} />
                <div style={{ fontSize: 18, fontWeight: 800, color: C.dark, marginBottom: 10 }}>{lang === "en" ? "Analysing patient data…" : "रोगी डेटा का विश्लेषण हो रहा है…"}</div>
                {(lang === "en" ? ["Evaluating occupational exposure risk…", "Analysing X-ray image…", "Cross-referencing symptom pattern…", "Generating clinical report…"] : ["व्यावसायिक जोखिम का मूल्यांकन…", "एक्स-रे छवि का विश्लेषण…", "लक्षण पैटर्न का मिलान…", "नैदानिक रिपोर्ट तैयार…"]).map((s, i) => (<div key={i} style={{ fontSize: 13, color: C.muted, marginTop: 7 }}>{s}</div>))}
              </div>
            )}
          </div>

          {/* RIGHT PANEL */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {/* X-ray preview */}
            <div style={{ background: "white", borderRadius: 20, padding: "24px", border: `1px solid ${C.borderC}`, boxShadow: "0 4px 24px rgba(10,127,90,.07)" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.dark, marginBottom: 14, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>🩻 {lang === "en" ? "X-ray Preview" : "एक्स-रे पूर्वावलोकन"}</div>
              <div style={{ width: "100%", aspectRatio: "4/3", background: "linear-gradient(160deg,#0d1a14,#1a3a2a)", borderRadius: 14, position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {xrayPreview ? (
                  <>
                    <img src={xrayPreview} alt="X-ray" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                    <div style={{ position: "absolute", width: 80, height: 80, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,80,60,0.7) 0%, rgba(255,80,60,0.15) 60%, transparent 80%)", top: "24%", right: "26%", animation: "badgePulse 2.2s ease-in-out infinite" }} />
                    <div style={{ position: "absolute", bottom: 8, left: 10, fontSize: 9, color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>Grad-CAM · DenseNet121 · SilicoSafe</div>
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 320 240" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0, opacity: step === 4 ? 1 : 0.5 }}>
                      <rect width="320" height="240" fill="#0a1812" />
                      <ellipse cx="115" cy="120" rx="62" ry="75" fill="none" stroke="#2a5a3a" strokeWidth="1.5" />
                      <ellipse cx="205" cy="120" rx="62" ry="75" fill="none" stroke="#2a5a3a" strokeWidth="1.5" />
                      <ellipse cx="115" cy="120" rx="44" ry="55" fill="#1a3a28" stroke="#3a7a50" strokeWidth="1" />
                      <ellipse cx="205" cy="120" rx="44" ry="55" fill="#1a3a28" stroke="#3a7a50" strokeWidth="1" />
                      <path d="M160 38 L160 200" stroke="#4a9a6a" strokeWidth="2.5" />
                      <circle cx="100" cy="96" r="5.5" fill="#1eaa60" opacity=".7" />
                      <circle cx="122" cy="115" r="4.5" fill="#1eaa60" opacity=".6" />
                      <circle cx="192" cy="100" r="5" fill="#1eaa60" opacity=".65" />
                      <text x="10" y="232" fontFamily="monospace" fontSize="9" fill="#2ecc71" opacity=".5">AI ANALYSIS · SilicoSafe v2.4</text>
                    </svg>
                    {step < 4 && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "rgba(46,204,113,.6)", animation: "scan 3s linear infinite" }} />}
                    <div style={{ position: "absolute", textAlign: "center", color: "rgba(255,255,255,.3)", fontSize: 13, lineHeight: 1.6, padding: 16 }}>{lang === "en" ? "Upload X-ray on step 4 for AI heatmap analysis" : "AI हीटमैप विश्लेषण के लिए चरण 4 में एक्स-रे अपलोड करें"}</div>
                  </>
                )}
              </div>
            </div>

            {/* Patient summary */}
            <div style={{ background: "white", borderRadius: 20, padding: "24px", border: `1px solid ${C.borderC}`, boxShadow: "0 4px 24px rgba(10,127,90,.07)" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.dark, marginBottom: 14, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>📋 {lang === "en" ? "Patient Summary" : "रोगी सारांश"}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {[
                  { l: lang === "en" ? "Name" : "नाम", v: data.name || "—" },
                  { l: lang === "en" ? "Age" : "उम्र", v: data.age || "—" },
                  { l: lang === "en" ? "District" : "जिला", v: data.district || "—" },
                  { l: lang === "en" ? "State" : "राज्य", v: data.state || "—" },
                  { l: lang === "en" ? "Dust exposure" : "धूल संपर्क", v: data.dustExposed === "yes" ? (lang === "en" ? "Yes" : "हाँ") : data.dustExposed === "no" ? (lang === "en" ? "No" : "नहीं") : "—" },
                  { l: lang === "en" ? "Occupation" : "व्यवसाय", v: data.work ? data.work.replace(/-/g, " ") : "—" },
                  { l: lang === "en" ? "Exposure years" : "संपर्क वर्ष", v: data.years || "—" },
                  { l: lang === "en" ? "Mask use" : "मास्क", v: data.mask || "—" },
                  { l: lang === "en" ? "Symptoms" : "लक्षण", v: data.symptoms.length ? `${data.symptoms.length} ${lang === "en" ? "selected" : "चुने गए"}` : "—" },
                ].map(({ l, v }) => (
                  <div key={l} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "6px 0", borderBottom: `1px solid ${C.borderC}` }}>
                    <span style={{ color: C.muted }}>{l}</span>
                    <span style={{ color: C.dark, fontWeight: 500, textAlign: "right", maxWidth: "55%" }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk legend */}
            <div style={{ background: "white", borderRadius: 20, padding: "20px 24px", border: `1px solid ${C.borderC}` }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>{lang === "en" ? "Risk levels" : "जोखिम स्तर"}</div>
              {[["🟢", lang === "en" ? "Low risk" : "कम जोखिम", lang === "en" ? "No immediate action needed" : "तत्काल कार्रवाई नहीं"], ["🟡", lang === "en" ? "Moderate risk" : "मध्यम जोखिम", lang === "en" ? "Monitor closely, refer if worsening" : "नजदीकी निगरानी, बिगड़ने पर रेफर"], ["🔴", lang === "en" ? "High risk" : "उच्च जोखिम", lang === "en" ? "Immediate specialist referral" : "तत्काल विशेषज्ञ रेफरल"]].map(([icon, label, sub]) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <span style={{ fontSize: 14 }}>{icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.dark }}>{label}</div>
                    <div style={{ fontSize: 11, color: C.muted }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {step < 4 && <AIDisclaimer lang={lang} compact />}
          </div>
        </div>
      </div>
    </div>
  );
}

function ReferralTab({ result, lang, data }) {
  const localCentres = result.referralCentres;
  return (
    <div>
      <div style={{ fontSize: 13, color: C.muted, marginBottom: 14, lineHeight: 1.6 }}>{lang === "en" ? "Specialist centres near the patient's district for HRCT, Pneumoconiosis Board certification, and ESIC treatment." : "HRCT, न्यूमोकोनियोसिस बोर्ड प्रमाणन और ESIC उपचार के लिए रोगी के जिले के निकटतम विशेषज्ञ केंद्र।"}</div>
      {localCentres && localCentres.length > 0 ? (
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.g1, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 10 }}>{lang === "en" ? `Nearest centres — ${data.state || data.district}` : `निकटतम केंद्र — ${data.state || data.district}`}</div>
          {localCentres.map((c, i) => (
            <div key={i} style={{ background: "#f5faf7", borderRadius: 12, padding: "14px 16px", border: `1px solid ${C.borderC}`, marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 6 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.dark }}>{c.name}</div>
                <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 6, background: C.greenLight, color: C.greenDark, whiteSpace: "nowrap", flexShrink: 0 }}>{c.type}</span>
              </div>
              <div style={{ fontSize: 12, color: C.muted, marginBottom: 4 }}>📍 {c.address}</div>
              <div style={{ fontSize: 12, color: C.g1, fontWeight: 600 }}>📞 {c.phone}</div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ background: C.amberLight, borderRadius: 12, padding: "14px 16px", border: "1px solid #e0c070", marginBottom: 16 }}>
          <div style={{ fontSize: 13, color: C.amber, fontWeight: 600, marginBottom: 4 }}>{lang === "en" ? "District not in database" : "जिला डेटाबेस में नहीं है"}</div>
          <div style={{ fontSize: 12, color: "#5a3a00", lineHeight: 1.6 }}>{lang === "en" ? "Enter the patient's district and state in Step 1 to find nearby centres. Showing national referral centres below." : "निकटतम केंद्र खोजने के लिए चरण 1 में जिला और राज्य दर्ज करें। नीचे राष्ट्रीय रेफरल केंद्र दिखाए जा रहे हैं।"}</div>
        </div>
      )}
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.muted, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 10 }}>{lang === "en" ? "National referral centres" : "राष्ट्रीय रेफरल केंद्र"}</div>
        {NATIONAL_REFERRAL.map((c, i) => (
          <div key={i} style={{ background: "#f5faf7", borderRadius: 12, padding: "14px 16px", border: `1px solid ${C.borderC}`, marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 6 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.dark }}>{c.name}</div>
              <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 6, background: "#e0f0ff", color: "#1a5fa8", whiteSpace: "nowrap", flexShrink: 0 }}>{c.type}</span>
            </div>
            <div style={{ fontSize: 12, color: C.muted, marginBottom: 4 }}>📍 {c.address}</div>
            <div style={{ fontSize: 12, color: C.g1, fontWeight: 600, marginBottom: 4 }}>📞 {c.phone}</div>
            <a href={c.url} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: "#1a5fa8", textDecoration: "none", fontWeight: 600 }}>🌐 {c.url.replace("https://", "")}</a>
          </div>
        ))}
      </div>
      <div style={{ background: C.greenLight, borderRadius: 12, padding: "14px 16px", border: `1px solid ${C.greenMid}` }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.greenDark, marginBottom: 8 }}>{lang === "en" ? "Helplines" : "हेल्पलाइन"}</div>
        {[{ label: lang === "en" ? "National TB Helpline" : "राष्ट्रीय टीबी हेल्पलाइन", number: "1800-11-6666", note: lang === "en" ? "Free, 24/7" : "मुफ्त, 24/7" }, { label: lang === "en" ? "Labour Ministry Helpline" : "श्रम मंत्रालय हेल्पलाइन", number: "1800-11-8001", note: lang === "en" ? "Compensation queries" : "मुआवज़ा संबंधी प्रश्न" }].map((h, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: i < 1 ? `1px solid ${C.greenMid}` : "none" }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.dark }}>{h.label}</div>
              <div style={{ fontSize: 11, color: C.muted }}>{h.note}</div>
            </div>
            <a href={`tel:${h.number}`} style={{ fontSize: 14, fontWeight: 800, color: C.g1, textDecoration: "none" }}>{h.number}</a>
          </div>
        ))}
      </div>
    </div>
  );
}

function TriageStep3({ data, onAnalyse, onBack, loading, lang, set, t }) {
  const fileRef = useRef();
  const [preview, setPreview] = useState(null);
  const handleFile = (f) => {
    if (!f) return;
    if (!["image/jpeg", "image/png"].includes(f.type) || f.size > 20 * 1024 * 1024) {
      alert(lang === "en" ? "Choose a JPG or PNG image up to 20 MB." : "20 MB तक की JPG या PNG छवि चुनें।");
      if (fileRef.current) fileRef.current.value = "";
      return;
    }
    set("xrayFile")(f);
    setPreview(URL.createObjectURL(f));
  };
  const clearFile = () => { set("xrayFile")(null); setPreview(null); if (fileRef.current) fileRef.current.value = ""; };
  useEffect(() => () => {
    if (preview) URL.revokeObjectURL(preview);
  }, [preview]);
  return (
    <div>
      <button onClick={onBack} style={{ fontSize: 13, color: C.muted, background: "none", border: "none", cursor: "pointer", marginBottom: 16, fontFamily: "'DM Sans',sans-serif", padding: 0 }}>{t.back}</button>
      <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 20, fontWeight: 700, color: C.dark, marginBottom: 4 }}>{t.step4}</h2>
      <p style={{ fontSize: 13, color: C.muted, marginBottom: 20 }}>{lang === "en" ? "Upload chest X-ray if available. A photo taken against light also works." : "यदि उपलब्ध हो तो छाती का एक्स-रे अपलोड करें। रोशनी के सामने ली गई फोटो भी काम करती है।"}</p>
      <div onClick={() => fileRef.current && fileRef.current.click()} style={{ border: `2px dashed ${preview ? C.g1 : C.borderC}`, borderRadius: 16, padding: "32px 24px", textAlign: "center", cursor: "pointer", background: preview ? C.greenLight : "#f9fdfb", transition: "all .18s", marginBottom: 14 }}>
        <div style={{ width: 52, height: 52, margin: "0 auto 12px", background: "white", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${C.borderC}` }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill={C.g1}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 7V3.5L18.5 9H13z" /></svg>
        </div>
        <div style={{ fontSize: 15, fontWeight: 700, color: C.dark, marginBottom: 4 }}>{preview ? (lang === "en" ? "X-ray uploaded ✓" : "एक्स-रे अपलोड हो गया ✓") : (lang === "en" ? "Tap to upload X-ray" : "एक्स-रे अपलोड करने के लिए यहाँ टैप करें")}</div>
        <div style={{ fontSize: 12, color: C.muted }}>JPG या PNG · {lang === "en" ? "up to 20MB" : "अधिकतम 20MB"}</div>
      </div>
      <input ref={fileRef} type="file" accept=".jpg,.jpeg,.png,image/jpeg,image/png" style={{ display: "none" }} onChange={e => handleFile(e.target.files[0])} />
      {preview && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, padding: "10px 14px", background: "white", borderRadius: 10, border: `1px solid ${C.greenMid}` }}>
          <img src={preview} alt="xray" style={{ width: 44, height: 44, borderRadius: 8, objectFit: "cover" }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.dark }}>{data.xrayFile?.name}</div>
            <div style={{ fontSize: 11, color: C.muted }}>{data.xrayFile ? (data.xrayFile.size / 1024 / 1024).toFixed(1) + " MB" : ""}</div>
          </div>
          <button onClick={e => { e.stopPropagation(); clearFile(); }} style={{ background: "none", border: "none", fontSize: 20, color: C.muted, cursor: "pointer" }}>×</button>
        </div>
      )}
      <div style={{ marginBottom: 16 }}>
        <FieldLabel>{lang === "en" ? "Has a doctor already reviewed this X-ray?" : "क्या किसी डॉक्टर ने यह एक्स-रे पहले देखा है?"}</FieldLabel>
        <FieldChips options={[{ label: lang === "en" ? "Yes — doctor reviewed it" : "हाँ — डॉक्टर ने देखा है", value: "yes" }, { label: lang === "en" ? "No — not reviewed yet" : "नहीं — अभी नहीं देखा", value: "no" }, { label: lang === "en" ? "No X-ray taken yet" : "एक्स-रे अभी नहीं हुआ", value: "none" }]} value={data.xrayDoctorSeen} onChange={set("xrayDoctorSeen")} />
      </div>
      {data.xrayDoctorSeen === "yes" && (
        <div style={{ marginBottom: 20, padding: "14px 16px", background: C.greenLight, borderRadius: 12, border: `1px solid ${C.greenMid}` }}>
          <FieldLabel hint={lang === "en" ? "Select what the doctor found in the X-ray" : "डॉक्टर ने एक्स-रे में क्या पाया?"}>{lang === "en" ? "Doctor's X-ray findings" : "डॉक्टर के एक्स-रे निष्कर्ष"}</FieldLabel>
          <FieldChips options={[{ label: lang === "en" ? "Upper lobe opacity" : "ऊपरी लोब में धुंधलापन", value: "upper-opacity" }, { label: lang === "en" ? "Nodular shadows" : "गांठदार छाया", value: "nodular" }, { label: lang === "en" ? "Bilateral infiltrates" : "दोनों तरफ फैलाव", value: "bilateral" }, { label: lang === "en" ? "Hilar enlargement" : "हाइलर बढ़ाव", value: "hilar" }, { label: lang === "en" ? "Normal / unclear" : "सामान्य / स्पष्ट नहीं", value: "normal" }]} value={data.xrayFindings} onChange={set("xrayFindings")} />
        </div>
      )}
      <button onClick={onAnalyse} disabled={loading} style={{ width: "100%", padding: "16px 24px", background: loading ? C.muted : `linear-gradient(135deg,${C.g1},${C.g2})`, color: "white", borderRadius: 14, fontSize: 16, fontWeight: 700, border: "none", cursor: loading ? "not-allowed" : "pointer", fontFamily: "'DM Sans',sans-serif", marginBottom: 10 }}>
        {loading ? (lang === "en" ? "Analysing…" : "विश्लेषण हो रहा है…") : t.analyseBtn}
      </button>
      <div onClick={loading ? undefined : onAnalyse} style={{ border: `1.5px solid ${C.borderC}`, borderRadius: 12, padding: "14px 18px", cursor: "pointer", background: "#fafbfa", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: C.bg3, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>📋</div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: C.dark }}>{lang === "en" ? "No X-ray available?" : "एक्स-रे उपलब्ध नहीं?"}</div>
          <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{lang === "en" ? "Continue with history-only assessment. Accuracy will be lower." : "केवल इतिहास के आधार पर जांच करें। सटीकता कम होगी।"}</div>
        </div>
        <div style={{ marginLeft: "auto", color: C.muted, fontSize: 18 }}>→</div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SCHEMES PAGE
// ══════════════════════════════════════════════════════════════════════════════
function getSCHEMES(lang) {
  const hi = lang === "hi";
  return [
    { id: 1, state: hi ? "राजस्थान" : "Rajasthan", title: hi ? "सिलिकोसिस नीति एवं अनुदान पोर्टल" : "Silicosis Policy & Grant Portal", icon: "🏜️", tag: hi ? "सबसे व्यापक" : "Most Comprehensive", tagColor: "#16a34a", bg: "#dcfce7", border: "#86efac", managed: hi ? "राजस्थान राज्य सरकार" : "Rajasthan State Government", benefits: [{ label: hi ? "निदान अनुदान" : "Diagnosis Grant", value: "₹3,00,000", icon: "💊" }, { label: hi ? "मासिक पेंशन" : "Monthly Pension", value: hi ? "₹1,500/माह" : "Rs. 1,500/mo", icon: "📅" }, { label: hi ? "मृत्यु सहायता" : "Death Assistance", value: "₹2,00,000", icon: "🕊️" }, { label: hi ? "विधवा पेंशन" : "Widow Pension", value: hi ? "पालनहार योजना" : "Palanhar Scheme", icon: "👨‍👩‍👧" }], url: "https://silicosis.rajasthan.gov.in", urlLabel: "silicosis.rajasthan.gov.in", desc: hi ? "राजस्थान में सिलिकोसिस की सबसे व्यापक नीति है, जो रोगियों को विकलांग व्यक्तियों के समान लाभ देती है। प्रमाणन-आधारित अनुदान और मासिक वित्तीय सहायता शामिल है।" : "Rajasthan has the most comprehensive silicosis policy in India, treating patients on par with differently-abled persons. Benefits include certification-based grants and monthly financial support." },
    { id: 2, state: hi ? "हरियाणा" : "Haryana", title: hi ? "सिलिकोसिस पुनर्वास योजना" : "Silicosis Rehabilitation Scheme", icon: "🌾", tag: hi ? "असंगठित श्रमिक" : "Unorganized Workers", tagColor: "#0891b2", bg: "#e0f2fe", border: "#7dd3fc", managed: hi ? "हरियाणा श्रम कल्याण बोर्ड" : "Haryana Labour Welfare Board", benefits: [{ label: hi ? "पुनर्वास पेंशन" : "Rehabilitation Pension", value: hi ? "मासिक सहायता" : "Monthly Aid", icon: "📋" }, { label: hi ? "एकमुश्त सहायता" : "One-time Assistance", value: hi ? "चिकित्सा अनुदान" : "Medical Grant", icon: "🏥" }, { label: hi ? "मृत्यु लाभ" : "Death Benefit", value: hi ? "₹5,00,000 तक" : "Up to Rs. 5,00,000", icon: "🕊️" }], url: "https://hrylabour.gov.in", urlLabel: "hrylabour.gov.in", desc: hi ? "हरियाणा श्रम कल्याण बोर्ड द्वारा प्रबंधित, यह योजना असंगठित क्षेत्र के श्रमिकों को पुनर्वास पेंशन और परिवारों को पर्याप्त मृत्यु लाभ प्रदान करती है।" : "Managed by the Haryana Labour Welfare Board, this scheme supports workers in the unorganized sector with rehabilitation pensions and substantial death benefits for families." },
    { id: 3, state: hi ? "केंद्र सरकार" : "Central Government", title: hi ? "ESIC व्यावसायिक रोग लाभ" : "ESIC Occupational Disease Benefits", icon: "🏛️", tag: hi ? "फैक्ट्री श्रमिक" : "Factory Workers", tagColor: "#7c3aed", bg: "#f3e8ff", border: "#c4b5fd", managed: hi ? "कर्मचारी राज्य बीमा निगम" : "Employees' State Insurance Corporation", benefits: [{ label: hi ? "स्थायी अक्षमता लाभ" : "Permanent Disablement Benefit", value: hi ? "वेतन का 90%" : "90% of wages", icon: "🛡️" }, { label: hi ? "आश्रित लाभ" : "Dependents' Benefit", value: hi ? "90% वेतन/माह" : "90% wages/mo", icon: "👨‍👩‍👧" }, { label: hi ? "चिकित्सा देखभाल" : "Medical Care", value: hi ? "पूर्ण उपचार" : "Full Treatment", icon: "🏥" }], url: "https://esic.gov.in", urlLabel: "esic.gov.in", desc: hi ? "ESIC के अंतर्गत आने वाले श्रमिकों के लिए, यह वेतन के 90% पर आजीवन स्थायी अक्षमता लाभ प्रदान करता है। श्रमिक की मृत्यु होने पर आश्रितों को भी मासिक 90% वेतन मिलता है।" : "For workers covered under ESIC, this provides lifelong Permanent Disablement Benefit at 90% of wages. If the worker passes away, dependents also receive 90% of wages monthly." },
    { id: 4, state: hi ? "केंद्र सरकार" : "Central Government", title: hi ? "PM-SYM पेंशन योजना" : "PM-SYM Pension Scheme", icon: "🇮🇳", tag: hi ? "राष्ट्रीय योजना" : "National Scheme", tagColor: "#d97706", bg: "#fef3c7", border: "#fcd34d", managed: hi ? "श्रम एवं रोजगार मंत्रालय" : "Ministry of Labour & Employment", benefits: [{ label: hi ? "60 वर्ष बाद मासिक पेंशन" : "Monthly Pension after age 60", value: hi ? "₹3,000/माह" : "Rs. 3,000/mo", icon: "📅" }, { label: hi ? "लक्ष्य समूह" : "Target Group", value: hi ? "असंगठित श्रमिक" : "Unorganized Workers", icon: "👷" }], url: "https://maandhan.in", urlLabel: "maandhan.in", desc: hi ? "PM-SYM खनिकों, पत्थर तोड़ने वालों और निर्माण श्रमिकों सहित असंगठित श्रमिकों के लिए 60 वर्ष की आयु के बाद ₹3,000 मासिक पेंशन की गारंटी देता है।" : "PM-SYM provides a guaranteed Rs. 3,000 monthly pension after age 60 for unorganized workers including miners, stone crushers, and construction workers." },
    { id: 5, state: hi ? "खनन राज्य" : "Mining States", title: hi ? "जिला खनिज फाउंडेशन फंड" : "District Mineral Foundation Funds", icon: "⛏️", tag: hi ? "झारखंड और ओडिशा" : "Jharkhand & Odisha", tagColor: "#be123c", bg: "#ffe4e6", border: "#fda4af", managed: hi ? "जिला कलेक्टर कार्यालय" : "District Collector's Office", benefits: [{ label: hi ? "स्रोत" : "Source", value: hi ? "खनन कंपनियाँ" : "Mining Companies", icon: "🏭" }, { label: hi ? "उद्देश्य" : "Purpose", value: hi ? "उपचार एवं मुआवज़ा" : "Treatment & Compensation", icon: "💊" }, { label: hi ? "पहुँच" : "Access", value: hi ? "कलेक्टर कार्यालय" : "Collector's Office", icon: "📍" }], url: "https://myscheme.gov.in", urlLabel: "myscheme.gov.in", desc: hi ? "खनन कंपनियों से एकत्रित DMF फंड का उपयोग झारखंड और ओडिशा के खनन क्षेत्रों में सिलिकोसिस पीड़ितों के उपचार और मुआवज़े के लिए किया जाता है।" : "DMF funds collected from mining companies are used specifically for treatment and compensation of silicosis victims in mining clusters in Jharkhand and Odisha." },
  ];
}

function SchemesPage({ lang }) {
  const t = getT(lang);
  const [modal, setModal] = useState(null);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: "#14532d", background: "#f0fdf4", minHeight: "100vh" }}>
      <section style={{ background: "linear-gradient(135deg,#14532d 0%,#166534 45%,#15803d 100%)", color: "#fff", padding: "80px 24px 58px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "relative", maxWidth: 740, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 20, padding: "6px 16px", marginBottom: 22, fontSize: 13 }}>🇮🇳 {lang === "en" ? "Government Support for Silicosis Patients" : "सिलिकोसिस रोगियों के लिए सरकारी सहायता"}</div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(26px,5.5vw,50px)", fontWeight: 900, lineHeight: 1.2, marginBottom: 16 }}>{lang === "en" ? <>Know Your Rights.<br /><span style={{ color: "#86efac" }}>Claim What You Deserve.</span></> : <>अपने अधिकार जानें।<br /><span style={{ color: "#86efac" }}>जो मिलना चाहिए, वो लें।</span></>}</h1>
          <p style={{ fontSize: 17, lineHeight: 1.75, color: "#bbf7d0", marginBottom: 32, fontWeight: 300 }}>{lang === "en" ? "A comprehensive guide to all government schemes, grants, and benefits available to silicosis patients and their families across India." : "भारत में सिलिकोसिस रोगियों और उनके परिवारों के लिए उपलब्ध सभी सरकारी योजनाओं की व्यापक मार्गदर्शिका।"}</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#schemes-grid" style={{ background: "#16a34a", color: "#fff", padding: "13px 26px", borderRadius: 8, textDecoration: "none", fontWeight: 700, fontSize: 15 }}>{t.schemesViewAll}</a>
            <a href="https://myscheme.gov.in" target="_blank" rel="noreferrer" style={{ background: "rgba(255,255,255,0.1)", color: "#fff", padding: "13px 26px", borderRadius: 8, textDecoration: "none", fontWeight: 600, fontSize: 15, border: "1px solid rgba(255,255,255,0.22)" }}>myscheme.gov.in ↗</a>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 50, flexWrap: "wrap" }}>
          {[{ v: "3L+", l: lang === "en" ? "Workers Affected" : "प्रभावित श्रमिक" }, { v: "5", l: lang === "en" ? "Major Schemes" : "प्रमुख योजनाएं" }, { v: "₹5L", l: lang === "en" ? "Max Death Benefit" : "अधिकतम मृत्यु लाभ" }, { v: "90%", l: lang === "en" ? "ESIC Coverage" : "ESIC कवरेज" }].map(s => (
            <div key={s.l} style={{ padding: "13px 24px", borderRight: "1px solid rgba(255,255,255,.14)" }}>
              <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 26, fontWeight: 700, color: "#4ade80" }}>{s.v}</div>
              <div style={{ fontSize: 12, color: "#86efac", marginTop: 3 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ background: "#dcfce7", borderTop: "3px solid #86efac", borderBottom: "3px solid #86efac", padding: "14px 24px", textAlign: "center" }}>
        <p style={{ fontSize: 14, color: "#15803d", maxWidth: 700, margin: "0 auto" }}>
          <strong>⚠️ {lang === "en" ? "Note:" : "नोट:"}</strong> {t.schemesNote}{" "}
          <a href="https://myscheme.gov.in" target="_blank" rel="noreferrer" style={{ color: "#15803d", fontWeight: 700 }}>myscheme.gov.in</a>
        </p>
      </div>

      <section id="schemes-grid" style={{ maxWidth: 1100, margin: "0 auto", padding: "58px 22px" }}>
        <div style={{ textAlign: "center", marginBottom: 42 }}>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 34, fontWeight: 700, color: "#14532d", marginBottom: 10 }}>{lang === "en" ? "Available Schemes" : "उपलब्ध योजनाएं"}</h2>
          <p style={{ color: "#4b7c5a", fontSize: 16, maxWidth: 540, margin: "0 auto" }}>{lang === "en" ? "Click any card to view full details, benefits, and the official government website." : "पूरी जानकारी देखने के लिए किसी भी कार्ड पर क्लिक करें।"}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(305px,1fr))", gap: 20 }}>
          {getSCHEMES(lang).map(s => (
            <div key={s.id} onClick={() => setModal(s)} style={{ background: "#fff", borderRadius: 15, padding: 24, cursor: "pointer", boxShadow: "0 4px 18px rgba(22,163,74,0.07)", border: `1.5px solid ${s.border}`, transition: "transform .25s, box-shadow .25s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 18px 50px rgba(22,163,74,0.18)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 18px rgba(22,163,74,0.07)"; }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 13 }}>
                <div style={{ width: 48, height: 48, borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, background: s.bg }}>{s.icon}</div>
                <span style={{ padding: "4px 10px", borderRadius: 18, fontSize: 11, fontWeight: 700, background: s.bg, color: s.tagColor }}>{s.tag}</span>
              </div>
              <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 3 }}>{s.state}</div>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 18, fontWeight: 700, color: "#14532d", marginBottom: 9, lineHeight: 1.35 }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: "#4b7c5a", lineHeight: 1.6, marginBottom: 16 }}>{s.desc.slice(0, 110)}...</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 16 }}>
                {s.benefits.slice(0, 2).map(b => (<span key={b.label} style={{ borderRadius: 7, padding: "5px 9px", fontSize: 12, color: "#14532d", background: s.bg, border: `1px solid ${s.border}` }}>{b.icon} <strong>{b.value}</strong></span>))}
                {s.benefits.length > 2 && <span style={{ background: "#f3f4f6", borderRadius: 7, padding: "5px 9px", fontSize: 12, color: "#6b7280" }}>+{s.benefits.length - 2}</span>}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <a href={s.url} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} style={{ fontSize: 12, color: "#16a34a", fontWeight: 600, textDecoration: "none" }}>🌐 {s.urlLabel}</a>
                <span style={{ fontSize: 13, color: "#16a34a", fontWeight: 700 }}>{lang === "en" ? "View Details →" : "विवरण देखें →"}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: "#fff", padding: "58px 22px", borderTop: "2px solid #bbf7d0" }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 30, fontWeight: 700, color: "#14532d", marginBottom: 10 }}>{t.docsTitle}</h2>
            <p style={{ color: "#4b7c5a", fontSize: 16 }}>{t.docsSub}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(195px,1fr))", gap: 16 }}>
            {[{ icon: "🩺", label: lang === "en" ? "Medical Certificate" : "मेडिकल प्रमाणपत्र", desc: lang === "en" ? "Issued by a certified Pneumoconiosis Medical Board or government hospital" : "प्रमाणित न्यूमोकोनियोसिस बोर्ड द्वारा जारी" }, { icon: "🪪", label: lang === "en" ? "Identity Proof" : "पहचान प्रमाण", desc: lang === "en" ? "Aadhaar Card or Jan Aadhaar (for Rajasthan)" : "आधार कार्ड या जन आधार" }, { icon: "🪨", label: lang === "en" ? "Employment Proof" : "रोजगार प्रमाण", desc: lang === "en" ? "Proof of work in mine, stone crusher, or quartz industry" : "खदान, पत्थर कारखाने में काम का प्रमाण" }, { icon: "🏦", label: lang === "en" ? "Bank Details" : "बैंक विवरण", desc: lang === "en" ? "Bank passbook for Direct Benefit Transfer (DBT)" : "DBT के लिए बैंक पासबुक" }].map(d => (
              <div key={d.label} style={{ border: "1.5px solid #d1fae5", borderRadius: 13, padding: "20px 16px", textAlign: "center", transition: "border-color .2s, background .2s", cursor: "default" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#16a34a"; e.currentTarget.style.background = "#f0fdf4"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#d1fae5"; e.currentTarget.style.background = ""; }}>
                <div style={{ fontSize: 30, marginBottom: 9 }}>{d.icon}</div>
                <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 15, fontWeight: 700, color: "#14532d", marginBottom: 7 }}>{d.label}</div>
                <div style={{ fontSize: 13, color: "#4b7c5a", lineHeight: 1.55 }}>{d.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "linear-gradient(135deg,#14532d,#166534)", color: "#fff", padding: "58px 22px", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ fontSize: 44, marginBottom: 13 }}>🫁</div>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 32, fontWeight: 700, marginBottom: 13 }}>{t.schemesApply}</h2>
          <p style={{ fontSize: 16, color: "#bbf7d0", marginBottom: 28, lineHeight: 1.75 }}>{t.schemesApplySub}</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://myscheme.gov.in" target="_blank" rel="noreferrer" style={{ background: "#16a34a", color: "#fff", padding: "14px 26px", borderRadius: 9, textDecoration: "none", fontWeight: 700, fontSize: 15 }}>🌐 myscheme.gov.in</a>
            <a href="https://silicosis.rajasthan.gov.in" target="_blank" rel="noreferrer" style={{ background: "rgba(255,255,255,0.1)", color: "#fff", padding: "14px 26px", borderRadius: 9, textDecoration: "none", fontWeight: 600, fontSize: 15, border: "1px solid rgba(255,255,255,0.22)" }}>🏜️ {lang === "en" ? "Rajasthan Portal" : "राजस्थान पोर्टल"}</a>
          </div>
        </div>
      </section>

      <footer style={{ background: "#052e16", padding: "20px", textAlign: "center" }}>
        <p style={{ color: "#4ade80", fontWeight: 600, marginBottom: 4 }}>SilicoSafe India — {lang === "en" ? "Government Scheme Guide" : "सरकारी योजना मार्गदर्शिका"}</p>
        <p style={{ color: "#6b7280", fontSize: 13 }}>{lang === "en" ? "Information sourced from official government portals." : "जानकारी आधिकारिक सरकारी पोर्टलों से ली गई है।"}</p>
      </footer>

      {modal && (
        <div onClick={() => setModal(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.52)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 18, animation: "fadeIn 0.18s ease both" }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 18, maxWidth: 540, width: "100%", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 24px 72px rgba(0,0,0,0.3)", animation: "slideUp 0.28s ease both" }}>
            <div style={{ background: "linear-gradient(135deg,#14532d,#166534)", padding: "24px 24px 20px", borderRadius: "18px 18px 0 0", color: "#fff", position: "relative" }}>
              <button onClick={() => setModal(null)} style={{ position: "absolute", top: 13, right: 13, background: "rgba(255,255,255,0.14)", border: "none", borderRadius: "50%", width: 31, height: 31, cursor: "pointer", color: "#fff", fontSize: 17, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
              <div style={{ fontSize: 36, marginBottom: 8 }}>{modal.icon}</div>
              <div style={{ fontSize: 12, color: "#86efac", marginBottom: 3 }}>{modal.state} · {modal.managed}</div>
              <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 21, fontWeight: 700 }}>{modal.title}</div>
            </div>
            <div style={{ padding: 24 }}>
              <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.7, marginBottom: 20 }}>{modal.desc}</p>
              <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 17, color: "#14532d", marginBottom: 13 }}>{t.benefitsTitle}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 20 }}>
                {modal.benefits.map(b => (
                  <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 11, borderRadius: 9, padding: "11px 14px", background: modal.bg, border: `1px solid ${modal.border}` }}>
                    <span style={{ fontSize: 20 }}>{b.icon}</span>
                    <div><div style={{ fontSize: 12, color: "#6b7280" }}>{b.label}</div><div style={{ fontWeight: 700, fontSize: 15, color: "#14532d" }}>{b.value}</div></div>
                  </div>
                ))}
              </div>
              <a href={modal.url} target="_blank" rel="noreferrer" style={{ display: "block", background: "#16a34a", color: "#fff", padding: "13px 20px", borderRadius: 9, textDecoration: "none", fontWeight: 700, fontSize: 15, textAlign: "center" }}>🌐 {t.visitSite}: {modal.urlLabel} ↗</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ROOT APP
// ══════════════════════════════════════════════════════════════════════════════
const ADMIN_TEXT = {
  en: {
    clinicLogin: "Clinic login", title: "SilicoSafe Admin",
    loginDescription: "Sign in to view appointments, patients, screenings, reports, X-ray metadata, and staff accounts.",
    email: "Email", password: "Password", signingIn: "Signing in...", signIn: "Sign in",
    // defaultAdmin: "Default local admin: admin@silicosafe.local / Admin@12345. Change this in backend/.env before deployment.",
    loginSuccess: "Logged in successfully.", accountCreated: "Account created.",
    dashboard: "Admin dashboard", operations: "Clinical Operations", loggedInAs: "Logged in as",
    refresh: "Refresh", logout: "Logout", loading: "Loading latest records...",
    appointments: "Appointments", patients: "Patients", screenings: "Screenings", highRisk: "High risk",
    reports: "Reports", xrays: "X-rays", accounts: "Accounts", appointmentBookings: "Appointment bookings",
    noPhone: "No phone", noAppointments: "No appointments yet.", screeningHistory: "Screening history",
    locationMissing: "Location not set", noScreenings: "No screenings saved yet.", generatedReports: "Generated reports",
    noReports: "No reports yet.", patientDetails: "Patient details", detailsPending: "Details pending",
    noLocation: "No location", screeningCount: "screenings", noPatients: "No patients saved yet.",
    xrayMetadata: "Uploaded X-ray metadata", unknownPatient: "Unknown patient", sizeUnknown: "size unknown",
    doctorReviewed: "Doctor reviewed", findings: "findings", notSet: "not set", noXrays: "No X-ray uploads yet.",
    loginAccounts: "Clinic/doctor login accounts", name: "Name", temporaryPassword: "Temporary password",
    createAccount: "Create account", noAccounts: "No accounts found.", adminOnly: "Only admins can manage accounts.",
  },
  hi: {
    clinicLogin: "क्लिनिक लॉगिन", title: "SilicoSafe एडमिन",
    loginDescription: "अपॉइंटमेंट, रोगी, जांच, रिपोर्ट, एक्स-रे जानकारी और स्टाफ खाते देखने के लिए साइन इन करें।",
    email: "ईमेल", password: "पासवर्ड", signingIn: "साइन इन हो रहा है...", signIn: "साइन इन करें",
    defaultAdmin: "डिफ़ॉल्ट स्थानीय एडमिन: admin@silicosafe.local / Admin@12345। डिप्लॉयमेंट से पहले backend/.env में इसे बदलें।",
    loginSuccess: "सफलतापूर्वक लॉगिन हो गया।", accountCreated: "खाता बन गया।",
    dashboard: "एडमिन डैशबोर्ड", operations: "क्लिनिकल संचालन", loggedInAs: "लॉगिन उपयोगकर्ता",
    refresh: "रीफ़्रेश", logout: "लॉगआउट", loading: "नवीनतम रिकॉर्ड लोड हो रहे हैं...",
    appointments: "अपॉइंटमेंट", patients: "रोगी", screenings: "जांच", highRisk: "उच्च जोखिम",
    reports: "रिपोर्ट", xrays: "एक्स-रे", accounts: "खाते", appointmentBookings: "अपॉइंटमेंट बुकिंग",
    noPhone: "फ़ोन नहीं", noAppointments: "अभी कोई अपॉइंटमेंट नहीं।", screeningHistory: "जांच इतिहास",
    locationMissing: "स्थान दर्ज नहीं", noScreenings: "अभी कोई जांच सहेजी नहीं गई।", generatedReports: "तैयार रिपोर्ट",
    noReports: "अभी कोई रिपोर्ट नहीं।", patientDetails: "रोगी विवरण", detailsPending: "विवरण बाकी है",
    noLocation: "स्थान नहीं", screeningCount: "जांच", noPatients: "अभी कोई रोगी सहेजा नहीं गया।",
    xrayMetadata: "अपलोड किए गए एक्स-रे की जानकारी", unknownPatient: "अज्ञात रोगी", sizeUnknown: "आकार अज्ञात",
    doctorReviewed: "डॉक्टर ने देखा", findings: "निष्कर्ष", notSet: "दर्ज नहीं", noXrays: "अभी कोई एक्स-रे अपलोड नहीं।",
    loginAccounts: "क्लिनिक/डॉक्टर लॉगिन खाते", name: "नाम", temporaryPassword: "अस्थायी पासवर्ड",
    createAccount: "खाता बनाएं", noAccounts: "कोई खाता नहीं मिला।", adminOnly: "केवल एडमिन खाते प्रबंधित कर सकते हैं।",
  },
};

function AdminPage({ auth, setAuth, lang }) {
  const a = ADMIN_TEXT[lang] || ADMIN_TEXT.en;
  const [login, setLogin] = useState({ email: "admin@silicosafe.local", password: "Admin@12345" });
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "doctor", password: "" });
  const [dashboard, setDashboard] = useState(null);
  const [records, setRecords] = useState({ appointments: [], patients: [], screenings: [], reports: [], xrays: [], users: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const token = auth?.token;

  const panel = { background: "white", borderRadius: 16, border: `1px solid ${C.borderC}`, padding: 20, boxShadow: "0 4px 24px rgba(10,127,90,.07)" };
  const input = { width: "100%", padding: "11px 13px", borderRadius: 10, border: `1.5px solid ${C.borderC}`, background: "#f9fdfb", color: C.dark, outline: "none" };
  const smallHead = { fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", color: C.muted, fontWeight: 800, marginBottom: 12 };

  const loadAdminData = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError("");
    try {
      const [dash, appointments, patients, screenings, reports, xrays] = await Promise.all([
        apiRequest("/api/dashboard", { token }),
        apiRequest("/api/appointments", { token }),
        apiRequest("/api/patients", { token }),
        apiRequest("/api/screenings", { token }),
        apiRequest("/api/reports", { token }),
        apiRequest("/api/xrays", { token }),
      ]);

      let users = [];
      if (auth?.user?.role === "admin") {
        users = (await apiRequest("/api/users", { token })).users || [];
      }

      setDashboard(dash);
      setRecords({
        appointments: appointments.appointments || [],
        patients: patients.patients || [],
        screenings: screenings.screenings || [],
        reports: reports.reports || [],
        xrays: xrays.xrays || [],
        users,
      });
    } catch (err) {
      setError(err.message || "Could not load dashboard");
    } finally {
      setLoading(false);
    }
  }, [token, auth?.user?.role]);

  useEffect(() => {
    loadAdminData();
  }, [loadAdminData]);

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const nextAuth = await apiRequest("/api/auth/login", {
        method: "POST",
        body: login,
      });
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextAuth));
      setAuth(nextAuth);
      setNotice(a.loginSuccess);
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setAuth(null);
    setDashboard(null);
    setRecords({ appointments: [], patients: [], screenings: [], reports: [], xrays: [], users: [] });
  };

  const createUser = async () => {
    setError("");
    setNotice("");
    try {
      await apiRequest("/api/users", {
        method: "POST",
        token,
        body: newUser,
      });
      setNewUser({ name: "", email: "", role: "doctor", password: "" });
      setNotice(a.accountCreated);
      loadAdminData();
    } catch (err) {
      setError(err.message || "Could not create account");
    }
  };

  const updateAppointmentStatus = async (id, status) => {
    try {
      await apiRequest(`/api/appointments/${id}/status`, {
        method: "PATCH",
        token,
        body: { status },
      });
      loadAdminData();
    } catch (err) {
      setError(err.message || "Could not update appointment");
    }
  };

  if (!auth?.token) {
    return (
      <div style={{ minHeight: "100vh", background: "#eef2ef", padding: "60px 32px", fontFamily: "'DM Sans',sans-serif" }}>
        <div style={{ maxWidth: 440, margin: "0 auto", ...panel }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: C.g1, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 8 }}>{a.clinicLogin}</div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 28, color: C.dark, marginBottom: 8 }}>{a.title}</h1>
          <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.6, marginBottom: 20 }}>{a.loginDescription}</p>
          <div style={{ display: "grid", gap: 12, marginBottom: 14 }}>
            <input style={input} value={login.email} onChange={e => setLogin(p => ({ ...p, email: e.target.value }))} placeholder={a.email} />
            <input style={input} type="password" value={login.password} onChange={e => setLogin(p => ({ ...p, password: e.target.value }))} placeholder={a.password} />
          </div>
          <button onClick={handleLogin} disabled={loading} style={{ width: "100%", padding: 14, background: loading ? C.muted : `linear-gradient(135deg,${C.g1},${C.g2})`, color: "white", border: "none", borderRadius: 12, fontWeight: 800, cursor: loading ? "not-allowed" : "pointer" }}>{loading ? a.signingIn : a.signIn}</button>
          <div style={{ marginTop: 14, fontSize: 12, color: C.muted, lineHeight: 1.6 }}>{a.defaultAdmin}</div>
          {error && <div style={{ marginTop: 14, padding: 12, borderRadius: 10, background: C.redLight, color: C.redDark, fontSize: 13 }}>{error}</div>}
        </div>
      </div>
    );
  }

  const totals = dashboard?.totals || {};
  const metricCards = [
    [a.appointments, totals.appointments || 0],
    [a.patients, totals.patients || 0],
    [a.screenings, totals.screenings || 0],
    [a.highRisk, totals.highRisk || 0],
    [a.reports, totals.reports || 0],
    [a.xrays, totals.xrays || 0],
    [a.accounts, totals.users || 0],
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#eef2ef", padding: "40px 32px", fontFamily: "'DM Sans',sans-serif" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 20, marginBottom: 22 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.g1, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 6 }}>{a.dashboard}</div>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 30, color: C.dark }}>{a.operations}</h1>
            <p style={{ fontSize: 14, color: C.muted, marginTop: 5 }}>{a.loggedInAs}: {auth.user?.name} ({auth.user?.role})</p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={loadAdminData} style={{ padding: "10px 16px", borderRadius: 10, border: `1px solid ${C.borderC}`, background: "white", color: C.dark, fontWeight: 700, cursor: "pointer" }}>{a.refresh}</button>
            <button onClick={handleLogout} style={{ padding: "10px 16px", borderRadius: 10, border: "none", background: C.dark, color: "white", fontWeight: 700, cursor: "pointer" }}>{a.logout}</button>
          </div>
        </div>

        {error && <div style={{ marginBottom: 16, padding: 12, borderRadius: 10, background: C.redLight, color: C.redDark, fontSize: 13, fontWeight: 700 }}>{error}</div>}
        {notice && <div style={{ marginBottom: 16, padding: 12, borderRadius: 10, background: C.greenLight, color: C.greenDark, fontSize: 13, fontWeight: 700 }}>{notice}</div>}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(145px,1fr))", gap: 12, marginBottom: 18 }}>
          {metricCards.map(([label, value]) => (
            <div key={label} style={{ ...panel, padding: 16 }}>
              <div style={{ fontSize: 11, color: C.muted, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".06em" }}>{label}</div>
              <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 26, color: label === a.highRisk ? C.red : C.dark, fontWeight: 900, marginTop: 6 }}>{value}</div>
            </div>
          ))}
        </div>

        {loading && <div style={{ marginBottom: 18, color: C.muted, fontSize: 14 }}>{a.loading}</div>}

        <div style={{ display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: 18, alignItems: "start" }}>
          <div style={{ display: "grid", gap: 18 }}>
            <section style={panel}>
              <div style={smallHead}>{a.appointmentBookings}</div>
              <div style={{ display: "grid", gap: 10 }}>
                {records.appointments.map(apt => (
                  <div key={apt.id} style={{ display: "grid", gridTemplateColumns: "1.2fr .8fr .8fr", gap: 12, alignItems: "center", padding: "11px 0", borderBottom: `1px solid ${C.borderC}` }}>
                    <div>
                      <div style={{ fontWeight: 800, color: C.dark }}>{apt.name}</div>
                      <div style={{ fontSize: 12, color: C.muted }}>{apt.phone || (lang === "hi" ? "फ़ोन नहीं" : "No phone")} - {apt.type}</div>
                    </div>
                    <div style={{ fontSize: 13, color: C.dark }}>{apt.preferredDate}</div>
                    <select value={apt.status} onChange={e => updateAppointmentStatus(apt.id, e.target.value)} style={{ ...input, padding: "8px 10px" }}>
                      {["pending", "confirmed", "completed", "cancelled"].map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                ))}
                {!records.appointments.length && <div style={{ color: C.muted, fontSize: 13 }}>{a.noAppointments}</div>}
              </div>
            </section>

            <section style={panel}>
              <div style={smallHead}>{a.screeningHistory}</div>
              <div style={{ display: "grid", gap: 10 }}>
                {records.screenings.map(s => (
                  <div key={s.id} style={{ padding: "12px 0", borderBottom: `1px solid ${C.borderC}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                      <div>
                        <div style={{ fontWeight: 800, color: C.dark }}>{s.patientName} {s.age ? `(${s.age})` : ""}</div>
                        <div style={{ fontSize: 12, color: C.muted }}>{[s.district, s.state].filter(Boolean).join(", ") || a.locationMissing} - {s.createdAt}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontWeight: 900, color: s.riskLevel === "High" ? C.red : s.riskLevel === "Moderate" ? C.amber : C.green }}>{s.riskLevel}</div>
                        <div style={{ fontSize: 12, color: C.muted }}>{s.clinicalScore}/100 - {s.confidence}%</div>
                      </div>
                    </div>
                    <div style={{ marginTop: 8, fontSize: 12, color: C.text2 }}>{(s.signals || []).slice(0, 3).join(" | ")}</div>
                  </div>
                ))}
                {!records.screenings.length && <div style={{ color: C.muted, fontSize: 13 }}>{a.noScreenings}</div>}
              </div>
            </section>

            <section style={panel}>
              <div style={smallHead}>{a.generatedReports}</div>
              <div style={{ display: "grid", gap: 12 }}>
                {records.reports.map(r => (
                  <div key={r.id} style={{ background: "#f5faf7", border: `1px solid ${C.borderC}`, borderRadius: 12, padding: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <strong style={{ color: C.dark }}>{r.patientName}</strong>
                      <span style={{ color: C.muted, fontSize: 12 }}>{r.createdAt}</span>
                    </div>
                    <div style={{ color: C.text2, fontSize: 13, lineHeight: 1.6 }}>{stripHtml(r.reportEn).slice(0, 260)}...</div>
                  </div>
                ))}
                {!records.reports.length && <div style={{ color: C.muted, fontSize: 13 }}>{a.noReports}</div>}
              </div>
            </section>
          </div>

          <div style={{ display: "grid", gap: 18 }}>
            <section style={panel}>
              <div style={smallHead}>{a.patientDetails}</div>
              <div style={{ display: "grid", gap: 8 }}>
                {records.patients.map(p => (
                  <div key={p.id} style={{ display: "flex", justifyContent: "space-between", gap: 10, borderBottom: `1px solid ${C.borderC}`, padding: "9px 0" }}>
                    <div>
                      <div style={{ fontWeight: 800, color: C.dark }}>{p.name}</div>
                      <div style={{ fontSize: 12, color: C.muted }}>{[p.age, p.sex].filter(Boolean).join(" - ") || a.detailsPending}</div>
                    </div>
                    <div style={{ textAlign: "right", fontSize: 12, color: C.muted }}>
                      <div>{[p.district, p.state].filter(Boolean).join(", ") || a.noLocation}</div>
                      <div>{p.screeningCount} {a.screeningCount}</div>
                    </div>
                  </div>
                ))}
                {!records.patients.length && <div style={{ color: C.muted, fontSize: 13 }}>{a.noPatients}</div>}
              </div>
            </section>

            <section style={panel}>
              <div style={smallHead}>{a.xrayMetadata}</div>
              <div style={{ display: "grid", gap: 8 }}>
                {records.xrays.map(x => (
                  <div key={x.id} style={{ borderBottom: `1px solid ${C.borderC}`, padding: "9px 0" }}>
                    <div style={{ fontWeight: 800, color: C.dark }}>{x.patientName || a.unknownPatient}</div>
                    <div style={{ fontSize: 12, color: C.muted }}>{x.originalFilename} - {x.mimeType} - {x.sizeBytes ? `${(x.sizeBytes / 1024 / 1024).toFixed(1)} MB` : a.sizeUnknown}</div>
                    <div style={{ fontSize: 12, color: C.muted }}>{a.doctorReviewed}: {x.doctorReviewed || a.notSet}; {a.findings}: {x.doctorFindings || a.notSet}</div>
                  </div>
                ))}
                {!records.xrays.length && <div style={{ color: C.muted, fontSize: 13 }}>{a.noXrays}</div>}
              </div>
            </section>

            <section style={panel}>
              <div style={smallHead}>{a.loginAccounts}</div>
              {auth.user?.role === "admin" && (
                <div style={{ display: "grid", gap: 9, marginBottom: 14, paddingBottom: 14, borderBottom: `1px solid ${C.borderC}` }}>
                  <input style={input} placeholder={a.name} value={newUser.name} onChange={e => setNewUser(p => ({ ...p, name: e.target.value }))} />
                  <input style={input} placeholder={a.email} value={newUser.email} onChange={e => setNewUser(p => ({ ...p, email: e.target.value }))} />
                  <select style={input} value={newUser.role} onChange={e => setNewUser(p => ({ ...p, role: e.target.value }))}>
                    <option value="doctor">doctor</option>
                    <option value="clinic">clinic</option>
                    <option value="admin">admin</option>
                  </select>
                  <input style={input} type="password" placeholder={a.temporaryPassword} value={newUser.password} onChange={e => setNewUser(p => ({ ...p, password: e.target.value }))} />
                  <button onClick={createUser} style={{ padding: 12, border: "none", borderRadius: 10, background: C.g1, color: "white", fontWeight: 800, cursor: "pointer" }}>{a.createAccount}</button>
                </div>
              )}
              <div style={{ display: "grid", gap: 8 }}>
                {records.users.map(u => (
                  <div key={u.id} style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${C.borderC}`, padding: "8px 0" }}>
                    <div>
                      <div style={{ fontWeight: 800, color: C.dark }}>{u.name}</div>
                      <div style={{ fontSize: 12, color: C.muted }}>{u.email}</div>
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 800, color: C.g1 }}>{u.role}</div>
                  </div>
                ))}
                {!records.users.length && <div style={{ color: C.muted, fontSize: 13 }}>{auth.user?.role === "admin" ? a.noAccounts : a.adminOnly}</div>}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem("silicosafe_language");
    return LANGUAGE_OPTIONS.some(option => option.code === saved) ? saved : "en";
  });
  const [auth, setAuth] = useState(() => getStoredAuth());

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  useEffect(() => {
    localStorage.setItem("silicosafe_language", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ur" ? "rtl" : "ltr";
  }, [lang]);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        ${FONTS}
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes scan { 0%{top:0} 100%{top:100%} }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(36px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes badgePulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.5)} }
        @keyframes slideIn { from { opacity:0; transform: translateX(12px); } to { opacity:1; transform: translateX(0); } }
        input, select, textarea, button { font-family: 'DM Sans', sans-serif; }
        div::-webkit-scrollbar { display: none; }
      `}</style>
      <Navbar currentPage={page} setPage={setPage} lang={lang} setLang={setLang} />
      {page === "home" && <HomePage setPage={setPage} lang={lang} />}
      {page === "triage" && <TriagePage lang={lang} />}
      {page === "schemes" && <SchemesPage lang={lang} />}
      {page === "admin" && <AdminPage auth={auth} setAuth={setAuth} lang={lang} />}
    </div>
  );
}