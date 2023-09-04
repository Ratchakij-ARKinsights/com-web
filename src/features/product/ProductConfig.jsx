import { BanknotesIcon, UserPlusIcon, UserIcon, ChartBarIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import ProductCard from "./ProductCard";

import productsJSON from "../../data/new-data/products.json";
import { Button, Card, CardHeader, Typography } from "@material-tailwind/react";
import statisticsCardsData from "../../data/data-test/statistics-cards-data";
import OtherConfig from "./OtherConfig";
import Modal from "../../components/Modal";

export default function ProductConfig() {
  const [open, setOpen] = useState(false);
  const products = productsJSON.products;
  const otherConfig = [
    {
      name: "Extra",
      exceed: 450000,
      percent: 2,
    },
    {
      name: "Commission",
      percent: 2,
    },
    {
      name: "Deduction",
      percent: 5,
    },
  ];
  return (
    <div>
      <Card className="px-4">
        <CardHeader className="mb-8 p-2" variant="gradient" color="blue">
          <Typography variant="h4" color="white">
            Config
          </Typography>
        </CardHeader>
        {/*  */}
        <div className="border-4 mb-8 p-2">
          <h3 className="mb-4 bg-blue-gray-100 text-gray-800 text-xl font-bold sm:text-2xl">Other</h3>

          <div className="flex justify-between">
            <div className="py-2 grid grid-cols-1 gap-8 sm:grid-cols-4">
              {otherConfig.map((config, index) => (
                <div className="px-2 flex-col border-[0.2rem] border-blue-gray-600 w-[10rem]" key={index}>
                  <h3 className="ml-2text-gray-800 text-xl font-bold sm:text-xl">{config.name}</h3>

                  {config.exceed && (
                    <Typography variant="h6" className="font-normal text-blue-gray-500">
                      Exceed: {config.exceed}
                    </Typography>
                  )}

                  <Typography variant="h6" className="font-normal text-blue-gray-500">
                    Percent: {config.percent}
                  </Typography>
                </div>
              ))}
            </div>

            <div className="flex items-center">
              <Button size="sm">EDIT</Button>
            </div>
          </div>
        </div>
        {/* // <OtherConfig key={index} item={item} color="orange" />; */}
        <div className="border-4 p-2 w-auto">
          <h3 className="bg-blue-gray-100 text-gray-800 text-xl font-bold sm:text-2xl">Product</h3>
          <div className="py-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
