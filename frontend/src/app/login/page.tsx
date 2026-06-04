"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "../../lib/api"; 
import { Label } from "@/components/ui/label";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMsg("");

        try {
            // FastAPI OAuth2 expects form-data (application/x-www-form-urlencoded)
            // It also specifically expects the email field to be named "username"
            const formData = new URLSearchParams();
            formData.append("username", email);
            formData.append("password", password);

            const response = await api.post("/auth/login", formData, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            // If successful, save the token to browser storage
            if (response.data && response.data.access_token) {
                localStorage.setItem("token", response.data.access_token);
                
                // Redirect straight to the dashboard!
                router.push("/accounts");
            }
        } catch (error: any) {
            console.error(error);
            setErrorMsg("❌ Invalid email or password. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gray-50 px-4">
            
            {/* Top Left Go Back Link */}
            <div className="absolute top-6 left-6 md:top-8 md:left-8">
                <Link 
                    href="/" 
                    className="group flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                >
                    <span className="inline-block transition-transform group-hover:-translate-x-1">←</span> 
                    Go back to web
                </Link>
            </div>

            <div className="max-w-md w-full space-y-6 p-8 bg-white rounded-xl shadow-md border border-gray-200">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Welcome Back</h1>
                    <p className="mt-2 text-sm text-gray-500">Sign in to manage your automated posts.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <Label className="block text-sm font-medium text-gray-700 mb-1">Email Address</Label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                            required
                        />
                    </div>

                    <div>
                        <Label className="block text-sm font-medium text-gray-700 mb-1">Password</Label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition disabled:bg-blue-300 mt-2"
                    >
                        {isLoading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                {errorMsg && (
                    <div className="p-3 bg-red-50 rounded-md text-center text-sm font-medium text-red-800">
                        {errorMsg}
                    </div>
                )}

                <div className="text-center text-sm text-gray-600 mt-4 border-t border-gray-100 pt-6">
                    Don't have an account?{" "}
                    <Link href="/signup" className="text-blue-600 font-semibold hover:underline">
                        Create one here
                    </Link>
                </div>
            </div>
        </div>
    );
}