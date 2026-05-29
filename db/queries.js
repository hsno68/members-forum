import pool from "./pool.js";

export async function getUsers() {
  const { rows } = await pool.query("SELECT username FROM users");
  return rows;
}

export async function getPosts(sort) {
  const sortMap = {
    "timestamp-oldest": "timestamp ASC",
    "timestamp-newest": "timestamp DESC",
  };

  const sortBy = sortMap[sort] || "timestamp DESC";

  const { rows } = await pool.query(
    `SELECT posts.id, title, body, timestamp, username FROM posts JOIN users ON posts.user_id = users.id ORDER BY ${sortBy}`
  );
  return rows;
}

export async function getUserPosts({ id, sort }) {
  const sortMap = {
    "timestamp-oldest": "timestamp ASC",
    "timestamp-newest": "timestamp DESC",
  };

  const sortBy = sortMap[sort] || "timestamp DESC";

  const { rows } = await pool.query(
    `SELECT posts.id, title, body, timestamp FROM posts JOIN users ON posts.user_id = users.id WHERE users.id = $1 ORDER BY ${sortBy}`,
    [id]
  );
  return rows;
}

export async function getSinglePost({ postId, userId }) {
  const { rows } = await pool.query(
    "SELECT id, title, body FROM posts WHERE id = $1 AND user_id = $2",
    [postId, userId]
  );
  return rows[0];
}

export async function updatePost({ id, title, body }) {
  await pool.query("UPDATE posts SET title = $1, body = $2 WHERE id = $3", [title, body, id]);
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

export async function createPost({ title, body, user_id }) {
  await pool.query("INSERT INTO posts (title, body, user_id) VALUES ($1, $2, $3)", [
    title,
    body,
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

export async function deletePost(id) {
  await pool.query("DELETE FROM posts WHERE id = $1", [id]);
}
