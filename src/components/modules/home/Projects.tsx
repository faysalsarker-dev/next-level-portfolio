"use client";

import { motion } from "framer-motion";
import ProjectCard from "@/components/shared/ProjectCard";
import { IProject } from "@/interfaces";

const projectsData: IProject[] = [
  {
    _id: "ecommerce-platform",
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce platform with real-time inventory and payment processing.",
    thumbnail:
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
    githubLink: "https://github.com",
    liveSite: "https://demo.com",
    features: [
      "Real-time inventory tracking",
      "Secure payment gateway integration",
      "Advanced search and filtering",
      "Admin dashboard with analytics",
      "Email notifications",
      "Responsive design",
    ],
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "Redis"],
  },
  {
    _id: "task-management-app",
    title: "Task Management App",
    description:
      "A collaborative task management tool with team workspaces and real-time updates.",
    thumbnail:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    githubLink: "https://github.com",
    features: [
      "Real-time collaboration",
      "Drag-and-drop task boards",
      "Team workspaces",
      "Task priority automation",
      "File attachments",
      "Activity timeline",
    ],
    technologies: ["TypeScript", "React", "Firebase", "Tailwind CSS"],
  },
  {
    _id: "ai-content-generator",
    title: "AI Content Generator",
    description:
      "An AI-powered content generation tool using GPT-4 for marketing copy and blog posts.",
    thumbnail:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    liveSite: "https://demo.com",
    features: [
      "Multiple content types (blogs, ads, social)",
      "Custom tone and style settings",
      "SEO optimization suggestions",
      "Content history and templates",
      "Multi-language support",
      "Export to various formats",
    ],
    technologies: ["Next.js", "OpenAI", "PostgreSQL", "TailwindCSS"],
  },
  {
    _id: "analytics-dashboard",
    title: "Analytics Dashboard",
    description:
      "A comprehensive analytics dashboard with real-time data visualization and insights.",
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    githubLink: "https://github.com",
    liveSite: "https://demo.com",
    features: [
      "Real-time data visualization",
      "Custom report builder",
      "Predictive analytics",
      "Export and sharing",
      "Role-based access control",
      "API integrations",
    ],
    technologies: ["React", "D3.js", "Python", "FastAPI", "PostgreSQL"],
  },
];

const Projects = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Soft Gradient Background Glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-24 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-primary via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Projects
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            A showcase of my latest work — blending creativity, code, and clean
            design.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 gap-10 max-w-6xl mx-auto"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {projectsData.map((project) => (
            <motion.div
              key={project._id}
              variants={{
                hidden: { opacity: 0, y: 40 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
 












