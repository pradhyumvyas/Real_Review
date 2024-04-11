import {resend} from '@/lib/resend';

import VerificationEmail from '../../emails/VerificationEmail';

import { ApiResponse } from '@/types/ApiResponse';

export async function sendVerificationEmail(
   email:string,
   username:string,
   verifyCode:string
):Promise<ApiResponse>{
   try{
      await resend.emails.send({
         from: 'onboarding@resend.dev',
         to: email,
         subject: 'Real Review | Verification Code',
         react: VerificationEmail({username,otp:verifyCode}),
       });

      return {
         sucess:true,
         message:'Verification email sent'
      
      }
   }catch(err){
      console.log("Error while sending verification email",err)
      return {
         sucess:false,
         message:'Failed to send verfication email'
      }
   }
}