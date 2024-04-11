import { Message } from "@/model/User.model";

export interface ApiResponse{
   sucess:boolean;
   message:string;
   isAcceptingMessages?:boolean;
   messages?:Message[];
}