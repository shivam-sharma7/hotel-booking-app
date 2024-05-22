import { UserTypes } from "../../../../../backend/src/models/userTypes"
import { useForm } from "react-hook-form"

type BookingFormProps = {
  currentLoginUser: UserTypes

}

type BookingFormData = {
  firstName: string
  lastName: string
  email: string
}


const BookingForm = ( { currentLoginUser }: BookingFormProps ) => {
  
  const { handleSubmit, register } = useForm<BookingFormData>({ 
    // defaultValues used to pre-populate the form with the currentlogInUser user details
    defaultValues: {
    firstName: currentLoginUser.firstName,
    lastName: currentLoginUser.lastName,
    email: currentLoginUser.email
  }
  });

  return (
     <form className="grid grid-cols-1 gap-6 rounded-lg border border-slate-300">
      <span className="text-3xl font-bold">Confirm Your Details</span>
      <div className="grid gride-cols-2 gap-5">
       <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
          className="mt-1 border rounded w-full px-3  py-2"
            type="text"
            readOnly
            disabled
            {...register("firstName")}
          />
       </label>

       <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
          className="mt-1 border rounded w-full px-3  py-2 text-gray-700 "
            type="text"
            readOnly
            disabled
            {...register("lastName")}
          />
        </label>

       <label className="text-gray-700 text-sm font-bold flex-1">
         Email
          <input
          className="mt-1 border rounded w-full px-3 py-2 text-gray-700 "
            type="text"
            readOnly
            disabled
            {...register("email")}
          />
       </label>

      </div>
     </form>
  )
}

export default BookingForm