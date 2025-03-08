import React, { useState, useEffect, useMemo } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid,
  BarChart, Bar, PieChart, Pie, Cell,
} from "recharts";

const Analytics = () => {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    const storedData = localStorage.getItem("excelData");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  // **1️⃣ Sales Trends Over Weeks (Line Chart)**
  const salesTrendData = useMemo(() => {
    if (!data.Chart) return [];
    return data.Chart.map((item: any) => ({
      Week: item.Week,
      Sales: item["Sales Dollars"],
      GMPercent: item["GM %"] * 100,
    }));
  }, [data]);

  // **2️⃣ Top Performing Stores (Bar Chart)**
  const storeSales = useMemo(() => {
    if (!data.Calculations) return [];
    return data.Calculations.reduce((acc: any, item: any) => {
      const store = item.Store || "Unknown";
      acc[store] = (acc[store] || 0) + item["Sales Dollars"];
      return acc;
    }, {});
  }, [data]);

  const storeBarData = Object.keys(storeSales).map((store) => ({
    Store: store,
    Sales: storeSales[store],
  }));

  // **3️⃣ Gross Margin % vs Sales (Pie Chart)**
  const salesVsGMPie = useMemo(() => {
    if (!data.Chart) return [];
    return data.Chart.map((item: any) => ({
      name: `Week ${item.Week}`,
      Sales: item["Sales Dollars"],
      GMPercent: item["GM %"] * 100,
    }));
  }, [data]);

  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

  // **4️⃣ Category-Wise Revenue Breakdown (Bar Chart)**
  const categorySales = useMemo(() => {
    if (!data.SKUs || !data.Calculations) return [];
    return data.Calculations.reduce((acc: any, item: any) => {
      const sku = item.SKU;
      const skuDetails = data.SKUs.find((s: any) => s.ID === sku);
      const category = skuDetails?.Class || "Unknown";
      acc[category] = (acc[category] || 0) + item["Sales Dollars"];
      return acc;
    }, {});
  }, [data]);

  const categoryBarData = Object.keys(categorySales).map((category) => ({
    Category: category,
    Revenue: categorySales[category],
  }));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Analytics Dashboard</h1>

      {/* Sales Trends */}
      <h2 className="text-xl font-semibold mt-6">📊 Sales Trends Over Weeks</h2>
      <LineChart width={600} height={300} data={salesTrendData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Week" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Sales" stroke="#8884d8" />
      </LineChart>

      {/* Store Performance */}
      <h2 className="text-xl font-semibold mt-6">🏬 Top Performing Stores</h2>
      <BarChart width={600} height={300} data={storeBarData}>
        <XAxis dataKey="Store" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Sales" fill="#FF8042" />
      </BarChart>

      {/* Gross Margin vs Sales (Pie Chart) */}
      <h2 className="text-xl font-semibold mt-6">💰 Gross Margin % vs Sales</h2>
      <PieChart width={400} height={300}>
        <Pie data={salesVsGMPie} dataKey="GMPercent" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
          {salesVsGMPie.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>

      {/* Category-wise Revenue Breakdown */}
      <h2 className="text-xl font-semibold mt-6">🏷️ Category-Wise Revenue Breakdown</h2>
      <BarChart width={600} height={300} data={categoryBarData}>
        <XAxis dataKey="Category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Revenue" fill="#0088FE" />
      </BarChart>
    </div>
  );
};

export default Analytics;
