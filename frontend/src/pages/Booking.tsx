import * as apiClient from "../api-client";
import { useQuery } from "react-query";
import  BookingForm  from "../forms/ManageHotelForm/BookingForm/Booking";
import { useSearchContext } from "../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingDetails from "../components/BookingDetails";

const Booking = () => {
  const search =  useSearchContext();
  const { hotelId } = useParams();

  const [numOfNights, setNumOfNights] = useState<number>(0);

  useEffect(()=> {
    if (search.checkIn && search.checkOut) {
       const nights = Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) / 
       (1000 * 60 * 60 * 24);
       setNumOfNights(Math.ceil (nights));
    }

  },[search.checkIn, search.checkOut])

  const {data: hotel} = useQuery(["getHotelById", hotelId], () => apiClient.getHotelById(hotelId as string), {
    enabled: !!hotelId // only fetch the data if hotelId is truthy
  });

  const { data: currentLoginUser } = useQuery(
    "currentLoginUser",
    apiClient.getCurrentUser
  );

 if (!hotel) {
    return <></>
 }

  return ( 
  <div className="grid md:grid-cols-[1fr_2fr] ">
    <BookingDetails
     checkIn={search.checkIn.toString() }  
     checkOut={search.checkOut.toString()}  
     adultsCount={search.adultsCount}
     childCount={search.childCount}
     numOfNights={numOfNights}
     hotel={hotel}

    />
    {currentLoginUser && <BookingForm currentLoginUser={currentLoginUser} />}
     
  </div>
  );  
};

export default Booking;
