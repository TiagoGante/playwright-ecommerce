import { expect } from "@playwright/test"
import { BasePage } from "./base.page"
export class HomePage extends BasePage {
  async navigateToHomePageUrl() {
    await this.page.goto("/")
  }

  async expectHomePageTitleIsVisible(title: string) {
    await expect(this.page).toHaveTitle(title)
  }

  async expectHomePageTaglineIsVisible() {
    await expect(this.page.getByRole("heading", { name: /demo site showing off/i })).toBeVisible()
  }
}
