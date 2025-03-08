import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const SKU = () => {
  const [skuData, setSkuData] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("skuData");
    if (storedData) {
      setSkuData(JSON.parse(storedData));
    }
  }, []);

  const columns = [
    { headerName: "SKU ID", field: "skuId", sortable: true, filter: true },
    { headerName: "Product Name", field: "name", sortable: true, editable: true },
    { headerName: "Category", field: "category", sortable: true },
    { headerName: "Stock", field: "stock", sortable: true, editable: true },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">SKU Management</h1>
      <div className="ag-theme-alpine" style={{ height: 400 }}>
        <AgGridReact rowData={skuData} columnDefs={columns} pagination={true} />
      </div>
    </div>
  );
};

export default SKU;
