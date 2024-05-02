
type StarRatingFilterProps = {
    selectedStars: string[]
    onStarChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}


const StarRatingFilter = ({selectedStars, onStarChange}: StarRatingFilterProps) => {
  return (
    <div className="border-b border-slate-400 pb-5">
        <h4 className="text-md font-semibold mb-2">Star Rating</h4>
        {["5", "4", "3", "2", "1"].map((star) => (
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="rounded" 
            value={star}
            checked={selectedStars.includes(star)} 
            onChange={onStarChange}
            />
            <span>{star} Stars</span>
          </label>
        ))}
     
    </div>
  )
}

export default StarRatingFilter