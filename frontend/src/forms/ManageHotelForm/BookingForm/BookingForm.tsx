import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { UserTypes } from "../../../../../backend/src/models/userTypes"
import { paymentIntentType } from "../../../../../backend/src/routes/paymentTypes"
import { useForm } from "react-hook-form"
import { StripeCardElement } from "@stripe/stripe-js"
import { useSearchContext } from "../../../contexts/SearchContext"
import { useParams } from "react-router-dom"
import { useMutation } from "react-query"
import * as apiClient from "../../../api-client";
import { useAppContext } from "../../../contexts/AppContext"

type BookingFormProps = {
  currentLoginUser: UserTypes;
  paymentIntent: paymentIntentType;

}

export type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: string
  checkOut: string
  hotelId: string
  paymentIntentId: string
  totalCost: number
}


const BookingForm = ( { currentLoginUser, paymentIntent }: BookingFormProps ) => {
  const stripe = useStripe()
  const elements = useElements()
  const search = useSearchContext()
  const{ hotelId } = useParams()
  const { showToast } = useAppContext();

  const { mutate: bookRoom, isLoading } = useMutation(apiClient.createRoomBooking, {

    onSuccess: () => {
      showToast({ message: "Booking Saved!", type: "success" });
    },

    onError: () => {
      showToast({ message: "Booking not saved!", type: "error" });
    }
  },
)

  
  const { handleSubmit, register } = useForm<BookingFormData>({ 
    // defaultValues used to pre-populate the form with the currentlogInUser user details
    defaultValues: {
    firstName: currentLoginUser.firstName,
    lastName: currentLoginUser.lastName,
    email: currentLoginUser.email,
    adultCount: search.adultsCount,
    childCount: search.childCount,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    hotelId: hotelId,
    totalCost: paymentIntent.totalCost,
    paymentIntentId: paymentIntent.paymentIntentId
  }

  });

  const onSubmit = async(formData: BookingFormData) => {
    if (!stripe || !elements ) {
      return;
    }
    const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement
      }
    })

    if(result.paymentIntent?.status === "succeeded") {
       bookRoom({...formData, paymentIntentId: result.paymentIntent.id})
    }
  };

 

  return (
     <form className="grid grid-cols-1 gap-6 rounded-lg border border-slate-300"
     onSubmit={handleSubmit(onSubmit)} 
      >
      <span className="text-3xl font-bold px-1">Confirm Your Details</span>
      <div className="grid grid-cols-2 gap-6">
       <label className="text-gray-700 px-2 text-sm font-bold flex-1">
          First Name
          <input
          className="mt-1 border rounded w-full  py-2"
            type="text"
            readOnly
            disabled
            {...register("firstName")}
          />
       </label>

       <label className="text-gray-700 px-2 text-sm font-bold flex-1">
          Last Name
          <input
          className="mt-1 border rounded w-full   py-2 text-gray-700 "
            type="text"
            readOnly
            disabled
            {...register("lastName")}
          />
        </label>

       <label className="text-gray-700 text-sm px-2 font-bold flex-1">
         Email
          <input
          className="mt-1 border rounded w-full  py-2 text-gray-700 "
            type="text"
            readOnly
            disabled
            {...register("email")}
          />
       </label>
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Your Price Summary</h2>

        <div className="bg-blue-200 p-4 rounded-md">
          <div className="font-semibold text-lg">
            Total Cost: £{paymentIntent.totalCost.toFixed(2)}
          </div>
          <div className="text-xs">Includes taxes and charges</div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold"> Payment Details</h3>
        <CardElement
          id="payment-element"
          className="border rounded-md p-2 text-sm"
        />
      </div>
       <div className="flex justify-end">
       <button
        disabled={isLoading}
        type="submit"
        className="bg-blue-600 hover:bg-blue-500 p-2 m-1 rounded-lg text-white font-semibold disables:bg-gray-500"
        >
        {isLoading ? "Saving.." : "Confirm Booking"}
        </button>
       </div>
     </form>
  )
}

export default BookingForm