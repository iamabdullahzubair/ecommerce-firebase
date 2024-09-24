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
      <div className="flex gap-5 justify-between items-center  border border-gray-100 shadow-sm rounded-sm px-10 py-5 mb-3">
        <div className="min-w-48 w-56">
          <span className="flex gap-6 items-center">
            <img
              className="w-20 h-12 object-contain"
              src={cartItem.thumbnail}
              alt={cartItem.name}
            />
            <p className="text-sm text-wrap">{cartItem.name}</p>
          </span>
        </div>
        <p>${cartItem.price}</p>
        <span>
          <input
            className="focus:outline-none w-14 border border-gray-400 px-2 py-1 font-semibold rounded dark:text-gray-700"
            onChange={(e) => handleUpdateQuantity(e)}
            type="number"
            value={quantity}
          />
        </span>
        <p>${Number(cartItem.price) * Number(quantity)}</p>
        <button
        onClick={handleRemoveCart}
        >
          <DeleteForeverIcon />
        </button>
      </div>
    );
  }
};

export default CartList;
