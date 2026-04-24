import { Router } from "express";
import { getHomepage, getSignup, getLogin } from "./controller.js";

const router = Router();

router.get("/", getHomepage);
router.get("/signup", getSignup);
router.get("/login", getLogin);

router.post("/signup", (req, res) => {
  res.send(req.body);
});
router.post("/login", (req, res) => {
  res.send(req.body);
});

export default router;
