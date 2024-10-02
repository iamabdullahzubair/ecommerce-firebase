import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import CircularProgress from "@mui/material/CircularProgress"; // MUI Spinner
import { fetchCurrentMonthSalesData } from '../statics';

const SalesPieChart = () => {
  const [currentMonthSales, setCurrentMonthSales] = useState({ cod: 8, online: 18 });
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
        try {
            setLoading(true)
        const {success, data, message} = await fetchCurrentMonthSalesData()
        if(success){
            setLoading(false)
            setCurrentMonthSales(data);
        }
        } catch (error) {
            console.log(error)
        }finally {
            setLoading(false)
        }
    };

    fetchData();
  }, []);

  const data = [
    { name: 'Cash on Delivery', value: currentMonthSales.cod },
    { name: 'Online', value: currentMonthSales.online },
  ];

  const COLORS = ['#0088FE', '#FF8042'];

  if(loading){
    return <div className="flex justify-center flex-col items-center p-4">
    <CircularProgress className="text-gray-500 dark:text-gray-400" />
    <p className="ml-2 text-gray-500 dark:text-gray-400">Loading...</p>
  </div>
}
  return (
   
      <PieChart width={400} height={220} >
        <Pie
          data={data}
          cx={200}
          cy={100}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
 
  );
};

export default SalesPieChart;
