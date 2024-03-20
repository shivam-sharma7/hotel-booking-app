import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelFrom";

const ImageSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Image</h2>
      <div className="border rounded p-3 flex flex-col gap-4">
        <input
          type="file"
          multiple // user can select multiple file
          accept="image/*"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              if (imageFiles && imageFiles.length > 0) {
                return true;
              }
              if (imageFiles.length > 6) {
                return "Total images cannot be more than 6";
              } else {
                return "Please upload at least one image";
              }
            },
          })}
          className="w-full"
        />
      </div>
      {errors.imageFiles && (
        <span className="text-red-500 text-sm font-bold">
          {errors.imageFiles.message}
        </span>
      )}
    </div>
  );
};

export default ImageSection;
