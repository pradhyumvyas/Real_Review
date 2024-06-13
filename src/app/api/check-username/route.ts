import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { usernameValidation } from "@/schemas/signUpSchema";
import {z} from 'zod'

const UsernameQuerSchema = z.object({
   username:usernameValidation
})

export async function GET(request:Request){
   console.log("request", request);

   if(request.method !== 'GET'){
      return Response.json({
         success:false,
         message:"Request method is not allowed"
      },{
         status:405
      })
   }

   await dbConnect()

   try{
      const {searchParams} = new URL(request.url)
      const queryParam = {
         username:searchParams.get('username')
      }

      //Validate with zod

      const result = UsernameQuerSchema.safeParse(queryParam)

      console.log("username validatio result", result);
      if(!result.success){
         const usernameError = result.error.format().username?._errors || []

         return Response.json({
            success:false,
            message: usernameError
         },{
            status:400
         })
      }

      const {username} = result.data
      console.log("Username result data", result);

      const existingVerifiedUser = await UserModel.findOne({
         username, isVerified:true
      })
      if(existingVerifiedUser){
         return Response.json({
            success:false,
            message:'username is already taken'
         }, {
            status:400
         })
      }
      return Response.json({
         success:true,
         message:'username available'
      }, {
         status:400
      })
   }catch(error){
      console.log("Error while checking username", error);
      return Response.json({
         success:false,
         message:"Error while checking username"
      },{
         status:500
      })
      
   }
}