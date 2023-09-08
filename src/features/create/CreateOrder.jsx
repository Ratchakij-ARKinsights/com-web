import { Button, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import * as orderApi from "../../api/order-api";

const initialInput = {
  price: "",
  date: "",
  agentId: "",
};
export default function CreateOrder({ employees, fetchOrder, onSuccess, onError }) {
  // const [agentId, setAgentId] = useState();
  const [input, setInput] = useState(initialInput);
  const [error, setError] = useState({});
  const [date, setDate] = useState({
    startDate: null,
    endDate: null,
  });

  const handleDateChange = (date) => {
    console.log("date:", date);
    setDate(date);
  };

  const handleChangeInput = (e) => {
    console.log(e.target.value);
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      input.date = date.startDate;
      console.log(input.date);

      const createOrder = await orderApi.createOrder(input);

      console.log(createOrder);

      if (!createOrder.data) {
        throw new Error(createOrder?.response?.data?.errMessage ?? "Error Create Order");
      }
      fetchOrder();
      onSuccess();
      setInput(initialInput);
    } catch (err) {
      onError(err?.message);
    }
  };

  return (
    <form className="p-4 border-2 border-blue-gray-500 w-full max-w-3xl" onSubmit={handleSubmitForm}>
      <h1 className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">Create Order</h1>
      <div className="flex mb-2 ">
        {/* DATE */}
        <div className="md:w-1/3 px-2 mb-3 md:mb-0">
          <h1 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Date</h1>
          <Datepicker
            inputClassName="w-full bg-gray-200 border border-gray-500 text-gray-700 py-1 px-1 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            asSingle={true}
            useRange={false}
            popoverDirection={"down"}
            displayFormat={"DD/MM/YYYY"}
            name="date"
            value={date}
            onChange={handleDateChange}
          />
        </div>

        {/* Price */}
        <div className="md:w-1/3 px-2 mb-3 md:mb-0">
          <h1 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Price</h1>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-1 px-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            name="price"
            value={input.price}
            placeholder="Price"
            onChange={handleChangeInput}
          />
        </div>

        {/* AGENT-ID */}
        <div className="px-2 mb-3 md:mb-0">
          <h1 className="block uppercase tracking-wide whitespace-nowrap text-gray-700 text-xs font-bold mb-2">
            Agent-ID
          </h1>
          <Typography className="font-semibold text-center" variant="lead" color="blue-gray">
            {input.agentId ? input.agentId : ""}
          </Typography>
        </div>

        {/* Name */}
        <div className="md:w-1/3 px-2 mb-3 md:mb-0">
          <h1 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Name</h1>
          <div className="relative">
            <select
              className="block w-full bg-gray-200 border border-gray-500 text-gray-700 py-1 px-1 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              name="agentId"
              value={input.agentId}
              onChange={handleChangeInput}
            >
              <option value="">Select</option>
              {employees.map((employee, index) => (
                <option key={index} value={employee.id}>
                  ID:{employee.id} {employee.name}
                </option>
              ))}
            </select>
            {/* <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div> */}
          </div>
        </div>

        {/*SELECT ProductType */}
        {/* <div className="w-full md:w-1/3 px-2 mb-6 md:mb-0">
          <h1 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Type</h1>
          <div className="relative">
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-500 text-gray-700 py-1 px-1 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              name="productType"
              value={input.productType}
              onChange={handleChangeInput}
            >
              <option value="">Select</option>
              {productTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div> */}
      </div>
      {/* BUTTON */}
      <div className="pt-2 flex justify-center w-full  ">
        <Button variant="filled" color="green" size="sm" onClick={handleSubmitForm}>
          ADD
        </Button>
      </div>
    </form>
  );
}
