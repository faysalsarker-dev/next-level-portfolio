"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { BlogForm } from "@/components/modules/admin/BlogForm";

const mockBlogs = [
  {
    id: "1",
    title: "Building Modern Web Apps with React",
    slug: "building-modern-web-apps-react",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400",
    category: "React",
    content: "{}",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
    published: true,
  },
  {
    id: "2",
    title: "TypeScript Best Practices",
    slug: "typescript-best-practices",
    thumbnail: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=400",
    category: "TypeScript",
    content: "{}",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-12",
    published: true,
  },
];

export default function Blogs() {
  const [blogs, setBlogs] = useState(mockBlogs);
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase()) ||
    blog.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setBlogs(blogs.filter((b) => b.id !== id));
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setIsDialogOpen(true);
  };

  const handleSave = (blog) => {
    if (editingBlog) {
      setBlogs(blogs.map((b) => (b.id === blog.id ? blog : b)));
    } else {
      setBlogs([...blogs, { ...blog, id: Date.now().toString() }]);
    }
    setIsDialogOpen(false);
    setEditingBlog(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-8"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Blog Management</h1>
          <p className="text-muted-foreground">Create and manage your blog posts</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingBlog(null)}>
              <Plus className="mr-2 h-4 w-4" />
              New Blog Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingBlog ? "Edit Blog Post" : "Create New Blog Post"}
              </DialogTitle>
            </DialogHeader>
            <BlogForm
              blog={editingBlog || undefined}
              onSave={handleSave}
              onCancel={() => {
                setIsDialogOpen(false);
                setEditingBlog(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Thumbnail</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBlogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <img
                    src={blog.thumbnail}
                    alt={blog.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </TableCell>
                <TableCell className="font-medium">{blog.title}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{blog.category}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={blog.published ? "default" : "outline"}>
                    {blog.published ? "Published" : "Draft"}
                  </Badge>
                </TableCell>
                <TableCell>{blog.createdAt}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(blog)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(blog.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
}
