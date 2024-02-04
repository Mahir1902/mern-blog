import * as z from "zod"

export const formSchema = z.object({
    username: z.string().min(4, {
      message: "Username must be at least 4 characters long",
    
    }).max(50, {
      message: "Username must be less than 50 characters long",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters long",
    }),
  })