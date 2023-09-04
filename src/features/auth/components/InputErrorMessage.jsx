export default function InputErrorMessage({ message, error }) {
  return (
    <span className="text-red-500 text-xs">
      {message}
      {error}
    </span>
  );
}
