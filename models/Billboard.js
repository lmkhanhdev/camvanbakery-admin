const { Schema, models, model } = require("mongoose");

const BillboardSchema = new Schema({
  title: { type: String, required: true },
  images: [{ type: String }],
});

export const Billboard =
  models.Billboard || model("Billboard", BillboardSchema);
