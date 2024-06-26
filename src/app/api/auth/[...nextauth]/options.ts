import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import InstagramProvider from "next-auth/providers/instagram";

import bcrypt from "bcryptjs"
import dbConnect from "@/lib/dbConnect"
import User from "@/model/User.model"

export const authOptions:NextAuthOptions = {
   providers:[
      CredentialsProvider({
         id:'credentials',
         name:"credentials",
         credentials:{
            email:{label:"Email",type:"text"},
            password:{label:"Password",type:"password"}
         },
         async authorize(credentials:any):Promise<any>{
            await dbConnect()
            console.log("credentials", credentials)
            try {
               const user = await User
                  .findOne({
                     $or:[
                        {email:credentials.identifier},
                        {username:credentials.identifier}
                     ]
                  })
               if(!user) {
                  throw new Error("No user found")
               }
               if(!user.isVerified){
                  throw new Error("User is not verified")
               }

               const isPasswordCorrect = await bcrypt.compare(credentials.password,user.password);
               if(isPasswordCorrect){
                  return user
               }else{
                  throw new Error("Password is incorrect")
               }

            } catch (err:any) {
               throw new Error(err)
            }
         }
      }),
      InstagramProvider({
         clientId:process.env.INSTAGRAM_CLIENT_ID,
         clientSecret:process.env.INSTAGRAM_CLIENT_SECRET
      }),
      GoogleProvider({
         clientId:process.env.GOOGLE_CLIENT_ID as string || '',
         clientSecret:process.env.GOOGLE_CLIENT_SECRET as string || ''
      }),
   ],
   callbacks:{
      async session({ session, token }) {
         if(token){
            session.user._id = token._id?.toString(),
            session.user.isVerified = token.isVerified,
            session.user.isAcceptingMessages = token.isAcceptingMessages,
            session.user.username = token.username
         }
         return session
       },
       async jwt({ token, user }) {
         if(user){
            token._id = user._id?.toString(),
            token.isVerified = user.isVerified,
            token.isAcceptingMessages = user.isAcceptingMessages,
            token.username = user.username
         }
         return token
       }
   },
   pages:{
      signIn:'/sign-in'
   },
   session:{
      strategy:'jwt',
   },
   secret:process.env.NEXTAUTH_SECRET_KEY,
}


