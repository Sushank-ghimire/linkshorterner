import { Document } from "mongoose";

export interface UserModel extends Document {
  email: string;
  username: string;
  password: string;
  refreshToken?: string | "";
  profile: string;
  _id: string;
}
