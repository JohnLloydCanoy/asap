"use client";

import { useState } from "react";
import { Globe, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FaTwitter, FaLinkedin, FaMastodon, FaPinterest } from "react-icons/fa";
import { SiBluesky } from "react-icons/si"; 

export default function AccountsPage() {
    const [connectedAccounts, setConnectedAccounts] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showBlueskyForm, setShowBlueskyForm] = useState(false);
    const [handle, setHandle] = useState("");
    const [appPassword, setAppPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const platforms = [
        { id: "x", name: "X (Twitter)", icon: FaTwitter, hoverText: "hover:text-neutral-900 hover:bg-neutral-100" },
        { id: "linkedin", name: "LinkedIn", icon: FaLinkedin, hoverText: "hover:text-blue-700 hover:bg-blue-50" },
        { id: "bluesky", name: "Bluesky", icon: SiBluesky, hoverText: "hover:text-sky-500 hover:bg-sky-50" },
        { id: "mastodon", name: "Mastodon", icon: FaMastodon, hoverText: "hover:text-indigo-600 hover:bg-indigo-50" },
        { id: "pinterest", name: "Pinterest", icon: FaPinterest, hoverText: "hover:text-red-600 hover:bg-red-50" },
    ];

    const handleConnectPlatform = (platformId: string) => {
        if (platformId === "bluesky") {
            setShowBlueskyForm(true);
        } else {
            alert(`Next Step: Redirecting to ${platformId} OAuth login!`);
        }
    };

    const handleBlueskySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:8000/api/auth/bluesky/connect", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ handle, app_password: appPassword }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || "Failed to connect account");
            }

            setConnectedAccounts(prev => [...prev, { id: "bluesky", name: handle, platform: "bluesky" }]);
            setIsModalOpen(false);
            setShowBlueskyForm(false);
            setHandle("");
            setAppPassword("");
            alert("Bluesky account connected successfully!");
        } catch (err: any) {
            setError(err.message || "An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    const handleModalClose = (open: boolean) => {
        setIsModalOpen(open);
        if (!open) {
            setShowBlueskyForm(false);
            setError("");
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Social Accounts</h1>
                    <p className="text-gray-500 mt-1 text-sm md:text-base">
                        Connect and manage the social profiles you want ASAP to automate.
                    </p>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center justify-center rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition"
                >
                    + Connect Account
                </button>
            </div>

            {/* Account List / Empty State */}
            {connectedAccounts.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 mt-8 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                    <div className="h-16 w-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                        <Globe className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">No accounts connected</h3>
                    <p className="text-gray-500 text-center max-w-sm mb-6 text-sm">
                        You haven't connected any social media profiles yet. Add an account to start scheduling.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    {connectedAccounts.map((account, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl bg-white shadow-sm">
                            <SiBluesky className="w-8 h-8 text-sky-500" />
                            <div>
                                <h4 className="font-semibold text-gray-900">{account.name}</h4>
                                <p className="text-xs text-gray-500 capitalize">{account.platform} Connected</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* MODAL */}
            <Dialog open={isModalOpen} onOpenChange={handleModalClose}>
                <DialogContent className="sm:max-w-md bg-white">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-gray-900">
                            {showBlueskyForm ? "Connect Bluesky" : "Connect a Profile"}
                        </DialogTitle>
                        <DialogDescription className="text-gray-500">
                            {showBlueskyForm 
                                ? "Enter your Bluesky handle and app password to grant ASAP posting permissions."
                                : "Select the social media platform you want to integrate with ASAP."}
                        </DialogDescription>
                    </DialogHeader>
                    
                    {!showBlueskyForm ? (
                        /* Main Selection Grid */
                        <div className="grid grid-cols-1 gap-3 py-4">
                            {platforms.map((platform) => {
                                const Icon = platform.icon;
                                return (
                                    <button
                                        key={platform.id}
                                        onClick={() => handleConnectPlatform(platform.id)}
                                        className={`flex items-center gap-4 p-4 rounded-lg border border-gray-200 bg-white transition-all duration-200 ${platform.hoverText}`}
                                    >
                                        <Icon className="w-6 h-6" />
                                        <span className="font-semibold text-sm">{platform.name}</span>
                                        <span className="ml-auto text-gray-400">→</span>
                                    </button>
                                );
                            })}
                        </div>
                    ) : (
                        /* Bluesky Direct Input Form */
                        <form onSubmit={handleBlueskySubmit} className="space-y-4 py-4">
                            {error && <div className="text-sm bg-red-50 text-red-600 p-3 rounded-lg border border-red-100">{error}</div>}
                            
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-700 uppercase">Bluesky Handle</label>
                                <input 
                                    type="text" 
                                    required
                                    placeholder="yourname.bsky.social" 
                                    value={handle}
                                    onChange={(e) => setHandle(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-700 uppercase">App Password</label>
                                <input 
                                    type="password" 
                                    required
                                    placeholder="xxxx-xxxx-xxxx-xxxx" 
                                    value={appPassword}
                                    onChange={(e) => setAppPassword(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500"
                                />
                                <p className="text-[11px] text-gray-400 mt-1">
                                    Settings &gt; Moderation &gt; App Passwords on Bluesky.
                                </p>
                            </div>

                            <div className="flex gap-2 pt-2">
                                <button 
                                    type="button" 
                                    onClick={() => setShowBlueskyForm(false)}
                                    className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
                                >
                                    Back
                                </button>
                                <button 
                                    type="submit" 
                                    disabled={isLoading}
                                    className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                                    {isLoading ? "Verifying..." : "Connect"}
                                </button>
                            </div>
                        </form>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}