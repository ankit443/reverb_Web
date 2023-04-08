import express from "express";

import {
    getUser,
    getUserFriends,
    addRemoveFriend,
} from "../controllers/users.js";

import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//reading
router.get("/:id", verifyToken, getUser); //since we created the route with users in our index.js file, this route will be something such as users/some ID, it's a part of the query strings from the front
router.get("/:id/friends", verifyToken, getUserFriends); //the above part was user and this is for the users friends

//Updating

router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router 

