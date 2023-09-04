import { CardFooter, Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className=" border-4 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="flex border-4  border-cyan-700">
        {/* LABEL */}
        <div className="px-2 py-4 flex flex-col justify-between items-center md:flex-shrink-0">
          <div className="bg-blue-800 rounded-lg p-4">
            <h2 className="w-[6rem] text-xl font-semibold text-white">{product.name}</h2>
            <p className="text-lg text-gray-200">ID: {product.id}</p>
          </div>
          <div>
            <Link to="">
              <Button size="md">EDIT</Button>
            </Link>
          </div>
        </div>
        {/* DETAIL */}
        <div className="px-2 py-2">
          {product.config.rate.map((rate, index) => (
            <div className="py-1 flex gap-4" key={index}>
              <div className="text-xl font-semibold text-gray-800"> Tier: {+index + 1}</div>
              <Typography variant="h6" className="font-normal text-blue-gray-500">
                Rate: {rate.rate_start} - {rate.rate_end}
                <br />
                Percent: {rate.percent}%
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
