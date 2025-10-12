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

export default function RegisterForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form className="p-6 md:p-8">
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
                                    placeholder="Full Name"
                                    required
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="username">Username</FieldLabel>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="example"
                                    required
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="password">Create a Password</FieldLabel>
                                <Input id="password" type="password" placeholder="Password" required />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="cpassword">Confirm password</FieldLabel>
                                <Input
                                    id="cpassword"
                                    type="password"
                                    placeholder="Confirm password"
                                    required
                                />
                            </Field>

                            <Field>
                                <Button type="submit">Register</Button>
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


