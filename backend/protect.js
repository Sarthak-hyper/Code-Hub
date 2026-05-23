import {promisify} from 'util';
import jwt from 'jsonwebtoken';
import { User } from './models/User.js';
import * as dotenv from 'dotenv';

dotenv.config();

export async function protect (req, res, next) {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
  
    if (!token) {
      return res.status(401).send("You are not logged in! Please log in to get access.");
    }
  
    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.SECRET_KEY_JWT);
    // console.log(decoded);
  
    // 3) Checking if user still exists
    const currentUser = await User.findById(decoded.id);
  
    if (!currentUser) {
      return res.status(401).send("User does not exist!");
    }
  
    // 4) Checking if user changed his password after JWT was issued
    
  
    // Grant access
    req.user = currentUser;
    next();
  }