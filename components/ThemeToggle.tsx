"use client";
import { useTheme } from "next-themes";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import React, { useEffect, useState } from "react";
import { siteConfig } from "@/config/site-config";
import Loading from "./Loading";
import { Color, useColor } from "./ThemeProvider";

interface ColorsList {
    id: string;
    label: string;
    value: Color;
}

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const { primaryColor, setColor } = useColor();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const colors: ColorsList[] = [
        {id: "yellow", label: "Yellow", value: "yellow"},
        {id: "red", label: "Red", value: "red"},
        {id: "rose", label: "Rose", value: "rose"},
        {id: "blue", label: "Blue", value: "blue"},
        {id: "green", label: "Green", value: "green"},
        {id: "purple", label: "Purple", value: "purple"},
    ];

    const themes = [
        { id: "light", label: "Light", value: "light", bg: "bg-white text-black" },
        { id: "dim", label: "Dim", value: "dim", bg: "bg-zinc-900 text-white" },
        { id: "dark", label: "Dark", value: "dark", bg: "bg-black text-white" },
    ];

    if (!mounted) return <Loading/>;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Change appearance</CardTitle>
                <CardDescription>
                    Manage your color and background. These settings affect your experience on {siteConfig.name}.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <div className="mb-4">
                    <strong className="">Select color</strong>
                    <div className="flex items-center flex-nowrap space-x-2 pt-2 max-md:flex-wrap max-md:gap-2">
                        {colors.map((color) => (
                            <Checkbox key={color.id} className={`cursor-pointer primary-${color.value} bg-[var(--primary)] rounded-full w-[40px] h-[40px] border-border`} 
                                onCheckedChange={() => setColor(color.value)}
                                checked={primaryColor===color.value} title={color.label}/>
                        ))}
                    </div>
                </div>
                <div>
                    <strong>Select theme</strong>
                    <div className="flex items-center space-x-2 pt-2">
                        {themes.map((item) => (
                            <Label
                                key={item.id}
                                htmlFor={item.id}
                                className={`flex items-center justify-around space-x-2 max-md:py-2 max-md:px-4 max-md:flex-wrap py-4 px-8 border border-border rounded-sm cursor-pointer transition-colors 
${item.bg} ${theme === item.value ? "ring-2 ring-primary" : ""}`}>
                                <Checkbox
                                    id={item.id}
                                    checked={theme === item.value}
                                    onCheckedChange={() => setTheme(item.value)}
                                    className={`rounded-full ${(!(theme==="light") && item.value==="light") && "border-black"}`}
                                />
                                <p>{item.label}</p>
                            </Label>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

