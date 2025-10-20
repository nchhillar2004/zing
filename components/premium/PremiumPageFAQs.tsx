import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { H2, P } from "@/components/ui/typography";

export default function PremiumPageFAQs() {
    return(
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
                                We do NOT offer any money-back guarantee for any new subscriptions.
                                If you&apos;re not satisfied with your premium experience, contact our support team.
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
    );
}
