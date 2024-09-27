import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import StarIcon from "@mui/icons-material/Star";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchProduct } from "../../utils/products/products";
import { RotatingSquare } from "react-loader-spinner";
import { useGlobalState } from "../../reducers/global/GlobalContext";
import { addToCart } from "../../reducers/cart/CartAPI";
import { CART_ACTIONS } from "../../reducers/cart/cartReducer";
import { toast } from "react-toastify";

const ProductDetailCard = ({divStyle = ""}) => {
  const {
    state: {
      user: { userData },
      cartGlobal : {cart}
    },
    dispatch,
  } = useGlobalState();
  const navigate = useNavigate();
  const { id } = useParams();

  const [quantity, setQuantity] = useState(1);
  const [selectSize, setSelectSize] = useState(null);

  const [ProductDetail, setProductDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchSingleProduct() {
    try {
      setLoading(true);
      const data = await fetchProduct(id);
      if (data) {
        setProductDetail(data);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSingleProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <RotatingSquare
          visible={true}
          height="100"
          width="100"
          color="#4fa94d"
          ariaLabel="rotating-square-loading"
        />
      </div>
    );
  }

  function handleEditBtn(){
    navigate(`/admin/products/add-product/${id}`)
  }

  const handleAddToCartBtn = async () => {
  
    const { name, price, thumbnail, } = ProductDetail
    let myCartItem = { pId :id, name, price, thumbnail, quantity, selectedSize:selectSize, userId: userData.id };

    // Check if the product already exists in the cart
    const cartProductExists = cart.some(
      (item) => item.pId === myCartItem.pId && item.userId === userData.id
    );
  
    if (cartProductExists) {
      return; 
    }
  
    // If the product does not exist in the cart, add it
    dispatch({ type: CART_ACTIONS.SET_LOADING });
    await addToCart(userData.id, myCartItem);
    dispatch({ type: CART_ACTIONS.ADD_TO_CART, payload: myCartItem });
    toast.success("Added to cart", {position:"bottom-center"});
  };
    

  async function handleBuyNow(){
    if(!selectSize){
      toast.warn("Please select size")
      return
    }
    await handleAddToCartBtn();
    navigate(`/products/product-detail/checkout/${id}`)
  }

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1)); // Avoiding 0 or negative values

  if (ProductDetail) {
    return (
      <div className={`flex lg:flex-row flex-col sm:justify-center sm:items-center px-5 sm:px-10 gap-9 lg:justify-start lg:items-start ${divStyle} mt-14`}>
        <div className="flex sm:w-3/4 md:w-3/5 lg:flex-row flex-col-reverse items-center justify-center gap-3">
          <div className="flex lg:flex-col sm:gap-2 gap-1 flex-row">
            {ProductDetail?.images.slice(1).map((image) => (
              <div
                key={image}
                className="bg-gray-300 md:p-4 sm:p-2 p-1 rounded-md w-16 h-16 sm:w-20 sm:h-20 md:w-32 lg:w-40 md:h-32 flex items-center justify-center"
              >
                <img
                  className="w-full h-full object-contain object-center"
                  src={image}
                  alt="Product Image"
                />
              </div>
            ))}
          </div>
          <div className="bg-gray-300 px-4 py-5 sm:px-8 sm:py-10 w-full sm:ml-4 rounded-md">
            <img
              className="w-full h-full object-contain object-center"
              src={ProductDetail?.thumbnail}
              alt="image"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">{ProductDetail?.name}</h2>
          <div className="flex gap-2 text-sm">
            <div>
              <StarIcon fontSize="small" className="text-yellow-500" />
              <StarIcon fontSize="small" className="text-yellow-500" />
              <StarIcon fontSize="small" className="text-yellow-500" />
              <StarIcon fontSize="small" className="text-yellow-500" />
              <StarIcon fontSize="small" className="text-gray-400" />
            </div>

            <p>(150 reviews)</p>
            <p className="text-sky-500">
              | {ProductDetail?.stock > 0 ? "In Stock" : "Out of stock"}
            </p>
          </div>
          <p className="text-base font-semibold tracking-wide mb-2">$192.00</p>
          <p className="text-sm lg:w-64 max-w-96">{ProductDetail?.desc}</p>
          <span className="w-full h-1 border-t-2 border-gray-400 my-2"></span>
          <span className="flex items-center">
            <p className="text-sm font-semibold mr-4">Colours</p>
            <div
              className={`w-4 h-4 cursor-pointer border-2 border-gray-800  rounded-full bg-red-600`}
            ></div>
          </span>
          <span className="flex items-center">
            <p className="text-sm font-semibold mr-8">Size</p>
            <span className="flex items-center gap-2">
              {ProductDetail.sizes.map((size) => (
                <button
                  onClick={() => setSelectSize(size)}
                  key={size}
                  className={`border border-gray-300 rounded-md shadow-sm px-2 py-1 text-xs font-semibold hover:bg-secondary hover:text-white ${selectSize == size && "bg-secondary text-white"}`}
                >
                  {size}
                </button>
              ))}
            </span>
          </span>
          <div className="flex flex-col sm:flex-row sm:items-center justify-start gap-2">
            <span className="border-2 border-gray-300  flex w-full items-center justify-between sm:w-1/2">
              <button
                onClick={decrementQuantity}
                className="flex items-center justify-center flex-row px-2"
              >
                <RemoveIcon />
              </button>
              <input
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="focus:outline-none text-center sm:w-12 w-full border-r-2 border-l-2 border-gray-300 dark:bg-transparent"
                type="number"
                value={quantity}
              />
              <button
                onClick={incrementQuantity}
                className="flex flex-row items-center justify-center px-2"
              >
                <AddIcon />
              </button>
            </span>
            <button 
            onClick={handleBuyNow}
            className="px-4 py-1 text-white rounded-sm bg-secondary text-base font-bold">
              Buy Now
            </button>
            <span className="px-1 py-1 border shadow-sm border-gray-300 rounded-sm">
              <FavoriteBorderIcon />
            </span>
          </div>
          <div className="py-2">
            <div className="flex items-center justify-start gap-2 border rounded rounded-b-none border-gray-400 pl-4  pr-8 py-3">
              <LocalShippingIcon fontSize="large" />
              <span className="ml-2">
                <p className="text-sm font-semibold mb-2">Free Delivery</p>
                <p className="text-xs text-wrap">
                  Enter your postal code for Delivery Availability
                </p>
              </span>
            </div>
            <div className="flex items-center justify-start gap-2 border rounded border-gray-400 border-t-0 rounded-t-none pl-4  pr-8 py-3">
              <AutorenewIcon />
              <span className="ml-2">
                <p className="text-sm font-semibold mb-2">Return Delivery</p>
                <p className="text-xs">
                  Free 30 Days Delivery Returns. <Link to={"#"}>Details</Link>
                </p>
              </span>
            </div>
          </div>

          {userData && userData?.role == "admin" && (
            <button 
            onClick={handleEditBtn}
            className="bg-secondary px-4 py-2 text-white rounded">Edit</button>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <p className="text-2xl font-bold text-center">Something goes wrong</p>
      <button
        onClick={() => navigate(-1)}
        className="text-xl font-semibold text-center w-full underline mt-5 text-secondary"
      >
        Go Back
      </button>
    </>
  );
};

export default ProductDetailCard;
