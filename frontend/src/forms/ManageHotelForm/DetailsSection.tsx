import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelFrom";
import { starRating } from "../../config/hotels-options";

/*
  This is a form section for adding hotel details. It contains a form field for the hotel name.
  The form field is registered with the react-hook-form library to enable form validation.
*/

const DetailsSection = () => {
  const { register, formState: { errors } } = useFormContext<HotelFormData>();
   
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold sm:text-2xl">Add Hotels</h1>
      <label className="text-gray-600 text-sm font-bold flex-1">
        Name
        <input
          className="border rounded w-full py-1 px-2 font-norma"
          type="name"
          {...register("name", { required: "This field is required" })}
        />
        {errors.name && (
          <span className="text-red-500 text-xs">{errors.name.message}</span>
        )}
      </label>
      <div className="flex gap-4">
        <label className="text-gray-600 text-sm font-bold flex-1">
          City
          <input
            className="border rounded w-full py-1 px-2 font-norma"
            type="city"
            {...register("city", { required: "This field is required" })}
          />
          {errors.city && (
            <span className="text-red-500 text-xs">{errors.city.message}</span>
          )}
        </label>
        <label className="text-gray-600 text-sm font-bold flex-1">
          Country
          <input
            className="border rounded w-full py-1 px-2 font-norma"
            type="country"
            {...register("country", { required: "This field is required" })}
          />
          {errors.country && (
            <span className="text-red-500 text-xs">{errors.country.message}</span>
          )}
        </label>
      </div>
      <label className="text-gray-600 text-sm font-bold flex-1">
        Description
        <textarea
         rows={10}
          className="border rounded w-full py-1 px-2 font-norma"
          {...register("description", { required: "This field is required" })}
        ></textarea>
        {errors.description && (
          <span className="text-red-500 text-xs">{errors.description.message}</span>
        )}
      </label>
      <label className="text-gray-600 text-sm font-bold max-w-[50%]">
          Price Per Night
          <input
            className="border rounded w-full py-1 px-2 font-norma"
            type="number"
            min={1}
            {...register("pricePerNight", { required: "This field is required" })}
          />
          {errors.pricePerNight && (
            <span className="text-red-500 text-xs">{errors.pricePerNight.message}</span>
          )}
        </label>
        <label className="text-gray-600 text-sm font-bold max-w-[50%]">
          Star Rating
          <select {...register("starRating", {
            required: "This field is required",
          })}
          className="border rounded w-full py-1  text-gray-600 font-normal"
          >
            <option value="" className="text-sm font-bold ">
             Select rating
            </option>
            {starRating.map((rating) => (
              <option key={rating} value={rating} className="text-sm font-bold">
                {rating}
              </option>      
            ))}
          </select>
          {errors.starRating && (
            <span className="text-red-500 text-xs">{errors.starRating.message}</span>
          )}
        </label>
    </div>
  );
};

export default DetailsSection;
