import { Router } from "express";
import {
  getHomepage,
  getSignup,
  getSignin,
  getNewMessage,
  createUser,
  createMessage,
  getUserMessages,
  signinUser,
  signout,
  requireAuth,
  redirectIfAuth,
  updateRole,
  deleteMessage,
} from "./controller.js";

const router = Router();

router.get("/", getHomepage);
router.get("/signup", getSignup);
router.get("/signin", redirectIfAuth, getSignin);
router.get("/new-message", requireAuth, getNewMessage);
router.get("/my/messages", requireAuth, getUserMessages);
router.get("/signout", signout);

router.post("/signup", createUser);
router.post("/signin", signinUser);
router.post("/new-message", createMessage);
router.post("/role", requireAuth, updateRole);

router.delete("/messages/:id", deleteMessage);

export default router;
