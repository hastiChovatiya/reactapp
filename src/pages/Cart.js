import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../components/CartItem";
import { Form, Link, useNavigate } from "react-router-dom";
import { clear } from "../redux/Slices/cartSlice";
import { useSnackbar } from "notistack";
import axios from "axios";
import { env } from "../env";
import { Quantity } from "../components/Quantity";
import Swal from "sweetalert2";

const Cart = (item) => {
  // const { cart1 } = useSelector((state) => state);
  const [totalAmount, setTotalAmount] = useState(0);
  const { cart } = useSelector((state) => state);
  const { auth } = useSelector((state) => state);
  const nav=useNavigate();
  useEffect(() => {
    setTotalAmount(cart.reduce((acc, curr) => acc + curr.price   , 0));
  }, [cart]);

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const clearCart = () => {
    dispatch(clear());
    enqueueSnackbar(`Your Order Placed successfully!`, {
      variant: "success",
      autoHideDuration: 3000,
    });
  };

  const shopnow = () => {
    axios.post(`${env.api}product/shopnow`, { email: JSON.parse(localStorage.getItem('user'))?.email }).then(res => {
      console.log(res);
      Swal.fire({
        title: 'YOUR PURCHASE IS COMPLETE :)',
        width: 600,
        padding: '3em',
        color: '#716add',
        // timer: 500,
        background: '#fff url(/images/trees.png)',
        backdrop: `
          rgba(0,0,123,0.4)
          url("/images/nyan-cat.gif")
          left top
          no-repeat
        `
      })
      nav("/home")
    })
  }
  // const [amt, setamt] = useState(1)
  
  return (
    <>
      {cart.length > 0 ? (
        <>
          <div className="min-h-[80vh] grid md:grid-cols-2 max-w-6xl mx-auto">
            <div className="flex flex-col justify-center items-between p-2">
              {cart.map((item) => {
                return <CartItem key={item._id} item={item} />;
              })}
            </div>
            <div>
              <div className="flex flex-col justify-center items-end p-5 space-y-5 mt-14">
                <h1 className="font-semibold text-lg text-purple-800">
                  YOUR CART SUMMARY
                </h1>
                {/* <p>
                  <span className="text-gray-700 font-semibold">
                    Total Items
                  </span>{" "}
                  : {cart.length}
                </p> */}
                <div>

                  <div>
                  </div>

                </div>
                <p>
                  {" "}
                  <span className="text-gray-700 font-semibold">
                    Total Amount
                  </span>{" "}
                  : ₹ {totalAmount.toFixed(2)}
                </p>
                {auth.loggedIn == true ? (
                  <button
                    onClick={clearCart}
                    className="bg-purple-700 hover:bg-purple-50 rounded-lg text-white transition duration-300 ease-linear mt-5 border-2 border-purple-600 font-bold hover:text-purple-700 p-3"
                  >
                    Checkout Now
                  </button>
                ) : (
                  <Link to={"/login"}>

                    <button className="bg-purple-700 hover:bg-purple-50 rounded-lg text-white transition duration-300 ease-linear mt-5 border-2 border-purple-600 font-bold hover:text-purple-700 p-3">
                      Please Login To Checkout
                    </button>
                  </Link>
                )}

              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="min-h-[80vh] flex flex-col items-center justify-center">
            <h1 className="text-gray-700 font-semibold text-xl mb-2">
              Your cart is empty!
            </h1>
            <button onClick={shopnow} className="bg-purple-700 hover:bg-purple-50 rounded-lg text-white transition duration-300 ease-linear mt-5 border-2 border-purple-600 font-bold hover:text-purple-700 p-3">
              SHOP NOW
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
