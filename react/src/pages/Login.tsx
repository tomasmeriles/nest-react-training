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
import axios from "axios"
import { useNavigate } from "react-router-dom";

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

  const { mutate, error, isPending } = useMutation({
    mutationFn: sendLogin,
    onSuccess: () => router("/home")
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
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Your password" value={form.watch("password") || ""}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
    
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </Card>
    </div>

  )
}
