const { Schema, models, model } = require("mongoose");

const OrderSchema = new Schema(
  {
    name: String,
    phone: Number,
    date: String,
    time: String,
    address: String,
    note: String,
    totalAmount: Number, // Add totalAmount field
    paid: Boolean, // Change paid to Boolean
    products: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
        productName: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Order = models?.Order || model("Order", OrderSchema);
