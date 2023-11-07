import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/Slices/authSlice";
import axios from "axios";
import { env } from "../env";
import { useSnackbar } from "notistack";
import Swal from "sweetalert2";

function Login() {
  const navigate = useNavigate();
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const loginHandler = () => {
    event.preventDefault();
    if (
      !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) &&
      !(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)
      )
      
    ) {
      enqueueSnackbar("Please enter valid email or password!", {
        variant: "error",
        autoHideDuration: 10000,
       
      });
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Enter Your Email and Password',
        showConfirmButton: false,
      })
       
    } else {
      axios
        .post(`${env.api}user/login`, { email: email, password: password })
        .then((res) => {
          if (res.data.status == 200) {
            enqueueSnackbar(`${res.data.message}`, {
              variant: "success",
              autoHideDuration: 3000,
            });
            localStorage.setItem("user", JSON.stringify({
              email: res.data.data.email,
              firstName: res.data.data.firstName,
            }));
            dispatch(
              login({
                email: res.data.data.email,
                firstName: res.data.data.firstName,
              })
            );
            navigate("/");
            Swal.fire({
              title: 'WELCOME',
              icon: 'success',
              imageWidth: 400,
              imageHeight: 200,
            })
          } else {
            enqueueSnackbar(`${res.data.message}`, {
              variant: "error",
              autoHideDuration: 3000,
            });
            Swal.fire({
              title: 'NOT VALID EMAIL  AND PASSWORD',
              icon: 'error',
              imageWidth: 400,
              imageHeight: 200,
            })
           
          }
        })
        .catch((err) => { });
       
    }
  };

  const reDirectpage=()=>{
    navigate('/register')
  }

  return (
    <>
      <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
        <section>
          <h3 className="font-bold text-2xl">Welcome to Fashion Model</h3>
          <p className="text-gray-600 pt-2">Sign in to your account.</p>
        </section>

        <section className="mt-10">
          <form className="flex flex-col">
            <div className="mb-6 pt-3 rounded bg-gray-200">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 ml-3"
                for="email"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                onChange={emailHandler}
              />
            </div>
            <div className="mb-6 pt-3 rounded bg-gray-200">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 ml-3"
                for="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                onChange={passwordHandler}
              />
            </div>

            <button
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
              onClick={loginHandler}
              type="submit"
            >
              Sign In
            </button>

            <button onClick={reDirectpage} className="btn p-2 underline mt-2">Create A New Account</button>
          </form>
        </section>
      </main>
    </>
  );
}

export default Login;
