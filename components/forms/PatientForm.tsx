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
import router from "next/router"
 
export enum FormFieldType {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  PHONE_INPUT = 'phoneInput',
  CHECKBOX = 'checkbox',
  DATE_PICKER = 'datePicker',
  SELECT = 'select',
  SKELETON = 'skeleton'
};

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})
 
const PatientForm = () => {
const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone:""
    },
  })
 
  async function onSubmit({name, email, phone}: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);

    try {
      const userData = {name, email,phone};

      const user = await createUser(userData);

      if (user) {
         router.push('/patients/${user.$id}/register')
      }

    } catch (error) {
        console.log(error);
    }
  }
    return(

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                <section className="mb-12 space-y-4">
                    <h1 className="header">Keep in touch</h1>
                    <p className="text-dark-700"> Book your first appointment</p>
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
                <CustomFormField 
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="Email"
                  label="Email"
                  placeholder="Email"
                  iconSrc="/assets/icons/email.svg"
                  iconAlt="email"
                />
                <CustomFormField 
                  fieldType={FormFieldType.PHONE_INPUT}
                  control={form.control}
                  name="phone"
                  label="Phone Number"
                  iconSrc="/assets/icons/user.svg"
                  iconAlt="Phone Number"
                />
                <SubmitButton isLoading={isLoading} >Get Started</SubmitButton>
            </form>
        </Form>

    )
}

export default PatientForm;