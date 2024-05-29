import * as apiClient from "../api-client";
import { useQuery } from "react-query";
import  BookingForm  from "../forms/ManageHotelForm/BookingForm/BookingForm";
import { useSearchContext } from "../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingDetails from "../components/BookingDetails";
import {Elements} from '@stripe/react-stripe-js';
import { useAppContext } from "../contexts/AppContext";

const Booking = () => {
  const  { stripePromise } = useAppContext()
  const search =  useSearchContext();
  const { hotelId } = useParams();

  const [numOfNights, setNumOfNights] = useState<number>(1);


  useEffect(()=> {
    if (search.checkIn && search.checkOut) {
       const nights = Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) / 
       (1000 * 60 * 60 * 24);
       setNumOfNights(Math.ceil(nights));
    }

  },[search.checkIn, search.checkOut])

  const { data: paymentIntentData } = useQuery("createPaymentIntent", ()=> apiClient.createPaymentIntent(hotelId as string, numOfNights.toString()),
  {
    enabled: !!hotelId && numOfNights > 0,
  }
)

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
    <div className="grid md:grid-cols-[1fr_2fr]">
      <BookingDetails
        checkIn={search.checkIn.toString()}
        checkOut={search.checkOut.toString()}
        adultsCount={search.adultsCount}
        childCount={search.childCount}
        numOfNights={numOfNights}
        hotel={hotel}
      />
      {currentLoginUser && paymentIntentData && (
        <Elements
          stripe={stripePromise}
          options={
            {
              clientSecret: paymentIntentData.clientSecret
            }
          }
           
        >
          <BookingForm
            currentLoginUser={currentLoginUser}
            paymentIntent={paymentIntentData}
          />
        </Elements>
      )}
    </div>
  );  
};

export default Booking;
