import express from "express";
// import {getLeetcode,getCodechef,getCodeforces} from "../controllers/leaderboard.js"
import { User } from "../models/User.js";

const router = express.Router();

router.get("/codeforces", async (req,res)=>{
    try {
        const users = await User.find().sort({forcesRating: -1})
        res.json(users)
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error")
    }
})

router.get("/codechef", async (req,res)=>{
    try {
        const users = await User.find().sort({chefRating: "desc"})
        res.json(users)
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error")
    }
})

router.get("/leetcode", async (req,res)=>{
    try {
        const users = await User.find().sort({leetRating: 1})
        res.json(users)
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error")
    }
})

export default router;