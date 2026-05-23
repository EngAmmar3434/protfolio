export const profile = {
  fullName: "Ammar Mohammed Bashar Hafez",
  displayName: "Ammar Hafez",
  email: 'engammarhafez@gmail.com',
  title: "Computer Engineering Student",
  intro:
    "Second-year Computer Engineering student at King Khalid University with a 5.0/5.0 GPA, focused on AI, machine learning, embedded systems, and robotics.",
  location: "Riyadh, Saudi Arabia",
};

export const navigationLinks = [
  { label: "Core", href: "#home" },
  { label: "Proof", href: "#proof" },
  { label: "Projects", href: "#projects" },
  { label: "Domains", href: "#domains" },
  { label: "Awards", href: "#achievements" },
  { label: "Vault", href: "#certificates" },
  { label: "Trajectory", href: "#trajectory" },
];

export const navigationContent = {
  brand: "Engineering Lab",
  mark: "AH",
  contactLabel: "Contact",
  mobileContactLabel: "Contact / CV",
};

export const sectionContent = {
  hero: {
    eyebrow: "Hidden engineering lab",
    activeEvidenceLabel: "Active evidence",
    ringIndexLabel: "ring index",
  },
  proof: {
    eyebrow: "Proof console",
    title: "Evidence before adjectives.",
    intro:
      "Compact CV-backed signals: GPA, certificates, award placements, and hackathon scale.",
  },
  projects: {
    eyebrow: "Selected projects",
    title: "Case files, not cards.",
    intro:
      "Each project is shown as a CV-backed engineering case file: problem, system, stack, and outcome.",
    problemLabel: "Problem",
    systemLabel: "System",
    stackLabel: "Stack and outcome",
  },
  domains: {
    eyebrow: "Technical domains",
    title: "The lab is multi-disciplinary.",
    intro:
      "Technical domains are grouped from the verified CV skills, without unsupported skill bars or claims.",
  },
  achievements: {
    eyebrow: "Achievements + hackathons",
    title: "Gold only when earned.",
    intro:
      "Awards are treated as public proof from competitions, hackathons, and research recognition listed in the CV.",
  },
  certificates: {
    eyebrow: "Certificates vault",
    title: "Verification, not wallpaper.",
    intro:
      "The PDFs verify 8 Coursera certificates and 1 KAUST Academy AI certificate.",
    panelEyebrow: "Access layer",
    panelTitle: "Documents behind the work.",
  },
  trajectory: {
    eyebrow: "Technical trajectory",
    title: "The direction is part of the proof.",
    intro:
      "Education, research collaboration, and professional activities are shown exactly as verified in the CV.",
  },
  contact: {
    eyebrow: "Contact / CV",
    primaryAction: "Email",
    optionalActions: {
      linkedin: "LinkedIn",
      github: "GitHub",
      cv: "CV",
    },
  },
};

export const heroModules = [
  {
    id: "ai-ml",
    icon: "Brain",
    label: "AI/ML",
    eyebrow: "Module 01",
    title: "AI and machine learning",
    railTitle: "Model-driven systems",
    description:
      "The CV focus is AI and machine learning, with TensorFlow, PyTorch, Scikit-learn, deep learning, computer vision, and DRL listed as technical skills.",
    proof: "AI/ML skills plus KKU Athlete-Intelligence AI Hackathon project",
    metric: "4th",
    metricLabel: "AI hackathon",
    energy: "rgba(86, 215, 255, 0.46)",
  },
  {
    id: "research",
    icon: "Atom",
    label: "Research",
    eyebrow: "Module 02",
    title: "Computer vision research",
    railTitle: "HVAC optimization",
    description:
      "Published research integrates Computer Vision with Deep Reinforcement Learning for HVAC energy optimization in smart buildings.",
    proof: "5-page peer-review-style paper and research poster at KKU",
    metric: "5",
    metricLabel: "page paper",
    energy: "rgba(147, 197, 253, 0.42)",
  },
  {
    id: "embedded",
    icon: "Cpu",
    label: "Embedded",
    eyebrow: "Module 03",
    title: "Code near hardware",
    railTitle: "Arduino and control",
    description:
      "The CV lists Arduino, sensor integration, actuator control, motor control circuits, and line-following robot systems.",
    proof: "Arduino-based line-follower robot using infrared sensors and motor control circuits",
    metric: "1st",
    metricLabel: "robotics",
    energy: "rgba(86, 215, 255, 0.34)",
  },
  {
    id: "robotics",
    icon: "Bot",
    label: "Robotics",
    eyebrow: "Module 04",
    title: "Competition robotics",
    railTitle: "Line follower system",
    description:
      "Robotics proof comes from leading an embedded-systems robotics team to 1st place in a KKU line follower competition.",
    proof: "Line Follower Robotics Hackathon, College of Engineering, KKU",
    metric: "May",
    metricLabel: "2026 award",
    energy: "rgba(37, 99, 235, 0.5)",
  },
  {
    id: "web",
    icon: "CircuitBoard",
    label: "Web",
    eyebrow: "Module 05",
    title: "React and Node",
    railTitle: "Web implementation",
    description:
      "The CV lists JavaScript, React.js, Node.js, HTML, CSS, and responsive web design as verified programming and web skills.",
    proof: "Programming and web skills: Python, JavaScript, React.js, Node.js, HTML, CSS",
    metric: "React",
    metricLabel: "CV skill",
    energy: "rgba(147, 197, 253, 0.42)",
  },
  {
    id: "achievements",
    icon: "Trophy",
    label: "Awards",
    eyebrow: "Module 06",
    title: "Competition proof",
    railTitle: "Awards under pressure",
    description:
      "The CV lists 1st, 2nd, 3rd, and 4th place outcomes across robotics, Eduthon, research excellence, AI, and chess hackathon settings.",
    proof: "1st robotics, 2nd Eduthon, 3rd ASHRAE/ASME, 4th AI hackathon, 4th KKU Chess Hackathon",
    metric: "5",
    metricLabel: "award placements",
    energy: "rgba(214, 179, 95, 0.38)",
  },
];

export const heroActions = [
  { label: "Case files", href: "#projects", icon: "ArrowRight", variant: "primary" },
  { label: "Proof", href: "#proof", icon: "Radar", variant: "secondary" },
];

export const proofMetrics = [
  {
    value: "5.0/5.0",
    label: "GPA",
    detail: "Bachelor of Computer Engineering at King Khalid University.",
  },
  {
    value: "9",
    label: "certificates",
    detail: "9 verified certificates across Coursera and KAUST Academy.",
  },
  {
    value: "5",
    label: "award placements",
    detail: "1st robotics, 2nd Eduthon, 3rd research excellence, 4th AI hackathon, and 4th KKU Chess Hackathon.",
  },
  {
    value: "100+",
    label: "AI hackathon teams",
    detail: "Top-4 finish in the KKU Athlete-Intelligence AI Hackathon among 100+ competing teams.",
  },
];

export const selectedProjects = [
  {
    code: "CASE 01",
    title: "Energy Consumption Optimization Research",
    type: "Computer Vision / DRL Research",
    status: "Apr 2026",
    problem:
      "Optimize HVAC energy consumption in smart buildings using Computer Vision with Deep Reinforcement Learning.",
    system:
      "Authored a 5-page peer-review-style scientific paper and modeled adaptive HVAC control strategies.",
    stack: ["Computer Vision", "Deep Reinforcement Learning", "HVAC optimization", "Research poster"],
    outcome:
      "Presented a research poster to faculty, staff, and students at King Khalid University.",
  },
  {
    code: "CASE 02",
    title: "KKU Athlete-Intelligence",
    type: "AI / Sports Analytics",
    status: "Feb 2026",
    problem:
      "Develop an intelligent sports analytics solution using AI/ML in a competitive hackathon environment.",
    system:
      "Developed the AI/ML project for the KKU Athlete-Intelligence AI Hackathon.",
    stack: ["AI/ML", "Sports analytics", "Hackathon project"],
    outcome: "Achieved 4th place among 100+ competing teams.",
  },
  {
    code: "CASE 03",
    title: "Line Follower Robot",
    type: "Embedded Robotics",
    status: "May 2026",
    problem:
      "Engineer an Arduino-based line-follower robot using infrared sensors and motor control circuits.",
    system:
      "Built a line-following robot system with sensor integration and actuator control.",
    stack: ["Arduino", "Infrared sensors", "Motor control circuits", "Line-following systems"],
    outcome: "Led the embedded-systems robotics team to 1st place.",
  },
];

export const technicalDomains = [
  {
    title: "AI and Machine Learning",
    signal: "Model development",
    detail:
      "TensorFlow, PyTorch, Scikit-learn, deep learning, Computer Vision, and Deep Reinforcement Learning.",
  },
  {
    title: "Embedded Robotics",
    signal: "Hardware control",
    detail:
      "Arduino, sensor integration, actuator control, motor control circuits, and line-following robot systems.",
  },
  {
    title: "Web Engineering",
    signal: "React and Node",
    detail: "JavaScript, React.js, Node.js, HTML, CSS, and responsive web design.",
  },
  {
    title: "Data Science",
    signal: "Analysis workflow",
    detail: "NumPy, Pandas, Matplotlib, data preprocessing, and data analysis.",
  },
  {
    title: "Engineering Mathematics",
    signal: "Technical foundations",
    detail: "Probability and statistics, calculus, and linear algebra.",
  },
];

export const achievementSignals = [
  {
    label: "1st Place - Line Follower Robotics Hackathon",
    type: "Award",
    detail:
      "College of Engineering, KKU (2026): led an embedded-systems robotics team to the top position.",
  },
  {
    label: "2nd Place - Eduthon 3",
    type: "Hackathon",
    detail:
      "3rd Sustainability in Education Hackathon, KKU (2026): selected among 30 finalist teams from 190+ applicant teams and 800+ applicants; won 2nd place in the Academic Advising track among 7 teams.",
  },
  {
    label: "3rd Place - ASHRAE KKU x ASME Research Excellence",
    type: "Research",
    detail: "Recognized in 2026 for Best Poster and Research Paper.",
  },
  {
    label: "4th Place - KKU Athlete-Intelligence AI Hackathon",
    type: "Hackathon",
    detail: "Top-4 finish among 100+ teams in a university-wide AI challenge.",
  },
  {
    label: "4th Place - KKU Chess Hackathon",
    type: "Hackathon",
    detail: "Ranked 4th among 20+ contributors.",
  },
];

export const certificates = [
  {
    name: "Introduction to Front-End Development",
    issuer: "Meta",
    platform: "Coursera",
    issueDate: "Aug 26, 2025",
    credentialUrl: "https://coursera.org/verify/6JLF3IXLFX96",
    credentialId: "6JLF3IXLFX96",
    sourceFile: "intro to front-end Dev.pdf",
  },
  {
    name: "Python Basics",
    issuer: "University of Michigan",
    platform: "Coursera",
    issueDate: "Nov 19, 2025",
    credentialUrl: "https://coursera.org/verify/6SHT89BEIZKS",
    credentialId: "6SHT89BEIZKS",
    sourceFile: "Coursera_Python_Basics_Michigan.pdf",
  },
  {
    name: "Python Functions, Files, and Dictionaries",
    issuer: "University of Michigan",
    platform: "Coursera",
    issueDate: "Nov 23, 2025",
    credentialUrl: "https://coursera.org/verify/T8KNLKXYCE1S",
    credentialId: "T8KNLKXYCE1S",
    sourceFile: "CourseraPythonFunctions& Dictionary.pdf",
  },
  {
    name: "Linear Algebra for Machine Learning and Data Science",
    issuer: "DeepLearning.AI",
    platform: "Coursera",
    issueDate: "Nov 24, 2025",
    credentialUrl: "https://coursera.org/verify/O78ETU35RVVX",
    credentialId: "O78ETU35RVVX",
    sourceFile: "courseraLinearAlgebraDeepLearning AI.pdf",
  },
  {
    name: "Data Collection and Processing with Python",
    issuer: "University of Michigan",
    platform: "Coursera",
    issueDate: "Nov 25, 2025",
    credentialUrl: "https://coursera.org/verify/KO50BLVJAF6B",
    credentialId: "KO50BLVJAF6B",
    sourceFile: "CourseraPythonDataCollection&Processing.pdf",
  },
  {
    name: "Python Classes and Inheritance",
    issuer: "University of Michigan",
    platform: "Coursera",
    issueDate: "Nov 26, 2025",
    credentialUrl: "https://coursera.org/verify/JWE03CKBFVDU",
    credentialId: "JWE03CKBFVDU",
    sourceFile: "CourseraPythonClasses&Inheritance.pdf",
  },
  {
    name: "Introduction to Data Science in Python",
    issuer: "University of Michigan",
    platform: "Coursera",
    issueDate: "Nov 29, 2025",
    credentialUrl: "https://coursera.org/verify/BBAYK4KNAOUT",
    credentialId: "BBAYK4KNAOUT",
    sourceFile: "Coursera_Intro_DataScience_Python.pdf",
  },
  {
    name: "Calculus for Machine Learning and Data Science",
    issuer: "DeepLearning.AI",
    platform: "Coursera",
    issueDate: "Feb 7, 2026",
    credentialUrl: "https://coursera.org/verify/FCDCIH40CP5Z",
    credentialId: "FCDCIH40CP5Z",
    sourceFile: "Coursera_calculus_for_ML&_DataScience.pdf",
  },
  {
    name: "Introduction to Artificial Intelligence Course",
    issuer: "KAUST Academy",
    platform: "KAUST",
    issueDate: "Jan 12-16, 2026",
    sourceFile: "KAUST_AI_specialization_stg2_2025.pdf",
  },
];

export const trajectory = [
  {
    phase: "Education",
    title: "Computer Engineering at KKU",
    detail:
      "Bachelor of Computer Engineering at King Khalid University, 2024 - Expected 2031, with a 5.0/5.0 GPA.",
  },
  {
    phase: "Research",
    title: "AI and embedded-systems research",
    detail:
      "Research Collaborator with the Computer Engineering Department at KKU, 2025 - Present, working on AI and embedded-systems research.",
  },
  {
    phase: "Community",
    title: "IEEE and ASHRAE activity",
    detail:
      "Active Member and Event Organizer at IEEE KKU Student Branch, and Active Member at ASHRAE KKU Student Branch, 2025 - Present.",
  },
];

export const contactLinks = {
  email: "mailto:engammarhafez@gmail.com",
  linkedin: "https://www.linkedin.com/in/ammar-a-1ba654321",
  github: "https://github.com/EngAmmar3434",
  cv: "",
  phone: "",
};
