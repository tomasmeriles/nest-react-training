import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { useForm } from "react-hook-form";
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card } from "../components/ui/card";
import { Typography } from "../components/custom/Typography";
import { useMutation } from "@tanstack/react-query"
import type { LoginUser } from "@/interfaces/login-user.interface";
import axios, { AxiosError } from "axios"
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { X } from "lucide-react";

function sendLogin(credentials: LoginUser) {
  const API_BASE_URL = import.meta.env.VITE_API_URL

  return axios.post(`${API_BASE_URL}/auth/login`, credentials)
}

export function Login() {
  const router = useNavigate()
  
  const formSchema = z.object({
    email: z.email(),
    password: z.string(),
  })

  const form = useForm({
    resolver: zodResolver(formSchema)
  })

  const { mutate, isPending } = useMutation({
    mutationFn: sendLogin,
    onSuccess: () => router("/home"),
    onError: (error) => {
      let message = "An error occurred";

      if (error instanceof AxiosError) {
        message = error.response?.data?.message ?? message;
      }

      const id = toast("Error", {
        description: message,
        action: {
          label: <X className="h-4 w-4" />,
          onClick: () => toast.dismiss(id),
        },
      });
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values)
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-100">
        <Typography.H1>Login</Typography.H1>
        <Form {...form}>
          <form className="flex flex-col gap-4 p-5" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField 
            name="email"
            control={form.control}
            render={({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="your@email.com" value={form.watch("email") || ""}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />

            <FormField 
            name="password"
            control={form.control}
            render={({field}) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Your password" value={form.watch("password") || ""}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
    
            <Button type="submit" disabled={isPending}>
              {isPending && <Spinner className="mr-2 h-4 w-4" />}
              Submit
            </Button>
          </form>
        </Form>

        <Typography.P className="text-center">
          ¿You don't have an account? <Link to="/sign-up" className="text-blue-500">Sign up</Link>
        </Typography.P>
      </Card>
    </div>

  )
}
