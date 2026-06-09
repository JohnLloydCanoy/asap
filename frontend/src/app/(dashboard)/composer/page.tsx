"use client";

import { useState } from "react";
import { Sparkles, Image as ImageIcon, CalendarClock, Send, Smile } from "lucide-react";
import { FaTwitter, FaLinkedin } from "react-icons/fa";
import { Globe } from "lucide-react"; 

export default function ComposerPage() {
    const [content, setContent] = useState("");
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["linkedin"]);
    const [isGenerating, setIsGenerating] = useState(false);

    const platforms = [
        { id: "linkedin", name: "LinkedIn", icon: FaLinkedin, activeColor: "bg-blue-50 border-blue-500 text-blue-700", inactiveColor: "bg-white border-gray-200 text-gray-500 hover:bg-gray-50" },
        { id: "twitter", name: "X (Twitter)", icon: FaTwitter, activeColor: "bg-neutral-100 border-neutral-900 text-neutral-900", inactiveColor: "bg-white border-gray-200 text-gray-500 hover:bg-gray-50" },
        { id: "bluesky", name: "Bluesky", icon: Globe, activeColor: "bg-sky-50 border-sky-500 text-sky-600", inactiveColor: "bg-white border-gray-200 text-gray-500 hover:bg-gray-50" }
    ];

    // Toggle platforms on and off
    const togglePlatform = (id: string) => {
        setSelectedPlatforms(prev => 
            prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
        );
    };

    const handleAIGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setContent("Just finished mapping out the new dashboard layout! 🚀 Incredible how a clean UI completely transforms the feel of a project. What are you all building this week? #BuildInPublic #WebDev");
            setIsGenerating(false);
        }, 1500);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Create Post</h1>
                <p className="text-gray-500 mt-1">Draft, generate, and schedule your content across multiple platforms.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
                
                {/* Left Column: The Editor */}
                <div className="lg:col-span-2 space-y-6">
                    
                    {/* Platform Selector */}
                    <div className="space-y-3">
                        <label className="text-sm font-semibold text-gray-700">Select Platforms</label>
                        <div className="flex flex-wrap gap-3">
                            {platforms.map((platform) => {
                                const Icon = platform.icon;
                                const isActive = selectedPlatforms.includes(platform.id);
                                return (
                                    <button
                                        key={platform.id}
                                        onClick={() => togglePlatform(platform.id)}
                                        className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-medium transition-all ${
                                            isActive ? platform.activeColor : platform.inactiveColor
                                        }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {platform.name}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Text Area Card */}
                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="What do you want to share today?"
                            className="w-full min-h-[220px] p-5 resize-none outline-none text-gray-900 placeholder-gray-400"
                        />
                        
                        {/* Editor Toolbar */}
                        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50/50">
                            <div className="flex items-center gap-2">
                                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Attach Media">
                                    <ImageIcon className="w-5 h-5" />
                                </button>
                                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Add Emoji">
                                    <Smile className="w-5 h-5" />
                                </button>
                                <div className="w-px h-6 bg-gray-200 mx-1"></div>
                                <button 
                                    onClick={handleAIGenerate}
                                    disabled={isGenerating}
                                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-md transition-colors disabled:opacity-50"
                                >
                                    <Sparkles className="w-4 h-4" />
                                    {isGenerating ? "Drafting..." : "AI Generate"}
                                </button>
                            </div>
                            
                            {/* Dynamic Character Counter */}
                            <span className={`text-xs font-medium ${content.length > 280 ? 'text-red-500' : 'text-gray-400'}`}>
                                {content.length} / 280
                            </span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 pt-2">
                        <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-sm">
                            <CalendarClock className="w-5 h-5" />
                            Schedule
                        </button>
                        <button 
                            disabled={content.length === 0 || selectedPlatforms.length === 0}
                            className="flex-[2] flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send className="w-5 h-5" />
                            Post Now
                        </button>
                    </div>
                </div>

                {/* Right Column: Live Preview Pane */}
                <div className="hidden lg:block bg-white border border-gray-200 rounded-xl p-6 h-fit sticky top-8 shadow-sm">
                    <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider">Live Preview</h3>
                    
                    {selectedPlatforms.length === 0 ? (
                        <div className="text-center text-sm text-gray-400 py-10">
                            Select a platform to see the preview.
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="border border-gray-100 rounded-lg p-4 bg-gray-50/50">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                    <div>
                                        <div className="w-24 h-2.5 bg-gray-200 rounded-full mb-2"></div>
                                        <div className="w-16 h-2 bg-gray-200 rounded-full"></div>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-800 whitespace-pre-wrap break-words min-h-[60px]">
                                    {content || <span className="text-gray-400 italic">Your post text will appear here...</span>}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}