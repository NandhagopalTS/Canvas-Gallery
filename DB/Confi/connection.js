import mongoose from "mongoose";

export const connectDB=()=>{
    mongoose.connect(process.env.CONNECTION_STRING,{dbName:"gallery"}).then(()=>{
        console.log("DB connected");
    }).catch((err)=>{
        console.log(err);
    })

}