import { createContext, useContext, useState } from "react";

type SearchContext = {
  destination: string;
  checkIn: Date;
  checkOut: Date;
  adultsCount: number;
  childCount: number;
  hotelId: string;
  saveSearchValues: (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultsCount: number,
    childCount: number
  ) => void;
};

const SearchContext = createContext<SearchContext | undefined>(undefined);

type SearchContextProvider = {
  children: React.ReactNode;
};

export const SearchContextProvider = ({ children }: SearchContextProvider) => {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState<Date>(new Date());
  const [checkOut, setCheckOut] = useState<Date>(new Date());
  const [adultsCount, setAdultsCount] = useState<number>(1);
  const [childCount, setChildCount] = useState<number>(0);
    const [hotelId, setHotelId] = useState<string>("");

  const saveSearchValues = (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultsCount: number,
    childCount: number,
    hotelId?: string
  ) => {
    setDestination(destination);
    setCheckIn(new Date(checkIn));
    setCheckOut(new Date(checkOut));
    setAdultsCount(adultsCount);
    setChildCount(childCount);
    if (hotelId) {
      setHotelId(hotelId);
    }   
  };

  return (
    <SearchContext.Provider
      value={{
        destination,
        checkIn,
        checkOut,
        adultsCount,
        childCount,
        hotelId,
        saveSearchValues,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error(
      "useSearchContext must be used within a SearchContextProvider"
    );
  }
  return context as SearchContext;
}
