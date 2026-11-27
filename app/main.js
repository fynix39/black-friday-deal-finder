// DealHound — Black Friday 2026 deal finder.
// Wires the search box, filters and sort controls to the deal list and renders
// the list and deal detail pages on hash routes (#/ and #/deal/<id>).

import { CATEGORIES, DEALS, STORES } from "./data.js";
import { DISCOUNT_OPTIONS, applyFilters, sortDeals, totalSaving } from "./filters.js";
import { dealListHtml, detailHtml, notFoundHtml, statsHtml } from "./views.js";

const state = {
  query: "",
  category: "All categories",
  store: "All stores",
  discount: "all",
  verdict: "all",
  sort: "discount",
};

const $ = (id) => document.getElementById(id);

function fillSelect(el, options, current) {
  el.innerHTML = options
    .map((o) => {
      const value = typeof o === "string" ? o : o.value;
      const label = typeof o === "string" ? o : o.label;
      return '<option value="' + value + '"' + (value === current ? " selected" : "") + ">" + label + "</option>";
    })
    .join("");
}

function visibleDeals() {
  return sortDeals(applyFilters(DEALS, state), state.sort);
}

function renderList() {
  const list = visibleDeals();
  $("count").textContent =
    list.length + " of " + DEALS.length + " deals";
  $("results").innerHTML = dealListHtml(list);
  $("results").hidden = false;
  const detail = $("detail");
  detail.innerHTML = "";
  detail.hidden = true;
}

function renderDetail(id) {
  const deal = DEALS.find((d) => d.id === id);
  const detail = $("detail");
  const results = $("results");
  results.innerHTML = "";
  results.hidden = true;
  detail.innerHTML = deal ? detailHtml(deal) : notFoundHtml();
  detail.hidden = false;
  window.scrollTo(0, 0);
}

function route() {
  const hash = location.hash || "#/";
  const m = hash.match(/^#\/deal\/([\w-]+)$/);
  if (m) renderDetail(m[1]);
  else renderList();
}

function init() {
  fillSelect($("category"), CATEGORIES, state.category);
  fillSelect($("store"), STORES, state.store);
  fillSelect($("discount"), DISCOUNT_OPTIONS, state.discount);
  $("total-deals").textContent = String(DEALS.length);
  $("stats").innerHTML = statsHtml(
    DEALS.length,
    totalSaving(DEALS),
    new Set(DEALS.map((d) => d.store)).size,
    DEALS.filter((d) => d.verdict === "NEW LOW").length,
  );

  $("search").addEventListener("input", (e) => {
    state.query = e.target.value;
    if (location.hash && location.hash !== "#/") location.hash = "#/";
    renderList();
  });
  $("category").addEventListener("change", (e) => {
    state.category = e.target.value;
    renderList();
  });
  $("store").addEventListener("change", (e) => {
    state.store = e.target.value;
    renderList();
  });
  $("discount").addEventListener("change", (e) => {
    state.discount = e.target.value;
    renderList();
  });
  $("sort").addEventListener("change", (e) => {
    state.sort = e.target.value;
    renderList();
  });
  document.querySelectorAll('input[name="verdict"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      state.verdict = radio.value;
      renderList();
    });
  });
  $("clear").addEventListener("click", () => {
    state.query = "";
    state.category = "All categories";
    state.store = "All stores";
    state.discount = "all";
    state.verdict = "all";
    state.sort = "discount";
    $("search").value = "";
    $("category").value = state.category;
    $("store").value = state.store;
    $("discount").value = state.discount;
    $("sort").value = state.sort;
    document.querySelector('input[name="verdict"][value="all"]').checked = true;
    renderList();
  });

  window.addEventListener("hashchange", route);
  route();
}

init();
