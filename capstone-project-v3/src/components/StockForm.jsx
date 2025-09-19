function StockForm({ onAdd }) {
  // Sketch only: no state, no submit yet

  return (
<form>
  <div>
    <label> Symbol </label>
    <input id="symbol" placeholder="e.g. AAPL" />
  </div>

  <div>
    <label> Quantity </label>
    <input id="qty" placeholder="e.g. 10" />
  </div>

  <div>
    <label> Purchase Price </label>
    <input id="buyPrice" placeholder="e.g. 150.00" />
  </div>

  <button type="button" disabled>
    Add Stock
  </button>
</form>
  );
}

export default StockForm
