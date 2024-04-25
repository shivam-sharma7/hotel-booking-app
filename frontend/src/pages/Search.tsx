import { useQuery } from "react-query";
import { useState } from "react";
import { useSearchContext } from "../contexts/SearchContext"
import * as apiClient from '../api-client'
import SearchCard from "../components/SearchCard";

 
const Search = () => {
    const search = useSearchContext();
    const [page] = useState(1);

    const searchParams = {
        destination: search.destination,
        checkIn: search.checkIn.toISOString(), 
        checkOut: search.checkOut.toISOString(),
        adultsCount: search.adultsCount.toString(),
        childCount: search.childCount.toString(),
        page: page.toString()
    };

    const {data: hotelData } = useQuery(["searchHotels", searchParams], ()=> apiClient.searchHotels(searchParams))
    
    
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5 ">
      <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10 ">
        <div className="space-y-5">
          <h3 className="text-xl font-semibold border-b border-slate-300 pb-5">
            Filters:
          </h3>
          {/* {TODO FILTERS} */}
        </div>
      </div>
      <div className="flex flex-col gap-5">
       <div className="flex justify-between items-center">
        <span className="text-xl font-bold">
          {hotelData?.pagination.totalHotels} Hotels found
          {search.destination ? ` in ${search.destination}` : ""}
        </span>
        {/* {TODO sort options} */}
       </div>
        {hotelData?.data.map((hotel) => (
          <SearchCard key={hotel._id} hotel={hotel} />
        ))}
      </div>
    </div>
  )
}

export default Search 