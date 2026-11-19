export type Project = {
  number: string;
  category: string;
  title: string;
  summary: string;
  details: string;
  tags: string[];
  visual: "vision" | "ai" | "imu";
  link?: { href: string; label: string };
};

// Content checked against the current public jasper repository on 2026-11-20.
export const projects: Project[] = [
  {
    number: "01", category: "COMPUTER VISION · FREELANCE", title: "Computer vision & automation",
    summary: "Practical software shaped around the people using it.",
    details: "Delivered customized automation and computer vision solutions to more than 300 users.",
    tags: ["Computer vision", "Automation", "OpenCV"], visual: "vision",
  },
  {
    number: "02", category: "APPLIED AI · FREELANCE", title: "GPT-based tool integrations",
    summary: "Small, useful AI connections inside familiar workflows.",
    details: "Integrated GPT-based tools to support data processing and improve user experience.",
    tags: ["GPT integration", "Data processing", "UX"], visual: "ai",
  },
  {
    number: "03", category: "ENGINEERING SOFTWARE · NTU", title: "IMU data collection GUI",
    summary: "A clear interface for collecting inertial measurement data.",
    details: "Built a graphical interface setup for IMU data collection as part of a Mechanical Engineering final-year project.",
    tags: ["GUI", "Data collection", "Engineering"], visual: "imu",
    link: { href: "https://youtube.com/shorts/RctI3QtQyas?feature=share", label: "Watch the project demo" },
  },
];

export const experience = [
  { period: "SEP 2026 — NOW", organization: "AI Singapore", role: "AI Apprentice", detail: "Hands-on AI and machine-learning projects, from data preparation and model development through deployment.", current: true },
  { period: "JUL — AUG 2026", organization: "Gericke Pte Ltd", role: "Project Engineer", detail: "Supported equipment design, project coordination, procurement and commissioning.", current: false },
  { period: "JAN 2024 — MAY 2026", organization: "Freelance", role: "Software Developer", detail: "Built automation, computer-vision applications, bots and GPT-based integrations.", current: false },
  { period: "MAY — JUL 2024", organization: "QuikBot Technologies", role: "Engineer Intern", detail: "Deployed mobile robots and IoT systems, and supported setup, calibration and diagnostics.", current: false },
  { period: "JUL 2021 — JUL 2023", organization: "Singapore Armed Forces", role: "Transport Operator · Lance Corporal", detail: "Operated heavy vehicles and served as an ambulance driver for National Day Parade and Mandai Hill Camp.", current: false },
  { period: "SEP 2020 — FEB 2021", organization: "Rotork Controls Singapore", role: "Workshop Engineer Intern", detail: "Installed and tested actuators, supported calibration, and prepared project schedules and reports.", current: false },
];

export const skills = [
  { title: "Programming & software", items: ["Python", "C++", "Object-oriented design", "API development", "Git", "Testing & debugging"] },
  { title: "AI, ML & vision", items: ["Machine learning", "LLMs", "OpenCV", "Computer vision", "GPT integrations"] },
  { title: "Data & systems", items: ["SQL", "MySQL", "Tableau", "Automation", "ROS", "IoT"] },
  { title: "Engineering", items: ["Intelligent manufacturing", "Engineering design", "Robotics"] },
];

export const interests = ["NTU Windsurfer", "DJ · Mandopop / techno / hardstyle", "Volleyball", "Badminton"];

export const sideProjects = [
  { name: "SG Everyday Deals", detail: "Useful everyday finds, shared with a Telegram community.", href: "https://t.me/SGEverydayDeals", label: "Visit Telegram" },
  { name: "J3 Studio Squishy Store", detail: "A playful little shop for squishy finds and collectibles.", href: "https://t.me/j3studioo", label: "Visit Telegram" },
];
