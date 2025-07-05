"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Plus, X, ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { mockDashboards } from "@/lib/mock-data"
import type { Dashboard } from "@/types/dashboard"
import Link from "next/link"

export default function EditDashboard() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [dashboard, setDashboard] = useState<Dashboard | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    packageNames: [""],
    buckets: [{ name: "", description: "" }],
  })

  useEffect(() => {
    const dashboardId = params.id as string
    const foundDashboard = mockDashboards.find((d) => d.id === dashboardId)

    if (foundDashboard) {
      setDashboard(foundDashboard)
      setFormData({
        name: foundDashboard.name,
        description: foundDashboard.description,
        packageNames: foundDashboard.packageNames.length > 0 ? foundDashboard.packageNames : [""],
        buckets:
          foundDashboard.buckets.length > 0
            ? foundDashboard.buckets.map((b) => ({ name: b.name, description: b.description }))
            : [{ name: "", description: "" }],
      })
    }
  }, [params.id])

  const addPackageName = () => {
    setFormData((prev) => ({
      ...prev,
      packageNames: [...prev.packageNames, ""],
    }))
  }

  const removePackageName = (index: number) => {
    if (formData.packageNames.length > 1) {
      setFormData((prev) => ({
        ...prev,
        packageNames: prev.packageNames.filter((_, i) => i !== index),
      }))
    }
  }

  const updatePackageName = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      packageNames: prev.packageNames.map((pkg, i) => (i === index ? value : pkg)),
    }))
  }

  const addBucket = () => {
    setFormData((prev) => ({
      ...prev,
      buckets: [...prev.buckets, { name: "", description: "" }],
    }))
  }

  const removeBucket = (index: number) => {
    if (formData.buckets.length > 1) {
      setFormData((prev) => ({
        ...prev,
        buckets: prev.buckets.filter((_, i) => i !== index),
      }))
    }
  }

  const updateBucket = (index: number, field: "name" | "description", value: string) => {
    setFormData((prev) => ({
      ...prev,
      buckets: prev.buckets.map((bucket, i) => (i === index ? { ...bucket, [field]: value } : bucket)),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Dashboard name is required",
        variant: "destructive",
      })
      return
    }

    const validPackageNames = formData.packageNames.filter((pkg) => pkg.trim())
    if (validPackageNames.length === 0) {
      toast({
        title: "Error",
        description: "At least one package name is required",
        variant: "destructive",
      })
      return
    }

    const validBuckets = formData.buckets.filter((bucket) => bucket.name.trim())
    if (validBuckets.length === 0) {
      toast({
        title: "Error",
        description: "At least one bucket is required",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Simulate dashboard update
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Success",
        description: "Dashboard updated successfully!",
      })

      router.push(`/dashboard/${params.id}`)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update dashboard",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!dashboard) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Dashboard Not Found</h1>
        <Link href="/">
          <Button>Back to Dashboards</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href={`/dashboard/${params.id}`}>
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Edit Dashboard</h1>
          <p className="text-muted-foreground mt-2">Update your dashboard configuration</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Update basic details about your dashboard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Dashboard Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Enter dashboard name"
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Describe what this dashboard monitors"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Package Names */}
        <Card>
          <CardHeader>
            <CardTitle>Package Names</CardTitle>
            <CardDescription>Update the Google Play Store package names you want to monitor</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.packageNames.map((packageName, index) => (
              <div key={index} className="flex gap-2">
                <div className="flex-1">
                  <Input
                    value={packageName}
                    onChange={(e) => updatePackageName(index, e.target.value)}
                    placeholder="com.example.app"
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removePackageName(index)}
                  disabled={formData.packageNames.length === 1}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addPackageName} className="w-full bg-transparent">
              <Plus className="h-4 w-4 mr-2" />
              Add Package Name
            </Button>
          </CardContent>
        </Card>

        {/* Buckets */}
        <Card>
          <CardHeader>
            <CardTitle>Buckets</CardTitle>
            <CardDescription>Update buckets to categorize and organize reviews</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.buckets.map((bucket, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Bucket {index + 1}</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeBucket(index)}
                    disabled={formData.buckets.length === 1}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <div>
                    <Label>Bucket Name *</Label>
                    <Input
                      value={bucket.name}
                      onChange={(e) => updateBucket(index, "name", e.target.value)}
                      placeholder="e.g., User Experience"
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Input
                      value={bucket.description}
                      onChange={(e) => updateBucket(index, "description", e.target.value)}
                      placeholder="Describe what this bucket categorizes"
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addBucket} className="w-full bg-transparent">
              <Plus className="h-4 w-4 mr-2" />
              Add Bucket
            </Button>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex gap-4">
          <Link href={`/dashboard/${params.id}`} className="flex-1">
            <Button type="button" variant="outline" className="w-full bg-transparent">
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={isLoading} className="flex-1">
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Dashboard"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
