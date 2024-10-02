import React, { useEffect, useState } from "react";
import AddchartIcon from "@mui/icons-material/Addchart";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../reducers/global/GlobalContext";
import {  RotatingSquare } from "react-loader-spinner";
import ProductsList from "../adminComponent/products/ProductsList";

const AdminProducts = () => {
  const navigate = useNavigate();

  const {
    state: {
      productsGlobal: { products, loading, error },
    },
  } = useGlobalState();


  // console.log(products);
  return (
    <div  className={`flex flex-col  justify-center relative`}>
      {/* headers */}
      <div className=" dark:text-slate-300 flex justify-between items-center border-b border-slate-700 pb-3 px-40 mt-12">
        <p className="text-2xl  font-bold tracking-wider">All Products</p>
        <button
          className="flex items-center justify-center gap-2 bg-secondary rounded-sm px-5 py-3 font-semibold text-white"
          onClick={() => navigate("add-product")}
        >
          <AddchartIcon />
          <p className="">Add New Product</p>
        </button>
      </div>

      {/* list of products */}
      <div className="flex-1 w-full h-full">

        <div  style={{ height: 'calc(100vh - 200px)' }} className="mx-20 mt-10 bg-gray-200 dark:bg-gray-800 px-20 py-5 overflow-y-scroll scroll-smooth rounded-md">
          <div className=" shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 relative">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Sr
                  </th>
                  <th scope="col" className="px-16 py-3">
                    <span>Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <div className="flex items-center justify-center ">
                    <RotatingSquare
                      visible={true}
                      height="100"
                      width="100"
                      color="#4fa94d"
                      ariaLabel="rotating-square-loading"
                    />
                  </div>
                )}

                {!loading && products &&
                  products.map((product, index) => (
                    <ProductsList
                      key={product?.pId}
                      index={index}
                      product={product}
                    />
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
