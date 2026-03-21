"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

// Icons (SVG-based for zero dependencies and maximum performance)
const Icons = {
    Dashboard: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" /></svg>
    ),
    Supervision: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
    ),
    Reviews: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
    ),
    Meetings: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
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
    Rubrics: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" ry="1" /><path d="M9 14l2 2 4-4" /></svg>
    ),
    Help: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
    ),
    Logout: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
    )
};
interface UserProps {
    name: string;
    email: string;
}
const FacultyNavbar = ({ user }: { user?: UserProps }) => {
    const pathname = usePathname();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const navItems = [
        { name: "Dashboard", href: "/faculty", icon: Icons.Dashboard },
        { name: "My Supervisions", href: "/faculty/supervision", icon: Icons.Supervision },
        { name: "Project Reviews", href: "/faculty/review", icon: Icons.Reviews },
        { name: "Meetings", href: "/faculty/meeting", icon: Icons.Meetings },
        { name: "Announcements", href: "/faculty/announcement", icon: Icons.Announcements },
    ];

    const dropdownItems = [
        { name: "My Profile", href: "/faculty/profile", icon: Icons.Profile },
        { name: "Edit Profile", href: "/faculty/profile/edit", icon: Icons.Edit },
        { name: "Evaluation Rubrics", href: "/faculty/rubrics", icon: Icons.Rubrics },
        { name: "Help", href: "/faculty/help", icon: Icons.Help },
        { name: "Logout", href: "/logout", icon: Icons.Logout, color: "text-rose-500" },
    ];


    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", handleEscape);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isDropdownOpen]);

    return (
        <nav className="fixed top-0 left-0 right-0 h-20 bg-white border-b border-slate-200/60 z-50 flex items-center justify-between px-8 md:px-12 backdrop-blur-md bg-white/80">
            {/* Left Section: Branding & Navigation */}
            <div className="flex items-center gap-12">
                <Link href="/faculty" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm transition-transform group-hover:scale-105">
                        <img
                            src="https://static.vecteezy.com/system/resources/previews/003/693/837/large_2x/p-letter-logo-icon-for-business-and-company-vector.jpg"
                            alt="ProjectTrack Logo"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <span className="text-xl font-bold text-[#201E43] tracking-tight">ProjecTrack</span>
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
                </div>
            </div>

            {/* Right Section: Faculty Avatar & Dropdown */}
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-3 p-1.5 pr-4 rounded-full border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-200 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/10"
                    // aria-expanded={isDropdownOpen}
                    // aria-haspopup="true"
                >
                    <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-sm">
                        <img
                            src={`https://i.pravatar.cc/100?u=${user?.email || 'default'}`}
                            alt="Faculty Avatar"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="text-left hidden sm:block">
                        <p className="text-sm font-bold text-[#201E43] leading-none">{user?.name || "Faculty "}</p>
                        <p className="text-[10px] font-medium text-slate-400 mt-0.5">{user?.email || "Verify Profile"}</p>
                    </div>
                    <svg className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {/* Dropdown Menu */}
                <div
                    className={`absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl shadow-indigo-900/10 border border-slate-100 overflow-hidden transform transition-all duration-300 ease-out z-[60] origin-top-right ${isDropdownOpen
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 -translate-y-4 scale-95 pointer-events-none"
                        }`}
                >
                    <div className="p-2 border-b border-slate-50 bg-slate-50/30">
                        <div className="px-3 py-2">
                            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-tight">Faculty Identity</p>
                            <p className="text-sm font-bold text-[#201E43] mt-1">{user?.name}</p>
                            <p className="text-xs text-slate-500">{user?.email}</p>
                        </div>
                    </div>
                    <div className="p-2">
                        {dropdownItems.map((item, index) => {
                            const isItemActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsDropdownOpen(false)}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                                        item.name === "Logout"
                                            ? "hover:bg-rose-50 text-rose-500"
                                            : isItemActive
                                                ? "bg-indigo-50 text-indigo-600 shadow-sm shadow-indigo-100"
                                                : "hover:bg-slate-50 text-slate-600 hover:text-indigo-600"
                                    }`}
                                >
                                    <span className={`${
                                        item.name === "Logout" 
                                            ? "text-rose-400" 
                                            : isItemActive 
                                                ? "text-indigo-500" 
                                                : "text-slate-400 group-hover:text-indigo-500"
                                    } transition-colors`}>
                                        <item.icon />
                                    </span>
                                    <span className={`text-sm ${isItemActive ? "font-black" : "font-semibold"}`}>{item.name}</span>
                                    {isItemActive && item.name !== "Logout" && (
                                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                                    )}
                                </Link>
                            );
                        })}

                    </div>
                </div>
            </div>
        </nav>
    );
};

export default FacultyNavbar;
