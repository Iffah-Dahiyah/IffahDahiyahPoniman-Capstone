import { useState } from "react";
import StockForm from "./components/StockForm.jsx";
import StockList from "./components/StockList.jsx";
import "./App.css"; 

const API_KEY = "4T42M0FBRI8PGDOY";

function App() {

  const [stocks, setStocks] = useState([]);

  // Add a new stock
function addStock(symbol, qty, buyPrice) {
  // create a simple id using the current time
  const id = Date.now().toString();

useEffect(() => {
  // 1) find ONE stock that still needs a price
  const target = stocks.find(s => s.currentPrice === undefined);
  if (!target) return; // nothing to do

  // 2) build the URL for that stock
  const url =
    "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" +
    encodeURIComponent(target.symbol) +
    "&apikey=" +
    API_KEY;

  // 3) fetch -> res.json() -> set state
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const priceStr = data && data["Global Quote"] && data["Global Quote"]["05. price"];
      const price = Number(priceStr);
    })
    
}, [stocks]);  // runs again after we set the price, so the next pending stock gets fetched


//   // sample: make a new stock object
//   const newStock = {
//     id: id,
//     symbol: symbol.toUpperCase(),  // need to be always uppercase like "AAPL"
//     qty: parseInt(qty, 10),        // make sure it's a number
//     buyPrice: parseFloat(buyPrice),// allow decimals
//     currentPrice: 0,            // will fill this later
//   };

//   // add it to the list
//   setStocks(oldStocks => [...oldStocks, newStock]);
// }

// // Update an existing stock
// function updateStock(id, updates) {
//   setStocks(oldStocks =>
//     oldStocks.map(stock => {
//       if (stock.id === id) {
//         // return a copy of the stock with updates applied
//         return { ...stock, ...updates };
//       } else {
//         // leave it unchanged
//         return stock;
//       }
//     })
//   );
}
 
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