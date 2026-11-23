/**
 * All editable portfolio content lives here.
 * Update text, links and images in this file — the sections read from it.
 */
import type { LucideIcon } from "lucide-react";
import {
  Atom,
  Blocks,
  Bug,
  Code2,
  Component,
  Cpu,
  FileCode2,
  Gauge,
  Github,
  Globe,
  Home,
  Layers,
  LayoutTemplate,
  Linkedin,
  Mail,
  MessageSquare,
  MonitorSmartphone,
  Palette,
  Plug,
  Puzzle,
  Rocket,
  Server,
  ShieldCheck,
  Sparkles,
  Square,
  User,
  Wand2,
  Wrench,
  Briefcase,
  Newspaper,
  Facebook,
  Instagram,
  Brain,
  Award,
  Zap,
} from "lucide-react";

import heroPortrait from "@/assets/hero-portrait-cutout.webp";
import avatar from "@/assets/avatar.webp";
import aboutImage from "@/assets/about.webp";
import workspaceImage from "@/assets/workspace.webp";
import pWordpress from "@/assets/projects/wordpress-business.webp";
import pPlugin from "@/assets/projects/wp-plugin.webp";
import pReact from "@/assets/projects/react-saas.webp";
import pPhp from "@/assets/projects/php-booking.webp";
import pSquarespace from "@/assets/projects/squarespace-studio.webp";
import pWix from "@/assets/projects/wix-restaurant.webp";
import pCrm from "@/assets/projects/crm-dashboard.webp";
import bWordpress from "@/assets/blog/wordpress.webp";
import bReact from "@/assets/blog/react-next.webp";
import bPhp from "@/assets/blog/php.webp";
import bOptimization from "@/assets/blog/optimization.webp";
import bSquarespace from "@/assets/blog/squarespace-wix.webp";
import bTips from "@/assets/blog/tips.webp";

export const images = { heroPortrait, avatar, aboutImage, workspaceImage };

export const profile = {
  name: "Rahul Baishnab",
  firstName: "Rahul",
  initials: "RB",
  title: "Senior-Level Full-Stack Web Developer",
  experience: "2+ Years",
  email: "rahulwp24@gmail.com",
  phone: "+880 1314-052672",
  phoneHref: "tel:+8801314052672",
  availability: "Available for new projects",
  shortIntro:
    "Full-Stack Web Developer building modern websites, custom WordPress solutions and web applications with React, Next.js, PHP, Squarespace and Wix.",
};

export type SocialLink = { label: string; href: string; icon: LucideIcon };

// TODO: replace these with your real profile URLs.
export const socials: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: Linkedin },
  { label: "Facebook", href: "https://www.facebook.com/", icon: Facebook },
  { label: "Instagram", href: "https://www.instagram.com/", icon: Instagram },
];

export type NavItem = { id: string; label: string; icon: LucideIcon };

export const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "services", label: "Services", icon: Briefcase },
  { id: "skills", label: "Skills", icon: Cpu },
  { id: "portfolio", label: "Portfolio", icon: Layers },
  { id: "experience", label: "Experience", icon: Award },
  { id: "blog", label: "Blog", icon: Newspaper },
  { id: "contact", label: "Contact", icon: MessageSquare },
];

export const hero = {
  greeting: "Hello,",
  rotatingTitles: ["Full-Stack Developer", "WordPress Engineer", "React & Next.js Dev", "PHP Developer"],
  paragraphs: [
    "I build modern websites, powerful web applications, and custom digital solutions using React, Next.js, PHP, WordPress, Squarespace, and Wix.",
    "I turn complex ideas into scalable, responsive, and high-performing digital experiences.",
  ],
  bigTextTop: "FULL STACK",
  bigTextBottom: "DEVELOPER",
};

export const about = {
  eyebrow: "About Me",
  heading: "Building Digital Experiences Through Code & Creativity",
  paragraphs: [
    "I am a Full-Stack Web Developer with 2+ years of professional experience in modern web technologies and CMS development.",
    "My expertise includes React, Next.js, PHP, advanced WordPress development, custom plugin engineering, Elementor, Divi, Gutenberg, Squarespace, and Wix.",
    "I enjoy solving challenging technical problems and building solutions that combine beautiful design with powerful functionality.",
    "My approach focuses on quality, performance, maintainability, and user experience.",
  ],
  highlights: ["Clean, maintainable code", "Performance-focused builds", "Responsive on every device", "Clear client communication"],
};

export type Service = { title: string; description: string; icon: LucideIcon };

export const services: Service[] = [
  { title: "Frontend Development", icon: MonitorSmartphone, description: "Responsive, pixel-precise interfaces built with React, Next.js, JavaScript, HTML5 and CSS3 — fast, accessible and polished on every screen." },
  { title: "Full-Stack Web Development", icon: Server, description: "End-to-end web applications with clean frontends, PHP backends, API integrations, custom business logic and database-driven features." },
  { title: "WordPress Development", icon: Globe, description: "Professional WordPress websites that are easy to manage, secure, scalable and tailored exactly to how your business works." },
  { title: "Custom WordPress Plugin Development", icon: Plug, description: "Purpose-built plugins that add the exact functionality you need — from admin tools and integrations to CRM-style features." },
  { title: "WordPress Theme Development", icon: LayoutTemplate, description: "Custom themes coded from scratch or extended from a solid base, with Gutenberg blocks and a clean editing experience." },
  { title: "Elementor & Divi Development", icon: Wand2, description: "Advanced page-builder layouts, custom widgets and modules, and fixes for complex Elementor and Divi builds." },
  { title: "Squarespace Development", icon: Square, description: "Advanced Squarespace customization with custom JavaScript and CSS to unlock layouts and features beyond the defaults." },
  { title: "Wix Development", icon: Sparkles, description: "Wix websites with Velo-powered custom functionality, third-party integrations and fully responsive designs." },
  { title: "Custom PHP Development", icon: FileCode2, description: "Custom PHP functionality, forms, dashboards and integrations written to be secure, efficient and easy to maintain." },
  { title: "Website Bug Fixing & Optimization", icon: Bug, description: "Fast diagnosis of broken layouts, errors and conflicts, plus speed and performance optimization for a smoother site." },
];

export type SkillGroup = { title: string; icon: LucideIcon; skills: string[] };

export const skillGroups: SkillGroup[] = [
  { title: "Frontend Development", icon: Atom, skills: ["React.js", "Next.js", "JavaScript", "HTML5", "CSS3", "Responsive Web Design", "Modern UI/UX Implementation"] },
  { title: "Backend Development", icon: Server, skills: ["PHP", "Backend Development", "API Integration", "Custom Business Logic", "Database-Driven Applications"] },
  { title: "WordPress Development", icon: Globe, skills: ["Advanced Plugin Development", "Custom Theme Development", "Elementor Development", "Divi Builder", "Gutenberg Block Development", "Custom PHP Development", "WordPress CRM Development", "Custom WordPress Functionality"] },
  { title: "Squarespace Development", icon: Square, skills: ["Advanced Squarespace Customization", "Custom JavaScript Development", "Custom CSS", "Advanced Website Functionality", "Responsive Design Customization"] },
  { title: "Wix Development", icon: Sparkles, skills: ["Wix Website Development", "Wix Velo", "Custom Functionality", "Third-Party Integrations", "Responsive Website Development"] },
  { title: "Professional Strengths", icon: Brain, skills: ["Advanced Problem Solving", "Complex Bug Fixing", "Technical Troubleshooting", "Website Optimization", "Performance Optimization", "Custom Development Solutions", "Client Communication", "Project Management"] },
];

export const techBadges: { name: string; icon: LucideIcon }[] = [
  { name: "React", icon: Atom },
  { name: "Next.js", icon: Rocket },
  { name: "JavaScript", icon: Code2 },
  { name: "PHP", icon: FileCode2 },
  { name: "WordPress", icon: Globe },
  { name: "Elementor", icon: Component },
  { name: "Divi", icon: Palette },
  { name: "Gutenberg", icon: Blocks },
  { name: "Squarespace", icon: Square },
  { name: "Wix", icon: Sparkles },
  { name: "HTML5", icon: LayoutTemplate },
  { name: "CSS3", icon: Puzzle },
];

export const projectCategories = [
  "WordPress Development",
  "Custom WordPress Plugins",
  "React & Next.js Applications",
  "PHP Development",
  "Squarespace Projects",
  "Wix Projects",
  "CRM & Business Solutions",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type Project = {
  title: string;
  category: ProjectCategory;
  image: string;
  stack: string[];
  description: string;
  details: string[];
  /** Set to your real live URL to enable the Live Preview link. */
  liveUrl?: string;
  /** Sample work shown until real projects are added. */
  isSample: boolean;
};

// Sample showcase pieces — replace with your real projects and screenshots.
export const projects: Project[] = [
  { title: "Corporate Business Website", category: "WordPress Development", image: pWordpress, stack: ["WordPress", "Custom Theme", "PHP", "Gutenberg"], description: "A sample multi-page business website with a custom theme, reusable blocks and an easy-to-edit blog.", details: ["Custom theme built for fast editing", "Reusable Gutenberg blocks for services and case studies", "Responsive layouts and performance-minded assets"], isSample: true },
  { title: "Plugin Settings Dashboard", category: "Custom WordPress Plugins", image: pPlugin, stack: ["WordPress", "PHP", "JavaScript", "REST API"], description: "A sample custom plugin with a modern admin dashboard, feature toggles, activity logs and data overview.", details: ["Tabbed settings with secure option storage", "Activity log table and summary widgets", "Built on WordPress hooks and the REST API"], isSample: true },
  { title: "SaaS Analytics Application", category: "React & Next.js Applications", image: pReact, stack: ["Next.js", "React", "TypeScript", "API Integration"], description: "A sample analytics web app with responsive dashboards, charts and a mobile-friendly layout.", details: ["Reusable React component architecture", "Charts and KPI cards fed by an API", "Fully responsive desktop and mobile views"], isSample: true },
  { title: "Booking & Reservation System", category: "PHP Development", image: pPhp, stack: ["PHP", "MySQL", "JavaScript", "HTML5/CSS3"], description: "A sample booking system with date and time-slot selection plus an admin reservations manager.", details: ["Calendar booking with available time slots", "Admin list with status management", "Validated forms and database-driven logic"], isSample: true },
  { title: "Creative Studio Website", category: "Squarespace Projects", image: pSquarespace, stack: ["Squarespace", "Custom CSS", "Custom JavaScript"], description: "A sample editorial studio site with custom gallery behaviour and refined typography on Squarespace.", details: ["Custom CSS for an editorial layout", "JavaScript-enhanced gallery interactions", "Tuned for tablet and mobile"], isSample: true },
  { title: "Restaurant Ordering Website", category: "Wix Projects", image: pWix, stack: ["Wix", "Wix Velo", "Integrations"], description: "A sample restaurant website with a filterable menu and an online ordering cart built with Wix Velo.", details: ["Filterable menu powered by Velo", "Order cart with custom functionality", "Responsive mobile ordering experience"], isSample: true },
  { title: "Sales CRM Dashboard", category: "CRM & Business Solutions", image: pCrm, stack: ["WordPress", "PHP", "JavaScript", "Custom CRM"], description: "A sample CRM solution with a sales pipeline, client management and revenue reporting.", details: ["Kanban-style sales pipeline", "Client list with segments and status", "Reporting widgets for revenue insights"], isSample: true },
];

export const experience = {
  eyebrow: "Experience",
  heading: "My Professional Journey",
  intro: "Two-plus years of hands-on work across modern frontend, backend and CMS development — focused on solving real problems for real clients.",
  role: "Full-Stack Web Developer",
  duration: "2+ Years of Professional Experience",
  responsibilities: [
    "Developing modern websites and web applications.",
    "Building custom WordPress plugins and themes.",
    "Developing custom PHP functionality.",
    "Working with React and Next.js.",
    "Customizing Squarespace and Wix websites.",
    "Solving complex development issues.",
    "Improving website performance and responsiveness.",
    "Delivering client-focused digital solutions.",
  ],
  focusAreas: [
    { title: "Websites & Web Applications", tag: "React · Next.js · PHP", text: "Developing modern websites and web applications, including React and Next.js builds with custom PHP functionality." },
    { title: "WordPress Engineering", tag: "Plugins · Themes", text: "Building custom WordPress plugins and themes, and extending Elementor, Divi and Gutenberg with custom features." },
    { title: "Squarespace & Wix", tag: "Custom Code", text: "Customizing Squarespace and Wix websites with custom JavaScript, CSS and Wix Velo functionality." },
    { title: "Quality & Performance", tag: "Debugging · Speed", text: "Solving complex development issues and improving website performance and responsiveness for client-focused results." },
  ],
};

export const whyMe: { title: string; text: string; icon: LucideIcon }[] = [
  { title: "2+ Years of Professional Experience", text: "Hands-on experience delivering websites and web applications for clients.", icon: Award },
  { title: "Full-Stack Development Skills", text: "Comfortable across the frontend, backend and everything in between.", icon: Layers },
  { title: "Advanced WordPress Expertise", text: "Custom plugins, themes, Gutenberg blocks and page-builder development.", icon: Globe },
  { title: "Strong Problem-Solving Ability", text: "Complex bugs and tricky requirements are where I do my best work.", icon: Brain },
  { title: "Custom Development Solutions", text: "Functionality built around your needs, not limited by templates.", icon: Wrench },
  { title: "Responsive & Performance-Focused", text: "Fast-loading sites that look and work great on every device.", icon: Gauge },
];

export type Plan = { name: string; tagline: string; features: string[]; featured?: boolean };

export const plans: Plan[] = [
  { name: "Starter", tagline: "For a focused single page", features: ["Landing Page Development", "Responsive Design", "Basic Functionality"] },
  { name: "Professional", tagline: "For growing businesses", features: ["Business Website Development", "CMS Customization", "Custom Functionality", "Performance Optimization"], featured: true },
  { name: "Advanced", tagline: "For complex builds", features: ["Full-Stack Development", "Custom WordPress Solutions", "Advanced Integrations", "Complex Web Applications"] },
];

export type BlogPost = { title: string; category: string; image: string; excerpt: string };

// Placeholder articles — replace with real posts when they are published.
export const blogPosts: BlogPost[] = [
  { title: "Building Custom WordPress Plugins the Right Way", category: "WordPress Development", image: bWordpress, excerpt: "Hooks, structure and security practices for plugins that stay maintainable." },
  { title: "When to Choose Next.js for Your Next Web Project", category: "React & Next.js", image: bReact, excerpt: "A practical look at rendering options, routing and performance." },
  { title: "Writing Clean, Secure PHP for Modern Websites", category: "PHP Development", image: bPhp, excerpt: "Validation, sanitization and code organization tips for PHP projects." },
  { title: "Simple Wins That Make Any Website Load Faster", category: "Website Optimization", image: bOptimization, excerpt: "Images, caching and script loading — the changes that matter most." },
  { title: "Pushing Squarespace & Wix Beyond Their Defaults", category: "Squarespace & Wix", image: bSquarespace, excerpt: "How custom code and Velo unlock features templates can't offer." },
  { title: "Web Development Habits That Save Hours Every Week", category: "Web Development Tips", image: bTips, excerpt: "Small workflow improvements that add up across every project." },
];

export const contact = {
  eyebrow: "Get In Touch",
  heading: "Have a Project in Mind? Let's Build Something Amazing.",
  description:
    "I'm always interested in discussing new projects, creative ideas, and opportunities to build something valuable.",
};

export const footerServices = [
  "WordPress Development",
  "Custom Plugin Development",
  "React & Next.js",
  "Custom PHP Development",
  "Squarespace & Wix",
  "Bug Fixing & Optimization",
];

export const contactIcons = { Mail, Zap, ShieldCheck };
