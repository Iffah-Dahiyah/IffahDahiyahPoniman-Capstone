import { useState } from "react";
import StockForm from "./components/StockForm.jsx";
import StockList from "./components/StockList.jsx";

function App() {
 // This is sample only so can see
  const [stocks, setStocks] = useState([
    { id: "1", symbol: "AAPL", qty: 10, buyPrice: 150, currentPrice: undefined },
  ]);

  // Add a new stock
function addStock(symbol, qty, buyPrice) {
  // create a simple id using the current time
  const id = Date.now().toString();

  // make a new stock object
  const newStock = {
    id: id,
    symbol: symbol.toUpperCase(),  // need to be always uppercase like "AAPL"
    qty: parseInt(qty, 10),        // make sure it's a number
    buyPrice: parseFloat(buyPrice),// allow decimals
    currentPrice: 0,            // will fill this later
  };

  // add it to the list
  setStocks(oldStocks => [...oldStocks, newStock]);
}

// Update an existing stock
function updateStock(id, updates) {
  setStocks(oldStocks =>
    oldStocks.map(stock => {
      if (stock.id === id) {
        // return a copy of the stock with updates applied
        return { ...stock, ...updates };
      } else {
        // leave it unchanged
        return stock;
      }
    })
  );
}

// this is the part that is updated after you fill up form: 
  return (
    <div style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <h1>Finance Dashboard</h1>

      <section style={{ marginTop: 16, marginBottom: 24 }}>
        {/* Form is still a sketch, handler do later */}
        <StockForm onAdd={addStock} />
      </section>

      <section>
        <h2 style={{ marginBottom: 8 }}>Stock List</h2>
        <StockList items={stocks} />
      </section>
    </div>
  );
}

export default App;