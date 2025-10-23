import { useContext, useEffect, useState } from "react";
import { Logic } from "../store/Context";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";

const CreateStock = () => {
  const navigate = useNavigate();
  const { stockId } = useParams();
  const location = useLocation();
  const {isLoggedIn, createStock, editItemHandler } = useContext(Logic);
  const [category, setCategory] = useState("groceries");

  let title;
  if (location.pathname === "/home/add-item") {
    title = "ADD stock";
  } else {
    title = "EDIT-Item";
  }
  const{ stock }= location.state || {};

  const [itemname, setItemName] = useState("");
  const [itemprice, setItemPrice] = useState();
  const [itemunits, setItemUnits] = useState();
  const [itembrand, setItemBrand] = useState("");
  const [itemsize, setItemSize] = useState("");

  const handleData = async (event) => {
    event.preventDefault();
    if (location.pathname === "/home/add-item") {
      await createStock(
        itemname,
        itemprice,
        itemunits,
        itembrand,
        category,
        itemsize
      );
    } else {
      await editItemHandler(
        stockId,
        itemname,
        itemprice,
        itemunits,
        itembrand,
        category,
        itemsize
      );
    }
    navigate("/home/dashboard");

    setCategory("");
    setItemName("");
    setItemPrice("");
    setItemSize("");
    setItemBrand("");
    setItemUnits("");
  };

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

  return isLoggedIn ? (
    <div className="min-h-screen  flex justify-center items-center bg-white shadow bg-gradient-to-r from-blue-100 via-white to-green-100">
      <div className="max-w-[600px] w-full border-white border-2 px-4 py-2 rounded-2xl hover:shadow-xl  ">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
          {title}
        </h2>

        <form onSubmit={handleData} className="px-2">
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Item Name</label>
            <select
              name="category"
              onChange={(event) => {
                setCategory(event.target.value);
              }}
              id="category"
              className="w-full py-2 *border rounded-md  focus:outline-none cursor-pointer"
            >
              <option value="" disabled>
                Select from here
              </option>
              <option value="groceries">Groceries</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Item Name</label>
            <input
              type="text"
              value={itemname}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="eg. Chips"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Item Price (₹)</label>
            <input
              type="number"
              value={itemprice}
              onChange={(e) => setItemPrice(e.target.value)}
              placeholder="eg. 499"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Unit</label>
            <input
              type="number"
              value={itemunits}
              onChange={(e) => setItemUnits(e.target.value)}
              placeholder="eg. 10"
            />
          </div>

          {category === "electronics" && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Brand Name</label>
              <input
                type="text"
                value={itembrand}
                onChange={(e) => {
                  setItemBrand(e.target.value);
                }}
                placeholder="eg. XYZ company"
              />
            </div>
          )}

          {category === "clothing" && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Size</label>
              <input
                type="text"
                value={itemsize}
                placeholder="eg. M"
                onChange={(e) => {
                  setItemSize(e.target.value);
                }}
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            {title === "EDIT-Item" ? "Edit" : "Add"} Item{" "}
          </button>
        </form>
      </div>
    </div>
  ) : <Navigate to={"/user/login"}/>
};

export default CreateStock;
