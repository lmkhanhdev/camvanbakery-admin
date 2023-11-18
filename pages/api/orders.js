import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";

export default async function (req, res) {
  await mongooseConnect();
  res.json(await Order.find().sort({ createAt: -1 }));
}
