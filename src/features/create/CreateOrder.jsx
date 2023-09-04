import { Button } from "@material-tailwind/react";
import { useState } from "react";

const productIds = [
  { id: 1, name: "MOTOR" },
  { id: 2, name: "RENEWAL" },
];

const productTypes = ["P1", "P2", "P3"];

const initialInput = {
  productId: "",
  productType: "",
  price: "",
  agentId: "",
};
export default function CreateOrder() {
  const [input, setInput] = useState(initialInput);
  const [error, setError] = useState({});

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = () => {
    console.log("Form Data:", input);
  };

  return (
    <form className="p-4 border-2 border-blue-gray-500 w-full max-w-3xl" onSubmit={handleSubmitForm}>
      <h1 className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">Create Order</h1>
      <div className="flex mb-2 ">
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <h1 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Name</h1>
          <div className="relative">
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-500 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              name="productId"
              value={input.productId}
              onChange={handleChangeInput}
            >
              <option value="">Select</option>
              {productIds.map((product, index) => (
                <option key={index} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        {/*SELECT ProductType */}
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <h1 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Type</h1>
          <div className="relative">
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-500 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
        </div>
        {/* Price */}
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <h1 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Price</h1>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            name="price"
            value={input.price}
            placeholder="Price"
            onChange={handleChangeInput}
          />
        </div>
        {/* AGENT-ID */}
        <div className="w-full md:w-1/3 px-3 mb-3 md:mb-0">
          <h1 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Agent-ID</h1>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            name="agentId"
            value={input.agentId}
            placeholder="Agent-ID"
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
