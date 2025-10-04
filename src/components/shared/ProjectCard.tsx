"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  ExternalLink,
  Github,
  CheckCircle2,
  Info,
  Layers,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
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
  const [tab, setTab] = useState("overview");

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      className="w-full"
    >
      <Card className="group overflow-hidden border border-white/10 backdrop-blur-xl bg-gradient-to-br from-background/60 to-background/30 hover:from-background/40 hover:to-background/10 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 flex flex-col md:flex-row rounded-2xl relative">
        {/* Subtle glow ring */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-primary/20 via-purple-500/10 to-transparent blur-xl" />

        {/* Image Section */}
        <div className="relative w-full md:w-[45%] overflow-hidden rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-muted">
              <span className="text-5xl font-bold text-muted-foreground/30">
                {title.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col justify-between p-6 md:p-8 relative z-10">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              {title}
            </CardTitle>
          </CardHeader>

          <Tabs
            defaultValue="overview"
            value={tab}
            onValueChange={setTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-3 w-full mb-5 bg-white/5 backdrop-blur-md rounded-full p-1 border border-white/10">
              <TabsTrigger
                value="overview"
                className="text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/70 data-[state=active]:to-purple-500/60 rounded-full text-white transition-all"
              >
                <Info className="w-4 h-4 mr-1" /> About
              </TabsTrigger>
              <TabsTrigger
                value="tech"
                className="text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/70 data-[state=active]:to-purple-500/60 rounded-full text-white transition-all"
              >
                <Layers className="w-4 h-4 mr-1" /> Tech
              </TabsTrigger>
              <TabsTrigger
                value="features"
                className="text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/70 data-[state=active]:to-purple-500/60 rounded-full text-white transition-all"
              >
                <CheckCircle2 className="w-4 h-4 mr-1" /> Features
              </TabsTrigger>
            </TabsList>

            {/* About Tab */}
            <TabsContent value="overview">
              <p className="text-sm md:text-base text-muted-foreground/90 leading-relaxed">
                {description}
              </p>
            </TabsContent>

            {/* Tech Tab */}
            <TabsContent value="tech">
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-xs px-3 py-1 bg-gradient-to-r from-primary/20 to-purple-400/20 border-primary/30 text-white"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
             
            </TabsContent>

            {/* Features Tab */}
            <TabsContent value="features" className="flex flex-wrap">
              {features.length > 0 ? (
                <ul className="space-y-2 text-sm md:text-base text-muted-foreground/90">
                  {features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-2"
                    >
                      <span className="text-primary mt-0.5">✦</span>
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <p className="italic text-muted-foreground text-sm">
                  No features listed.
                </p>
              )}
            </TabsContent>
          </Tabs>

          <CardFooter className="p-0 mt-6">
        <div className="flex gap-2 mt-4">
                {github && (
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="bg-white/5 border-white/10 hover:bg-white/10 text-white"
                  >
                    <a href={github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-1" /> GitHub
                    </a>
                  </Button>
                )}
                {demo && (
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="bg-white/5 border-white/10 hover:bg-white/10 text-white"
                  >
                    <a href={demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-1" /> Live Demo
                    </a>
                  </Button>
                )}
              </div>
          </CardFooter>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
