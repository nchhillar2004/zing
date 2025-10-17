import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { H1, H2, H3, P, Small } from "@/components/ui/typography";
import { 
    Shield, 
    Eye, 
    Lock, 
    Database, 
    UserCheck, 
    Settings,
    CalendarDays,
    AlertTriangle,
    CheckCircle,
    XCircle
} from "lucide-react";

export const metadata: Metadata = {
    title: "Privacy Policy - Zing",
    description: "Learn how Zing protects your privacy and handles your personal data",
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500/10 to-green-500/10 border-b">
                <div className="max-w-4xl mx-auto px-6 py-12">
                    <div className="flex items-center gap-3 mb-4">
                        <Shield className="w-8 h-8 text-blue-600" />
                        <H1>Privacy Policy</H1>
                    </div>
                    <P className="text-muted-foreground text-lg">
                        Your privacy is important to us. This policy explains how we collect, use, and protect your information.
                    </P>
                    <div className="flex items-center gap-2 mt-4">
                        <Badge variant="outline">
                            <CalendarDays className="w-3 h-3 mr-1" />
                            Last updated: October 2025
                        </Badge>
                        <Badge variant="secondary">GDPR Compliant</Badge>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
                {/* Introduction */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Eye className="w-5 h-5" />
                            Introduction
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <P>
                            At Zing, we believe that privacy is a fundamental right. This Privacy Policy explains how we collect, 
                            use, disclose, and safeguard your information when you use our social media platform. We are committed 
                            to protecting your privacy and being transparent about our data practices.
                        </P>
                        <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                <H3 className="text-green-800 dark:text-green-200">Our Commitment</H3>
                            </div>
                            <Small className="text-green-700 dark:text-green-300">
                                We will never sell your personal data to third parties. Your data belongs to you, 
                                and we're here to help you control it.
                            </Small>
                        </div>
                    </CardContent>
                </Card>

                {/* Information We Collect */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Database className="w-5 h-5" />
                            1. Information We Collect
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <H3 className="mb-3">Account Information</H3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="p-4 border rounded-lg">
                                    <H3 className="text-sm mb-2 text-green-600">Required Information</H3>
                                    <ul className="space-y-1 text-sm">
                                        <li>• Username</li>
                                        <li>• Display name</li>
                                        <li>• Email address</li>
                                        <li>• Password (encrypted)</li>
                                    </ul>
                                </div>
                                <div className="p-4 border rounded-lg">
                                    <H3 className="text-sm mb-2 text-blue-600">Optional Information</H3>
                                    <ul className="space-y-1 text-sm">
                                        <li>• Profile bio</li>
                                        <li>• Profile picture</li>
                                        <li>• Date of birth</li>
                                        <li>• Location (country)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div>
                            <H3 className="mb-3">Content You Create</H3>
                            <P className="text-muted-foreground mb-3">
                                We store the content you create on our platform, including:
                            </P>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                <li>Posts, comments, and replies</li>
                                <li>Messages sent through our platform</li>
                                <li>Media files you upload</li>
                                <li>Your interactions (likes, shares, bookmarks)</li>
                            </ul>
                        </div>

                        <div>
                            <H3 className="mb-3">Technical Information</H3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/20">
                                    <H3 className="text-sm mb-2 text-blue-600">Device Information</H3>
                                    <ul className="space-y-1 text-sm">
                                        <li>• Device type and model</li>
                                        <li>• Operating system</li>
                                        <li>• Browser type and version</li>
                                        <li>• IP address (anonymized)</li>
                                    </ul>
                                </div>
                                <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-950/20">
                                    <H3 className="text-sm mb-2 text-green-600">Usage Analytics</H3>
                                    <ul className="space-y-1 text-sm">
                                        <li>• Pages visited</li>
                                        <li>• Time spent on platform</li>
                                        <li>• Features used</li>
                                        <li>• Error logs (for debugging)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* How We Use Information */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Settings className="w-5 h-5" />
                            2. How We Use Your Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="p-4 border border-green-200 dark:border-green-800 rounded-lg bg-green-50 dark:bg-green-950/20">
                                    <H3 className="text-green-800 dark:text-green-200 mb-2">Core Services</H3>
                                    <ul className="space-y-1 text-sm text-green-700 dark:text-green-300">
                                        <li>• Provide and maintain the platform</li>
                                        <li>• Enable social interactions</li>
                                        <li>• Deliver personalized content</li>
                                        <li>• Send important notifications</li>
                                    </ul>
                                </div>
                                
                                <div className="p-4 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                                    <H3 className="text-blue-800 dark:text-blue-200 mb-2">Safety & Security</H3>
                                    <ul className="space-y-1 text-sm text-blue-700 dark:text-blue-300">
                                        <li>• Detect and prevent abuse</li>
                                        <li>• Enforce our Terms of Service</li>
                                        <li>• Protect against security threats</li>
                                        <li>• Respond to legal requests</li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="p-4 border border-purple-200 dark:border-purple-800 rounded-lg bg-purple-50 dark:bg-purple-950/20">
                                    <H3 className="text-purple-800 dark:text-purple-200 mb-2">Improvement</H3>
                                    <ul className="space-y-1 text-sm text-purple-700 dark:text-purple-300">
                                        <li>• Analyze usage patterns</li>
                                        <li>• Improve user experience</li>
                                        <li>• Develop new features</li>
                                        <li>• Optimize performance</li>
                                    </ul>
                                </div>
                                
                                <div className="p-4 border border-orange-200 dark:border-orange-800 rounded-lg bg-orange-50 dark:bg-orange-950/20">
                                    <H3 className="text-orange-800 dark:text-orange-200 mb-2">Communication</H3>
                                    <ul className="space-y-1 text-sm text-orange-700 dark:text-orange-300">
                                        <li>• Send service updates</li>
                                        <li>• Respond to support requests</li>
                                        <li>• Share important announcements</li>
                                        <li>• Provide customer service</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Data Sharing */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <UserCheck className="w-5 h-5" />
                            3. Information Sharing
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                            <div className="flex items-center gap-2 mb-2">
                                <XCircle className="w-4 h-4 text-red-600" />
                                <H3 className="text-red-800 dark:text-red-200">We Never Sell Your Data</H3>
                            </div>
                            <Small className="text-red-700 dark:text-red-300">
                                Unlike many social media platforms, we do not sell your personal information to advertisers 
                                or third parties for marketing purposes.
                            </Small>
                        </div>

                        <div>
                            <H3 className="mb-3">Limited Sharing Scenarios</H3>
                            <div className="space-y-4">
                                <div className="p-4 border rounded-lg">
                                    <H3 className="text-sm mb-2">With Your Consent</H3>
                                    <P className="text-sm text-muted-foreground">
                                        We may share information when you explicitly consent, such as connecting 
                                        third-party apps or services.
                                    </P>
                                </div>
                                
                                <div className="p-4 border rounded-lg">
                                    <H3 className="text-sm mb-2">Legal Requirements</H3>
                                    <P className="text-sm text-muted-foreground">
                                        We may disclose information if required by law, court order, or to protect 
                                        our rights and the safety of our users.
                                    </P>
                                </div>
                                
                                <div className="p-4 border rounded-lg">
                                    <H3 className="text-sm mb-2">Service Providers</H3>
                                    <P className="text-sm text-muted-foreground">
                                        We may share limited information with trusted service providers who help us 
                                        operate our platform (hosting, analytics, customer support).
                                    </P>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Data Security */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Lock className="w-5 h-5" />
                            4. Data Security
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <P>
                            We implement industry-standard security measures to protect your information from unauthorized 
                            access, alteration, disclosure, or destruction.
                        </P>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="p-4 border border-green-200 dark:border-green-800 rounded-lg bg-green-50 dark:bg-green-950/20">
                                    <H3 className="text-green-800 dark:text-green-200 mb-2">Encryption</H3>
                                    <ul className="space-y-1 text-sm text-green-700 dark:text-green-300">
                                        <li>• End-to-end encryption for messages</li>
                                        <li>• HTTPS for all data transmission</li>
                                        <li>• Encrypted password storage</li>
                                        <li>• Database encryption at rest</li>
                                    </ul>
                                </div>
                                
                                <div className="p-4 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                                    <H3 className="text-blue-800 dark:text-blue-200 mb-2">Access Controls</H3>
                                    <ul className="space-y-1 text-sm text-blue-700 dark:text-blue-300">
                                        <li>• Multi-factor authentication</li>
                                        <li>• Role-based access controls</li>
                                        <li>• Regular security audits</li>
                                        <li>• Employee training programs</li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="p-4 border border-purple-200 dark:border-purple-800 rounded-lg bg-purple-50 dark:bg-purple-950/20">
                                    <H3 className="text-purple-800 dark:text-purple-200 mb-2">Monitoring</H3>
                                    <ul className="space-y-1 text-sm text-purple-700 dark:text-purple-300">
                                        <li>• Real-time threat detection</li>
                                        <li>• Automated security scanning</li>
                                        <li>• Incident response procedures</li>
                                        <li>• Regular security updates</li>
                                    </ul>
                                </div>
                                
                                <div className="p-4 border border-orange-200 dark:border-orange-800 rounded-lg bg-orange-50 dark:bg-orange-950/20">
                                    <H3 className="text-orange-800 dark:text-orange-200 mb-2">Infrastructure</H3>
                                    <ul className="space-y-1 text-sm text-orange-700 dark:text-orange-300">
                                        <li>• Secure cloud hosting</li>
                                        <li>• Regular backups</li>
                                        <li>• Disaster recovery plans</li>
                                        <li>• Geographic data distribution</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Your Rights */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <UserCheck className="w-5 h-5" />
                            5. Your Privacy Rights
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <P>
                            You have several rights regarding your personal information. We make it easy to exercise these rights 
                            through your account settings or by contacting us directly.
                        </P>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-4 border rounded-lg">
                                <H3 className="mb-2 flex items-center gap-2">
                                    <Eye className="w-4 h-4 text-blue-600" />
                                    Access
                                </H3>
                                <Small className="text-muted-foreground">
                                    View all personal data we have about you
                                </Small>
                            </div>
                            
                            <div className="p-4 border rounded-lg">
                                <H3 className="mb-2 flex items-center gap-2">
                                    <Settings className="w-4 h-4 text-green-600" />
                                    Correction
                                </H3>
                                <Small className="text-muted-foreground">
                                    Update or correct inaccurate information
                                </Small>
                            </div>
                            
                            <div className="p-4 border rounded-lg">
                                <H3 className="mb-2 flex items-center gap-2">
                                    <Database className="w-4 h-4 text-purple-600" />
                                    Portability
                                </H3>
                                <Small className="text-muted-foreground">
                                    Export your data in a machine-readable format
                                </Small>
                            </div>
                            
                            <div className="p-4 border rounded-lg">
                                <H3 className="mb-2 flex items-center gap-2">
                                    <XCircle className="w-4 h-4 text-red-600" />
                                    Deletion
                                </H3>
                                <Small className="text-muted-foreground">
                                    Request deletion of your personal data
                                </Small>
                            </div>
                            
                            <div className="p-4 border rounded-lg">
                                <H3 className="mb-2 flex items-center gap-2">
                                    <Shield className="w-4 h-4 text-orange-600" />
                                    Restriction
                                </H3>
                                <Small className="text-muted-foreground">
                                    Limit how we process your information
                                </Small>
                            </div>
                            
                            <div className="p-4 border rounded-lg">
                                <H3 className="mb-2 flex items-center gap-2">
                                    <AlertTriangle className="w-4 h-4 text-yellow-600" />
                                    Objection
                                </H3>
                                <Small className="text-muted-foreground">
                                    Object to certain types of data processing
                                </Small>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Data Retention */}
                <Card>
                    <CardHeader>
                        <CardTitle>6. Data Retention</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <P>
                            We retain your information only as long as necessary to provide our services and comply with legal obligations.
                        </P>
                        
                        <div className="space-y-3">
                            <div className="p-4 border rounded-lg">
                                <H3 className="text-sm mb-2">Account Data</H3>
                                <Small className="text-muted-foreground">
                                    Retained while your account is active. Deleted within 30 days of account deletion.
                                </Small>
                            </div>
                            
                            <div className="p-4 border rounded-lg">
                                <H3 className="text-sm mb-2">Content</H3>
                                <Small className="text-muted-foreground">
                                    Your posts and messages are retained until you delete them or your account is deleted.
                                </Small>
                            </div>
                            
                            <div className="p-4 border rounded-lg">
                                <H3 className="text-sm mb-2">Analytics Data</H3>
                                <Small className="text-muted-foreground">
                                    Anonymized usage data may be retained for up to 2 years for service improvement.
                                </Small>
                            </div>
                            
                            <div className="p-4 border rounded-lg">
                                <H3 className="text-sm mb-2">Legal Requirements</H3>
                                <Small className="text-muted-foreground">
                                    Some data may be retained longer if required by law or for legitimate business purposes.
                                </Small>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Children's Privacy */}
                <Card>
                    <CardHeader>
                        <CardTitle>7. Children's Privacy</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <P>
                            Zing is not intended for children under 13 years of age. We do not knowingly collect personal 
                            information from children under 13.
                        </P>
                        
                        <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                            <H3 className="text-yellow-800 dark:text-yellow-200 mb-2">If You're Under 13</H3>
                            <Small className="text-yellow-700 dark:text-yellow-300">
                                Please do not create an account or provide any personal information. If we discover that 
                                we have collected information from a child under 13, we will delete it immediately.
                            </Small>
                        </div>
                    </CardContent>
                </Card>

                {/* International Transfers */}
                <Card>
                    <CardHeader>
                        <CardTitle>8. International Data Transfers</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <P>
                            Your information may be transferred to and processed in countries other than your own. 
                            We ensure appropriate safeguards are in place for such transfers.
                        </P>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-4 border rounded-lg">
                                <H3 className="text-sm mb-2">Adequacy Decisions</H3>
                                <Small className="text-muted-foreground">
                                    We rely on adequacy decisions by relevant data protection authorities.
                                </Small>
                            </div>
                            
                            <div className="p-4 border rounded-lg">
                                <H3 className="text-sm mb-2">Standard Contractual Clauses</H3>
                                <Small className="text-muted-foreground">
                                    We use standard contractual clauses approved by the European Commission.
                                </Small>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Changes to Privacy Policy */}
                <Card>
                    <CardHeader>
                        <CardTitle>9. Changes to This Privacy Policy</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <P>
                            We may update this Privacy Policy from time to time. We will notify you of any material changes 
                            by posting the new Privacy Policy on this page and updating the "Last updated" date.
                        </P>
                        
                        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                            <H3 className="text-blue-800 dark:text-blue-200 mb-2">Notification Methods</H3>
                            <ul className="space-y-1 text-sm text-blue-700 dark:text-blue-300">
                                <li>• Email notification for significant changes</li>
                                <li>• In-app notification banner</li>
                                <li>• Updated timestamp on this page</li>
                                <li>• Summary of changes provided</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>

                {/* Contact Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>10. Contact Us</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <P>
                            If you have any questions about this Privacy Policy or our data practices, please contact us:
                        </P>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-4 border rounded-lg">
                                <H3 className="mb-2">Privacy Officer</H3>
                                <Small className="text-muted-foreground">
                                    Email: privacy@zing.com<br />
                                    Response time: 48 hours
                                </Small>
                            </div>
                            
                            <div className="p-4 border rounded-lg">
                                <H3 className="mb-2">Data Protection Officer</H3>
                                <Small className="text-muted-foreground">
                                    Email: dpo@zing.com<br />
                                    For GDPR-related inquiries
                                </Small>
                            </div>
                        </div>
                        
                        <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-950/20">
                            <H3 className="text-green-800 dark:text-green-200 mb-2">Data Subject Rights Requests</H3>
                            <Small className="text-green-700 dark:text-green-300">
                                Use our self-service portal in account settings or email us directly. 
                                We respond to all requests within 30 days.
                            </Small>
                        </div>
                    </CardContent>
                </Card>

                {/* Footer */}
                <div className="text-center py-8 border-t">
                    <P className="text-muted-foreground">
                        This Privacy Policy is effective as of October 2025 and will remain in effect 
                        except with respect to any changes in its provisions in the future.
                    </P>
                    <Small className="text-muted-foreground mt-2 block">
                        © 2025 Zing. Your privacy matters to us.
                    </Small>
                </div>
            </div>
        </div>
    );
}

