import { test } from "@playwright/test"
import { HomePage } from "../page-objects/homepage"

test.describe("Homepage", () => {
  let homePage: HomePage

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    await homePage.navigateToHomePageUrl()
  })

  test("The name of the store is visible", async ({}) => {
    await homePage.homePageTitleIsVisible()
  })

  const products = [
    { name: "Grey jacket", handle: "grey-jacket" },
    { name: "Noir jacket", handle: "noir-jacket" },
    { name: "Striped top", handle: "striped-top" },
  ]

  products.forEach((product) => {
    test(`Product ${product.name} is featured on the homepage.`, async ({}) => {
      await homePage.expectProductIsFeatured(product.name, product.handle)
    })
  })
})
