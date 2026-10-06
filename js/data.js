/**
 * Subodh Uttam Muneshwar - Portfolio Data
 * Software Engineer | Backend & AI/ML | Python | C#/.NET
 */

const portfolioData = {
  personal: {
    name: "Subodh Uttam Muneshwar",
    badge: "Open for Opportunities",
    role: "Software Engineer & Backend / AI/ML Developer",
    location: "Mumbai - 400104, India",
    phone: "+91 9029920228",
    email: "subodhum1603@gmail.com",
    github: "https://github.com/SubodhMuneshwar",
    linkedin: "https://www.linkedin.com/in/subodh-muneshwar-47209324b/",
    summary: "Software Engineer with hands-on experience in Python, C#, ASP.NET, REST APIs, and AI/ML applications. Experienced in building robust backend systems, image-processing/deep learning pipelines, and database-driven enterprise applications. Passionate about distributed architectures, clean APIs, and scalable AI solutions.",
    stats: [
      {
        category: "Academics",
        value: "9.14/10",
        label: "Engineering CGPI",
        sublabel: "Dean's List · Mumbai Univ",
        icon: "award",
        color: "tertiary"
      },
      {
        category: "Hackathons",
        value: "2x Finalist",
        label: "Smart India Hackathon",
        sublabel: "Top 5 in India · MoE & AICTE",
        icon: "trophy",
        color: "secondary"
      },
      {
        category: "Leadership",
        value: "500+",
        label: "Students Represented",
        sublabel: "Student Secretary, RMCET",
        icon: "users",
        color: "accent"
      },
      {
        category: "Enterprise",
        value: "Enterprise",
        label: "SAP & RBAC Architecture",
        sublabel: "Role Provisioning & LDAP",
        icon: "shield-check",
        color: "quaternary"
      },
      {
        category: "Data & AI Scale",
        value: "10,000+",
        label: "Retinal Images Processed",
        sublabel: "DenseNet121 + Ensemble ML",
        icon: "cpu",
        color: "tertiary"
      }
    ]
  },

  skills: [
    {
      category: "Programming Languages",
      icon: "code",
      color: "accent",
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
      items: [
        { name: "HTML5 & CSS3", level: "Expert", tag: "Semantic" },
        { name: "JavaScript (ES6+)", level: "Advanced", tag: "Modern" },
        { name: "Bootstrap", level: "Advanced", tag: "Responsive" },
        { name: "Figma", level: "Advanced", tag: "Design" },
        { name: "Canva", level: "Proficient", tag: "Graphics" }
      ]
    },
    {
      category: "Databases, Cloud & Tools",
      icon: "database",
      color: "cyan-pop",
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
      items: [
        { name: "Data Structures & Algorithms", level: "Strong", tag: "Core" },
        { name: "Object-Oriented Programming (OOP)", level: "Strong", tag: "Design" },
        { name: "Distributed Computing", level: "Strong", tag: "Systems" },
        { name: "Database Management (DBMS)", level: "Strong", tag: "Queries" }
      ]
    }
  ],

  spiritBombSkills: [
    {
        "id": "python",
        "name": "Python",
        "category": "ai-ml",
        "categoryLabel": "AI, ML & Backend",
        "level": "Expert",
        "powerLevel": "9,800 KI",
        "powerPercent": 98,
        "experience": "3+ Years • Core Production Language",
        "badgeColor": "accent",
        "brandColor": "#3776AB",
        "description": "Primary engineering language for high-throughput REST APIs, deep learning convolutional networks, and automated OpenCV image preprocessing pipelines.",
        "keyCapabilities": [
            "OpenCV image filters & CLAHE contrast normalization",
            "Deep Convolutional Neural Networks (CNNs) with 92% accuracy",
            "Flask RESTful microservice API architecture",
            "NumPy matrix math & automated training data ETL"
        ],
        "projects": [
            {
                "id": "diabetic-retinopathy",
                "name": "Diabetic Retinopathy AI"
            },
            {
                "id": "facial-recognition",
                "name": "Face Recognition Attendance"
            }
        ],
        "svgIcon": "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.006 2.752h5.814v.826H3.896S0 5.766 0 11.892c0 6.124 3.4 5.92 3.4 5.92h2.029v-2.846s-.11-3.4 3.344-3.4h5.759s3.235.053 3.235-3.136V2.656S18.25 0 11.914 0zm-3.23 1.836a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1zM12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.006-2.752h-5.814v-.826h8.124s3.896.468 3.896-5.658c0-6.124-3.4-5.92-3.4-5.92h-2.029v2.846s.11 3.4-3.344 3.4H9.468s-3.235-.053-3.235 3.136v5.772s-.486 2.656 5.853 2.656zm3.23-1.836a1.05 1.05 0 1 1 0-2.1 1.05 1.05 0 0 1 0 2.1z\"/></svg>"
    },
    {
        "id": "csharp",
        "name": "C#",
        "category": "backend",
        "categoryLabel": "Enterprise & Backend",
        "level": "Advanced",
        "powerLevel": "9,500 KI",
        "powerPercent": 95,
        "experience": "Enterprise Production • RCF Ltd.",
        "badgeColor": "secondary",
        "brandColor": "#239120",
        "description": "Enterprise language utilized to build high-concurrency middleware, integrate SAP ERP RFC calls via SAP NCo, and coordinate Active Directory LDAP synchronization.",
        "keyCapabilities": [
            "SAP .NET Connector (NCo 3.0) enterprise middleware",
            "Active Directory LDAP query & identity verification",
            "High-throughput Oracle Database transactional operations",
            "Role-Based Access Control (RBAC) governance platform"
        ],
        "projects": [
            {
                "id": "experience",
                "name": "RCF Enterprise RBAC Platform"
            }
        ],
        "svgIcon": "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M12 0L1.608 6v12L12 24l10.392-6V6L12 0zm0 2.31l8.392 4.845v9.69L12 21.69l-8.392-4.845V7.155L12 2.31zM11.5 7.5a4.5 4.5 0 0 0-4.5 4.5 4.5 4.5 0 0 0 4.5 4.5c1.8 0 3.3-.9 4-2.25l-1.8-.9a2.4 2.4 0 0 1-2.2 1.35 2.7 2.7 0 0 1-2.7-2.7 2.7 2.7 0 0 1 2.7-2.7c.9 0 1.7.5 2.2 1.35l1.8-.9a4.5 4.5 0 0 0-4-2.25zm5.5 1.5v1.5h-1.5V12h1.5v1.5h1.5V12h1.5v-1.5h-1.5V9h-1.5zm0 4.5v1.5h-1.5v1.5H17V18h1.5v-1.5h1.5v-1.5h-1.5v-1.5H17z\"/></svg>"
    },
    {
        "id": "aspnet",
        "name": "ASP.NET",
        "category": "backend",
        "categoryLabel": "Enterprise & Backend",
        "level": "Advanced",
        "powerLevel": "9,400 KI",
        "powerPercent": 94,
        "experience": "Enterprise Production • RCF Ltd.",
        "badgeColor": "secondary",
        "brandColor": "#512BD4",
        "description": "Robust enterprise web framework for building secure authorization services, session management, and automated user provisioning modules.",
        "keyCapabilities": [
            "ASP.NET Web APIs and Controller lifecycle",
            "Granular T-Code authorization matrix administration",
            "Tamper-evident audit logging and activity tracking",
            "Custom SAP BAPI and Function Module pipelines"
        ],
        "projects": [
            {
                "id": "experience",
                "name": "RCF Enterprise RBAC Platform"
            }
        ],
        "svgIcon": "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M2.5 4A2.5 2.5 0 0 0 0 6.5v11A2.5 2.5 0 0 0 2.5 20h19a2.5 2.5 0 0 0 2.5-2.5v-11A2.5 2.5 0 0 0 21.5 4h-19zm4.2 4.2h2.2l3.4 5.8V8.2h2.1v7.6h-2.1L8.8 10v5.8H6.7V8.2zm10.5 6.2a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8z\"/></svg>"
    },
    {
        "id": "flask",
        "name": "Flask",
        "category": "backend",
        "categoryLabel": "Backend & Systems",
        "level": "Expert",
        "powerLevel": "9,600 KI",
        "powerPercent": 96,
        "experience": "2+ Years • Microservices & AI APIs",
        "badgeColor": "tertiary",
        "brandColor": "#000000",
        "description": "Lightweight, high-speed Python web framework deployed to serve real-time deep learning inference, image upload pipelines, and biometric attendance processing.",
        "keyCapabilities": [
            "Low-latency REST endpoints for live model predictions",
            "Multi-part file stream uploads & validation",
            "Modular Blueprint architecture & CORS handling",
            "Integration with OpenCV video captures & MySQL"
        ],
        "projects": [
            {
                "id": "diabetic-retinopathy",
                "name": "Diabetic Retinopathy AI"
            },
            {
                "id": "facial-recognition",
                "name": "Face Recognition Attendance"
            }
        ],
        "svgIcon": "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M9.5 2V4H10.5V9.586L4.293 17.707C3.486 18.784 4.257 20.3 5.6 20.3H18.4c1.343 0 2.114-1.516 1.307-2.593L13.5 9.586V4H14.5V2H9.5zM12 11.414L16.273 17H7.727L12 11.414z\"/></svg>"
    },
    {
        "id": "opencv",
        "name": "OpenCV",
        "category": "ai-ml",
        "categoryLabel": "Computer Vision & AI",
        "level": "Expert",
        "powerLevel": "9,700 KI",
        "powerPercent": 97,
        "experience": "2+ Years • 10,000+ Scans Processed",
        "badgeColor": "accent",
        "brandColor": "#5C3EE8",
        "description": "Industry-standard computer vision library utilized for fundus retinal contrast adaptation, Haar/HOG face detection, facial encoding, and camera streaming.",
        "keyCapabilities": [
            "98% accuracy real-time facial biometric identification",
            "CLAHE contrast enhancement & illumination balancing",
            "Gaussian noise filtering & feature region extraction",
            "Multi-threaded webcam stream acquisition & logging"
        ],
        "projects": [
            {
                "id": "diabetic-retinopathy",
                "name": "Diabetic Retinopathy AI"
            },
            {
                "id": "facial-recognition",
                "name": "Face Recognition Attendance"
            }
        ],
        "svgIcon": "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M12 0a5.5 5.5 0 0 0-5.467 4.975A5.5 5.5 0 1 0 12 11a5.5 5.5 0 0 0 5.467-6.025A5.5 5.5 0 0 0 12 0zm-6 13a5.5 5.5 0 0 0-5.467 4.975A5.5 5.5 0 1 0 6 24a5.5 5.5 0 0 0 5.467-6.025A5.5 5.5 0 0 0 6 13zm12 0a5.5 5.5 0 0 0-5.467 4.975A5.5 5.5 0 1 0 18 24a5.5 5.5 0 0 0 5.467-6.025A5.5 5.5 0 0 0 18 13z\"/></svg>"
    },
    {
        "id": "cnn",
        "name": "CNN Deep Learning",
        "category": "ai-ml",
        "categoryLabel": "AI, ML & Vision",
        "level": "Advanced",
        "powerLevel": "9,500 KI",
        "powerPercent": 95,
        "experience": "Production Research & Model Training",
        "badgeColor": "accent",
        "brandColor": "#EE4C2C",
        "description": "Deep Convolutional Neural Network architectures trained to detect microscopic lesions and classify Diabetic Retinopathy into 5 clinical stages with 92% accuracy.",
        "keyCapabilities": [
            "Deep feature representation from retinal fundus images",
            "Dropout, batch normalization & data augmentation",
            "Cross-entropy loss optimization & Adam optimizer tuning",
            "Confusion matrix, ROC-AUC curve & recall verification"
        ],
        "projects": [
            {
                "id": "diabetic-retinopathy",
                "name": "Diabetic Retinopathy AI"
            }
        ],
        "svgIcon": "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M12 2a4 4 0 0 0-4 4c0 .3.04.58.11.85L5.3 8.7A3.99 3.99 0 0 0 2 12a4 4 0 0 0 4 4c.3 0 .58-.04.85-.11l1.85 2.81c-.44.66-.7 1.45-.7 2.3a4 4 0 0 0 8 0c0-.85-.26-1.64-.7-2.3l1.85-2.81c.27.07.55.11.85.11a4 4 0 0 0 4-4 4 4 0 0 0-3.3-3.3l-2.81-1.85c.07-.27.11-.55.11-.85a4 4 0 0 0-4-4zm0 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM6 10a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm12 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm-6 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4z\"/></svg>"
    },
    {
        "id": "numpy",
        "name": "NumPy",
        "category": "ai-ml",
        "categoryLabel": "Data & Numerical Computing",
        "level": "Expert",
        "powerLevel": "9,700 KI",
        "powerPercent": 97,
        "experience": "3+ Years",
        "badgeColor": "tertiary",
        "brandColor": "#4DABCF",
        "description": "Vectorized array computations, multi-dimensional tensor slicing, and high-performance pixel manipulations for machine learning pipelines.",
        "keyCapabilities": [
            "High-speed vectorized mathematical computations",
            "Image tensor reshaping, broadcasting & matrix dot products",
            "Euclidean distance calculation for facial embeddings",
            "Fast batch normalizations on large datasets"
        ],
        "projects": [
            {
                "id": "diabetic-retinopathy",
                "name": "Diabetic Retinopathy AI"
            },
            {
                "id": "facial-recognition",
                "name": "Face Recognition Attendance"
            }
        ],
        "svgIcon": "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M12 0L2 5.5v13L12 24l10-5.5v-13L12 0zm-1 3.2v4.8L4 5.3l7-2.1zm2 0l7 2.1-7 2.7V3.2zM4 7.6l7 2.7v5.4l-7-3.8V7.6zm9 8.1V10.3l7-2.7v4.3l-7 3.8zm-1 2.3l-6.8-3.7 6.8 3.7 6.8-3.7-6.8 3.7z\"/></svg>"
    },
    {
        "id": "pandas",
        "name": "Pandas",
        "category": "ai-ml",
        "categoryLabel": "Data Engineering",
        "level": "Advanced",
        "powerLevel": "9,400 KI",
        "powerPercent": 94,
        "experience": "2+ Years",
        "badgeColor": "quaternary",
        "brandColor": "#150458",
        "description": "Tabular data engineering, data cleaning, diagnostic label extraction, exploratory analysis, and automated attendance record aggregation.",
        "keyCapabilities": [
            "Clinical metadata extraction & stratified splits",
            "Missing value imputation & duplicate prevention",
            "Attendance log exports to Excel/CSV dashboards",
            "High-volume tabular joining and statistical metrics"
        ],
        "projects": [
            {
                "id": "diabetic-retinopathy",
                "name": "Diabetic Retinopathy AI"
            }
        ],
        "svgIcon": "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M14.5 2h-5A2.5 2.5 0 0 0 7 4.5V7H4.5A2.5 2.5 0 0 0 2 9.5v5A2.5 2.5 0 0 0 4.5 17H7v2.5A2.5 2.5 0 0 0 9.5 22h5a2.5 2.5 0 0 0 2.5-2.5V17h2.5a2.5 2.5 0 0 0 2.5-2.5v-5A2.5 2.5 0 0 0 19.5 7H17V4.5A2.5 2.5 0 0 0 14.5 2zM9 9h6v6H9V9z\"/></svg>"
    },
    {
        "id": "scikitlearn",
        "name": "Scikit-Learn",
        "category": "ai-ml",
        "categoryLabel": "Machine Learning",
        "level": "Advanced",
        "powerLevel": "9,300 KI",
        "powerPercent": 93,
        "experience": "2+ Years",
        "badgeColor": "accent",
        "brandColor": "#F7931E",
        "description": "Statistical machine learning toolkit used for classification algorithms, dimensionality reduction, train-test splitting, and evaluation metrics.",
        "keyCapabilities": [
            "Classification models, k-NN & Support Vector Machines",
            "Stratified K-Fold cross validation pipelines",
            "Precision, Recall, F1-score & ROC-AUC analytics",
            "Feature scaling, MinMax & Standard normalization"
        ],
        "projects": [
            {
                "id": "diabetic-retinopathy",
                "name": "Diabetic Retinopathy AI"
            }
        ],
        "svgIcon": "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M13.6 0C8.5 0 4.3 3.9 4 9h2.1c.3-4 3.7-7 7.5-7 4.2 0 7.5 3.4 7.5 7.5 0 3.8-2.8 7-6.7 7.4v2.1c5-.4 9-4.7 9-9.5C23.4 4.3 19 0 13.6 0zm-3.2 5.5c-4.4 0-8 3.6-8 8s3.6 8 8 8c3.5 0 6.5-2.2 7.5-5.5h-2.2c-.9 2.1-3 3.5-5.3 3.5-3.3 0-6-2.7-6-6s2.7-6 6-6c1.8 0 3.4.8 4.5 2.1l1.6-1.4C16.8 6.7 14.5 5.5 10.4 5.5z\"/></svg>"
    },
    {
        "id": "javascript",
        "name": "JavaScript",
        "category": "languages",
        "categoryLabel": "Languages & Web",
        "level": "Advanced",
        "powerLevel": "9,600 KI",
        "powerPercent": 96,
        "experience": "3+ Years • Modern ES6+",
        "badgeColor": "accent",
        "brandColor": "#F7DF1E",
        "description": "Modern ES6+ JavaScript: event-driven interactive systems, physics-based 3D coordinate transformations, Web Audio API synthesis, and DOM rendering engines.",
        "keyCapabilities": [
            "Asynchronous fetch & REST API consumption",
            "requestAnimationFrame momentum physics loops",
            "Web Audio API oscillator frequency modulation",
            "Pointer events & mobile touch gesture tracking"
        ],
        "projects": [
            {
                "id": "foodies-goodies",
                "name": "Foodies Goodies Platform"
            }
        ],
        "svgIcon": "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M0 0h24v24H0V0zm22.034 18.276c-.175-1.017-.892-1.742-2.146-2.164l-.926-.328c-.73-.26-1.04-.543-1.04-.984 0-.462.383-.797 1.05-.797.666 0 1.063.293 1.34.78.118-.74.63-1.18 1.436-1.18.236 0 .473.04.707.127-.47-1.34-1.637-2.074-3.483-2.074-2.28 0-3.666 1.336-3.666 3.195 0 1.696 1.06 2.533 2.766 3.125l.89.31c.78.272 1.13.626 1.13 1.144 0 .587-.54 1.004-1.36 1.004-.99 0-1.57-.487-1.78-1.33-.142.82-.71 1.34-1.58 1.34-.17 0-.35-.02-.53-.07.45 1.48 1.76 2.41 3.89 2.41 2.51 0 4.14-1.42 4.14-3.456l-.007-.042zm-8.887 1.834c0 .87-.49 1.42-1.34 1.42-.4 0-.74-.13-.98-.38l-.05.05v-5.99h-2.13v6.07c0 2.21 1.36 3.42 3.44 3.42 1.89 0 3.19-1.07 3.19-2.92v-8.24h-2.13v6.57z\"/></svg>"
    },
    {
        "id": "html5",
        "name": "HTML5",
        "category": "frontend",
        "categoryLabel": "Frontend Architecture",
        "level": "Expert",
        "powerLevel": "9,800 KI",
        "powerPercent": 98,
        "experience": "4+ Years",
        "badgeColor": "tertiary",
        "brandColor": "#E34F26",
        "description": "Semantic HTML5 markup adhering to strict accessibility (WCAG AA), responsive canvas elements, embedded video formats, and clean DOM hierarchy.",
        "keyCapabilities": [
            "Semantic document outline & SEO best practices",
            "ARIA roles, live regions & keyboard navigation",
            "HTML5 Canvas 2D & high-DPI scaling",
            "Modern WebP / MP4 responsive media embedding"
        ],
        "projects": [
            {
                "id": "foodies-goodies",
                "name": "Foodies Goodies Platform"
            }
        ],
        "svgIcon": "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M1.5 0h21l-1.9 21.3L12 24l-8.6-2.7L1.5 0zm17.9 4.2H4.6l.4 4.5h13.9l-.4 4.6-4.5 1.2-4.5-1.2-.3-2.7H5.2l.5 5.5 6.3 1.7 6.3-1.7 1.1-11.9z\"/></svg>"
    },
    {
        "id": "css3",
        "name": "CSS3",
        "category": "frontend",
        "categoryLabel": "Frontend Architecture",
        "level": "Expert",
        "powerLevel": "9,800 KI",
        "powerPercent": 98,
        "experience": "4+ Years",
        "badgeColor": "secondary",
        "brandColor": "#1572B6",
        "description": "Advanced CSS styling: 3-column Grid, Flexbox, custom CSS custom properties (variables), translucent glassmorphism, and GPU-accelerated keyframe animations.",
        "keyCapabilities": [
            "CSS Grid & Flexbox symmetrical layouts",
            "Frosted glassmorphism & backdrop filters",
            "Hardware-accelerated 3D transforms & transitions",
            "Theme token systems (Saiyan Gold & Rosé Neon)"
        ],
        "projects": [
            {
                "id": "foodies-goodies",
                "name": "Foodies Goodies Platform"
            }
        ],
        "svgIcon": "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M1.5 0h21l-1.9 21.3L12 24l-8.6-2.7L1.5 0zm16.4 7.6H7.1l-.3-3.4h13.1l.4-4.2H4.6l1 11.2h10.3l-.4 4.4-3.5 1-3.5-1-.2-2.3H4.8l.4 5.1 6.8 1.9 6.8-1.9 1.1-11.7z\"/></svg>"
    },
    {
        "id": "tailwind",
        "name": "Tailwind CSS",
        "category": "frontend",
        "categoryLabel": "Frontend Architecture",
        "level": "Advanced",
        "powerLevel": "9,200 KI",
        "powerPercent": 92,
        "experience": "2+ Years",
        "badgeColor": "cyan-pop",
        "brandColor": "#06B6D4",
        "description": "Modern utility-first CSS framework for ultra-fast UI design, responsive breakpoint systems, and streamlined component design tokens.",
        "keyCapabilities": [
            "Responsive utility layouts across mobile & desktop",
            "Arbitrary variants & dynamic theme variables",
            "Micro-interaction and hover state styling",
            "Lightweight production build optimization"
        ],
        "projects": [
            {
                "id": "foodies-goodies",
                "name": "Foodies Goodies Platform"
            }
        ],
        "svgIcon": "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z\"/></svg>"
    },
    {
        "id": "bootstrap",
        "name": "Bootstrap",
        "category": "frontend",
        "categoryLabel": "Frontend & Dashboards",
        "level": "Advanced",
        "powerLevel": "9,100 KI",
        "powerPercent": 91,
        "experience": "2+ Years",
        "badgeColor": "secondary",
        "brandColor": "#7952B3",
        "description": "Component toolkit used to engineer responsive administrative portals, tabular records, modal forms, and clean biometric data visualization.",
        "keyCapabilities": [
            "12-column responsive layout grids",
            "Interactive modals, dropdowns & alert banners",
            "Admin table pagination and filter styling",
            "Form validation states & interactive feedback"
        ],
        "projects": [
            {
                "id": "facial-recognition",
                "name": "Face Recognition Attendance"
            },
            {
                "id": "foodies-goodies",
                "name": "Foodies Goodies Platform"
            }
        ],
        "svgIcon": "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M4.5 0A4.5 4.5 0 0 0 0 4.5v15A4.5 4.5 0 0 0 4.5 24h15a4.5 4.5 0 0 0 4.5-4.5v-15A4.5 4.5 0 0 0 19.5 0h-15zm4.8 4.8h4.5c2.4 0 3.8 1.3 3.8 3.1 0 1.2-.7 2.1-1.8 2.6 1.4.4 2.3 1.5 2.3 3 0 2.1-1.6 3.7-4.2 3.7H9.3V4.8zm2.6 2.2v3.3h2c1.1 0 1.8-.6 1.8-1.6 0-1-.7-1.7-1.8-1.7h-2zm0 5.5v3.7h2.2c1.2 0 2-.7 2-1.8 0-1.2-.8-1.9-2-1.9h-2.2z\"/></svg>"
    },
    {
        "id": "mysql",
        "name": "MySQL",
        "category": "database",
        "categoryLabel": "Databases & Storage",
        "level": "Advanced",
        "powerLevel": "9,400 KI",
        "powerPercent": 94,
        "experience": "3+ Years • Relational Database",
        "badgeColor": "secondary",
        "brandColor": "#4479A1",
        "description": "Relational database management for biometric records, user authentications, and recipes: schema normalization, foreign key constraints, and indexed queries.",
        "keyCapabilities": [
            "Relational schema design & foreign key relationships",
            "Automated timestamping & duplicate attendance guards",
            "Complex SQL JOIN queries with index optimization",
            "Secure SQL parameterization against injection"
        ],
        "projects": [
            {
                "id": "facial-recognition",
                "name": "Face Recognition Attendance"
            },
            {
                "id": "foodies-goodies",
                "name": "Foodies Goodies Platform"
            }
        ],
        "svgIcon": "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M16.5 3c-1.5 0-2.8.8-3.5 2-1.2-1.2-2.9-2-4.7-2C4.8 3 2 5.8 2 9.3c0 4.6 5.3 9.4 9.3 11.4.4.2.9.2 1.3 0 4-2 9.4-6.8 9.4-11.4 0-3.5-2.8-6.3-5.5-6.3zm-4.5 13.5c-2.8-1.8-6-5.2-6-8.2 0-1.9 1.6-3.5 3.5-3.5 1.5 0 2.8 1 3.3 2.4h-1.8v1.6h2v1.6H11v1.6h2v1.6H11v1.6h1v1.3zm3.5-6.3h-1.5v-1.6h1.5v1.6zm0-3.2h-1.5V5.4h1.5v1.6z\"/></svg>"
    },
    {
        "id": "oracle",
        "name": "Oracle DB",
        "category": "database",
        "categoryLabel": "Enterprise Databases",
        "level": "Advanced",
        "powerLevel": "9,300 KI",
        "powerPercent": 93,
        "experience": "Enterprise Production • RCF Ltd.",
        "badgeColor": "accent",
        "brandColor": "#F80000",
        "description": "High-volume enterprise relational database management interfacing with SAP ERP tables, stored procedures, and immutable audit logs.",
        "keyCapabilities": [
            "Enterprise relational tables & optimized views",
            "Stored procedures and trigger workflows",
            "Audit trail tracking and historical logs",
            "Interfacing with ASP.NET data providers"
        ],
        "projects": [
            {
                "id": "experience",
                "name": "RCF Enterprise RBAC Platform"
            }
        ],
        "svgIcon": "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M16.4 4H7.6C3.4 4 0 7.6 0 12s3.4 8 7.6 8h8.8c4.2 0 7.6-3.6 7.6-8s-3.4-8-7.6-8zm-.3 12.8H7.9c-2.7 0-4.8-2.2-4.8-4.8s2.2-4.8 4.8-4.8h8.2c2.7 0 4.8 2.2 4.8 4.8s-2.2 4.8-4.8 4.8z\"/></svg>"
    },
    {
        "id": "sap",
        "name": "SAP ERP & NCo",
        "category": "backend",
        "categoryLabel": "Enterprise Middleware",
        "level": "Proficient",
        "powerLevel": "9,200 KI",
        "powerPercent": 92,
        "experience": "Enterprise Internship • RCF Ltd.",
        "badgeColor": "tertiary",
        "brandColor": "#0FAAFF",
        "description": "Enterprise system interfacing using SAP .NET Connector (NCo 3.0), invoking custom RFC Function Modules and BAPIs for automated authorization governance.",
        "keyCapabilities": [
            "SAP .NET Connector (NCo 3.0) configuration",
            "RFC function module invocation and result parsing",
            "BAPI-driven user & role provisioning pipelines",
            "Granular SAP T-Code authorization matrix mapping"
        ],
        "projects": [
            {
                "id": "experience",
                "name": "RCF Enterprise RBAC Platform"
            }
        ],
        "svgIcon": "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M0 3v18h24V3H0zm6.8 4.2c2.2 0 3.6 1.2 3.6 2.9 0 2.5-3.4 2.2-3.4 3.4 0 .4.4.7 1.1.7.9 0 1.9-.4 2.5-.9l.6 1.4c-.8.7-2.1 1.1-3.3 1.1-2.3 0-3.6-1.3-3.6-3 0-2.6 3.4-2.3 3.4-3.5 0-.4-.4-.6-1-.6-.8 0-1.7.3-2.3.8l-.6-1.4c.8-.6 1.9-.9 3-.9zm8.5.2l3.4 8.2h-2.1l-.6-1.7H13l-.6 1.7h-2.1l3.4-8.2h1.6zm-1.8 5.1h1.7l-.8-2.3-.9 2.3zm8.3-5.3h-4v8.2h2v-2.8h2c1.8 0 3-1.1 3-2.7 0-1.6-1.2-2.7-3-2.7zm0 3.7h-2V9.1h2c.7 0 1.2.4 1.2 1 0 .6-.5 1-1.2 1z\"/></svg>"
    },
    {
        "id": "activedirectory",
        "name": "Active Directory & LDAP",
        "category": "backend",
        "categoryLabel": "Security & Identity",
        "level": "Advanced",
        "powerLevel": "9,300 KI",
        "powerPercent": 93,
        "experience": "Enterprise Production • RCF Ltd.",
        "badgeColor": "secondary",
        "brandColor": "#0078D4",
        "description": "LDAP directory integration, corporate user authentication, automated security group membership synchronization, and enterprise single sign-on mapping.",
        "keyCapabilities": [
            "LDAP directory querying and secure binding",
            "Corporate Active Directory credential validation",
            "Automated security group & role synchronization",
            "Enterprise identity mapping to SAP authorizations"
        ],
        "projects": [
            {
                "id": "experience",
                "name": "RCF Enterprise RBAC Platform"
            }
        ],
        "svgIcon": "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 6h2v2h-2V7zm0 4h2v6h-2v-6z\"/></svg>"
    },
    {
        "id": "git",
        "name": "Git & GitHub",
        "category": "devops",
        "categoryLabel": "DevOps & Version Control",
        "level": "Expert",
        "powerLevel": "9,700 KI",
        "powerPercent": 97,
        "experience": "3+ Years",
        "badgeColor": "accent",
        "brandColor": "#F05032",
        "description": "Version control hygiene: feature branching, interactive rebasing, semantic commit standards, pull requests, and automated GitHub Actions workflows.",
        "keyCapabilities": [
            "Branching workflows (feature/fix/release)",
            "Conflict resolution & interactive rebasing",
            "Semantic commit conventions & release tagging",
            "Collaborative code review & PR stewardship"
        ],
        "projects": [
            {
                "id": "diabetic-retinopathy",
                "name": "Diabetic Retinopathy AI"
            },
            {
                "id": "facial-recognition",
                "name": "Face Recognition Attendance"
            },
            {
                "id": "foodies-goodies",
                "name": "Foodies Goodies Platform"
            }
        ],
        "svgIcon": "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M23.546 10.93L13.067.452a1.55 1.55 0 0 0-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881a1.55 1.55 0 0 0 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43a1.55 1.55 0 0 0 0-2.187z\"/></svg>"
    },
    {
        "id": "docker",
        "name": "Docker",
        "category": "devops",
        "categoryLabel": "DevOps & Containers",
        "level": "Proficient",
        "powerLevel": "9,000 KI",
        "powerPercent": 90,
        "experience": "1+ Year",
        "badgeColor": "secondary",
        "brandColor": "#2496ED",
        "description": "Containerization of Python Flask microservices and AI inference dependencies to guarantee consistent local and production execution environments.",
        "keyCapabilities": [
            "Multi-stage Dockerfile creation & layer caching",
            "Container networking & port binding",
            "Reproducible Python ML runtime isolation",
            "Docker Compose multi-container setups"
        ],
        "projects": [
            {
                "id": "diabetic-retinopathy",
                "name": "Diabetic Retinopathy AI"
            }
        ],
        "svgIcon": "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.186.186 0 0 0-.186.186v1.887c0 .102.084.185.186.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 0 0-.75.748 11.376 11.376 0 0 0 .692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 0 0 3.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z\"/></svg>"
    },
    {
        "id": "azure",
        "name": "Microsoft Azure",
        "category": "devops",
        "categoryLabel": "Cloud Platforms",
        "level": "Proficient",
        "powerLevel": "9,000 KI",
        "powerPercent": 90,
        "experience": "Cloud Architecture",
        "badgeColor": "tertiary",
        "brandColor": "#0089D6",
        "description": "Cloud application hosting, Azure App Services deployment pipelines, and enterprise identity management integration.",
        "keyCapabilities": [
            "App Services deployment and configuration",
            "Azure SQL Database connectivity & security",
            "Active Directory / Entra identity federation",
            "Cloud resource metrics & health monitoring"
        ],
        "projects": [
            {
                "id": "experience",
                "name": "RCF Enterprise RBAC Platform"
            }
        ],
        "svgIcon": "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M13.4 3L5.8 17.5h4.9l5.1-9.9L13.4 3zm2.5 5.5L8.7 21h10.5l4.8-9.4-8.1-3.1z\"/></svg>"
    },
    {
        "id": "aws",
        "name": "AWS",
        "category": "devops",
        "categoryLabel": "Cloud Platforms",
        "level": "Proficient",
        "powerLevel": "8,900 KI",
        "powerPercent": 89,
        "experience": "Cloud Infrastructure",
        "badgeColor": "quaternary",
        "brandColor": "#FF9900",
        "description": "Amazon Web Services infrastructure: EC2 compute instance configuration, S3 object storage for image datasets, and scalable hosting.",
        "keyCapabilities": [
            "Amazon S3 buckets for large image dataset archives",
            "EC2 Linux instance setup & SSH security groups",
            "IAM access credentials and permission policies",
            "Basic load balancing and CDN caching"
        ],
        "projects": [
            {
                "id": "diabetic-retinopathy",
                "name": "Diabetic Retinopathy AI"
            }
        ],
        "svgIcon": "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M18.7 14.8c-2.4 1.8-5.8 2.7-8.8 2.7-4.2 0-8-1.5-10.9-4.1-.2-.2-.3-.1-.1.1 3.1 2.8 7.3 4.5 11.7 4.5 3.3 0 7-1 9.7-2.9.4-.2.2-.6-.2-.3zm2.3-.9c-.3-.4-2-.2-3-.1-.3 0-.3-.3-.1-.4 1.5-1.1 3.9-.8 4.2-.4.3.4-.1 2.8-1.5 4-.2.2-.4.1-.3-.2.3-.9.9-2.5.7-2.9zM12 2C6.5 2 2 6.5 2 12c0 2.4.9 4.6 2.4 6.3l1.5-1.5C4.7 15.4 4 13.8 4 12c0-4.4 3.6-8 8-8s8 3.6 8 8c0 1.8-.6 3.4-1.7 4.7l1.5 1.5C21.1 16.6 22 14.4 22 12c0-5.5-4.5-10-10-10z\"/></svg>"
    },
    {
        "id": "linux",
        "name": "Linux & Bash",
        "category": "devops",
        "categoryLabel": "Systems & DevOps",
        "level": "Advanced",
        "powerLevel": "9,300 KI",
        "powerPercent": 93,
        "experience": "3+ Years",
        "badgeColor": "accent",
        "brandColor": "#FCC624",
        "description": "Command-line proficiency in Ubuntu/Debian: shell scripting, process daemon management, permissions, and remote server automation.",
        "keyCapabilities": [
            "Bash script automation for data processing jobs",
            "Systemd service configuration & daemon restarts",
            "Cron scheduling & log rotation management",
            "SSH key authentication & secure file transfers"
        ],
        "projects": [
            {
                "id": "diabetic-retinopathy",
                "name": "Diabetic Retinopathy AI"
            },
            {
                "id": "facial-recognition",
                "name": "Face Recognition Attendance"
            }
        ],
        "svgIcon": "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M12.001 0c-3.1 0-5.5 2.4-5.5 5.5 0 1.3.4 2.5 1.1 3.5-.8 1.4-1.6 3.1-1.6 5 0 2.2.8 4.1 2.2 5.3-.6.6-1.2 1.4-1.2 2.4 0 1.3 1.3 2.3 3.5 2.3 1.5 0 2.6-.4 3.5-.9.9.5 2 .9 3.5.9 2.2 0 3.5-1 3.5-2.3 0-1-.6-1.8-1.2-2.4 1.4-1.2 2.2-3.1 2.2-5.3 0-1.9-.8-3.6-1.6-5 .7-1 1.1-2.2 1.1-3.5C17.5 2.4 15.1 0 12 0zm-1.5 4.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-1.5 3c1 0 1.5.5 1.5 1s-.5 1-1.5 1-1.5-.5-1.5-1 .5-1 1.5-1z\"/></svg>"
    },
    {
        "id": "php",
        "name": "PHP",
        "category": "backend",
        "categoryLabel": "Backend & Web",
        "level": "Intermediate",
        "powerLevel": "8,800 KI",
        "powerPercent": 88,
        "experience": "2 Years • Full-Stack Platform",
        "badgeColor": "secondary",
        "brandColor": "#777BB4",
        "description": "Server-side web scripting, session handling, database interactions with PDO, and external nutritional REST API integration for Foodies Goodies.",
        "keyCapabilities": [
            "Server-side user authentication & session management",
            "MySQL database integration via secure PDO",
            "Edamam REST API consumption & JSON data mapping",
            "Dynamic recipe catalog filtering and bookmarking"
        ],
        "projects": [
            {
                "id": "foodies-goodies",
                "name": "Foodies Goodies Platform"
            }
        ],
        "svgIcon": "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-5.4 7.2h2.7c1.5 0 2.4.9 2.4 2.1 0 1.5-1.1 2.3-2.5 2.3H8l-.7 3.6H5.5l1.1-8zm6.5 0h2.7c1.5 0 2.4.9 2.4 2.1 0 1.5-1.1 2.3-2.5 2.3h-1.2l-.7 3.6h-1.8l1.1-8zm-5.3 2.8h.9c.5 0 .9-.3.9-.8 0-.4-.3-.6-.8-.6h-.8l-.3 1.4zm6.5 0h.9c.5 0 .9-.3.9-.8 0-.4-.3-.6-.8-.6h-.8l-.3 1.4z\"/></svg>"
    },
    {
        "id": "figma",
        "name": "Figma",
        "category": "frontend",
        "categoryLabel": "UI/UX & Prototyping",
        "level": "Advanced",
        "powerLevel": "9,300 KI",
        "powerPercent": 93,
        "experience": "UI/UX Design & High-Fidelity Wireframes",
        "badgeColor": "accent",
        "brandColor": "#F24E1E",
        "description": "Collaborative interface design, interactive design systems, component auto-layout, vector asset creation, and rapid UX wireframing.",
        "keyCapabilities": [
            "Interactive component variants & auto-layout",
            "Design systems & responsive web wireframes",
            "Prototyping user journeys & micro-interactions",
            "High-fidelity visual mockups & SVG exporting"
        ],
        "projects": [
            {
                "id": "foodies-goodies",
                "name": "Foodies Goodies Platform"
            }
        ],
        "svgIcon": "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4zM4 12c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4zm0-8c0-2.208 1.792-4 4-4h4v8H8C5.792 8 4 6.208 4 4zm8-4h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V0zm0 8h4c2.208 0 4 1.792 4 4s-1.792 4-4 4c-2.208 0-4-1.792-4-4V8z\"/></svg>"
    },
    {
        "id": "canva",
        "name": "Canva",
        "category": "frontend",
        "categoryLabel": "Creative & Visual Media",
        "level": "Proficient",
        "powerLevel": "9,100 KI",
        "powerPercent": 91,
        "experience": "Graphic Branding & Visual Assets",
        "badgeColor": "cyan-pop",
        "brandColor": "#00C4CC",
        "description": "Visual asset design, project presentation decks, social branding graphics, typography compositions, and quick marketing media assets.",
        "keyCapabilities": [
            "Marketing graphics & presentation decks",
            "Visual branding palettes & typography hierarchy",
            "Social media thumbnails & project banners",
            "Fast visual asset composition & asset exporting"
        ],
        "projects": [
            {
                "id": "diabetic-retinopathy",
                "name": "Diabetic Retinopathy AI"
            }
        ],
        "svgIcon": "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm3.896 17.514c-1.84 0-3.328-1.074-3.328-2.614 0-.323.053-.637.152-.932-.821.572-1.82.932-2.92.932-2.316 0-4.048-1.758-4.048-4.14 0-2.912 2.502-5.26 6.038-5.26 3.32 0 5.308 2.054 5.308 4.792 0 1.954-1.127 3.385-2.738 3.385-.688 0-1.157-.354-1.157-.96 0-.174.045-.347.127-.514l.583-1.638c.088-.247.135-.506.135-.765 0-.74-.537-1.258-1.39-1.258-1.536 0-2.71 1.488-2.71 3.42 0 1.258.742 2.094 1.848 2.094.757 0 1.492-.352 2.062-.977.172.88 1.01 1.417 1.93 1.417 1.492 0 2.454-1.18 2.454-2.825 0-2.32-1.716-4.075-4.527-4.075-3.08 0-5.184 1.996-5.184 4.545 0 2.01 1.416 3.475 3.326 3.475.787 0 1.542-.26 2.158-.738l.685 1.05c-.838.647-1.88.995-2.97.995z\"/></svg>"
    }
],

  experience: [
    {
      role: "Software Developer Intern",
      company: "Rashtriya Chemicals & Fertilizers Limited (RCF)",
      shortCompany: "RCF Ltd.",
      location: "Mumbai, India",
      period: "Jan 2026 – Feb 2026",
      duration: "2 Months",
      type: "Enterprise Internship",
      mode: "On-site",
      status: "Completed",
      badgeColor: "accent",
      logo: "assets/rcf_logo.svg",
      logoText: "RCF",
      description: "Architected and delivered an enterprise-grade role-based access control (RBAC) platform integrated with SAP ERP and Active Directory to streamline authorization governance.",
      highlights: [
        "Engineered an SAP-integrated RBAC platform using **C#**, **ASP.NET**, and **Oracle Database**, interfacing with SAP ERP via **SAP NCo** connector.",
        "Implemented **LDAP-based Active Directory authentication** and automated role provisioning utilizing custom **SAP BAPIs** and **Function Modules**.",
        "Delivered granular role administration, **T-Code assignment**, tamper-evident **audit logging**, real-time authorization synchronization, and secure **session management**."
      ],
      impactMetrics: [
        { icon: "shield-check", title: "Enterprise Security", desc: "Granular RBAC & T-Code authorization matrix" },
        { icon: "layers", title: "ERP Integration", desc: "SAP NCo & Active Directory LDAP synchronization" },
        { icon: "file-check", title: "Audit & Governance", desc: "Real-time logging & automated provisioning" }
      ],
      techStack: ["C#", "ASP.NET", "Oracle DB", "SAP NCo", "SAP BAPIs", "Active Directory (LDAP)", "Enterprise RBAC"]
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
      image: "assets/dr_hybrid_dark_demo.mp4",
      video: "assets/dr_hybrid_dark_demo.mp4",
      poster: "assets/dr.png",
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
      image: "assets/face recog.png",
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
      image: "assets/fg.png",
      description: "A comprehensive health and nutrition web platform offering interactive meal planning, calorie tracking, and dynamic recipe filtering.",
      bullets: [
        "Crafted a responsive full-stack platform featuring 100+ categorized recipes, bookmarking, and dynamic search workflows.",
        "Integrated the Edamam REST API for live nutritional breakdown, ingredient parsing, and dietary preference filters.",
        "Implemented personalized BMI-based meal suggestions and database-backed user management using PHP and MySQL."
      ],
      techStack: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL", "Edamam REST API"]
    }
  ],

  achievements: [
  {
    "id": "sih-2024",
    "num": "01",
    "title": "Smart India Hackathon 2024 Finalist",
    "organization": "Ministry of Education & AICTE",
    "period": "2024",
    "badge": "National Finalist",
    "metric": "Top 118 Teams Nationally",
    "color": "tertiary",
    "accentColor": "#10B981",
    "icon": "award",
    "description": "Selected among 118 finalist teams nationwide for architecting a biomimicry-based grey water management and circular filtration solution.",
    "tags": [
      "Biomimicry",
      "Circular Filtration",
      "Sustainability",
      "National Level"
    ],
    "images": [
      {
        "src": "assets/SIH24_4.jpg",
        "caption": "SIH 2024 Finalist Certificate"
      },
      {
        "src": "assets/SIH24_3.jpg",
        "caption": "Architecture Defense & Jury"
      },
      {
        "src": "assets/SIH24_2.jpg",
        "caption": "Team Technocrats in Action"
      },
      {
        "src": "assets/SIH24_1.jpg",
        "caption": "Grand Finale Showcase"
      }
    ]
  },
  {
    "id": "sih-2023",
    "num": "02",
    "title": "Smart India Hackathon 2023 – Top 5 in India",
    "organization": "Ministry of Education & AICTE",
    "period": "2023",
    "badge": "Top 5 in India",
    "metric": "Rank 5 of 258 Teams",
    "color": "secondary",
    "accentColor": "#3B82F6",
    "icon": "trophy",
    "description": "Ranked among the Top 5 teams out of 258 competing teams nationwide for designing an innovative technological menstrual waste disposal & sanitation solution.",
    "tags": [
      "Sanitation Tech",
      "IoT & Embedded",
      "National Top 5",
      "AICTE"
    ],
    "images": [
      {
        "src": "assets/SIH23_4.jpg",
        "caption": "SIH 2023 Top 5 Certificate"
      },
      {
        "src": "assets/SIH23_3.jpg",
        "caption": "National Top 5 Honor Ceremony"
      },
      {
        "src": "assets/SIH23_2.jpg",
        "caption": "Hardware Prototype Defense"
      },
      {
        "src": "assets/SIH23_1.jpg",
        "caption": "AICTE Ministry Commendation"
      }
    ]
  },
  {
    "id": "web-workshop",
    "num": "03",
    "title": "Workshop Instructor – Full Stack Web Dev",
    "organization": "RMCET Computer Engineering Dept.",
    "period": "March 2024",
    "badge": "Leadership & Teaching",
    "metric": "50+ Engineers Mentored",
    "color": "accent",
    "accentColor": "#EC4899",
    "icon": "presentation",
    "description": "Co-conducted an intensive 5-day hands-on practical workshop for 50+ junior engineering students on modern HTML, CSS, JavaScript, and responsive UI architecture.",
    "tags": [
      "Web Architecture",
      "JavaScript",
      "Instruction",
      "Mentorship"
    ],
    "images": [
      {
        "src": "assets/Workshop_1.jpg",
        "caption": "Hands-on Practical Coding Lab"
      },
      {
        "src": "assets/workshop_2.jpg",
        "caption": "Mentoring 50+ Junior Engineers"
      }
    ]
  },
  {
    "id": "student-secretary",
    "num": "04",
    "title": "Student Secretary – RMCET",
    "organization": "Rajendra Mane College of Engineering & Tech",
    "period": "Aug 2024 – May 2026",
    "badge": "Elected Representative",
    "metric": "500+ Students Represented",
    "color": "quaternary",
    "accentColor": "#8B5CF6",
    "icon": "users",
    "description": "Officially represented 500+ undergraduate students; steered technical events, hackathons, academic forums, and cultural symposiums.",
    "tags": [
      "Executive Governance",
      "Hackathons",
      "Event Operations",
      "Advocacy"
    ],
    "images": [
      {
        "src": "assets/Secretary_1.jpg",
        "caption": "Official Student Council Address"
      },
      {
        "src": "assets/Secretary_2.jpg",
        "caption": "Leading Campus Symposium"
      }
    ]
  },
  {
    "id": "youth-festival",
    "num": "05",
    "title": "District & University Youth Festival Competitions",
    "organization": "University of Mumbai",
    "period": "2023 - 2025",
    "badge": "Arts & Creativity",
    "metric": "University & District Level",
    "color": "secondary",
    "accentColor": "#06B6D4",
    "icon": "palette",
    "description": "Represented college at university/district levels in poster-making, creative painting, cartooning, and street plays, demonstrating strong visual and storytelling skills.",
    "tags": [
      "Visual Arts",
      "Storytelling",
      "Creative Painting",
      "Fine Arts"
    ],
    "images": [
      {
        "src": "assets/youth_1.jpg",
        "caption": "Fine Arts Exhibition Presentation"
      },
      {
        "src": "assets/youth_2.jpg",
        "caption": "Creative Poster Design Entry"
      },
      {
        "src": "assets/youth_3.jpg",
        "caption": "University Trophy & Recognition"
      }
    ]
  },
  {
    "id": "tp-volunteer",
    "num": "06",
    "title": "Training & Placement Cell Volunteer",
    "organization": "RMCET T&P Cell",
    "period": "2023 - Present",
    "badge": "Institutional Service",
    "metric": "Placement Drives Coordinated",
    "color": "cyan-pop",
    "accentColor": "#14B8A6",
    "icon": "briefcase",
    "description": "Assisted college placement coordinators in organizing corporate recruitment drives, technical assessment sessions, and mock interview preparations.",
    "tags": [
      "Placement Drives",
      "Corporate Relations",
      "Mock Interviews",
      "Operations"
    ],
    "images": [
      {
        "src": "assets/TNP.jpg",
        "caption": "Training & Placement Operations Team"
      }
    ]
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
