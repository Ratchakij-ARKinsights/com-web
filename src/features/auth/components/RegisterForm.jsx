import { useState } from "react";
import Swal from "sweetalert2";

import RegisterInput from "./RegisterInput";
import validateRegister from "../validators/validate-register";
import InputErrorMessage from "./InputErrorMessage";

import useAuth from "../../../hooks/useAuth";
import { Option, Select } from "@material-tailwind/react";

const initialInput = {
  firstName: "",
  lastName: "",
  email: "",
  role: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterForm({ onSuccess }) {
  const [input, setInput] = useState(initialInput);
  const [error, setError] = useState({});

  const roleOptions = ["Agent", "Supervisor", "Area Manager"];

  const { register } = useAuth();

  const handleChangeInput = (e) => {
    console.log(e);
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      const result = validateRegister(input);
      console.log(result);
      if (result) {
        return setError(result);
      }
      setError({});

      const errRegister = await register(input);

      if (errRegister) {
        throw new Error(errRegister?.response?.data?.errMessage ?? "Error SignUp");
      }
      console.log("register successfully");
      // toast.success("register successfully");
      onSuccess();
    } catch (err) {
      setError({
        email: err?.message ?? "Invalid email",
      });
      // toast.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <div className="grid grid-cols-2 gap-x-3 gap-y-4">
        <div>
          <RegisterInput
            name="firstName"
            placeholder="First name"
            value={input.firstName}
            onChange={handleChangeInput}
            isInvalid={error.firstName}
          />
          {error.firstName && <InputErrorMessage message={error.firstName} />}
        </div>
        <div>
          <RegisterInput
            name="lastName"
            placeholder="Last name"
            value={input.lastName}
            onChange={handleChangeInput}
            isInvalid={error.lastName}
          />
          {error.lastName && <InputErrorMessage message={error.lastName} />}
        </div>
        <div className="col-span-full">
          <RegisterInput
            name="email"
            placeholder="Email address"
            value={input.email}
            onChange={handleChangeInput}
            isInvalid={error.email}
          />
          {error.email && <InputErrorMessage message={error.email} />}
        </div>

        {/* PASSWORD */}
        <div className="col-span-full">
          <RegisterInput
            name="password"
            placeholder="Password"
            value={input.password}
            onChange={handleChangeInput}
            isInvalid={error.password}
          />
          {error.password && <InputErrorMessage message={error.password} />}
        </div>
        <div className="col-span-full">
          <RegisterInput
            name="confirmPassword"
            placeholder="Confirm password"
            value={input.confirmPassword}
            onChange={handleChangeInput}
            isInvalid={error.confirmPassword}
          />
          {error.confirmPassword && <InputErrorMessage message={error.confirmPassword} />}
        </div>
        {/* ROLE */}
        <div className="col-span-full">
          <Select
            className={`block w-full rounded-md border px-3 py-1.5 leading-6 outline-none text-sm focus:ring ${
              error.role
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300 focus:border-blue-500"
            }`}
            name="role"
            label="Select Role"
            value={input.role}
            onChange={(e) => {
              setInput({ ...input, role: e });
            }}
          >
            {roleOptions.map((role, index) => (
              <Option key={index} value={role}>
                {role}
              </Option>
            ))}
          </Select>
          {error.role && <InputErrorMessage message={error.role} />}
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <button className="bg-green-500 hover:bg-green-600 rounded-lg text-white text-lg font-bold px-8 py-1 min-w-[10rem]">
          Sign up
        </button>
      </div>
    </form>
  );
}
