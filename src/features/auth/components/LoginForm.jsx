import { useState } from "react";

import LoginInput from "./LoginInput";

import validateLogin from "../validators/validate-login";
import InputErrorMessage from "./InputErrorMessage";

import useAuth from "../../../hooks/useAuth";

const initialInput = {
  email: "",
  password: "",
};

export default function LoginForm({ onSuccess }) {
  const [input, setInput] = useState(initialInput);
  const [error, setError] = useState({});

  const { login } = useAuth();

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      const result = validateLogin(input);
      if (result) {
        return setError(result);
      }
      setError({});

      const errLogin = await login(input);

      if (errLogin) {
        throw new Error(errLogin?.response?.data?.errMessage ?? "Error SignIn");
      }
      // console.log("Login successful");
      onSuccess();
    } catch (err) {
      console.log(err);
      setError({
        email: err?.message ?? "Invalid email",
      });
      // console.log("Error:" + err.response.data.message);
    }
  };

  return (
    <form className="mt-6" onSubmit={handleSubmitForm}>
      <div className="mb-2 text-left">
        <LoginInput
          name="email"
          placeholder="Email Address"
          value={input.email}
          onChange={handleChangeInput}
          isInvalid={error.email}
        />
        <InputErrorMessage message={error.email} />

        <LoginInput
          name="password"
          placeholder="Password"
          value={input.password}
          onChange={handleChangeInput}
          isInvalid={error.password}
        />
        <InputErrorMessage message={error.password} />
      </div>

      <div className="mt-6">
        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
          Login
        </button>
      </div>
    </form>
  );
}
