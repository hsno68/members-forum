import { Router } from "express";
import { getHomepage, getSignup, getLogin, createUser, loginUser, logout } from "./controller.js";

const router = Router();

router.get("/", getHomepage);
router.get("/signup", getSignup);
router.get("/login", getLogin);
router.get("/logout", logout);

router.post("/signup", createUser);
router.post("/login", loginUser);

export default router;
