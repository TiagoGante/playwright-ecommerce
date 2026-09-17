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
})
