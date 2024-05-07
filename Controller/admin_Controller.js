import uploadModel, { userModel } from "../DB/models/upload_model.js";
import bcrypt from "bcrypt"

////////////////////////////////////////////////////

export const signup = (req, res) => {
  res.render("signup")
}
export const signup_controller = async (req, res) => {
  const { name, email, password, age } = req.body
  //-----------------------------------------------------------
  if (!name || !password || !email || !age) {
      return res.status(400).json({
          success: false,
          message: "Fill all the fields "
      })

  }
  const existing_user = await userModel.findOne({ email })
  if (existing_user) {
      return res.status(200).json({
          success: false,
          message: "admin already exities,login"
      })
  }
  //--------------------------------------------------------
  const encrypted_password = bcrypt.hashSync(password, 10)
  const user = new userModel({
      name,
      email,
      password: encrypted_password,
      age
  })
  await user.save()

  res.redirect("/login")
}

export const user_controller = async (req, res) => {
  const { email, password } = req.body



  const user = await userModel.findOne({ email })
  if (user && (bcrypt.compareSync(password, user.password))) {
      res.redirect("/gallery")
  }
  else {
      res.status(200).json({
          messsage: "no such user"
      })
  }
}


///////////////////////////////////////////////////////////
export const uplaoders_panel= async(req,res)=>{
  const images=await uploadModel.find()

  // console.log("ffffffffffffffffffffffffffffffffffffff",images);
 if (images&&images.length!=0){
  const updatedImages=images.map(item=>{
    return {
        title:item.title,
        category:item.category,
        discription:item.discription,
      contentType:item.contanType,
      files:item.files.map((img)=>{
        return {
          file:Buffer.from(img).toString('base64'),
        }
      })
    }
  })
  // console.log("dkghgdtkydtgg",updatedImages[0].files[0]);
  res.render("main",{updatedImages})
 }
 else{
  res.render("main")
 }
}


export const main= async(req,res)=>{
    const images=await uploadModel.find()

    // console.log("gggggggggggggggggggggggggggggggggggg",images);
   if (images&&images.length!=0){
    const updatedImages=images.map(item=>{
      return {
        title:item.title,
        category:item.category,
        discription:item.discription,
        contentType:item.contanType,
        files:item.files.map((img)=>{
          return {
            file:Buffer.from(img).toString('base64'),
          }
        })
      }
    })
    // console.log("xfgzgfvjkcfkcgck",updatedImages[0].files[0]);
    res.render("Images",{updatedImages})
   }
   else{
    res.render("Images")
   }
}
