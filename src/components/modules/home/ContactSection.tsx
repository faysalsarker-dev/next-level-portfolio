'use client';

import React, { useRef } from "react";
import { MessageSquareText, SendHorizonal } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactSection = () => {
  const msgBoxRef = useRef(null);
  const formRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const btnRef = useRef(null);
  const flyIconRef = useRef(null);

  // Soft glowing pulse on message box
  useGSAP(() => {
    const glowTl = gsap.timeline({ repeat: -1, delay: 0.5 });
    glowTl.to(msgBoxRef.current, {
      boxShadow: "0 0 25px 5px var(--color-primary)",
      duration: 1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    });
  }, []);

  const handleMsgClick = () => {
    nameRef.current?.focus();
    formRef.current?.scrollIntoView({ behavior: "smooth" });

    gsap.fromTo(
      formRef.current,
      { borderColor: "#15101E" },
      {
        borderColor: "#782EFA",
        duration: 0.6,
        repeat: 1,
        yoyo: true,
        ease: "power2.out",
      }
    );
  };

  // Improved fly animation for Send button
  const handleSendClick = () => {
    if (flyIconRef.current) {
      const icon = flyIconRef.current;

      // Create a glowing trail effect
      gsap.fromTo(
        icon,
        {
          opacity: 0,
          x: 0,
          y: 0,
          scale: 1,
          rotate: 0,
          filter: "drop-shadow(0 0 0px rgba(118,44,250,0.8))",
        },
        {
          opacity: 1,
          x: 100,
          y: -60,
          scale: 1.4,
          rotate: 25,
          filter: "drop-shadow(0 0 15px rgba(118,44,250,0.8))",
          duration: 0.9,
          ease: "power3.out",
          onComplete: () => {
            gsap.to(icon, {
              opacity: 0,
              duration: 0.3,
              x: 120,
              y: -80,
              ease: "power1.in",
            });
          },
        }
      );
    }
  };

  return (
    <section className="relative w-full py-20 bg-base text-white px-4 md:px-10 overflow-hidden">
      {/* Neon glows in background */}
      <div className="absolute -top-32 -left-20 w-[400px] h-[400px] bg-[var(--color-primary)] opacity-30 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-20 right-0 w-[300px] h-[300px] bg-[var(--color-accent)] opacity-20 blur-[80px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto mt-12 grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT SIDE */}
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Let’s <span className="text-primary">Connect</span> & Share Our Thoughts
          </h2>
          <p className="text-gray-300 text-lg">
            Whether you have a project idea, need development help, or just want to talk tech — I’d love to hear from you.
          </p>

          {/* Message Box */}
          <div
            ref={msgBoxRef}
            onClick={handleMsgClick}
            className="flex items-center gap-4 bg-popover/80 px-5 py-4 rounded-2xl border border-primary backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] cursor-pointer transition hover:scale-[1.03]"
          >
            <MessageSquareText className="text-primary w-6 h-6 animate-pulse" />
            <span className="text-sm font-medium text-gray-200">
              Let’s connect — tap to start a conversation
            </span>
          </div>

          {/* Skill Tags */}
          <div className="flex flex-wrap gap-3 mt-6">
            {["Full stack Development", "Javascripte", "Clean UI/UX", "Performance Optimization"].map(
              (tag) => (
                <span
                  key={tag}
                  className="bg-white/10 text-gray-300 border border-primary/40 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md hover:bg-primary/10 hover:text-white transition"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>

        {/* RIGHT SIDE — Contact Form */}
        <div
          ref={formRef}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6"
        >
          <form className="space-y-4">
            <Input
              ref={nameRef}
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-lg bg-popover/50 border border-popover text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 rounded-lg bg-popover/50 border border-popover text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Input
              type="text"
              placeholder="Subject"
              className="w-full px-4 py-3 rounded-lg bg-popover/50 border border-popover text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Textarea
              placeholder="Write your message..."
              rows={4}
              className="w-full min-h-[130px] px-4 py-3 rounded-2xl bg-popover/50 border border-popover text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <button
              type="button"
              ref={btnRef}
              onClick={handleSendClick}
              className="relative overflow-hidden bg-primary text-center w-full hover:bg-opacity-90 transition-all text-white font-semibold px-6 py-3 rounded-full flex items-center justify-center gap-2"
            >
              Send Message
              <SendHorizonal className="w-5 h-5" />
              <span
                ref={flyIconRef}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              >
                <SendHorizonal className="text-white w-6 h-6" />
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
