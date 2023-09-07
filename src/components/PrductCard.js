import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../redux/slice/cart";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { deleteproduct } from "../redux/slice/product";
import EditProduct from "./EditProduct";

export default function ProductCard({ productData }) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.cart);
  const [isAddedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    data.forEach((d) => {
      d.id === productData.id && setAddedToCart(true);
    });
  }, [data, productData]);

  const handleRemoveFromCart = () => {
    dispatch(remove(productData.id));
    setAddedToCart(false);
    toast.success("Remove from cart");
  };

  const handleAddToCart = () => {
    dispatch(add(productData));
    setAddedToCart(true);
    toast.success("Added to cart");
  };

  const handleDeleteProduct = () => {
    dispatch(deleteproduct(productData.id));
    toast.success("Product deleted");
  };

  const getStarRating = (rating) => {
    let star = "";
    for (let i = 0; i < Math.floor(rating); i++) {
      star += "⭐";
    }
    return star;
  };

  return (
    <Card className="w-96">
      <CardHeader shadow={false} floated={false} className="h-80">
        <img
          src={productData.images}
          alt="card"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody>
        <div className="mb-2 flex items-center justify-between">
          <Typography color="blue-gray" className="font-medium">
            {productData.title}
          </Typography>
          <Typography color="blue-gray" className="font-medium">
            ₹{productData.price}
          </Typography>
        </div>
        <Typography
          variant="small"
          color="gray"
          className="font-normal opacity-75"
        >
          {productData.description}.
        </Typography>
        <div className="mt-5 flex items-center justify-between">
          <Typography>{getStarRating(productData.rating)}</Typography>
          <div className="flex">
            <EditProduct productData={productData} />
            <img
              src="https://cdn-icons-png.flaticon.com/128/3096/3096687.png"
              alt="delete-icon"
              className="w-4 cursor-pointer ml-3"
              onClick={handleDeleteProduct}
            />
          </div>
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        {isAddedToCart ? (
          <Button
            ripple={false}
            fullWidth={true}
            onClick={handleRemoveFromCart}
            className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
          >
            Remove From Cart
          </Button>
        ) : (
          <Button
            ripple={false}
            fullWidth={true}
            onClick={handleAddToCart}
            className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
          >
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
