import React, { useContext, useEffect, useState } from "react";
import Products from "../components/products/Products";
import Footer from "../components/footer/Footer";
import Service from "../components/service/Service";
import TopLayer from "../components/navbar/TopLayer";
import { useGlobalState } from "../reducers/global/GlobalContext";

function Home() {
  const {state: {productsGlobal : {products}}} = useGlobalState();
  const  [bestSellingProducts, setBestSellingProducts] = useState(null);
  const  [newProducts, setNewProducts] = useState(null);
  const  [productsByLimit, setProductsByLimit] = useState(null);
  const [loading, setLoading] = useState(true);

  function limitedProducts(productsArray, setter){
    setter(productsArray.slice(0,5))
  }

  useEffect(()=> {
    setLoading(true)
    let filteredProducts = products.filter(product => product?.featured.toLowerCase() == "new")
    limitedProducts(filteredProducts, setNewProducts)
    filteredProducts = products.filter(product => product?.featured.toLowerCase() == "best-selling")
    limitedProducts(filteredProducts, setBestSellingProducts)
    filteredProducts = products.filter(product => product?.category.toLowerCase() == "computers")
    setLoading(false)
  },[products])
  return (
    <>
      <div className="">
        <TopLayer />
        
        <Products title={"This Months"} heading={"Best Selling Products"} loading={loading} products= {bestSellingProducts} showTitleViewAllBtn={true} showViewAllBtn={false}/>
        <Products title={"Our Products"} heading={"Explore Our Products"} loading={loading} products={newProducts} />
      </div>
      <Service />
    </>
  );
}

export default Home;
