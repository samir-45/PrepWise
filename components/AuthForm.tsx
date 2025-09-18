"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import Image from "next/image"
import Link from "next/link"
import { error } from "console"
import { toast } from "sonner"
import FormField from "./FormField"
import { useRouter } from "next/navigation"


const authFormSchema = (type: FormType) => {
    return z.object({
        name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
        email: z.string().email(),
        password: z.string().min(3)
    })
}

const AuthForm = ({ type }: { type: FormType }) => {

    const router = useRouter()

    const formSchema = authFormSchema(type);

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (type === 'sign-up') {
                toast.success('Account Created Successfully. Please Sign in');
                router.push('/sign-in')
            } else {
                toast.success('Sign in Successfully');
                router.push('/')
            }
        } catch (error) {
            console.log(error);
            toast.error(`There is an Error ${error}`)
        }
    }

    const isSignIn = type === 'sign-in';

    return (
        <div className="card-border lg:min-w-[566px]">
            <div className="flex flex-col gap-4 card py-12 px-10">
                <div className="flex flex-row gap-2 justify-center">
                    <Image src="/logo.svg" alt="logo" height={32} width={38}></Image>
                    <h2 className="text-primary-100">PrepWise</h2>
                </div>
                <h3>Practice code job interview using AI</h3>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full mt-4 form">
                        {/* Here should be form field */}
                        {!isSignIn && (
                            <FormField control={form.control} name="name" label="Name" placeholder="Your Name"></FormField>
                        )}
                        <FormField control={form.control} name="email" label="Email" type="email" placeholder="Your Email"></FormField>
                        <FormField control={form.control} name="password" type="password" label="Password" placeholder="Your Password"></FormField>

                        <Button className="btn" type="submit">{isSignIn ? 'SignIn' : 'Create an account'}</Button>
                    </form>
                    <p className="text-center">
                        {isSignIn ? 'No account Yet?' : 'Have an already account?'}
                        {' '}
                        <Link href={!isSignIn ? '/sign-in' : '/sign-up'}>
                            {!isSignIn ? 'Sign in' : 'Sign up'}
                        </Link>
                    </p>
                </Form>
            </div>
        </div>
    );
};

export default AuthForm;