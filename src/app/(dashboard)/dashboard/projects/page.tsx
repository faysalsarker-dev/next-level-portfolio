"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import {
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  Github,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
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
  const [loading, setLoading] = useState<boolean>(true);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [editingProject, setEditingProject] = useState<IProject | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);

  const { toast } = useToast();

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetchWithTag<IProject[]>("/project", { tag: "projects" });
      setProjects(response?.data || []);
    } catch {
      toast({
        title: "Error fetching projects",
        description: "Something went wrong while loading projects.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleEdit = (p: IProject) => {
    setEditingProject(p);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await fetchWithTag(`/project/${id}`, { method: "DELETE", tag: "projects" });
      toast({ title: "Deleted", description: "Project removed successfully." });
      fetchProjects();
    } catch {
      toast({ title: "Failed to delete project", variant: "destructive" });
    } finally {
      setDeleteDialogOpen(false);
    }
  };
  const formatDate = (date?: Date) => {
    if (!date) return "—";
    return format(new Date(date), "PPP");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="p-8 w-full rounded-3xl bg-background/50 backdrop-blur-xl border border-border shadow-xl"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Project Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Manage and showcase your portfolio projects
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingProject(null);
                setIsDialogOpen(true);
              }}
              className="gap-2"
            >
              <Plus className="h-4 w-4" /> Add Project
            </Button>
          </DialogTrigger>
          <AnimatePresence>
            {isDialogOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <DialogContent className="max-w-4xl p-0 max-h-[90vh] overflow-auto border border-border">
                  <DialogHeader>
                    <DialogTitle>
                      {editingProject ? "Edit Project" : "Create New Project"}
                    </DialogTitle>
                  </DialogHeader>
                  <ProjectForm
                    project={editingProject || undefined}
                    onCancel={() => {
                      setIsDialogOpen(false);
                      fetchProjects();
                    }}
                  />
                </DialogContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Dialog>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border overflow-hidden bg-card/80 backdrop-blur-sm">
        {loading ? (
          <div className="py-16 text-center text-muted-foreground animate-pulse">
            Loading projects...
          </div>
        ) : projects.length === 0 ? (
          <div className="py-16 text-center text-muted-foreground">
            No projects found
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/20">
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
              <AnimatePresence>
                {projects.map((p) => (
                  <motion.tr
                    key={p._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="border-b border-border hover:bg-muted/10 transition"
                  >
                    <TableCell>
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-muted">
                        {p.thumbnail ? (
                          <Image
                            src={p.thumbnail}
                            alt={p.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center text-xs text-muted-foreground">
                            No image
                          </div>
                        )}
                      </div>
                    </TableCell>

                    <TableCell className="max-w-xs truncate">{p.title}</TableCell>

                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {p.technologies?.map((t, i) => (
                          <Badge key={i} variant="secondary">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          p.status === "published"
                            ? "border-green-500/40 text-green-400"
                            : "border-gray-500/40 text-gray-400"
                        }
                      >
                        {p.status}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <div className="flex gap-2">
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

                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(p.createdAt)}
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(p)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setProjectToDelete(p._id || null);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        )}
      </div>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deleteDialogOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
          >
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
              <AlertDialogContent className="bg-background/80 backdrop-blur-xl border border-border shadow-lg">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. The project will be permanently deleted.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => projectToDelete && handleDelete(projectToDelete)}
                    className="bg-destructive text-white hover:bg-destructive/90"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
