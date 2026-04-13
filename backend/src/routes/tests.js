import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { getAllTests, getTestById, deleteTest, getAssignedTestsForEmployee, getAssignedTestsForCompany, insertAssignedTest, updateAssignedTestDeadline, deleteAssignedTest } from "../models/tests.js";
import { createTest, updateTest } from "../services/tests.js";

const router = Router();

router.get("/assigned", requireAuth, async (req, res) => {
  const { userId, role, companyId } = req.user;
  try {
    if (role === "manažér") {
      if (!companyId) return res.status(400).json({ error: "No company associated with this account." });
      const assignments = await getAssignedTestsForCompany(companyId);
      return res.json(assignments);
    }
    const assignments = await getAssignedTestsForEmployee(userId);
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/assign", requireAuth, async (req, res) => {
  const { testId, employeeId, deadline } = req.body;
  if (!testId) return res.status(400).json({ error: "testId is required." });
  if (!employeeId) return res.status(400).json({ error: "employeeId is required." });
  try {
    const assignment = await insertAssignedTest(testId, employeeId, req.user.userId, deadline);
    res.status(201).json(assignment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", requireAuth, async (req, res) => {
  try {
    const tests = await getAllTests();
    res.json(tests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", requireAuth, async (req, res) => {
  const { name, description, questions } = req.body;

  if (!name) return res.status(400).json({ error: "Name is required." });
  if (!description) return res.status(400).json({ error: "Description is required." });
  if (!Array.isArray(questions) || questions.length === 0)
    return res.status(400).json({ error: "At least one question is required." });

  try {
    const test = await createTest(name, description, questions);
    res.status(201).json(test);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch("/assigned/:id", requireAuth, async (req, res) => {
  const { deadline } = req.body;
  try {
    await updateAssignedTestDeadline(req.params.id, deadline);
    res.json({ message: "Deadline updated." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/assigned/:id", requireAuth, async (req, res) => {
  try {
    await deleteAssignedTest(req.params.id);
    res.json({ message: "Assignment deleted." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", requireAuth, async (req, res) => {
  try {
    const test = await getTestById(req.params.id);
    if (!test) return res.status(404).json({ error: "Test not found." });
    res.json(test);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", requireAuth, async (req, res) => {
  const { name, description, questions } = req.body;

  if (!name) return res.status(400).json({ error: "Name is required." });
  if (!description) return res.status(400).json({ error: "Description is required." });
  if (!Array.isArray(questions) || questions.length === 0)
    return res.status(400).json({ error: "At least one question is required." });

  try {
    await updateTest(req.params.id, name, description, questions);
    res.json({ message: "Test updated." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", requireAuth, async (req, res) => {
  try {
    await deleteTest(req.params.id);
    res.json({ message: "Course deleted." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
