import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";

const MyHotelList = () => {
  const { data: hotelData } = useQuery("fetchMyHotels", apiClient.getMyHotels, {
    onError: (error) => {
      console.log("Error while fetching hotels", error);
    },
  });
  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          to="/add-hotels"
          className="flex bg-blue-500
        text-white font-bold text-xl p-2 hover:bg-blue-700"
        >
          Add Hotels
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {hotelData?.map((hotel) => (
          <div
            key={hotel._id}
            className="border p-5 rounded-lg bg-white shadow-md"
          >
            <img
              src={hotel.imageUrls[0]}
              alt={hotel.name}
              className="w-full h-50 object-cover rounded"
            />
            <div className="flex justify-between items-center mt-5">
              <h2 className="text-2xl font-bold">{hotel.name}</h2>
              <span className="text-xl font-bold">
                ${hotel.pricePerNight} per night
              </span>
            </div>
            <p className="text-gray-600 mt-3 font-bold">{hotel.description}</p>
            <div className="flex justify-between items-center mt-5">
              <span className="text-gray-600 font-bold">{hotel.city} City</span>
              <span className="text-gray-600 font-bold">{hotel.country}</span>
              <span className="text-gray-600 font-bold">
                {hotel.starRating}
              </span>
            </div>
            <div className="flex justify-between items-center mt-5">
              <span className="text-gray-600 font-bold">{hotel.type}</span>
              <span className="text-gray-600 font-bold">
                {hotel.facilities}
              </span>
              <span className="text-gray-600 font-bold">
                {hotel.starRating} rating
              </span>
            </div>
            <div className="flex justify-between items-center mt-5">
              <span className="text-gray-600 font-bold">
                {hotel.adultCount} adults
              </span>
              <span className="text-gray-600 font-bold">
                {hotel.childCount} children
              </span>
            </div>
            <span className="flex justify-end">
              <Link 
               className="flex bg-blue-500
               text-white font-bold text-xl p-1 hover:bg-blue-700"
              to={`/edit-hotel/${hotel._id}`}>View details</Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotelList;
