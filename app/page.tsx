"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Eye, Edit, Calendar, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockDashboards } from "@/lib/mock-data"
import type { Dashboard } from "@/types/dashboard"

export default function DashboardList() {
  const [dashboards] = useState<Dashboard[]>(mockDashboards)

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboards</h1>
          <p className="text-muted-foreground mt-2">
            Manage your app analytics dashboards and monitor Play Store reviews
          </p>
        </div>
        <Link href="/create">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create New Dashboard
          </Button>
        </Link>
      </div>

      {dashboards.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              <div className="rounded-full bg-muted p-4">
                <Package className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">No dashboards yet</h3>
                <p className="text-muted-foreground">Create your first dashboard to start monitoring app reviews</p>
              </div>
              <Link href="/create">
                <Button>Create Dashboard</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {dashboards.map((dashboard) => (
            <Card key={dashboard.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{dashboard.name}</CardTitle>
                    <CardDescription className="line-clamp-2">{dashboard.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Package Names:</p>
                    <div className="flex flex-wrap gap-1">
                      {dashboard.packageNames.map((pkg, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {pkg.split(".").pop()}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Buckets:</p>
                    <div className="flex flex-wrap gap-1">
                      {dashboard.buckets.map((bucket) => (
                        <Badge key={bucket.id} variant="outline" className="text-xs">
                          {bucket.name}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Updated {dashboard.updatedAt.toLocaleDateString()}</span>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Link href={`/dashboard/${dashboard.id}`} className="flex-1">
                      <Button variant="outline" className="w-full flex items-center gap-2 bg-transparent">
                        <Eye className="h-4 w-4" />
                        View
                      </Button>
                    </Link>
                    <Link href={`/edit/${dashboard.id}`} className="flex-1">
                      <Button variant="outline" className="w-full flex items-center gap-2 bg-transparent">
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
