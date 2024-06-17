"use client"

import {zodResolver} from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from 'zod';
import Link from 'next/link'
import { useEffect, useState } from "react";
import { useDebounceCallback } from 'usehooks-ts'
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation";
import { signInSchema } from "@/schemas/signInSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { Form, FormField, FormItem, FormDescription, FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { log } from "util";


function SignIn() {

  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()


  //zod Implementation
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: '',
    }
  })



  const onSubmit = async (data:z.infer<typeof signInSchema>) =>{
    setIsSubmitting(true)
    console.log("onSubmit data", data);
    
    try {
      const response = await signIn('credentials', {
        redirect: false,
        identifier: data.identifier,
        password: data.password
      })

      console.log("response", response);

      if(response?.error){
        if(response.error == 'CredentialsSignin') {
          toast({
            title: 'Sign in failed',
            description: "Invalid email or password",
            variant: 'destructive'
          })
        }
        toast({
          title: 'Sign in failed',
          description: response.error,
          variant: 'destructive'
        })
      }else if(response?.url){
        router.replace('/dashboard')
      }

    } catch (error) {
      console.log("Error  while sign in");
      toast({
        title: 'Signin failed',
        description: 'An error occurred while signing in',
        variant: 'destructive'
      })
      
    }finally{
      setIsSubmitting(false)
    }
  }

  return (
    <div className = "flex justify-center items-center bg-slate-600 min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-black">Join Real Reviews</h1>
          <p className="text-black">
            Sign in to start your anonymous adventure
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email/Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Email or username" 
                    {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Enter your Email or Username
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" type="password" 
                    {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Enter your password
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <>
                  <Loader2 /> Please wait...
                </>) 
                : 'Sign in'}
              </Button>
            
          </form>
        </Form>
        <div className="text-center mt-4">
          <Link href="/sign-up">
          Don't have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignIn