"use client";

import { Home, Info, Briefcase, Mail, Menu, LogOut } from "lucide-react";
import Link from "next/link"; // Import Next.js Link
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react"; // Import signOut from next-auth

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { icon: <Home />, label: "Home", href: "/" },
    { icon: <Info />, label: "About", href: "/about" },
    { icon: <Briefcase />, label: "Services", href: "/services" },
    { icon: <Mail />, label: "Contact", href: "/contact" },
  ];

  // Adjust sidebar width dynamically
  const sidebarWidth = isCollapsed ? "4rem" : "16rem";
  useEffect(() => {
    // Set CSS variable for dynamic width
    document.documentElement.style.setProperty("--sidebar-width", sidebarWidth);
  }, [sidebarWidth]);

  // Auto-collapse sidebar on small devices
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsCollapsed(true);
      }
    };

    // Initial check
    handleResize();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`bg-white shadow-md transition-all duration-300 fixed top-14 left-0 h-[calc(100vh-3.5rem)] flex flex-col justify-between`}
      style={{ width: sidebarWidth }}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-4 right-[-12px] bg-white border border-gray-300 rounded-full shadow-md p-2 text-black font-semibold hover:text-blue-800 hover:shadow-lg transition-transform duration-300"
        style={{
          transform: isCollapsed ? "rotate(0deg)" : "rotate(180deg)",
        }}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Menu Items */}
      <ul className="mt-12 space-y-2">
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link
              href={item.href}
              className="flex items-center px-4 py-2 space-x-4 text-black transition-colors duration-200 hover:bg-blue-100 rounded-md"
            >
              <div className="w-6 h-6 text-black">{item.icon}</div>
              {!isCollapsed && <span className="font-semibold">{item.label}</span>}
            </Link>
          </li>
        ))}
      </ul>

      {/* Logout Button */}
      <button
        className="mb-4 flex items-center w-full px-4 py-2 space-x-4 text-black hover:bg-red-100 transition-colors duration-200"
        onClick={() => signOut({ callbackUrl: "/" })} // Redirects to home after signing out
      >
        <LogOut className="w-6 h-6" />
        {!isCollapsed && <span className="font-semibold">Logout</span>}
      </button>
    </div>
  );
};

export default Sidebar;
