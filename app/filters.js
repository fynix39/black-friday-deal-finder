// Filtering, sorting and price maths for the deal list.
// Pure functions: given the deals and a filter state, return the visible list.

export function discountPct(deal) {
  return Math.round((1 - deal.sale / deal.usual) * 100);
}

export function saving(deal) {
  return deal.usual - deal.sale;
}

export function money(n) {
  const s = n.toFixed(2).replace(/\.00$/, "");
  return "$" + s.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function discountBucket(pct) {
  if (pct >= 40) return "40";
  if (pct >= 25) return "25";
  return "0";
}

export const DISCOUNT_OPTIONS = [
  { value: "all", label: "Any discount" },
  { value: "40", label: "40% off or more" },
  { value: "25", label: "25% off or more" },
  { value: "10", label: "10% off or more" },
];

export function applyFilters(deals, state) {
  const q = state.query.trim().toLowerCase();
  return deals.filter((d) => {
    if (state.category !== "All categories" && d.category !== state.category) return false;
    if (state.store !== "All stores" && d.store !== state.store) return false;
    if (state.discount !== "all") {
      const pct = discountPct(d);
      if (state.discount === "40" && pct < 40) return false;
      if (state.discount === "25" && pct < 25) return false;
      if (state.discount === "10" && pct < 10) return false;
    }
    if (state.verdict !== "all" && d.verdict !== state.verdict) return false;
    if (q) {
      const hay = (d.name + " " + d.store + " " + d.category + " " + d.verdict).toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

export function sortDeals(deals, sortKey) {
  const list = deals.slice();
  if (sortKey === "discount") list.sort((a, b) => discountPct(b) - discountPct(a));
  else if (sortKey === "saving") list.sort((a, b) => saving(b) - saving(a));
  else if (sortKey === "price-asc") list.sort((a, b) => a.sale - b.sale);
  else if (sortKey === "price-desc") list.sort((a, b) => b.sale - a.sale);
  else if (sortKey === "newlow") {
    const rank = { "NEW LOW": 0, "STRONG PRICE": 1, "ROUTINE SALE": 2 };
    list.sort((a, b) => rank[a.verdict] - rank[b.verdict] || discountPct(b) - discountPct(a));
  }
  return list;
}

export function totalSaving(deals) {
  return deals.reduce((sum, d) => sum + saving(d), 0);
}

export function countBy(deals, key) {
  const out = {};
  for (const d of deals) out[d[key]] = (out[d[key]] || 0) + 1;
  return out;
}
