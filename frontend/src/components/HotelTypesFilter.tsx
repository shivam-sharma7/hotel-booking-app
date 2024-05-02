import { hotelsOptions } from '../config/hotels-options'

type HotelTypesFilterProps = {
     selectedHotelTypes: string[]
    onStarChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const HotelTypesFilter = ({selectedHotelTypes, onStarChange}: HotelTypesFilterProps) => {
  return (
    <div className="border-b border-slate-400 pb-5">
        <h4 className="text-md font-semibold mb-2">Hotel Types</h4>
        {hotelsOptions.map((type) => (
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="rounded" 
            value={type}
            checked={selectedHotelTypes.includes(type)} 
            onChange={onStarChange}
            />
            <span>{type} Types</span>
          </label>
        ))}
     
    </div>
  )
}


export default HotelTypesFilter