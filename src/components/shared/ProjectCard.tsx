"use client";
import { motion } from "framer-motion";
import { ExternalLink, Github, CheckCircle2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image?: string;
  github?: string;
  demo?: string;
  features: string[];
}

const ProjectCard = ({
  id,
  title,
  description,
  tags,
  image,
  github,
  demo,
  features,
}: ProjectCardProps) => {
  const handleClick = (e: React.MouseEvent) => {
    if (document.startViewTransition) {
      e.preventDefault();
      document.startViewTransition(() => {
        window.location.href = `/projects/${id}`;
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="h-full"
    >
      <Card className="h-full group overflow-hidden hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 flex flex-col border border-border/40 backdrop-blur-sm bg-card/80">
        {/* Image */}
        <div className="relative aspect-video overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <div className="text-6xl font-bold gradient-text opacity-20">
                {title.charAt(0)}
              </div>
            </div>
          )}
        </div>

        <CardHeader>
          <CardTitle className="text-xl font-bold group-hover:gradient-text transition-all">
            {title}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 space-y-4">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-xs px-2 py-0.5"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Key Features */}
          <div>
            <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              Key Features
            </h4>
            {features.length > 0 ? (
              <ul className="space-y-1 text-sm text-muted-foreground">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-secondary mt-0.5">✦</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground italic">
                No features listed
              </p>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex gap-2 flex-wrap">
          <Button
            asChild
            variant="default"
            size="sm"
            className="flex-1"
            onClick={handleClick}
          >
            <Link href={`/projects/${id}`}>View Details</Link>
          </Button>
          {github && (
            <Button asChild variant="outline" size="sm">
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="h-4 w-4" />
              </a>
            </Button>
          )}
          {demo && (
            <Button asChild variant="outline" size="sm">
              <a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
