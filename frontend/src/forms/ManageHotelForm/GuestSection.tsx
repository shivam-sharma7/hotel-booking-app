import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelFrom";

const GuestSection = () => {
    const { register, formState: { errors }, } = useFormContext<HotelFormData>();
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Guests</h2>

            <div className="grid grid-cols-2 p-6  gap-40 bg-gray-400 ">
                <label className="text-sm flex gap-1">
                    Adults
                    <input
                        type="number"
                        {...register("adultCount", {
                            required: "Please enter the number of adults",
                            min: { value: 1, message: "Minimum 1 adult" },
                        })}
                        className="px-1 w-full font-normal"
                    />
                </label>
                {errors.adultCount && (
                    <span className="text-red-500 text-sm font-bold">
                        {errors.adultCount.message}
                    </span>
                )}

                <label className="text-sm flex gap-1">
                    Children
                    <input
                        type="number"
                        {...register("childCount", {
                            required: "Please enter the number of children",
                            min: { value: 0, message: "Minimum 0 children" },
                        })}
                        className="px-1 w-full"
                    />
                </label>
                {errors.childCount && (
                    <span className="text-red-500 text-sm font-bold">
                        {errors.childCount.message}
                    </span>
                )}

            </div>
        </div>
    )
};

export default GuestSection;
