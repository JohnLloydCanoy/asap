import Link from "next/link";

export default function MarketingHomePage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
        <div className="max-w-3xl text-center space-y-8">
            
            {/* Hero Section */}
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
            Automate your social media with <span className="text-blue-600">ASAP</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            The Automated Social Analytics Platform. Connect your accounts, schedule your content, and let your background workers handle the rest.
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link 
                href="/login" 
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-sm hover:bg-blue-700 transition"
            >
                Sign In to Dashboard
            </Link>
            <Link 
                href="/about" 
                className="px-8 py-3 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 transition"
            >
                Learn More
            </Link>
            </div>

        </div>
        </main>
    );
}