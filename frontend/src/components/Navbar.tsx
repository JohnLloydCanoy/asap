"use client";

import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
            
            {/* Logo Section */}
            <Link href="/" className="font-bold text-xl tracking-tight text-gray-900">
            ASAP<span className="text-blue-600">.</span>
            </Link>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
                <NavigationMenuItem>
                <Link href="/features" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Features
                    </NavigationMenuLink>
                </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                <Link href="/pricing" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Pricing
                    </NavigationMenuLink>
                </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
            </NavigationMenu>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
            <Link 
                href="/login" 
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition"
            >
                Sign In
            </Link>
            <Link 
                href="/signup" 
                className="hidden md:inline-flex h-9 items-center justify-center rounded-md bg-blue-600 px-4 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-700"
            >
                Get Started
            </Link>
            </div>
            
        </div>
        </header>
    );
}