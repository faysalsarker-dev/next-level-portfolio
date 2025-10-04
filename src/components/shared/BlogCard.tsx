"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  date?: string;
  readTime?: string;
  thumbnail?: string;
  tags?: string[];
}

const BlogCard = ({
  id,
  title,
  excerpt,
  date = "Jan 19, 2024",
  readTime = "5 min read",
  thumbnail,
  tags = [],
}: BlogCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Link href={`/blogs/${id}`} className="block h-full">
        <Card className="h-full py-0 group overflow-hidden border border-border/50 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 rounded-2xl">
          {/* Thumbnail */}
          <div className="relative aspect-video overflow-hidden rounded-t-2xl px-2">
            {thumbnail ? (
              <Image
                src={thumbnail}
                alt={title}
                fill
                className="object-cover rounded-lg group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-muted text-muted-foreground text-sm">
                No Image
              </div>
            )}
          </div>

          <CardHeader className="space-y-3">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {readTime}
              </span>
            </div>

            <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2">
              {title}
            </CardTitle>

            <CardDescription className="line-clamp-3 text-sm text-muted-foreground">
              {excerpt}
            </CardDescription>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </CardHeader>

          <CardFooter className=" mb-6">
            <div className="flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
              Read more
              <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
};

export default BlogCard;
