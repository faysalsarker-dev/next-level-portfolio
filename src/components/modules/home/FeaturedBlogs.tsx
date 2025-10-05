import React from "react";
import BlogCard from "@/components/blogs/BlogCard";
import { IBlog } from "@/interfaces";
import { fetchWithTag } from "@/lib/fetchWithTag";

const FeaturedBlogs = async () => {
  try {
    const url = `/blog`;
    const result = await fetchWithTag<IBlog>(url, { tag: "blogs" });

const blogs = result?.data

    if (!blogs) {
      return (
        <section className="relative py-16 px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Featured Blogs
          </h2>
          <p className="text-gray-400">No featured blogs available at the moment.</p>
        </section>
      );
    }

    return (
      <section className="relative py-16 px-4">
        {/* Headline */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
          Featured Blogs
        </h2>

        {/* Blog Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {blogs?.map((blog: IBlog, i: number) => (
            <BlogCard key={blog._id || i} blog={blog} />
          ))}
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error loading featured blogs:", error);

    return (
      <section className="py-16 px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
          Featured Blogs
        </h2>
        <p className="text-red-400">Failed to load featured blogs. Please try again later.</p>
      </section>
    );
  }
};

export default FeaturedBlogs;
