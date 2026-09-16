import { Page, Locator, test, expect } from "@playwright/test"

export class HomePage {
  constructor(private readonly page: Page) {}

  async navigateToHomePageUrl() {
    await this.page.goto("/")
  }

  async homePageTitleIsVisible() {
    await expect(this.page).toHaveTitle("Sauce Demo")
  }

  productCard(name: string): Locator {
    return this.page.getByRole("link", { name })
  }

  async expectProductIsFeatured(name: string, handle: string) {
    await test.step("the product is visible in the homepage", async () => {
      await expect(this.productCard(name)).toBeVisible()
    })
    await test.step("The card has a link to be redirected", async () => {
      await expect(this.productCard(name)).toHaveAttribute("href", new RegExp(`/products/${handle}$`))
    })
  }
}
