import { Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["Tier", "acq", "Rate", "%", "Amount"];

function RateRow({ rate, isLast }) {
  const classes = isLast ? "p-2.5" : "p-2.5 border-b border-blue-gray-50";

  return (
    <tr>
      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-semibold">
          TIER {rate.tierLevel}
        </Typography>
      </td>
      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-semibold">
          &gt;=
        </Typography>
      </td>
      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-semibold">
          {rate.rateStart.toLocaleString("en-US")}
        </Typography>
      </td>
      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-semibold">
          {rate.percent}%
        </Typography>
      </td>
      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-semibold">
          {rate.amount.toLocaleString("en-US")}
        </Typography>
      </td>
    </tr>
  );
}

export default function RateTable({ comTier }) {
  return (
    <div className="bg-white border border-blue-gray-100">
      <div className="w-auto text-center bg-blue-500 opacity-95">
        <Typography variant="h4" color="blue-gray">
          Commission Tier
        </Typography>
      </div>
      <table className="w-full min-w-max table-auto text-center">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b uppercase border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography variant="small" color="blue-gray" className="font-extrabold leading-none">
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comTier?.map((rate, index) => (
            <RateRow key={index} rate={rate} isLast={index === comTier.length - 1} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
