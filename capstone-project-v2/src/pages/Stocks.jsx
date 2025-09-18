import { useState } from "react"
import StockForm from "../components/StockForm.jsx"

function Stocks() {
  const [stocks, setStocks] = useState([])

  function handleAdd(stock) {
    // temporary: just keep it in state and log it
    setStocks(prev => {
      const next = [...prev, stock]
      console.log("Stocks now:", next)
      return next
    })
  }

  return (
    <section>
      <StockForm onAdd={handleAdd} />
    </section>
  )
}

export default Stocks;