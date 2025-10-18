import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { H1, H2, H3, P, Small } from "@/components/ui/typography";
import { 
    Crown, 
    Shield, 
    Star, 
    Check, 
    ArrowRight,
    BarChart3,
    Palette,
    Headphones,
    Sparkles,
    Gift,
    Clock
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Premium Features - Zing",
    description: "Unlock advanced features and enhance your Zing experience with our premium plans",
};

export default function PremiumPage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="bg-gradient-to-br from-primary/20 via-primary/10 to-background">
            <div className="w-full text-center py-10"><H1>Zing Premium</H1></div>
            <div className="max-w-6xl mx-auto px-6 pb-8">
                <div className="text-center mb-12">
                    <H2 className="text-3xl font-bold mb-4">Choose Your Plan</H2>
                    <P className="text-lg text-muted-foreground">
                        All plans include our core features. Premium plans unlock advanced capabilities.
                    </P>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <Card className="relative">
                        <CardHeader className="text-center pb-4">
                            <CardTitle className="text-2xl">Free</CardTitle>
                            <div className="text-4xl font-bold">$0</div>
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
                            </ul>
                            <Button variant="outline" className="w-full" disabled>
                                Current Plan
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
                            <div className="text-4xl font-bold">$4.99</div>
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
                                    <Small>Custom themes</Small>
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
                                    <Small>Ad-free experience</Small>
                                </li>
                            </ul>
                            <Button className="w-full">
                                Upgrade to Basic
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
                            <div className="text-4xl font-bold">$9.99</div>
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
                            <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                                Upgrade to Pro
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
            </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-10">
                <div className="text-center mb-12">
                    <H2 className="text-3xl font-bold mb-4">Premium Features</H2>
                    <P className="text-lg text-muted-foreground">
                        Discover the powerful tools that make Zing Premium worth it
                    </P>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BarChart3 className="w-5 h-5 text-blue-600" />
                                Advanced Analytics
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <P className="text-muted-foreground mb-4">
                                Get detailed insights into your content performance, audience engagement, 
                                and growth metrics with beautiful, interactive charts.
                            </P>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2">
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <Small>Post performance metrics</Small>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <Small>Audience demographics</Small>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <Small>Engagement trends</Small>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <Small>Export reports</Small>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Palette className="w-5 h-5 text-purple-600" />
                                Custom Themes
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <P className="text-muted-foreground mb-4">
                                Personalize your Zing experience with custom themes, colors, and layouts 
                                that reflect your unique style and preferences.
                            </P>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2">
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <Small>Dark and light themes</Small>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <Small>Custom color schemes</Small>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <Small>Layout customization</Small>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <Small>Font and typography</Small>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Headphones className="w-5 h-5 text-green-600" />
                                Priority Support
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <P className="text-muted-foreground mb-4">
                                Get faster, more personalized support with dedicated channels and 
                                priority response times for all your questions and issues.
                            </P>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2">
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <Small>24-hour response time</Small>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <Small>Direct email support</Small>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <Small>Feature requests priority</Small>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <Small>Account manager (Pro)</Small>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="w-5 h-5 text-red-600" />
                                Enhanced Privacy
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <P className="text-muted-foreground mb-4">
                                Take control of your privacy with advanced settings, encryption options, 
                                and granular control over who can see your content.
                            </P>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2">
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <Small>End-to-end encryption</Small>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <Small>Advanced blocking tools</Small>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <Small>Content visibility controls</Small>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <Small>Data export tools</Small>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-yellow-600" />
                                AI-Powered Features
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <P className="text-muted-foreground mb-4">
                                Leverage artificial intelligence to enhance your content, 
                                discover relevant topics, and optimize your social media presence.
                            </P>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2">
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <Small>Content suggestions</Small>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <Small>Trend analysis</Small>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <Small>Smart scheduling</Small>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <Small>Audience insights</Small>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-orange-600" />
                                Early Access
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <P className="text-muted-foreground mb-4">
                                Be the first to try new features, provide feedback, and help shape 
                                the future of Zing with exclusive early access to beta features.
                            </P>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2">
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <Small>Beta feature access</Small>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <Small>Feature voting rights</Small>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <Small>Developer updates</Small>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <Small>Community influence</Small>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="bg-muted/30 py-10">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <H2 className="text-3xl font-bold mb-4">Frequently Asked Questions</H2>
                        <P className="text-lg text-muted-foreground">
                            Everything you need to know about Zing Premium
                        </P>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Can I cancel my subscription anytime?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <P className="text-muted-foreground">
                                    Yes! You can cancel your subscription at any time from your account settings. 
                                    You&apos;ll continue to have access to premium features until the end of your billing period.
                                </P>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>What happens to my data if I downgrade?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <P className="text-muted-foreground">
                                    Your data is always safe. When you downgrade, you&apos;ll lose access to premium features, 
                                    but all your content, connections, and account information remain intact.
                                </P>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Do you offer refunds?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <P className="text-muted-foreground">
                                    We offer a 30-day money-back guarantee for all new subscriptions. 
                                    If you&apos;re not satisfied with your premium experience, contact our support team for a full refund.
                                </P>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Can I switch between plans?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <P className="text-muted-foreground">
                                    Absolutely! You can upgrade or downgrade your plan at any time. 
                                    Changes take effect immediately, and we&apos;ll prorate any billing differences.
                                </P>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            <div className="bg-muted/50 py-8">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <P className="text-muted-foreground mb-4">
                        Questions about pricing or features? We&apos;re here to help.
                    </P>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button variant="outline" disabled>
                            <Link href="/contact">
                                Contact Support
                            </Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="/terms">
                                Terms of Service
                            </Link>
                        </Button>
                    </div>
                    
                    <div className="border-t mt-8 pt-8">
                        <Small className="text-muted-foreground">
                            © 2025 Zing. Premium features subject to terms and conditions.
                        </Small>
                    </div>
                </div>
            </div>
        </div>
    );
}

