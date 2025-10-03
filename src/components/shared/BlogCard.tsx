"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Card } from "../ui/card";

interface BlogCardProps {
  title: string;
  excerpt: string;
  thumbnail: string;
  slug: string;
}

export default function BlogCard({ title, excerpt, thumbnail, slug }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Link href={`/blog/${slug}`}>
        <Card
          className="relative group overflow-hidden rounded-2xl bg-background/40 backdrop-blur-xl border border-white/10 shadow-[0_0_25px_rgba(120,46,250,0.15)] transition-all duration-500 hover:shadow-[0_0_40px_rgba(120,46,250,0.3)]"
        >
          {/* Thumbnail */}
          <div className="relative w-full h-60 overflow-hidden">
            <img
              src={thumbnail}
              alt={title}
           //   fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80" />
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-5 z-10 bg-glass-gradient rounded-t-xl">
            <h3 className="text-lg md:text-xl font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors duration-300">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
              {excerpt}
            </p>

            {/* Read More */}
            <motion.span
              whileHover={{ x: 4 }}
              className="mt-3 inline-block text-sm font-medium text-primary relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[1px] after:bg-primary after:transition-all after:duration-300 group-hover:after:w-full"
            >
              Read More
            </motion.span>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
