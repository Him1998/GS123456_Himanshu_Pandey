import React, { useState, useEffect } from "react";

const Planning = () => {
  const [planningData, setPlanningData] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("skuData");
    if (storedData) {
      setPlanningData(JSON.parse(storedData));
    }
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Planning</h1>

      {planningData.length > 0 ? (
        <ul className="list-disc pl-5">
          {planningData.map((item, index) => (
            <li key={index}>
              <strong>{item.name}</strong> ({item.category}) - Stock: {item.stock}
            </li>
          ))}
        </ul>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default Planning;
