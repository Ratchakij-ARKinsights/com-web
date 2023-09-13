import { Card, CardHeader, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";
import { BanknotesIcon, UserPlusIcon, UserIcon, ChartBarIcon } from "@heroicons/react/24/solid";

const footer = { color: "text-green-500", value: "+15%", label: "than last month" };
export default function CardOne() {
  return (
    <Card>
      {/* HEADER */}
      <CardHeader className="w-auto text-center bg-green-500">
        <Typography variant="h4" color="blue-gray">
          1
        </Typography>
      </CardHeader>
      {/* BODY */}
      <CardBody className="h-[6rem] p-4">
        <div className="flex justify-between items-center">
          <Typography variant="small" className="font-extrabold" color="blue-gray">
            TOTAL
          </Typography>
          <Typography variant="h4" className="w-[6rem] text-center" color="blue-gray">
            12 pcs
          </Typography>
        </div>
        <div className="flex justify-between items-center">
          <Typography variant="small" className="font-extrabold" color="blue-gray">
            TOTAL SALE
          </Typography>
          <Typography variant="h4" className="w-[6rem] text-center" color="blue-gray">
            $52k
          </Typography>
        </div>
      </CardBody>
      <CardFooter className="flex justify-between border-t border-blue-gray-50 p-2">
        <Typography className="font-normal text-blue-gray-600">
          <strong className={footer.color}>{footer.value}</strong>
          &nbsp;{footer.label}
        </Typography>
        <Button variant="outlined" size="sm">
          Preview
        </Button>
      </CardFooter>
    </Card>
  );
}
