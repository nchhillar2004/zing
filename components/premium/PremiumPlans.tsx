import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { H3, P, Small } from "@/components/ui/typography";
import { 
    Crown, 
    Check, 
    ArrowRight,
    Gift
} from "lucide-react";
import { getCurrentUser } from "@/lib/dal";

export default async function PremiumPlans() {
    const currentUser = await getCurrentUser();

    return(
        <>
            <div className="grid md:grid-cols-3 gap-8">
                <Card className="relative">
                    <CardHeader className="text-center pb-4">
                        <CardTitle className="text-2xl">Free</CardTitle>
                        <div className="text-4xl font-bold">INR 0</div>
                        <Small className="text-muted-foreground">Forever free</Small>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-600" />
                                <Small>Basic social features</Small>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-600" />
                                <Small>Post and share content</Small>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-600" />
                                <Small>Follow other users</Small>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-600" />
                                <Small>Basic privacy controls</Small>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-600" />
                                <Small>Community support</Small>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-600" />
                                <Small>Ad-free experience</Small>
                            </li>
                        </ul>
                        <Button variant="outline" className="w-full" disabled>
                            {currentUser?.premiumTier==="NONE" ? "Current plan" : "FREE plan"}
                        </Button>
                    </CardContent>
                </Card>

                <Card className="relative border-primary/50">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-primary text-primary-foreground px-4 py-1">
                            Most Popular
                        </Badge>
                    </div>
                    <CardHeader className="text-center pb-4">
                        <CardTitle className="text-2xl">Basic</CardTitle>
                        <div className="text-4xl font-bold">INR 499</div>
                        <Small className="text-muted-foreground">per month</Small>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-600" />
                                <Small>Everything in Free</Small>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-600" />
                                <Small>Advanced analytics</Small>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-600" />
                                <Small>Premium themes</Small>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-600" />
                                <Small>Priority support</Small>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-600" />
                                <Small>Extended storage</Small>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-600" />
                                <Small>Extra coins bonus</Small>
                            </li>
                        </ul>
                        <Button className="w-full" disabled={currentUser?.premiumTier==="BASIC"}>
                           {currentUser?.premiumTier==="BASIC" ? "Current plan" : (currentUser?.premiumTier==="PRO" ? "Downgrade to Basic" : "Upgrade to Basic")}
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </CardContent>
                </Card>

                <Card className="relative border-purple-500/50">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1">
                            <Crown className="w-3 h-3 mr-1" />
                            Pro
                        </Badge>
                    </div>
                    <CardHeader className="text-center pb-4">
                        <CardTitle className="text-2xl">Pro</CardTitle>
                        <div className="text-4xl font-bold">INR 1499</div>
                        <Small className="text-muted-foreground">per month</Small>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-600" />
                                <Small>Everything in Basic</Small>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-600" />
                                <Small>Advanced content tools</Small>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-600" />
                                <Small>AI-powered insights</Small>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-600" />
                                <Small>Early access to features</Small>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-600" />
                                <Small>Advanced privacy controls</Small>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-600" />
                                <Small>Dedicated account manager</Small>
                            </li>
                        </ul>
                        <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600" disabled={currentUser?.premiumTier==="PRO"}>
                           {currentUser?.premiumTier==="PRO" ? "Current plan" : "Upgrade to PRO"}
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </CardContent>
                </Card>
            </div>
            <div className="text-center mt-8">
                <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 border-green-200 dark:border-green-800">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <Gift className="w-5 h-5 text-green-600" />
                            <H3 className="text-green-800 dark:text-green-200">Save 20% with Annual Billing</H3>
                        </div>
                        <P className="text-green-700 dark:text-green-300">
                            Pay annually and save 20% on all premium plans. Cancel anytime.
                        </P>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
