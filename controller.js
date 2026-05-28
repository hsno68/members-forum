import * as db from "./db/queries.js";
import passport from "passport";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

export async function getHomepage(req, res) {
  const users = await db.getUsers();
  const posts = await db.getPosts();

  res.render("layout", {
    title: "Home",
    page: "pages/homepage",
    css: "/css/homepage.css",
    users,
    posts,
    user: req.user,
  });
}

export function getSignup(req, res) {
  res.render("layout", { title: "Sign Up", page: "pages/signup", css: "/css/form.css" });
}

export function getSignin(req, res) {
  res.render("layout", { title: "Sign In", page: "pages/signin", css: "/css/form.css" });
}

export function getNewPost(req, res) {
  res.render("layout", {
    title: "New Post",
    page: "pages/new-post",
    css: "/css/form.css",
    user: req.user,
  });
}

export async function createUser(req, res) {
  const { first_name, last_name, username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  await db.createUser({
    first_name,
    last_name,
    username,
    hashedPassword,
    membership_status: false,
  });
  res.redirect("/");
}

export async function createPost(req, res) {
  const { title, body } = req.body;
  const { id } = req.user;
  const safeTitle = title?.trim() ? title.trim() : "Untitled";

  await db.createPost({
    title: safeTitle,
    body,
    user_id: id,
  });
  res.redirect("/my/posts");
}

export async function getUserPosts(req, res) {
  const { id } = req.user;

  const posts = await db.getUserPosts(id);
  res.render("layout", {
    title: "My Posts",
    page: "pages/user-posts",
    css: "/css/user-posts.css",
    user: req.user,
    posts,
  });
}

export async function getSinglePost(req, res) {
  const { id: userId } = req.user;
  const { id: postId } = req.params;

  const post = await db.getSinglePost({ postId, userId });

  if (!post) {
    res.redirect("/");
  }

  res.render("layout", {
    title: "Edit Post",
    page: "pages/edit-post",
    css: "/css/form.css",
    user: req.user,
    post,
  });
}

export async function updatePost(req, res) {
  const { title, body } = req.body;
  const { id } = req.params;

  await db.updatePost({ id, title, body });
  res.redirect("/my/posts");
}

export async function updateRole(req, res) {
  const { password, submitter } = req.body;
  const { id } = req.user;

  if (!password) {
    return res.status(400).json({ error: "Password required." });
  }

  if (
    (submitter === "joinMember" || submitter === "leaveMember") &&
    password !== process.env.SECRET
  ) {
    return res.status(403).json({ error: "Invalid member password." });
  } else if (
    (submitter === "joinAdmin" || submitter === "leaveAdmin") &&
    password !== process.env.ADMIN_SECRET
  ) {
    return res.status(403).json({ error: "Invalid admin password." });
  }

  await db.updateRole({ id, submitter });
  res.sendStatus(200);
}

export async function deletePost(req, res) {
  const { id } = req.params;

  await db.deletePost(id);
  res.sendStatus(200);
}

export function requireAuth(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

export function redirectIfAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

export function signinUser(req, res, next) {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })(req, res, next);
}

export function signout(req, res, next) {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
}
