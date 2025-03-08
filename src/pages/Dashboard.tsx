import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("skuData");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryString = e.target.result;
      const workbook = XLSX.read(binaryString, { type: "binary" });

      // Read first sheet
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Convert sheet to JSON
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      // Save to localStorage
      localStorage.setItem("skuData", JSON.stringify(jsonData));
      setData(jsonData); // Update UI
      alert("Upload Successful!");
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} className="mb-4" />

      {data.length > 0 ? (
        <table className="border-collapse w-full mt-4">
          <thead>
            <tr className="border-b">
              <th className="p-2">SKU ID</th>
              <th className="p-2">Product Name</th>
              <th className="p-2">Category</th>
              <th className="p-2">Stock</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{item.skuId}</td>
                <td className="p-2">{item.name}</td>
                <td className="p-2">{item.category}</td>
                <td className="p-2">{item.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available. Please upload a file.</p>
      )}
    </div>
  );
};

export default Dashboard;
