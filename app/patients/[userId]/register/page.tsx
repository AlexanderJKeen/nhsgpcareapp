import RegisterForm from '@/components/forms/RegisterForm'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {getUser} from "@/lib/actions/patient.actions"

const Register = async ({params: {userId} }: SearchParamProps) => {
    const user = await getUser(userId);


  return (
    <article className="flex h-screen max-h-screen">
        <section className="remove-scrollbar container my-auto">
        <section className="subcontainer max-w-[496px]">
            <Image
            src = '/assets/favicon.ico'
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-20 w-fit"
            />
            <RegisterForm />
            <section className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
                © 2024 GP Care
            </p>
            <Link href="/?admin=true" className="text-green-500">
                Admin
            </Link>
            </section>
        </section>
        </section>

        <Image 
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px]"
        />
  </article>
  )
}

export default Register
