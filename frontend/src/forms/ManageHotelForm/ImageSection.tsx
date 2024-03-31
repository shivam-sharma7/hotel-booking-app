import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelFrom";

const ImageSection = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<HotelFormData>();

  const existingImages = watch("imageUrls");

  const handleDeleteImage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, imageUrl: string) => {
    e.preventDefault();
    setValue("imageUrls", 
    existingImages?.filter((url) => url !== imageUrl));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Image</h2>
      <div className="border rounded p-3 flex flex-col gap-4">
        {existingImages && (
          <div className="grid grid-cols-6 gap-4">
            {existingImages.map((url) => (
              <div className="relative group">
                <img src={url} className="min-h-full object-cover" />
                <button
                 onClick={(e) => handleDeleteImage(e, url)}
                 className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white">
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        <input
          type="file"
          multiple // user can select multiple file
          accept="image/*"
          {...register("imageFiles", {
            validate: (imageFiles) => {
               const  totalLength = (existingImages?.length || 0) + imageFiles.length;
               if (totalLength === 0) {
                  return "Please upload at least one image";
                }
               if (totalLength > 6) {
                 return "You can upload a maximum of 6 images";
               }
                return true;
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
