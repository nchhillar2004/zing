import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { H1, H2, H3, P, Small } from "@/components/ui/typography";
import { 
    Heart, 
    Users, 
    Zap, 
    Shield, 
    Globe, 
    MessageCircle, 
    Star,
    ArrowRight,
    Github,
    Mail,
    CalendarDays
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "About Us - Zing",
    description: "Learn about Zing, the modern social media platform connecting people worldwide",
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background">
                <div className="max-w-6xl mx-auto px-6 py-16">
                    <div className="text-center space-y-6">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
                                <Zap className="w-8 h-8 text-primary-foreground" />
                            </div>
                            <H1 className="text-4xl md:text-6xl font-bold">Zing</H1>
                        </div>
                        
                        <P className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            A modern social media platform designed to bring people together, 
                            share meaningful content, and build authentic connections in the digital age.
                        </P>
                        
                        <div className="flex flex-wrap justify-center gap-3 mt-8">
                            <Badge variant="secondary" className="px-4 py-2">
                                <Heart className="w-4 h-4 mr-2" />
                                Community First
                            </Badge>
                            <Badge variant="secondary" className="px-4 py-2">
                                <Shield className="w-4 h-4 mr-2" />
                                Privacy Focused
                            </Badge>
                            <Badge variant="secondary" className="px-4 py-2">
                                <Zap className="w-4 h-4 mr-2" />
                                Fast & Modern
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mission Section */}
            <div className="max-w-6xl mx-auto px-6 py-16">
                <div className="text-center mb-12">
                    <H2 className="text-3xl font-bold mb-4">Our Mission</H2>
                    <P className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        To create a social media platform that prioritizes user well-being, authentic connections, 
                        and meaningful conversations over engagement metrics and advertising revenue.
                    </P>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <Card className="text-center">
                        <CardContent className="p-8">
                            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-blue-600" />
                            </div>
                            <H3 className="mb-3">Community Driven</H3>
                            <P className="text-muted-foreground">
                                Built by the community, for the community. Every feature is designed with our users&apos; 
                                needs and feedback in mind.
                            </P>
                        </CardContent>
                    </Card>

                    <Card className="text-center">
                        <CardContent className="p-8">
                            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Shield className="w-8 h-8 text-green-600" />
                            </div>
                            <H3 className="mb-3">Privacy First</H3>
                            <P className="text-muted-foreground">
                                Your data belongs to you. We use end-to-end encryption, minimal data collection, 
                                and transparent privacy policies.
                            </P>
                        </CardContent>
                    </Card>

                    <Card className="text-center">
                        <CardContent className="p-8">
                            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MessageCircle className="w-8 h-8 text-purple-600" />
                            </div>
                            <H3 className="mb-3">Meaningful Connections</H3>
                            <P className="text-muted-foreground">
                                Focus on quality over quantity. Our algorithms prioritize meaningful conversations 
                                and authentic relationships.
                            </P>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-muted/30 py-16">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <H2 className="text-3xl font-bold mb-4">What Makes Zing Different</H2>
                        <P className="text-lg text-muted-foreground">
                            We&apos;re reimagining social media with features that actually benefit users
                        </P>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Zap className="w-5 h-5 text-primary" />
                                    Lightning Fast Performance
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <P className="text-muted-foreground mb-4">
                                    Built with modern web technologies for blazing fast load times and smooth interactions. 
                                    No more waiting for feeds to load or posts to publish.
                                </P>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2">
                                        <Star className="w-4 h-4 text-yellow-500" />
                                        <Small>Sub-second page load times</Small>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Star className="w-4 h-4 text-yellow-500" />
                                        <Small>Real-time notifications</Small>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Star className="w-4 h-4 text-yellow-500" />
                                        <Small>Offline-first architecture</Small>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Shield className="w-5 h-5 text-primary" />
                                    Advanced Privacy Controls
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <P className="text-muted-foreground mb-4">
                                    Take control of your data with granular privacy settings, end-to-end encryption, 
                                    and transparent data practices.
                                </P>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2">
                                        <Star className="w-4 h-4 text-yellow-500" />
                                        <Small>End-to-end encrypted messages</Small>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Star className="w-4 h-4 text-yellow-500" />
                                        <Small>Granular privacy settings</Small>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Star className="w-4 h-4 text-yellow-500" />
                                        <Small>Data export and deletion</Small>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MessageCircle className="w-5 h-5 text-primary" />
                                    Smart Content Discovery
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <P className="text-muted-foreground mb-4">
                                    Our AI-powered algorithms surface content that matters to you, not what generates 
                                    the most engagement or ad revenue.
                                </P>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2">
                                        <Star className="w-4 h-4 text-yellow-500" />
                                        <Small>Interest-based recommendations</Small>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Star className="w-4 h-4 text-yellow-500" />
                                        <Small>Quality content prioritization</Small>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Star className="w-4 h-4 text-yellow-500" />
                                        <Small>Anti-spam and misinformation</Small>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Globe className="w-5 h-5 text-primary" />
                                    Global Community
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <P className="text-muted-foreground mb-4">
                                    Connect with people from around the world. Our platform supports multiple languages 
                                    and cultural contexts.
                                </P>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2">
                                        <Star className="w-4 h-4 text-yellow-500" />
                                        <Small>Multi-language support</Small>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Star className="w-4 h-4 text-yellow-500" />
                                        <Small>Cultural sensitivity features</Small>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Star className="w-4 h-4 text-yellow-500" />
                                        <Small>Global accessibility standards</Small>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="max-w-6xl mx-auto px-6 py-16">
                <div className="text-center mb-12">
                    <H2 className="text-3xl font-bold mb-4">Our Story</H2>
                    <P className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Founded in 2025, Zing was born from a simple idea: social media should bring people together, 
                        not drive them apart.
                    </P>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                        <Card>
                            <CardContent className="p-6">
                                <H3 className="mb-3">The Problem We Saw</H3>
                                <P className="text-muted-foreground">
                                    Traditional social media platforms prioritize engagement over well-being, 
                                    leading to echo chambers, misinformation, and mental health issues. 
                                    We knew there had to be a better way.
                                </P>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <H3 className="mb-3">Our Solution</H3>
                                <P className="text-muted-foreground">
                                    Zing focuses on authentic connections, meaningful conversations, and user well-being. 
                                    We use technology to enhance human connection, not replace it.
                                </P>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-4">
                        <div className="p-6 border rounded-lg bg-gradient-to-br from-primary/5 to-primary/10">
                            <div className="flex items-center gap-3 mb-3">
                                <CalendarDays className="w-5 h-5 text-primary" />
                                <H3>Founded</H3>
                            </div>
                            <P className="text-muted-foreground">October 2025</P>
                        </div>

                        <div className="p-6 border rounded-lg bg-gradient-to-br from-blue-500/5 to-blue-500/10">
                            <div className="flex items-center gap-3 mb-3">
                                <Users className="w-5 h-5 text-blue-600" />
                                <H3>Team Size</H3>
                            </div>
                            <P className="text-muted-foreground">Growing team of passionate developers</P>
                        </div>

                        <div className="p-6 border rounded-lg bg-gradient-to-br from-green-500/5 to-green-500/10">
                            <div className="flex items-center gap-3 mb-3">
                                <Globe className="w-5 h-5 text-green-600" />
                                <H3>Global Reach</H3>
                            </div>
                            <P className="text-muted-foreground">Available worldwide</P>
                        </div>
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <div className="bg-muted/30 py-16">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <H2 className="text-3xl font-bold mb-4">Our Values</H2>
                        <P className="text-lg text-muted-foreground">
                            The principles that guide everything we do
                        </P>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card className="text-center">
                            <CardContent className="p-6">
                                <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Heart className="w-6 h-6 text-red-600" />
                                </div>
                                <H3 className="mb-2">Empathy</H3>
                                <Small className="text-muted-foreground">
                                    We design with compassion and understanding for all users
                                </Small>
                            </CardContent>
                        </Card>

                        <Card className="text-center">
                            <CardContent className="p-6">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Shield className="w-6 h-6 text-blue-600" />
                                </div>
                                <H3 className="mb-2">Transparency</H3>
                                <Small className="text-muted-foreground">
                                    Open communication about our practices and decisions
                                </Small>
                            </CardContent>
                        </Card>

                        <Card className="text-center">
                            <CardContent className="p-6">
                                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Zap className="w-6 h-6 text-green-600" />
                                </div>
                                <H3 className="mb-2">Innovation</H3>
                                <Small className="text-muted-foreground">
                                    Constantly improving and pushing the boundaries of what&apos;s possible
                                </Small>
                            </CardContent>
                        </Card>

                        <Card className="text-center">
                            <CardContent className="p-6">
                                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Users className="w-6 h-6 text-purple-600" />
                                </div>
                                <H3 className="mb-2">Community</H3>
                                <Small className="text-muted-foreground">
                                    Building a platform that serves and empowers our users
                                </Small>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="max-w-6xl mx-auto px-6 py-16">
                <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
                    <CardContent className="p-12 text-center">
                        <H2 className="text-3xl font-bold mb-4">Join the Zing Community</H2>
                        <P className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Be part of a social media platform that puts people first. 
                            Create meaningful connections and share what matters to you.
                        </P>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" asChild>
                                <Link href="/register">
                                    Get Started
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                            </Button>
                            <Button variant="outline" size="lg" asChild>
                                <Link href="/login">
                                    Sign In
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Footer */}
            <div className="bg-muted/50 py-12">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div>
                            <H3 className="mb-4">Connect With Us</H3>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Github className="w-4 h-4" />
                                    <Small>GitHub: nchhillar2004/zing</Small>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    <Small>support@zing.com</Small>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <H3 className="mb-4">Learn More</H3>
                            <div className="space-y-2">
                                <Small><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></Small>
                                <Small><Link href="/terms" className="hover:text-primary">Terms of Service</Link></Small>
                                <Small><Link href="/premium" className="hover:text-primary">Premium Features</Link></Small>
                            </div>
                        </div>
                        
                        <div>
                            <H3 className="mb-4">Stay Updated</H3>
                            <Small className="text-muted-foreground">
                                Follow our development journey and get early access to new features.
                            </Small>
                        </div>
                    </div>
                    
                    <div className="border-t mt-8 pt-8 text-center">
                        <Small className="text-muted-foreground">
                            © 2025 Zing. Built with ❤️ for the community.
                        </Small>
                    </div>
                </div>
            </div>
        </div>
    );
}
