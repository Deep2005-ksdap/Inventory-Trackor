
exports.checkStock = (stock) => {
  const totalStockValue = stock.reduce((acc, item) => {
    return acc + item.itemprice * item.itemunits;
  }, 0);
  const lowStockItems = stock.filter(item => item.itemunits < 5);
  return {
    totalStockValue,
    lowStockItems,
    lowStockItemsCount: lowStockItems.length
  };
}