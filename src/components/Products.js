import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./PrductCard";
import Loader from "./Loader";
import { useEffect, useState } from "react";
import {
  fetchproducts,
  sortAction,
  unsortAction,
} from "../redux/slice/product";
import { Button } from "@material-tailwind/react";
import { toast } from "react-toastify";

const Products = () => {
  const [isSort, setSort] = useState(false);
  const data = useSelector((state) => state.myproduct);
  const dispatch = useDispatch();
  useEffect(
    (e) => {
      !data.products.length && dispatch(fetchproducts());
    },
    [dispatch, data.products.length]
  );
  if (data.loading) {
    return <Loader />;
  }

  const handleSortProduct = () => {
    if (isSort) {
      dispatch(unsortAction());
      toast.success("Product Unsorted");
      setSort(false);
    } else {
      dispatch(sortAction());
      toast.success("Product sorted");
      setSort(true);
    }
  };

  return (
    <>
      <Button
        onClick={handleSortProduct}
        className="rounded-full mt-8 absolute left-20"
      >
        Sort By Price {isSort && <span className="ml-2">✘</span>}
      </Button>
      <div className="mt-24 w-fit mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {data.products?.map((product) => (
          <ProductCard key={product.id} productData={product} />
        ))}
      </div>
    </>
  );
};

export default Products;
