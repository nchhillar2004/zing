"use client";
import { useTheme } from "next-themes";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import React, { useEffect, useState } from "react";
import { siteConfig } from "@/config/site-config";
import Loading from "./Loading";
import { Muted } from "./ui/typography";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const themes = [
        { id: "light", label: "Light", value: "light", bg: "bg-white text-black", expectedBgType: "light" as const },
        { id: "dim", label: "Dim", value: "dim", bg: "bg-[#1b2836] text-white", expectedBgType: "dark" as const },
        { id: "dark", label: "Dark", value: "dark", bg: "bg-black text-white", expectedBgType: "dark" as const },
    ];

    if (!mounted) return <Loading />;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Change appearance</CardTitle>
                <CardDescription>
                    Manage your color and background. These settings affect your experience on {siteConfig.name}.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                <div>
                    <strong>Select theme</strong>
                    <div className="flex items-center space-x-2 pt-2">
                        {themes.map((item) => (
                            <Label
                                key={item.id}
                                htmlFor={item.id}
                                className={`flex items-center justify-around space-x-2 max-md:py-2 max-md:px-4 max-md:flex-wrap py-4 px-8 border border-border rounded-sm cursor-pointer transition-colors ${
                                    item.bg
                                } ${theme === item.value ? "ring-2 ring-primary" : ""}`}
                            >
                                <Checkbox
                                    id={item.id}
                                    checked={theme === item.value}
                                    onCheckedChange={() => setTheme(item.value)}
                                    className={`rounded-full ${theme !== "light" && item.value === "light" ? "border-black" : ""}`}
                                />
                                <p>{item.label}</p>
                            </Label>
                        ))}
                    </div>
                </div>
                <div>
                    <strong>Gradient themes</strong>
                    <Muted>Feature comming soon...</Muted>
                </div>
            </CardContent>
        </Card>
    );
}
