import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import profileRoute from "./routes/profileRoute.js"
import updateCodeforcesRating from "./controllers/codeforcesRating.js"
import updateCodechefRating from "./controllers/codechefRating.js";
import updateLeetcodeRating from "./controllers/leetcodeRating.js";
import boardRoute from "./routes/boardRoute.js";
import userRoute from "./routes/userRoute.js";
import { protect } from "./protect.js";


dotenv.config();
const app = express();
const PORT = process.env.PORT 
const mongoDB = process.env.MONGODB_URI
const message = process.env.MESSAGE
const updateCodeforcesPeriodically = async () => {
    await updateCodeforcesRating();
};
const updateCodechefPeriodically = async () => {
    await updateCodechefRating();
};
const updateLeetcodePeriodically = async () => {
    await updateLeetcodeRating();
};

updateCodeforcesPeriodically
updateCodechefPeriodically
setInterval(updateCodeforcesPeriodically, 1000 * 60 * 60 * 24);
setInterval(updateCodechefPeriodically, 1000 * 60 * 60 * 24);
setInterval(updateLeetcodePeriodically,1000 * 60 * 60 * 24);


app.use(express.json());

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:8000','https://code-hub-808r.onrender.com','https://codehub-zqh6.onrender.com','https://code-hub-5.onrender.com/' ,'https://codehub-zqh6.onrender.com' ,'https://code-hub-808r.onrender.com'],
    credentials: true, 
  }));

app.use(cookieParser());

app.get("/",(req,res)=>{
    res.status(235).send(message)
})

app.use("/profile",profileRoute)
app.use("/board",boardRoute)
app.use("/user",protect,userRoute)

mongoose.connect(mongoDB)
    .then(()=>{
        console.log("App is connected to mongoose")
        app.listen(PORT, () =>{
            console.log(`Listening to port ${PORT}`)
        })
    })
    .catch((error)=>{
        console.log(error)
    })