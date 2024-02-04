import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchema } from "@/lib/formSchema";
import { useUserStore } from "@/store/userStore";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";

import * as z from "zod";

type Props = {};

export default function LoginPage({}: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const {setUsername} = useUserStore()

  const [error, setError] = useState({
    username: "",
    password: "",
  });

  

  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    // console.log(values)
    try {
      const res = await axios.post("http://localhost:3000/auth/login", values, {withCredentials: true});
    //   console.log(res);
      if (res.status === 200) {
        console.log(res.data)
        setUsername(res.data.username)
        toast.success("Login successful");
        navigate("/");
        
      } else {
        toast.error("Login failed");
      }
      form.reset();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const backendErrors = error.response?.data.errors;
        setError({
          username: backendErrors.username || "",
          password: backendErrors.password || "",
        });

        // console.log(backendErrors)
        // console.log(error)
      } else {
        // Handle non-Axios errors
        console.error("An unexpected error occurred:", error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="flex flex-col items-center  mt-[14rem] h-[100vh]  mx-auto ">
      <h1 className="mb-[5rem] text-3xl font-semibold">Login</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-10"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Username"
                    className="focus-visible:ring-transparent w-[20rem]"
                    {...field}
                  />
                </FormControl>
                <FormMessage/>
                <p className="text-sm font-semibold text-red-600">{error.username}</p>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Password"
                    className="focus-visible:ring-transparent w-[20rem]"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage/>
                <p className="text-sm font-semibold text-red-600">{error.password}</p>
              </FormItem>
            )}
          />
          <Button variant={`secondary`} className="hover:bg-slate-600/10">
            Login
          </Button>
        </form>
      </Form>
      <Link to={`/register`} className="text-sm underline mt-5">
        Don't have an account?
      </Link>
    </div>
  );
}
