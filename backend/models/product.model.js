import mongoose from "mongoose";

//----------------------------------------
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//--------------------------------------------------------
const Product = mongoose.model("Product", productSchema); //convert Product --. products

export default Product;
//---------------------------------------------------------
