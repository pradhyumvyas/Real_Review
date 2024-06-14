import { getServerSession } from "next-auth";
import {authOptions} from "../auth/[...nextauth]/options"
import dbConnect from "@/lib/dbConnect"
import UserModel from "@/model/User.model";
import {User} from "next-auth";
import {Message} from "@/model/User.model";



export async function POST(request:Request){
   await dbConnect();

   // const session = await getServerSession({req:request, ...authOptions});
   // const user:User = session?.user as User;

   // if(!user || !session?.user){
   //    return Response.json({
   //       success:false,
   //       message:"Unauthorized"
   //    },
   // {
   //    status:401
   // })
   // }

   const {username, content} = await request.json();

   try{
      const user = await UserModel.findOne({username:username});
      if(!user){
         return Response.json({
            success:false,
            message:"User not found"
         },
         {
            status:404
         })
      }

      if(!user.isAcceptingMessage){
         return Response.json({
            success:false,
            message:"User is not accepting message"
         },
         {
            status:403
         })
      }
      const newMessage = {
         content:content,
         createdAt:new Date()
      }
      user.messages.push(newMessage as Message);
      await user.save();

      return Response.json({
         success:true,
         message:"Message sent successfully"
      },
      {
         status:200
      }
   )

   }catch(err){
      return Response.json({
         success:false,
         message:"Failed to send message"
      },{
         status:500
      })
   }
}