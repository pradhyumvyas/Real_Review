import { sendVerificationEmail } from "@/helpers/sendVerificationEmails";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import becrypt from "bcryptjs";

export async function POST(request:Request){
   await dbConnect();

   try{
      const {username, email,password} = await request.json()
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