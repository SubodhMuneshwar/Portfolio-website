/**
 * Subodh Uttam Muneshwar - Portfolio Data
 * Software Engineer | Backend & AI/ML | Python | C#/.NET
 */

const portfolioData = {
  personal: {
    name: "Subodh Uttam Muneshwar",
    badge: "Open for Opportunities 🚀",
    role: "Software Engineer & Backend / AI/ML Developer",
    location: "Mumbai - 400104, India",
    phone: "+91 9029920228",
    email: "subodhum1603@gmail.com",
    github: "https://github.com/SubodhMuneshwar",
    linkedin: "https://www.linkedin.com/in/subodh-muneshwar-47209324b/",
    summary: "Software Engineer with hands-on experience in Python, C#, ASP.NET, REST APIs, and AI/ML applications. Experienced in building robust backend systems, image-processing/deep learning pipelines, and database-driven enterprise applications. Passionate about distributed architectures, clean APIs, and scalable AI solutions.",
    stats: [
      { label: "Engineering CGPI", value: "9.14", icon: "award", color: "tertiary" },
      { label: "Hackathon Finalist", value: "Top 5 (SIH)", icon: "trophy", color: "secondary" },
      { label: "Students Mentored", value: "500+", icon: "users", color: "accent" },
      { label: "Accuracy in ML Models", value: "98%", icon: "target", color: "quaternary" }
    ]
  },

  skills: [
    {
      category: "Programming Languages",
      icon: "code",
      color: "accent",
      power: 9001,
      level: 94,
      items: [
        { name: "Python", level: "Expert", tag: "Primary" },
        { name: "C#", level: "Advanced", tag: "Enterprise" },
        { name: "JavaScript", level: "Advanced", tag: "Web" },
        { name: "SQL", level: "Advanced", tag: "Database" },
        { name: "PHP", level: "Intermediate", tag: "Backend" }
      ]
    },
    {
      category: "Backend & Systems",
      icon: "server",
      color: "secondary",
      power: 8850,
      level: 90,
      items: [
        { name: "Flask", level: "Expert", tag: "Python REST" },
        { name: "ASP.NET", level: "Advanced", tag: "C# Enterprise" },
        { name: "REST APIs", level: "Expert", tag: "Architecture" },
        { name: "SAP NCo & BAPIs", level: "Proficient", tag: "Integration" },
        { name: "RBAC & LDAP", level: "Advanced", tag: "Security" }
      ]
    },
    {
      category: "AI, ML & Vision",
      icon: "cpu",
      color: "tertiary",
      power: 8700,
      level: 88,
      items: [
        { name: "OpenCV", level: "Advanced", tag: "Computer Vision" },
        { name: "CNN / Deep Learning", level: "Advanced", tag: "Neural Nets" },
        { name: "NumPy & Pandas", level: "Expert", tag: "Data Analysis" },
        { name: "Scikit-Learn", level: "Advanced", tag: "Modeling" },
        { name: "Image Preprocessing", level: "Expert", tag: "Pipelines" }
      ]
    },
    {
      category: "Frontend & UI/UX",
      icon: "layout",
      color: "quaternary",
      power: 7200,
      level: 73,
      items: [
        { name: "HTML5 & CSS3", level: "Expert", tag: "Semantic" },
        { name: "JavaScript (ES6+)", level: "Advanced", tag: "Modern" },
        { name: "Bootstrap", level: "Advanced", tag: "Responsive" },
        { name: "UI/UX Design", level: "Proficient", tag: "Playful" }
      ]
    },
    {
      category: "Databases, Cloud & Tools",
      icon: "database",
      color: "cyan-pop",
      power: 8150,
      level: 82,
      items: [
        { name: "MySQL", level: "Advanced", tag: "RDBMS" },
        { name: "Oracle Database", level: "Proficient", tag: "Enterprise" },
        { name: "Microsoft Azure", level: "Proficient", tag: "Cloud" },
        { name: "AWS", level: "Proficient", tag: "Cloud" },
        { name: "Git & GitHub", level: "Expert", tag: "DevOps" }
      ]
    },
    {
      category: "Core Concepts",
      icon: "git-merge",
      color: "accent",
      power: 7900,
      level: 80,
      items: [
        { name: "Data Structures & Algorithms", level: "Strong", tag: "Core" },
        { name: "Object-Oriented Programming (OOP)", level: "Strong", tag: "Design" },
        { name: "Distributed Computing", level: "Strong", tag: "Systems" },
        { name: "Database Management (DBMS)", level: "Strong", tag: "Queries" }
      ]
    }
  ],

  experience: [
    {
      role: "Software Developer Intern",
      company: "Rashtriya Chemicals & Fertilizers Limited (RCF)",
      location: "Mumbai, India",
      period: "01 Jan 2026 – 28 Feb 2026",
      type: "Internship",
      badgeColor: "accent",
      description: "Architected and delivered an enterprise-grade role-based access control (RBAC) platform integrated with SAP and Active Directory.",
      highlights: [
        "Developed an SAP-integrated RBAC platform using C#, ASP.NET, Oracle Database, and SAP NCo to streamline enterprise authorization management.",
        "Implemented LDAP-based authentication and SAP-integrated role provisioning utilizing SAP BAPIs and custom Function Modules.",
        "Engineered comprehensive role administration, T-Code assignment, audit logging, real-time authorization synchronization, and session management to tighten enterprise security."
      ],
      techStack: ["C#", "ASP.NET", "Oracle DB", "SAP NCo", "SAP BAPIs", "LDAP", "RBAC"]
    }
  ],

  projects: [
    {
      id: "diabetic-retinopathy",
      title: "Diabetic Retinopathy Detection using ML",
      tagline: "Medical AI classification with 92% accuracy across 10,000+ retinal scans",
      category: "ai-ml",
      period: "August 2025 – March 2026",
      badge: "AI / Healthcare",
      badgeColor: "secondary",
      github: "https://github.com/Nihar0001/dr_hybrid_project",
      image: "assets/project-dr.svg",
      description: "An automated retinal image analysis and clinical diagnostic tool built to detect and classify stages of Diabetic Retinopathy from fundus photography.",
      bullets: [
        "Developed a robust Python-based image analysis pipeline utilizing OpenCV and NumPy for noise reduction, CLAHE contrast enhancement, and feature extraction across 10,000+ images.",
        "Designed and trained a deep Convolutional Neural Network (CNN) classification workflow achieving 92% diagnostic accuracy.",
        "Built a responsive Flask web application for seamless practitioner image uploads, real-time inference generation, and interactive result visualization."
      ],
      techStack: ["Python", "OpenCV", "NumPy", "Pandas", "CNN", "Flask", "Matplotlib"]
    },
    {
      id: "facial-recognition",
      title: "Facial Recognition Attendance System",
      tagline: "Real-time automated biometric identity verification & attendance logging",
      category: "ai-ml",
      period: "January 2025 – May 2025",
      badge: "Computer Vision",
      badgeColor: "accent",
      github: "https://github.com/Nihar0001/Final_face_recognition.git",
      image: "assets/project-face.svg",
      description: "An intelligent, contactless attendance monitoring system utilizing high-speed face detection and biometric feature matching.",
      bullets: [
        "Built a real-time Python/Flask backend and pipeline for webcam-driven face detection, landmark alignment, and facial encoding.",
        "Integrated OpenCV verification with a persistent MySQL relational database, yielding 98% recognition accuracy under diverse lighting.",
        "Automated attendance records, time-stamping, duplicate entry prevention, and exportable admin attendance dashboards."
      ],
      techStack: ["Python", "Flask", "OpenCV", "MySQL", "NumPy", "Bootstrap"]
    },
    {
      id: "foodies-goodies",
      title: "Foodies Goodies – Recipe & Diet Planning Platform",
      tagline: "Personalized nutrition & recipe discovery with Edamam API integration",
      category: "fullstack",
      period: "January 2024 – December 2024",
      badge: "Full-Stack Web",
      badgeColor: "tertiary",
      github: "https://github.com/SubodhMuneshwar/FoodiesGoodies",
      image: "assets/project-foodies.svg",
      description: "A comprehensive health and nutrition web platform offering interactive meal planning, calorie tracking, and dynamic recipe filtering.",
      bullets: [
        "Crafted a responsive full-stack platform featuring 100+ categorized recipes, bookmarking, and dynamic search workflows.",
        "Integrated the Edamam REST API for live nutritional breakdown, ingredient parsing, and dietary preference filters.",
        "Implemented personalized BMI-based meal suggestions and database-backed user management using PHP and MySQL."
      ],
      techStack: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL", "Edamam REST API"]
    },
    {
      id: "naac-portal",
      title: "NAAC Accreditation Management Portal",
      tagline: "Streamlined criterion-wise institutional compliance & documentation system",
      category: "backend",
      period: "September 2024 (Hackcelestial 1.0)",
      badge: "Enterprise Hackathon",
      badgeColor: "quaternary",
      github: "https://github.com/SubodhMuneshwar",
      image: "assets/project-naac.svg",
      description: "Built during Hackcelestial 1.0, this role-based portal simplifies complex collegiate accreditation reporting and audit trails.",
      bullets: [
        "Architected role-based dashboards for faculty, department heads, and admin reviewers to submit and approve NAAC documentation.",
        "Automated criterion-wise progress metrics and report compilation, reducing manual record processing overhead by 60%.",
        "Ensured secure document storage, hierarchical approval workflows, and audit-ready data extraction."
      ],
      techStack: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL", "Role-Based Access"]
    }
  ],

  achievements: [
    {
      title: "Smart India Hackathon 2024 Finalist",
      organization: "Ministry of Education & AICTE",
      period: "2024",
      badge: "National Finalist",
      color: "tertiary",
      icon: "award",
      description: "Selected among 118 finalist teams nationwide for architecting a biomimicry-based grey water management and circular filtration solution."
    },
    {
      title: "Smart India Hackathon 2023 – Top 5 in India",
      organization: "Ministry of Education & AICTE",
      period: "2023",
      badge: "Top 5 in India",
      color: "secondary",
      icon: "trophy",
      description: "Ranked among the Top 5 teams out of 258 competing teams nationwide for designing an innovative technological menstrual waste disposal & sanitation solution."
    },
    {
      title: "Workshop Instructor – Full Stack Web Dev",
      organization: "RMCET Computer Engineering Dept.",
      period: "March 2024",
      badge: "Leadership & Teaching",
      color: "accent",
      icon: "presentation",
      description: "Co-conducted an intensive 5-day hands-on practical workshop for 50+ junior engineering students on modern HTML, CSS, JavaScript, and responsive UI architecture."
    },
    {
      title: "Student Secretary – RMCET",
      organization: "Rajendra Mane College of Engineering & Tech",
      period: "Aug 2024 – May 2026",
      badge: "Elected Representative",
      color: "quaternary",
      icon: "users",
      description: "Officially represented 500+ undergraduate students; steered technical events, hackathons, academic forums, and cultural symposiums."
    },
    {
      title: "District & University Youth Festival Competitions",
      organization: "University of Mumbai",
      period: "2023 - 2025",
      badge: "Arts & Creativity",
      color: "secondary",
      icon: "palette",
      description: "Represented college at university/district levels in poster-making, creative painting, cartooning, and street plays, demonstrating strong visual and storytelling skills."
    },
    {
      title: "Training & Placement Cell Volunteer",
      organization: "RMCET T&P Cell",
      period: "2023 - Present",
      badge: "Institutional Service",
      color: "cyan-pop",
      icon: "briefcase",
      description: "Assisted college placement coordinators in organizing corporate recruitment drives, technical assessment sessions, and mock interview preparations."
    }
  ],

  certifications: [
    {
      title: "IBM SkillsBuild – Agentic AI: From Learner to Builder",
      issuer: "IBM",
      date: "July 2025 – August 2025",
      badge: "Agentic AI & LLMs",
      color: "accent",
      icon: "cpu"
    },
    {
      title: "Deloitte Data Analytics Job Simulation",
      issuer: "Forage / Deloitte",
      date: "September 2025",
      badge: "Data Strategy & Analytics",
      color: "quaternary",
      icon: "bar-chart-3"
    }
  ],

  education: [
    {
      degree: "B.E. in Computer Engineering",
      institution: "RMCET, Mumbai University",
      period: "2022 – 2026",
      score: "CGPI: 9.14",
      highlight: "Dean's List / Consistent Academic Excellence",
      color: "accent"
    },
    {
      degree: "Higher Secondary Certificate (HSC)",
      institution: "Patkar Varde College",
      period: "2020 – 2022",
      score: "Percentage: 70.17%",
      highlight: "Science Stream (PCM & Computer Science)",
      color: "secondary"
    },
    {
      degree: "Secondary School Certificate (SSC)",
      institution: "St. Thomas Academy",
      period: "2020",
      score: "Percentage: 88.00%",
      highlight: "Distinction with High Academic Rank",
      color: "tertiary"
    }
  ]
};
