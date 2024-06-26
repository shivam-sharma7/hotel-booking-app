import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import { HotelTypes } from "../models/hotelTypes";
import { Hotel } from '../models/hotel.model';
import { verifyToken } from "../middleware/auth";
import { body } from "express-validator";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 9 * 1024 * 1024 // 9MB
  },
});

// Path: api/my-hotels
router.post(
  "/",
  verifyToken, [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("location").notEmpty().withMessage("Location is required"),
    body("image").notEmpty().withMessage("Image is required"),
    body("adultCount").notEmpty().isNumeric().withMessage("Adult count is required"),
    body("childCount").notEmpty().withMessage("Child count is required"),
    body("facilities").notEmpty().isArray().withMessage("Facilities are required"),
    body("pricePerNight").notEmpty().isNumeric().withMessage("Price per night is required"),
    body("starRating").notEmpty().isNumeric().withMessage("Star rating is required"),
  ],
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newHotel: HotelTypes = req.body;
      // upload images to cloudinary
      const imageUrls = await uploadImages(imageFiles);
        // add the URLs to new hotel
        newHotel.imageUrls = imageUrls;
        newHotel.lastUpdated = new Date();
        newHotel.userId = req.userId;

        // save the new hotel in our database
        const hotel = new Hotel(newHotel);
        await hotel.save();
        // return 201 status
        return res.status(201).send(hotel)

    } catch (error) {
       console.log("Error while creating hotel", error);
        res.status(500).json({ message: "Error while creating hotel" });
    }
  }
);

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });
    return res.status(200).send(hotels);
  } catch (error) {
    console.log("Error while fetching hotels", error);
    res.status(500).json({ message: "Error while fetching hetels" });
  }
});

router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  const id = req.params.id.toString();
  try {
    const hotel = await Hotel.findOne({ _id: id, userId: req.userId});
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    return res.status(200).send(hotel);
  } catch (error) {
    console.log("Error while fetching hotel", error);
    res.status(500).json({ message: "Error while fetching hotel" });
  }
});

router.put("/:hotelId", verifyToken, upload.array("imageFiles"), async (req: Request, res: Response) => {
  try {
    const updateHotel: HotelTypes = req.body;
    updateHotel.lastUpdated = new Date();

    const hotel = await Hotel.findOne({
       _id: req.params.hotelId,
        userId: req.userId
     }, updateHotel, { new: true });
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    // upload images to cloudinary
    const files = req.files as Express.Multer.File[];
    const updatedImagesUrls = await uploadImages(files);

    hotel.imageUrls = [...updatedImagesUrls, ...(updateHotel.imageUrls || [])];
    await hotel.save();
    return res.status(200).send(hotel);   
  } catch (error) {
    console.log("Error while updating hotel", error);
    res.status(500).json({ message: "Error while updating hotel" });
  }
});

async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });
  // wait for all images to be uploaded
  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}

export default router;
