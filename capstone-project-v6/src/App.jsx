import { useEffect } from "react";
import StockForm from "./components/StockForm.jsx";
import StockList from "./components/StockList.jsx";
import { useStocks } from "./contexts/StockContext.jsx";
import "./App.css"; 

const API_KEY = "4T42M0FBRI8PGDOY"; // keep as-is for now

function App() {
  // context hook inside the component
  const { stocks, addStock, setCurrentPrice } = useStocks();

  useEffect(() => {
    const target = stocks.find(s => s.currentPrice === undefined);
    if (!target) return;

    const url =
      "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" +
      encodeURIComponent(target.symbol) +
      "&apikey=" + API_KEY;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const priceStr = data && data["Global Quote"] && data["Global Quote"]["05. price"];
        const price = Number(priceStr);
        if (note) {
          console.warn("AlphaVantage note:", note);
        }
        setCurrentPrice(target.id, Number.isFinite(price) ? price : null);
      })
      .catch(() => {
        setCurrentPrice(target.id, null);
      });
  }, [stocks, setCurrentPrice]);


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