import pool from "./pool.js";

export async function getUsers() {
  const { rows } = await pool.query("SELECT username FROM users");
  return rows;
}

export async function getMessages() {
  const { rows } = await pool.query(
    "SELECT title, message, timestamp, username FROM messages JOIN users ON messages.user_id = users.id"
  );
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

export async function createMessage({ title, message, user_id }) {
  await pool.query("INSERT INTO messages (title, message, user_id) VALUES ($1, $2, $3)", [
    title,
    message,
    user_id,
  ]);
}

export async function updateRole({ id }) {
  await pool.query(
    `
  UPDATE users
  SET role =
    CASE
      WHEN role = 'user' THEN 'member'
      ELSE 'user'
    END
  WHERE id = $1
`,
    [id]
  );
}
