import { test as base } from "@playwright/test"
import { HomePage } from "../page-objects/home.page"
import { CatalogPage } from "../page-objects/catalog.page"
import { ProductPage } from "../page-objects/product.page"
import { CartPage } from "../page-objects/cart.page"
import { SearchPage } from "../page-objects/search.page"
import { CheckoutPage } from "../page-objects/checkout.page"

type Fixtures = {
  homePage: HomePage
  catalogPage: CatalogPage
  productPage: ProductPage
  cartPage: CartPage
  searchPage: SearchPage
  checkoutPage: CheckoutPage
}

export const test = base.extend<Fixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page))
  },
  catalogPage: async ({ page }, use) => {
    await use(new CatalogPage(page))
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page))
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page))
  },
  searchPage: async ({ page }, use) => {
    await use(new SearchPage(page))
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page))
  },
})

export { expect } from "@playwright/test"
