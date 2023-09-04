import { Card, CardHeader, CardBody, CardFooter, Typography } from "@material-tailwind/react";

import CardOne from "./CardOne";
import CardTwo from "./CardTwo";
import CardThree from "./CardThree";
import CardFour from "./CardFour";
const footer = { color: "text-green-500", value: "+55%", label: "than last week" };
export default function CardShow() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <CardOne />
      <CardTwo />
      <CardThree />
      <CardFour />
    </div>
  );
}
