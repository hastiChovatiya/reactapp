import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { env } from "../env";
import { useSnackbar } from "notistack";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFisrtName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };
  const firstNameHandler = (event) => {
    setFisrtName(event.target.value);
  };

  const lastNameHandler = (event) => {
    setLastName(event.target.value);
  };

  const signUpHandler = () => {
    event.preventDefault();

    // validate email and password with regex
    if (
      !(/[a-zA-Z]+/.test(firstName)) &&
      !(/[a-zA-Z]+/.test(lastName)) &&
      !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) &&
      !(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)
      )
    ) {
      enqueueSnackbar("Please fill all the required fields!", {
        variant: "error",
        autoHideDuration: 10000,
      });
    } else {
      axios
        .put(`${env.api}user/register`, {
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
        })
        .then((res) => {
          if (res.data.status == 201) {
            enqueueSnackbar(`${res.data.message}`, {
              variant: "success",
              autoHideDuration: 3000,
            });
            navigate("/login");
          } else {
            enqueueSnackbar(`${res.data.message}`, {
              variant: "error",
              autoHideDuration: 3000,
            });
          }
        })
        .catch((err) => {});
    }
  };

  return (
    <>
      <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
        <section>
          <h3 className="font-bold text-2xl">Welcome to Fashion Model</h3>
          <p className="text-gray-600 pt-2">Register yourself here !!</p>
        </section>

        <section className="mt-10">
          <form className="flex flex-col">
            <div className="mb-6 pt-3 rounded bg-gray-200">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 ml-3"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                type="text"
                id="fisrtName"
                className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                onChange={firstNameHandler}
              />
            </div>
            <div className="mb-6 pt-3 rounded bg-gray-200">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 ml-3"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                onChange={lastNameHandler}
              />
            </div>
            <div className="mb-6 pt-3 rounded bg-gray-200">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 ml-3"
                htmlFor="email"
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
                htmlFor="password"
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
              onClick={signUpHandler}
              type="submit"
            >
              Sign Up
            </button>
          </form>
        </section>
      </main>
    </>
  );
};

export default Register;
