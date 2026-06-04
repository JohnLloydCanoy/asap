"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "../../lib/api"; 
import { Label } from "@/components/ui/label";

export default function SignUpPage() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [suffixes, setSuffixes] = useState("");
    const [cellNumber, setCellNumber] = useState("");
    const [sex, setSex] = useState("");
    const [email, setEmail] = useState("");
    
    // 1. New State for Password Confirmation
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMsg("");

        // 2. Pre-flight Check: Do the passwords match?
        if (password !== confirmPassword) {
            setErrorMsg("❌ Passwords do not match. Please try again.");
            setIsLoading(false);
            return; // Stop the function here so it doesn't hit the backend
        }

        try {
            await api.post("/users", {
                first_name: firstName,
                last_name: lastName,
                middle_name: middleName,
                suffixes: suffixes || null, 
                cell_number: cellNumber || null,
                sex: sex || null,
                email: email,
                password: password,
                is_active: true,
            });

            router.push("/accounts");
            
        } catch (error: any) {
            console.error(error);
            setErrorMsg(
                error.response?.data?.detail || "❌ Failed to create account. Please check your information."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
            
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

            <div className="max-w-xl w-full space-y-6 p-8 bg-white rounded-xl shadow-md border border-gray-200">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Create an Account</h1>
                    <p className="mt-2 text-sm text-gray-500">Start automating your social media today.</p>
                </div>

                <form onSubmit={handleSignUp} className="space-y-5">
                    
                    {/* Personal Information Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-1">First Name *</Label>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                                required
                            />
                        </div>
                        <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</Label>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                                required
                            />
                        </div>
                        <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-1">Middle Name *</Label>
                            <input
                                type="text"
                                value={middleName}
                                onChange={(e) => setMiddleName(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                                required
                            />
                        </div>
                        <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-1">Suffix <span className="text-gray-400 font-normal">(Optional)</span></Label>
                            <input
                                type="text"
                                value={suffixes}
                                onChange={(e) => setSuffixes(e.target.value)}
                                placeholder="Jr., Sr., III"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                    </div>

                    {/* Contact & Demographics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-1">Cell Number <span className="text-gray-400 font-normal">(Optional)</span></Label>
                            <input
                                type="tel"
                                value={cellNumber}
                                onChange={(e) => setCellNumber(e.target.value)}
                                placeholder="+63 900 000 0000"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-1">Sex <span className="text-gray-400 font-normal">(Optional)</span></Label>
                            <select
                                value={sex}
                                onChange={(e) => setSex(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                            >
                                <option value="">Select...</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    {/* Account Security - Updated with Confirm Password */}
                    <div className="pt-2 space-y-4 border-t border-gray-100">
                        <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-1 mt-2">Email Address *</Label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                                required
                            />
                        </div>

                        {/* 3. New Grid for side-by-side passwords */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label className="block text-sm font-medium text-gray-700 mb-1">Password *</Label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    minLength={8}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <Label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password *</Label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    minLength={8}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <Label className="flex items-center space-x-2 pt-2">
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

                <div className="text-center text-sm text-gray-600 mt-4 border-t border-gray-100 pt-6">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-600 font-semibold hover:underline">
                        Sign In here
                    </Link>
                </div>
            </div>
        </div>
    );
}