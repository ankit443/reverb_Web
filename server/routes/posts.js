import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";


const router = express.Router();


//reading

router.get("/", verifyToken, getFeedPosts);//for all
router.get("/:userId/posts", verifyToken, getUserPosts); //only to take relevant user's post on his/her page



//updating

router.patch("/:id/like", verifyToken, likePost);

export default

