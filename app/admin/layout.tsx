import AdminNavbar from "@/app/components/navbar/AdminNavbar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#EDF0F5]">
            <AdminNavbar />
            <div className="pt-20">
                {children}
            </div>
        </div>
    );
}
