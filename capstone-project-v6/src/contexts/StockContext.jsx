import { createContext, useContext, useState, useCallback } from "react";

const StockContext = createContext(null);

export function StockProvider({ children }) {
  const [stocks, setStocks] = useState([]);

  const addStock = useCallback((symbol, qty, buyPrice) => {
    const id = String(Date.now() + Math.random());
    setStocks(prev => [...prev, { id, symbol, qty, buyPrice, currentPrice: undefined }]);
  }, []);

  const setCurrentPrice = useCallback((id, price) => {
    setStocks(prev => prev.map(s => (s.id === id ? { ...s, currentPrice: price } : s)));
  }, []);

  return (
    <StockContext.Provider value={{ stocks, addStock, setCurrentPrice }}>
      {children}
    </StockContext.Provider>
  );
}

export function useStocks() {
  const ctx = useContext(StockContext);
  if (!ctx) throw new Error("useStocks must be used inside <StockProvider>");
  return ctx;
}
