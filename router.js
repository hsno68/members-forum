import { Router } from "express";
import { getHomepage, getSignup } from "./controller.js";

const router = Router();

router.get("/", getHomepage);
router.get("/signup", getSignup);

export default router;
