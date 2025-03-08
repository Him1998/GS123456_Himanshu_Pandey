import React, { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [totalStock, setTotalStock] = useState(0);
  const [categoryDistribution, setCategoryDistribution] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("skuData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setAnalyticsData(parsedData);

      // Calculate total stock
      const total = parsedData.reduce((sum, item) => sum + (item.stock || 0), 0);
      setTotalStock(total);

      // Calculate category-wise distribution
      const categoryMap = {};
      parsedData.forEach((item) => {
        categoryMap[item.category] = (categoryMap[item.category] || 0) + 1;
      });

      // Convert category map to chart data
      const chartData = Object.entries(categoryMap).map(([category, count]) => ({
        name: category,
        value: count,
      }));
      setCategoryDistribution(chartData);
    }
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Analytics</h1>

      <p className="text-lg mb-4">Total Stock: <strong>{totalStock}</strong></p>

      {categoryDistribution.length > 0 ? (
        <PieChart width={400} height={400}>
          <Pie
            data={categoryDistribution}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
            label
          >
            {categoryDistribution.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      ) : (
        <p>No category data available</p>
      )}
    </div>
  );
};

export default Analytics;
