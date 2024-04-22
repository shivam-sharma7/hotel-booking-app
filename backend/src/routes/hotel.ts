import express, { Request, Response } from "express";
import { Hotel } from "../models/hotel.model";
import { HotelTypes } from "../models/hotelTypes";
const router = express.Router();

type HotelSearchType = {
  data: HotelTypes[];
  pagination: {
    totalHotels: number;
    page: number;
    pages: number;
  };
};

router.get("/search", async (req: Request, res: Response) => {
  try {
    const pageSize = 5;
    const page = parseInt(req.query.page ? req.query.page.toString() : "1");
    const skip = (page - 1) * pageSize;
    const hotels = await Hotel.find().skip(skip).limit(pageSize);

    const totalHotels = await Hotel.countDocuments();

    const response: HotelSearchType = {
      data: hotels,
      pagination: {
        totalHotels,
        page: page,
        pages: Math.ceil(totalHotels / pageSize),
      },
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "something wen wrong" });
  }
});

export default router;
