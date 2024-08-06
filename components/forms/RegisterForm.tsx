"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {Form} from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import {createUser} from "../../lib/actions/patient.actions"
import {UserFormValidation} from "../../lib/validation"
import { useRouter } from "next/navigation"
import { FormFieldType } from "./PatientForm"


const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})
 
const RegisterForm = async () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone:""
    },
  })
 
  async function onSubmit({name, email, phone}: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);

    try {
      const userData = {name, email, phone};

      const user = await createUser(userData);

      alert(user);

      if (user) {
         router.push('/patients/${user.$id}/register')
      }

    } catch (error) {
        console.log(error);
    }
  }
    return(

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
                <section className="space-y-4">
                    <h1 className="header"> Welcome </h1>
                    <p className="text-dark-700"> Let us know more </p>
                </section>
                <section className="space-y-6">
                    <section className="mb-9 space-y-1">
                        <h2>Personal Information</h2>
                    </section>
                </section>
                <CustomFormField 
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="name"
                  label="Full Name"
                  placeholder="Username"
                  iconSrc="/assets/icons/user.svg"
                  iconAlt="user"
                />
                <SubmitButton isLoading={isLoading}> Get Started </SubmitButton>
            </form>
        </Form>

    )
}

export default RegisterForm;