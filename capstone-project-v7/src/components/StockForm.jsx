import { useState } from "react";
import "./StockForm.css";
import "./StockList.css";

function StockForm({ onAdd }) {
  const [symbol, setSymbol] = useState("");
  const [qty, setQty] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [error, setError] = useState("");

function onSubmit(event) {
  event.preventDefault();   // stop the page from refreshing
  setError("");             // clear any old error message

  // clean up the user inputs
  const stockSymbol = symbol.trim().toUpperCase();
  const quantity = Number(qty);
  const purchasePrice = Number(buyPrice);

  // validate the inputs
  if (!stockSymbol) {
    return setError("Symbol is required.");
  }
  if (!Number.isFinite(quantity) || quantity <= 0) {
    return setError("Quantity must be a positive number.");
  }
  if (!Number.isFinite(purchasePrice) || purchasePrice <= 0) {
    return setError("Buy price must be a positive number.");
  }

  // if everything is valid, add the stock
  onAdd(stockSymbol, quantity, purchasePrice);

  // reset the form fields for the next entry
  setSymbol("");
  setQty("");
  setBuyPrice("");
}

   return (
    <>
      <form className="stockForm" onSubmit={onSubmit}>
        <input
          className="symbol"
          type="text"
          placeholder="Stock Symbol"
          aria-label="Stock Symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />

        <input
          className="qty"
          type="text"          /* no spinners */
          inputMode="numeric"
          placeholder="Quantity"
          aria-label="Quantity"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
        />

        <input
          className="price"
          type="text"          /* no spinners */
          inputMode="decimal"
          placeholder="Purchase Price"
          aria-label="Purchase Price"
          value={buyPrice}
          onChange={(e) => setBuyPrice(e.target.value)}
        />

        <button type="submit" className="addBtn">Add Stock</button>
      </form>

      {error && <div className="formError">{error}</div>}
    </>
  );

}

export default StockForm
