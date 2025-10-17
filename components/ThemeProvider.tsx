"use client"
import React, { createContext, useContext, useEffect, useState } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import Loading from "./Loading"

export type Color = "red" | "rose" | "yellow" | "blue" | "green" | "purple"
export type BgColor = "light-mint" | "light-ocean" | "dark-rose" | "dark-ocean" | "default"

interface ColorTheme {
    primaryColor: Color
    setColor: (color: Color) => void
    bgColor: BgColor
    setBgColorHandler: (color: BgColor) => void
}

const ColorContext = createContext<ColorTheme | undefined>(undefined)

export function ColorProvider({ children }: { children: React.ReactNode }) {
    const savedPrimary = typeof window !== "undefined" ? (localStorage.getItem("primary-color") as Color || "yellow") : "yellow"
    const savedBg = typeof window !== "undefined" ? (localStorage.getItem("bg-color") as BgColor || "default") : "default"
    const [primaryColor, setPrimaryColorState] = useState<Color>(savedPrimary)
    const [bgColor, setBgColorState] = useState<BgColor>(savedBg)
    const [mounted, setMounted] = useState(false)

    // Apply primary color class when primaryColor changes (including on mount)
    useEffect(() => {
        if (typeof document !== "undefined") {
            document.documentElement.classList.remove(
                ...["primary-red", "primary-rose", "primary-yellow", "primary-blue", "primary-green", "primary-purple"]
            )
            document.documentElement.classList.add(`primary-${primaryColor}`)
        }
    }, [primaryColor])

    // Apply bg color class when bgColor changes (including on mount)
    useEffect(() => {
        if (typeof document !== "undefined") {
            document.documentElement.classList.remove(...["light-mint", "light-ocean", "dark-rose", "dark-ocean", "default"])
            if (bgColor !== "default") {
                document.documentElement.classList.add(bgColor)
            }
            // For "default", no class needed—let next-themes handle it
        }
    }, [bgColor])

    // Set mounted after initial hydration
    useEffect(() => {
        setMounted(true)
    }, [])

    const setColor = (color: Color) => {
        setPrimaryColorState(color)
        if (typeof window !== "undefined") {
            localStorage.setItem("primary-color", color)
        }
    }

    const setBgColorHandler = (color: BgColor) => {
        setBgColorState(color)
        if (typeof window !== "undefined" && color !== "default") {
            localStorage.setItem("bg-color", color)
        } else if (typeof window !== "undefined") {
            localStorage.removeItem("bg-color") // Clean up for default
        }
    }

    if (!mounted) return <Loading />

    return (
        <ColorContext.Provider value={{ primaryColor, setColor, bgColor, setBgColorHandler }}>
            {children}
        </ColorContext.Provider>
    )
}

export function useColor() {
    const context = useContext(ColorContext)
    if (!context) throw new Error("useColor must be used within ColorProvider")
    return context
}

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
    return (
        <NextThemesProvider {...props}>
            <ColorProvider>{children}</ColorProvider>
        </NextThemesProvider>
    )
}