import { UserModel } from "@/Types/UserModel.types";
import { Model, Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email id must be required"],
      unique: true,
    },
    username: {
      type: String,
      required: [true, "Email id must be required"],
    },
    password: {
      type: String,
      required: [true, "Password must be required"],
    },
    refreshToken: {
      type: String,
      default: "",
    },
    profile: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const User: Model<UserModel> =
  models.User || model<UserModel>("User", userSchema);
