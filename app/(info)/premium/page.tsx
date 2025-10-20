import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { H1, H2, P, Small } from "@/components/ui/typography";
import Link from "next/link";
import PremiumPlans from "@/components/premium/PremiumPlans";
import PremiumFeatures from "@/components/premium/PremiumFeatures";
import PremiumPageFAQs from "@/components/premium/PremiumPageFAQs";

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
                    <PremiumPlans/>
                </div>
            </div>

            <PremiumFeatures/>

            <PremiumPageFAQs/>

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

