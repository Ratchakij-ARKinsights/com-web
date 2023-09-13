import { createContext, useEffect, useState } from "react";

import * as comTierApi from "../api/comTier-api";
import * as employeeApi from "../api/employee-api";
import * as orderApi from "../api/order-api";

export const ApiDataContext = createContext();

export default function ApiDataContextProvider({ children }) {
  const [comTier, setComTier] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [orders, setOrders] = useState([]);
  const [sumOrderAgent, setSumOrderAgent] = useState(null);
  const [sumOrderAgentByRange, setSumOrderAgentByRange] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [comTierResponse, employeeResponse, orderResponse, sumResponse] = await Promise.all([
          comTierApi.getComtier(),
          employeeApi.getAllEmployee(),
          orderApi.getAllOrder(),
          orderApi.getTotalPriceByAgentId(),
        ]);

        setComTier(comTierResponse.data.comTier);
        setEmployees(employeeResponse.data.employees);
        setOrders(orderResponse.data.orders);
        setSumOrderAgent(sumResponse.data.totalPriceByAgentId);
      } catch (err) {
       console.log(err);
      }
    };

    fetchData();
  }, []);

  const getSumOrderByRange = async (dataToSend) => {
    const res = await orderApi.getSumOrderByRange(dataToSend);
    setSumOrderAgentByRange(res.data.sumOrderAgentByRange);
  };

  return (
    <ApiDataContext.Provider
      value={{ comTier, employees, orders, sumOrderAgent, sumOrderAgentByRange, getSumOrderByRange }}
    >
      {children}
    </ApiDataContext.Provider>
  );
}
