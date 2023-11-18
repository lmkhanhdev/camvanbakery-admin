import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";
import { Billboard } from "@/models/Billboard";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  await isAdminRequest(req, res);

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Billboard.findOne({ _id: req.query.id }));
    } else {
      res.json(await Billboard.find());
    }
  }

  if (method === "POST") {
    const { title, images } = req.body;
    const billboardDoc = await Billboard.create({ title, images });
    res.json(billboardDoc);
  }

  if (method === "PUT") {
    const { title, images, _id } = req.body;
    await Billboard.updateOne({ _id }, { title, images });
    res.json(true);
  }

  if (method === "DELETE") {
    const { _id } = req.query;
    await Billboard.deleteOne({ _id });
    res.json("ok");
  }
}
