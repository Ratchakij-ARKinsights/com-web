export const getAgentOrderByRange = (orders, agents) => {
  if (!orders || !agents) return [];

  // สร้าง Map สำหรับเก็บ order ตาม agentId
  const ordersByAgent = new Map();

  // วนลูปเพื่อแยก order ตาม agentId
  for (const order of orders) {
    const agentId = order.agentId;
    if (!ordersByAgent.has(agentId)) {
      ordersByAgent.set(agentId, []);
    }
    ordersByAgent.get(agentId).push(order);
  }
  const updatedAgents = agents.map((agent) => {
    const agentId = agent?.agentId;
    if (ordersByAgent.has(agentId)) {
      agent.orders = ordersByAgent.get(agentId);
    } else {
      agent.orders = [];
    }
    return agent;
  });
  return updatedAgents;
};
