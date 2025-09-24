
function StockList({ items = [] }) {
  if (items.length === 0) {
    return <p>No stocks added yet.</p>;
  }

  function money(n) {
      if (!Number.isFinite(n)) {
        return "—";
      }
      return n.toLocaleString(undefined, { style: "currency", currency: "USD" });
    }

function num(n) {
      if (!Number.isFinite(n)) {
        return "—";
      }
      return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
  }

      let cards = [];
      for (let stock of items) {
        // 1. The cost (what you paid originally)
        let cost = stock.buyPrice * stock.qty;

        // 2. Set defaults
        let value = 0;
        let pl = null;

        // 3. If we have a current price, update value and profit/loss
        if (stock.currentPrice) {
          value = stock.currentPrice * stock.qty;
          pl = value - cost;
        }

        // 4. Build the card for this stock
        cards.push(
          <div className="stock-card" key={stock.id}>
            <p><strong>Symbol:</strong> {stock.symbol}</p>
            <p><strong>Quantity:</strong> {stock.qty}</p>
            <p><strong>Buy Price:</strong> {stock.buyPrice}</p>
            <p><strong>Current Price:</strong> {stock.currentPrice ?? "—"}</p>
            <p><strong>Value:</strong> {value}</p>
            <p style={{ color: pl >= 0 ? "green" : "red" }}>
              <strong>Profit/Loss:</strong> {pl !== null ? (pl >= 0 ? "+" : "") + pl.toFixed(2) : "—"}
            </p>
          </div>
        );
      }

  return <div>{cards}</div>;

}


export default StockList