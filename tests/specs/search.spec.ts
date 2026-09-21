import { expect, test } from "../fixtures/test"
import { PRODUCTS } from "../data/products"

const SEARCH_TERM = "jacket"
const MATCHING_PRODUCTS = PRODUCTS.filter((p) => p.name.toLowerCase().includes(SEARCH_TERM))

const UNIQUE_TERM = "shades"
const UNIQUE_PRODUCT = PRODUCTS.find((p) => p.name.toLowerCase().includes(UNIQUE_TERM))!

const MISSING_TERM = "zzzznada"

test.describe("Search", () => {
  test(`Searching from the header shows the results page`, async ({ homePage, searchPage, page }) => {
    await test.step(`Search for "${SEARCH_TERM}" using the header field`, async () => {
      await homePage.navigateToHomePageUrl()
      await homePage.searchFor(SEARCH_TERM)
    })
    await test.step(`The URL and the page show the search term`, async () => {
      await expect(page).toHaveURL(new RegExp(`/search\\?.*q=${SEARCH_TERM}`))
      await searchPage.expectResultsFor(SEARCH_TERM)
    })
  })

  MATCHING_PRODUCTS.forEach((product) => {
    test(`Searching for "${SEARCH_TERM}" returns ${product.name}`, async ({ searchPage }) => {
      await test.step(`Open the results for "${SEARCH_TERM}"`, async () => {
        await searchPage.navigateToSearch(SEARCH_TERM)
      })
      await test.step(`${product.name} is among the results`, async () => {
        await searchPage.expectProductInResults(product.name)
      })
    })
  })

  test(`Searching for "${UNIQUE_TERM}" returns ${UNIQUE_PRODUCT.name}`, async ({ searchPage }) => {
    await test.step(`Open the results for "${UNIQUE_TERM}"`, async () => {
      await searchPage.navigateToSearch(UNIQUE_TERM)
    })
    await test.step(`${UNIQUE_PRODUCT.name} is among the results`, async () => {
      await searchPage.expectProductInResults(UNIQUE_PRODUCT.name)
    })
  })

  test(`Searching for something that does not exist shows no results`, async ({ searchPage }) => {
    await test.step(`Open the results for a term with no matches`, async () => {
      await searchPage.navigateToSearch(MISSING_TERM)
    })
    await test.step(`The page says there are no results`, async () => {
      await searchPage.expectNoResults(MISSING_TERM)
    })
  })
})
