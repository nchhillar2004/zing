"use client"
import React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { createContext, useContext, useEffect, useState } from 'react';
import Loading from "./Loading";

export type Color = "red" | "rose" | "yellow" | "blue" | "green" | "purple";

interface ColorTheme {
    primaryColor: Color;
    setColor: (color: Color) => void;
}

const ColorContext = createContext<ColorTheme | undefined>(undefined);

export function ColorProvider({ children }: {children: React.ReactNode}) {
    const saved = (typeof window !== 'undefined') && localStorage.getItem('primary-color') as Color || "yellow";
    const [primaryColor, setPrimaryColor] = useState<Color>(saved);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setColor(primaryColor);
        setMounted(true);
    }, [primaryColor]);

    const setColor = (color: Color) => {
        setPrimaryColor(color);
        localStorage.setItem('primary-color', color);
        document.documentElement.classList.remove(
            ...['primary-red', 'primary-rose', 'primary-yellow', 'primary-blue', 'primary-green', 'primary-purple']
        );
        document.documentElement.classList.add(`primary-${color}`);
    };
    if (!mounted) return <Loading/>;

    return (
        <ColorContext.Provider value={{ primaryColor, setColor }}>
            {children}
        </ColorContext.Provider>
    );
}

export function useColor() {
    const context = useContext(ColorContext);
    if (!context) throw new Error("Error in color theme");
    return context;
}
export function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    return <NextThemesProvider {...props}>
        <ColorProvider>
            {children}
        </ColorProvider>
    </NextThemesProvider>
}
