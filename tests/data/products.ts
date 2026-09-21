type Product = {
  name: string
  handle: string
  price: string
  inStock: boolean
  featured: boolean
  options?: { Size: string[]; Color: string[] }
}

export const PRODUCTS: Product[] = [
  { name: "Grey jacket", handle: "grey-jacket", price: "£55.00", inStock: true, featured: true },
  {
    name: "Noir jacket",
    handle: "noir-jacket",
    price: "£60.00",
    inStock: true,
    featured: true,
    options: { Size: ["S", "M", "L"], Color: ["Blue", "Red"] },
  },
  { name: "Striped top", handle: "striped-top", price: "£50.00", inStock: true, featured: true },
  { name: "Bronze sandals", handle: "bronze-sandals", price: "£39.99", inStock: true, featured: false },
  {
    name: "Black heels",
    handle: "flower-print-jeans",
    price: "£45.00",
    inStock: true,
    featured: false,
    options: { Size: ["S", "M", "L"], Color: ["Red"] },
  },
  { name: "White sandals", handle: "white-sandals", price: "£25.00", inStock: false, featured: false },
  { name: "Brown Shades", handle: "brown-shades", price: "£20.00", inStock: false, featured: false },
]
