import { Card, CardHeader, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";
import { BanknotesIcon, UserPlusIcon, UserIcon, ChartBarIcon } from "@heroicons/react/24/solid";

const footer = { color: "text-green-500", value: "+55%", label: "than last week" };
export default function CardShow() {
  return (
    <Card>
      {/* HEADER */}
      <CardHeader className="w-auto text-center bg-yellow-500">
        <Typography variant="h4" color="blue-gray">
          COMMISSION
        </Typography>
      </CardHeader>
      {/* BODY */}
      <CardBody className="h-[6rem] p-4">
        <div className="flex justify-between items-center">
          <Typography variant="small" className="font-extrabold" color="blue-gray">
            TOTAL
          </Typography>
          <Typography variant="h4" className="w-[6rem] text-center" color="blue-gray">
            $102k
          </Typography>
        </div>
      </CardBody>
      <CardFooter className="flex justify-between border-t border-blue-gray-50 p-2">
        <Typography className="font-normal text-blue-gray-600">
       Percent...
          <strong className="ml-2 font-bold">2%</strong>
        </Typography>
        <Button variant="outlined" size="sm">
          Preview
        </Button>
      </CardFooter>
    </Card>
  );
}
