import { test } from "../fixtures/test"
import { PRODUCTS } from "../data/products"

const priceOf = (product: { price: string }) => Number(product.price.replace("£", ""))

const toPrice = (value: number) => `£${value.toFixed(2)}`

test.describe("Cart Page", () => {
  const simpleProduct = PRODUCTS.find((p) => p.inStock && !p.options)!

  test(`The cart starts empty`, async ({ cartPage }) => {
    await test.step(`Navigate to the cart page`, async () => {
      await cartPage.navigateToCart()
    })
    await test.step(`Validate the cart is empty`, async () => {
      await cartPage.expectCartIsEmpty()
    })
  })

  test(`The cart must increment after clicking add to cart`, async ({ productPage }) => {
    await test.step(`Navigate to product page`, async () => {
      await productPage.navigateToProduct(simpleProduct.handle)
    })
    await test.step(`Click add to cart button`, async () => {
      await productPage.addToCart()
    })
    await test.step(`Validate the cart counter`, async () => {
      await productPage.expectCartCount(1)
    })
  })

  test(`The added product is shown in the cart with its price`, async ({ productPage, cartPage }) => {
    await test.step(`Add ${simpleProduct.name} to the cart`, async () => {
      await productPage.navigateToProduct(simpleProduct.handle)
      await productPage.addToCart()
    })
    await test.step(`Navigate to the cart page`, async () => {
      await cartPage.navigateToCart()
    })
    await test.step(`Validate the product is in the cart`, async () => {
      await cartPage.expectProductInCart(simpleProduct.name, simpleProduct.price)
    })
  })

  test(`The selected variant is the one added to the cart`, async ({ productPage, cartPage }) => {
    await test.step(`Select size L and color Red on the Noir jacket`, async () => {
      await productPage.navigateToProduct("noir-jacket")
      await productPage.selectVariant("Size", "L")
      await productPage.selectVariant("Color", "Red")
    })
    await test.step(`Add it to the cart`, async () => {
      await productPage.addToCart()
    })
    await test.step(`The cart shows the chosen variant`, async () => {
      await cartPage.navigateToCart()
      await cartPage.expectProductInCart("Noir jacket - L / Red", "£60.00")
    })
  })

  test(`Changing the quantity updates the cart total`, async ({ productPage, cartPage }) => {
    await test.step(`Add ${simpleProduct.name} to the cart`, async () => {
      await productPage.navigateToProduct(simpleProduct.handle)
      await productPage.addToCart()
    })
    await test.step(`Set the quantity to 2`, async () => {
      await cartPage.navigateToCart()
      await cartPage.setQuantity(simpleProduct.name, 2)
    })
    await test.step(`The total is twice the product price`, async () => {
      await cartPage.expectCartTotal("£110.00")
      await cartPage.expectCartCount(2)
    })
  })

  test(`Removing the only product empties the cart`, async ({ productPage, cartPage }) => {
    await test.step(`Add ${simpleProduct.name} to the cart`, async () => {
      await productPage.navigateToProduct(simpleProduct.handle)
      await productPage.addToCart()
    })
    await test.step(`Remove it from the cart`, async () => {
      await cartPage.navigateToCart()
      await cartPage.removeProduct(simpleProduct.name)
    })
    await test.step(`The cart is empty again`, async () => {
      await cartPage.expectCartIsEmpty()
    })
  })

  test(`The cart total sums two different products`, async ({ productPage, cartPage }) => {
    const [first, second] = PRODUCTS.filter((p) => p.inStock && !p.options)
    const expectedTotal = toPrice(priceOf(first) + priceOf(second))

    await test.step(`Add ${first.name} and ${second.name} to the cart`, async () => {
      await productPage.navigateToProduct(first.handle)
      await productPage.addToCart()
      await productPage.navigateToProduct(second.handle)
      await productPage.addToCart()
    })
    await test.step(`The cart has both products`, async () => {
      await cartPage.navigateToCart()
      await cartPage.expectProductCountInCart(2)
      await cartPage.expectProductInCart(first.name, first.price)
      await cartPage.expectProductInCart(second.name, second.price)
    })
    await test.step(`The total is ${expectedTotal}`, async () => {
      await cartPage.expectCartTotal(expectedTotal)
    })
  })
})
