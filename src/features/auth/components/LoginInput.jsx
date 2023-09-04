import createClasses from "../../../utils/create-classes";

export default function LoginInput({ placeholder, value, onChange, name, isInvalid }) {
  const className = createClasses(
    "block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40",
    isInvalid
      ? "border-red-500 focus:ring-red-300"
      : "border-gray-300 focus:border-blue-500 focus:ring-blue-300"
  );
  return (
    <input
      type="text"
      className={className}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
    />
  );
}
