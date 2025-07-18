# 🛍️ Live Market Insights of Top Products

A frontend web application that provides live or simulated insights into top-selling products. Designed to assist distributors in making informed stocking decisions, it features a clean, responsive interface and mock data generation using `@faker-js/faker`.

Built with **Next.js** and **Tailwind CSS**, the application is optimized for performance, usability, and ease of deployment.

---

## 🚀 Features

- 🔹 Card-based UI displaying:
  - Product image
  - Product name
  - Price
  - Rating
- 🌐 Region filter (e.g., Maharashtra, Delhi)
- 🗓️ Time period filter (e.g., This Month, January)
- 📱 Responsive and accessible design
- ⚡ Fast and user-friendly performance
- 🧪 Simulated data using `@faker-js/faker`

---

## 🧪 Tech Stack

- **Framework:** [Next.js (App Router)](https://nextjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Mock Data:** [`@faker-js/faker`](https://github.com/faker-js/faker)
- **Deployment:** [Vercel](https://vercel.com/)

---

## 🧰 Installation

```bash
# 1. Clone the repository
git clone https://github.com/adarsh-206/qunova-task.git

# 2. Navigate to the project directory
cd qunova-task

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev

# 5. Build for production
npm run build

# 6. Start the production server
npm run start
```

## 🔄 Faker.js

The application uses @faker-js/faker, a popular library for generating fake but realistic-looking data. Since this project does not connect to a real backend or API, faker.js allows us to simulate dynamic product listings with randomized but believable content.

🧪 Generated Product Fields

- 📦 name: A realistic-sounding product name (e.g., "Ergonomic Cotton Shirt")

- 🖼️ image: A product image URL (generated using Faker’s image utilities or placeholders)

- 💰 price: A randomized price in a reasonable range

- ⭐ rating: A customer rating between 1 and 5
