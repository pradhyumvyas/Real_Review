import dbConnect from "@/lib/dbConnect";
import UserModel,{ User, MessageSchema } from "@/model/User.model";
import {authOptions} from "../auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";
import mongoose from "mongoose";


export async function DELETE(request:Request){
   await dbConnect();

   const session = await getServerSession({req:request, ...authOptions});

   const user = session?.user as User;

   if(!session || !user){
      return Response.json({
         success:false,
         message:"Unauthorized"
      },{
         status:401
      })
   }

   let {reviewId} = await request.json();
   // reviewId = new mongoose.Types.ObjectId(reviewId);
   console.log("reviewId", reviewId);
   try {
      const getUserDetails = await UserModel.findOne({_id:user._id});
      console.log("getUserDetails", getUserDetails);
      
      if(!getUserDetails){
         return Response.json({
            success:false,
            message:"User not found"
         },{
            status:404
         })
      }
      console.log("idddd",getUserDetails.messages[1]._id === reviewId, getUserDetails.messages[1]._id.toString());
      
      getUserDetails.messages = getUserDetails.messages.filter((review) => review._id.toString() !== reviewId);
      // let a = getUserDetails.messages.filter((review) => review._id == reviewId);
      console.log("getUserDetailaaaaaas", getUserDetails);

      getUserDetails.save();

      return Response.json({
         success:true,
         message:"Review deleted successfully"
      },{
         status:200
      })

   } catch (error) {
      return Response.json({
         success:false,
         message:"Something went wrong"
      },{
         status:500
      })
   }

}