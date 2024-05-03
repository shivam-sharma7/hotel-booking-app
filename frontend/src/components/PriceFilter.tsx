import { hotelPrice } from "../config/hotels-options";
type PriceFilterProps = {
  selectedPrice?: number;
  onChange: (value?: number) => void;
};

const PriceFilter = ({ selectedPrice, onChange }: PriceFilterProps) => {
  return (
    <div>
      <h4 className="text-md font-semibold mb-2">Max Price</h4>
      <select
        className="rounded p-2 w-full"
        value={selectedPrice}
        onChange={(e) =>
          onChange(e.target.value ? parseInt(e.target.value) : undefined)
        }
      >
        <option value="">Select Price</option>
        {hotelPrice.map((price) => (
          <option key={price} value={price}>
            ${price}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PriceFilter;
