import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useMutation, useQueryClient } from "react-query";

const SignOutButton = () => {
    const queryClient = useQueryClient();
    const { showToast } = useAppContext()

    const mutation = useMutation(apiClient.signout, {
        onSuccess: async () => {
            await queryClient.invalidateQueries("validateToken");
            showToast({ type: "success", message: "You signed out successfully" });

        },
        onError: (error: Error) => {
            showToast({ type: "error", message: error.message });
        },
    });

    const handleClick = () => {
        mutation.mutate();
    };

    return (
        <button
            onClick={handleClick}
            className="items-center px-3  font-bold text-blue-600
      bg-white hover:bg-gray-300 rounded-full">
            Sign out
        </button>
    );
};

export default SignOutButton;
