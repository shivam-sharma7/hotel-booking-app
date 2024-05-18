import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSearchContext } from "../../../contexts/SearchContext";
import { useAppContext } from "../../../contexts/AppContext";
import { useNavigate, useLocation } from "react-router-dom";


type GuestInfoFormProps = {
  hotelId: string;
  pricePerNight: number;
};

type GuestInfoFormValues = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};

const GuestInfoFrom = ({ hotelId, pricePerNight }: GuestInfoFormProps) => {
    const search = useSearchContext();
    const { isLoggedIn } = useAppContext();
    const navigate = useNavigate();
    const location = useLocation();
    
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestInfoFormValues>({
    defaultValues: { // save previous search values in guest info form
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultsCount,
      childCount: search.childCount,
    },
  });

 
  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");
  const mindate = new Date();
  const maxdate = new Date();
  maxdate.setFullYear(maxdate.getFullYear() + 1);

  const onSignInClick = (data: GuestInfoFormValues) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    )
    navigate("/sign-in", { state: { from: location } });
  }

  const onSubmit = (data: GuestInfoFormValues) => {
    search.saveSearchValues(
      hotelId,
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );
    navigate(`/hotel/${hotelId}/booking`);
  };

  return (
    <div className="flex flex-col p-4 bg-blue-200 gap-4">
      <h3 className="text-md font-bold">€{pricePerNight}</h3>
      <form  
      onSubmit={isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)}
      >
        <div className="grid grid-cols-1 gap-4 items-center">
          <div>
            <DatePicker
              required
              selected={checkIn}
              onChange={(date) => setValue("checkIn", date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={mindate}
              maxDate={maxdate}
              placeholderText="Check In Date"
              className="w-full p-1 text-center focus:outline-none"
            />
          </div>
          <div>
            <DatePicker
              required
              selected={checkOut}
              onChange={(date) => setValue("checkOut", date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={mindate}
              maxDate={maxdate}
              placeholderText="Check out Date"
              className="w-full p-1 text-center focus:outline-none"
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
                {...register("adultCount", {
                  required: true,
                  min: {
                    value: 1,
                    message: "Minimum value is 1 for an adult ",
                  },
                })}
              />
            </label>
              {errors.adultCount && (
                <span className="text-red-500">
                  {errors.adultCount.message}
                </span>
              )}
            <label className="flex  items-center">
              Children:
              <input
                type="number"
                className="w-full p-1  text-center focus:outline-none"
                min={1}
                max={10}
                {...register("childCount", {
                  required: true,
                  min: {
                    value: 1,
                    message: "Minimum value is 1 for an adult ",
                  },
                })}
              />
            </label>
              {errors.childCount && (
                <span className="text-red-500">
                  {errors.childCount.message}
                </span>
              )}
          </div>
          {isLoggedIn ?(
          <button className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl">Book Now</button>
          ): (
          <button className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl">Sign in to Book</button>)}
        </div>
      </form>
    </div>
  );
};

export default GuestInfoFrom;
