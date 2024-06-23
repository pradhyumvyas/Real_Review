import {z} from "zod"


export const userReviewFormSchema = z.object({
   review: z.string()
   .min(10, {message: "Review must be at least 10 character long"})
   .max(500, {message: "Review must be at most 500 character long"})
});