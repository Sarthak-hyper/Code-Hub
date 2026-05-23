import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true,"Please enter an Email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail,"Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true,"Please enter a Password"], 
        minlength: [6,"Password length should be 6 characters"]
    },
    name : {type:String, required: true},
    codeforces : {type:String, required: true},
    codechef : {type:String, required: true},
    leetcode : {type:String, required: true},
    college : {type:String, required: true},
    forcesRating : {type:Number},
    chefRating : {type:Number},
    leetRating : {type:Number},
  })

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next();
})

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect email');
  };

export const User = mongoose.model('user',userSchema);