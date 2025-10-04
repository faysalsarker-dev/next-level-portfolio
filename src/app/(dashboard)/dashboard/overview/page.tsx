"use client";
import { motion } from "framer-motion";
import { FileText, FolderGit2, Clock, TrendingUp } from "lucide-react";
import { StatsCard } from "@/components/admin/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Overview() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-8"
    >
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatsCard
          title="Total Blogs"
          value={12}
          icon={FileText}
          trend="+2 from last month"
          delay={0}
        />
        <StatsCard
          title="Total Projects"
          value={8}
          icon={FolderGit2}
          trend="+1 from last month"
          delay={0.1}
        />
        <StatsCard
          title="Published"
          value={18}
          icon={TrendingUp}
          trend="90% publish rate"
          delay={0.2}
        />
        <StatsCard
          title="Drafts"
          value={2}
          icon={Clock}
          trend="Pending review"
          delay={0.3}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Latest Blog Post</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-lg">Building Modern Web Apps with React</h3>
                  <p className="text-sm text-muted-foreground">Published 2 days ago</p>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  Learn how to build scalable and performant web applications using React, TypeScript, and modern tooling.
                </p>
                <div className="flex gap-2">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    React
                  </span>
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    TypeScript
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Latest Project</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-lg">Portfolio Dashboard</h3>
                  <p className="text-sm text-muted-foreground">Updated 1 day ago</p>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  A comprehensive admin dashboard for managing portfolio content with rich text editing and media uploads.
                </p>
                <div className="flex gap-2 text-sm">
                  <a href="#" className="text-primary hover:underline">View Live</a>
                  <span className="text-muted-foreground">•</span>
                  <a href="#" className="text-primary hover:underline">GitHub</a>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
