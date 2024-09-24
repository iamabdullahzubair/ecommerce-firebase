import React, { useEffect, useState } from "react";
import ProductDetailCard from "../../components/products/ProductDetailCard";
import BreadCrumb from "../adminComponent/sidebar/BreadCrumb";


const AdminProductDetail = () => {
 



  return (
    <div className="px-20 py-5 ">
      <div className="pl-12 ">
        <BreadCrumb cut={true} />
      </div>
      {/* main product detail */}
      <ProductDetailCard />

      {/* similar product cards */}
    </div>
  );
};

export default AdminProductDetail;
