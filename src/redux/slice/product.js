import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//declaring my initialstate
const initialState = {
  loading: false,
  products: [],
  error: "",
  product: {
    title: "",
    image: "",
    description: "",
    price: "",
  },
};

const URL =
  "https://my-json-server.typicode.com/mdatif796/ecommerce-website-skill-test/products";

// for fetching products trying axios here
export const fetchproducts = createAsyncThunk("fetchproducts", async () => {
  const resp = await axios.get(URL);
  return resp.data;
});

// adding products to my list POST request
export const addproducts = createAsyncThunk(
  "addproducts",
  async ({ title, description, price, images, id, rating }) => {
    try {
      let response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          id: id,
          description: description,
          price: Number(price),
          images: images,
          rating: Number(rating),
        }),
      });
      response = await response.json();
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

// deleting products from my list DELETE request
export const deleteproduct = createAsyncThunk(
  "products/deleteproduct",
  async (id) => {
    return fetch(`${URL}/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        res.json();
      })
      .then((data) => {
        return { id: id };
      })
      .catch((err) => {
        console.log("error");
      });
  }
);

// updating products from my list PUT request
export const updateproduct = createAsyncThunk(
  "product/updateproduct",
  async ({ title, price, rating, images, id, description }) => {
    return fetch(`${URL}/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title,
        price,
        rating,
        images,
        id,
        description,
      }),
    }).then((res) => res.json());
  }
);

// my reducers
const product = createSlice({
  name: "myproduct",
  initialState,
  reducers: {
    sortAction: (state, action) => {
      let sorted = state.products.sort(function (item1, item2) {
        if (item1.price < item2.price) return -1;
        if (item1.price > item2.price) return 1;
        return 0;
      });
      state.products = sorted;
    },
    unsortAction: (state, action) => {
      state.products = state.products.sort(function (item1, item2) {
        if (item1.id < item2.id) return -1;
        if (item1.id > item2.id) return 1;
        return 0;
      });
    },
  },
  // this extraReducer work on api req (onpending,onfulfilled,onreject)
  extraReducers: (builder) => {
    builder.addCase(fetchproducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchproducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.error = "";
    });
    builder.addCase(fetchproducts.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      state.error = action.error.message;
    });
    builder.addCase(addproducts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addproducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = [...state.products, action.payload];
      state.error = "";
    });
    builder.addCase(addproducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteproduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteproduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products = state.products.filter(
        (item) => item.id !== action.payload.id
      );
      state.error = "";
    });
    builder.addCase(deleteproduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(updateproduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateproduct.fulfilled, (state, action) => {
      state.loading = false;
      const item = action.payload;

      state.products = state.products.map((product, index) => {
        if (product.id === item.id) {
          return item;
        }
        return product;
      });
    });
    builder.addCase(updateproduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { getProduct } = product.actions;
export const { sortAction } = product.actions;
export const { unsortAction } = product.actions;
export default product.reducer;
