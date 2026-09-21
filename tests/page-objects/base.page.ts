import { Page, Locator, test, expect } from "@playwright/test"

export class BasePage {
  constructor(protected readonly page: Page) {}

  menuLink(name: string): Locator {
    return this.page.locator("#sidebar").getByRole("link", { name })
  }

  productCard(name: string): Locator {
    return this.page.getByRole("link", { name })
  }

  headerLink(name: string): Locator {
    return this.page.locator("header nav").getByRole("link", { name, exact: true })
  }

  miniCartLink(name: string): Locator {
    return this.page.locator("#minicart").getByRole("link", { name })
  }

  async expectProductCard(name: string, handle: string) {
    await test.step("The product is visible", async () => {
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

  async expectMenuLink(name: string, href: string) {
    await test.step(`${name} is a visible option in the sidebar`, async () => {
      await expect(this.menuLink(name)).toBeVisible()
    })
    await test.step(`${name} links to ${href}`, async () => {
      await expect(this.menuLink(name)).toHaveAttribute("href", href)
    })
  }

  async expectHeaderLink(name: string, href: string) {
    await test.step(`${name} is a visible option in the sidebar`, async () => {
      await expect(this.headerLink(name)).toBeVisible()
    })
    await test.step(`${name} links to ${href}`, async () => {
      await expect(this.headerLink(name)).toHaveAttribute("href", href)
    })
  }

  async expectMiniCartLink(name: string, href: string) {
    await test.step(`${name} is a visible option in the mini cart`, async () => {
      await expect(this.miniCartLink(name)).toBeVisible()
    })
    await test.step(`${name} links to ${href}`, async () => {
      await expect(this.miniCartLink(name)).toHaveAttribute("href", href)
    })
  }
}
