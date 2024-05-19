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
  const [destination, setDestination] = useState(()=> sessionStorage.getItem("destination") || "" );
  const [checkIn, setCheckIn] = useState<Date>(()=> new Date(sessionStorage.getItem("checkIn") || new Date().toISOString()));
  const [checkOut, setCheckOut] = useState<Date>(()=> new Date(sessionStorage.getItem("checkOut") || new Date().toISOString()));
  const [adultsCount, setAdultsCount] = useState<number>(()=> parseInt(sessionStorage.getItem("adultsCount") || '1'));
  const [childCount, setChildCount] = useState<number>(()=> parseInt(sessionStorage.getItem("childCount") || '1'));
    const [hotelId, setHotelId] = useState<string>(()=> sessionStorage.getItem("hotelId") || "");

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
    
    sessionStorage.setItem("destination", destination)
    sessionStorage.setItem("checkIn", checkIn.toISOString())
    sessionStorage.setItem("checkOut", checkOut.toISOString())
    sessionStorage.setItem("adultsCount", adultsCount.toString())
    sessionStorage.setItem("childCount", childCount.toString())
    if (hotelId) {
      sessionStorage.setItem("hotelId", hotelId)
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
