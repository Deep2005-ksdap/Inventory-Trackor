import React, { useContext } from "react";
import { StockContext } from "../../store/StockContext";

const InfoCard = () => {
  const { lowStockItems, lowStockItemsCount, totalStockValue } =
    useContext(StockContext);
  return (
      <div className="flex max-w-[900px] w-full flex-col  bg-blue-200 p-5 rounded-xl shadow-xl border-white border-1">
        <div className="flex justify-between">
          <span>Total Inventory</span>
          <span>Low Stocks</span>
          <span>Items {'<'} 5 Units</span>
        </div>
        <hr className="text-gray-400"/>
        <div className="flex justify-between">
          <span className="font-bold">₹{totalStockValue}</span>
          <span className="text-red-600">{lowStockItemsCount}</span>
          <span className="text-red-600">{lowStockItems.length > 0
              ? lowStockItems.map((i) => i.itemname).join(", ")
              : "None"}</span>
        </div>
      </div>
  );
};

export default InfoCard;
