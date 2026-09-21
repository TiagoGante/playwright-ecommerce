import { test } from "../fixtures/test"

test.describe("Navigation", () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.navigateToHomePageUrl()
  })

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Catalog", href: "/collections/all" },
    { name: "Blog", href: "/blogs/news" },
    { name: "About Us", href: "/pages/about-us" },
  ]

  menuItems.forEach((item) => {
    test(`Menu ${item.name} points to ${item.href}`, async ({ homePage }) => {
      await homePage.expectMenuLink(item.name, item.href)
    })
  })

  const headerItems = [
    { name: "Search", href: "/search" },
    { name: "Log In", href: "/account/login" },
    { name: "Sign up", href: "/account/register" },
    { name: "About Us", href: "/pages/about-us" },
  ]

  headerItems.forEach((item) => {
    test(`Header ${item.name} points to ${item.href}`, async ({ homePage }) => {
      await homePage.expectHeaderLink(item.name, item.href)
    })
  })

  test(`Check Out in the mini cart points to /cart`, async ({ homePage }) => {
    await homePage.expectMiniCartLink("Check Out", "/cart")
  })
})
