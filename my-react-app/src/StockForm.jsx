import React, { useState } from "react";

export default function StockForm({ onAddStock }) {
  // state to hold what the user types
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    // make a stock object
    const newStock = {
      symbol: symbol.trim().toUpperCase(),
      quantity: Number(quantity),
      price: Number(price),
    };

    // hand this data back to the parent (App.jsx)
    onAddStock(newStock);

    // clear the form
    setSymbol("");
    setQuantity("");
    setPrice("");
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px" }}>
      <input
        placeholder="Stock Symbol"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
      />
      <input
        placeholder="Quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <input
        placeholder="Purchase Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button type="submit">Add Stock</button>
    </form>
  );
}
