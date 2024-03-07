import mongoose from "mongoose";

export type HotelTypes = {
  _id: string;
  name: string;
  city: string;
  description: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageUrls: string[];
  lastUpdated: Date;
};

const hotelSchema = new mongoose.Schema<HotelTypes>({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  city: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  image: { type: String, required: true },
  adultCount: { type: Number, required: true },
  childCount: { type: Number, required: true },
  facilities: [{ type: String, required: true }],
  pricePerNight: { type: Number, required: true },
  starRating: { type: Number, required: true, min: 1, max: 6},
  imageUrls: [{type: String, required: true}],
  lastUpdated: { type: Date, required: true },
});

export const Hotel = mongoose.model<HotelTypes>("Hotel", hotelSchema);
