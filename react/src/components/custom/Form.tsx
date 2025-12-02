import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import type { GenericFormInput } from "@/interfaces/components/generic-form.interface"

export function GenericForm<OnSubmitData>({onSubmit}: GenericFormInput<OnSubmitData>) {
  const form = useForm()

  return (
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
  )
}