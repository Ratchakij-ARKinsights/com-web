import { useState } from "react";
import Swal from "sweetalert2";
import Modal from "../../../components/Modal";
import RegisterForm from "./RegisterForm";
import { redirect } from "react-router-dom";

export default function RegisterContainer() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="ml-1 font-medium text-purple-600 hover:underline"
        onClick={() => setOpen(true)}
      >
        Sign up
      </button>
      {/* <button
        className="bg-green-500 text-white rounded-md px-4 leading-[3rem] font-bold hover:bg-green-600 tracking-wide"
        onClick={() => setOpen(true)}
      >
        Create new account
      </button> */}
      <Modal title="Sign up" open={open} onClose={() => setOpen(false)}>
        <RegisterForm
          onSuccess={() => {
            Swal.fire({
              showConfirmButton: false,
              icon: "success",
              titleText: "Register Success",
              timer: 1000,
            }).then(() => {
              setOpen(false);
              redirect("/")
            });
          }}
        />
      </Modal>
    </>
  );
}
