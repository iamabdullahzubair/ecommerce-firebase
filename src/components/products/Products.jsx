import React from "react";
import ProductCard from "./ProductCard";
import TitleTemplate from "../templates/TitleTemplate";
import ButtonTemplate from "../templates/ButtonTemplate";
import { RotatingSquare } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const Products = ({
  title,
  heading,
  showViewAllBtn = true,
  showTitleViewAllBtn = false,
  loading = false,
  products,
  divStyle = "",
  notToShowTitle = false
}) => {
  
  const navigate = useNavigate()
  const handleViewAllProductsBtn = () => {
    navigate("/products")
  };
  return (
    <div className={`lg:pl-32 lg:pr-20 px-6 lg:mt-8 mt-4 ${divStyle}`}>
      <TitleTemplate
        title={title}
        heading={heading}
        showTitleViewAllBtn={showTitleViewAllBtn}
        notToShow = {notToShowTitle}
        handleBtnTemplateClick={handleViewAllProductsBtn}
      />
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <RotatingSquare
            visible={true}
            height="100"
            width="100"
            color="#db4444"
            ariaLabel="rotating-square-loading"
          />
        </div>
      ) : (
        <div className="flex sm:flex-wrap flex-col sm:flex-row gap-5">
          {products.map(product => (
            <ProductCard key={product.pId} product={product}  />
          ))}
        </div>
      )}
      {!loading && showViewAllBtn &&  (
        <div className="flex items-center justify-center mt-8 ">
          <ButtonTemplate
          btnWidth="md:w-56 sm:w-32"
            btnText={"View All Products"}
            onBtnTemplateClick={handleViewAllProductsBtn}
          />
        </div>
      )}
    </div>
  );
};

export default Products;
