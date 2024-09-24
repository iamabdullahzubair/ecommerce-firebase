import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddProduct from "./AddProduct";
import UpdateProduct from "./UpdateProduct";
import { deleteProduct } from "../../../utils/products/products";
import { toast } from "react-toastify";
import { useGlobalState } from "../../../reducers/global/GlobalContext";
import { PRODUCT_ACTIONS } from "../../../reducers/products/productsReducer";

const ProductsList = ({ product, index }) => {
  const {state, dispatch} = useGlobalState()
  const navigate = useNavigate()
  const handleAction = (e) => {
    const action = e.target.value;

    if (action === "edit") {
      navigate(`product-detail/${product.pId}`)
    } else if (action === "delete") {
      handleDelete();
    }
  };

  const handleDelete = async() => {
    const confirmation = window.confirm("Are you sure you want to delete Product?")
    if(confirmation){
      try {
        dispatch({type : PRODUCT_ACTIONS.SET_LOADING})
        const deleted = await deleteProduct(product.pId, product)
        console.log(deleted)
        if(deleted){
          dispatch({type : PRODUCT_ACTIONS.DELETE_PRODUCT, payload : product.pId})
          toast.success("Deleted Product Successfully!")
        }
      } catch (error) {
        toast.error("Error :: Occured On deletion!!")
        console.log("error occured on deleting product :: ",error)
      }
    }
  };

 
  if (product)
    return (
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-8 text-base font-medium">{index + 1}</td>
        <td className="p-4">
          <Link to={`product-detail/${product.pId}`}>
            <img
              src={product?.thumbnail}
              className="w-28 h-24 object-contain object-center"
              alt="Product Thumbnail"
            />
          </Link>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {product?.name}
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {product?.stock}
        </td>

        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          ${product?.price}
        </td>
        <td className="px-6 py-4">
          <select
            onChange={handleAction} // Directly handle action here
            className="font-medium text-red-600 dark:text-red-500 bg-transparent focus:outline-none"
          >
            <option value="">Select Action</option>
            <option value="edit">Edit</option>
            <option value="delete">Delete</option>
          </select>
        </td>
      </tr>
    );
};

export default ProductsList;
