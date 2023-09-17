import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from "@material-tailwind/react";
export default function CardShow({ totalAgentAndSale }) {
  const totalSale = totalAgentAndSale[1].Total.totalSale;
  const totalType = totalAgentAndSale[1].Total.totalType;
  const perAgent = Math.round(totalSale / totalType).toLocaleString("en-US");

  return (
    <Card>
      {/* HEADER */}
      <CardHeader className="text-center bg-orange-500">
        <Typography variant="h4" color="blue-gray">
          Agent Sale
        </Typography>
      </CardHeader>
      {/* BODY */}
      <CardBody className="h-[9rem] p-4">
        {Object.entries(totalAgentAndSale[0]).map(([key, value], index) => {
          const className = `mb-2 flex justify-between items-center ${
            index === Object.keys(totalAgentAndSale[0]).length - 1 ? "" : "border-b"
          }`;
          return (
            <div key={index} className={className}>
              <Typography className="font-extrabold" variant="h6" color="blue-gray">
                {key === "Experience" ? "Exp" : key}
              </Typography>
              <Typography variant="h5" color="blue-gray">
                {value.totalType} / {value.totalSale.toLocaleString("en-US")}
              </Typography>
            </div>
          );
        })}
      </CardBody>

      <CardFooter className="flex flex-col justify-between items-center border-t border-blue-gray-50 px-4 py-2 ">
        {/*  */}
        <Typography variant="small" className="h-fit w-full flex justify-between text-blue-gray-600">
          Per Agent...
          <strong className="ml-2 font-bold">{perAgent}</strong>
        </Typography>
        {/*  */}
        <Typography variant="small" className="h-fit w-full flex justify-between text-blue-gray-600">
          Total Sale...
          <strong className="ml-2 font-bold">{totalAgentAndSale[1].Total.totalSale.toLocaleString("en-US")}</strong>
        </Typography>
      </CardFooter>
    </Card>
  );
}
