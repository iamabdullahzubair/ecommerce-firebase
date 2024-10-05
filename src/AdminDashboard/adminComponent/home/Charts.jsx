import React, { useEffect, useState } from "react";

import { fetchMonthlySalesData } from "./statics";
import LineChartComponent from "./chart/LineChart";
import SalesPieChart from "./chart/SalesPieChart";

const Charts = () => {
  const [salesData, setSalesData] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchSalesData() {
    setLoading(true);
    try {
      const { success, data, message } = await fetchMonthlySalesData();
      if (success) {
        // console.log(data);
        setSalesData(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSalesData();
  }, []);

  return (
    <>
      {/* PIE CHART */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold dark:text-gray-200 mb-4">
          Sales Distribution for Current Month
        </h3>
        <div className="min-h-64 bg-white dark:bg-gray-700 flex items-center justify-center">
          <SalesPieChart />
        </div>
      </div>
      {/* LINE CHART */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold dark:text-gray-200 mb-4">
          Sales Overview
        </h3>
        {/* Placeholder for chart */}
        <div className="h-64 bg-white dark:bg-gray-700 flex items-center justify-center pt-5 px-2">
          <LineChartComponent loading={loading} salesData={salesData} />
        </div>
      </div>
     
    </>
  );
};

export default Charts;
