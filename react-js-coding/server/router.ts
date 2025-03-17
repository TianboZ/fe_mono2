import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/hello", async (_req, res) => {
  res.status(200).json({ message: "Hello World11" });
});

router.post("/add", async (_req, res) => {
  res.status(200).json({ message: "ok" });
});

router.post("/verify", async (_req, _res) => {
  console.log(_req.body);
  const SERVER_KEY = "6LcD4PYqAAAAAJDNHawTM0oQGhrnzM2ItJgijjHR";
  const { token } = _req.body;
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${SERVER_KEY}&response=${token}`;
  const resp = await axios.post(url);
  const data = resp.data;
  const isValid = data.success;
  console.log(data);
  _res.status(200).json({ isValid });
});
export default router;
