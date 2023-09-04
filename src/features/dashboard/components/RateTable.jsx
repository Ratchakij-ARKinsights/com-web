import { Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["#", "Rate", "Percent"];

const TABLE_ROWS = [
  {
    rate: { rate_start: 70001, rate_end: 80000 },
    percent: 8,
  },
  {
    rate: { rate_start: 60001, rate_end: 70000 },
    percent: 7,
  },
  {
    rate: { rate_start: 50001, rate_end: 70001 },
    percent: 6,
  },
  {
    rate: { rate_start: 40001, rate_end: 50000 },
    percent: 5,
  },
  {
    rate: { rate_start: 30001, rate_end: 40000 },
    percent: 4,
  },
];

export function RateTable() {
  return (
    <Card className="h-full w-1/4">
      <table className="w-full min-w-max table-auto text-center">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map(({ rate, percent }, index) => {
            const isLast = index === TABLE_ROWS.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={index}>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {+index + 1}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {rate.rate_start} - {rate.rate_end}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {percent}%
                  </Typography>
                </td>
                {/* <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {date}
                  </Typography>
                </td> */}
                {/* <td className={classes}>
                  <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                    Edit
                  </Typography>
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}
