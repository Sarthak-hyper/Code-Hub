import { User } from "../models/User.js";
import asyncHandler from "express-async-handler";



export  const getCodeforces = asyncHandler (async (req, res) => {
    const leaderboard1 = await User.find().sort({forcesRating : 'desc'});
    res.status(200).json(leaderboard1);
});

export const getCodechef = asyncHandler (async (req, res) => {
    const leaderboard2 = await User.find().sort({chefRating : 'desc'});
    res.status(200).json(leaderboard2);
});
export const getLeetcode = asyncHandler (async (req, res) => {
    const leaderboard3 = await User.find().sort({leetRating : 'desc'});
    res.status(200).json(leaderboard3);
});

// export default getLeetcode
// export default getCodechef
// export default getCodeforces