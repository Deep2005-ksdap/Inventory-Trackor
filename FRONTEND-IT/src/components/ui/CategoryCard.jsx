import React, { useContext } from "react";
import { StockContext } from "../../store/StockContext";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import ItemCard from "./itemCard";
import Loader from "../layout/Loader";

const CategoryCard = () => {
  const { allStock, loading } = useContext(StockContext);

  if (loading) return <Loader />;

  const dataByCategory = allStock.reduce((acc, item) => {
    const { category } = item;
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {});

  return (
    <div >
      {Object.keys(dataByCategory).length === 0 ? (
        <p className="font-semibold px-6 py-10 text-center">
          YOUR Inventory is Empty, Start adding items!
        </p>
      ) : (
        Object.entries(dataByCategory).map(([category, items]) => (
          <div
            key={category}
            className="max-w-[900px] min-w-[350px] flex flex-col items-center bg-white border-1 border-blue-100 rounded-lg shadow p-4 m-4"
          >
            <h2 className="font-semibold text-xl text-red-400 mb-4">
              {category}
            </h2>

            <div className="flex w-full px-2 justify-between text-gray-600 font-semibold border-b-1 mb-3">
              <span>Item</span>
              <span>Price</span>
              <span>Units</span>
              <span className="text-red-700">
                <FaEdit />
              </span>
              <span className="text-red-700">
                <MdDeleteForever />
              </span>
            </div>

            {items.map((item) => (
              <ItemCard item={{ item }} />
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default CategoryCard;
