import { Card, CardHeader, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";
import { BanknotesIcon, UserPlusIcon, UserIcon, ChartBarIcon } from "@heroicons/react/24/solid";

const footer = { color: "text-green-500", value: "+55%", label: "than last week" };
export default function CardFour({ totalTarp }) {
  return (
    <Card>
      {/* HEADER */}
      <CardHeader className="w-auto text-center bg-yellow-500">
        <Typography variant="h4" color="blue-gray">
          OVERALL
        </Typography>
      </CardHeader>
      {/* BODY */}
      <CardBody className="p-4">
        {Object.entries(totalTarp[0].tarpSum).map(([key, value], index) => {
          const className = `mb-2 flex justify-between items-center ${
            index === Object.keys(totalTarp[0].tarpSum).length - 1 ? "" : "border-b"
          }`;
          return (
            <div key={index} className={className}>
              <div className="w-1/3 uppercase font-normal">
                <Typography variant="h6" color="blue-gray">
                  {key}
                </Typography>
              </div>
              <div className="w-full text-end">
                <Typography variant="h5" color="blue-gray">
                  {value.toLocaleString("en-US")}
                </Typography>
              </div>
            </div>
          );
        })}
      </CardBody>
      <CardFooter className="flex justify-between items-center border-t border-blue-gray-50 p-2">
        <Typography variant="small" className="h-fit text-blue-gray-600">
          {Object.keys(totalTarp[1])}
          <strong className="ml-2 font-bold">{parseFloat(Object.values(totalTarp[1])).toFixed(2)}%</strong>
        </Typography>

        <Button variant="outlined" size="sm">
          Preview
        </Button>
      </CardFooter>
    </Card>
  );
}
