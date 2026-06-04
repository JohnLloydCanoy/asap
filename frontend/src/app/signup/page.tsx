"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "../../lib/api"; 
import { Label } from "@/components/ui/label";

export default function SignUpPage() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMsg("");

try {
    await api.post("/users/", {
    email: email,
    password: password,
    full_name: fullName,
    is_active: true,
    });

    router.push("/login?registered=true");
    
} catch (error: any) {
    console.error(error);
    setErrorMsg(
    error.response?.data?.detail || "❌ Failed to create account. Please try again."
    );
} finally {
    setIsLoading(false);
}
};

return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full space-y-6 p-8 bg-white rounded-xl shadow-md border border-gray-200">
        <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Create an Account</h1>
            <p className="mt-2 text-sm text-gray-500">Start automating your social media today.</p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-4">
            <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">Full Name</Label>
            <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-gray-900 outline-none"
                required
            />
            </div>

            <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">Email Address</Label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-gray-900 outline-none"
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
                minLength={8}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-gray-900 outline-none"
                required
            />
            </div>

            <Label className="flex items-center space-x-2">
            <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                required
            />
            <span className="text-sm text-gray-700">
                I agree to the <Link href="/terms" className="text-blue-600 hover:underline">
                Terms of Service
                </Link> and <Link href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
                </Link>
            </span>
            </Label>

            <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition disabled:bg-blue-300"
            >
            {isLoading ? "Creating account..." : "Sign Up"}
            </button>
        </form>

        {errorMsg && (
            <div className="p-3 bg-red-50 rounded-md text-center text-sm font-medium text-red-800">
            {errorMsg}
            </div>
        )}

        <div className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 font-semibold hover:underline">
            Sign In here
            </Link>
        </div>
        </div>
    </div>
    );
}