import mockProducts from "../lib/mockData";

export const fetchProducts = async (
  region = "All Regions",
  timeperiod = "All Time",
  category = "All Categories"
) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  let filteredProducts = mockProducts;

  if (region !== "All Regions") {
    filteredProducts = filteredProducts.filter(
      (product) => product.region === region
    );
  }

  if (timeperiod !== "All Time") {
    filteredProducts = filteredProducts.filter(
      (product) => product.month === timeperiod
    );
  }

  if (category !== "All Categories") {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === category
    );
  }

  return filteredProducts.sort((a, b) => b.sales - a.sales);
};

export const getTopProducts = async (limit = 20) => {
  const products = await fetchProducts();
  return products.slice(0, limit);
};

export const getProductsByCategory = async (category) => {
  const products = await fetchProducts("All Regions", "All Time", category);
  return products;
};

export const getProductStats = async () => {
  const products = await fetchProducts();
  const totalProducts = products.length;
  const totalSales = products.reduce((sum, product) => sum + product.sales, 0);
  const averageRating =
    products.reduce((sum, product) => sum + product.rating, 0) / totalProducts;
  const inStockCount = products.filter((product) => product.inStock).length;

  return {
    totalProducts,
    totalSales,
    averageRating: Math.round(averageRating * 10) / 10,
    inStockCount,
    outOfStockCount: totalProducts - inStockCount,
  };
};
