import {z} from 'zod';

export const usernameValidation = z.
   string().
   min(3, {message: "Username must be at least 3 characters long"}).
   max(15, {message: "Username cannot be longer than 30 characters"})
   .regex(/^[a-zA-Z0-9_]*$/, {message: "Username can only contain letters, numbers and underscores"});


   export const signUpSchema = z.object({
      username: usernameValidation,
      email: z.string().email({message: "Please enter a valid email"}),
      password: z.string().min(8, {message: "Password must be at least 8 characters long"})
   })