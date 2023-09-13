import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from "@material-tailwind/react";

const footer = { color: "text-green-500", value: "+55%", label: "than last week" };
export default function StaticCard({ item, index }) {
  console.log(item);
  return (
    <Card>
      {/* HEADER */}
      <CardHeader className="w-auto text-center bg-yellow-500">
        <Typography variant="h4" color="blue-gray">
          OVERALL
        </Typography>
      </CardHeader>
      {/* BODY */}
      {index == 0 && (
        <CardBody className="p-4">
          {Object.entries(item[0].tarpSum).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center">
              <div className="w-1/3 uppercase font-normal">
                <Typography variant="h6" color="blue-gray">
                  {key}
                </Typography>
              </div>
              <div className="w-full text-end">
                <Typography variant="h4" color="blue-gray">
                  {value}
                </Typography>
              </div>
            </div>
          ))}
        </CardBody>
      )}
      <CardFooter className="flex justify-between items-center border-t border-blue-gray-50 p-2">
        {index == 0 && (
          <Typography variant="small" className="h-fit text-blue-gray-600">
            {Object.keys(item[1])}
            <strong className="ml-2 font-bold">{parseFloat(Object.values(item[1])).toFixed(2)}</strong>
          </Typography>
        )}

        <Button variant="outlined" size="sm">
          Preview
        </Button>
      </CardFooter>
    </Card>
  );
}
