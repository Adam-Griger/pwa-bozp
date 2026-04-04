import pool from "../db/index.js";

export async function getAllCompanies() {
  const result = await pool.query("SELECT * FROM companies ORDER BY created_at DESC");
  return result.rows;
}

export async function insertCompanyOnly(name, address, ico) {
  const result = await pool.query("INSERT INTO companies (company_name, address, ico) VALUES ($1, $2, $3) RETURNING *", [name, address, ico]);
  return result.rows[0];
}

export async function insertCompany(client, name, address, ico) {
  const result = await client.query("INSERT INTO companies (company_name, address, ico) VALUES ($1, $2, $3) RETURNING *", [
    name,
    address || null,
    ico,
  ]);
  return result.rows[0];
}

export async function deleteCompany(id) {
  await pool.query("DELETE FROM companies WHERE id = $1", [id]);
}
