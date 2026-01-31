"use client"

import { motion } from "framer-motion"
import {
  Eye,
  Users,
  Clock,
  TrendingUp,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  ArrowUpRight,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  {
    title: "Page Views",
    value: "45,231",
    change: "+12.5%",
    icon: Eye,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Unique Visitors",
    value: "12,847",
    change: "+8.2%",
    icon: Users,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    title: "Avg. Session",
    value: "3m 42s",
    change: "+15.3%",
    icon: Clock,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Bounce Rate",
    value: "32.1%",
    change: "-5.2%",
    icon: TrendingUp,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
]

const trafficByCountry = [
  { country: "United States", visitors: 4521, percentage: 35.2 },
  { country: "United Kingdom", visitors: 1823, percentage: 14.2 },
  { country: "Germany", visitors: 1456, percentage: 11.3 },
  { country: "Singapore", visitors: 1234, percentage: 9.6 },
  { country: "Canada", visitors: 987, percentage: 7.7 },
  { country: "Australia", visitors: 756, percentage: 5.9 },
  { country: "Japan", visitors: 623, percentage: 4.8 },
  { country: "Others", visitors: 1447, percentage: 11.3 },
]

const topPages = [
  { path: "/", views: 12453, title: "Home" },
  { path: "/projects", views: 8234, title: "Projects" },
  { path: "/about", views: 5621, title: "About" },
  { path: "/contact", views: 3456, title: "Contact" },
  { path: "/blog/ai-trends", views: 2341, title: "AI Trends 2024" },
]

const deviceStats = [
  { device: "Desktop", percentage: 58, icon: Monitor },
  { device: "Mobile", percentage: 35, icon: Smartphone },
  { device: "Tablet", percentage: 7, icon: Tablet },
]

const weeklyData = [
  { day: "Mon", views: 1200 },
  { day: "Tue", views: 1800 },
  { day: "Wed", views: 2400 },
  { day: "Thu", views: 2100 },
  { day: "Fri", views: 1900 },
  { day: "Sat", views: 1400 },
  { day: "Sun", views: 1100 },
]

const maxViews = Math.max(...weeklyData.map((d) => d.views))

export default function AdminAnalyticsPage() {
  return (
    <div className="p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Track your portfolio performance and visitor insights
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="bg-card/50 border-border hover:border-primary/30 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <div className="flex items-center gap-1 text-sm text-green-500">
                      {stat.change}
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Weekly Views Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="bg-card/50 border-border h-full">
              <CardHeader>
                <CardTitle className="text-lg">Weekly Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between gap-2 h-48">
                  {weeklyData.map((data, index) => (
                    <div key={data.day} className="flex-1 flex flex-col items-center gap-2">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(data.views / maxViews) * 100}%` }}
                        transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                        className="w-full bg-primary/20 rounded-t-lg relative overflow-hidden"
                      >
                        <div
                          className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-lg"
                          style={{ height: "100%" }}
                        />
                      </motion.div>
                      <span className="text-xs text-muted-foreground">{data.day}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Device Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="bg-card/50 border-border h-full">
              <CardHeader>
                <CardTitle className="text-lg">Devices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {deviceStats.map((device, index) => (
                    <div key={device.device} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-secondary">
                            <device.icon className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <span className="text-foreground">{device.device}</span>
                        </div>
                        <span className="text-muted-foreground">{device.percentage}%</span>
                      </div>
                      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${device.percentage}%` }}
                          transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                          className="h-full bg-primary rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Bottom Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Traffic by Country */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="bg-card/50 border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Traffic by Country</CardTitle>
                <Globe className="w-5 h-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trafficByCountry.slice(0, 6).map((item, index) => (
                    <div key={item.country} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-6 text-center text-muted-foreground text-sm">
                          {index + 1}
                        </span>
                        <span className="text-foreground">{item.country}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-20 h-2 bg-secondary rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.percentage}%` }}
                            transition={{ duration: 0.5, delay: 0.7 + index * 0.05 }}
                            className="h-full bg-primary rounded-full"
                          />
                        </div>
                        <span className="text-sm text-muted-foreground w-12 text-right">
                          {item.percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Top Pages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="text-lg">Top Pages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPages.map((page, index) => (
                    <div
                      key={page.path}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-secondary/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center justify-center">
                          {index + 1}
                        </span>
                        <div>
                          <p className="text-foreground font-medium">{page.title}</p>
                          <p className="text-xs text-muted-foreground">{page.path}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-foreground font-medium">
                          {page.views.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">views</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
