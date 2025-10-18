import React from "react"

export function H1({className, children}: {className?: string, children: React.ReactNode}) {
    return (
        <h1 className={`scroll-m-20 text-4xl font-extrabold tracking-tight text-balance ${className || ''}`}>
            {children}
        </h1>
    )
}

export function H2({className, children}: {className?: string, children: React.ReactNode}) {
    return (
        <h2 className={`scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 ${className || ''}`}>
            {children}
        </h2>
    )
}

export function H3({className, children}: {className?: string, children: React.ReactNode}) {
    return (
        <h3 className={`scroll-m-20 text-2xl font-semibold tracking-tight ${className || ''}`}>
            {children}
        </h3>
    )
}

export function H4({children}: {children: React.ReactNode}) {
    return (
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            {children}
        </h4>
    )
}

export function P({className, children}: {className?: string, children: React.ReactNode}) {
    return (
        <p className={`${className} leading-6 [&:not(:first-child)]:mt-6`}>
            {children}
        </p>
    )
}

export function Code({children}: {children: React.ReactNode}) {
    return (
        <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
            {children}
        </code>
    )
}

export function Small({className, children}: {className?: string, children: React.ReactNode}) {
    return (
        <small className={`text-[12px] leading-none font-medium ${className || ''}`}>{children}</small>
    )
}

export function Muted({className, children}: {className?: string, children: React.ReactNode}) {
    return (
        <p className={`text-muted-foreground ${className || ''}`}>{children}</p>
    )
}

