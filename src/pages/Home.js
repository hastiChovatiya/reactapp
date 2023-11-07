import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import axios from "axios";
import { env } from "../env";

const Home = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get(`${env.api}product/fetch`)
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((err) => {});
  }, []);

  return (
    <>
      <div className="min-h-[80vh] grid sm:grid-cols-2 md:grid-cols-3 space-x-5 space-y-10 lg:grid-cols-4 max-w-6xl mx-auto p-2 ">
        {product.length > 0 &&
          product.map((item) => {
            return <Product key={item._id} item={item} />;
          })}
      </div>
    </>
  );
};

export default Home;
