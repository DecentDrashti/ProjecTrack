"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

// Icons (SVG-based)
const Icons = {
    Dashboard: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" /></svg>
    ),
    Projects: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
    ),
    Tasks: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20" /><path d="m4.93 4.93 14.14 14.14" /><path d="M2 12h20" /><path d="m4.93 19.07 14.14-14.14" /></svg>
    ),
    Performance: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 11 18-5v12L3 14v-3z" /><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" /></svg>
    ),
    Profile: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
    ),
    Edit: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
    ),
    Help: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
    ),
    Announcements: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
    ),
    Logout: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
    )
};

// Define the shape of user data
interface UserProps {
    name: string;
    email: string;
    enrollment: string;
}

const StudentNavbar = ({ user }: { user?: UserProps }) => {
    const pathname = usePathname();
    const router = useRouter();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Dynamic Navigation items
    const navItems = [
        { name: "Dashboard", href: "/student", icon: Icons.Dashboard },
        { name: "My Projects", href: "/student/projects", icon: Icons.Projects },
        { name: "Tasks", href: "/student/tasks", icon: Icons.Tasks },
        { name: "Performance", href: "/student/performance", icon: Icons.Performance },
    ];

    const dropdownItems = [
        { name: "My Profile", href: "/student/profile", icon: Icons.Profile },
        { name: "Edit Profile", href: "/student/profile/edit", icon: Icons.Edit },
        { name: "Help & Guidelines", href: "/student/help", icon: Icons.Help },
        { name: "Announcements", href: "/student/announcements", icon: Icons.Announcements },
    ];

    const handleLogout = async () => {
        try {
            const res = await fetch('/api/auth/logout', { method: 'POST' });
            if (res.ok) {
                router.push('/login');
                router.refresh();
            }
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        if (isDropdownOpen) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isDropdownOpen]);

    return (
        <nav className="fixed top-0 left-0 right-0 h-20 bg-white border-b border-slate-200/60 z-50 flex items-center justify-between px-8 md:px-12 backdrop-blur-md bg-white/80">
            <div className="flex items-center gap-12">
                <Link href="/dashboard/student" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm transition-transform group-hover:scale-105">
                        <img 
                            src="https://static.vecteezy.com/system/resources/previews/003/693/837/large_2x/p-letter-logo-icon-for-business-and-company-vector.jpg" 
                            alt="Logo" 
                            className="w-full h-full object-cover" 
                        />
                    </div>
                    <span className="text-xl font-bold text-[#201E43] tracking-tight">ProjecTrack</span>
                </Link>

                <div className="hidden lg:flex items-center gap-1">
                    {navItems.map((item) => {
                        // Improved isActive logic for nested routes
                        const isActive = pathname === item.href || (item.href !== '/dashboard/student' && pathname.startsWith(item.href));
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-2.5 px-4 py-2 rounded-xl transition-all duration-300 group ${
                                    isActive ? "bg-[#201E43]/5 text-[#201E43]" : "text-slate-500 hover:text-[#201E43] hover:bg-slate-50"
                                } font-semibold text-sm`}
                            >
                                <span className={`${isActive ? "text-[#201E43]" : "text-slate-400 group-hover:text-[#201E43]"}`}>
                                    <item.icon />
                                </span>
                                {item.name}
                                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#201E43]" />}
                            </Link>
                        );
                    })}
                </div>
            </div>

            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-3 p-1.5 pr-4 rounded-full border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-200 transition-all duration-300"
                >
                    <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-sm bg-slate-200">
                        <img src={`https://i.pravatar.cc/100?u=${user?.enrollment || 'default'}`} alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-left hidden sm:block">
                        <p className="text-sm font-bold text-[#201E43] leading-none">{user?.name || "Student"}</p>
                        <p className="text-[10px] font-medium text-slate-400 mt-0.5">{user?.enrollment || "Verify Profile"}</p>
                    </div>
                    <svg className={`w-4 h-4 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                <div className={`absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all duration-300 z-[60] origin-top-right ${
                    isDropdownOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-4 scale-95 pointer-events-none"
                }`}>
                    <div className="p-2 border-b border-slate-50 bg-slate-50/30">
                        <div className="px-3 py-2">
                            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Student Identity</p>
                            <p className="text-sm font-bold text-[#201E43] mt-1">{user?.name}</p>
                            <p className="text-xs text-slate-500">{user?.email}</p>
                        </div>
                    </div>
                    <div className="p-2">
                        {dropdownItems.map((item) => (
                            <Link key={item.name} href={item.href} onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group hover:bg-indigo-50 text-slate-600 hover:text-indigo-600">
                                <span className="text-slate-400 group-hover:text-indigo-500"><item.icon /></span>
                                <span className="text-sm font-semibold">{item.name}</span>
                            </Link>
                        ))}
                        {/* Logout specific button logic */}
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group hover:bg-rose-50 text-rose-500 mt-1"
                        >
                            <span className="text-rose-400"><Icons.Logout /></span>
                            <span className="text-sm font-semibold">Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default StudentNavbar;