import { User } from "../models/User.js";
import axios from "axios";

async function updateLeetcodeRating() {
    try {
        const users = await User.find();
        for (const user of users){
            const leetcode = user.leetcode;
            const response = await axios.get(`https://leetcodestats.cyclic.app/${leetcode}`)
            if (response.data.status === "success"){
                const leetRating = response.data.ranking || 0;
                await User.updateOne({_id: user._id},{leetRating: leetRating})
            }else{
                console.error(`Error fetching Leetcode rating for ${leetcode}: ${response.data.comment}`);
            }
        }
        console.log('Leetcode ratings updated successfully');
    } catch (error) {
        console.error('Error updating Leetcode ratings:', error.message);
    }
}

export default updateLeetcodeRating;