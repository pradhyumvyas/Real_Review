import {z} from 'zod';

export const MessageSchema = z.object({
   content: z.string()
   .min(10, {message: "Message must be at least 10 character long"})
   .max(200, {message: "Message cannot be longer than 200 characters"})
})