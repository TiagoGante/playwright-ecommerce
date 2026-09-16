import { test as base } from "@playwright/test"
import { HomePage } from "../page-objects/homepage"

type Fixtures = {
  homePage: HomePage
}

export const test = base.extend<Fixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page))
  },
})

export { expect } from "@playwright/test"
