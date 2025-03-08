import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const Dashboard = () => {
    const [data, setData] = useState<Record<string, any[]>>({});
    const [activeTab, setActiveTab] = useState<string | null>(null);

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
            workbook.SheetNames.forEach((sheetName) => {
                const sheet = workbook.Sheets[sheetName];
                allData[sheetName] = XLSX.utils.sheet_to_json(sheet);
            });

            localStorage.setItem("excelData", JSON.stringify(allData));
            alert("Upload Successful!");
            setData(allData);
        };

        reader.readAsArrayBuffer(file);
    };

    const updateLocalStorage = (updatedData: Record<string, any[]>) => {
        localStorage.setItem("excelData", JSON.stringify(updatedData));
    };

    const handleCellChange = (sheet: string, rowIndex: number, key: string, value: string) => {
        const updatedData = { ...data };
        updatedData[sheet][rowIndex][key] = value;
        setData(updatedData);
        updateLocalStorage(updatedData);
    };

    const addRow = (sheet: string) => {
        const updatedData = { ...data };
        const newRow: Record<string, any> = {};

        // Initialize new row with empty values
        Object.keys(updatedData[sheet][0]).forEach((key) => {
            newRow[key] = "";
        });

        updatedData[sheet].push(newRow);
        setData(updatedData);
        updateLocalStorage(updatedData);
    };

    const deleteRow = (sheet: string, rowIndex: number) => {
        const updatedData = { ...data };
        updatedData[sheet].splice(rowIndex, 1); // Remove row
        setData(updatedData);
        updateLocalStorage(updatedData);
    };

    const renderChart = (sheetData: { [key: string]: any }[]) => {
        if (!sheetData || sheetData.length === 0) return null;

        const keys = Object.keys(sheetData[0]);
        if (keys.length < 2) return <p>No numerical data for visualization.</p>;

        const chartData = sheetData.map((row) => ({
            category: row[keys[0]],
            value: Number(row[keys[1]]) || 0,
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
                        className={`px-4 py-2 ${activeTab === sheet ? "bg-blue-500 text-gray" : "bg-gray-200"}`}
                        onClick={() => setActiveTab(sheet)}
                    >
                        {sheet}
                    </button>
                ))}
            </div>

            {/* Table Display */}
            {activeTab && data[activeTab]?.length ? (
                <div className="mt-4">
                    <h2 className="text-xl font-semibold mb-2">{activeTab} Data</h2>

                    <button
                        className="px-4 py-2 bg-green-500 text-gray rounded mb-2"
                        onClick={() => addRow(activeTab)}
                    >
                        ➕ Add Row
                    </button>

                    <div className="overflow-x-auto">
                        <table className="border-collapse w-full mt-2">
                            <thead>
                                <tr className="border-b bg-gray-100">
                                    {Object.keys(data[activeTab]?.[0] || {}).map((key) => (
                                        <th key={key} className="p-2 border">{key}</th>
                                    ))}
                                    <th className="p-2 border">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data[activeTab]?.map((row: Record<string, unknown>, rowIndex: number) => (
                                    <tr key={rowIndex}>
                                        {Object.entries(row).map(([key, value], colIndex) => (
                                            <td key={colIndex} className="p-2 border">
                                                <input
                                                    type="text"
                                                    value={String(value)}
                                                    onChange={(e) => handleCellChange(activeTab, rowIndex, key, e.target.value)}
                                                    className="border p-1 w-full"
                                                />
                                            </td>
                                        ))}
                                        <td className="p-2 border text-center">
                                            <button
                                                className="bg-red-500 text-gray px-2 py-1 rounded"
                                                onClick={() => deleteRow(activeTab, rowIndex)}
                                            >
                                                ❌ Delete
                                            </button>
                                        </td>
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
