import * as db from "./db/queries.js";
import bcrypt from "bcryptjs";

export function getHomepage(req, res) {
  res.render("layout", { title: "Home", page: "pages/homepage", css: null });
}

export function getSignup(req, res) {
  res.render("layout", { title: "Sign Up", page: "pages/signup", css: "/css/form.css" });
}

export function getLogin(req, res) {
  res.render("layout", { title: "Log In", page: "pages/login", css: "/css/form.css" });
}
