import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
  name:String,
  email:String,
  password:String,
  age:Number
},{
  timestamps:true
})
const uploadSchema=new mongoose.Schema({
    files:[Buffer],
  contanType:[String],
  title:String,
  category:String,
  discription:String
},{
    timestamps:true
})
const uploadModel=mongoose.model("images",uploadSchema)
export const userModel=mongoose.model("user",userSchema)
export default uploadModel
