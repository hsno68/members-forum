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
const PORT = process.env.PORT || 3000;

const PgSession = pgSession(session);

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    store: new PgSession({
      pool,
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET || "cats",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 14 * 24 * 60 * 60 * 1000 },
  })
);
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use("/", router);

//404 route
app.use((req, res, next) => {
  const err = new Error("Page not found");
  err.status = 404;
  next(err);
});

//Error route
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  const message = err.message || "Server error";

  res.status(status).render("layout", {
    title: "Error Page",
    page: "pages/error",
    css: null,
    error: { status, message },
  });
});

//Server start
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
