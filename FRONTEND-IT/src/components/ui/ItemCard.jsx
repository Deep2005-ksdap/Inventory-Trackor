import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { useContext } from "react";
import { StockContext } from "../../store/StockContext";

const ItemCard = ({item}) => {
  const { deleteStock } = useContext(StockContext);
  // console.log(item.item)
  const ITEM = item.item;
  return (
    
    <div
      className="flex w-full justify-between text-gray-800 font-semibold"
      key={ITEM._id}
    >
      <span>{ITEM.itemname}</span>
      <span>{ITEM.itemprice}</span>
      <span>{ITEM.itemunits}</span>
      <span>
        <Link to={`/home/edit-item/${ITEM._id}`} state={{ stock: ITEM }}>
          <MdEdit className="text-red-500"/>
        </Link>
      </span>
      <span>
        <button onClick={() => deleteStock(ITEM._id)}>
          <AiFillDelete className="text-red-500"/>
        </button>
      </span>
    </div>
  );
};

export default ItemCard;
