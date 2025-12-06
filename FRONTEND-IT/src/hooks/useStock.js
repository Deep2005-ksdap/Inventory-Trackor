import { useContext } from "react";
import { StockContext } from "../contexts/StockContext";
export const useStock = () => useContext(StockContext);
