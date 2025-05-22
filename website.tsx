"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download } from "lucide-react"

Chart.register(...registerables)

export default function ReportsPage() {
  const monthlyChartRef = useRef<HTMLCanvasElement>(null)
  const categoryChartRef = useRef<HTMLCanvasElement>(null)
  const trendChartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (monthlyChartRef.current) {
      const ctx = monthlyChartRef.current.getContext("2d")
      if (ctx) {
        new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [
              {
                label: "Income",
                data: [3500, 3500, 3700, 3500, 3500, 3500],
                backgroundColor: "rgba(16, 185, 129, 0.7)",
              },
              {
                label: "Expenses",
                data: [2800, 2600, 2900, 2400, 2250, 0],
                backgroundColor: "rgba(244, 63, 94, 0.7)",
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              x: {
                stacked: false,
              },
              y: {
                beginAtZero: true,
                ticks: {
                  callback: (value) => "$" + value,
                },
              },
            },
          },
        })
      }
    }

    if (categoryChartRef.current) {
      const ctx = categoryChartRef.current.getContext("2d")
      if (ctx) {
        new Chart(ctx, {
          type: "pie",
          data: {
            labels: ["Housing", "Food & Dining", "Transportation", "Entertainment", "Shopping", "Other"],
            datasets: [
              {
                data: [1200, 450, 325, 178, 100, 0],
                backgroundColor: [
                  "rgb(16, 185, 129)", // emerald-500
                  "rgb(59, 130, 246)", // blue-500
                  "rgb(245, 158, 11)", // amber-500
                  "rgb(244, 63, 94)", // rose-500
                  "rgb(139, 92, 246)", // violet-500
                  "rgb(156, 163, 175)", // gray-400
                ],
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              tooltip: {
                callbacks: {
                  label: (context) => {
                    const label = context.label || ""
                    const value = context.raw as number
                    const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
                    const percentage = Math.round((value / total) * 100)
                    return `${label}: $${value} (${percentage}%)`
                  },
                },
              },
            },
          },
        })
      }
    }

    if (trendChartRef.current) {
      const ctx = trendChartRef.current.getContext("2d")
      if (ctx) {
        new Chart(ctx, {
          type: "line",
          data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [
              {
                label: "Net Savings",
                data: [700, 900, 800, 1100, 1250, 0],
                borderColor: "rgb(16, 185, 129)",
                backgroundColor: "rgba(16, 185, 129, 0.1)",
                tension: 0.3,
                fill: true,
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: (value) => "$" + value,
                },
              },
            },
          },
        })
      }
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">Reports & Analytics</span>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="this-month">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
                <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                <SelectItem value="last-6-months">Last 6 Months</SelectItem>
                <SelectItem value="this-year">This Year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-6">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="income">Income</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="savings">Savings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6 space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Total Income</CardTitle>
                  <CardDescription>Last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$21,200.00</div>
                  <p className="text-xs text-muted-foreground">+5.7% from previous period</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Total Expenses</CardTitle>
                  <CardDescription>Last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$15,950.00</div>
                  <p className="text-xs text-muted-foreground">-2.3% from previous period</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Net Savings</CardTitle>
                  <CardDescription>Last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$5,250.00</div>
                  <p className="text-xs text-muted-foreground">+15.2% from previous period</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Income vs. Expenses</CardTitle>
                <CardDescription>Monthly comparison for the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <canvas ref={monthlyChartRef}></canvas>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Expense Breakdown</CardTitle>
                  <CardDescription>By category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <canvas ref={categoryChartRef}></canvas>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Savings Trend</CardTitle>
                  <CardDescription>Monthly net savings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <canvas ref={trendChartRef}></canvas>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="income" className="mt-6">
            {/* Income-specific reports */}
          </TabsContent>

          <TabsContent value="expenses" className="mt-6">
            {/* Expense-specific reports */}
          </TabsContent>

          <TabsContent value="savings" className="mt-6">
            {/* Savings-specific reports */}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
