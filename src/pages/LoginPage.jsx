import RegisterContainer from "../features/auth/components/RegisterContainer";
import LoginForm from "../features/auth/components/LoginForm";
import Swal from "sweetalert2";

import { redirect } from "react-router-dom";

export default function LoginPage() {
  const onSuccess = () => {
    Swal.fire({
      showConfirmButton: false,
      icon: "success",
      titleText: "Login Success",
      timer: 1000,
    }).then(() => {
      redirect("/");
    });
  };
  return (
    <>
      <div className="flex flex-col justify-center min-h-screen">
        <div className="w-full p-6 m-auto text-center bg-white rounded-md shadow-md lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-purple-700 underline">Sign in</h1>
          <LoginForm onSuccess={onSuccess} />
          <div className="p-2">
            <span className="text-xs font-light text-center text-gray-700">
              Don't have an account?
              {/* <span className="ml-1 font-medium text-purple-600 hover:underline"> */}
              <RegisterContainer />
              {/* </span> */}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
