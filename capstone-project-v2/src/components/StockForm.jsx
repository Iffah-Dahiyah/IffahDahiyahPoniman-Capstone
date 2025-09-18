import { useState } from "react"

function StockForm({ onAdd }) {
  const [symbol, setSymbol] = useState("")
  const [quantity, setQuantity] = useState("")
  const [price, setPrice] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    // no validation or uppercasing yet — that’s Step 5
    const newStock = {
      id: Date.now().toString(),
      symbol: symbol.trim(),
      quantity: Number(quantity),
      price: Number(price),
    }
    onAdd(newStock)
    setSymbol("")
    setQuantity("")
    setPrice("")
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Symbol
        <input value={symbol} onChange={e => setSymbol(e.target.value)} required />
      </label>
      <label>
        Quantity
        <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} required />
      </label>
      <label>
        Purchase Price
        <input type="number" value={price} onChange={e => setPrice(e.target.value)} required />
      </label>
      <button type="submit">Add Stock</button>
    </form>
  )
}

export default StockForm;