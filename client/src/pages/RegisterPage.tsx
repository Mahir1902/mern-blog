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
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import * as z from "zod";

type Props = {};

export default function RegisterPage({}: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [error, setError] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate()

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/auth/register",
        values, {withCredentials: true}
      );

    //   console.log(res);
      
      if(res.data) {
          toast.success("Registration successful");
            setError({ username: "", password: "" }); // Reset errors
            navigate('/login')
      }

      form.reset();
      setError({ username: "", password: "" }); // Reset errors
    } catch (error) {
      if (error instanceof AxiosError) {
        const backendErrors = error.response?.data.errors;
        setError({
          username: backendErrors.username || "",
          password: backendErrors.password || "",
        });
      }
      toast.error("Registration failed try again later");
    }
  };

  return (
    <div className="flex flex-col  items-center mt-[14rem] h-[100vh]  mx-auto ">
      <h1 className="mb-[5rem] text-3xl font-semibold">Register</h1>
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
              </FormItem>
            )}
          />
          <Button>Register</Button>
        </form>
      </Form>
      <Link to={`/login`} className="underline mt-5 text-sm">
        Already have an account?
      </Link>
    </div>
  );
}
