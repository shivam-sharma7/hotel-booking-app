import { RegisterForm } from "./pages/Register";
import { SignInForm  } from "./pages/SignIn";
import { HotelTypes } from "../../backend/src/models/hotelTypes";
import { HotelSearchResponse } from "../../backend/src/routes/hotelTypes";
import { UserTypes } from "../../backend/src/models/userTypes"


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const getCurrentUser = async (): Promise<UserTypes> => {
    const response = await fetch(`${API_BASE_URL}/api/users/me`, {
        method: "GET",
        credentials: "include",
    });
    const responseBody = await response.json();
    if (!response.ok) {
        throw new Error(responseBody.message);
    }
    return responseBody;

}

export const register = async (formData: RegisterForm) => {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });   
    
    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error(responseBody.message);
    }
};

export const signIn = async (formData: SignInForm ) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });
    const responseBody = await response.json();
    if (!response.ok) {
        throw new Error(responseBody.message);
    }
    return responseBody;
};

export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        method: "GET",
        credentials: "include",
    });
    const responseBody = await response.json();
    if (!response.ok) {
        throw new Error(responseBody.message);
    }
    return responseBody;
};

export const signout = async () => {
  const responseBody = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
    });

    if (!responseBody.ok) {
        throw new Error("Error during logout. Please try again.");
    }
};

export const addMyHotel = async (hotelFormData: FormData) => {
    const responseBody = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        method: "POST",
        credentials: "include",
        body: hotelFormData
    });
    
    if (!responseBody.ok) {
        throw new Error("Error during adding hotel. Please try again.");
    }

    return responseBody.json();
}

export const getMyHotels = async (): Promise<HotelTypes[]> => {
    const responseBody = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        method: "GET",
        credentials: "include",
    });

    if (!responseBody.ok) {
        throw new Error("Error during fetching hotels. Please try again.");
    }

    return responseBody.json();
}

export const getMyHotelById = async (hotelId: string): Promise<HotelTypes> => {
    const responseBody = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
        method: "GET",
        credentials: "include",
    });

    if (!responseBody.ok) {
        throw new Error("Error during fetching hotel. Please try again.");
    }

    return responseBody.json();
}

export const updateMyHotelById = async (hotelFormData: FormData) => {
    const responseBody = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`, {
        method: "PUT",
        credentials: "include",
        body: hotelFormData,
    });

    if (!responseBody.ok) {
        throw new Error("Error during updating hotel. Please try again.");
    }

    return responseBody.json();
}

/* 
  search params send to backend. we have define everithing in string
  because backend will parse it.

*/

export type SearchParams = {
    destination?: string;
    checkIn?: string;
    checkOut?: string;
    adultsCount?: string;
    childCount?: string;
    page?: string;
    facilities?: string[];
    types?: string[];
    stars?: string[];
    maxPrice?: string;
    sortOption?: string;
};

export const searchHotels = async (searchParams: SearchParams): Promise<HotelSearchResponse> => {
    const queryParams = new URLSearchParams()
    queryParams.append("destination", searchParams.destination || "")
    queryParams.append("checkIn", searchParams.checkIn || "")
    queryParams.append("checkOut", searchParams.checkOut || "")
    queryParams.append("adultsCount", searchParams.adultsCount || "")
    queryParams.append("childCount", searchParams.childCount || "")
    queryParams.append("page", searchParams.page || "")

    queryParams.append("maxPrice", searchParams.maxPrice || "")
    queryParams.append("sortOption", searchParams.sortOption || "")

    searchParams.facilities?.forEach((facility) => {
        queryParams.append("facilities", facility);
    });
    
    searchParams.types?.forEach((type) => {
        queryParams.append("types", type);
    });

    searchParams.stars?.forEach((star) => {
        queryParams.append("stars", star);
    });

    const responseBody = await fetch(`${API_BASE_URL}/api/hotels/search?${queryParams}`, {
        method: "GET",
        credentials: "include",
    });

    if (!responseBody.ok) {
        throw new Error("Error during fetching hotels. Please try again.");
    }

    return responseBody.json();
}

export const getHotelById = async (hotelId: string): Promise<HotelTypes> => {
    const responseBody = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`, {
        method: "GET",
        credentials: "include",
    });

    if (!responseBody.ok) {
        throw new Error("Error during fetching hotel. Please try again.");
    }

    return responseBody.json();
}