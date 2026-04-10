import pool from "../db/index.js";

export async function getAllTests() {
  const result = await pool.query("SELECT * FROM tests ORDER BY created_at DESC");
  return result.rows;
}

export async function insertTest(client, name, description) {
  const result = await client.query(
    "INSERT INTO tests (name, description) VALUES ($1, $2) RETURNING *",
    [name, description],
  );
  return result.rows[0];
}

export async function insertQuestion(client, testId, questionText) {
  const result = await client.query(
    "INSERT INTO questions (test_id, question_text) VALUES ($1, $2) RETURNING *",
    [testId, questionText],
  );
  return result.rows[0];
}

export async function insertAnswer(client, questionId, answerText, isCorrect) {
  const result = await client.query(
    "INSERT INTO answers (question_id, answer_text, is_correct) VALUES ($1, $2, $3) RETURNING *",
    [questionId, answerText, isCorrect],
  );
  return result.rows[0];
}

export async function getTestById(id) {
  const test = await pool.query("SELECT * FROM tests WHERE id = $1", [id]);
  if (!test.rows[0]) return null;

  const questions = await pool.query(
    "SELECT * FROM questions WHERE test_id = $1 ORDER BY id ASC",
    [id],
  );

  for (const q of questions.rows) {
    const answers = await pool.query(
      "SELECT * FROM answers WHERE question_id = $1 ORDER BY id ASC",
      [q.id],
    );
    q.answers = answers.rows;
  }

  return { ...test.rows[0], questions: questions.rows };
}

export async function updateTestInfo(client, id, name, description) {
  await client.query(
    "UPDATE tests SET name = $1, description = $2 WHERE id = $3",
    [name, description, id],
  );
}

export async function deleteQuestionsByTestId(client, testId) {
  await client.query("DELETE FROM questions WHERE test_id = $1", [testId]);
}

export async function deleteTest(id) {
  await pool.query("DELETE FROM tests WHERE id = $1", [id]);
}
