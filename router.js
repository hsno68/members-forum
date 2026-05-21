import { Router } from "express";
import {
  getHomepage,
  getSignup,
  getSignin,
  getNewMessage,
  createUser,
  createMessage,
  signinUser,
  signout,
  requireAuth,
  redirectIfAuth,
  updateRole,
} from "./controller.js";

const router = Router();

router.get("/", getHomepage);
router.get("/signup", getSignup);
router.get("/signin", redirectIfAuth, getSignin);
router.get("/new-message", requireAuth, getNewMessage);
router.get("/signout", signout);

router.post("/signup", createUser);
router.post("/signin", signinUser);
router.post("/new-message", createMessage);
router.post("/role", requireAuth, updateRole);

export default router;
