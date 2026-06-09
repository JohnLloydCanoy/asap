export default function OverviewPage() {
    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Overview</h1>
                    <p className="text-gray-500 mt-1 text-sm md:text-base">
                        A high-level summary of your ASAP automation performance.
                    </p>
                </div>
            </div>
            
            <div className="h-96 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center text-gray-500 font-medium">
                Overview Dashboard Coming Soon
            </div>
        </div>
    );
}