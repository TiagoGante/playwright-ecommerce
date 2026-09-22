import { faker } from "@faker-js/faker"
import { creditCardExpiry } from "../utils/dates"

export const CUSTOMER = {
  country: "United Kingdom",
  postcode: "SW1A 2AA",
  email: faker.internet.email(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  address: faker.location.streetAddress(),
  city: faker.location.city(),
}

export const BOGUS_CARDS = {
  approved: "1",
  declined: "2",
  gatewayFailure: "3",
}

export const CARD_DETAILS = {
  name: faker.person.fullName(),
  expiry: creditCardExpiry(),
  cvv: faker.finance.creditCardCVV(),
}
