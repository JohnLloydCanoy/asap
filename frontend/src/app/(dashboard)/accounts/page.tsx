"use client";

import { useState } from "react";
import api from "@/lib/api"; 

export default function SocialAccountsPage() {
    const [handle, setHandle] = useState("");
    const [appPassword, setAppPassword] = useState("");
    const [statusMessage, setStatusMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage("");

    try {
        const response = await api.post("/social-accounts/", {
            // Hardcoding a user ID for the MVP since we skipped the login page
            user_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6", 
            platform: "Bluesky",
            account_handle: handle,
            access_token: appPassword,
            scopes: [],
        });

        if (response.status === 201) {
            setStatusMessage("✅ Account successfully connected!");
            setHandle("");
            setAppPassword("");
        }
        } catch (error) {
        console.error(error);
        setStatusMessage("❌ Failed to connect account. Check your credentials.");
        } finally {
        setIsLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded-lg shadow-md border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Connect Social Accounts</h1>
        
        <form onSubmit={handleConnect} className="space-y-4">
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Bluesky Handle
            </label>
            <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder="e.g. asap-sandbox.bsky.social"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
            />
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                App Password
            </label>
            <input
                type="password"
                value={appPassword}
                onChange={(e) => setAppPassword(e.target.value)}
                placeholder="xxxx-xxxx-xxxx-xxxx"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
            />
            </div>

            <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
            >
            {isLoading ? "Connecting..." : "Connect Bluesky"}
            </button>
        </form>

        {statusMessage && (
            <div className="mt-4 p-3 rounded bg-gray-50 text-center font-medium text-gray-800">
            {statusMessage}
            </div>
        )}
        </div>
    );
}