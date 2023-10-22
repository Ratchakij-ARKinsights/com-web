import { Button, Typography } from "@material-tailwind/react";
import { useState } from "react";
import Modal from "../components/Modal";
import EditComTier from "../features/config/EditComTier";
import RateTable from "../features/dashboard/RateTable";
import useApiData from "../hooks/useApiData";

import EditLeadComTier from "../features/config/EditLeadComTier";

export default function ConfigPage() {
  const { comTier, setComTier, leadComTier, setLeadComTier } = useApiData();
  const [open, setOpen] = useState(false);
  const [openLead, setOpenLead] = useState(false);

  const onUpdateComTier = (updatedComTier) => {
    setComTier(updatedComTier); // อัปเดต state ของ ComTier ด้วยข้อมูลใหม่
  };
  const onUpdateLeadComTier = (updatedLeadComTier) => {
    setLeadComTier(updatedLeadComTier); // อัปเดต state ของ ComTier ด้วยข้อมูลใหม่
  };

  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col gap-12">
      <div className="w-full flex border border-blue-gray-100">
        <div className="w-1/2 flex flex-col justify-center gap-2 ">
          <RateTable comTier={comTier} />
          <div className="mb-2 w-full flex justify-center">
            <Button className="w-[6rem] bg-light-blue-700" size="sm" onClick={() => setOpen(true)}>
              EDIT
            </Button>
          </div>
        </div>
        <Modal title="Config Commission Tier" open={open} onClose={() => setOpen(false)}>
          {comTier?.map((item, index) => (
            <EditComTier key={index} comTier={item} index={index} onUpdateComTier={onUpdateComTier} />
          ))}
        </Modal>

        {/* LEADER COMMISSION */}
        <div className="w-1/2 ">
          <div className="text-center bg-blue-700 border border-blue-gray-100">
            <Typography variant="h4" color="blue-gray">
              Leader Commission
            </Typography>
          </div>
          <div className="p-4 uppercase bg-blue-gray-50">
            <Typography variant="small" color="blue-gray" className="font-extrabold leading-none">
              Setting
            </Typography>
          </div>

          <div className="h-[21rem] px-4 flex flex-col bg-white border-b-2 border-blue-gray-100">
            <div className="flex flex-col">
              {leadComTier?.map((leadCom, index) => (
                <div
                  key={index}
                  className="w-[15rem] ml-4 mt-2 flex justify-between rounded-md border-b px-1 py-1.5 text-center leading-6 outline-none"
                >
                  <Typography className="font-semibold text-blue-gray-900">{leadCom.title}</Typography>
                  <Typography className="font-semibold text-blue-gray-900">{leadCom.percent} %</Typography>
                </div>
              ))}
            </div>
          </div>

          {/* MODAL */}
          <Modal title="Config Leader Commission" open={openLead} onClose={() => setOpenLead(false)}>
            {leadComTier?.map((item, index) => (
              <EditLeadComTier
                item={item}
                key={index}
                leadComTier={leadComTier}
                index={index}
                onUpdateLeadComTier={onUpdateLeadComTier}
              />
            ))}
          </Modal>

          <div className="mt-1 text-center">
            <Button className="w-[6rem] bg-light-blue-900" size="sm" onClick={() => setOpenLead(true)}>
              EDIT
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
