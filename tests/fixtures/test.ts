import { test as base } from "@playwright/test"
import { HomePage } from "../page-objects/homepage"
import { CatalogPage } from "../page-objects/catalog.page"

type Fixtures = {
  homePage: HomePage
  catalogPage: CatalogPage
}

export const test = base.extend<Fixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page))
  },
  catalogPage: async ({ page }, use) => {
    await use(new CatalogPage(page))
  },
})

export { expect } from "@playwright/test"
