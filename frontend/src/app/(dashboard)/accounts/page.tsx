"use client";

import Link from "next/link";
import { useState } from "react";

export default function AccountsPage() {
    // Placeholder state to simulate having connected accounts later
    const [connectedAccounts, setConnectedAccounts] = useState<any[]>([]);

    return (
        <div className="max-w-6xl mx-auto p-6 md:p-10 space-y-8">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Social Accounts</h1>
                    <p className="text-gray-500 mt-1 text-sm md:text-base">
                        Connect and manage the social profiles you want ASAP to automate.
                    </p>
                </div>
                <button 
                    className="inline-flex items-center justify-center rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    + Connect Account
                </button>
            </div>

            {/* Content Section */}
            {connectedAccounts.length === 0 ? (
                /* Empty State (What you'll see first) */
                <div className="flex flex-col items-center justify-center p-12 mt-8 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                    <div className="h-16 w-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">No accounts connected</h3>
                    <p className="text-gray-500 text-center max-w-sm mb-6 text-sm">
                        You haven't connected any social media profiles yet. Add an account to start scheduling your background workers.
                    </p>
                    <button className="bg-white border border-gray-300 text-gray-700 font-medium py-2 px-6 rounded-md hover:bg-gray-50 transition shadow-sm">
                        Connect your first platform
                    </button>
                </div>
            ) : (
                /* Active Accounts Grid (What it looks like when data exists) */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Example Card Structure for later */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
                        <div className="flex justify-between items-start mb-4">
                            <div className="h-10 w-10 bg-gray-900 rounded-md flex items-center justify-center text-white font-bold">
                                X
                            </div>
                            <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                Active
                            </span>
                        </div>
                        <h4 className="font-semibold text-gray-900">@your_handle</h4>
                        <p className="text-sm text-gray-500">Connected 2 days ago</p>
                    </div>
                </div>
            )}
            
        </div>
    );
}