import { User } from "../models/User.js";
import axios from "axios";
import cheerio from "cheerio"; // for web scraping

async function updateCodechefRating() {
    try {
       
        const users = await User.find();
        
        console.log("hello")
        for (const user of users){
            const codechef = user.codechef;
            
            
            const url = `https://www.codechef.com/users/${codechef}`;
            
            
            const response = await axios.get(url);
            const html = response.data;
            
           
            const $ = cheerio.load(html);
            
            
            const ratingElement = $(".rating-number").first(); 
            const chefRating = parseInt(ratingElement.text().trim()); 
            
            
            await User.updateOne({_id: user._id}, {chefRating: chefRating});
        }
        
        console.log('Codechef ratings updated successfully');
    } catch (error) {
        console.error('Error updating Codechef ratings:', error.message);
    }
}

export default updateCodechefRating;
