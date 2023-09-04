import { Button } from "@material-tailwind/react";
import { useState } from "react";

// import * as employeeService from "../../api/employee-api";

const employeeTitle = ["Agent", "Supervisor", "Area Manager"];
const agentTypes = ["New", "Experience", "Top"];

const initialInput = {
  // agentId: "",
  name: "",
  title: "",
  type: "",
  leaderId: "",
};
export default function CreateEmployee({ onSuccess, createEmployee, setEmployees }) {
  const [input, setInput] = useState(initialInput);
  const [error, setError] = useState({});

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      await createEmployee(input);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="p-4 border-2 border-blue-gray-500 w-full max-w-3xl" onSubmit={handleSubmitForm}>
      <h1 className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">Create Employee</h1>
      <div className="flex mb-2 ">
        {/* CODE */}
        {/* <div className="w-full px-3 mb-6 md:mb-0">
          <h1 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Agent Code</h1>
          <input
            className="block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-1 px-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            name="agentId"
            value={input.agentId}
            placeholder="Agent ID"
            onChange={handleChangeInput}
          />
        </div> */}

        {/* NAME */}
        <div className="w-full md:w-1/3 px-3 mb-3 md:mb-0">
          <h1 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Name</h1>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-1 px-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            name="name"
            value={input.name}
            placeholder="NAME"
            onChange={handleChangeInput}
          />
        </div>

        {/* TITLE */}
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <h1 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">TITLE</h1>
          <div className="relative">
            <select
              className="block w-fit bg-gray-200 border border-gray-500 text-gray-700 px-1 py-1 pr-2 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              name="title"
              value={input.title}
              onChange={handleChangeInput}
            >
              <option value="">Select</option>
              {employeeTitle.map((title, index) => (
                <option key={index} value={title}>
                  {title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/*Type */}
        {}
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <h1 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Type</h1>
          <div className="relative">
            <select
              className="block w-fit bg-gray-200 border border-gray-500 text-gray-700 px-1 py-1 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              name="type"
              value={input.type}
              onChange={handleChangeInput}
            >
              <option value="">Select</option>
              {agentTypes.map((type, index) => (
                <option key={index} value={type} disabled={!input.title || input.title !== "Agent"}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* LEADER ID */}
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <h1 className="w-2rem block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Leader ID</h1>
          <input
            className="block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-1 px-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            name="leaderId"
            value={input.leaderId}
            placeholder="Leader ID"
            onChange={handleChangeInput}
          />
        </div>
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
