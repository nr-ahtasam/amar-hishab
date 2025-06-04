// app/dashboard/page.js
"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const cards = [
  { title: "Customer Due", value: "829239.30", color: "bg-green-500" },
  { title: "Supplier Due", value: "213035.00", color: "bg-purple-600" },
  { title: "Total Products", value: "879", color: "bg-blue-500" },
  { title: "Today Sales", value: "0", color: "bg-yellow-600" },
];

const dailySalesData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i % 12 === 0 ? 12 : i % 12}${i < 12 ? "AM" : "PM"}`,
  Sales: 0,
}));

const monthlySalesData = Array.from({ length: 30 }, (_, i) => ({
  day: `${i + 1}`.padStart(2, "0"),
  Report: i === 2 ? 8600 : i === 3 ? 1300 : 0,
}));

const yearlySalesData = [
  { month: "Jan", Report: 120000 },
  { month: "Feb", Report: 50000 },
  { month: "Mar", Report: 70000 },
  { month: "Apr", Report: 145000 },
  { month: "May", Report: 23000 },
  { month: "Jun", Report: 0 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className={`rounded shadow text-white p-4 flex items-center justify-between ${card.color}`}
          >
            <div>
              <div className="text-xl font-semibold">{card.value}</div>
              <div className="text-sm">{card.title}</div>
            </div>
            <div className="text-5xl opacity-20">💳</div>
          </div>
        ))}
      </div>

      {/* Sales Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white p-4 shadow rounded">
          <div className="mb-2 font-semibold">Daily Sales Graph</div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={dailySalesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" fontSize={10} />
              <YAxis fontSize={10} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="Sales"
                stroke="#3b82f6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <div className="mb-2 font-semibold">Monthly Sales Graph</div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlySalesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" fontSize={10} />
              <YAxis fontSize={10} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="Report"
                stroke="#3b82f6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white p-4 shadow rounded">
          <div className="mb-2 font-semibold">Yearly Sales Graph</div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={yearlySalesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" fontSize={10} />
              <YAxis fontSize={10} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="Report"
                stroke="#3b82f6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <div className="mb-2 font-semibold">Customers Due Amount</div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-purple-900 text-white">
                <th className="px-2 py-1">SL</th>
                <th className="px-2 py-1 text-left">Customer Name</th>
                <th className="px-2 py-1 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="bg-green-50">
              {[
                ["Nayeem rahman", 251100],
                ["Tamim", 241143.87],
                ["Test", 107350],
                ["Jamal Sheikh", 58928],
                ["Mr. Habib", 20900],
              ].map(([name, amount], i) => (
                <tr key={i} className="border-b">
                  <td className="px-2 py-1 text-center">{i + 1}</td>
                  <td className="px-2 py-1">{name}</td>
                  <td className="px-2 py-1 text-right">{amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
