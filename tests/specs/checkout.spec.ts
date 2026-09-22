import { test } from "../fixtures/test"
import { PRODUCTS } from "../data/products"
import { BOGUS_CARDS } from "../data/customer"

const PRODUCT = PRODUCTS.find((p) => p.inStock && !p.options)!
const SHIPPING = 10
const TOTAL = `£${(Number(PRODUCT.price.replace("£", "")) + SHIPPING).toFixed(2)}`

test.describe("Checkout", () => {
  test.slow()

  test.beforeEach(async ({ productPage, cartPage, checkoutPage }) => {
    await test.step(`Add ${PRODUCT.name} and go to the checkout`, async () => {
      await productPage.navigateToProduct(PRODUCT.handle)
      await productPage.addToCart()
      await cartPage.navigateToCart()
      await cartPage.goToCheckout()
    })
    await test.step(`Fill in the delivery details`, async () => {
      await checkoutPage.fillDeliveryDetails()
    })
  })

  test(`A payment with an approved card confirms the order`, async ({ checkoutPage }) => {
    await test.step(`The amount to pay includes shipping`, async () => {
      await checkoutPage.expectTotal(TOTAL)
    })
    await test.step(`Pay with the approved card`, async () => {
      await checkoutPage.fillCard(BOGUS_CARDS.approved)
      await checkoutPage.payNow()
    })
    await test.step(`The order is confirmed`, async () => {
      await checkoutPage.expectOrderConfirmed()
    })
  })

  test(`A declined card does not place the order`, async ({ checkoutPage }) => {
    await test.step(`Pay with the declined card`, async () => {
      await checkoutPage.fillCard(BOGUS_CARDS.declined)
      await checkoutPage.payNow()
    })
    await test.step(`The payment is rejected`, async () => {
      await checkoutPage.expectPaymentRejected()
    })
  })

  test(`A gateway failure does not place the order`, async ({ checkoutPage }) => {
    await test.step(`Pay with the card that simulates a gateway failure`, async () => {
      await checkoutPage.fillCard(BOGUS_CARDS.gatewayFailure)
      await checkoutPage.payNow()
    })
    await test.step(`The payment is rejected`, async () => {
      await checkoutPage.expectPaymentRejected()
    })
  })
})
