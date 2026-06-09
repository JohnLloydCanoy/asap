"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, CalendarDays, BarChart3, Settings, LogOut} from "lucide-react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

const navigation = [
    { name: "Overview", href: "/overview", icon: LayoutDashboard },
    { name: "Accounts", href: "/accounts", icon: Users },
    { name: "Scheduled Posts", href: "/scheduled", icon: CalendarDays },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Settings", href: "/settings", icon: Settings },
];

const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
};

return (
    <div className="min-h-screen bg-gray-50 flex">
    `      
        {/* Sidebar Navigation */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
            <div className="h-16 flex items-center px-6 border-b border-gray-200">
            <Link href="/overview" className="font-bold text-xl tracking-tight text-gray-900">
                ASAP<span className="text-blue-600">.</span>
            </Link>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive 
                        ? "bg-blue-50 text-blue-700" 
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                >
                    <Icon className={`w-5 h-5 ${isActive ? "text-blue-700" : "text-gray-500"}`} />
                    {item.name}
                </Link>
                );
            })}
            </nav>

            <div className="p-4 border-t border-gray-200">
            <button 
                onClick={handleLogout}
                className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
                <LogOut className="w-5 h-5" />
                Sign Out
            </button>
            </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
            {/* Mobile Header  */}
            <div className="md:hidden h-16 bg-white border-b border-gray-200 flex items-center px-4 justify-between">
            <span className="font-bold text-lg text-gray-900">ASAP.</span>
            <button onClick={handleLogout} className="text-sm font-medium text-red-600">Sign Out</button>
            </div>
            
            {/* Page Content Injection */}
            <div className="p-4 md:p-8">
            {children}
            </div>
        </main>
        
        </div>
    );
}