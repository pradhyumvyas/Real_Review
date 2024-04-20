import { sendVerificationEmail } from "@/helpers/sendVerificationEmails";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import User from "@/model/User.model";
import becrypt from "bcryptjs";

export async function POST(request:Request){
   await dbConnect();

   try{
      const {username, email,password} = await request.json()
      console.log("User",User)
      const existingUserVerifiedByUsername = await UserModel.findOne({
         username,
         isVerified:true
      })

      if(existingUserVerifiedByUsername){
         return Response.json({
            status:400,
            body:{
               success:false,
               message:"Username already exists"
            }
         })
      }

      const existingUserVerifiedByEmail = await UserModel.findOne({email})

      const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()
      if(existingUserVerifiedByEmail){
         if(existingUserVerifiedByEmail.isVerified){
            return Response.json({
               status:400,
               body:{
                  success:false,
                  message:"Email already exists"
               }
            })
         }else{
            const hasedPassword = await becrypt.hash(password,10)
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours()+1)
            existingUserVerifiedByEmail.password = hasedPassword;
            existingUserVerifiedByEmail.verifyCode = verifyCode;
            existingUserVerifiedByEmail.verifyCodeExpiry = expiryDate;
            await existingUserVerifiedByEmail.save()
         }
         return Response.json({
            status:400,
            body:{
               success:false,
               message:"Email already exists"
            }
         })
      }else{
         const hasedPassword = await becrypt.hash(password,10)
         const expiryDate = new Date()
         expiryDate.setHours(expiryDate.getHours()+1)

         const newUser = new UserModel({
            username,
            email,
            password: hasedPassword,
            verifyCode: verifyCode,
            verifyCodeExpiry: expiryDate,
            isVerified: false,
            isAcceptingMessage: true,
            messages: []
         })
         await newUser.save()
      }
      const emailResponse:any = await sendVerificationEmail(email,username,verifyCode)

      if(!emailResponse.success){
         return Response.json({
            status:500,
            body:{
               success:false,
               message:emailResponse.message
            }
         })
      }
      return Response.json({
         status:201,
         body:{
            success:false,
            message:"User Registered Suucesfully, and please verify your email address to login"
         }
      })
   }catch(err){
      console.log("Error while signing up",err)
      return Response.json({
         status:500,
         body:{
            success:false,
            message:"Internal server error while signing up"
         }
      })
   }
}