import { Alert, Typography } from "@material-tailwind/react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function AgentSummary({ totalTarp, leadCom, isAgent, isOrder }) {
  const tarp = totalTarp[0].tarpSum.tarp;
  const agentCom = totalTarp[0].tarpSum.agent_com;
  const checkOrder = isOrder ? "No Order" : false;
  const checkCom = agentCom === 0 ? "No Commission." : false;

  return (
    <div className="bg-white border border-blue-gray-100">
      <div className="w-auto text-center bg-indigo-500">
        <Typography variant="h4" color="white">
          Overall
        </Typography>
      </div>

      {isAgent && (checkOrder || checkCom) && (
        <Alert className="font-medium bg-white text-red-500">
          <CheckCircleIcon className="inline-block h-[1.5rem]" /> {checkOrder || checkCom}
        </Alert>
      )}

      <div className="flex justify-center flex-col md:flex-row  items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
        <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
          <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Summary</h3>
          <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
            {totalTarp?.map((item, index) => {
              if (index === 0) {
                return Object.entries(item.tarpSum).map(([key, value]) => {
                  return (
                    <div key={key} className="flex justify-between w-full">
                      <p className="uppercase text-base dark:text-white leading-4 text-gray-800">{key}</p>
                      <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                        {value.toLocaleString("en-US")}
                      </p>
                    </div>
                  );
                });
              } else {
                return Object.entries(item).map(([key, value]) => {
                  // ใช้ Number.isInteger(value) เพื่อตรวจสอบว่า value เป็นจำนวนเต็มหรือไม่ เพื่อแสดงตัวเลขด้วยทศนิยมเฉพาะเมื่อมีทศนิยมและไม่แสดงเมื่อไม่มีทศนิยม
                  if (!value) value = 0;
                  const formattedValue = Number.isInteger(value)
                    ? value.toLocaleString("en-US")
                    : value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " %";
                  return (
                    <div key={key} className="flex justify-between w-full">
                      <p className="uppercase text-base dark:text-white leading-4 text-gray-800">{key}</p>
                      <p className="text-base dark:text-gray-300 leading-4 text-gray-600">{formattedValue}</p>
                    </div>
                  );
                });
              }
            })}
            {/* Lead Commission */}
            {leadCom?.map((item, index) => {
              const result = (item.acc / tarp) * 100;
              let acc_vs_tarp = result.toFixed(2);
              if (isNaN(acc_vs_tarp)) acc_vs_tarp = 0;

              return (
                <div className="w-full" key={index}>
                  <div className="py-1 flex justify-between w-full">
                    <p className="uppercase text-base dark:text-white leading-4 text-gray-800">{item.title}</p>
                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">{item.com.toLocaleString()}</p>
                  </div>
                  <div className="py-1 flex justify-between w-full">
                    <p className="uppercase text-base dark:text-white leading-4 text-gray-800">Acc.Cost</p>
                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">{item.acc.toLocaleString()}</p>
                  </div>
                  <div className="py-1 flex justify-between w-full">
                    <p className="uppercase text-base dark:text-white leading-4 text-gray-800">Acc.Cost_VS_TARP </p>
                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">{acc_vs_tarp}%</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
