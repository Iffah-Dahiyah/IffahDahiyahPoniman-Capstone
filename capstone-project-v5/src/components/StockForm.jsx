import { useState } from "react";

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
  <form onSubmit={onSubmit} style={{ display: "grid", gap: 12, maxWidth: 420 }}>
    <label style={{ display: "grid", gap: 4 }}>
      Symbol
      <input
        placeholder="e.g. AAPL"
        value={symbol}
        onChange={(event) => setSymbol(event.target.value)}
      />
    </label>

    <label style={{ display: "grid", gap: 4 }}>
      Quantity
      <input
        type="number"
        placeholder="e.g. 10"
        value={qty}
        onChange={(event) => setQty(event.target.value)}
      />
    </label>

    <label style={{ display: "grid", gap: 4 }}>
      Buy Price
      <input
        type="number"
        step="0.01"
        placeholder="e.g. 150.00"
        value={buyPrice}
        onChange={(event) => setBuyPrice(event.target.value)}
      />
    </label>

    {error && <div style={{ color: "crimson" }}>{error}</div>}

    <button type="submit">Add Stock</button>
  </form>
);

}

export default StockForm
