import { Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["tmr", "tarp", "commission"];

function RateRow({ comTier, rowData, isLast }) {
  const classes = isLast ? "py-2.5" : "py-2.5 border-b border-blue-gray-50";

  const tmr = (rowData.Total * rowData.Rate).toLocaleString("en-US");
  const com = (rowData.Total * rowData.Amount).toLocaleString("en-US");

  return (
    <tr>
      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-semibold">
          {rowData.Total}
        </Typography>
      </td>
      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-semibold">
          {tmr == 0 ? "-" : tmr}
        </Typography>
      </td>
      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-semibold">
          {com == 0 ? "-" : com}
        </Typography>
      </td>
    </tr>
  );
}

export default function TarpProjection({ comTier, tableData, agentTypeByComTier }) {
  return (
    <div className="bg-white border border-blue-gray-100">
      <div className="w-auto text-center bg-blue-500 opacity-95">
        <Typography variant="h4" color="blue-gray">
          TARP Projection
        </Typography>
      </div>
      <table className="w-full min-w-max table-auto text-center ">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="uppercase border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography variant="small" color="blue-gray" className="font-extrabold leading-none">
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {agentTypeByComTier?.map((rowData, index) => (
            <RateRow key={index} comTier={comTier[index]} rowData={rowData} isLast={index === tableData.length - 1} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
