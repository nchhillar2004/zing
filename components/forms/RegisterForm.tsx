"use client";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { siteConfig } from "@/config/site-config"
import SiteLogo from "../SiteLogo"
import React, { useActionState, useState } from "react";
import { registerAction } from "@/actions/register";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterForm() {
    const [state, action, pending] = useActionState(registerAction, undefined);
    const router = useRouter();
    const [redirecting, setRedirecting] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const [formData, setFormData] = useState({
        fname: "",
        username: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({...prev, [e.target.name]: e.target.value }));
    }

    useEffect(() => {
        if (state?.username) {
            setRedirecting(true);
            toast.success("Registered successfully, login to continue");
            router.push("/login");
        }
    }, [state, router]);

    return (
        <div className={cn("flex flex-col gap-6")}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form action={action} className="p-6 md:p-8">
                        <FieldGroup>
                            <div className="flex flex-col items-center gap-2 text-center">
                                <h1 className="text-2xl font-bold">Welcome to {siteConfig.name}</h1>
                                <p className="text-muted-foreground text-balance">
                                    Create new account
                                </p>
                            </div>
                            <Field>
                                <FieldLabel htmlFor="fname">Full name</FieldLabel>
                                <Input
                                    id="fname"
                                    type="text"
                                    name="fname"
                                    value={formData.fname}
                                    onChange={handleChange}
                                    placeholder="Full Name"
                                    required
                                />
                                {state?.errors?.fname && <small className="text-destructive">{state.errors.fname}</small>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="username">Username</FieldLabel>
                                <Input
                                    id="username"
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder="test_user"
                                    required
                                /> {/* TODO: implement realtime username validations before submitting */}
                                {state?.errors?.username && <small className="text-destructive">{state.errors.username}</small>}
                            </Field>
                            <Field className="relative">
                                <FieldLabel htmlFor="password">Create a Password</FieldLabel>
                                <Input 
                                    id="password" 
                                    name="password" 
                                    type={passwordVisible ? "text" : "password"}
                                    placeholder="Password" 
                                    required/>
                                <Button variant={"ghost"} 
                                    title={passwordVisible ? "Hide password" : "Show password"} 
                                    size={"icon"} 
                                    className="absolute block w-fit! right-3 top-[26px] cursor-pointerr"
                                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {e.preventDefault(); setPasswordVisible(!passwordVisible)}}>
                                    {passwordVisible ? <Eye/> : <EyeOff/>}
                                </Button>
                                {state?.errors?.password && <small className="text-destructive">{state.errors.password}</small>}
                            </Field>
                            <Field className="relative">
                                <FieldLabel htmlFor="cpassword">Confirm password</FieldLabel>
                                <Input
                                    id="cpassword"
                                    type={passwordVisible ? "text" : "password"}
                                    name="cpassword"
                                    placeholder="Confirm password"
                                    required
                                />
                                <Button variant={"ghost"} 
                                    title={passwordVisible ? "Hide password" : "Show password"} 
                                    size={"icon"} 
                                    className="absolute block w-fit! right-3 top-[26px] cursor-pointerr"
                                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {e.preventDefault(); setPasswordVisible(!passwordVisible)}}>
                                    {passwordVisible ? <Eye/> : <EyeOff/>}
                                </Button>
                                {state?.errors?.cpassword && <small className="text-destructive">{state.errors.cpassword}</small>}
                            </Field>

                            <Field>
                                <Button type="submit" disabled={pending || redirecting}>{pending || redirecting ? "Registering..." : "Register"}</Button>
                            </Field>
                            <FieldDescription className="text-center">
                                Already have an account? <Link href="/login">Login</Link>
                            </FieldDescription>
                        </FieldGroup>
                    </form>
                    <div className="flex items-center justify-center h-full py-8">
                        <SiteLogo className="text-5xl max-md:text-4xl"/>
                    </div>
                </CardContent>
            </Card>
            <FieldDescription className="px-6 text-center">
                By clicking continue, you agree to our <Link href="/terms">Terms of Service</Link>{" "}
                and <Link href="/privacy">Privacy Policy</Link>.
            </FieldDescription>
        </div>
    )
}


