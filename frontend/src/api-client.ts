import { RegisterForm } from "./pages/Register";
import { SignInForm  } from "./pages/SignIn";
import { HotelTypes } from "../../backend/src/models/hotel.model";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

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
