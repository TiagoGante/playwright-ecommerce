import { test } from "../fixtures/test"
import { PRODUCTS } from "../data/products"

test.describe("Homepage", () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.navigateToHomePageUrl()
  })

  test("The name of the store is visible", async ({ homePage }) => {
    await homePage.expectHomePageTitleIsVisible("Sauce Demo")
  })

  PRODUCTS.filter((p) => p.featured).forEach((product) => {
    test(`Product ${product.name} is featured on the homepage.`, async ({ homePage }) => {
      await homePage.expectProductCard(product.name, product.handle)
    })
  })

  test("The tagline is visible on the homepage", async ({ homePage }) => {
    await homePage.expectHomePageTaglineIsVisible()
  })
})
