import * as db from "./db/queries.js";
import bcrypt from "bcryptjs";

export function getHomepage(req, res) {
  res.render("layout", { title: "Home", page: "pages/homepage", css: "/css/homepage.css" });
}

export function getSignup(req, res) {
  res.render("layout", { title: "Signup", page: "pages/signup", css: "/css/form.css" });
}
