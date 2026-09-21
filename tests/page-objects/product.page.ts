import { expect, Locator, test } from "@playwright/test"
import { BasePage } from "./base.page"

export class ProductPage extends BasePage {
  async navigateToProduct(handle: string) {
    await this.page.goto(`/products/${handle}`)
  }

  get productTitle(): Locator {
    return this.page.locator('h1[itemprop="name"]')
  }

  get productPrice(): Locator {
    return this.page.locator(".product-price")
  }
  get addToCartButton(): Locator {
    return this.page.locator("#add")
  }
  variantSelector(option: string): Locator {
    //this selector is for size and color
    return this.page.getByLabel(option)
  }

  async expectProductDetails(name: string, price: string) {
    await test.step("the product has the correct name", async () => {
      await expect(this.productTitle).toHaveText(name)
    })
    await test.step("the product has the correct price", async () => {
      await expect(this.productPrice).toHaveText(price)
    })
  }

  async expectProductInStock() {
    await expect(this.addToCartButton).toBeEnabled()
  }

  async expectProductOutOfStock() {
    await expect(this.addToCartButton).toBeDisabled()
  }

  async expectVariantOptions(option: string, values: string[]) {
    await expect(this.variantSelector(option)).toBeVisible()
    await expect(this.variantSelector(option).locator("option")).toHaveText(values)
  }

  async expectNoVariantOptions() {
    await expect(this.variantSelector("Size")).toHaveCount(0)
    await expect(this.variantSelector("Color")).toHaveCount(0)
  }
}
