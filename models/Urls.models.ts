import { UrlsModel } from "@/Types/UrlsModel.types";
import { Model, Schema, model, models } from "mongoose";

const urlsSchema = new Schema(
  {
    originalUrl: {
      type: String,
      required: [true, "Url is required to short it"],
      unique: true,
    },
    shortedUrl: {
      type: String,
      unique: true,
    },
    title: {
      type: String,
      required: [true, "Title must be required for the shorted urls"],
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    qrcode: {
      type: String,
      required: true,
    },
    clicks: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Urls: Model<UrlsModel> =
  models.Urls || model<UrlsModel>("Urls", urlsSchema);
