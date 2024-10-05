import React from 'react'
import CircularProgress from "@mui/material/CircularProgress"; // MUI Spinner


import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';


const LineChartComponent = ({salesData, loading}) => {
    if(loading){
        return <div className="flex justify-center flex-col items-center p-4">
        <CircularProgress className="text-gray-500 dark:text-gray-400" />
        <p className="ml-2 text-gray-500 dark:text-gray-400">Loading...</p>
      </div>
    }
  return (
    <>
        <ResponsiveContainer width="100%" height="100%" >
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="stats.total" name="Total" stroke="#82ca9d" activeDot={{ r: 8 }}/>
              <Line type="monotone" dataKey="stats.cash" name='Cash' stroke="#8884d8" />
              <Line type="monotone" dataKey="stats.online" name='Online Payment' stroke="#DB4444" />
            </LineChart>
          </ResponsiveContainer>
    </>
  )
}

export default LineChartComponent