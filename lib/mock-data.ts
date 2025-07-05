import type { Dashboard, Review } from "@/types/dashboard"

// Mock dashboards data
export const mockDashboards: Dashboard[] = [
  {
    id: "1",
    name: "Mobile Gaming Analytics",
    description: "Analytics dashboard for mobile gaming apps",
    packageNames: ["com.supercell.clashofclans", "com.king.candycrushsaga"],
    buckets: [
      { id: "1", name: "User Experience", description: "Reviews about app usability and interface" },
      { id: "2", name: "Performance", description: "Reviews about app speed and stability" },
    ],
    reviews: [],
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "2",
    name: "E-commerce App Monitor",
    description: "Monitoring dashboard for e-commerce applications",
    packageNames: ["com.amazon.mShop.android.shopping"],
    buckets: [
      { id: "3", name: "Checkout Process", description: "Reviews about payment and checkout experience" },
      { id: "4", name: "Product Search", description: "Reviews about search functionality" },
    ],
    reviews: [],
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-18"),
  },
]

// Mock function to simulate Google Play Store review scraping
export async function scrapePlayStoreReviews(packageNames: string[]): Promise<Review[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const mockReviews: Review[] = []
  const comments = [
    "Great app, love the new features!",
    "App crashes frequently, needs fixing",
    "Excellent user interface and smooth performance",
    "Could use more customization options",
    "Fast and reliable, highly recommended",
    "Battery drain issue needs to be addressed",
    "Perfect for daily use, very intuitive",
    "Loading times are too slow",
  ]

  packageNames.forEach((packageName, pkgIndex) => {
    // Generate 10-15 reviews per package
    const reviewCount = Math.floor(Math.random() * 6) + 10

    for (let i = 0; i < reviewCount; i++) {
      const daysAgo = Math.floor(Math.random() * 21) // Past 3 weeks
      const date = new Date()
      date.setDate(date.getDate() - daysAgo)

      mockReviews.push({
        id: `${pkgIndex}-${i}`,
        packageName,
        rating: Math.floor(Math.random() * 5) + 1,
        comment: comments[Math.floor(Math.random() * comments.length)],
        date,
        userName: `User${Math.floor(Math.random() * 1000)}`,
      })
    }
  })

  return mockReviews
}
