"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

const HeaderWrapper = () => {
    const pathname = usePathname();

    // Hide header on login page, student dashboard, faculty area, or admin area
    if (pathname === "/login" || pathname.startsWith("/student") || pathname.startsWith("/faculty") || pathname.startsWith("/admin")) return null;

    return <Header />;
};

export default HeaderWrapper;
