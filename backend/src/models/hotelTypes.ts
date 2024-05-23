export type HotelTypes = {
    _id: string;
    userId: string;
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    location: string;
    adultCount: number;
    childCount: number;
    facilities: string[];
    pricePerNight: number;
    starRating: number;
    imageUrls: string[];
    lastUpdated: Date;
    bookings: BookingType[];
  };

  export type BookingType = {
    _id: string,
    userId: string,
    firstName: string,
    lasName: string,
    email: string,
    adultCount: number,
    childCount: number,
    checkIn: Date,
    checkOut: Date,
    totalCost: number,
  }