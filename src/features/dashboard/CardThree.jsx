import { Card, CardBody, CardFooter, CardHeader, Typography } from "@material-tailwind/react";
import { Button } from "@mui/material";
const footer = { color: "text-green-500", value: "+55%", label: "than last week" };
export default function CardShow({ totalAgentAndSale }) {
  // console.log(totalAgentAndSale);
  return (
    <Card>
      {/* HEADER */}
      <CardHeader className="w-auto text-center bg-orange-500">
        <Typography variant="h4" color="blue-gray">
          SALE
        </Typography>
      </CardHeader>
      {/* BODY */}
      <CardBody className="p-4">
        {Object.entries(totalAgentAndSale[0]).map(([agentType, value], index) => {
          const className = `mb-2 flex justify-between items-center ${
            index === Object.keys(totalAgentAndSale[0]).length - 1 ? "" : "border-b"
          }`;
          return (
            <div key={index} className={className}>
              <div className="w-1/3 uppercase font-normal">
                <Typography variant="h6" color="blue-gray">
                  {agentType}
                </Typography>
              </div>
              <div className="w-full text-end">
                <Typography variant="h5" color="blue-gray">
                  {value.totalType} / {value.totalSale.toLocaleString("en-US")}
                </Typography>
              </div>
            </div>
          );
        })}
      </CardBody>

      <CardFooter className="flex justify-between items-center border-t border-blue-gray-50 p-2">
        <Typography variant="small" className="h-fit text-blue-gray-600">
          Total...
          <strong className="ml-2 font-bold">
            {totalAgentAndSale[1].Total.totalType} / {totalAgentAndSale[1].Total.totalSale.toLocaleString("en-US")}
          </strong>
        </Typography>
        <Button variant="contained" size="small">
          Preview
        </Button>
      </CardFooter>
    </Card>
  );
}
