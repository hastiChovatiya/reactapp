import React from "react";
import { add, remove } from "../redux/Slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { Form, NavLink } from "react-router-dom";
import { Button } from "@mui/material";
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />

const Product = ({ item }) => {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const addToCart = () => {
    dispatch(add(item));
    enqueueSnackbar(`Item added to your cart!`, {
      variant: "success",
      autoHideDuration: 3000,
    });
  };

  const removeFromCart = () => {
    dispatch(remove(item._id));
    enqueueSnackbar(`Item removed from your cart!`, {
      variant: "warning",
      autoHideDuration: 3000,
    });
  };

  // const addToCart1 = () => {
 

  return (
    <>
      <div className="group hover:scale-110 transition duration-300 ease-in flex flex-col items-center border-2 border-purple-400 gap-3 p-4 h-[350px] mt-10 ml-5  rounded-xl">
        <div className="h-[180px]">
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h3 style={{fontSize : '15px'}} className="truncate w-40 mt-2 text-gray-700 font-semibold text-lg" title={item.title}>
            {item.title}
          </h3>
        </div>
        
        <div>
          
        </div>
        <div className="flex items-center justify-between w-full mt-2">
          {cart.some((p) => p._id === item._id) ? (
            <button
              className="group-hover:bg-purple-700 group-hover:text-white transition duration-300 ease-in text-purple-700 border-2 border-purple-700 rounded-lg font-semibold p-3"
              onClick={removeFromCart}
            >
              Remove item
            </button>
          ) : (
            <button
              className="group-hover:bg-purple-700 group-hover:text-white transition duration-300 ease-in text-purple-700 border-2 border-purple-700 rounded-lg font-semibold p-3"
              onClick={addToCart}
            >
              Add to cart
            </button>
          )}
          <p>₹ {item.price}</p>
        </div>
      </div>
    </>
  );
};

export default Product;
