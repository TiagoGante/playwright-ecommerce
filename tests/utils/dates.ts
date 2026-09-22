export function creditCardExpiry(yearsFromNow = 5): string {
  const date = new Date()
  date.setFullYear(date.getFullYear() + yearsFromNow)
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = String(date.getFullYear()).slice(-2)
  return `${month}/${year}`
}
