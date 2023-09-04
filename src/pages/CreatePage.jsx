import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import CreateEmployee from "../features/create/CreateEmployee";
import CreateOrder from "../features/create/CreateOrder";
import EmployeeList from "../features/agent/EmployeeList";

import * as employeeApi from "../api/employee-api";

export default function CreatePage() {
  const [employees, setEmployees] = useState([]);

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

  useEffect(() => {
    fetchEmployee();
  }, []);

  const createEmployee = async (input) => {
    try {
      // ทำการสร้างพนักงานใหม่โดยใช้ input และ API หรือเมธอดที่เหมาะสม
      const createEmp = await employeeApi.createEmployee(input);
      console.log(createEmp);
      if (!createEmp.data) {
        throw new Error(createEmp?.response?.data?.errMessage ?? "Error Create");
      }
      fetchEmployee();
      onSuccess();
    } catch (err) {
      console.log(err);
      onError(err?.message);
    }
  };

  console.log(employees);
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 mt-8 mb-8 flex flex-col gap-12">
      <div>
        <CreateEmployee createEmployee={createEmployee} setEmployees={setEmployees} />
      </div>
      <div>
        <EmployeeList employees={employees} />
      </div>
      <div>
        <CreateOrder />
      </div>
    </div>
  );
}
