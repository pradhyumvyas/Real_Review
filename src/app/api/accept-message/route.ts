import { getServerSession } from "next-auth";
import {authOptions} from "../auth/[...nextauth]/options"
import dbConnect from "@/lib/dbConnect"
import UserModel from "@/model/User.model";
import {User} from "next-auth";

export async function POST(request:Request){
   await dbConnect();

   const session = await getServerSession({req:request, ...authOptions});

   const user:User = session?.user as User;

   if(!session || !session?.user){
      return {
         status:401,
         body:{
            error:"Unauthorized"
         }
      }
   }

   const userId = user._id;
   const {acceptMessage} = await request.json();

   try {
      const updatedUser = await UserModel.findByIdAndUpdate(
         userId,
         {
            isAcceptingMessages:acceptMessage
         },
         {
            new:true
         }
      )

      if(!updatedUser){
         return Response.json({
            success:false,
            message:"User not found"
         },
      {
         status:404
      })
      }
      
      return Response.json({
         success:true,
         message:"User updated successfully",
         data:updatedUser
      },
      {
         status:200
      })
      
   } catch (error) {
      console.log("Failed to update  ",error);
      return Response.json({
         success:false,
         message:"Failed to update user"
      },
      {
         status:500
      })
      
   }
}


export async function GET(request:Request){
   await dbConnect();

   const session = await getServerSession({req:request, ...authOptions});

   const user:User = session?.user as User;

   if(!session || !session?.user){
      return {
         status:401,
         body:{
            error:"Unauthorized"
         }
      }
   }

   const userId = user._id;

   try {
      const user = await UserModel.findById(userId);

      if(!user){
         return Response.json({
            success:false,
            message:"User not found"
         },
      {
         status:404
      })
      }
      
      return Response.json({
         success:true,
         message:"User found",
         isAcceptingMessages:user.isAcceptingMessage
      },
      {
         status:200
      })
      
   } catch (error) {
      console.log("Failed to fetch user ",error);
      return Response.json({
         success:false,
         message:"Failed to fetch user"
      },
      {
         status:500
      })
      
   }
}