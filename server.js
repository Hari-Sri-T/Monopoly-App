import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// serve frontend
app.use(express.static(path.join(__dirname, "public")));

// endpoint: return firebase config
app.get("/config", (req, res) => {
  res.json({
    firebaseConfig: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID
    }
  });
});

// endpoint: check organizer password
app.post("/auth-organizer", express.json(), (req, res) => {
  if (req.body.password === process.env.ORGANIZER_PASSWORD) {
    return res.json({ ok: true });
  }
  res.status(403).json({ ok: false, error: "Invalid password" });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✅ Server running on ${PORT}`));
