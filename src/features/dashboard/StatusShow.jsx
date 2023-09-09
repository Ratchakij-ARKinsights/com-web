import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import CircleStackIcon from "@heroicons/react/24/outline/CircleStackIcon";
import CreditCardIcon from "@heroicons/react/24/outline/CreditCardIcon";

import StatusCard from "./StatusCard";

const statsData = [
  {
    title: "AGENTS",
    value: "500 members",
    icon: <UserGroupIcon className="w-8 h-8" />,
    description: "↗︎ 6 (15%)",
  },
  {
    title: "Total Sales",
    value: "$534,545",
    icon: <CreditCardIcon className="w-8 h-8" />,
    description: "Current month",
  },
  {
    title: "Pending Leads",
    value: "50",
    icon: <CircleStackIcon className="w-8 h-8" />,
    description: "5 in hot leads",
  },
  {
    title: "Active",
    value: "450",
    icon: <UsersIcon className="w-8 h-8" />,
    description: "↙ 300 (18%)",
  },
];

export default function StatusShow() {
  return (
    <>
      <div className="grid gap-2 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 justify-center items-center">
        {statsData.map((d, k) => {
          return <StatusCard key={k} {...d} colorIndex={k} />;
        })}
      </div>
    </>
  );
}
