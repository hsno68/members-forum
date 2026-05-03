import pool from "./pool.js";

export async function getUsers() {
  const { rows } = await pool.query("SELECT username FROM users");
  return rows;
}

export async function createUser({
  first_name,
  last_name,
  username,
  hashedPassword,
  membership_status,
}) {
  await pool.query(
    "INSERT INTO users (first_name, last_name, username, password, membership_status) VALUES ($1, $2, $3, $4, $5)",
    [first_name, last_name, username, hashedPassword, membership_status]
  );
}
