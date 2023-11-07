import React, { useEffect } from "react";
import { ShoppingBasket } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/Slices/authSlice";
import { clear } from "../redux/Slices/cartSlice";
import Swal from "sweetalert2";

const Navbar = () => {
  const { cart } = useSelector((state) => state);
  const { auth } = useSelector((state) => state);
  let localSt = JSON.parse(localStorage.getItem('user'))

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => { });

  const logoutHandler = () => {
    localStorage.clear()
    dispatch(logout());
    dispatch(clear());
    navigate("/");
    Swal.fire(
      'Successfully logged out'
    )
  };

  return (
    <>
      <nav className="flex items-center justify-between h-20  max-w-6xl mx-auto">
        <Link to={"/"}>
          <div className="ml-5">
            <h1 className="bg-gradient-to-br from-violet-900 to-purple-300 bg-clip-text text-transparent text-xl sm:text-2xl md:text-3xl font-bold logo cursor-pointer tracking-wider">
              Fashion Model
            </h1>
          </div>
        </Link>
        <div className="flex list-none items-center space-x-6 mr-5 text-gray-700 -tracking-tighterr font-semibold">
          <Link to={"/"}>
            <li className="cursor-pointer hover:text-purple-500 transition duration-300 ease-in">
              Home
            </li>
          </Link>
          {/* {auth.loggedIn ? (
            <>
              <span>{auth.user.firstName}</span>

              <li
                className="cursor-pointer hover:text-purple-500 transition duration-300 ease-in"
                onClick={logoutHandler}
              >
                Log out
              </li>
            </>
          ) : (
            <>
              <Link to={"/login"}>
                <li className="cursor-pointer hover:text-purple-500 transition duration-300 ease-in">
                  Login
                </li>
              </Link>

              <Link to={"/register"}>
                <li className="cursor-pointer hover:text-purple-500 transition duration-300 ease-in">
                  Sign Up
                </li>
              </Link>
            </>
          )} */}

          {
            localSt != null ?
              <>
                <span>{localSt?.firstName}</span>

                <li
                  className="cursor-pointer hover:text-purple-500 transition duration-300 ease-in"
                  onClick={logoutHandler}
                >
                  Log out
                </li>
              </> :
              <>
                <Link to={"/login"}>
                  <li className="cursor-pointer hover:text-purple-500 transition duration-300 ease-in">
                    Login
                  </li>
                </Link>

                <Link to={"/register"}>
                  <li className="cursor-pointer hover:text-purple-500 transition duration-300 ease-in">
                    Sign Up
                  </li>
                </Link>
              </>
          }

          <Link to={"/cart"}>
            <div className="relative">
              <ShoppingBasket className="text-2xl cursor-pointer hover:text-purple-600 transition transform duration-200" />

              {cart.length > 0 && (
                <div className="absolute bg-purple-600 text-xs w-5 h-5 flex justify-center items-center animate-bounce -top-1 -right-2 rounded-full top- text-white">
                  {cart.length}
                </div>
              )}
            </div>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
