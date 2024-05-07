import express from "express";
import multer from "multer"
import {main, signup, signup_controller, uplaoders_panel, user_controller } from "../Controller/admin_Controller.js";
import uploadModel from "../DB/models/upload_model.js";

const upload_router=express.Router()
const st=multer.memoryStorage()
  
const upload = multer({ storage: st })

upload_router.get("/signup",signup)
upload_router.post("/signup",signup_controller)
upload_router.get("/login",(req,res) =>{
    res.render("login")
})
upload_router.post("/login",user_controller)

upload_router.get("/",uplaoders_panel)

upload_router.post('/',upload.array('file', 12),async(req, res, next) =>{
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
    const {title,category,discription}=req.body
    const {file}=req.files
        console.log(req.files);  
        console.log(req.body);
        const buffers=req.files.map(item=>{
          return item.buffer
        })
        const cont=req.files.map(item=>{
          return item.mimetype
        })
        const pic = new uploadModel({
            files:buffers,
            contanType:cont,
            title:title,
            category:category,
            discription:discription
            
        })
        // console.log("fsgsdffhgh--------------------------------------",pic);
        await pic.save()
        res.redirect("/")
  })
  upload_router.get("/gallery",main)
  upload_router.get("/category",(req,res)=>{
    res.render("category")
  })
export default upload_router