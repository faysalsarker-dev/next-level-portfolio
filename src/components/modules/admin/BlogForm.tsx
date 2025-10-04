"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUpload } from "./ImageUpload";
import { RichTextEditor } from "./RichTextEditor";

interface BlogFormProps {
  blog?;
  onSave: (blog) => void;
  onCancel: () => void;
}

const categories = ["React", "TypeScript", "Next.js", "JavaScript", "CSS", "Other"];

export const BlogForm = ({ blog, onSave, onCancel }: BlogFormProps) => {
  const [formData, setFormData] = useState({
    title: blog?.title || "",
    slug: blog?.slug || "",
    thumbnail: blog?.thumbnail || "",
    category: blog?.category || "",
    content: blog?.content || "",
    published: blog?.published || false,
    ...blog,
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  useEffect(() => {
    if (!blog && formData.title) {
      setFormData((prev) => ({
        ...prev,
        slug: generateSlug(formData.title || ""),
      }));
    }
  }, [formData.title, blog]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: blog?.id || Date.now().toString(),
      title: formData.title || "",
      slug: formData.slug || "",
      thumbnail: formData.thumbnail || "",
      category: formData.category || "",
      content: formData.content || "",
      published: formData.published || false,
      createdAt: blog?.createdAt || new Date().toISOString(),
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
          placeholder="Enter blog title"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          value={formData.slug}
          onChange={(e) =>
            setFormData({ ...formData, slug: e.target.value })
          }
          placeholder="auto-generated-slug"
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
        <Label htmlFor="category">Category</Label>
        <Select
          value={formData.category}
          onValueChange={(value) =>
            setFormData({ ...formData, category: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Content</Label>
        <RichTextEditor
          value={formData.content}
          onChange={(content) => setFormData({ ...formData, content })}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="published"
          checked={formData.published}
          onCheckedChange={(checked) =>
            setFormData({ ...formData, published: checked })
          }
        />
        <Label htmlFor="published">Publish immediately</Label>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Blog Post</Button>
      </div>
    </form>
  );
};
