"use client"
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { Instagram, Linkedin, Github, Mail, Phone } from "lucide-react";
import { navItems } from "@/lib/Items";

const Footer = () => {
  return (
    <footer className="relative z-10 overflow-hidden bg-surface-1 text-white border-t border-white/10">
      {/* Neon gradient overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-primary/20 via-accent/10 to-secondary/20 opacity-30 animate-pulse" />

      <div className="relative z-20 container mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
        {/* Left: Brand + CTA */}
        <div className="space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-gradient"
          >
            Let’s build something unforgettable.
          </motion.h2>
          <p className="text-muted-foreground">
            Available for freelance, collaborations, or just a good convo about code and design.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button asChild variant="default" className="animate-glow border border-primary/40">
              <a href="https://wa.me/+8801760000000" target="_blank" rel="noopener noreferrer">
                WhatsApp Me
              </a>
            </Button>
            <Button asChild variant="outline" className="hover:bg-secondary/10">
              <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </Button>
          </div>
        </div>

        {/* Right: Navigation + Info */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-sm">
          <div>
            <h4 className="text-white/90 font-semibold mb-3">Explore</h4>
            <ul className="space-y-2">
              {navItems.map((item, i) => (
                <li key={i}>
                  <Link href={item.href} className="hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white/90 font-semibold mb-3">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-white/70">
                <Phone className="w-4 h-4" /> +88017XXXXXXXX
              </li>
              <li className="flex items-center gap-2 text-white/70">
                <Mail className="w-4 h-4" /> faysal@email.com
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white/90 font-semibold mb-3">Socials</h4>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com/in/your-profile"
                target="_blank"
                className="text-white/70 hover:text-primary transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/your-handle"
                target="_blank"
                className="text-white/70 hover:text-primary transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/yourhandle"
                target="_blank"
                className="text-white/70 hover:text-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-white/10 text-center py-4 text-xs text-white/60 backdrop-blur-sm">
        &copy; {new Date().getFullYear()} All rights reserved by <span className="text-primary">Faysal Sarker</span>.
      </div>
    </footer>
  );
};

export default Footer;