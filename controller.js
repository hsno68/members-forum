import * as db from "./db/queries.js";
import passport from "passport";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

export async function getHomepage(req, res) {
  const users = await db.getUsers();
  const messages = await db.getMessages();

  res.render("layout", {
    title: "Home",
    page: "pages/homepage",
    css: "/css/homepage.css",
    users,
    messages,
    user: req.user,
  });
}

export function getSignup(req, res) {
  res.render("layout", { title: "Sign Up", page: "pages/signup", css: "/css/form.css" });
}

export function getSignin(req, res) {
  res.render("layout", { title: "Sign In", page: "pages/signin", css: "/css/form.css" });
}

export function getNewMessage(req, res) {
  res.render("layout", { title: "New Mesage", page: "pages/new-message", css: "/css/form.css" });
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

export async function createMessage(req, res) {
  const { title, message } = req.body;
  const { id } = req.user;
  const safeTitle = title?.trim() ? title.trim() : "Untitled";

  await db.createMessage({
    title: safeTitle,
    message,
    user_id: id,
  });
  res.redirect("/");
}

export async function updateMembership(req, res) {
  const password = req.body.password;
  const { id } = req.user;

  if (!password) {
    return res.status(400).json({ error: "Password required." });
  }

  if (password !== process.env.SECRET) {
    return res.status(403).json({ error: "Invalid password." });
  }

  await db.updateMembershipStatus({ id });
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
