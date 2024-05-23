import { HotelTypes } from "../../../backend/src/models/hotelTypes";

type Props = {
  checkIn: string;
  checkOut: string;
  adultsCount: number;
  childCount: number;
  numOfNights: number;
  hotel: HotelTypes;
};

const BookingDetails = ({
  checkIn,
  checkOut,
  adultsCount,
  childCount,
  numOfNights,
  hotel,
}: Props) => {
  return (
    <div className="grid gap-4 rounded-lg border border-slate-300 p-5 h-fit">
      <h2 className="font-bold">Yor Booking Details</h2>
      <div className="border-b py-2">
        Location:
        <span className="text-gray-700 mx-1">{`${hotel.name}, ${hotel.city}, ${hotel.country}`}</span>
      </div>
      <div className="flex flex-col justify-between gap-3">
        <div>
          Check-n:
          <div className="font-bold">{checkIn.toString()}</div>
        </div>
        <div>
          Check out:
          <div className="font-bold">{checkOut.toString()}</div>
        </div>
      </div>
      <div className="border-t border-b">
        Total lenght of stay:
        <div className="font-bold">{numOfNights} nights</div>
      </div>
      <div className="border-t border-b">
        Guests:
        <div className="font-bold">
          {adultsCount} adults & {childCount} children
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
