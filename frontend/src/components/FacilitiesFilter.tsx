import { facilities } from "../config/hotels-options"

type FacilitiesFilterProps = {
    selectedFacilities: string[]
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FacilitiesFilter = ({selectedFacilities, onChange}: FacilitiesFilterProps) => {
  return (
    <div className="border-b border-slate-400 pb-5">
        <h4 className="text-md font-semibold mb-2">Facilities</h4>
        {facilities.map((facility) => (
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="rounded" 
            value={facility}
            checked={selectedFacilities.includes(facility)} 
            onChange={onChange}
            />
            <span>{facility} Facilities</span>
          </label>
        ))}
     
    </div>
  )
}

export default FacilitiesFilter