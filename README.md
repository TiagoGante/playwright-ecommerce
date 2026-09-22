# playwright-ecommerce

End-to-end tests for [Sauce Demo](https://sauce-demo.myshopify.com/), a Shopify
storefront, built with Playwright and TypeScript.

**57 tests** across 7 specs — from the homepage to a completed payment, including
the payments that are _supposed_ to fail.

> Built with [Claude Code](https://claude.com/claude-code) as a pair: used to
> probe the store's DOM, surface edge cases worth covering and speed up writing
> the test cases themselves. Every decision below was made and reviewed by me
> which is why they're all explained rather than just listed.

## Quick start

```bash
npm ci
npx playwright install

npm run test:chromium   # fast loop (≈25s)
npm test                # all three browsers
npm run test:ui         # interactive — start here
```

Point it at another store without touching the code:

```bash
BASE_URL=https://your-store.myshopify.com npm test
```

## Structure

```
tests/
├── specs/         what we guarantee
├── page-objects/  how we talk to the page
├── fixtures/      what each test receives
├── data/          what we test with
└── utils/         small helpers
```

The theme has no `data-testid` and we don't own the site, so selectors are
fragile by nature. When the theme changes, **only `page-objects/` is touched —
not a single spec.**

Page objects extend a `BasePage` with the shared header, menu and cart counter,
and arrive in tests as fixtures:

```ts
test("...", async ({ productPage, cartPage }) => { ... })
```

## The main decisions

**Locate by what's stable, assert on what changes.** The add-to-cart button says
`Add to Cart` when available and `Sold Out` when not. So the locator is `#add`
(same in both states) and the label is an assertion — otherwise the sold-out test
fails with _"couldn't find the button"_ instead of telling you what's wrong.

**Semantic locators beat CSS here.** `getByRole` only sees the accessibility tree,
which quietly solved three problems: the theme renders a duplicate
`id="customer_login_link"`, the checkout duplicates every field as a hidden
`autofill_*` twin, and each card iframe hides **7 anti-bot honeypots** next to the
real input. CSS would have matched all of them.

**Scope before you assert.** `About Us` appears 4 times per page. Locators are
scoped to their block (`#sidebar`, `header nav`, `#minicart`). When a locator
returns more than you expected, there's a mobile or drawer copy somewhere.

**Navigate with `goto`, not by clicking.** A broken menu link should fail one
test, not twenty across four areas. Clicking the menu is covered once, in
`navigation.spec.ts`.

**Every "is present" test needs its "is absent" twin.** Sold-out products show a
badge — and available ones don't. Without the second half, a bug showing the badge
everywhere sails through a green suite.

**Data is derived, not repeated.** Specs filter `data/products.ts`
(`p.featured`, `!p.inStock`, `p.options`). The card expiry is computed 5 years
ahead, never hardcoded — a fixed `12/30` works fine right up until 2030.

## Traps this store set for us

**The handle has nothing to do with the name.**
`/products/flower-print-jeans` is called _"Black heels"_. Hence `name` and
`handle` as separate fields instead of deriving one from the other.

**The screen lies about the text.** The badge reads `SOLD OUT`, the HTML says
`Sold Out` — the capitals come from CSS. `toHaveText` compares against
`textContent`, so copy what the DOM says, not what you see.

**The checkout changes shape depending on where you are.** Shopify adapts the
form to the country it detects from your IP: in the UK the address is a combobox
and the field is `Postcode`; in Portugal it's a textbox, `Postal code`, plus an
extra `Region`. Same code, passing locally and failing in CI. Fixed by selecting
the country explicitly instead of inheriting it.

**A green test can be testing the wrong thing.** _"Header About Us points to
/pages/about-us"_ passed for a while — while reading the **sidebar's** link, which
has the same href. Every assertion here gets broken on purpose once, to confirm it
goes red.

**A green suite can be testing nothing.** An `expect` without `await` inside a
non-async `test.step` resolves after the test has finished. Playwright transpiles
TypeScript but doesn't typecheck it, so the repo runs ESLint with
`no-floating-promises` plus `tsc --noEmit`.

**The store fights back.** Too many runs and Shopify answers `/cart/add` with
**429**. Nine tests went red at once with _"the cart counter doesn't increment"_ —
nothing to do with the code. Mitigated with fewer workers, retries in CI only, and
`cancel-in-progress`. The real lesson: you can't build a CI on a site you don't
control.

## Not tested, on purpose

|                           | Why                                        |
| ------------------------- | ------------------------------------------ |
| Wish list, Refer a friend | `href="#"` — they do nothing               |
| Social links              | external, no business value                |
| Exact search counts       | Shopify pads results with fuzzy matches    |
| Visual regression         | the store can change theme without warning |

Searching `jacket` also returns Black heels. On our own store that's a relevance
bug worth reporting, not a test to write — so assertions say "this product is
among the results", never "these are the only results".

## Payments

The store runs Shopify's **Bogus Gateway** — the card number decides the answer
and nothing is ever charged: `1` approved, `2` declined, `3` gateway failure.

The two negative cases are the valuable ones. Both assert the error is visible
**and** that the URL never reaches `thank-you` — "showed an error" and "didn't
create an order" are different guarantees.

## CI

[`.github/workflows/e2e.yml`](.github/workflows/e2e.yml) runs on PRs and pushes to
`main`: lint → typecheck → browsers → tests → report.

- **`cancel-in-progress`** stops three pushes becoming three suites against the
  same store
- **Lint and typecheck before browsers** — a missing `await` fails in seconds
- **`if: always()` on the upload** — the report is most needed when tests fail

Checkout tests are tagged `@checkout` and can be filtered out with
`--grep-invert @checkout` if PR feedback time starts to hurt.

## Stack

`@playwright/test` · TypeScript 5.9 · ESLint · faker 8

Two versions are pinned below the latest on purpose: **TypeScript 5** because
`typescript-eslint@8` requires `<6.1.0`, and **faker 8** because v9 is ESM-only
while Playwright transpiles to CommonJS. Newest isn't the same as supported.
