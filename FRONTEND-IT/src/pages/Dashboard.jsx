import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import { StockContext } from "../store/StockContext";
import { Link } from "react-router-dom";
import Loader from "../components/layout/Loader";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const Dashboard = () => {
  const { isLoggedIn, user } = useContext(AuthContext);
  const {
    allStock,
    lowStockItems,
    lowStockItemsCount,
    totalStockValue,
    deleteStock,
    loading,
  } = useContext(StockContext);

  if (!isLoggedIn) return <Loader />;
  if (loading) return <Loader />;

  // group stock by category
  const dataByCategory = allStock.reduce((acc, item) => {
    const { category } = item;
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {});

  return (
    <main className="flex flex-col items-center min-h-screen w-auto bg-gradient-to-r from-blue-100 via-white to-green-100 px-4 py-4 text-center">
      <h1 className="text-2xl mb-4 font-bold text-blue-500">
        Welcome,
        <span className="font-extrabold text-3xl text-green-500">
          "{user.fullname.firstname}"
        </span>
      </h1>

      {/* Summary Section */}
      <ol className="flex w-full flex-col gap-2 px-6 py-4 text-gray-700 bg-blue-100 rounded-2xl text-left font-medium mb-6">
        <li className="flex justify-between items-center font-bold">
          <span>Total Inventory Value:</span>
          <span className="text-green-700">₹{totalStockValue}</span>
        </li>

        <li className="flex justify-between items-center">
          <span>Items below 5 units:</span>
          <span className="text-red-500 font-bold">{lowStockItemsCount}</span>
        </li>

        <li className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <span>Low stock items:</span>
          <span className="text-blue-600 font-bold break-words">
            {lowStockItems.length > 0
              ? lowStockItems.map((i) => i.itemname).join(", ")
              : "None"}
          </span>
        </li>
      </ol>

      {/* Inventory List */}
      {Object.keys(dataByCategory).length === 0 ? (
        <p className="font-semibold px-6 py-10 text-center">
          YOUR Inventory is Empty, Start adding items!
        </p>
      ) : (
        Object.entries(dataByCategory).map(([category, items]) => (
          <div
            key={category}
            className="max-w-[900px] min-w-[350px] flex flex-col items-center bg-white border rounded-lg shadow p-4 m-4"
          >
            <h2 className="font-bold text-xl text-red-400">
              Category: {category}
            </h2>

            <table className="table-fixed w-full mt-4 text-left">
              <thead className="text-gray-500 border-b-2 border-gray-300">
                <tr className="text-center">
                  <th>Item</th>
                  <th>Price</th>
                  <th>Units</th>
                  <th>Edit</th>
                  <th>Del</th>
                </tr>
              </thead>

              <tbody>
                {items.map((item) => (
                  <tr className="text-center" key={item._id}>
                    <td className="font-bold text-blue-600">{item.itemname}</td>
                    <td>{item.itemprice}</td>
                    <td>{item.itemunits}</td>

                    <td className="text-blue-500 text-xl cursor-pointer">
                      <Link
                        to={`/home/edit-item/${item._id}`}
                        state={{ stock: item }}
                      >
                        <FaEdit />
                      </Link>
                    </td>

                    <td className="text-red-500 text-xl cursor-pointer">
                      <button onClick={() => deleteStock(item._id)}>
                        <MdDeleteForever />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}

      <div className="w-full flex justify-end max-w-4xl mt-6 mr-6">
        <Link
          to="/home/add-item"
          className="bg-red-500 text-white px-6 py-3 rounded-lg font-bold shadow"
        >
          + Add Items
        </Link>
      </div>
    </main>
  );
};

export default Dashboard;
