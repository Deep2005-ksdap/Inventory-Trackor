import { useContext, useEffect, useState } from "react";
import { Logic } from "../store/Context";
import { Link, useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Loader from "../components/layout/Loader";

const Dashboard = () => {
  const navigate = useNavigate();
  const {
    isLoggedIn,
    serverData,
    dataOfUser,
    allStock,
    setAllStock,
  } = useContext(Logic);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const data = async () => {
      const data = await dataOfUser();
      setAllStock(data.data.allStock);
    };

    data();
  }, []);

  const handleDeleteItem = async (id) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/home/delete-item/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
        setAllStock((prev) => prev.filter((item) => item._id !== id));
        navigate("/home/dashboard");
      }
    } catch (err) {
      setMessage("Error in deletion", err);
    }
  };

  const ownerName = serverData ? serverData.data.username.firstname : "USER";
  let lowStockItemsCount,
    totalStockValue = 0;
  let lowStockItemName = [];
  if (serverData) {
    lowStockItemName = serverData.data.lowStockItems.map(
      (item) => item.itemname
    );
    lowStockItemsCount = serverData.data.lowStockItemsCount;
    totalStockValue = serverData.data.totalStockValue;
  }

  const dataArray = allStock
    ? allStock.reduce((acc, item) => {
        const { category } = item;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(item);
        return acc;
      }, {})
    : {};
  return isLoggedIn ? (allStock ? (
    <main className="flex flex-col items-center  min-h-screen w-auto bg-gradient-to-r from-blue-100 via-white to-green-100 px-4 py-4 text-center">
      <h1 className="text-2xl mb-4 font-bold text-blue-500">
        Welcome,
        <span className="font-extrabold text-3xl text-green-500">
          "{ownerName}"
        </span>
      </h1>
      
      <ol className="flex w-full flex-col gap-2 px-6 py-4 text-gray-700 bg-blue-100 rounded-2xl text-left font-medium mb-6">
        <li className="flex justify-between items-center font-bold">
          <span>Total value of Your Inventory:</span>
          <span className="text-green-700">₹{totalStockValue}</span>
        </li>
        <li className="flex justify-between items-center">
          <span>No. of Items less than 5 Units:</span>
          <span className="text-red-500 font-bold">{lowStockItemsCount}</span>
        </li>
        <li className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <span>Item names of low STOCK:</span>
          <span className="text-blue-600 font-bold break-words">
            {Array.isArray(lowStockItemName) && lowStockItemName.length > 0
              ? lowStockItemName.join(", ")
              : "None"}
          </span>
        </li>
      </ol>
      {message && (
        <div className="w-full px-2 py-2 bg-blue-300 text-2xl font-medium mb-2 text-red-500">
          <p>{message}</p>
        </div>
      )}
      {Object.entries(dataArray).length === 0 ? (
        <div className="font-semibold px-6 py-10 text-center">
          YOUR Inventory is Empty, Start adding items!
        </div>
      ) : (
        Object.entries(dataArray).map(([category, items]) => (
          <div
            key={category}
            className="max-w-[900px] min-w-[350px] flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 via-white to-green-100 m-4 border-white border-2 rounded-lg hover:shadow-lg hover:shadow-gray-500"
          >
            <h2 className="font-bold text-xl mt-2 text-red-400">
              Category: {category}
            </h2>
            <div className="m-4 w-full">
              <table className="table-fixed w-full mt-4 px-4 py-4 text-left">
                <thead className="text-gray-500 border-b-2 border-gray-300">
                  <tr className="text-center">
                    <th className="px-4 py-2">Item</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Units</th>
                    {category === "electronics" && (
                      <th className="px-4 py-2">Brand</th>
                    )}
                    {category === "clothing" && (
                      <th className="px-4 py-2">Size</th>
                    )}
                    <th className="px-4 py-2">Edit</th>
                    <th className="px-4 py-2">Del</th>
                  </tr>
                </thead>

                <tbody>
                  {items.map((item, index) => (
                    <tr className="text-center" key={index}>
                      <td className="font-bold text-blue-600 px-4 py-2">
                        {item.itemname}
                      </td>
                      <td className="font-medium px-4 py-2">
                        {item.itemprice}
                      </td>
                      <td className="font-medium px-4 py-2">
                        {item.itemunits}
                      </td>
                      {item.category === "electronics" && (
                        <td className="font-medium px-4 py-2">
                          {item.itembrand}
                        </td>
                      )}
                      {item.category === "clothing" && (
                        <td className="font-medium px-4 py-2">
                          {item.itemsize}
                        </td>
                      )}
                      <td className="text-blue-500 text-xl hover:text-blue-700 hover:cursor-pointer px-4 py-2 flex justify-center">
                        <Link
                          to={`/home/edit-item/${item._id}`}
                          state={{ stock: item }}
                        >
                          <FaEdit />
                        </Link>
                      </td>
                      <td className="text-red-500 text-xl hover:text-red-700 hover:cursor-pointer px-4 py-2 item-center">
                        <div className="flex justify-center">
                          <button onClick={() => handleDeleteItem(item._id)}>
                            <MdDeleteForever />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
      <div className="w-full  flex justify-end max-w-4xl mt-6 mr-6">
        <Link
          to="/home/add-item"
          className="bg-red-500 text-white px-6 py-3 rounded-lg font-bold shadow hover:bg-white hover:text-red-600 hover:border hover:border-red-500 transition"
        >
          + Add Items
        </Link>
      </div>
    </main>
  ) : <Loader />) : (
    <main className="flex justify-center items-center px-4 py-4 text-gray-400 min-h-screen font-extrabold text-4xl">
      <h1>Logged In first with credentials given in input placeholder!</h1>
    </main>
  );
};

export default Dashboard;
