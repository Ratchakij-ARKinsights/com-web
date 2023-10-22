import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import CreateEmployee from "../features/create/CreateEmployee";
import CreateOrder from "../features/create/CreateOrder";
import EmployeeList from "../features/agent/EmployeeList";

import * as employeeApi from "../api/employee-api";
import * as orderApi from "../api/order-api";

import OrderList from "../features/order/OrderList";
import RegisterContainer from "../features/auth/components/RegisterContainer";
import Modal from "../components/Modal";

const tableHead = ["id", "date", "price", "status", "agent-Id", "description"];
export default function CreatePage() {
  const [open, setOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [orders, setOrders] = useState([]);

  const onSuccess = () => {
    Swal.fire({
      showConfirmButton: false,
      icon: "success",
      titleText: "Completed",
      timer: 500,
    });
  };

  const onError = (message) =>
    Swal.fire({
      showConfirmButton: false,
      icon: "error",
      titleText: message,
      timer: 3000,
    });

  const fetchEmployee = async () => {
    const res = await employeeApi.getAllEmployee();
    // console.log(res);
    setEmployees(res.data.employees);
  };
  const fetchOrder = async () => {
    const res = await orderApi.getAllOrder();
    // console.log(res);
    setOrders(res.data.orders);
  };

  useEffect(() => {
    fetchEmployee();
    fetchOrder();
  }, []);

  const createEmployee = async (input) => {
    try {
      const createEmp = await employeeApi.createEmployee(input);
      // console.log(createEmp);

      if (!createEmp.data) throw new Error(createEmp?.response?.data?.errMessage ?? "Error Create");

      fetchEmployee();
      onSuccess();
    } catch (err) {
      // console.log(err);
      onError(err?.message);
    }
  };

  return (
    <div>
      <div>
        <Typography variant="h1" color="blue-gray">
          User
        </Typography>
        <Typography className="ml-1" variant="lead" color="blue-gray">
          User in system
        </Typography>
      </div>
      <hr className="my-4 border-2 border-blue-gray-100" />

      <div>
        <button
          className="mb-4 py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded inline-flex items-center"
          onClick={() => setOpen(true)}
        >
          <PlusCircleIcon className="w-6 h6" />
          <Typography variant="small" color="white" className="ml-1 font-light">
            Create User
          </Typography>
        </button>
      </div>

      <div className="flex flex-col w-full">
        {/* <CreateEmployee createEmployee={createEmployee} /> */}
        <EmployeeList employees={employees} />
      </div>

      <div className="flex flex-col w-full">
        <CreateOrder employees={employees} fetchOrder={fetchOrder} onSuccess={onSuccess} onError={onError} />
        <OrderList tableHead={tableHead} orders={orders} />
      </div>
      <Modal title="Create User" open={open} onClose={() => setOpen(false)}></Modal>
    </div>
  );
}
