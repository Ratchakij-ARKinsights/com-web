import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from "@material-tailwind/react";

export default function CardStat({ item, totalTarp }) {
  const leadCom = item.com;
  const result = (item.acc / totalTarp[0].tarpSum.tarp) * 100;
  const tarpVsAcc = result.toFixed(2);
  const className = item.title === "Area Manager" ? "text-center bg-green-500" : "text-center bg-blue-500";
  return (
    <Card>
      {/* HEADER */}
      <CardHeader className={className}>
        <Typography variant="h4" color="blue-gray">
          {item.title}
        </Typography>
      </CardHeader>
      {/* BODY */}

      <CardBody className="h-[9rem] p-4">
        {Object.entries(item).map(([key, value], index) => {
          const className = `mb-2 flex justify-between items-center ${
            index === Object.keys(item).length - 1 ? "" : "border-b"
          }`;
          const head = ["Title", "Commission", "Acc. Cost"];
          if (value === "Supervisor") value = "Sup";
          if (value === "Area Manager") value = "AM";
          return (
            <div key={index} className={className}>
              <Typography className="font-extrabold" variant="h6" color="blue-gray">
                {head[index]}
              </Typography>
              <Typography variant="h5" color="blue-gray">
                {value.toLocaleString()}
              </Typography>
            </div>
          );
        })}
      </CardBody>

      <CardFooter className="flex flex-col justify-between items-center border-t border-blue-gray-50 px-4 py-2 ">
        <Typography variant="small" className="h-fit w-full flex justify-between text-blue-gray-600">
          TARP / ACC...
          <strong className="ml-2 font-bold">{tarpVsAcc}%</strong>
        </Typography>
      </CardFooter>
    </Card>
  );
}
