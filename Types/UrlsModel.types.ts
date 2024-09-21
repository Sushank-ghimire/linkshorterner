import { Document } from "mongoose";

export interface UrlsModel extends Document {
  originalUrl: string;
  shortedUrl: string;
  title: string;
  user_id: any;
  qrcode: string;
  _id: string;
  clicks: number;
}
