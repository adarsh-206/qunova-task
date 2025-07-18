"use client";

import { useState, useEffect } from "react";
import FilterBar from "../components/FilterBar";
import ProductGrid from "../components/ProductGrid";
import { fetchProducts, getProductStats } from "../utils/api";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [selectedTimeperiod, setSelectedTimeperiod] = useState("All Time");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setError(null);
        const [productsData, statsData] = await Promise.all([
          fetchProducts(selectedRegion, selectedTimeperiod, selectedCategory),
          getProductStats(),
        ]);
        setProducts(productsData);
        setStats(statsData);
      } catch (error) {
        console.error("Error loading initial data:", error);
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProducts(
          selectedRegion,
          selectedTimeperiod,
          selectedCategory
        );
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [selectedRegion, selectedTimeperiod, selectedCategory]);

  const getFilterSummary = () => {
    const filters = [];
    if (selectedRegion !== "All Regions") filters.push(selectedRegion);
    if (selectedTimeperiod !== "All Time") filters.push(selectedTimeperiod);
    if (selectedCategory !== "All Categories") filters.push(selectedCategory);
    return filters.length > 0 ? ` - ${filters.join(", ")}` : "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23f0f0f0%22 fill-opacity=%220.15%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>

      <header className="relative z-10 bg-white/10 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="py-16 text-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">
                  Live Data
                </span>
              </div>

              <h1 className="text-6xl sm:text-7xl font-black bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent tracking-tight">
                Market Pulse
              </h1>

              <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
                Discover trending products and market opportunities with
                real-time analytics and insights
              </p>
            </div>

            {stats && (
              <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {[
                  {
                    label: "Products Tracked",
                    value: stats.totalProducts,
                    icon: "🏷️",
                    color: "from-blue-500 to-cyan-500",
                  },
                  {
                    label: "Total Revenue",
                    value: `₹${stats.totalSales.toLocaleString()}`,
                    icon: "💎",
                    color: "from-emerald-500 to-teal-500",
                  },
                  {
                    label: "Customer Rating",
                    value: `${stats.averageRating}★`,
                    icon: "⭐",
                    color: "from-amber-500 to-orange-500",
                  },
                  {
                    label: "Available Now",
                    value: stats.inStockCount,
                    icon: "✨",
                    color: "from-purple-500 to-pink-500",
                  },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="group relative bg-white/30 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/20"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
                    ></div>
                    <div className="relative">
                      <div className="text-3xl mb-3">{stat.icon}</div>
                      <div className="text-3xl font-bold text-gray-900 mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm font-medium text-gray-600">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="mb-10">
          <div className="bg-white/40 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
            <FilterBar
              selectedRegion={selectedRegion}
              selectedTimeperiod={selectedTimeperiod}
              selectedCategory={selectedCategory}
              onRegionChange={setSelectedRegion}
              onTimeperiodChange={setSelectedTimeperiod}
              onCategoryChange={setSelectedCategory}
            />
          </div>
        </div>

        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <h2 className="text-4xl font-bold text-gray-900">
                Trending Products{getFilterSummary()}
              </h2>
              <div className="flex items-center gap-3">
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-gray-600 font-medium">
                      Analyzing market data...
                    </span>
                  </div>
                ) : error ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-red-500"></div>
                    <span className="text-red-600 font-medium">{error}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-gray-700 font-semibold">
                      {products.length} product
                      {products.length !== 1 ? "s" : ""} discovered
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => window.location.reload()}
                className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl hover:from-violet-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <svg
                  className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Refresh Data
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-8 p-6 bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-2xl shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-red-800 font-semibold">
                  Something went wrong
                </h3>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="relative">
          {loading && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-20 rounded-3xl">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <div className="space-y-2">
                  <p className="text-gray-800 font-semibold">
                    Loading market insights...
                  </p>
                  <p className="text-gray-600 text-sm">
                    Analyzing trending products
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white/30 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
            <ProductGrid products={products} loading={loading} />
          </div>
        </div>

        {!loading && !error && products.length === 0 && (
          <div className="text-center py-20">
            <div className="space-y-6">
              <div className="w-24 h-24 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center mx-auto">
                <span className="text-4xl">🔍</span>
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-gray-900">
                  No products match your criteria
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Try adjusting your filters or explore different categories to
                  discover trending products.
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedRegion("All Regions");
                  setSelectedTimeperiod("All Time");
                  setSelectedCategory("All Categories");
                }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-xl hover:from-violet-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Reset All Filters
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
