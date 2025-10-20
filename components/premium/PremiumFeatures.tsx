import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { H2, P, Small } from "@/components/ui/typography";
import { 
    Shield, 
    Star, 
    BarChart3,
    Palette,
    Headphones,
    Sparkles,
    Clock
} from "lucide-react";


export default function PremiumFeatures() {
    return(
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

    );
}
