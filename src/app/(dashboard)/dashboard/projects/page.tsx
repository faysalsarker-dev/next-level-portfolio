"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Pencil, Trash2, ExternalLink, Github } from "lucide-react";
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
import { ProjectForm } from "@/components/modules/admin/ProjectForm";

const mockProjects = [
  {
    id: "1",
    title: "Portfolio Dashboard",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
    description: "A modern admin dashboard for managing portfolio content",
    features: ["CRUD operations", "Rich text editor", "Image uploads", "Responsive design"],
    repoLink: "https://github.com/example/portfolio-dashboard",
    liveLink: "https://portfolio-dashboard.example.com",
    createdAt: "2024-01-20",
    updatedAt: "2024-01-20",
  },
];

export default function Projects() {
  const [projects, setProjects] = useState(mockProjects);
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(search.toLowerCase()) ||
    project.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setIsDialogOpen(true);
  };

  const handleSave = (project) => {
    if (editingProject) {
      setProjects(projects.map((p) => (p.id === project.id ? project : p)));
    } else {
      setProjects([...projects, { ...project, id: Date.now().toString() }]);
    }
    setIsDialogOpen(false);
    setEditingProject(null);
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
          <h1 className="text-4xl font-bold mb-2">Project Management</h1>
          <p className="text-muted-foreground">Showcase your amazing projects</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingProject(null)}>
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProject ? "Edit Project" : "Create New Project"}
              </DialogTitle>
            </DialogHeader>
            <ProjectForm
              project={editingProject || undefined}
              onSave={handleSave}
              onCancel={() => {
                setIsDialogOpen(false);
                setEditingProject(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
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
              <TableHead>Description</TableHead>
              <TableHead>Links</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProjects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </TableCell>
                <TableCell className="font-medium">{project.title}</TableCell>
                <TableCell className="max-w-xs truncate">
                  {project.description}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    <a
                      href={project.repoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(project)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(project.id)}
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