"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";

const quickLinks = [
  { label: "Sale Report", color: "bg-red-500" },
  { label: "Stock", color: "bg-green-500" },
  { label: "Today's Summary", color: "bg-blue-500" },
  { label: "Return Orders", color: "bg-yellow-500" },
  { label: "POS", color: "bg-emerald-500" },
  { label: "Wholesale", color: "bg-lime-500" },
  { label: "Order", color: "bg-purple-500" },
];

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main area */}
      <div className="flex-1 flex flex-col bg-gray-50 lg:ml-64">
        {/* Topbar */}
        <div className="flex items-center justify-end bg-white shadow px-3 py-5 ">
          {/* Right: Quick Links */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-700 font-medium">
              Quick Links:
            </span>
            {quickLinks.map((link) => (
              <button
                key={link.label}
                className={`text-white text-xs font-semibold px-3 py-1 rounded shadow ${link.color}`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <main className="flex-1 p-4 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
