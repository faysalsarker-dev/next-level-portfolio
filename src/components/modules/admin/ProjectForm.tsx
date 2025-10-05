"use client";

import { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { X, Plus } from "lucide-react";
import { ImageUpload } from "@/components/shared/ImageUpload";
import { fetchWithTag } from "@/lib/fetchWithTag";
import { useToast } from "@/hooks/use-toast";
import { IProject } from "@/interfaces";

interface ProjectFormProps {
  project?: IProject;
  onCancel: () => void;
}

export const ProjectForm = ({ project, onCancel }: ProjectFormProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IProject>({
    defaultValues: {
      title: project?.title || "",
      thumbnail: project?.thumbnail || "",
      description: project?.description || "",
      features: project?.features || [""],
      technologies: project?.technologies || [""],
      githubLink: project?.githubLink || "",
      liveSite: project?.liveSite || "",
      status: project?.status || "draft",
    },
  });

  const { fields: featureFields, append: appendFeature, remove: removeFeature } = useFieldArray({
    control,
    name: "features",
  });

  const { fields: techFields, append: appendTech, remove: removeTech } = useFieldArray({
    control,
    name: "technologies",
  });

  const onSubmit = async (data: IProject) => {
    try {
      setLoading(true);

      const cleanedData = {
        title: data.title.trim(),
        thumbnail: data.thumbnail,
        description: data.description.trim(),
        features: data.features.filter(f => f && f.trim() !== ""),
        technologies: data.technologies.filter(t => t && t.trim() !== ""),
        githubLink: data.githubLink.trim(),
        liveSite: data.liveSite.trim(),
        status: data.status,
      };

      const method = project ? "PUT" : "POST";
      const url = project
        ? `${process.env.NEXT_PUBLIC_API_URL}/project/${project._id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/project`;

      await fetchWithTag(url, {
        method,
        data: cleanedData,
        isFormData: false,
        tag: "projects",
      });

      toast({
        title: project ? "Project Updated" : "Project Created",
        description: `Your project has been ${project ? "updated" : "created"} successfully.`,
        duration: 4000,
      });

      onCancel();

    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "There was an error saving your project. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 p-6 bg-card rounded-2xl shadow-lg border border-border max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <h2 className="text-2xl font-semibold text-gray-800">Project Editor</h2>

      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Project Title</Label>
        <Input
          id="title"
          placeholder="Enter project title..."
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      {/* Thumbnail */}
      <div className="space-y-2">
        <Label>Thumbnail Image</Label>
        <Controller
          name="thumbnail"
          control={control}
          rules={{ required: "Thumbnail is required" }}
          render={({ field }) => (
            <ImageUpload
              value={field.value}
              onChange={(file) => field.onChange(file)}
              onRemove={() => field.onChange("")}
            />
          )}
        />
        {errors.thumbnail && (
          <p className="text-sm text-red-500">{errors.thumbnail.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Controller
          name="description"
          control={control}
          rules={{ required: "Description is required" }}
          render={({ field }) => (
            <Textarea
              id="description"
              placeholder="Describe your project..."
              rows={5}
              {...field}
            />
          )}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* Features Field Array */}
      <div className="space-y-2">
        <Label>Key Features</Label>
        <div className="space-y-3">
          {featureFields.map((field, index) => (
            <motion.div
              key={field.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-start gap-2"
            >
              <div className="flex-1">
                <Input
                  {...register(`features.${index}`)}
                  placeholder={`Feature ${index + 1}`}
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeFeature(index)}
                disabled={featureFields.length === 1}
                className="mt-0.5"
              >
                <X className="h-4 w-4" />
              </Button>
            </motion.div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => appendFeature("")}
            className="w-full"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Feature
          </Button>
        </div>
      </div>

      {/* Technologies Field Array */}
      <div className="space-y-2">
        <Label>Technologies Used</Label>
        <div className="space-y-3">
          {techFields.map((field, index) => (
            <motion.div
              key={field.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-start gap-2"
            >
              <div className="flex-1">
                <Input
                  {...register(`technologies.${index}`)}
                  placeholder={`e.g., React, Node.js, MongoDB`}
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeTech(index)}
                disabled={techFields.length === 1}
                className="mt-0.5"
              >
                <X className="h-4 w-4" />
              </Button>
            </motion.div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => appendTech("")}
            className="w-full"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Technology
          </Button>
        </div>
      </div>

      {/* GitHub Link */}
      <div className="space-y-2">
        <Label htmlFor="githubLink">GitHub Repository</Label>
        <Input
          id="githubLink"
          type="url"
          placeholder="https://github.com/username/repo"
          {...register("githubLink", {
            pattern: {
              value: /^https?:\/\/.+/,
              message: "Please enter a valid URL",
            },
          })}
        />
        {errors.githubLink && (
          <p className="text-sm text-red-500">{errors.githubLink.message}</p>
        )}
      </div>

      {/* Live Site */}
      <div className="space-y-2">
        <Label htmlFor="liveSite">Live Demo</Label>
        <Input
          id="liveSite"
          type="url"
          placeholder="https://your-project.com"
          {...register("liveSite", {
            pattern: {
              value: /^https?:\/\/.+/,
              message: "Please enter a valid URL",
            },
          })}
        />
        {errors.liveSite && (
          <p className="text-sm text-red-500">{errors.liveSite.message}</p>
        )}
      </div>

      {/* Publish Toggle */}
      <div className="flex items-center space-x-2 pt-2">
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Switch
              id="status"
              checked={field.value === "published"}
              onCheckedChange={(checked) =>
                field.onChange(checked ? "published" : "draft")
              }
            />
          )}
        />
        <Label htmlFor="status">Publish immediately</Label>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : project ? "Update Project" : "Create Project"}
        </Button>
      </div>
    </motion.form>
  );
};