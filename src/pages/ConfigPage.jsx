import { useState } from "react";
import { Button } from "@material-tailwind/react";
import useApiData from "../hooks/useApiData";
import RateTable from "../features/dashboard/RateTable";
import ProductConfig from "../features/product/ProductConfig";
import Modal from "../components/Modal";
import EditComTier from "../features/config/EditComTier";

export default function ConfigPage() {
  const { comTier, setComTier } = useApiData();
  const [open, setOpen] = useState(false);

  const onUpdateComTier = (updatedComTier) => {
    setComTier(updatedComTier); // อัปเดต state ของ ComTier ด้วยข้อมูลใหม่
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 mt-8 mb-8 flex flex-col gap-12">
      <header className="bg-white shadow ">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="items-center justify-between md:flex">
            <div className="max-w-lg">
              <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">Config</h3>
              <p className="text-gray-600 mt-2">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col mb-8 p-6">
        <RateTable comTier={comTier} />
        <div className="flex justify-center">
          <Button variant="gradient" className="rounded-full" onClick={() => setOpen(true)}>
            EDIT
          </Button>
        </div>
      </div>
      <Modal title="Config Commission Tier" open={open} onClose={() => setOpen(false)}>
        {comTier?.map((item, index) => (
          <EditComTier key={index} comTier={item} index={index} onUpdateComTier={onUpdateComTier} />
        ))}
      </Modal>
      <div className="mb-8 p-6">
        <ProductConfig />
      </div>
    </div>
  );
}
