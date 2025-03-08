import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Dashboard = () => {
    const [data, setData] = useState({});
    const [activeTab, setActiveTab] = useState(null);

    useEffect(() => {
        const storedData = localStorage.getItem("excelData");
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setData(parsedData);
            setActiveTab(Object.keys(parsedData)[0] || null); // Set first sheet as active
        }
    }, []);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const arrayBuffer = e.target?.result as ArrayBuffer;
            const data = new Uint8Array(arrayBuffer);
            const workbook = XLSX.read(data, { type: "array" });

            let allData: Record<string, any[]> = {};

            // Loop through all sheets
            workbook.SheetNames.forEach((sheetName) => {
                const sheet = workbook.Sheets[sheetName];
                allData[sheetName] = XLSX.utils.sheet_to_json(sheet);
            });

            // Store all sheets in localStorage
            localStorage.setItem("excelData", JSON.stringify(allData));

            console.log("Stored Data:", allData);
            alert("Upload Successful!");
            setData(allData); // Update UI with the stored data
        };

        reader.readAsArrayBuffer(file);
    };

    // Function to generate a simple bar chart for each sheet
    const renderChart = (sheetData) => {
        if (!sheetData || sheetData.length === 0) return null;

        // Assuming first column is categorical and second is numerical
        const keys = Object.keys(sheetData[0]);
        if (keys.length < 2) return <p>No numerical data for visualization.</p>;

        const chartData = sheetData.map((row) => ({
            category: row[keys[0]],
            value: Number(row[keys[1]]) || 0, // Convert to number if possible
        }));

        return (
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        );
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

            <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} className="mb-4" />

            {/* Tabs */}
            <div className="flex space-x-4 border-b pb-2">
                {Object.keys(data).map((sheet, index) => (
                    <button
                        key={index}
                        className={`px-4 py-2 ${activeTab === sheet ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                        onClick={() => setActiveTab(sheet)}
                    >
                        {sheet}
                    </button>
                ))}
            </div>

            {/* Table Display */}
            {activeTab && data[activeTab] ? (
                <div className="mt-4">
                    <h2 className="text-xl font-semibold mb-2">{activeTab} Data</h2>
                    <div className="overflow-x-auto">
                        <table className="border-collapse w-full mt-2">
                            <thead>
                                <tr className="border-b bg-gray-100">
                                    {Object.keys(data[activeTab][0] || {}).map((key) => (
                                        <th key={key} className="p-2 border">{key}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data[activeTab].map((row, rowIndex) => (
                                    <tr key={rowIndex} className="border-b">
                                        {Object.values(row).map((value, colIndex) => (
                                            <td key={colIndex} className="p-2 border">{value}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Chart Section */}
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold">Chart for {activeTab}</h3>
                        {renderChart(data[activeTab])}
                    </div>
                </div>
            ) : (
                <p>No data available. Please upload a file.</p>
            )}
        </div>
    );
};

export default Dashboard;
