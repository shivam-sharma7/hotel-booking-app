import { FormProvider, useForm } from "react-hook-form"
import DetailsSection from "./DetailsSection"
import Typesection from "./Typesection"
import FacilitiesSection from "./FacilitiesSection"
import GuestSection from "./GuestSection"
import ImageSection from "./ImageSection"
import { HotelTypes } from "../../../../backend/src/models/hotelTypes"
import { useEffect } from "react"

export type HotelFormData = {
  name: string
  city: string
  country: string
  description: string
  type: string
  pricePerNight: number
  starRating: number
  facilities: string[]
  imageFiles: FileList
  imageUrls: string[]
  adultCount: number
  childCount: number
}

type ManageHotelFormProps = {
  hotel?: HotelTypes
  onSave: (hotelFormData: FormData) => void
  isLoading: boolean
}
const ManageHotelForm = ({ onSave, isLoading, hotel }: ManageHotelFormProps) => {
  const formMethods = useForm<HotelFormData>()
  const { handleSubmit, reset } = formMethods;

// reset the form when the hotel changes
  useEffect(() => {
    reset(hotel)
  },[hotel, reset])

  const onSubmit = handleSubmit ((formDataJson: HotelFormData) => {
    // console.log(formData) // keep it for debugging
    const formData = new FormData()
    if (hotel) {
      formData.append("hotelId", hotel._id)
    }
    formData.append("name", formDataJson.name)
    formData.append("city", formDataJson.city)
    formData.append("country", formDataJson.country)
    formData.append("description", formDataJson.description)
    formData.append("type", formDataJson.type)
    formData.append("pricePerNight", formDataJson.pricePerNight.toString())
    formData.append("starRating", formDataJson.starRating.toString())
    formData.append("adultCount", formDataJson.adultCount.toString())
    formData.append("childCount", formDataJson.childCount.toString())

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility)
    });

     // append the imageUrls if they exist in the form data
    if (formDataJson.imageUrls) {
      formDataJson.imageUrls.forEach((imageUrl, index) => {
        formData.append(`imageUrls [${index}]`, imageUrl)
      });
    }

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append("imageFiles", imageFile)
    });
    onSave(formData)
  })
  return (
       <FormProvider {...formMethods}> 
       <form className="flex flex-col gap-10" onSubmit={onSubmit}>
       <DetailsSection />
       <Typesection />
       <FacilitiesSection />
       <GuestSection />
       <ImageSection />
       <span className=" flex justify-end">
        <button 
        disabled={isLoading} // disable the button when the form is submitting
        type="submit" 
        className="bg-blue-500 text-white p-2 rounded-md font-bold hover:bg-blue-800 disabled:bg-gray-500"
        >
        {isLoading ? "Submitting..." : "Submit"}
        </button>
       </span>
       </form>
       </FormProvider>
      
  )
}

export default ManageHotelForm