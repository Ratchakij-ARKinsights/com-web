import jsonData from "../../data/jsonData.json";

import { Typography, Card, CardHeader, CardBody, Avatar, Tooltip, Progress } from "@material-tailwind/react";

export default function ProductInfo() {
  const tableHead = ["#", "product", "member", "budget", "completion", ""];
  const products = jsonData.products;
  return (
    <div>
      <Card>
        {/* HEADER */}
        <CardHeader className="mb-8 p-2" variant="gradient" color="green">
          <Typography variant="h4" color="white">
            Product
          </Typography>
        </CardHeader>

        {/* BODY */}
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {tableHead.map((el) => (
                  <th key={el} className="border-b border-blue-gray-50 py-3 px-5 text-center">
                    <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {products.map((product, key) => {
                const className = `py-3 px-5 ${key === products.length - 1 ? "" : "border-b border-blue-gray-50"}`;

                return (
                  <tr key={product.id}>
                    {/* ID */}
                    <td className="">
                      <div className="flex justify-center">
                        <Typography variant="small" color="blue-gray" className="font-bold">
                          {product.id}
                        </Typography>
                      </div>
                    </td>
                    {/* PRODUCT */}
                    <td className={className}>
                      <div className="flex items-center gap-4">
                        <Typography variant="small" color="blue-gray" className="font-bold">
                          {product.name}
                        </Typography>
                      </div>
                    </td>
                    {/* MEMBER */}
                    <td className={className}>
                      {product.members.map((member, key) => (
                        <Tooltip key={member.name} content={member.name}>
                          <Avatar
                            src={member.img}
                            alt={member.name}
                            size="xs"
                            variant="circular"
                            className={`cursor-pointer border-2 border-white ${key === 0 ? "" : "-ml-2.5"}`}
                          />
                        </Tooltip>
                      ))}
                    </td>
                    {/* BUDGET */}
                    <td className={className}>
                      <Typography variant="small" className="text-xs font-medium text-blue-gray-600">
                        {product.budget}
                      </Typography>
                    </td>
                    {/* COMPLETION */}
                    <td className={className}>
                      <div className="w-10/12">
                        <Typography variant="small" className="mb-1 block text-xs font-medium text-blue-gray-600">
                          {product.completion}%
                        </Typography>
                        <Progress
                          value={product.completion}
                          variant="gradient"
                          color={product.completion === 100 ? "green" : "blue"}
                          className="h-1"
                        />
                      </div>
                    </td>
                    <td className={className}>
                      <Typography as="a" href="/" className="text-xs font-semibold text-blue-600">
                        Preview
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}
