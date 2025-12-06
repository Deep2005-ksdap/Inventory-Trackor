import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "./api";
import { AuthContext } from "./AuthContext";

export const StockContext = createContext();

export const StockProvider = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);

  const [allStock, setAllStock] = useState([]);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [lowStockItemsCount, setLowStockItemsCount] = useState(0);
  const [totalStockValue, setTotalStockValue] = useState(0);

  const [loading, setLoading] = useState(false);

  // -------------------------
  // Fetch Dashboard (All data)
  // -------------------------
  const fetchStocks = useCallback(async () => {
    setLoading(true);

    const { ok, data } = await api("/home/dashboard");

    if (ok) {
      const dashboard = data?.data;
      console.log({ dashboard });
      // Normalize and save all fields
      setAllStock(dashboard?.allStock ?? []);
      setLowStockItems(dashboard?.lowStockItems ?? []);
      setLowStockItemsCount(dashboard?.lowStockItemsCount ?? 0);
      setTotalStockValue(dashboard?.totalStockValue ?? 0);
    }

    setLoading(false);
    return { ok, data };
  }, []);

  // -------------------------
  // Create Stock
  // -------------------------
  const createStock = useCallback(
    async (itemname, itemprice, itemunits, itembrand, category, itemsize) => {
      if (!isLoggedIn) return { ok: false, error: "Not authenticated" };

      setLoading(true);

      const { ok, data } = await api("/home/add-item", {
        method: "POST",
        body: { itemname, itemprice, itemunits, itembrand, category, itemsize },
      });

      if (ok) {
        const created = data?.data;

        // Add to local allStock list
        if (created) {
          setAllStock((prev) => [created, ...prev]);

          // Recalculate total stock value locally
          setTotalStockValue(
            (prev) => prev + created.itemprice * created.itemunits
          );

          // If newly created item has low stock
          if (created.itemunits <= 3) {
            setLowStockItems((prev) => [created, ...prev]);
            setLowStockItemsCount((prev) => prev + 1);
          }
        } else {
          // fallback if API doesn’t return created item
          await fetchStocks();
        }
      }

      setLoading(false);
      return { ok, data };
    },
    [isLoggedIn, fetchStocks]
  );

  // -------------------------
  // Edit Stock
  // -------------------------
  const editStock = useCallback(
    async (
      id,
      itemname,
      itemprice,
      itemunits,
      itembrand,
      category,
      itemsize
    ) => {
      if (!isLoggedIn) return { ok: false, error: "Not authenticated" };

      setLoading(true);

      const { ok, data } = await api(`/home/edit-item/${id}`, {
        method: "PATCH",
        body: { itemname, itemprice, itemunits, itembrand, category, itemsize },
      });

      if (ok) {
        setAllStock((prev) =>
          prev.map((it) => (it._id === id ? { ...it, ...updates } : it))
        );

        // After update, safest = refetch entire dashboard
        await fetchStocks();
      }

      setLoading(false);
      return { ok, data };
    },
    [isLoggedIn, fetchStocks]
  );

  const deleteStock = useCallback(
  async (stockId) => {
    if (!isLoggedIn) return { ok: false, error: "Not authenticated" };

    setLoading(true);

    try {
      const { ok, data } = await api(`/home/delete-item/${stockId}`, {
        method: "DELETE",
      });

      if (ok) {
        // Remove deleted item from allStock
        setAllStock((prev) => prev.filter((item) => item._id !== stockId));

        // Remove from low stock items if present
        setLowStockItems((prev) => prev.filter((item) => item._id !== stockId));
        setLowStockItemsCount((prev) =>
          prev > 0 ? prev - 1 : 0
        );

        // Optionally, update total stock value
        const deletedItem = data?.data;
        if (deletedItem) {
          setTotalStockValue(
            (prev) => prev - deletedItem.itemprice * deletedItem.itemunits
          );
        }
      }

      setLoading(false);
      return { ok, data };
    } catch (error) {
      console.error("Delete stock failed:", error);
      setLoading(false);
      return { ok: false, error };
    }
  },
  [isLoggedIn]
);


  // -------------------------
  // Auto-fetch when login
  // -------------------------
  useEffect(() => {
    if (isLoggedIn) fetchStocks();
    else {
      setAllStock([]);
      setLowStockItems([]);
      setLowStockItemsCount(0);
      setTotalStockValue(0);
    }
  }, [isLoggedIn, fetchStocks]);

  return (
    <StockContext.Provider
      value={{
        allStock,
        lowStockItems,
        lowStockItemsCount,
        totalStockValue,
        loading,
        fetchStocks,
        createStock,
        editStock,
        deleteStock,
        setAllStock,
      }}
    >
      {children}
    </StockContext.Provider>
  );
};
