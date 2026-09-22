import { expect, FrameLocator, Locator, test } from "@playwright/test"
import { BasePage } from "./base.page"
import { CARD_DETAILS, CUSTOMER } from "../data/customer"

export class CheckoutPage extends BasePage {
  get countrySelect(): Locator {
    return this.page.getByRole("combobox", { name: "Country/Region" })
  }

  get emailField(): Locator {
    return this.page.getByRole("textbox", { name: "Email" })
  }

  get firstNameField(): Locator {
    return this.page.getByRole("textbox", { name: "First name (optional)" })
  }

  get lastNameField(): Locator {
    return this.page.getByRole("textbox", { name: "Last name" })
  }

  get addressField(): Locator {
    return this.page.getByRole("combobox", { name: /Address/i })
  }

  get cityField(): Locator {
    return this.page.getByRole("textbox", { name: "City" })
  }

  get postcodeField(): Locator {
    return this.page.getByRole("textbox", { name: "Postcode" })
  }

  private cardFrame(title: string): FrameLocator {
    return this.page.frameLocator(`iframe[title="${title}"]`)
  }

  get cardNumberField(): Locator {
    return this.cardFrame("Card number").getByRole("textbox")
  }

  get cardNameField(): Locator {
    return this.cardFrame("Name on card").getByRole("textbox")
  }

  get cardExpiryField(): Locator {
    return this.cardFrame("Expiration date (MM / YY)").getByRole("textbox")
  }

  get cardCvvField(): Locator {
    return this.cardFrame("Security code").getByRole("textbox")
  }

  get payNowButton(): Locator {
    return this.page.getByRole("button", { name: /Pay now/ })
  }

  async fillDeliveryDetails() {
    await this.emailField.fill(CUSTOMER.email)
    await this.countrySelect.selectOption({ label: CUSTOMER.country })
    await this.firstNameField.fill(CUSTOMER.firstName)
    await this.lastNameField.fill(CUSTOMER.lastName)
    await this.addressField.fill(CUSTOMER.address)
    await this.cityField.fill(CUSTOMER.city)
    await this.postcodeField.fill(CUSTOMER.postcode)
  }

  async fillCard(cardNumber: string) {
    await this.cardNumberField.fill(cardNumber)
    await this.cardNameField.fill(CARD_DETAILS.name)
    await this.cardExpiryField.fill(CARD_DETAILS.expiry)
    await this.cardCvvField.fill(CARD_DETAILS.cvv)
  }

  async payNow() {
    await this.payNowButton.click()
  }

  private static readonly PAYMENT_TIMEOUT = 40000

  async expectOrderConfirmed() {
    await test.step("The order confirmation page is shown", async () => {
      await expect(this.page).toHaveURL(/thank-you/, { timeout: CheckoutPage.PAYMENT_TIMEOUT })
      await expect(this.page.getByRole("heading", { name: /Your order is confirmed/i })).toBeVisible()
    })
  }

  async expectPaymentRejected() {
    await test.step("The payment error is shown and the order is not placed", async () => {
      await expect(this.page.getByText(/There was an issue processing your payment/i)).toBeVisible({
        timeout: CheckoutPage.PAYMENT_TIMEOUT,
      })
      await expect(this.page).not.toHaveURL(/thank-you/)
    })
  }

  async expectTotal(total: string) {
    await test.step(`The amount to pay is ${total}`, async () => {
      await expect(this.payNowButton).toContainText(total)
    })
  }
}
