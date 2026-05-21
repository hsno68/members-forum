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

export async function updateRole({ id, submitter }) {
  const rolesMap = {
    joinMember: "member",
    leaveMember: "user",
    joinAdmin: "admin",
    leaveAdmin: "member",
  };

  const role = rolesMap[submitter];

  await pool.query("UPDATE users SET role = $1 WHERE id = $2", [role, id]);
}
