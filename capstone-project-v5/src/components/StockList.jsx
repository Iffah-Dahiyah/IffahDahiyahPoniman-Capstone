
function StockList({ items = [] }) {
  if (items.length === 0) {
    return <p>No stocks added yet.</p>;
  }

  let cards = [];
  for (let stock of items) {
    // Calculate Profit/Loss (P/L)
          let value;
      if (stock.currentPrice) {
        value = stock.currentPrice * stock.qty;
      } else {
        value = 0;
      }
      
    let cost = stock.buyPrice * stock.qty;
    let pl = value - cost;

    cards.push(
      <div className="stock-card" key={stock.id}>
        <p><strong>Symbol:</strong> {stock.symbol}</p>
        <p><strong>Quantity:</strong> {stock.qty}</p>
        <p><strong>Purchase Price:</strong> {stock.buyPrice}</p>
        <p><strong>Current Price:</strong> {stock.currentPrice ?? "—"}</p>
        <p style={{ color: pl >= 0 ? "green" : "red" }}>
          <strong>Profit/Loss:</strong> {pl >= 0 ? "+" : ""}{pl.toFixed(2)}
        </p>
      </div>
    );
  }

  return <div>{cards}</div>;
}


export default StockList