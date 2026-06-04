export default function DashboardLayout({
    children,
    }: {
    children: React.ReactNode;
    }) {
    return (
        <section className="dashboard-container">
        {/* This renders your sub-pages like accounts/page.tsx */}
        {children} 
        </section>
    );
}