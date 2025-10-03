import BlogCard from '@/components/shared/BlogCard';
import React from 'react';

const FeaturedBlogs = () => {
    return (
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-2 py-12">
  <BlogCard
    title="My First Blog"
    excerpt="This is a modern blog card with neon glow and glass effect."
    thumbnail="https://cdn.sanity.io/images/81pocpw8/production/41c8595944d919ef3289d24eb5884bf9b5385ab0-1200x900.jpg?w=800&h=600&fit=clip&auto=format"
    slug="my-first-blog"
  />
  <BlogCard
    title="Next.js + GSAP Magic"
    excerpt="Learn how to build stunning animations with Next.js, GSAP, and Framer Motion."
    thumbnail="/blog2.jpg"
    slug="nextjs-gsap-magic"
  />
  <BlogCard
    title="Next.js + GSAP Magic"
    excerpt="Learn how to build stunning animations with Next.js, GSAP, and Framer Motion."
    thumbnail="/blog2.jpg"
    slug="nextjs-gsap-magic"
  />
</div>
    );
};

export default FeaturedBlogs;