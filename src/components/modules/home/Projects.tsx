import ProjectCard from "@/components/shared/ProjectCard";
import { IProject } from "@/interfaces";
import { fetchWithTag } from "@/lib/fetchWithTag";

const Projects = async () => {
  const url = `/project`;
  const result = await fetchWithTag<IProject | IProject[]>(url, { tag: "project" });

  // Normalize data to always be an array
  let projects: IProject[] = [];
  if (result?.data) {
    projects = Array.isArray(result.data) ? result.data : [result.data];
  }

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Soft Gradient Background Glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-24 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-primary via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Projects
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            A showcase of my latest work — blending creativity, code, and clean design.
          </p>
        </div>

        {/* Projects Grid */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 gap-10 max-w-6xl mx-auto">
            {projects.map((project: IProject) => (
              <div key={project._id}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 mt-10">No projects available yet.</p>
        )}
      </div>
    </section>
  );
};

export default Projects;
