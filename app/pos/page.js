// app/pos/page.js
"use client";

import { useEffect, useState } from "react";

export default function POSPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [brandSearch, setBrandSearch] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [orderItems, setOrderItems] = useState([]);
  const [isBrandFocused, setIsBrandFocused] = useState(false);
  const [isCategoryFocused, setIsCategoryFocused] = useState(false);

  const [products, setProducts] = useState(
    Array.from({ length: 20 }).map((_, i) => ({
      id: i + 1,
      name: `Product ${i + 1}`,
      price: Math.floor(Math.random() * 1000),
      stock: Math.floor(Math.random() * 10),
      barcode: 42000000 + i,
      image: `https://picsum.photos/seed/${i}/300/300`,
      brand: `Brand ${Math.floor(Math.random() * 3) + 1}`,
      category: `Category ${Math.floor(Math.random() * 3) + 1}`,
    }))
  );

  // Get unique brands and categories
  const uniqueBrands = [...new Set(products.map((p) => p.brand))];
  const uniqueCategories = [...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesBrand = !selectedBrand || product.brand === selectedBrand;
    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesBrand && matchesCategory;
  });

  useEffect(() => {
    const root = document.getElementById("__next");
    if (root) root.classList.add("pos-mode");
    return () => root && root.classList.remove("pos-mode");
  }, []);

  const handleAddToOrder = (product) => {
    const exists = orderItems.find((item) => item.id === product.id);
    if (exists) {
      setOrderItems((items) =>
        items.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setOrderItems((items) => [
        ...items,
        {
          ...product,
          qty: 1,
          discountPercent: 0,
          discountAmount: 0,
        },
      ]);
    }
  };

  const handleQtyChange = (id, change) => {
    setOrderItems((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              qty: Math.max(1, item.qty + change),
            }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setOrderItems((items) => items.filter((item) => item.id !== id));
  };

  const totalAmount = orderItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <div className="flex h-screen">
      {/* Product list */}
      <div className="w-1/2 border-r overflow-y-auto p-2 bg-white">
        <div className="flex gap-3 mb-4 px-4 pt-4">
          <div className="relative flex-1">
            <div className="relative">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Search brand..."
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 hover:border-gray-300 transition-colors"
                  value={brandSearch}
                  onChange={(e) => setBrandSearch(e.target.value)}
                  onFocus={() => setIsBrandFocused(true)}
                  onBlur={() => setTimeout(() => setIsBrandFocused(false), 200)}
                />
                <button
                  onClick={() => {
                    setBrandSearch("");
                    setSelectedBrand("");
                  }}
                  className="px-3 border border-l-0 border-gray-200 rounded-r-lg hover:bg-gray-50"
                >
                  {selectedBrand ? "Clear" : "All"}
                </button>
              </div>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            {isBrandFocused && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                {uniqueBrands
                  .filter((brand) =>
                    brand.toLowerCase().includes(brandSearch.toLowerCase())
                  )
                  .map((brand) => (
                    <div
                      key={brand}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm flex items-center justify-between"
                      onClick={() => {
                        setSelectedBrand(brand);
                        setBrandSearch("");
                        setIsBrandFocused(false);
                      }}
                    >
                      <span>{brand}</span>
                      {selectedBrand === brand && (
                        <svg
                          className="w-4 h-4 text-emerald-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>
          <div className="relative flex-1">
            <div className="relative">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Search category..."
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 hover:border-gray-300 transition-colors"
                  value={categorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                  onFocus={() => setIsCategoryFocused(true)}
                  onBlur={() =>
                    setTimeout(() => setIsCategoryFocused(false), 200)
                  }
                />
                <button
                  onClick={() => {
                    setCategorySearch("");
                    setSelectedCategory("");
                  }}
                  className="px-3 border border-l-0 border-gray-200 rounded-r-lg hover:bg-gray-50"
                >
                  {selectedCategory ? "Clear" : "All"}
                </button>
              </div>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            {isCategoryFocused && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                {uniqueCategories
                  .filter((category) =>
                    category
                      .toLowerCase()
                      .includes(categorySearch.toLowerCase())
                  )
                  .map((category) => (
                    <div
                      key={category}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm flex items-center justify-between"
                      onClick={() => {
                        setSelectedCategory(category);
                        setCategorySearch("");
                        setIsCategoryFocused(false);
                      }}
                    >
                      <span>{category}</span>
                      {selectedCategory === category && (
                        <svg
                          className="w-4 h-4 text-emerald-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 p-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => handleAddToOrder(product)}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-100 hover:border-gray-200"
            >
              <div className="p-3">
                <div className="w-full h-32 bg-gray-50 rounded-md overflow-hidden mb-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium text-gray-900">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-emerald-600">
                      ৳{product.price}
                    </span>
                    <span className="text-xs text-gray-500">
                      Stock: {product.stock}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{product.brand}</span>
                    <span>{product.category}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order panel */}
      <div className="w-1/2 flex flex-col">
        {/* Input/search bar */}
        <div className="p-4 border-b bg-white">
          <input
            type="text"
            placeholder="Search products by name, SKU, or scan barcode..."
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Order table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-green-600 text-white">
                <th className="px-2 py-1 text-left">Name</th>
                <th>Price</th>
                <th>Disc(%)</th>
                <th>Disc Amt</th>
                <th>After Disc</th>
                <th>Qty</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="px-2 py-1">
                    <div className="font-medium text-sm text-gray-800">
                      {item.name}{" "}
                      <span className="text-red-600">({item.stock})</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Barcode: {item.barcode}
                    </div>
                  </td>
                  <td className="text-center">{item.price}</td>
                  <td className="text-center">0</td>
                  <td className="text-center">0</td>
                  <td className="text-center">{item.price}</td>
                  <td className="text-center">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleQtyChange(item.id, -1)}
                        className="bg-pink-600 text-white px-2 rounded"
                      >
                        -
                      </button>
                      <span className="px-2 border rounded text-sm">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => handleQtyChange(item.id, 1)}
                        className="bg-green-600 text-white px-2 rounded"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="text-center">{item.price * item.qty}</td>
                  <td className="text-center">
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals section */}
        <div className="bg-black text-white text-sm p-3 space-y-1">
          <div className="flex justify-between">
            <span>VAT (0%)</span>
            <span>0.00</span>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <span>0.00</span>
          </div>
          <div className="flex justify-between">
            <span>After Discount Price</span>
            <span>{totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Total VAT</span>
            <span>0.00</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total Payable</span>
            <span>{totalAmount.toFixed(2)}</span>
          </div>
        </div>

        {/* Bottom buttons */}
        <div className="flex items-center justify-between bg-purple-700 text-white px-4 py-3 text-lg font-semibold">
          <div>Total : {totalAmount.toFixed(2)} TK</div>
          <div className="flex gap-2">
            <button className="bg-blue-500 px-4 py-1 rounded">Exchange</button>
            <button className="bg-orange-500 px-4 py-1 rounded">Hold</button>
            <button className="bg-red-500 px-4 py-1 rounded">Clear</button>
            <button className="bg-green-500 px-4 py-1 rounded">Payment</button>
          </div>
        </div>
      </div>
    </div>
  );
}
