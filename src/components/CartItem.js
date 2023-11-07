import React, { useState } from "react";
import { Delete } from "@mui/icons-material";
import { remove } from "../redux/Slices/cartSlice";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { Quantity } from "./Quantity";
import { NavLink } from "react-router-dom";
import { Button, colors } from "@mui/material";


const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const removeItemFromCart = () => {
    dispatch(remove(item._id));
    enqueueSnackbar(`Item removed from your cart!`, {
      variant: "warning",
      autoHideDuration: 3000,
    });
  };

  const [amt, setamt] = useState(1)
  const [totalPrice, setTotalPrice] = useState(item.price);

  const updateQuantity = (newAmount) => {
    setamt(newAmount);
    const newTotalPrice = newAmount * item.price;
    setTotalPrice(newTotalPrice.toFixed(2));
  };

  const [selectedSize, setSelectedSize] = useState(null);

  return (
    <>
      <div className="flex items-center p-5 justify-between bg-violet-200 mt-2 mb-2 rounded-xl">
        <div className="flex p-3">
          <img src={item.image} className="h-28 rounded-lg" alt="" />
          <div className="ml-10 self-start space-y-5">
            <h1 className="text-xl text-purple-700 font-semibold">
              {item.title}
            </h1>
            <p>
              {item.description}
            </p>
            <div>
              <Quantity decr={"-"} incr={"+"} updateQuantity={updateQuantity} amt={amt} price={item.price.toFixed(2)} />
            </div>
            <div className="mt-4">

              <NavLink><Button  style={{
                borderRadius: '50%', padding: "0", marginRight: "3px", height: "32px", minWidth: '32px', border: "2px solid #7E22CE"   , backgroundColor: selectedSize === 'S' ? '#7E22CE' : 'transparent',
                color: selectedSize === 'S' ? 'white' : 'black',
              }} className="  Button  color: 'secondary.main' " onClick={() => setSelectedSize('S')}>S</Button></NavLink>

              <NavLink><Button style={{
                borderRadius: '50%', padding: "0", marginRight: "3px", height: "32px", minWidth: '32px', border: "2px solid #7E22CE", backgroundColor: selectedSize === 'M' ? '#7E22CE' : 'transparent',
                color: selectedSize === 'M' ? 'white' : 'black',
              }} className=" Button" onClick={() => setSelectedSize('M')}>M</Button></NavLink>

              <NavLink><Button style={{
                borderRadius: '50%', padding: "0", marginRight: "3px", height: "32px", minWidth: '32px', border: "2px solid #7E22CE", backgroundColor: selectedSize === 'L' ? '#7E22CE' : 'transparent',
                color: selectedSize === 'L' ? 'white' : 'black',
              }} className=" Button" onClick={() => setSelectedSize('L')}>L</Button></NavLink>

              <NavLink><Button style={{
                borderRadius: '50%', padding: "0", marginRight: "3px", height: "32px", minWidth: '32px', border: "2px solid #7E22CE", backgroundColor: selectedSize === 'XL' ? '#7E22CE' : 'transparent',
                color: selectedSize === 'XL' ? 'white' : 'black',
              }} className=" Button" onClick={() => setSelectedSize('XL')}>XL</Button></NavLink>

              <NavLink><Button style={{
                borderRadius: '50%', padding: "0", marginRight: "3px", height: "32px", minWidth: '32px', border: "2px solid #7E22CE", backgroundColor: selectedSize === 'XXL' ? '#7E22CE' : 'transparent',
                color: selectedSize === 'XXL' ? 'white' : 'black',
              }} className=" Button" onClick={() => setSelectedSize('XXL')}>XXL</Button></NavLink>
             
            </div>
            <p>₹{item.price * amt.toFixed(2)} </p>
            {/* <p></p> */}
          </div>
        </div>
        <div
          onClick={removeItemFromCart}
          className="bg-purple-300 hover:bg-purple-400 transition-transform duration-300 cursor-pointer rounded-full p-3 mr-3"
        >
          <Delete className="text-gray-800" />
        </div>
      </div>
    </>
  );
};

export default CartItem;
