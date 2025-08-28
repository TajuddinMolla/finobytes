import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  storeName: yup.string().required("Store name is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

type LoginFormInputs = {
  storeName: string;
  password: string;
};

const MerchantLogin: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    const fakeToken = "merchant-token";
    const user = { storeName: data.storeName, role: "merchant" as const };
    localStorage.setItem("token", fakeToken);
    localStorage.setItem("role", "merchant");
    dispatch(login({ user, token: fakeToken }));
    navigate("/dashboard/merchant");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-600">
          Merchant Login
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          {/* Store Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Store Name
            </label>
            <input
              type="text"
              {...register("storeName")}
              className="w-full mt-1 px-4 py-2 border border-[#d1d5dc] rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
              placeholder="Enter your store name"
            />
            {errors.storeName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.storeName.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              className="w-full mt-1 px-4 py-2 border border-[#d1d5dc] rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 mt-4 text-white bg-purple-600 rounded-lg shadow hover:bg-purple-700 disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MerchantLogin;
