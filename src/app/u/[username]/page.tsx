"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast";
import { userReviewFormSchema } from "@/schemas/userReviewFormSchema";
import {usePathname} from "next/navigation"
import axios, { AxiosError } from "axios"
import { ApiResponse } from "@/types/ApiResponse"

const page = () => {

  const form = useForm<z.infer<typeof userReviewFormSchema>>({
    resolver: zodResolver(userReviewFormSchema),
  })

  const router = usePathname()
  const username = router.split('/')[2]


  const onSubmit = async (data: z.infer<typeof userReviewFormSchema>) => {
    try {
      const response = await axios.post<ApiResponse>('/api/send-message',{
        username,
        content: data.review
      })  

      console.log("APi response", response);
      
  
      toast({
        title: "Review Submitted",
        description: response.data.message,
      })
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description: axiosError.response?.data.message,
        variant: "destructive"
      })
    }
  }

  return (
    <div className="m-10">
      <h1 className="text-3xl font-bold text-center h-10">Leave a Review for 
        <span className="text-5xl text-primary text-cyan-400 hover:text-6xl" > {username}</span>
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-[90%] space-y-10 mt-24 flex justify-end items-center flex-col">
          <FormField
            control={form.control}
            name="review"
            render={({ field }) => (
              <FormItem className="w-[90%]">
                <FormLabel className="text-xl">Review</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little about your experience..."
                    className="resize h-32"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="ml-auto" type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default page