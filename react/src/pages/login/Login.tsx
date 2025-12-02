import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Card } from "../../components/ui/card";
import { Typography } from "../../components/custom/Typography";
import { Link } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import { useLogin } from "./useLogin";

export function Login() {
  const { form, onSubmit, isPending } = useLogin()

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
