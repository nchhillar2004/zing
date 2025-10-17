"use client";
import { useTheme } from "next-themes";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import React, { useEffect, useState } from "react";
import { siteConfig } from "@/config/site-config";
import Loading from "./Loading";
import { BgColor, Color, useColor } from "./ThemeProvider";
import { Button } from "./ui/button";

interface ColorsList {
    id: string;
    label: string;
    value: Color;
}

interface BgColorsList {
    id: string;
    label: string;
    type: "dark" | "light" | "default";
    value: string;
    bg: string;
}

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const { primaryColor, setColor, bgColor, setBgColorHandler } = useColor();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const colors: ColorsList[] = [
        { id: "yellow", label: "Yellow", value: "yellow" },
        { id: "red", label: "Red", value: "red" },
        { id: "rose", label: "Pink", value: "rose" },
        { id: "blue", label: "Blue", value: "blue" },
        { id: "green", label: "Green", value: "green" },
        { id: "purple", label: "Purple", value: "purple" },
    ];

    const bgColors: BgColorsList[] = [
        { id: "default", label: "Default", type: "default", value: "default", bg: "bg-background" },
        { id: "light-mint", label: "Light Mint", type: "light", value: "light-mint", bg: "bg-[#E7F5E9]" },
        { id: "light-ocean", label: "Light Ocean", type: "light", value: "light-ocean", bg: "bg-[#EDF8FB]" },
        { id: "dark-rose", label: "Dark Rose", type: "dark", value: "dark-rose", bg: "bg-[#26000d]" },
        { id: "dark-ocean", label: "Dark Ocean", type: "dark", value: "dark-ocean", bg: "bg-[#001136]" },
    ];

    const themes = [
        { id: "light", label: "Light", value: "light", bg: "bg-white text-black", expectedBgType: "light" as const },
        { id: "dim", label: "Dim", value: "dim", bg: "bg-[#0d0d0d] text-white", expectedBgType: "dark" as const },
        { id: "dark", label: "Dark", value: "dark", bg: "bg-black text-white", expectedBgType: "dark" as const },
    ];

    const getExpectedBgType = (currentTheme: string): "light" | "dark" | "default" => {
        const themeMatch = themes.find(t => t.value === currentTheme);
        return themeMatch?.expectedBgType || "default";
    };

    const getBgTypeFromColor = (colorValue: string): "light" | "dark" | "default" => {
        const match = bgColors.find(c => c.value === colorValue);
        return match?.type || "default";
    };

    const handleThemeChange = (newTheme: string) => {
        const expectedType = getExpectedBgType(newTheme);
        const currentBgType = getBgTypeFromColor(bgColor);

        setTheme(newTheme);

        if (bgColor !== "default" && currentBgType !== expectedType && currentBgType !== "default") {
            setBgColorHandler("default");
        } else if (bgColor !== "default") {
            setTimeout(() => setBgColorHandler(bgColor as BgColor), 0);
        }
    };

    const handleBgColorChange = (color: BgColorsList) => {
        const targetTheme = color.type === "default" ? "system" : color.type;
        setTheme(targetTheme);
        setBgColorHandler(color.value as BgColor);
    };

    if (!mounted) return <Loading />;

    const currentExpectedType = getExpectedBgType(theme || "light");

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
                    <strong>Select color</strong>
                    <div className="flex items-center flex-nowrap space-x-2 pt-2 max-md:flex-wrap max-md:gap-2">
                        {colors.map((color) => (
                            <Checkbox
                                key={color.id}
                                className={`cursor-pointer primary-${color.value} ring-1 bg-[var(--primary)] rounded-full w-[40px] h-[40px] ${
                                    primaryColor === color.value ? "ring-primary" : "ring-border"
                                }`}
                                onCheckedChange={() => setColor(color.value)}
                                checked={primaryColor === color.value}
                                title={color.label}
                            />
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
                                className={`flex items-center justify-around space-x-2 max-md:py-2 max-md:px-4 max-md:flex-wrap py-4 px-8 border border-border rounded-sm cursor-pointer transition-colors ${
                                    item.bg
                                } ${theme === item.value ? "ring-2 ring-primary" : ""}`}
                            >
                                <Checkbox
                                    id={item.id}
                                    checked={theme === item.value}
                                    onCheckedChange={() => handleThemeChange(item.value)}
                                    className={`rounded-full ${theme !== "light" && item.value === "light" ? "border-black" : ""}`}
                                />
                                <p>{item.label}</p>
                            </Label>
                        ))}
                    </div>
                </div>
                <div>
                    <strong>Other themes</strong>
                    <div className="flex items-center flex-nowrap space-x-2 pt-2 max-md:flex-wrap max-md:gap-2">
                        {bgColors.map((color) => {
                            const isCompatible = color.type === "default" || color.type === currentExpectedType;
                            return (
                                <div key={color.id} className="flex flex-col items-center justify-center text-[11px] text-muted-foreground">
                                <Button
                                    className={`cursor-pointer ${color.bg} ring-1 rounded-full w-[40px] h-[40px] transition-opacity ${bgColor === color.value ? "ring-primary" : "ring-border"}`}
                                    onClick={() => handleBgColorChange(color)}
                                    variant="ghost"
                                    title={`${color.label}${!isCompatible ? " (switch theme for best match)" : ""}`}
                                />
                                    <p>{color.label}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}