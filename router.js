import { Router } from "express";
import {
  getHomepage,
  getSignup,
  getSignin,
  createUser,
  signinUser,
  signout,
} from "./controller.js";

const router = Router();

router.get("/", getHomepage);
router.get("/signup", getSignup);
router.get("/signin", getSignin);
router.get("/signout", signout);

router.post("/signup", createUser);
router.post("/signin", signinUser);

export default router;
