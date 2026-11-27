// Rendering: deal cards, the stats strip and the deal detail page.
// Views build HTML strings; main.js wires them into the page and the events.

import { CHECKED_LABEL, DEALS } from "./data.js";
import { discountPct, money, saving } from "./filters.js";

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function verdictClass(v) {
  if (v === "NEW LOW") return "v-newlow";
  if (v === "STRONG PRICE") return "v-strong";
  return "v-routine";
}

export function dealCard(d) {
  const pct = discountPct(d);
  return (
    '<article class="card" data-id="' + d.id + '">' +
    '<div class="card-top"><span class="store">' + esc(d.store) + '</span>' +
    '<span class="cat">' + esc(d.category) + '</span></div>' +
    '<h3 class="card-name"><a href="#/deal/' + d.id + '">' + esc(d.name) + '</a></h3>' +
    '<div class="prices"><span class="sale">' + money(d.sale) + '</span>' +
    '<span class="usual">was ' + money(d.usual) + '</span>' +
    '<span class="pct">-' + pct + '%</span></div>' +
    '<p class="save-line">You save ' + money(saving(d)) + '</p>' +
    '<p class="verdict ' + verdictClass(d.verdict) + '">' + d.verdict + '</p>' +
    '<p class="evidence">' + esc(d.evidence) + '</p>' +
    '<p class="meta">' + CHECKED_LABEL + ' · Source: ' + esc(d.source) + '</p>' +
    '<a class="store-link" href="' + esc(d.url) + '" target="_blank" rel="noopener">View at ' + esc(d.store) + ' &rarr;</a>' +
    '</article>'
  );
}

export function dealListHtml(list) {
  if (list.length === 0) {
    return '<p class="empty">No deals match those filters. Try clearing the search or widening a filter.</p>';
  }
  return '<div class="grid">' + list.map(dealCard).join("") + "</div>";
}

export function statsHtml(totalDeals, totalSavingAmount, storeCount, newLowCount) {
  return (
    '<section class="stats" aria-label="Sale summary">' +
    '<div><strong>' + totalDeals + '</strong><span>verified deals</span></div>' +
    '<div><strong>' + money(totalSavingAmount) + '</strong><span>total savings</span></div>' +
    '<div><strong>' + storeCount + '</strong><span>stores</span></div>' +
    '<div><strong>' + newLowCount + '</strong><span>new all-time lows</span></div>' +
    '</section>'
  );
}

export function detailHtml(d) {
  const pct = discountPct(d);
  const same = DEALS.filter((x) => x.category === d.category && x.id !== d.id).slice(0, 4);
  return (
    '<article class="detail">' +
    '<p class="crumbs"><a href="#/">&larr; All deals</a> · ' + esc(d.category) + ' · ' + esc(d.store) + '</p>' +
    '<h2>' + esc(d.name) + '</h2>' +
    '<div class="detail-prices"><span class="sale big">' + money(d.sale) + '</span>' +
    '<span class="usual big">usual price ' + money(d.usual) + '</span>' +
    '<span class="pct big">-' + pct + '%</span></div>' +
    '<p class="save-line big">You save ' + money(saving(d)) + ' (' + pct + '% off the usual price).</p>' +
    '<p class="verdict ' + verdictClass(d.verdict) + ' big">' + d.verdict + '</p>' +
    '<p class="evidence big">' + esc(d.evidence) + '</p>' +
    '<dl class="facts">' +
    '<dt>Store</dt><dd>' + esc(d.store) + '</dd>' +
    '<dt>Sale price</dt><dd>' + money(d.sale) + '</dd>' +
    '<dt>Usual price</dt><dd>' + money(d.usual) + '</dd>' +
    '<dt>Discount</dt><dd>' + pct + '% (' + money(saving(d)) + ' off)</dd>' +
    '<dt>Price checked</dt><dd>' + CHECKED_LABEL + '</dd>' +
    '<dt>Verified by</dt><dd>' + esc(d.source) + '</dd>' +
    '</dl>' +
    '<p class="how">How we checked: the price above is the price the cited source showed at ' +
    esc(d.store) + ' on Black Friday, 27 Nov 2026. Prices can change or sell out — ' +
    'the store page is the final word at checkout.</p>' +
    '<a class="store-link big" href="' + esc(d.url) + '" target="_blank" rel="noopener">View at ' + esc(d.store) + ' &rarr;</a>' +
    (same.length
      ? '<h3>More ' + esc(d.category) + ' deals</h3><div class="grid">' + same.map(dealCard).join("") + "</div>"
      : "") +
    "</article>"
  );
}

export function notFoundHtml() {
  return '<p class="empty">That deal is not in this list. <a href="#/">Back to all deals</a>.</p>';
}
