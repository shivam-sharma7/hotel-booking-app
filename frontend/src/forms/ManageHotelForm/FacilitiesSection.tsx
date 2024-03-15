import { facilities } from "../../config/hotels-options";
import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelFrom";

const FacilitiesSection = () => {

  const { register, formState: { errors } } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Facilities</h2>
      <div className="grid grid-cols-3 gap-2">
        {facilities.map((facility) => (
          <label className="text-sm flex gap-1">
            <input type="checkbox"
              value={facility}
              {...register("facilities", {
               validate: (facilities) => {
                if (facilities && facilities.length > 0) {
                  return true;
                } else {
                  return "choose at least one facility";
                }
               } 
              })}
            />
            {facility}
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-500 text-sm font-bold">{errors.facilities.message}</span>)}
    </div>
  );
};

export default FacilitiesSection;