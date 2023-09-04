import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";

export default function OtherConfig({ item, color }) {
  return (
    <>
      <h3 className="text-gray-800 text-xl font-bold sm:text-xl">{item.name}</h3>
      <Typography variant="h6" className="font-normal text-blue-gray-500">
        {key}: {value}
        <br />
        {key}: {value}
      </Typography>
    </>
  );
}
