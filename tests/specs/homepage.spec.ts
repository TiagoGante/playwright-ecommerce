import { test } from "../fixtures/test"

test.describe("Homepage", () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.navigateToHomePageUrl()
  })

  test("The name of the store is visible", async ({ homePage }) => {
    await homePage.homePageTitleIsVisible()
  })

  const products = [
    { name: "Grey jacket", handle: "grey-jacket" },
    { name: "Noir jacket", handle: "noir-jacket" },
    { name: "Striped top", handle: "striped-top" },
  ]

  products.forEach((product) => {
    test(`Product ${product.name} is featured on the homepage.`, async ({ homePage }) => {
      await homePage.expectProductIsFeatured(product.name, product.handle)
    })
  })
})
