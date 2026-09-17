import { Page, Locator, test, expect } from "@playwright/test"

export class BasePage {
  constructor(protected readonly page: Page) {}

  menuLink(name: string): Locator {
    return this.page.locator("#sidebar").getByRole("link", { name })
  }

  async expectMenuLink(name: string, href: string) {
    await test.step(`${name} is a visible option in the sidebar`, async () => {
      await expect(this.menuLink(name)).toBeVisible()
    })
    await test.step(`${name} links to ${href}`, async () => {
      await expect(this.menuLink(name)).toHaveAttribute("href", href)
    })
  }
}
