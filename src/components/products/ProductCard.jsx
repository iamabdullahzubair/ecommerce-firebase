import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ButtonTemplate from "../templates/ButtonTemplate";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../reducers/global/GlobalContext";
import { CART_ACTIONS } from "../../reducers/cart/cartReducer";
import { toast } from "react-toastify";
import { addToCart } from "../../reducers/cart/CartAPI";



function ProductCard({ product, showDiscount= true  }) {

  const {state : {cartGlobal : {cart, loading, error}, user : {userData}}, dispatch} = useGlobalState()


  const [onHover, setOnHover] = useState(false);

  const navigate = useNavigate()

  const handleAddToCartBtn = async (e) => {
    e.stopPropagation();
  
    const {pId, name, price, thumbnail, } = product
    let myCartItem = { pId, name, price, thumbnail, quantity: 1, userId: userData.id };
  
    // Check if the product already exists in the cart
    const cartProductExists = cart.some(
      (item) => item.pId === myCartItem.pId && item.userId === userData.id
    );
  
    if (cartProductExists) {
      // If the product already exists in the cart
      toast.error("Product is already in the cart");
      return; // Stop execution here
    }
  
    // If the product does not exist in the cart, add it
    dispatch({ type: CART_ACTIONS.SET_LOADING });
    await addToCart(userData.id, myCartItem);
    dispatch({ type: CART_ACTIONS.ADD_TO_CART, payload: myCartItem });
    toast.success("Added to cart", {position : "bottom-center"});
  };
  

function handleProductClick(){
 navigate(`/products/product-detail/${product.pId}`)
}

  return (
    <div
      className="lg:mr-3 lg:mt-5 mt-6 transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
      onClick={handleProductClick}
    >
      <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 p-6 rounded-md relative hover:translate-y-1 transition-transform duration-500 group">
        <div className={`absolute left-2 top-1 bg-secondary px-2 py-1 rounded text-white ${!showDiscount && "hidden"}`}>
            <p className="text-xs">-{product?.discount}%</p>
        </div>
        {/* Icons on hover */}
        <div className={`absolute right-0 top-1 flex flex-col  ${onHover ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}>
          <FavoriteBorderIcon className="bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-full p-1 m-1 hover:scale-125" />
          <VisibilityIcon className="bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-full p-1 m-1 hover:scale-125 " />
        </div>

        {/* Image */}
        <img
          className="object-contain w-48 h-48 lg:w-64  lg:h-72 rounded-md transition-all duration-300"
          src={product.thumbnail}
          alt={product.name}
          loading="lazy"
        />

        {/* Add to Cart button on hover */}
        
          <div className={`absolute -bottom-2 left-0 w-full text-center py-2 ${onHover ? "opacity-90" : "opacity-0"} transition-opacity duration-700 ease-in`}>
            <ButtonTemplate
              btnText={"Add To Cart"}
              btnWidth="w-full"
              btnColor="bg-black"
              onBtnTemplateClick={handleAddToCartBtn}
            />
            {/* <button className="text-white py-1 px-5 text-lg">
              Add To Cart
            </button> */}
          </div>
    
      </div>

      {/* Product Details */}
      <div className="flex flex-col mt-2">
        <p className="text-sm font-semibold dark:text-white">
          {product.name}
        </p>
        <div className="flex items-center text-sm my-1">
          <p className="mr-3 text-red-400 dark:text-white font-semibold">
          ₹{product.price}
          </p>
          {Array(product.rating)
            .fill()
            .map((_, i) => (
              <StarIcon
                key={i}
                className="text-orange-400 dark:text-orange-300"
                fontSize="small"
              />
            ))}
          {Array(5 - product.rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} fontSize="small" className="dark:text-white" />
            ))}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
