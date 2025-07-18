import { faker } from "@faker-js/faker";

const regions = ["All Regions", "Maharashtra", "Delhi", "Karnataka"];
const timeperiods = ["All Time", "January", "February", "March"];

const productCategories = [
  "Electronics",
  "Home & Garden",
  "Sports & Fitness",
  "Fashion",
  "Books",
  "Health & Beauty",
  "Automotive",
  "Kitchen",
];

const generateProduct = (id) => {
  const category = faker.helpers.arrayElement(productCategories);
  const region = faker.helpers.arrayElement(regions.slice(1));
  const month = faker.helpers.arrayElement(timeperiods.slice(1));

  return {
    id,
    name: faker.commerce.productName(),
    price: parseInt(faker.commerce.price({ min: 500, max: 15000 })),
    rating: parseFloat(
      faker.number.float({ min: 3.0, max: 5.0, precision: 0.1 })
    ),
    image: `https://picsum.photos/300/200?random=${id}`,
    region,
    month,
    sales: faker.number.int({ min: 100, max: 2000 }),
    category,
    description: faker.commerce.productDescription(),
    brand: faker.company.name(),
    inStock: faker.datatype.boolean(),
    discount: faker.number.int({ min: 0, max: 30 }),
  };
};

const generateMockProducts = (count = 50) => {
  const products = [];
  for (let i = 1; i <= count; i++) {
    products.push(generateProduct(i));
  }
  return products;
};

const mockProducts = generateMockProducts();

export { regions, timeperiods, productCategories };
export default mockProducts;
