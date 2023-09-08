import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import CreateEmployee from "../features/create/CreateEmployee";
import CreateOrder from "../features/create/CreateOrder";
import EmployeeList from "../features/agent/EmployeeList";

import * as employeeApi from "../api/employee-api";
import * as orderApi from "../api/order-api";

import OrderList from "../features/order/OrderList";

export default function CreatePage() {
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
      // ทำการสร้างพนักงานใหม่โดยใช้ input และ API หรือเมธอดที่เหมาะสม
      const createEmp = await employeeApi.createEmployee(input);
      // console.log(createEmp);
      if (!createEmp.data) {
        throw new Error(createEmp?.response?.data?.errMessage ?? "Error Create");
      }
      fetchEmployee();
      onSuccess();
    } catch (err) {
      // console.log(err);
      onError(err?.message);
    }
  };

  return (
    <div className="max-w-[100rem] mx-auto py-6 sm:px-6 lg:px-8 mt-8 mb-8 flex flex-col gap-12">
      <div className="flex justify-evenly md:justify-center">
        <div className="flex flex-col w-full md:w-1/2">
          <CreateEmployee createEmployee={createEmployee} />
          <EmployeeList employees={employees} />
        </div>

        <div className="flex flex-col w-full md:w-1/2">
          <CreateOrder employees={employees} fetchOrder={fetchOrder} onSuccess={onSuccess} onError={onError} />
          <OrderList orders={orders} />
        </div>
      </div>
    </div>
  );
}
