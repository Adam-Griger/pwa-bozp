import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { getAllUsers } from "../models/user.js";
import { createUser } from "../services/user.js";

const router = Router();

router.get("/", requireAuth, async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", requireAuth, async (req, res) => {
  const { fullname, email, role, companyId } = req.body;

  if (!fullname) return res.status(400).json({ error: "Full name is required" });
  if (!email) return res.status(400).json({ error: "Email is required" });
  if (!role) return res.status(400).json({ error: "Role is required" });
  if (role !== "admin" && !companyId) return res.status(400).json({ error: "Company is required" });

  try {
    const result = await createUser(fullname, email, companyId || null, role);
    res.status(201).json(result);
  } catch (err) {
    if (err.code === "23505") {
      res.status(409).json({ error: "A user with this email already exists." });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
});

export default router;
