"use client";

import { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { motion } from "framer-motion";

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

import { RichTextEditor } from "./RichTextEditor";
import { ImageUpload } from "@/components/shared/ImageUpload";
import { fetchWithTag } from "@/lib/fetchWithTag";
import { useToast } from "@/hooks/use-toast";
import { IBlog } from "@/interfaces";

const categories = ["React", "TypeScript", "Next.js", "JavaScript", "CSS", "Other"];

interface BlogFormProps {
  blog?: IBlog;
  onCancel: () => void;
}

export const BlogForm = ({ blog, onCancel }: BlogFormProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IBlog>({
    defaultValues: {
      title: blog?.title || "",
      categories: blog?.categories || [],
      tags: blog?.tags || [""],
      content: blog?.content || "",
      status: blog?.status || "draft",
      thumbnail: blog?.thumbnail || "",
      meta: blog?.meta || {
        seoTitle: "",
        seoDescription: "",
        readTime:0,
        seoKeywords: [""],
      },
    },
  });

const { fields: tagFields, append: addTag, remove: removeTag } = useFieldArray({
  control,
  name: "tags" as never, 
});



const { fields: keywordFields, append: addKeyword, remove: removeKeyword } = useFieldArray({
  control,
  name: "meta.seoKeywords" as never, 
});



  const onSubmit = async (data: IBlog) => {
    try {
      setLoading(true);

      // Clean and filter data
      const cleanedData = {
        title: data.title,
        content: data.content,
        thumbnail: data.thumbnail || "",
        categories: data.categories?.filter(c => c && c.trim() !== "") || [],
        tags: data.tags?.filter(t => t && t.trim() !== "") || [],
        status: data.status,
        meta: {
          seoTitle: data.meta?.seoTitle || "",
          seoDescription: data.meta?.seoDescription || "",
          readTime: data.meta?.readTime || 0,
          seoKeywords: data.meta?.seoKeywords?.filter(k => k && k.trim() !== "") || [],
        },
      };

      const method = blog ? "PUT" : "POST";
      const url = blog
        ? `/blog/${blog._id}`
        : `/blog`;

   await fetchWithTag(url, {
        method,
        data: cleanedData,
        isFormData: false,
        tag: "blogs",
      });

      toast({
        title: blog ? "Blog Updated" : "Blog Posted",
        description: `Your blog has been ${blog ? "updated" : "posted"} successfully.`,
        duration: 4000,
      });

      onCancel(); 

    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "There was an error saving your blog. Please try again.",
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
      <h2 className="text-2xl font-semibold text-gray-800">✍️ Blog Editor</h2>

      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Enter your blog title..."
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      {/* Thumbnail */}
      <div className="space-y-2">
        <Label>Thumbnail</Label>
        <Controller
          name="thumbnail"
          control={control}
          render={({ field }) => (
            <ImageUpload
              value={field.value}
              onChange={(url: string) => field.onChange(url)}
              onRemove={() => field.onChange("")}
            />
          )}
        />
      </div>

      {/* Categories */}
      <div className="space-y-2">
        <Label>Category</Label>
        <Controller
          name="categories"
          control={control}
          render={({ field }) => (
            <Select
              onValueChange={(value) => field.onChange([value])}
              value={field.value?.[0] || ""}
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
          )}
        />
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <Label>Tags</Label>
        <div className="flex flex-col gap-2">
          {tagFields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2">
              <Input
                {...register(`tags.${index}`)}
                placeholder="Enter a tag"
                className="flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                onClick={() => removeTag(index)}
                disabled={tagFields.length === 1}
              >
                ✕
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => addTag("")}
          >
            + Add Tag
          </Button>
        </div>
      </div>

      {/* SEO Fields */}
      <div className="p-4 border border-gray-200 rounded-lg space-y-4 bg-gray-50/60">
        <h3 className="font-semibold text-gray-700">SEO Settings</h3>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>SEO Title</Label>
            <Input 
              placeholder="SEO-friendly title" 
              {...register("meta.seoTitle")}
            />
          </div>
          <div className="space-y-2">
            <Label>SEO Description</Label>
            <Input
              placeholder="SEO-friendly description"
              {...register("meta.seoDescription")}
            />
          </div>
          <div className="space-y-2">
            <Label>SEO readTime</Label>
            <Input
              placeholder="SEO-friendly readTime"
              {...register("meta.readTime")}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>SEO Keywords</Label>
          <div className="flex flex-col gap-2">
            {keywordFields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <Input
                  {...register(`meta.seoKeywords.${index}`)}
                  placeholder="Enter keyword"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => removeKeyword(index)}
                  disabled={keywordFields.length === 1}
                >
                  ✕
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addKeyword("")}
            >
              + Add Keyword
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <Label>Content</Label>
        <Controller
          name="content"
          control={control}
          rules={{ required: "Content is required" }}
          render={({ field }) => (
              <RichTextEditor
      key={blog?._id || "new"} 
      value={field.value || ""} 
      onChange={field.onChange}
    />
          )}
        />
        {errors.content && (
          <p className="text-sm text-red-500">{errors.content.message}</p>
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

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : blog ? "Update Blog" : "Publish Blog"}
        </Button>
      </div>
    </motion.form>
  );
};