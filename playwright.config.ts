import { defineConfig, devices } from "@playwright/test"

const BASE_URL = process.env.BASE_URL ?? "https://sauce-demo.myshopify.com"
const isCI = !!process.env.CI

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,

  workers: isCI ? 2 : 3,
  retries: isCI ? 2 : 0,

  forbidOnly: isCI,

  reporter: [["list"], ["html", { open: "never" }]],

  use: {
    baseURL: BASE_URL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
})
