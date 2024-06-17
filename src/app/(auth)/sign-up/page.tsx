"use client"

import {zodResolver} from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from 'zod';
import Link from 'next/link'
import { useEffect, useState } from "react";
import { useDebounceCallback } from 'usehooks-ts'
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUpSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { Form, FormField, FormItem, FormDescription, FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";


function page() {
  const [username, setUsername] = useState('')
  const [usernameMessage, setUsernameMessage] = useState('')  
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)

  const [isSubmitting, setIsSubmitting] = useState(false)

  const debounceUsername = useDebounceCallback(setUsername,300)
  const { toast } = useToast()
  const router = useRouter()


  //zod Implementation
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    }
  })

  const checkUsername = async () =>{
    if(username){
      setIsCheckingUsername(true)
      setUsernameMessage('')
      try {
       const response = await axios.get(`/api/auth/check-username/?username=${debounceUsername}`);
       console.log('axios response',response);
       setUsername(response.data.message)
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        setUsernameMessage(axiosError.response?.data.message || 'An error occurred while checking username')
        // toast({
        //   title: 'Error',
        //   description: 'An error occurred',
        //   status: 'error'
        // })
      } finally {
        setIsCheckingUsername(false)
      }
    }
  }

  useEffect(() => {
    checkUsername()
  },[debounceUsername])

  const onSubmit = async (data:z.infer<typeof signUpSchema>) =>{
    setIsSubmitting(true)
    console.log("onSubmit data", data);
    
    try {
      const response = await axios.post<ApiResponse>('/api/sign-up',data);

      toast({
        title:'Success',
        description: response.data.message,
      })

      router.replace(`/verify/${username}`)

    } catch (error) {
      console.log("Error  while sign up");
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message || 'An error occurred while signing up'
      toast({
        title: 'Signup failed',
        description: errorMessage,
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
            Sign up tp start your anonymous adventure
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" 
                    {...field} 
                    onChange={(e)=>{
                      field.onChange(e)
                      debounceUsername(e.target.value)
                    }}
                    />
                  </FormControl>
                  {
                     isCheckingUsername && <Loader2 className="animate-spin" />
                  }
                  <FormDescription >
                     <p className="text-green">
                        test                     {usernameMessage}
                     </p>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" 
                    {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Email
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
                    This is your public display name.
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
                : 'Sign up'}
              </Button>
            
          </form>
        </Form>
        <div className="text-center mt-4">
          <Link href="/sign-in">
          Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}

export default page