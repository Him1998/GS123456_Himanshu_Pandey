# React + TypeScript + Vite

# Analytics Dashboard

This project is a **React-based Analytics Dashboard**, built using **Vite** for fast development and optimized performance. It provides data insights through interactive charts and visualizations using **Recharts**.

## 🚀 Features

- 📊 **Sales Trends Over Time** (Line Chart)
- 🏬 **Top Performing Stores** (Bar Chart)
- 💰 **Gross Margin % vs Sales** (Pie Chart)
- 🏷️ **Category-Wise Revenue Breakdown** (Bar Chart)
- ⚡ **Optimized for Large Datasets**
- 🔥 **Built with Vite for Fast Refresh**
- ✅ **TypeScript & ESLint for Code Quality**

## 📦 Tech Stack

- **React + Vite** for a fast development environment
- **TypeScript** for better maintainability
- **Recharts** for data visualization
- **ESLint + Prettier** for consistent coding standards

## 📌 Installation

```sh
# Clone the repository
git clone https://github.com/Him1998/GS123456_Himanshu_Pandey.git
cd GS123456_Himanshu_Pandey

# Install dependencies
yarn install  # or npm install

# Start the development server
yarn dev  # or npm run dev
```

## 📊 Data Structure

The dashboard processes and visualizes **four key data categories**:

1. **Calculations** → Sales, GM%, GM Dollars, Cost
2. **Calendar** → Month, Week Labels
3. **Chart Data** → Sales, GM%, Week-wise trends
4. **SKUs & Stores** → Product & Store details

Data is loaded from **localStorage** and processed dynamically for visualization.

## 📜 ESLint Configuration

For production-ready development, update your **ESLint config** to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install **React-specific ESLint plugins**:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

## 🎯 Contributing

Contributions are welcome! Feel free to fork the repo, submit PRs, or report issues.

## 🛠️ Future Enhancements

- 📈 Advanced filtering & drill-down reports
- 🔗 API integration for real-time data
- 🎨 Customizable themes & UI enhancements

## 📜 License

MIT License. Feel free to use and modify as needed!

