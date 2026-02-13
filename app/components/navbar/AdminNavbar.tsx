"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Icons (SVG-based for zero dependencies and maximum performance)
const Icons = {
    Dashboard: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" /></svg>
    ),
    Projects: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 4 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 4 0 0 1 3-3h7z" /></svg>
    ),
    Users: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
    ),
    Faculty: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
        </svg>
    ),
    Students: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" /></svg>
    ),
    Announcements: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
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
    Logout: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
    ),
    Admin: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
    )
};

const AdminNavbar = () => {
    const pathname = usePathname();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isUsersOpen, setIsUsersOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);
    const usersRef = useRef<HTMLDivElement>(null);

    const navItems = [
        { name: "Dashboard", href: "/admin", icon: Icons.Dashboard },
        { name: "Projects", href: "/admin/projects", icon: Icons.Projects },
    ];

    const usersDropdownItems = [
        { name: "Faculty", href: "/admin/faculty", icon: Icons.Faculty },
        { name: "Students", href: "/admin/students", icon: Icons.Students },
        { name: "Admin", href: "/admin/admin_list", icon: Icons.Admin },
    ];

    const profileDropdownItems = [
        { name: "My Profile", href: "/admin/profile", icon: Icons.Profile },
        { name: "Edit Profile", href: "/admin/profile/edit", icon: Icons.Edit },
        { name: "Help", href: "/admin/help", icon: Icons.Help },
        { name: "Logout", href: "/logout", icon: Icons.Logout, color: "text-rose-500" },
    ];

    // Close dropdowns on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
            if (usersRef.current && !usersRef.current.contains(event.target as Node)) {
                setIsUsersOpen(false);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsProfileOpen(false);
                setIsUsersOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    return (
        <nav className="fixed top-0 left-0 right-0 h-20 bg-white border-b border-slate-200/60 z-50 flex items-center justify-between px-8 md:px-12 backdrop-blur-md bg-white/80">
            {/* Left Section: Branding & Navigation */}
            <div className="flex items-center gap-12">
                <Link href="/admin" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm transition-transform group-hover:scale-105">
                        <img
                            src="https://static.vecteezy.com/system/resources/previews/003/693/837/large_2x/p-letter-logo-icon-for-business-and-company-vector.jpg"
                            alt="ProjectTrack Logo"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <span className="text-xl font-bold text-[#201E43] tracking-tight">ProjecTrack <span className="text-xs font-black bg-[#201E43] text-white px-1.5 py-0.5 rounded ml-1 uppercase">Admin</span></span>
                </Link>

                <div className="hidden xl:flex items-center gap-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-2.5 px-4 py-2 rounded-xl transition-all duration-300 group ${isActive
                                    ? "bg-[#201E43]/5 text-[#201E43]"
                                    : "text-slate-500 hover:text-[#201E43] hover:bg-slate-50"
                                    } font-semibold text-sm`}
                            >
                                <span className={`${isActive ? "text-[#201E43]" : "text-slate-400 group-hover:text-[#201E43]"} transition-colors`}>
                                    <item.icon />
                                </span>
                                {item.name}
                                {isActive && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#201E43]" />
                                )}
                            </Link>
                        );
                    })}

                    {/* Users Dropdown */}
                    <div className="relative" ref={usersRef}>
                        <button
                            onClick={() => setIsUsersOpen(!isUsersOpen)}
                            className={`flex items-center gap-2.5 px-4 py-2 rounded-xl transition-all duration-300 group ${isUsersOpen || pathname.startsWith("/admin/faculty") || pathname.startsWith("/admin/students")
                                ? "bg-[#201E43]/5 text-[#201E43]"
                                : "text-slate-500 hover:text-[#201E43] hover:bg-slate-50"
                                } font-semibold text-sm focus:outline-none`}
                        >
                            <span className={`${isUsersOpen || pathname.startsWith("/admin/faculty") || pathname.startsWith("/admin/students") ? "text-[#201E43]" : "text-slate-400 group-hover:text-[#201E43]"} transition-colors`}>
                                <Icons.Users />
                            </span>
                            Users
                            <svg className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isUsersOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        <div
                            className={`absolute left-0 mt-3 w-48 bg-white rounded-2xl shadow-2xl shadow-indigo-900/10 border border-slate-100 overflow-hidden transform transition-all duration-300 ease-out z-[60] origin-top-left ${isUsersOpen
                                ? "opacity-100 translate-y-0 scale-100"
                                : "opacity-0 -translate-y-4 scale-95 pointer-events-none"
                                }`}
                        >
                            <div className="p-2">
                                {usersDropdownItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setIsUsersOpen(false)}
                                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group hover:bg-slate-50 text-slate-600 hover:text-[#201E43]"
                                    >
                                        <span className="text-slate-400 group-hover:text-[#201E43] transition-colors">
                                            <item.icon />
                                        </span>
                                        <span className="text-sm font-semibold">{item.name}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Link
                        href="/admin/announcements"
                        className={`flex items-center gap-2.5 px-4 py-2 rounded-xl transition-all duration-300 group ${pathname === "/admin/announcements"
                            ? "bg-[#201E43]/5 text-[#201E43]"
                            : "text-slate-500 hover:text-[#201E43] hover:bg-slate-50"
                            } font-semibold text-sm`}
                    >
                        <span className={`${pathname === "/admin/announcements" ? "text-[#201E43]" : "text-slate-400 group-hover:text-[#201E43]"} transition-colors`}>
                            <Icons.Announcements />
                        </span>
                        Announcements
                        {pathname === "/admin/announcements" && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#201E43]" />
                        )}
                    </Link>
                </div>
            </div>

            {/* Right Section: Admin Avatar & Dropdown */}
            <div className="relative" ref={profileRef}>
                <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-3 p-1.5 pr-4 rounded-full border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-200 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/10"
                    aria-expanded={isProfileOpen}
                    aria-haspopup="true"
                >
                    <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-sm ring-2 ring-indigo-500/10">
                        <img
                            src="https://i.pravatar.cc/100?u=admin"
                            alt="Admin Avatar"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="text-left hidden sm:block">
                        <p className="text-sm font-bold text-[#201E43] leading-none">Admin Head</p>
                        <p className="text-[10px] font-medium text-slate-400 mt-0.5">System Administrator</p>
                    </div>
                    <svg className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {/* Profile Dropdown Menu */}
                <div
                    className={`absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl shadow-indigo-900/10 border border-slate-100 overflow-hidden transform transition-all duration-300 ease-out z-[60] origin-top-right ${isProfileOpen
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 -translate-y-4 scale-95 pointer-events-none"
                        }`}
                >
                    <div className="p-2 border-b border-slate-50 bg-slate-50/30">
                        <div className="px-3 py-2">
                            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-tight">Admin Identity</p>
                            <p className="text-sm font-bold text-[#201E43] mt-1">Super Administrator</p>
                            <p className="text-xs text-slate-500">admin@university.edu</p>
                        </div>
                    </div>
                    <div className="p-2">
                        {profileDropdownItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsProfileOpen(false)}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${item.name === "Logout"
                                    ? "hover:bg-rose-50 text-rose-500"
                                    : "hover:bg-slate-50 text-slate-600 hover:text-[#201E43]"
                                    }`}
                            >
                                <span className={`${item.name === "Logout" ? "text-rose-400" : "text-slate-400 group-hover:text-[#201E43]"} transition-colors`}>
                                    <item.icon />
                                </span>
                                <span className="text-sm font-semibold">{item.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default AdminNavbar;
