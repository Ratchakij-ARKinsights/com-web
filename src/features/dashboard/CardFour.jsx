import { Card, CardBody, CardFooter, CardHeader, Typography } from "@material-tailwind/react";

export default function CardFour({ totalTarp }) {
  const comVsTarp = Object.values(totalTarp[1]).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const tarpVsTmr = Math.round(Object.values(totalTarp[2])).toLocaleString("en-US");
  return (
    <Card>
      {/* HEADER */}
      <CardHeader className="text-center bg-indigo-500">
        <Typography variant="h4" color="blue-gray">
          Overall
        </Typography>
      </CardHeader>
      {/* BODY */}
      <CardBody className="h-[9rem] p-4">
        {Object.entries(totalTarp[0].tarpSum).map(([key, value], index) => {
          const className = `mb-2 flex justify-between items-center ${
            index === Object.keys(totalTarp[0].tarpSum).length - 1 ? "" : "border-b"
          }`;
          return (
            <div key={index} className={className}>
              <Typography className="uppercase font-extrabold" variant="h6" color="blue-gray">
                {key}
              </Typography>
              <Typography variant="h5" color="blue-gray">
                {value.toLocaleString("en-US")}
              </Typography>
            </div>
          );
        })}
      </CardBody>
      <CardFooter className="flex flex-col justify-between items-center border-t border-blue-gray-50 px-4 py-2 ">
        {/*  */}
        <Typography variant="small" className="h-fit w-full flex justify-between text-blue-gray-600">
          COM / TARP...
          <strong className="ml-2 font-bold">{comVsTarp}%</strong>
        </Typography>
        {/*  */}
        <Typography variant="small" className="h-fit w-full flex justify-between text-blue-gray-600">
          TARP / TMR...
          <strong className="ml-2 font-bold">{tarpVsTmr}</strong>
        </Typography>
      </CardFooter>
    </Card>
  );
}
