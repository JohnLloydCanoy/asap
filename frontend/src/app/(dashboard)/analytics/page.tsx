export default function AnalyticsPage() {
    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Analytics</h1>
                    <p className="text-gray-500 mt-1 text-sm md:text-base">
                        Track engagement, growth, and AI-driven insights across your platforms.
                    </p>
                </div>
                <div className="flex gap-2">
                    <select className="border border-gray-300 rounded-md text-sm px-3 py-2 bg-white">
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                        <option>All Time</option>
                    </select>
                </div>
            </div>
            
            <div className="h-96 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center text-gray-500 font-medium">
                Analytics Engine Coming Soon
            </div>
        </div>
    );
}