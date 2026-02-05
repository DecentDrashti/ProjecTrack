import FacultyNavbar from "@/app/components/navbar/FacultyNavbar";

export default function FacultyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#EDF0F5]">
            <FacultyNavbar />
            <div className="pt-20">
                {children}
            </div>
        </div>
    );
}
