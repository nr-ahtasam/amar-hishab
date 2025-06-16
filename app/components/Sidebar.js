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
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
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
  {
    label: "Suppliers",
    icon: <MdOutlineStore />,
    subItems: [
      { label: "Suppliers List", url: "/suppliers/list" },
      { label: "Due Received List", url: "/suppliers/due-received" },
      { label: "Suppliers Due Paid List", url: "/suppliers/due-paid" },
      { label: "Suppliers Due Dismiss List", url: "/suppliers/due-dismiss" },
    ],
  },
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
  const [openSubmenu, setOpenSubmenu] = useState(null); // State to manage open submenu
  const router = useRouter();

  const handleMenuClick = (item) => {
    if (item.subItems) {
      // If it has sub-items, toggle the submenu
      setOpenSubmenu(openSubmenu === item.label ? null : item.label);
    } else {
      // If no sub-items, navigate
      setActive(item.label);
      router.push(item.url);
      onClose();
    }
  };

  const handleSubItemClick = (subItem) => {
    setActive(subItem.label);
    router.push(subItem.url);
    onClose();
    setOpenSubmenu(null); // Close submenu after navigation
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
          <div key={item.label}>
            <div
              onClick={() => handleMenuClick(item)}
              className={`flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-indigo-100 ${
                active === item.label
                  ? "bg-indigo-50 text-indigo-600 font-semibold"
                  : "text-gray-700"
              }`}
            >
              <div className="text-xl">{item.icon}</div>
              <span className="text-sm">{item.label}</span>
              {item.subItems && (
                <span className="ml-auto">
                  {openSubmenu === item.label ? (
                    <MdKeyboardArrowUp className="text-lg" />
                  ) : (
                    <MdKeyboardArrowDown className="text-lg" />
                  )}
                </span>
              )}
            </div>
            {item.subItems && openSubmenu === item.label && (
              <div className="pl-8 pt-1 pb-1 space-y-1">
                {item.subItems.map((subItem) => (
                  <div
                    key={subItem.label}
                    onClick={() => handleSubItemClick(subItem)}
                    className={`flex items-center p-2 rounded-md cursor-pointer hover:bg-indigo-100 ${
                      active === subItem.label
                        ? "bg-indigo-50 text-indigo-600 font-semibold"
                        : "text-gray-700"
                    }`}
                  >
                    <span className="text-[14px]">{subItem.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
