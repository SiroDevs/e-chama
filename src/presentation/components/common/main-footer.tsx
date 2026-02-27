"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GitHubLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { Button } from "../ui";
import { AppIcon } from "./app-icon";

export default function MainFooter() {
  const year = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Twitter",
      href: "https://x.com/sirofitske",
      icon: TwitterLogoIcon,
    },
    {
      name: "GitHub",
      href: "https://github.com/sirodevs",
      icon: GitHubLogoIcon,
    },
  ];

  return (
    <footer className="w-full bg-card">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center space-y-6"
        >
          <AppIcon />
          <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-muted-foreground">
            <span>© {year} eChama</span>
            <span className="hidden sm:inline">•</span>
            <span className="font-medium">#ChamaMadeEasy</span>
            <span className="hidden sm:inline">•</span>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <Button
                  key={social.name}
                  asChild
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full hover:bg-muted/50"
                >
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                  >
                    <social.icon className="h-4 w-4" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
