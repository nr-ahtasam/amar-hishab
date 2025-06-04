"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import {
  MdAttachMoney,
  MdClose,
  MdDashboard,
  MdInventory,
  MdMessage,
  MdOutlineCategory,
  MdOutlineStore,
  MdPeople,
  MdSettings,
  MdShoppingCart,
  MdWork,
} from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";

const menuItems = [
  { label: "Dashboard", icon: <MdDashboard />, url: "/dashboard" },
  { label: "Suppliers", icon: <MdOutlineStore />, url: "/suppliers" },
  { label: "Customers", icon: <MdPeople />, url: "/customers" },
  { label: "Products", icon: <MdInventory />, url: "/products" },
  { label: "Purchases", icon: <MdShoppingCart />, url: "/purchases" },
  { label: "Inventory", icon: <MdInventory />, url: "/inventory" },
  { label: "Services", icon: <MdWork />, url: "/services" },
  { label: "Sales", icon: <MdAttachMoney />, url: "/sales" },
  { label: "Accounts", icon: <MdAttachMoney />, url: "/accounts" },
  { label: "Quotations", icon: <MdOutlineCategory />, url: "/quotations" },
  { label: "Reports", icon: <TbReportAnalytics />, url: "/reports" },
  { label: "Expenses", icon: <MdAttachMoney />, url: "/expenses" },
  { label: "Assets", icon: <MdOutlineStore />, url: "/assets" },
  { label: "Employees", icon: <FaRegUser />, url: "/employees" },
  { label: "Users", icon: <MdPeople />, url: "/users" },
  { label: "Message", icon: <MdMessage />, url: "/message" },
  { label: "Settings", icon: <MdSettings />, url: "/settings" },
];

export default function Sidebar({ isOpen, onClose }) {
  const [active, setActive] = useState("Dashboard");
  const router = useRouter();

  const handleMenuClick = (item) => {
    setActive(item.label);
    router.push(item.url);
    onClose();
  };

  return (
    <aside
      className={`fixed z-50 top-0 left-0 h-full w-64 bg-white shadow-md  transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      <div className="flex items-center justify-between h-20 px-4 ">
        <Image
          src="/Images/logo.png"
          alt="AmarSolution"
          width={160}
          height={100}
          className="h-20 "
        />

        <button className="lg:hidden" onClick={onClose}>
          <MdClose className="text-xl" />
        </button>
      </div>
      <nav className="p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <div
            key={item.label}
            onClick={() => handleMenuClick(item)}
            className={`flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-indigo-100 ${
              active === item.label
                ? "bg-indigo-50 text-indigo-600 font-semibold"
                : "text-gray-700"
            }`}
          >
            <div className="text-xl">{item.icon}</div>
            <span className="text-sm">{item.label}</span>
          </div>
        ))}
      </nav>
    </aside>
  );
}
