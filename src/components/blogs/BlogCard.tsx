
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Eye } from 'lucide-react';
import { format } from 'date-fns';
import Image from 'next/image';
import { IBlog } from '@/interfaces';
import Link from 'next/link';

interface BlogCardProps {
  blog: IBlog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <Link href={`/blog/${blog.slug}`}>
      <Card className="group overflow-hidden bg-card border-border card-glow transition-all duration-300 hover:scale-[1.02]">
        {blog.thumbnail && (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={blog.thumbnail}
              alt={blog.title}
              fill
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
          </div>
        )}
        
        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-3">
            {blog.tags?.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {blog.title}
          </h3>
          
          {blog.meta?.seoDescription && (
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {blog.meta.seoDescription}
            </p>
          )}
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            {blog.createdAt && (
              <span>{format(new Date(blog.createdAt), 'MMM dd, yyyy')}</span>
            )}
            {blog.meta?.readTime && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {blog.meta.readTime} min read
              </span>
            )}
            {blog.meta?.views && (
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {blog.meta.views}
              </span>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
