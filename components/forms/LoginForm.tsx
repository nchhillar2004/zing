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
import { useRouter } from "next/navigation";
import { loginAction } from "@/actions/login";
import { useActionState } from "react";
import { useEffect } from "react";

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [ state, action, pending ] = useActionState(loginAction, undefined);
    const router = useRouter();

    useEffect(() => {
        if (state?.user) {
            router.push("/");
        }
    }, [state, router]);

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form action={action} className="p-6 md:p-8">
                        <FieldGroup>
                            <div className="flex flex-col items-center gap-2 text-center">
                                <h1 className="text-2xl font-bold">Welcome back</h1>
                                <p className="text-muted-foreground text-balance">
                                    Login to your {siteConfig.name} account
                                </p>
                            </div>
                            <Field>
                                <FieldLabel htmlFor="username">Username</FieldLabel>
                                <Input
                                    id="username"
                                    type="text"
                                    name="username"
                                    placeholder="username"
                                    required
                                />
                            </Field>
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                </div>
                                <Input placeholder="password" name="password" id="password" type="password" required />
                                {state?.error && <small className="text-destructive">{state?.error}</small>}
                            </Field>
                            <Field>
                                <Button type="submit" disabled={pending}>{pending ? "Logging in..." : "Login"}</Button>
                            </Field>
                            <FieldDescription className="text-center">
                                Don&apos;t have an account? <Link href="/register">Register</Link>
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

