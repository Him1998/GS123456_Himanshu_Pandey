import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const SKUPage = () => {
    const [skuData, setSkuData] = useState([]);

    useEffect(() => {
        const storedDataString = localStorage.getItem("excelData");
        if (storedDataString) {
            const storedData = JSON.parse(storedDataString);
            console.log("Loaded Data:", storedData); // Debugging
            if (storedData["SKUs"]) {
                setSkuData(storedData["SKUs"]);
            } else {
                console.warn("SKU sheet not found in the uploaded file.");
            }
        }
    }, []);

    return (
        <div className="p-6 container">
            <h1 className="text-2xl font-bold mb-4">SKU Data</h1>

            {skuData.length > 0 ? (
                <>
                    {/* Chart */}
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold">SKU Distribution</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={skuData}>
                                <XAxis dataKey="Label" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="Price" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-lg font-semibold">SKU Distribution</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={skuData}>
                                <XAxis dataKey="Department" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="Price" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-lg font-semibold">SKU Distribution</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={skuData}>
                                <XAxis dataKey="Class" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="Price" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-lg font-semibold">SKU Distribution</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={skuData}>
                                <XAxis dataKey="Cost" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="Price" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    {/* Table */}
                    {/* <div className="overflow-x-auto">
                        <table className="border-collapse w-full mt-2">
                            <thead>
                                <tr className="border-b bg-gray-100">
                                    {Object.keys(skuData[0] || {}).map((key) => (
                                        <th key={key} className="p-2 border">{key}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {skuData.map((row, rowIndex) => (
                                    <tr key={rowIndex} className="border-b">
                                        {Object.values(row).map((value, colIndex) => (
                                            <td key={colIndex} className="p-2 border">{value}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div> */}
                </>
            ) : (
                <p>No SKU data found. Please upload a file.</p>
            )}
        </div>
    );
};

export default SKUPage;
