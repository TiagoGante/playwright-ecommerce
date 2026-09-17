import { test } from "../fixtures/test"
import { PRODUCTS } from "../data/products"

test.describe("Catalog Page", () => {
  test.beforeEach(async ({ catalogPage }) => {
    await catalogPage.navigateToCatalog()
  })

  PRODUCTS.forEach((product) => {
    test(`The product ${product.name} is visible with all information`, async ({ catalogPage }) => {
      await catalogPage.expectProductCard(product.name, product.handle)
    })
  })

  PRODUCTS.filter((p) => !p.inStock).forEach((product) => {
    test(`The product ${product.name} has badge sold out`, async ({ catalogPage }) => {
      await catalogPage.expectProductIsSoldOut(product.name)
    })
  })

  PRODUCTS.filter((p) => p.inStock).forEach((product) => {
    test(`The product ${product.name} is available`, async ({ catalogPage }) => {
      await catalogPage.expectProductIsAvailable(product.name)
    })
  })
})
