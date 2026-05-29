import { Router } from "express";
import {
  getHomepage,
  getSignup,
  getSignin,
  getNewPost,
  createUser,
  createPost,
  getUserPosts,
  getSinglePost,
  updatePost,
  signinUser,
  signout,
  requireAuth,
  redirectIfAuth,
  updateRole,
  deletePost,
} from "./controller.js";

const router = Router();

router.get("/{homepage}", getHomepage);
router.get("/signup", getSignup);
router.get("/signin", redirectIfAuth, getSignin);
router.get("/new-post", requireAuth, getNewPost);
router.get("/my/posts", requireAuth, getUserPosts);
router.get("/my/posts/:id", requireAuth, getSinglePost);
router.get("/signout", signout);

router.post("/signup", createUser);
router.post("/signin", signinUser);
router.post("/new-post", requireAuth, createPost);
router.post("/my/posts/:id", requireAuth, updatePost);
router.post("/role", requireAuth, updateRole);

router.delete("/posts/:id", deletePost);

export default router;
