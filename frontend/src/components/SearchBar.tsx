import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import DatePicker  from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";


const SearchBar = () => {
  const navigate = useNavigate()
  const search = useSearchContext();
  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultsCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );
    navigate("/search")
  };

    const mindate = new Date();
    const maxdate = new Date();
    maxdate.setFullYear(maxdate.getFullYear() + 1);


  return (
    <form
      onSubmit={handleSubmit}
      className="-mt-8 p-3 bg-orange-400 shadow-md grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center">
      <div className="flex items-center flex-1 m-2 bg-white p-2">
        <MdTravelExplore size={25} />
        <input
          type="text"
          placeholder="Destination"
          className="w-full text-md focus:outline-none px-1"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>
       
       <div className="flex bg-white px-2 py-1 gap-3">
         <label className="flex  items-center">
            Adults:
            <input
              type="number"
              className="w-full p-1  text-center focus:outline-none"
              min={1}
              max={20}
              value={adultCount}
              onChange={(e) => setAdultCount(parseInt(e.target.value))}
            />
         </label>

         <label className="flex items-center">
            Children:
            <input
              type="number"
              className="w-full p-1 text-center focus:outline-none"
              min={0}
              max={10}
              value={childCount}
              onChange={(e) => setChildCount(parseInt(e.target.value))}
            />
         </label>
       </div>

       <div className="flex m-2 bg-white px-2 py-1 gap-2">
         <DatePicker 
         selected={checkIn} 
         onChange={(date) => setCheckIn(date as Date)}
         selectsStart 
         startDate={checkIn}
         endDate={checkOut}
         minDate={mindate}
         maxDate={maxdate}
         placeholderText="Check In Date"
         className="w-full p-1 text-center focus:outline-none"
         />
       </div>
       <div className="flex m-2 bg-white px-2 py-1 gap-2">
         <DatePicker 
         selected={checkOut} 
         onChange={(date) => setCheckOut(date as Date)}
         selectsStart 
         startDate={checkOut}
         endDate={checkOut}
         minDate={mindate}
         maxDate={maxdate}
         placeholderText="Check In Date"
         className="w-full p-1 text-center focus:outline-none"
         />
       </div>

         <div className="flex gap-1"> 
         <button
            type="submit"
            className="w-2/3 bg-blue-500 hover:bg-blue-700  text-white p-2 rounded-lg">
            Search
        </button>
         <button
            type="submit"
            className="w-1/3 bg-red-500 hover:bg-red-700  text-white p-2 rounded-lg">
            Clear
        </button>
        </div>
    </form>
  );
};

export default SearchBar;
