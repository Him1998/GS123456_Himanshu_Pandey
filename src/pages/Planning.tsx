import { useState, useEffect, useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell,
  LineChart, Line, CartesianGrid,
} from "recharts";

const PAGE_SIZE = 500; // Load 500 rows at a time

const Planning = () => {
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const storedData = localStorage.getItem("excelData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      console.log("Parsed Planning Data:", parsedData["Planning"]?.length || 0);
      setData(parsedData["Planning"] || []);
    }
  }, []);

  const paginatedData = useMemo(() => {
    const startIdx = (currentPage - 1) * PAGE_SIZE;
    return data.slice(startIdx, startIdx + PAGE_SIZE);
  }, [data, currentPage]);

  // **1️⃣ SKU-wise Sales Units Distribution (Bar Chart)**
  const skuSales = useMemo(() => {
    return paginatedData.reduce((acc, item) => {
      const sku = item["SKU"] || "Unknown";
      acc[sku] = (acc[sku] || 0) + Number(item["Sales Units"] || 0);
      return acc;
    }, {} as Record<string, number>);
  }, [paginatedData]);

  const skuBarData = Object.keys(skuSales).map((sku) => ({
    SKU: sku,
    Sales: skuSales[sku],
  }));

  // **2️⃣ Store-wise Sales Performance (Pie Chart)**
  const storeSales = useMemo(() => {
    return paginatedData.reduce((acc, item) => {
      const store = item["Store"] || "Unknown";
      acc[store] = (acc[store] || 0) + Number(item["Sales Units"] || 0);
      return acc;
    }, {} as Record<string, number>);
  }, [paginatedData]);

  const storePieData = Object.keys(storeSales).map((store) => ({
    name: store,
    value: storeSales[store],
  }));

  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

  // **3️⃣ Weekly Sales Trend (Line Chart)**
  const weekSales = useMemo(() => {
    return paginatedData.reduce((acc, item) => {
      const week = item["Week"] || "Unknown";
      acc[week] = (acc[week] || 0) + Number(item["Sales Units"] || 0);
      return acc;
    }, {} as Record<string, number>);
  }, [paginatedData]);

  const weekLineData = Object.keys(weekSales).map((week) => ({
    Week: week,
    Sales: weekSales[week],
  }));

  const totalPages = Math.ceil(data.length / PAGE_SIZE);

  return (
    <div className="w-100">
      <h1 className="text-2xl font-bold mb-4">Planning Insights</h1>

      {/* Pagination Controls */}
      <div className="mb-4 flex gap-4">
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-lg">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* SKU-wise Sales Distribution */}
      <h2 className="text-xl font-semibold mt-6">SKU-wise Sales Distribution</h2>
      <BarChart width={600} height={300} data={skuBarData}>
        <XAxis dataKey="SKU" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Sales" fill="#8884d8" />
      </BarChart>

      {/* Store-wise Sales Performance */}
      {storePieData.length > 0 ? (
        <>
          <h2 className="text-xl font-semibold mt-6">Store-wise Sales Performance</h2>
          <PieChart width={400} height={300}>
            <Pie data={storePieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
              {storePieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </>
      ) : (
        <p className="mt-4 text-gray-500">No valid store data available.</p>
      )}

      {/* Weekly Sales Trend */}
      <h2 className="text-xl font-semibold mt-6">Weekly Sales Trend</h2>
      <LineChart width={600} height={300} data={weekLineData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Week" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Sales" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
};

export default Planning;
