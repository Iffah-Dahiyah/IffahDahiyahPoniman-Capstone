import "./StockList.css";

// small helpers so numbers look clean
function money(n) {
  return Number.isFinite(n)
    ? n.toLocaleString(undefined, { style: "currency", currency: "USD" })
    : "—";
}
function num(n) {
  return Number.isFinite(n)
    ? n.toLocaleString(undefined, { maximumFractionDigits: 2 })
    : "—";
}

function StockList({ items = [] }) {
  if (!items || items.length === 0) {
    return <p>No stocks added yet.</p>;
  }

  return (
    <div className="stockList">
      {items.map((stock) => {
        const isFetching = stock.currentPrice === undefined;
        const hasOpen = Number.isFinite(stock.openPrice);
        const hasClose = Number.isFinite(stock.currentPrice);

        const cost = stock.buyPrice * stock.qty;
        const value = hasClose ? stock.currentPrice * stock.qty : null;

        // Profit/Loss = (Close − BuyPrice) × Quantity
        const pl = hasClose ? (stock.currentPrice - stock.buyPrice) * stock.qty : null;
        const plClass = hasClose ? (pl > 0 ? "pl pos" : pl < 0 ? "pl neg" : "pl") : "pl";

        return (
          <div className="stockCard" key={stock.id}>
            <p><strong>Symbol:</strong> {stock.symbol}</p>
            <p><strong>Quantity:</strong> {num(stock.qty)}</p>
            <p><strong>Purchase Price:</strong> {money(stock.buyPrice)}</p>

            <p><strong>Open Price:</strong> {hasOpen ? money(stock.openPrice) : (isFetching ? "Fetching..." : "—")}</p>
            <p><strong>Close Price:</strong> {hasClose ? money(stock.currentPrice) : (isFetching ? "Fetching..." : "—")}</p>

            <p><strong>Invested:</strong> {money(cost)}</p>
            <p><strong>Current Value:</strong> {hasClose ? money(value) : (isFetching ? "Calculating..." : "—")}</p>

            <p className={plClass}>
              <strong>Profit/Loss:</strong>{" "}
              {hasClose ? `${pl > 0 ? "+" : ""}${money(pl)}` : (isFetching ? "Calculating..." : "—")}
            </p>

            {stock.currentPrice === null && (
              <small style={{ color: "#6b7280" }}>
                Quote unavailable (invalid symbol or temporary limit)
              </small>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default StockList
