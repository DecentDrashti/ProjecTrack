"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const tabs = [
    { name: "Faculty", href: "/dashboard/faculty" },
    { name: "Student", href: "/dashboard/student" },
    { name: "Admin", href: "/dashboard/admin" },
    { name: "Report & Analysis", href: "/analysis" },
    { name: "Manage Projects", href: "/project" },
  ];

  return (
    <nav className="flex items-center justify-between px-10 py-5 sticky top-0 bg-[#EDF0F5]/80 backdrop-blur-md z-50">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 group">
        <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm transition-transform group-hover:scale-105">
          <img
            src="https://static.vecteezy.com/system/resources/previews/003/693/837/large_2x/p-letter-logo-icon-for-business-and-company-vector.jpg"
            alt="ProjectTrack Logo"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-2xl font-bold tracking-tight text-[#201E43]">
          ProjecTrack
        </div>
      </Link>

      {/* Navigation */}
      <div className="flex bg-white/50 backdrop-blur-sm rounded-full p-1 gap-1 border border-white/20">
        {tabs.map((tab) => {
          const isActive =
            tab.href &&
            (pathname === tab.href ||
              (tab.href !== "/" && pathname.startsWith(tab.href)));

          // Normal Link
          if (!tab.href && !tab.name) return null; {
            return (
              <Link
                key={tab.name}
                href={tab.href}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${isActive
                    ? "bg-[#201E43] text-white shadow-lg"
                    : "text-[#7E8491] hover:text-[#201E43] hover:bg-white/40"
                  }`}
              >
                {tab.name}
              </Link>
            );
          }

          // Dropdown
          // return (
          //   <div key={tab.name} className="relative">
          //     <button
          //       onClick={() =>
          //         setOpenMenu(openMenu === tab.name ? null : tab.name)
          //       }
          //       className="px-6 py-2.5 rounded-full text-sm font-semibold text-[#7E8491] hover:text-[#201E43] hover:bg-white/40 transition-all"
          //     >
          //       {tab.name}
          //     </button>

          //     {openMenu === tab.name && (
          //       <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-xl shadow-xl border overflow-hidden">
          //         {tab.children.map((child) => (
          //           <Link
          //             key={child.name}
          //             href={child.href}
          //             className="block px-4 py-3 text-sm text-[#201E43] hover:bg-[#EDF0F5]"
          //             onClick={() => setOpenMenu(null)}
          //           >
          //             {child.name}
          //           </Link>
          //         ))}
          //       </div>
          //     )}
          //   </div>
          // );
        })}
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <button className="text-[#201E43] hover:opacity-70 transition-opacity">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>

        {/* Notifications */}
        <button className="text-[#201E43] hover:opacity-70 transition-opacity relative">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full border-2 border-[#EDF0F5]"></span>
        </button>

        {/* User */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
            <img
              src="https://i.pravatar.cc/100?u=drashti"
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-sm font-bold text-[#201E43] leading-none">
              D.R
            </p>
            <p className="text-[10px] font-medium text-[#7E8491] mt-0.5">
              drashti@gmail.com
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
