import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ImageUpload } from "@/components/shared/ImageUpload";

interface ProjectFormProps {
  project?;
  onSave: (project) => void;
  onCancel: () => void;
}

export const ProjectForm = ({ project, onSave, onCancel }: ProjectFormProps) => {
  const [formData, setFormData] = useState({
    title: project?.title || "",
    thumbnail: project?.thumbnail || "",
    description: project?.description || "",
    features: project?.features || [],
    repoLink: project?.repoLink || "",
    liveLink: project?.liveLink || "",
    ...project,
  });

  const [newFeature, setNewFeature] = useState("");

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData({
        ...formData,
        features: [...(formData.features || []), newFeature.trim()],
      });
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features?.filter((_, i) => i !== index) || [],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: project?.id || Date.now().toString(),
      title: formData.title || "",
      thumbnail: formData.thumbnail || "",
      description: formData.description || "",
      features: formData.features || [],
      repoLink: formData.repoLink || "",
      liveLink: formData.liveLink || "",
      createdAt: project?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
          placeholder="Enter project title"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Thumbnail</Label>
        <ImageUpload
          value={formData.thumbnail}
          onChange={(url) => setFormData({ ...formData, thumbnail: url })}
          onRemove={() => setFormData({ ...formData, thumbnail: "" })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Enter project description"
          rows={4}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="repoLink">Repository Link</Label>
        <Input
          id="repoLink"
          type="url"
          value={formData.repoLink}
          onChange={(e) =>
            setFormData({ ...formData, repoLink: e.target.value })
          }
          placeholder="https://github.com/username/repo"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="liveLink">Live Link</Label>
        <Input
          id="liveLink"
          type="url"
          value={formData.liveLink}
          onChange={(e) =>
            setFormData({ ...formData, liveLink: e.target.value })
          }
          placeholder="https://example.com"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Features</Label>
        <div className="flex gap-2">
          <Input
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            placeholder="Add a feature"
            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
          />
          <Button type="button" onClick={addFeature}>
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.features?.map((feature, index) => (
            <Badge key={index} variant="secondary" className="pl-3 pr-1">
              {feature}
              <button
                type="button"
                onClick={() => removeFeature(index)}
                className="ml-2 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Project</Button>
      </div>
    </form>
  );
};