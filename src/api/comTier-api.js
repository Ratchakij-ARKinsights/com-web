import axios from "./axios";

export const getComtier = () => axios.get("/comTier");
export const updateComtier = (input) => axios.post("/comTier", input);
export const getLeadComtier = () => axios.get("/comTier/get-lead-comtier");
export const updateLeadComtier = (input) => axios.post("/comTier/update-lead-comtier", input);
