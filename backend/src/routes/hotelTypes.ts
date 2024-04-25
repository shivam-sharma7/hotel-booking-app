import { HotelTypes } from "../models/hotelTypes";

export type HotelSearchResponse = {
    data: HotelTypes[];
    pagination: {
      totalHotels: number;
      page: number;
      pages: number;
    };
  };