import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import bcrypt from "bcrypt";
import { getAllUsers, getUsersByCompany, getUserMe, updateUserPassword, deleteUser } from "../models/user.js";
import { createUser } from "../services/user.js";

const router = Router();

router.get("/me", requireAuth, async (req, res) => {
  try {
    const user = await getUserMe(req.user.userId);
    if (!user) return res.status(404).json({ error: "User not found." });
    const { password, ...safe } = user;
    res.json(safe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/me/password", requireAuth, async (req, res) => {
  const { current, newPassword } = req.body;
  if (!current || !newPassword) return res.status(400).json({ error: "Both current and new password are required." });
  if (newPassword.length < 6) return res.status(400).json({ error: "New password must be at least 6 characters." });

  try {
    const user = await getUserMe(req.user.userId);
    const match = await bcrypt.compare(current, user.password);
    if (!match) return res.status(401).json({ error: "Current password is incorrect." });

    const hashed = await bcrypt.hash(newPassword, 10);
    await updateUserPassword(req.user.userId, hashed);
    res.json({ message: "Password updated." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/company", requireAuth, async (req, res) => {
  const companyId = req.user.companyId;
  if (!companyId) return res.status(400).json({ error: "No company associated with this account." });
  try {
    const employees = await getUsersByCompany(companyId);
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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

router.delete("/:id", requireAuth, async (req, res) => {
  try {
    await deleteUser(req.params.id);
    res.json({ message: "User deleted." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
