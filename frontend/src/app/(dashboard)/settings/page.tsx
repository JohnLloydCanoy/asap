export default function SettingsPage() {
    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Settings</h1>
                    <p className="text-gray-500 mt-1 text-sm md:text-base">
                        Manage your account details, billing, and brand context preferences.
                    </p>
                </div>
                <button className="inline-flex items-center justify-center rounded-md bg-gray-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-gray-800 transition">
                    Save Changes
                </button>
            </div>
            
            <div className="h-96 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center text-gray-500 font-medium">
                Settings Configuration Coming Soon
            </div>
        </div>
    );
}