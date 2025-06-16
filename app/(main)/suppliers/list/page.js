"use client";

import { useTheme } from "../../../context/ThemeContext";

const suppliersData = [
  {
    id: 1,
    name: "Supplier A",
    contact: "123-456-7890",
    email: "a@example.com",
    due: 500.0,
  },
  {
    id: 2,
    name: "Supplier B",
    contact: "098-765-4321",
    email: "b@example.com",
    due: 1200.5,
  },
  {
    id: 3,
    name: "Supplier C",
    contact: "111-222-3333",
    email: "c@example.com",
    due: 0.0,
  },
  {
    id: 4,
    name: "Supplier D",
    contact: "444-555-6666",
    email: "d@example.com",
    due: 75.25,
  },
];

export default function SupplierListPage() {
  const { theme } = useTheme();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6" style={{ color: theme.text }}>
        Supplier List
      </h1>
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead style={{ backgroundColor: theme.primary, color: "white" }}>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Due Amount
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {suppliersData.map((supplier, index) => (
              <tr
                key={supplier.id}
                className={`hover:bg-gray-50 dark:hover:bg-gray-700 ${
                  index % 2 === 0
                    ? "bg-white dark:bg-gray-800"
                    : "bg-gray-50 dark:bg-gray-900"
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">
                  {supplier.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  {supplier.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  {supplier.contact}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  {supplier.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  ৳{supplier.due.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
