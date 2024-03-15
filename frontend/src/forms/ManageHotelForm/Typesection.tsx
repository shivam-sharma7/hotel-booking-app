// Code: ManageHotelForm Typesection component

import { useFormContext } from "react-hook-form"
import { hotelsOptions } from "../../config/hotels-options"
import { HotelFormData } from "./ManageHotelFrom"

const Typesection = () => {
  const { register, watch, formState: { errors }, } = useFormContext<HotelFormData>()
  const typeWatch = watch("type")

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Type</h2>
      <div className="grid grid-cols-5 gap-2">
        {hotelsOptions.map((type, index) => (
          <label key={index} className={
            typeWatch === type
              ? "cursor-pointer text-sm rounded-full px-4 py-1 bg-cyan-300"
              : "cursor-pointer text-sm rounded-full px-4 py-1 bg-gray-200"
          }>
            <input
              type="radio"
              value={type}
              {...register("type", {
                required: "This field is required",
              })}
              className="hidden"
            />
            <span className="">{type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="text-red-500 text-sm font-bold">{errors.type.message}</span>
      ) }
    </div>
  )
}

export default Typesection