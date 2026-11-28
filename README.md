# DealHound — Black Friday 2026 Deal Finder

[![make.fun · black-friday-deal-finder-01](https://make.fun/badge/black-friday-deal-finder-01.svg)](https://make.fun/bounty/black-friday-deal-finder-01?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01)
[![rank](https://make.fun/badge/black-friday-deal-finder-01/fynix39/black-friday-deal-finder/rank.svg)](https://make.fun/bounty/black-friday-deal-finder-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01)
[![reward](https://make.fun/badge/black-friday-deal-finder-01/fynix39/black-friday-deal-finder/reward.svg)](https://make.fun/bounty/black-friday-deal-finder-01?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01)

Entry for the [make.fun Black Friday deal finder bounty](https://make.fun/bounty/black-friday-deal-finder-01):
a static site that helps shoppers find real Black Friday and Cyber Monday 2026 deals.

## What it is

DealHound lists **33 deals checked on Sat 28 Nov 2026**, across
7 categories (Electronics, TVs, Gaming, Home & Kitchen, Beauty, Audio, Smart Home)
and 4 stores (Amazon, Best Buy, Dell, Samsung). Every deal card shows:

- product, store and a link to the product at that store
- sale price, usual price, discount and the saving in dollars
- when the price was checked and which source showed it
- an honest verdict — **NEW LOW**, **STRONG PRICE** or **ROUTINE SALE** — with one
  line of evidence, so a routine discount is labelled as routine instead of
  dressed up as a once-a-year bargain

## How it works

- **Search** the deals by product, store or category name.
- **Filter** by category, store, discount (40%+, 25%+, 10%+) and verdict.
- **Sort** by biggest discount, new lows first, biggest saving, or price.
- Open any deal for a **detail page** (hash routes, e.g. `#/deal/airpods-pro-3`)
  with the full price maths and how the price was checked.
- Works on desktop and on a phone; the whole site is static files with no
  network requests.

## How the deals were checked

Each price was read on 28 Nov 2026 at the store named on the card or in a deals
source that names the store — TechSpot, CNN Underscored, Tom's Guide, Popular
Science, Product Bible, TechRadar, MacRumors, GamesRadar and others. The source
is cited on every card. Nothing was invented: no product, store, price or link
appears here that no store or deals source showed when it was checked. Full
research notes (source per deal, conflicts resolved) are kept outside this repo.

## Run it

```sh
# serve app/ with any static server, e.g.
python3 -m http.server 8080 --directory app
# then open http://localhost:8080
```

## Hand-in

`main.ts` (Node 22, standard library only) copies `app/` and `screenshots/`
into the output directory and writes `dossier.json` with `buildDossier` from
`vendor/makefun-frontend.ts` (copied from the kit, unchanged).

## License

MIT — see [LICENSE](LICENSE).
