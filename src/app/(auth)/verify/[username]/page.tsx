"use client"

import { useToast } from "@/components/ui/use-toast";
import { VerifySchema } from "@/schemas/verifySchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useRouter, useParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormField, FormItem, FormDescription, FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const VerifyAccount = () => {
  const router = useRouter();
  const param = useParams();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof VerifySchema>>({
    resolver: zodResolver(VerifySchema),
  });

  const onSubmit = async (data: z.infer<typeof VerifySchema>) => {
    console.log("submit dataaa",data);
    try {
      const response = await axios.post("/api/verify-code", {
        username: param.username,
        code: data.code,
      });

      toast({
        title: response.data.message,
        description: "You can now sign in",
      });
      router.push("/sign-in");
    } catch (err) {
      const axiosError = err as AxiosError<ApiResponse>;
      let errorMessage =
        axiosError.response?.data.message ||
        "An error occurred while verifying account";

      toast({
        title: "Verification failed",
        description: errorMessage
      });
    }
  };

  return (
    <div className="flex justify-center items-center bg-slate-600">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-black">Verify Your Account</h1>
          <p className="text-black">
            Verify your account to start your anonymous adventure
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the code" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter your code from Email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default VerifyAccount;
