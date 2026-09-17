import { expect, Locator } from "@playwright/test"
import { BasePage } from "./base.page"

export class CatalogPage extends BasePage {
  async navigateToCatalog() {
    await this.page.goto("/collections/all")
  }
  soldOutBadge(name: string): Locator {
    return this.productCard(name).locator(".sold-out")
  }

  async expectProductIsSoldOut(name: string) {
    await expect(this.soldOutBadge(name)).toBeVisible()
  }

  async expectProductIsAvailable(name: string) {
    await expect(this.soldOutBadge(name)).toHaveCount(0)
  }
}
