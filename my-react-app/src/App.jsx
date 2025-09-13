import React, { useState } from "react";
import StockForm from "./StockForm";
import "./App.css";          // page + card + headings
import "./StockForm.css";    // form row, inputs, button

function App() {
  // list of stocks on the dashboard
  const [stocks, setStocks] = useState([]);

  // add a new stock to the list (very explicit, beginner friendly)
  function addStock(newStock) {
    const oldList = stocks;                     // current list
    const updatedList = oldList.concat(newStock); // new list with the new item at the end
    setStocks(updatedList);                     // tell React to use the new list
  }

  return (
    <div className="page">
      <div className="card">
        <h1 className="title">Finance Dashboard</h1>

        {/* the row with three inputs and the blue button */}
        <StockForm onAddStock={addStock} />

        {/* stock list area */}
        <h2 className="sectionTitle">Stock List</h2>

        {stocks.length === 0 && (
          <p className="muted">No stocks added yet.</p>
        )}

        {stocks.length > 0 && (
          <ul className="list">
            {stocks.map(function (stock, index) {
              return (
                <li key={index} className="listItem">
                  {stock.symbol} — {stock.quantity} shares @ ${stock.price}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
