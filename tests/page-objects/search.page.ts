import { expect, Locator, test } from "@playwright/test"
import { BasePage } from "./base.page"

export class SearchPage extends BasePage {
  async navigateToSearch(term: string) {
    await this.page.goto(`/search?q=${term}`)
  }

  get resultsSection(): Locator {
    return this.page.locator("#page-content")
  }

  searchResult(name: string): Locator {
    return this.resultsSection.getByRole("link", { name })
  }

  async expectResultsFor(term: string) {
    await test.step(`The page shows results for "${term}"`, async () => {
      await expect(this.resultsSection).toContainText(`Showing results for ${term}`)
    })
  }

  async expectProductInResults(name: string) {
    await test.step(`${name} is among the results`, async () => {
      await expect(this.searchResult(name)).toBeVisible()
    })
  }

  async expectNoResults(term: string) {
    await test.step(`The page says there are no results for "${term}"`, async () => {
      await expect(this.resultsSection).toContainText(`No results found for ${term}`)
    })
  }
}
