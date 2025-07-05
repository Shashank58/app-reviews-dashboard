export interface Dashboard {
  id: string
  name: string
  description: string
  packageNames: string[]
  buckets: Bucket[]
  reviews: Review[]
  createdAt: Date
  updatedAt: Date
}

export interface Bucket {
  id: string
  name: string
  description: string
}

export interface Review {
  id: string
  packageName: string
  rating: number
  comment: string
  date: Date
  userName: string
}

export interface CreateDashboardData {
  name: string
  description: string
  packageNames: string[]
  buckets: Omit<Bucket, "id">[]
}
