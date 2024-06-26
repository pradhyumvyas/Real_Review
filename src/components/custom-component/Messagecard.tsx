"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
 } from "@/components/ui/alert-dialog"
 
import { Button } from "@/components/ui/button"; 
import { X } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { ApiResponse } from "@/types/ApiResponse";
import { Message } from "@/model/User.model";
import axios from "axios";

type MessagecardType = {
   message: Message;
   onMessageDelete: (message: string) => void;
};

const Messagecard = ({message, onMessageDelete}:MessagecardType) => {
   const {toast} = useToast();
   
   const handleDeleteConfirm = async ()=>{
    console.log("Delete Confirm", message);
    
      const response = await axios.delete<ApiResponse>(`/api/delete-review`,{
          data:{reviewId:message._id}
      });
      console.log("delete api respone", response);
      if(response.status !== 200){
          return toast({
              title: "Error",
              description: response.data.message,
              variant: "destructive"
          });
        }
      onMessageDelete(message._id);
      toast({
         title: "Message Deleted",
         description: "Message has been deleted successfully"
      });
   }

   let reviewSendAt:String = new Date(message.createdAt).toLocaleString();

  const alertDialogeBox = () => {
    return (
      <div className='absolute top-0 right-0 m-5'>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">
              <X className="w-5 h-5" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                Message and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={()=>handleDeleteConfirm()}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  };

  return (
    <div className="relative m-4">
      <Card className="card-bordered bg-gray-900 text-white">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">Review</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        {alertDialogeBox()}
        <CardContent>{message.content}</CardContent>
        <CardFooter>
          <p>Review send on {reviewSendAt}</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Messagecard;
