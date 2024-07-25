import express from "express";

const router = express.Router();

router.get("/hello", async (_req, res) => {
  res.status(200).json({ message: "Hello World11" });
});

router.post("/add", async (_req, res) => {
  res.status(200).json({ message: "ok" });
});

export default router;
