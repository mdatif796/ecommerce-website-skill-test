import {
  Card,
  Input,
  Button,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addproducts } from "../redux/slice/product";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddProduct() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.myproduct).products.length;
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [imgLink, setImgLink] = useState("");
  const [description, setDescription] = useState("");
  const handleAddProduct = () => {
    if (name && price && rating && imgLink && description) {
      dispatch(
        addproducts({
          title: name,
          price,
          rating,
          images: imgLink,
          description,
          id: data * 2 + 1,
        })
      );
      navigate("/");
      toast.success("Product Added Successfully");
      return;
    }
    toast.error("Error occured");
  };

  return (
    <Card
      className="flex items-center justify-center mt-12"
      color="transparent"
      shadow={false}
    >
      <Typography variant="h4" color="blue-gray">
        Add a Product
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-xl sm:w-96">
        <div className="mb-4 flex flex-col gap-6">
          <Input
            onChange={(e) => setName(e.target.value)}
            size="lg"
            label="Name"
            value={name}
          />
          <Input
            onChange={(e) => setPrice(e.target.value)}
            size="lg"
            label="Price"
            value={price}
          />
          <Input
            onChange={(e) => setRating(e.target.value)}
            type="number"
            max={5}
            min={1}
            size="lg"
            label="Rating out of 5"
            value={rating}
          />
          <Input
            onChange={(e) => setImgLink(e.target.value)}
            size="lg"
            label="Product Image Link"
            value={imgLink}
          />
          <Textarea
            onChange={(e) => setDescription(e.target.value)}
            size="lg"
            label="Description"
            value={description}
          />
        </div>

        <Button onClick={handleAddProduct} className="mt-6" fullWidth>
          Add
        </Button>
      </form>
    </Card>
  );
}
