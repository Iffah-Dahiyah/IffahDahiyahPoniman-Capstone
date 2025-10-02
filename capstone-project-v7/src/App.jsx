import { useState, useEffect } from "react";
import StockForm from "./components/StockForm.jsx";
import StockList from "./components/StockList.jsx";
import "./App.css";

const API_KEY = "4T42M0FBRI8PGDOY";

function App() {
  const [stocks, setStocks] = useState([]);

  // Adds a new holding with placeholders for prices
  function addStock(symbol, qty, buyPrice) {
    const id = String(Date.now());  // simple unique id
    const newStock = {
      id,
      symbol,          
      qty,
      buyPrice,
      openPrice: undefined,     
      currentPrice: undefined,  
    };
    setStocks(prevStocks => [...prevStocks, newStock]);
  }

  // Fetch Open ("02. open") and Close/Latest ("05. price") for ONE pending stock at a time
  useEffect(() => {
    const target = stocks.find(s => s.currentPrice === undefined);
    if (!target) return;

    const url =
      "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" +
      encodeURIComponent(target.symbol) +
      "&apikey=" +
      API_KEY;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const openStr  = data && data["Global Quote"] && data["Global Quote"]["02. open"];
        const closeStr = data && data["Global Quote"] && data["Global Quote"]["05. price"];

        const open  = Number(openStr);
        const close = Number(closeStr);

        // Update only the target stock
        setStocks(prev =>
          prev.map(s =>
            s.id === target.id
              ? {
                  ...s,
                  openPrice:   Number.isFinite(open)  ? open  : null, // null -> show "—"
                  currentPrice: Number.isFinite(close) ? close : null, // null -> show "—"
                }
              : s
          )
        );
      })
      .catch(() => {
        // On error, mark as unavailable so UI shows "—"
        setStocks(prev =>
          prev.map(s =>
            s.id === target.id ? { ...s, openPrice: null, currentPrice: null } : s
          )
        );
      });
  }, [stocks]);

  return (
    <div className="page">
      <div className="content">
        <h1>Finance Dashboard</h1>

        <section>
          <StockForm onAdd={addStock} />
        </section>

        <section>
          <h2 className="section-title">Stock List</h2>
          <StockList items={stocks} />
        </section>
      </div>
    </div>
  );
}

export default App;