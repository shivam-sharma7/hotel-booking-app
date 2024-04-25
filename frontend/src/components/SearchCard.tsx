import { HotelTypes } from "../../../backend/src/models/hotelTypes";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";

type HotelProps = {
  hotel: HotelTypes;
};

const SearchCard = ({ hotel }: HotelProps) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 p-7 gap-7 ">
      <div className="w-full h-[300px]">
        <img
          src={hotel.imageUrls[0]}
          alt={hotel.name}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="grid grid-rows-[1fr_2fr_1fr]">
        <div>
          <div className="flex items-center">
            <span className="flex">
              {Array.from({ length: hotel.starRating }).map((_, index) => (
                <AiFillStar key={index} className="fill-yellow-400" />
              ))}
            </span>
            <span className="ml-1 font-medium text-sm">{hotel.type}</span>
          </div>
          <Link 
          to={`/detail/${hotel._id}`}
          className="text-xl font-bold cursor-pointer">{hotel.name}</Link>
        </div>
        <div>
            <p className="line-clamp-4 sm:mt-3">{hotel.description}</p>
        </div>
        <div className="grid grid-cols items-end whitespace-nowrap">
            <div className="flex gap-1 items-center">
              {hotel.facilities.slice(0, 3).map((facility, index) => (
                <span key={index} className="font-medium bg-slate-300 rounded p-2 text-xs">
                  {facility}
                  </span>
                ))}
                <span className="text-sm">
                 {hotel.facilities.length > 3 ? `+${hotel.facilities.length - 3} more` : ""}
                </span>
            </div>
            <div className="flex flex-col items-end gap-1">
                <span className="text-sm font-bold">€${hotel.pricePerNight} per night</span>
                <Link to={`/detail/${hotel._id}`} className="bg-blue-500 hover:bg-blue-600 text-white p-1 rounded">View More</Link>
            </div>
        </div>
      </div> 
    </div>
  );
};

export default SearchCard;
