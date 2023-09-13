import axios from "./axios";

export const getComtier = () => axios.get("/comTier");
export const updateComtier = (input) => axios.post("/comTier", input);
