import * as db from "./db/queries.js";
import bcrypt from "bcryptjs";

export async function getHomepage(req, res) {
  const users = await db.getUsers();
  res.render("layout", { title: "Home", page: "pages/homepage", css: "/css/homepage.css", users });
}

export function getSignup(req, res) {
  res.render("layout", { title: "Sign Up", page: "pages/signup", css: "/css/form.css" });
}

export function getLogin(req, res) {
  res.render("layout", { title: "Log In", page: "pages/login", css: "/css/form.css" });
}

export async function createUser(req, res) {
  const { first_name, last_name, username, password, membership_status } = req.body;
  const membership = !!membership_status;
  const hashedPassword = await bcrypt.hash(password, 10);

  await db.createUser({ first_name, last_name, username, hashedPassword, membership });
  res.redirect("/");
}

export async function loginUser(req, res) {
  res.send(req.body);
}
