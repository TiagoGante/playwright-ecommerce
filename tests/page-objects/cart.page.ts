import { expect, Locator, test } from "@playwright/test"
import { BasePage } from "./base.page"

export class CartPage extends BasePage {
  async navigateToCart() {
    await this.page.goto("/cart")
  }

  get checkoutButton(): Locator {
    return this.page.locator("#checkout")
  }

  async goToCheckout() {
    await this.checkoutButton.click()
  }

  cartSection(): Locator {
    return this.page.locator("section#cart")
  }

  get emptyMessage(): Locator {
    return this.cartSection().getByText(/currently empty/i)
  }

  async expectCartIsEmpty() {
    await test.step("The empty cart message is visible", async () => {
      await expect(this.emptyMessage).toBeVisible()
    })
    await this.expectCartCount(0)
  }

  cartRows(): Locator {
    return this.cartSection().locator(".row")
  }

  cartRow(name: string): Locator {
    return this.cartRows().filter({ hasText: name })
  }

  async expectProductInCart(name: string, price: string) {
    await test.step(`The cart has a row for ${name}`, async () => {
      await expect(this.cartRow(name)).toBeVisible()
    })
    await test.step(`The row for ${name} shows the price ${price}`, async () => {
      await expect(this.cartRow(name).locator(".price")).toContainText(price)
    })
  }

  get cartTotal(): Locator {
    return this.cartSection().locator(".cart.total")
  }

  get updateButton(): Locator {
    return this.cartSection().locator('input[value="Update"]')
  }

  quantityInput(name: string): Locator {
    return this.cartRow(name).locator('input[name="updates[]"]')
  }

  async setQuantity(name: string, quantity: number) {
    await this.quantityInput(name).fill(String(quantity))
    await this.updateButton.click()
  }

  async expectCartTotal(total: string) {
    await test.step(`The cart total is ${total}`, async () => {
      await expect(this.cartTotal).toContainText(total)
    })
  }

  removeLink(name: string): Locator {
    return this.cartRow(name).locator(".remove a")
  }

  async removeProduct(name: string) {
    await this.removeLink(name).click()
  }

  productRows(): Locator {
    return this.cartRows().filter({ has: this.page.locator('input[name="updates[]"]') })
  }

  async expectProductCountInCart(count: number) {
    await test.step(`The cart has ${count} product rows`, async () => {
      await expect(this.productRows()).toHaveCount(count)
    })
  }
}
