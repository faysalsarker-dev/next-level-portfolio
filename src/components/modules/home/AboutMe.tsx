"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const aboutItems = [
  {
    type: "intro",
    title: "Who I Am",
    content:
      "I'm Faysal, a full-stack developer specializing in modern web applications. Passionate about UI/UX, animations, and clean code.",
    color: "bg-purple-500/30",
  },
  {
    type: "skills",
    title: "Skills",
    content: "React, Next.js, Node.js, Express, MongoDB, TailwindCSS, GSAP, Framer Motion",
    color: "bg-blue-500/30",
  },
  {
    type: "experience",
    title: "Experience",
    content: "3+ years in web development, freelancing and professional projects",
    color: "bg-green-500/30",
  },
  {
    type: "image",
    title: "Me",
    image: "https://images.unsplash.com/photo-1603415526960-f49e0c7b65d6?w=400&q=80",
    color: "bg-pink-500/30",
  },
  {
    type: "hobbies",
    title: "Hobbies",
    content: "Gaming, Fitness, Open Source Contributions, Learning new tech",
    color: "bg-yellow-500/30",
  },
];

const AboutMe = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray(".about-card");

    gsap.fromTo(
      cards,
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section className="relative py-24">
      {/* Background glow / before & after effect */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-aurora"></div>
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-aurora"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold gradient-text">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mt-4">
            Learn more about who I am, my skills, experience, and interests
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-6 gap-6 auto-rows-fr"
        >
          {aboutItems.map((item, index) => (
            <div
              key={index}
              className={`about-card relative group rounded-2xl p-6 flex flex-col justify-center ${item.color} shadow-lg backdrop-blur-lg border border-white/10 hover:scale-105 transition-transform duration-500 md:col-span-${
                item.type === "image"
                  ? 2
                  : item.type === "intro"
                  ? 3
                  : 2
              } md:row-span-${item.type === "image" ? 2 : 1}`}
            >
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={400}
                  className="rounded-xl object-cover w-full h-full"
                />
              ) : (
                <>
                  <h3 className="text-2xl font-bold mb-2 gradient-text">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.content}</p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
