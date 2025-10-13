import React from "react";
import { H4 } from "./ui/typography";
import { FaArrowLeft } from "react-icons/fa6";
import Link from "next/link";
import { MdOutlineMenu, MdClose } from "react-icons/md";
import { Button } from "./ui/button";
import { Drawer, DrawerTrigger, DrawerTitle, DrawerClose, DrawerHeader, DrawerContent, DrawerFooter } from "@/components/ui/drawer";
import NavigationLinks from "./NavigationLinks";
import SiteLogo from "./SiteLogo";
type HeaderVariant = "tabs" | "title";

export default function Header({children, variant, title, fallback}: 
    {children?: React.ReactNode, variant: HeaderVariant, title?: string, fallback?: string}) {

    return (
        <header className="backdrop-blur-sm border-b border-[--border] sticky top-0 w-full z-10 h-[50px] px-2 flex items-center">
            <div className="hidden max-md:flex">
                <Drawer direction="left">
                    <DrawerTrigger asChild>
                        <Button size={"icon-lg"} variant={"ghost"}>
                            <MdOutlineMenu className="h-[1.5em]! w-[1.5em]!" />
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader className="flex-row justify-between items-center">
                            <DrawerTitle>
                                <SiteLogo/>
                            </DrawerTitle>
                            <DrawerClose asChild>
                                <Button size={"icon-lg"} variant="link">
                                    <MdClose className="h-[1.5em]! w-[1.5em]!" />
                                </Button>
                            </DrawerClose>
                        </DrawerHeader>
                        <div className="px-4 h-full">
                            <NavigationLinks/>
                        </div>
                        <DrawerFooter>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </div>
            {variant==="title" ? 
                <div className="flex space-x-8 h-full items-center">
                    <Link href={fallback ? fallback : "/"} title="Go back" className="max-md:hidden">
                        <FaArrowLeft size={36} className="transition-colors duration-250 hover:bg-[var(--border)] cursor-pointer rounded-full p-2" />
                    </Link>
                    <H4>{title}</H4>
                </div>
                :
                <>{children}</>
            }
        </header>
    );
}
