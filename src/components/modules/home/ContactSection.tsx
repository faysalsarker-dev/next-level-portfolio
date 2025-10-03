"use client";
import React, { useRef } from "react";
import { MessageSquareText, SendHorizonal } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ContactSection = () => {
  const msgBoxRef = useRef(null);
  const formRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const btnRef = useRef(null);
  const flyIconRef = useRef(null);

  useGSAP(() => {
    // Enhanced GSAP Light Sweep on the Consultation Box
    const glowTl = gsap.timeline({ repeat: -1, delay: 0.5 });
    glowTl.to(msgBoxRef.current, {
      boxShadow: "0 0 25px 5px var(--color-primary)",
      duration: 1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    });
  }, []);

  const handleConsultClick = () => {
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

  const handleSendClick = () => {
    if (flyIconRef.current) {
      gsap.fromTo(
        flyIconRef.current,
        {
          opacity: 0,
          x: 0,
          y: 0,
          scale: 0.8,
        },
        {
          opacity: 1,
          x: 80,
          y: -40,
          scale: 1.2,
          duration: 1,
          ease: "power3.out",
        }
      );
    }
  };

  return (
    <section className="w-full py-20 bg-base text-foreground px-4 md:px-10 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute -top-32 -left-20 w-[400px] h-[400px] bg-[var(--color-primary)] opacity-30 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-20 right-0 w-[300px] h-[300px] bg-[var(--color-accent)] opacity-20 blur-[80px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto mt-12 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Bring Your Project Ideas to Life with{" "}
            <span className="text-primary">Expert Development</span>
          </h2>
          <p className="text-foreground text-lg">
            From ideation to implementation — I help transform ideas into
            responsive, scalable, and engaging web applications that clients
            love. Let’s chat about how I can help!
          </p>

          <div
            ref={msgBoxRef}
            onClick={handleConsultClick}
            className="flex items-center gap-4 bg-popover/80 px-5 py-4 rounded-2xl border border-primary backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] cursor-pointer transition hover:scale-[1.02]"
          >
            <MessageSquareText className="text-primary w-6 h-6 animate-pulse" />
            <span className="text-sm font-medium text-foreground">
              Get a free consultation — no strings attached
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-3 mt-6">
            {["Project Strategy", "Custom Web Solutions", "Clean UI/UX", "MERN Stack Expertise"].map(
              (tag) => (
                <span
                  key={tag}
                  className="bg-white/10 text-foreground border border--primary px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md hover:bg--primary/10 transition"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>

        {/* Form */}
        <div
          ref={formRef}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6"
        >
          <form className="space-y-4">
            <input
              ref={nameRef}
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-lg bg-[--color-surface-2] border border-[--color-surface-2] text-[--color-text-main] focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 rounded-lg bg-[--color-surface-2] border border-[--color-surface-2] text-[--color-text-main] focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="text"
              placeholder="WhatsApp (optional)"
              className="w-full px-4 py-3 rounded-lg bg-[--color-surface-2] border border-[--color-surface-2] text-[--color-text-main] focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <textarea
              placeholder="How can I help you?"
              rows={4}
              className="w-full px-4 py-3 rounded-2xl bg-[--color-surface-2] border border-[--color-surface-2] text-[--color-text-main] focus:outline-none focus:ring-2 focus:ring-primary"
            ></textarea>

            <button
              type="button"
              ref={btnRef}
              onClick={handleSendClick}
              className="relative overflow-hidden bg-primary text-center w-full hover:bg-opacity-90 transition-all text-white font-semibold px-6 py-3 rounded-full flex items-center gap-2"
            >
              Send Message
              <SendHorizonal className="w-5 h-5" />
              <span
                ref={flyIconRef}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
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