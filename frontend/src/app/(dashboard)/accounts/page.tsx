"use client";

import { useState } from "react";
import { Globe } from "lucide-react";
import { FaTwitter, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function AccountsPage() {
    const [connectedAccounts, setConnectedAccounts] = useState<any[]>([]);
    

    const [isModalOpen, setIsModalOpen] = useState(false);

    const platforms = [
        { id: "twitter", name: "X (Twitter)", icon: FaTwitter, hoverText: "hover:text-neutral-900 hover:bg-neutral-100" },
        { id: "linkedin", name: "LinkedIn", icon: FaLinkedin, hoverText: "hover:text-blue-700 hover:bg-blue-50" },
        { id: "instagram", name: "Instagram", icon: FaInstagram, hoverText: "hover:text-pink-600 hover:bg-pink-50" },
        { id: "facebook", name: "Facebook", icon: FaFacebook, hoverText: "hover:text-blue-600 hover:bg-blue-50" },
        { id: "bluesky", name: "Bluesky", icon: Globe, hoverText: "hover:text-sky-500 hover:bg-sky-50" },
    ];

    const handleConnectPlatform = (platformId: string) => {
        console.log(`Connecting to ${platformId}...`);
        alert(`Next Step: Redirecting to ${platformId} OAuth login!`);
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
                    className="inline-flex items-center justify-center rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    + Connect Account
                </button>
            </div>

            {/* Empty State Section */}
            {connectedAccounts.length === 0 && (
                <div className="flex flex-col items-center justify-center p-12 mt-8 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                    <div className="h-16 w-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                        <Globe className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">No accounts connected</h3>
                    <p className="text-gray-500 text-center max-w-sm mb-6 text-sm">
                        You haven't connected any social media profiles yet. Add an account to start scheduling your background workers.
                    </p>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="bg-white border border-gray-300 text-gray-700 font-medium py-2 px-6 rounded-md hover:bg-gray-50 transition shadow-sm"
                    >
                        Connect your first platform
                    </button>
                </div>
            )}

            {/* THE CONNECT ACCOUNT MODAL */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-md bg-white">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-gray-900">Connect a Profile</DialogTitle>
                        <DialogDescription className="text-gray-500">
                            Select the social media platform you want to integrate with ASAP.
                        </DialogDescription>
                    </DialogHeader>
                    
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
                </DialogContent>
            </Dialog>
            
        </div>
    );
}