import { User } from "../models/User.js";
import axios from "axios";

async function updateCodeforcesRating() {
    try {
        const users = await User.find();
        console.log(users)
        for (const user of users){
            const codeforces = user.codeforces;
            const response = await axios.get(`https://codeforces.com/api/user.info?handles=${codeforces}`)
            if (response.data.status === "OK"){
                const forcesRating = response.data.result[0].rating || 0;
                await User.updateOne({_id: user._id},{forcesRating: forcesRating})
            }else{
                console.error(`Error fetching Codeforces rating for ${codeforces}: ${response.data.comment}`);
            }
        }
        console.log('Codeforces ratings updated successfully');
    } catch (error) {
        console.error('Error updating Codeforces ratings:', error.message);
    }
}

export default updateCodeforcesRating;