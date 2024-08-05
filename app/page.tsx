import Image from "next/image";
import {Button} from "@/components/ui/button";
import PatientForm from "@/components/forms/patientForm";
import Link from "next/link";

export default function Home() {
  return (
    <article className="flex h-screen max-h-screen">
      {/* Add opt varification*/}
      <section className="remove-scrollbar container my-auto">
        <section className="subcontainer max-w-[496px]">
          <Image
          src = '/assets/favicon.ico'
          height={1000}
          width={1000}
          alt="patient"
          className="mb-12 h-40 w-fit"
          />
          <PatientForm />
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
        src="/assets/images/onboarding-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%]"
      />
    </article>
  );
}
