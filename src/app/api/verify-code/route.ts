import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";


export async function POST(request:Request){
   await dbConnect()

   try{
      const {username,code} = await request.json()

      const decodedVersion = decodeURIComponent(username)
      const user = await UserModel.findOne({
         username:decodedVersion
      })

      if(!user){
         return Response.json({
            success:false,
            message:"User not found"
         },{
            status:400
         })
      }

      const isCodeValid = user.verifyCode === code
      const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date()

      if(isCodeValid && isCodeNotExpired){
         user.isVerified = true

         await user.save()

         return Response.json({
            success:true,
            message:"Account Verified Successfully"
         },{
            status:200
         })
      }else if(!isCodeNotExpired){
         return Response.json({
            success:false,
            message:"Verification code is expired, Please sign in again"
         },{
            status:400
         })
      }else{
         return Response.json({
            success:false,
            message:"Incorect code"
         },{
            status:400
         })
      }

   }catch(error){
      return Response.json({
         success:false,
         message:"Error while verifying user"
      },{
         status:500
      })
      
   }
}