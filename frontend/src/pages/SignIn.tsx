import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { useLocation } from "react-router-dom";

export type SignInForm = {
  email: string;
  password: string;
};

const SignIn = () => {
    const queryClient = useQueryClient();  
    const { showToast } = useAppContext()
    const location = useLocation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInForm>();

  const navigate = useNavigate();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      showToast({ type: "success", message: "You signed in successfully" });
      await queryClient.invalidateQueries("validateToken");
      navigate(location.state?.from?.pathname || "/");
    },
    onError: (error: Error) => {
      showToast({ type: "error", message: error.message });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Sign In</h2>

      <label className="text-gray-600 text-sm font-bold flex-1">
        Email
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          type="email"
          {...register("email", { required: "This field is required" })}
        />
        {errors.email && (
          <span className="text-red-500 text-xs">{errors.email.message}</span>
        )}
      </label>
      <label className="text-gray-600 text-sm font-bold flex-1">
        Password
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          type="password"
          autoComplete="new-password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password must have at least 8 characters",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500 text-xs font-bold">
            {errors.password.message}
          </span>
        )}
      </label>
      <span className="flex flex-col gap-2 items-center">
        <span className="text-sm">
          Not Register?  <Link className="underline" to="/register">Create an account</Link>
        </span>
        <button
          className="bg-blue-500 text-white py-2 px-4
            rounded font-bold hover:bg-blue-800"
          type="submit"
        >
          Login
        </button>
      </span>
    </form>
  );
};

export default SignIn;
