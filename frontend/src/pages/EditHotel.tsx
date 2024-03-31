import { useParams } from "react-router-dom" 
import { useQuery, useMutation } from "react-query"
import * as apiClient from "../api-client"
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelFrom"
import { useAppContext } from "../contexts/AppContext"


const EditHotel = () => {
  const { showToast } = useAppContext();
  const { hotelId } = useParams()

  const { data: hotel, isLoading } = useQuery("getMyHotelById", ()=> 
  apiClient.getMyHotelById(hotelId || ''), {
    enabled: !!hotelId,
  });

  const { mutate } = useMutation(apiClient.updateMyHotelById, {
    onSuccess: () => {
      showToast({type: "success", message: "Hotel updated successfully"})
    },
    onError: (error: Error) => {
      showToast({type: "error", message: error.message})
    }})

    const handleSave = (hotelDataFormData: FormData) => {
      mutate(hotelDataFormData)
    }

  return (
    <ManageHotelForm  isLoading={isLoading}  hotel={hotel} onSave={handleSave} />
  )
}

export default EditHotel