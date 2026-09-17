import { test } from "../fixtures/test"
import { PRODUCTS } from "../data/products"

test.describe("Product Page", () => {
  PRODUCTS.filter((p) => p.inStock).forEach((product) => {
    test(`${product.name} is available in stock`, async ({ productPage }) => {
      await test.step(`Navigate to the product page`, async () => {
        await productPage.navigateToProduct(product.handle)
      })
      await test.step(`Validate the product details`, async () => {
        await productPage.expectProductDetails(product.name, product.price)
      })
      await test.step(`Validate if product has stock`, async () => {
        await productPage.expectProductInStock()
      })
    })
  })

  PRODUCTS.filter((p) => !p.inStock).forEach((product) => {
    test(`${product.name} is out of stock`, async ({ productPage }) => {
      await test.step(`Navigate to the product page`, async () => {
        await productPage.navigateToProduct(product.handle)
      })
      await test.step(`Validate the product details`, async () => {
        await productPage.expectProductDetails(product.name, product.price)
      })
      await test.step(`Validate if product doesn't have stock`, async () => {
        await productPage.expectProductOutOfStock()
      })
    })
  })
})
