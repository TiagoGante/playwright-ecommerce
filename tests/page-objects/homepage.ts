import { Locator, test, expect } from "@playwright/test"
import { BasePage } from "./base.page"
export class HomePage extends BasePage {
  async navigateToHomePageUrl() {
    await this.page.goto("/")
  }

  async expectHomePageTitleIsVisible() {
    await expect(this.page).toHaveTitle("Sauce Demo")
  }

  productCard(name: string): Locator {
    return this.page.getByRole("link", { name })
  }

  async expectProductIsFeatured(name: string, handle: string) {
    await test.step("The product is visible in the homepage", async () => {
      await expect(this.productCard(name)).toBeVisible()
    })
    await test.step("The product has a link to be redirected", async () => {
      await expect(this.productCard(name)).toHaveAttribute("href", new RegExp(`/products/${handle}$`))
    })
    await test.step("The product price is visible", async () => {
      await expect(this.productCard(name).locator("h4")).toBeVisible()
    })
    await test.step("The product image is visible", async () => {
      await expect(this.productCard(name).locator("img")).toBeVisible()
    })
  }

  async expectHomePageTaglineIsVisible() {
    await expect(this.page.getByRole("heading", { name: /demo site showing off/i })).toBeVisible()
  }
}
