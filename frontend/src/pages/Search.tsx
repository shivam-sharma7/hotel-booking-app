import { useQuery } from "react-query";
import { useState } from "react";
import { useSearchContext } from "../contexts/SearchContext"
import * as apiClient from '../api-client'
import SearchCard from "../components/SearchCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";

 
const Search = () => {
    const search = useSearchContext();
    const [page, setPage] = useState(1);
    const [selectedStars, setSelectedStars] = useState<string[]>([]);

    const searchParams = {
        destination: search.destination,
        checkIn: search.checkIn.toISOString(), 
        checkOut: search.checkOut.toISOString(),
        adultsCount: search.adultsCount.toString(),
        childCount: search.childCount.toString(),
        page: page.toString(),
        stars: selectedStars
    };

    const {data: hotelData } = useQuery(["searchHotels", searchParams], ()=> apiClient.searchHotels(searchParams))
    
    const handleStarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (selectedStars.includes(value)) {
            setSelectedStars(selectedStars.filter((star) => star !== value));
        } else {
            setSelectedStars([...selectedStars, value]);
        }
    }
    
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5 ">
      <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10 ">
        <div className="space-y-5">
          <h3 className="text-xl font-semibold border-b border-slate-300 pb-5">
            Filters:
          </h3>
          <StarRatingFilter selectedStars={selectedStars} onStarChange={handleStarChange} />
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
        <div>
          <Pagination 
          page={hotelData?.pagination.page || 1} 
          pages={hotelData?.pagination.pages || 1} 
          onPageChange={(page)=> setPage(page)}   />
        </div>
      </div>
    </div>
  )
}

export default Search 