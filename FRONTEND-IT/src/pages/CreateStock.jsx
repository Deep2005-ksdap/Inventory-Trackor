import { useContext, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { StockContext } from "../store/StockContext";
import { AuthContext } from "../store/AuthContext";

const CreateStock = () => {
  const navigate = useNavigate();
  const { stockId } = useParams();
  const location = useLocation();
  const { isLoggedIn, checkAuth } = useContext(AuthContext);
  const { createStock, editStock } = useContext(StockContext);

  const isAddPage = location.pathname === "/home/add-item";
  const title = isAddPage ? "Add Item" : "Edit Item";

  const { stock } = location.state || {};

  const [category, setCategory] = useState("groceries");
  const [itemname, setItemName] = useState("");
  const [itemprice, setItemPrice] = useState("");
  const [itemunits, setItemUnits] = useState("");
  const [itembrand, setItemBrand] = useState("");
  const [itemsize, setItemSize] = useState("");
  const [loading, setLoading] = useState(false);

  const handleData = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (isAddPage) {
      await createStock(itemname, itemprice, itemunits, itembrand, category, itemsize);
    } else {
      await editStock(stockId, itemname, itemprice, itemunits, itembrand, category, itemsize);
    }

    setLoading(false);
    navigate("/home/dashboard");

    setCategory("groceries");
    setItemName("");
    setItemPrice("");
    setItemUnits("");
    setItemBrand("");
    setItemSize("");
  };

    useEffect(() => {
      // run once on app mount
      checkAuth();
    }, [checkAuth]);

  useEffect(() => {
    if (stock) {
      setItemName(stock.itemname);
      setItemPrice(stock.itemprice);
      setItemUnits(stock.itemunits);
      setCategory(stock.category);
      if (stock.category === "clothing") setItemSize(stock.itemsize);
      if (stock.category === "electronics") setItemBrand(stock.itembrand);
    }
  }, [stock]);

  if (!isLoggedIn) return <Navigate to="/user/login" />;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-100 via-white to-green-100 px-4">
      <div className="w-full max-w-[600px] bg-white/50 backdrop-blur-md border border-white/70 shadow-lg rounded-2xl p-6 transition">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
          {title}
        </h2>

        <form onSubmit={handleData} className="space-y-5">

          {/* Category */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full py-2 px-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer bg-white"
            >
              <option value="groceries">Groceries</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
            </select>
          </div>

          {/* Item Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Item Name</label>
            <input
              type="text"
              value={itemname}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="e.g. Chips"
              className="w-full py-2 px-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Item Price (₹)</label>
            <input
              type="number"
              value={itemprice}
              onChange={(e) => setItemPrice(e.target.value)}
              placeholder="e.g. 499"
              className="w-full py-2 px-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Unit */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Units</label>
            <input
              type="number"
              value={itemunits}
              onChange={(e) => setItemUnits(e.target.value)}
              placeholder="e.g. 10"
              className="w-full py-2 px-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Conditional: Brand */}
          {category === "electronics" && (
            <div>
              <label className="block text-gray-700 font-medium mb-1">Brand Name</label>
              <input
                type="text"
                value={itembrand}
                onChange={(e) => setItemBrand(e.target.value)}
                placeholder="e.g. Sony"
                className="w-full py-2 px-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {/* Conditional: Size */}
          {category === "clothing" && (
            <div>
              <label className="block text-gray-700 font-medium mb-1">Size</label>
              <input
                type="text"
                value={itemsize}
                onChange={(e) => setItemSize(e.target.value)}
                placeholder="e.g. M"
                className="w-full py-2 px-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white font-bold py-2 rounded-xl transition 
              ${loading
                ? "bg-blue-400 cursor-not-allowed opacity-70"
                : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {loading ? "Processing..." : title}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateStock;
