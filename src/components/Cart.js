import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "./PrductCard";

const Cart = () => {
  const data = useSelector((state) => state.cart);
  return (
    <div className="mt-5 w-fit mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
      {data.map((cartData) => (
        <ProductCard key={cartData.id} productData={cartData} />
      ))}
    </div>
  );
};

export default Cart;
