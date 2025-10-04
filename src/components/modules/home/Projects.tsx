"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ProjectCard from "@/components/shared/ProjectCard";

gsap.registerPlugin(ScrollTrigger);

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  image?: string;
  github?: string;
  demo?: string;
  features: string[];
  challenges: string[];
}

export const projectsData: Project[] = [
  {
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce platform with real-time inventory and payment processing.",
    longDescription:
      "Built a comprehensive e-commerce solution featuring real-time inventory management, secure payment processing with Stripe, and an intuitive admin dashboard. The platform handles thousands of concurrent users with seamless performance.",
    tags: ["React", "Node.js", "MongoDB", "Stripe", "Redis"],
    image:
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
    github: "https://github.com",
    demo: "https://demo.com",
    features: [
      "Real-time inventory tracking",
      "Secure payment gateway integration",
      "Advanced search and filtering",
      "Admin dashboard with analytics",
      "Email notifications",
      "Responsive design",
    ],
    challenges: [
      "Implementing real-time inventory synchronization across multiple warehouses",
      "Optimizing database queries for complex product searches",
      "Handling concurrent payment transactions securely",
    ],
  },
  {
    id: "task-management-app",
    title: "Task Management App",
    description:
      "A collaborative task management tool with team workspaces and real-time updates.",
    longDescription:
      "Developed a powerful task management application that enables teams to collaborate effectively with real-time updates, drag-and-drop functionality, and intelligent task prioritization algorithms.",
    tags: ["TypeScript", "React", "Firebase", "Tailwind CSS"],
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    github: "https://github.com",
    features: [
      "Real-time collaboration",
      "Drag-and-drop task boards",
      "Team workspaces",
      "Task priority automation",
      "File attachments",
      "Activity timeline",
    ],
    challenges: [
      "Implementing conflict resolution for concurrent edits",
      "Optimizing real-time sync performance",
      "Building an intuitive drag-and-drop interface",
    ],
  },
  {
    id: "ai-content-generator",
    title: "AI Content Generator",
    description:
      "An AI-powered content generation tool using GPT-4 for marketing copy and blog posts.",
    longDescription:
      "Created an innovative AI-powered platform that generates high-quality marketing copy, blog posts, and social media content. Integrated with GPT-4 API and built custom prompt engineering logic for optimal results.",
    tags: ["Next.js", "OpenAI", "PostgreSQL", "TailwindCSS"],
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    demo: "https://demo.com",
    features: [
      "Multiple content types (blogs, ads, social)",
      "Custom tone and style settings",
      "SEO optimization suggestions",
      "Content history and templates",
      "Multi-language support",
      "Export to various formats",
    ],
    challenges: [
      "Fine-tuning prompts for consistent quality",
      "Managing API rate limits and costs",
      "Building an intuitive content editing interface",
    ],
  },
  {
    id: "analytics-dashboard",
    title: "Analytics Dashboard",
    description:
      "A comprehensive analytics dashboard with real-time data visualization and insights.",
    longDescription:
      "Designed and developed a powerful analytics dashboard that processes millions of data points to provide actionable insights. Features interactive charts, custom reporting, and predictive analytics.",
    tags: ["React", "D3.js", "Python", "FastAPI", "PostgreSQL"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    github: "https://github.com",
    demo: "https://demo.com",
    features: [
      "Real-time data visualization",
      "Custom report builder",
      "Predictive analytics",
      "Export and sharing",
      "Role-based access control",
      "API integrations",
    ],
    challenges: [
      "Processing large datasets efficiently",
      "Creating performant real-time visualizations",
      "Building flexible report customization",
    ],
  },
];

const Projects = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray(".project-card");

    gsap.fromTo(
      cards,
      { opacity: 0, y: 60, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section className="relative py-20">
      {/* background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold mb-4 gradient-text">Projects</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work and side projects
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          {projectsData.map((project) => (
            <div key={project.id} className="project-card" style={{ opacity: 0 }}>
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
