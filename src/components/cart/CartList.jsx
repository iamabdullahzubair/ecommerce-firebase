import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const CartList = ({ cart: cartItem, onUpdateQuantity }) => {
  const [quantity, setQuantity] = useState(1);

  function handleUpdateQuantity(e) {
    const newQuantity = e.target.value;
    if(newQuantity <= 0) {
      toast.warn("Quantity must be atleast one")
      return
    }
    setQuantity(newQuantity);
    onUpdateQuantity({updatedItem : { ...cartItem, quantity: Number(newQuantity) }, action : "update" }); // Ensure quantity is a number
  }
  
  function handleRemoveCart(){
    onUpdateQuantity({updatedItem : cartItem, action : "remove" }); 
  }

  useEffect(() => {
    setQuantity(cartItem.quantity)
  }, [])
  if (cartItem) {
    return (
      <div className="flex gap-5 justify-between items-center  border border-gray-100 shadow-sm rounded-sm px-4 py-5 mb-3 overflow-x-scroll md:overflow-hidden">
        <div className=" w-2/6">
          <span className="flex gap-6 items-center">
            <img
              className="w-20 h-12 object-contain"
              src={cartItem.thumbnail}
              alt={cartItem.name}
            />
            <p className="text-sm text-wrap">{cartItem.name}</p>
          </span>
        </div>
        <p className="w-1/6">${cartItem.price}</p>
        <span className="w-1/6">
          <input
            className="focus:outline-none w-14 border border-gray-400 px-2 py-1 font-semibold rounded dark:text-gray-700"
            onChange={(e) => handleUpdateQuantity(e)}
            type="number"
            value={quantity}
          />
        </span>
        <p className="w-1/6">${Number(cartItem.price) * Number(quantity)}</p>
        <button
        className="w-1/6 text-start"
        onClick={handleRemoveCart}
        >
          <DeleteForeverIcon />
        </button>
      </div>
    );
  }
};

export default CartList;
