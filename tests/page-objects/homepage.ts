import { expect } from "@playwright/test"
import { BasePage } from "./base.page"
export class HomePage extends BasePage {
  async navigateToHomePageUrl() {
    await this.page.goto("/")
  }

  async expectHomePageTitleIsVisible() {
    await expect(this.page).toHaveTitle("Sauce Demo")
  }

  async expectHomePageTaglineIsVisible() {
    await expect(this.page.getByRole("heading", { name: /demo site showing off/i })).toBeVisible()
  }
}
