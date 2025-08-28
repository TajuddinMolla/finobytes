import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  identifier: yup
    .string()
    .required("Email or phone number is required")
    .test(
      "email-or-phone",
      "Must be a valid email or phone number",
      (value) => {
        if (!value) return false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10,15}$/;
        return emailRegex.test(value) || phoneRegex.test(value);
      }
    ),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

type LoginFormInputs = {
  identifier: string;
  password: string;
};

const MemberLogin: React.FC = () => {
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
    const fakeToken = "member-token";
    const user = {
      email: data.identifier.includes("@") ? data.identifier : "",
      phone: !data.identifier.includes("@") ? data.identifier : "",
      role: "member" as const,
    };
    localStorage.setItem("token", fakeToken);
    localStorage.setItem("role", "member");
    dispatch(login({ user, token: fakeToken }));
    navigate("/dashboard/member");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-600">
          Member Login
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          {/* Email / Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email or Phone
            </label>
            <input
              type="text"
              {...register("identifier")}
              className="w-full mt-1 px-4 py-2 border border-[#d1d5dc] rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              placeholder="Enter your email or phone"
            />
            {errors.identifier && (
              <p className="mt-1 text-sm text-red-500">
                {errors.identifier.message}
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
              className="w-full mt-1 px-4 py-2 border border-[#d1d5dc] rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
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
            className="w-full py-2 mt-4 text-white bg-green-600 rounded-lg shadow hover:bg-green-700 disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MemberLogin;
