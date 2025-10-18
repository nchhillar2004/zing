import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { H1, H3, P, Small } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Shield, Users, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
    title: "Terms of Service - Zing",
    description: "Terms of Service for Zing social media platform",
};

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="bg-primary/5 border-b">
                <div className="max-w-4xl mx-auto px-6 py-12">
                    <div className="flex items-center gap-3 mb-4">
                        <Shield className="w-8 h-8 text-primary" />
                        <H1>Terms of Service</H1>
                    </div>
                    <P className="text-muted-foreground text-lg">
                        Please read these terms carefully before using Zing. By using our platform, you agree to be bound by these terms.
                    </P>
                    <div className="flex items-center gap-2 mt-4">
                        <Badge variant="outline">
                            <CalendarDays className="w-3 h-3 mr-1" />
                            Last updated: October 2025
                        </Badge>
                        <Badge variant="secondary">Version 1.0</Badge>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
                {/* Introduction */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="w-5 h-5" />
                            Introduction
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <P>
                            Welcome to Zing, a modern social media platform designed to connect people and share meaningful content. 
                            These Terms of Service (&quot;Terms&quot;) govern your use of our website, mobile application, and related services 
                            (collectively, the &quot;Service&quot;) operated by Zing (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;).
                        </P>
                        <P>
                            By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part 
                            of these terms, then you may not access the Service.
                        </P>
                    </CardContent>
                </Card>

                {/* Acceptance of Terms */}
                <Card>
                    <CardHeader>
                        <CardTitle>1. Acceptance of Terms</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <P>
                            By creating an account or using Zing, you acknowledge that you have read, understood, and agree to 
                            be bound by these Terms and our Privacy Policy.
                        </P>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>You must be at least 13 years old to use our Service</li>
                            <li>You must provide accurate and complete information when creating your account</li>
                            <li>You are responsible for maintaining the security of your account</li>
                            <li>You may not create multiple accounts to circumvent restrictions</li>
                        </ul>
                    </CardContent>
                </Card>

                {/* User Conduct */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-orange-500" />
                            2. User Conduct
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <P>
                            You agree to use Zing responsibly and in accordance with applicable laws and regulations. 
                            The following activities are prohibited:
                        </P>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                                <H3 className="text-red-600">Prohibited Content</H3>
                                <ul className="list-disc list-inside space-y-1 text-sm">
                                    <li>Harassment, bullying, or intimidation</li>
                                    <li>Hate speech or discriminatory content</li>
                                    <li>Violence or graphic content</li>
                                    <li>Spam or misleading information</li>
                                    <li>Copyright infringement</li>
                                    <li>Adult content or nudity</li>
                                </ul>
                            </div>
                            
                            <div className="space-y-3">
                                <H3 className="text-red-600">Prohibited Activities</H3>
                                <ul className="list-disc list-inside space-y-1 text-sm">
                                    <li>Impersonating others</li>
                                    <li>Automated posting or scraping</li>
                                    <li>Attempting to hack or disrupt the service</li>
                                    <li>Sharing personal information of others</li>
                                    <li>Commercial use without permission</li>
                                    <li>Creating fake accounts</li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Content and Intellectual Property */}
                <Card>
                    <CardHeader>
                        <CardTitle>3. Content and Intellectual Property</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <P>
                            You retain ownership of the content you post on Zing. However, by posting content, you grant us 
                            a non-exclusive, royalty-free license to use, display, and distribute your content on our platform.
                        </P>
                        
                        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                            <H3 className="text-blue-800 dark:text-blue-200 mb-2">Your Rights</H3>
                            <ul className="list-disc list-inside space-y-1 text-sm text-blue-700 dark:text-blue-300">
                                <li>You own the content you create and post</li>
                                <li>You can delete your content at any time</li>
                                <li>You can export your data</li>
                                <li>You control your privacy settings</li>
                            </ul>
                        </div>
                        
                        <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-lg">
                            <H3 className="text-orange-800 dark:text-orange-200 mb-2">Our Rights</H3>
                            <ul className="list-disc list-inside space-y-1 text-sm text-orange-700 dark:text-orange-300">
                                <li>We may moderate content for safety</li>
                                <li>We can remove content that violates our terms</li>
                                <li>We may use anonymized data for improvements</li>
                                <li>We can suspend accounts for violations</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>

                {/* Privacy and Data */}
                <Card>
                    <CardHeader>
                        <CardTitle>4. Privacy and Data Protection</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <P>
                            We are committed to protecting your privacy and personal data. Our collection and use of your 
                            information is governed by our Privacy Policy, which is incorporated into these Terms by reference.
                        </P>
                        
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="text-center p-4 border rounded-lg">
                                <Shield className="w-8 h-8 mx-auto mb-2 text-green-600" />
                                <H3 className="text-sm">Data Security</H3>
                                <Small className="text-muted-foreground">
                                    We use industry-standard encryption and security measures to protect your data.
                                </Small>
                            </div>
                            
                            <div className="text-center p-4 border rounded-lg">
                                <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                                <H3 className="text-sm">Your Control</H3>
                                <Small className="text-muted-foreground">
                                    You can control your privacy settings and data sharing preferences.
                                </Small>
                            </div>
                            
                            <div className="text-center p-4 border rounded-lg">
                                <CalendarDays className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                                <H3 className="text-sm">Transparency</H3>
                                <Small className="text-muted-foreground">
                                    We provide clear information about how we collect and use your data.
                                </Small>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Premium Services */}
                <Card>
                    <CardHeader>
                        <CardTitle>5. Premium Services</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <P>
                            Zing offers premium subscription services that provide additional features and benefits. 
                            Premium subscriptions are billed monthly or annually and can be cancelled at any time.
                        </P>
                        
                        <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 rounded-lg">
                            <H3 className="mb-2">Premium Features Include:</H3>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>Advanced analytics and insights</li>
                                <li>Priority customer support</li>
                                <li>Custom themes and personalization</li>
                                <li>Increased storage and bandwidth</li>
                                <li>Early access to new features</li>
                            </ul>
                        </div>
                        
                        <P className="text-sm text-muted-foreground">
                            Premium subscriptions are non-refundable except as required by law. We reserve the right 
                            to modify premium features and pricing with reasonable notice.
                        </P>
                    </CardContent>
                </Card>

                {/* Termination */}
                <Card>
                    <CardHeader>
                        <CardTitle>6. Account Termination</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <P>
                            You may terminate your account at any time by contacting us or using the account deletion 
                            feature in your settings. We may suspend or terminate your account if you violate these Terms.
                        </P>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-4 border border-green-200 dark:border-green-800 rounded-lg bg-green-50 dark:bg-green-950/20">
                                <H3 className="text-green-800 dark:text-green-200 mb-2">Account Deletion</H3>
                                <Small className="text-green-700 dark:text-green-300">
                                    When you delete your account, we will remove your personal data within 30 days, 
                                    though some information may be retained for legal or safety purposes.
                                </Small>
                            </div>
                            
                            <div className="p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-950/20">
                                <H3 className="text-red-800 dark:text-red-200 mb-2">Suspension</H3>
                                <Small className="text-red-700 dark:text-red-300">
                                    We may suspend accounts that violate our Terms. Suspended users can appeal 
                                    the decision through our support system.
                                </Small>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Limitation of Liability */}
                <Card>
                    <CardHeader>
                        <CardTitle>7. Limitation of Liability</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <P>
                            To the maximum extent permitted by law, Zing shall not be liable for any indirect, incidental, 
                            special, consequential, or punitive damages, including but not limited to loss of profits, data, 
                            or other intangible losses.
                        </P>
                        
                        <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg">
                            <H3 className="text-yellow-800 dark:text-yellow-200 mb-2">Important Notice</H3>
                            <Small className="text-yellow-700 dark:text-yellow-300">
                                This limitation of liability applies regardless of the legal theory on which the claim is based, 
                                including contract, tort, negligence, strict liability, or otherwise.
                            </Small>
                        </div>
                    </CardContent>
                </Card>

                {/* Changes to Terms */}
                <Card>
                    <CardHeader>
                        <CardTitle>8. Changes to Terms</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <P>
                            We reserve the right to modify these Terms at any time. We will notify users of significant 
                            changes through our platform or via email. Continued use of the Service after changes 
                            constitutes acceptance of the new Terms.
                        </P>
                        
                        <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                            <CalendarDays className="w-4 h-4 text-blue-600" />
                            <Small className="text-blue-700 dark:text-blue-300">
                                We recommend reviewing these Terms periodically to stay informed of any updates.
                            </Small>
                        </div>
                    </CardContent>
                </Card>

                {/* Contact Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>9. Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <P>
                            If you have any questions about these Terms of Service, please contact us:
                        </P>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-4 border rounded-lg">
                                <H3 className="mb-2">General Inquiries</H3>
                                <Small className="text-muted-foreground">
                                    Email: support@zing.example.com<br />
                                    Response time: 24-48 hours
                                </Small>
                            </div>
                            
                            <div className="p-4 border rounded-lg">
                                <H3 className="mb-2">Legal Matters</H3>
                                <Small className="text-muted-foreground">
                                    Email: legal@zing.example.com<br />
                                    For copyright, privacy, and legal issues
                                </Small>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Footer */}
                <div className="text-center py-8 border-t">
                    <P className="text-muted-foreground">
                        These Terms of Service are effective as of October 2025 and will remain in effect 
                        except with respect to any changes in their provisions in the future.
                    </P>
                    <Small className="text-muted-foreground mt-2 block">
                        © 2025 Zing. All rights reserved.
                    </Small>
                </div>
            </div>
        </div>
    );
}
