import BlogCard from "@/components/shared/BlogCard";
import { fetchWithTag } from "@/lib/fetchWithTag";
import React from "react";

const FeaturedBlogs = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/blogs/featured`;
  // const blogs = await fetchWithTag<any[]>(url, "featured-blogs"); 



  return (
    <section className="relative py-16 px-4">
      {/* before/after gradient light effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl"></div>
      </div>

      {/* Headline */}
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Featured Blogs
      </h2>

      {/* Blog Cards */}
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {Array.from({ length: 3 }).map((_, i) => (
          <BlogCard
            key={i}
            title={`Blog Post ${i + 1}`}
            excerpt="This is a modern blog card with neon glow and glass effect."
            thumbnail="https://cdn.sanity.io/images/81pocpw8/production/41c8595944d919ef3289d24eb5884bf9b5385ab0-1200x900.jpg?w=800&h=600&fit=clip&auto=format"
            slug={`blog-post-${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedBlogs;
