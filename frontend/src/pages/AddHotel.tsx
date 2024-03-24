import { useMutation } from "react-query";
import ManageHotelFrom from "../forms/ManageHotelForm/ManageHotelFrom";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";


const AddHotel = () => {
  const { showToast } = useAppContext()
  const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
    onSuccess: () => {
      showToast({ message: "Hotel added successfully", type: "success" })
    },

    onError: (error) => {
      showToast({ message: error as string, type: "error" })
    }
  })

  const handleSave = (hotelFormData: FormData) => {
   mutate(hotelFormData)
  }

  return (
    <ManageHotelFrom onSave={handleSave} isLoading={isLoading} />
  )
}

export default AddHotel