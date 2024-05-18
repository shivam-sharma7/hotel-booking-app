import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { AiFillStar } from "react-icons/ai";
import GuestInfoFrom from "../forms/ManageHotelForm/GuestInfoForm.tsx/GuestInfoFrom";

const HotelDetail = () => {
  const { hotelId } = useParams();

  const { data: hotel } = useQuery(
    "getHotelById",
    () => apiClient.getHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );

  if (!hotel) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="flex">
          {Array.from({ length: hotel?.starRating ?? 0 }).map(() => (
            <AiFillStar className="text-yellow-400" />
          ))}
        </span>
        <h1 className="font-bold text-2xl">{hotel.name}</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {hotel.imageUrls.map((img) => (
          <div className="h-[300px]">
            <img
              src={img}
              alt={hotel.name}
              className="w-full h-full object-cover object-center rounded-md"
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
         {hotel.facilities.map((facility) => (
            <div className="p-2 bg-gray-300 rounded-md">{facility}</div>
         ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-flow-col-[2fr, 1fr]">
        <div className="whitespace-pre-line">
          {hotel.description}
        </div>
        <div className="h-fit">
          <GuestInfoFrom hotelId={hotel._id} pricePerNight={hotel.pricePerNight} />

        </div>
      </div>
    </div>
  );
};

export default HotelDetail;
