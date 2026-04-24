import path from "path";
import { fileURLToPath } from "url";

import express from "express";
import session from "express-session";
import pgSession from "connect-pg-simple";

import passport from "passport";
import "./passport.js";

import pool from "./db/pool.js";
import router from "./router.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

const PgSession = pgSession(session);

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    store: new PgSession({ pool }),
    secret: "cats",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 14 * 24 * 60 * 60 * 1000 }, // 14 days = 2 weeks
  })
);
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use("/", router);

//404 route
app.use((req, res) => {
  res.status(404).send("Page not found.");
});

//Error route
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Server error.");
});

//Server start
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
