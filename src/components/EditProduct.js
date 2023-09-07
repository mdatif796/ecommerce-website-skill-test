import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { updateproduct } from "../redux/slice/product";
import { toast } from "react-toastify";

export default function EditProduct({ productData }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(productData.title);
  const [price, setPrice] = useState(productData.price);
  const [rating, setRating] = useState(productData.rating);
  const [imgLink, setImgLink] = useState(productData.images);
  const [description, setDescription] = useState(productData.description);

  const handleOpen = () => setOpen(!open);

  const handleEditProduct = () => {
    if (name && price && rating && imgLink && description) {
      dispatch(
        updateproduct({
          title: name,
          price,
          rating,
          images: imgLink,
          description,
          id: productData.id,
        })
      );
      toast.success("Product Edited Successfully");
      return;
    }
    setOpen(!open);
    toast.error("Error occured");
  };

  return (
    <>
      <img
        onClick={handleOpen}
        className="w-4 cursor-pointer"
        src="https://cdn-icons-png.flaticon.com/128/2355/2355330.png"
        alt="edit-icon"
      />
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Edit Product</DialogHeader>
        <DialogBody divider>
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
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleEditProduct}>
            <span>Edit</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
