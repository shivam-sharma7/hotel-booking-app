import * as apiClient from "../api-client";
import { useQuery } from "react-query";
import  BookingForm  from "../forms/ManageHotelForm/BookingForm/Booking";

const Booking = () => {
  const { data: currentLoginUser } = useQuery(
    "currentLoginUser",
    apiClient.getCurrentUser
  );

  console.log(currentLoginUser?.email)

  return ( 
  <div className="grid md:grid-cols-[1fr_2fr] ">
    <div className="bg-green-200  text-2xl font-bold">Your Booking Details</div>
    {currentLoginUser && <BookingForm currentLoginUser={currentLoginUser} />}
     
  </div>
  );  
};

export default Booking;
