"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { BlogForm } from "@/components/modules/admin/BlogForm";
import { fetchWithTag } from "@/lib/fetchWithTag";
import { useToast } from "@/hooks/use-toast";
import { IBlog } from "@/interfaces";

export default function Blogs() {
  const [blogs, setBlogs] = useState<IBlog[] | never[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<IBlog | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch blogs
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const url = `/blog`;
      const response = await fetchWithTag<IBlog>(url, {
        tag: "blogs",
      });
      
      const blogsData = Array.isArray(response?.data) ? response.data : [];
      setBlogs(blogsData);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogs([]); 
      toast({
        title: "Error",
        description: "Failed to fetch blogs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };


  // Handle edit
  const handleEdit = (blog: IBlog) => {
    setEditingBlog(blog);
    setIsDialogOpen(true);
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/blog/${id}`;
      await fetchWithTag(url, {
        method: "DELETE",
        tag: "blogs",
      });

      toast({
        title: "Blog Deleted",
        description: "The blog post has been deleted successfully.",
      });

      fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setBlogToDelete(null);
    }
  };

  // Confirm delete
  const confirmDelete = (id: string) => {
    setBlogToDelete(id);
    setDeleteDialogOpen(true);
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingBlog(null);
    fetchBlogs(); // Refresh list after create/update
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
          <p className="text-muted-foreground">
            Create and manage your blog posts
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingBlog(null);
                setIsDialogOpen(true);
              }}
            >
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
              onCancel={handleDialogClose}
            />
          </DialogContent>
        </Dialog>
      </div>

  

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-muted-foreground">Loading blogs...</div>
        </div>
      ) : blogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 border rounded-lg">
          <p className="text-muted-foreground mb-4">
            { "No blogs found" }
          </p>
         
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Blog
            </Button>
         
        </div>
      ) : (
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
              {blogs.map((blog:IBlog) => (
                <TableRow key={blog._id}>
                  <TableCell>
                    {blog.thumbnail ? (
                      <div className="relative w-16 h-16 rounded overflow-hidden">
                        <Image
                          src={blog.thumbnail}
                          alt={blog.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                        No image
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium max-w-md truncate">
                    {blog.title}
                  </TableCell>
                  <TableCell>
                    {blog.categories?.[0] ? (
                      <Badge variant="secondary">{blog.categories[0]}</Badge>
                    ) : (
                      <span className="text-muted-foreground text-sm">
                        No category
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        blog.status === "published" ? "default" : "outline"
                      }
                    >
                      {blog.status === "published" ? "Published" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {blog.createdAt ? formatDate(blog.createdAt) : "N/A"}
                  </TableCell>
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
                        onClick={() => blog._id && confirmDelete(blog._id)}
                        disabled={!blog._id}
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
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              blog post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setBlogToDelete(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => blogToDelete && handleDelete(blogToDelete)}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}