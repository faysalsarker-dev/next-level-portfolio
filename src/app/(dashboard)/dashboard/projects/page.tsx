"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Pencil, Trash2, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { ProjectForm } from "@/components/modules/admin/ProjectForm";
import { fetchWithTag } from "@/lib/fetchWithTag";
import { useToast } from "@/hooks/use-toast";
import { IProject } from "@/interfaces";

export default function Projects() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<IProject | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const url = `${process.env.NEXT_PUBLIC_API_URL}/project`;
      const response = await fetchWithTag<IProject>(url, { tag: "projects" });
      setProjects(response?.data?.data || []);
    } catch (error) {
      toast({
        title: "Error fetching projects",
        description: "Something went wrong while loading data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter(
    (p) =>
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.description?.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (p: IProject) => {
    setEditingProject(p);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await fetchWithTag(`${process.env.NEXT_PUBLIC_API_URL}/project/${id}`, {
        method: "DELETE",
        tag: "projects",
      });
      toast({
        title: "Deleted",
        description: "Project removed successfully.",
      });
      fetchProjects();
    } catch {
      toast({
        title: "Failed to delete project",
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-8 rounded-3xl bg-black/30 backdrop-blur-xl border border-white/10 shadow-xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Project Dashboard</h1>
          <p className="text-sm text-gray-400">Manage your portfolio projects</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingProject(null);
                setIsDialogOpen(true);
              }}
              className="bg-primary/90 hover:bg-primary text-white"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl bg-black/50 backdrop-blur-md border border-white/10">
            <DialogHeader>
              <DialogTitle className="text-white text-lg">
                {editingProject ? "Edit Project" : "Create Project"}
              </DialogTitle>
            </DialogHeader>
            <ProjectForm project={editingProject || undefined} onCancel={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search your projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 bg-black/30 border border-white/10 text-white placeholder:text-gray-500"
        />
      </div>

      {/* Table */}
      <div className="rounded-xl border border-white/10 overflow-hidden bg-black/40 backdrop-blur-md">
        {loading ? (
          <div className="py-12 text-center text-gray-400">Loading...</div>
        ) : filteredProjects.length === 0 ? (
          <div className="py-12 text-center text-gray-500">No projects found</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-white/5">
                <TableHead>Preview</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Tech Stack</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Links</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.map((p) => (
                <motion.tr
                  key={p._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >
                  <TableCell>
                    <div className="relative w-14 h-14 rounded overflow-hidden bg-gray-700/50">
                      {p.thumbnail ? (
                        <Image src={p.thumbnail} alt={p.title} fill className="object-cover" />
                      ) : (
                        <div className="flex items-center justify-center text-xs text-gray-400">
                          No image
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate text-white">{p.title}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {p.technologies?.slice(0, 3).map((t, i) => (
                        <Badge key={i} className="bg-white/10 text-white/80">
                          {t}
                        </Badge>
                      ))}
                      {p.technologies?.length > 3 && (
                        <Badge variant="outline" className="text-xs text-gray-300 border-gray-600">
                          +{p.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={p.status === "published" ? "default" : "outline"}
                      className={
                        p.status === "published"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-gray-600/30 text-gray-400"
                      }
                    >
                      {p.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2 text-gray-400">
                      {p.liveSite && (
                        <a href={p.liveSite} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 hover:text-primary transition" />
                        </a>
                      )}
                      {p.githubLink && (
                        <a href={p.githubLink} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 hover:text-primary transition" />
                        </a>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-400">{formatDate(p.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(p)}>
                        <Pencil className="h-4 w-4 text-gray-300" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setProjectToDelete(p._id);
                          setDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-red-400" />
                      </Button>
                    </div>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Delete Confirm */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-black/70 border border-white/10 backdrop-blur-md text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => projectToDelete && handleDelete(projectToDelete)}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}
