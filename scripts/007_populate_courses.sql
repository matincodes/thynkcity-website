-- Added status field to make courses active and accessible
-- Insert courses data
INSERT INTO public.courses (title, slug, description, curriculum, duration_weeks, sessions_per_week, price, category, level, prerequisites, learning_outcomes, image_url, status) VALUES
(
  'Frontend Development Mastery',
  'frontend-development',
  'Master modern frontend development with HTML5, CSS3, JavaScript, and React. Build responsive, interactive web applications that work across all devices.',
  '{
    "modules": [
      {
        "title": "Web Fundamentals",
        "weeks": 6,
        "topics": ["HTML5 Semantic Elements", "CSS3 Flexbox & Grid", "Responsive Design", "JavaScript ES6+", "DOM Manipulation", "Browser APIs"]
      },
      {
        "title": "React Development",
        "weeks": 8,
        "topics": ["React Components", "State Management", "Hooks", "Context API", "React Router", "Performance Optimization"]
      },
      {
        "title": "Advanced Frontend",
        "weeks": 6,
        "topics": ["TypeScript", "Testing with Jest", "Build Tools", "Progressive Web Apps", "Accessibility", "SEO Optimization"]
      },
      {
        "title": "Professional Development",
        "weeks": 4,
        "topics": ["Version Control with Git", "Code Review", "Deployment", "Performance Monitoring", "Portfolio Building", "Job Interview Prep"]
      }
    ]
  }',
  24,
  3,
  450000.00,
  'adults',
  'beginner',
  ARRAY['Basic computer literacy', 'English proficiency'],
  ARRAY['Build responsive web applications', 'Master React and modern JavaScript', 'Implement professional development workflows', 'Create impressive portfolio projects', 'Prepare for frontend developer roles'],
  '/placeholder.svg?height=300&width=400',
  'active'
),
(
  'Backend Development with Node.js',
  'backend-development',
  'Learn server-side development with Node.js, Express, and databases. Build scalable APIs and web services for modern applications.',
  '{
    "modules": [
      {
        "title": "Server-Side Fundamentals",
        "weeks": 6,
        "topics": ["Node.js Runtime", "Express.js Framework", "RESTful APIs", "HTTP Protocols", "Middleware", "Error Handling"]
      },
      {
        "title": "Database Integration",
        "weeks": 6,
        "topics": ["SQL Databases", "MongoDB", "Database Design", "ORM/ODM", "Data Validation", "Query Optimization"]
      },
      {
        "title": "Authentication & Security",
        "weeks": 6,
        "topics": ["JWT Authentication", "OAuth Integration", "Password Security", "API Security", "Rate Limiting", "CORS"]
      },
      {
        "title": "Deployment & DevOps",
        "weeks": 6,
        "topics": ["Cloud Deployment", "Docker Containers", "CI/CD Pipelines", "Monitoring", "Performance Optimization", "Scaling Strategies"]
      }
    ]
  }',
  24,
  3,
  480000.00,
  'adults',
  'intermediate',
  ARRAY['JavaScript fundamentals', 'Basic understanding of databases'],
  ARRAY['Build robust backend APIs', 'Implement secure authentication systems', 'Deploy applications to cloud platforms', 'Optimize application performance', 'Design scalable system architectures'],
  '/placeholder.svg?height=300&width=400',
  'active'
),
(
  'Data Science & Analytics',
  'data-science',
  'Transform data into insights with Python, machine learning, and statistical analysis. Learn to solve real-world business problems using data.',
  '{
    "modules": [
      {
        "title": "Python for Data Science",
        "weeks": 6,
        "topics": ["Python Fundamentals", "NumPy & Pandas", "Data Cleaning", "Data Visualization", "Jupyter Notebooks", "Statistical Analysis"]
      },
      {
        "title": "Machine Learning",
        "weeks": 8,
        "topics": ["Supervised Learning", "Unsupervised Learning", "Model Evaluation", "Feature Engineering", "Scikit-learn", "Deep Learning Basics"]
      },
      {
        "title": "Data Engineering",
        "weeks": 6,
        "topics": ["SQL for Analytics", "Data Pipelines", "Big Data Tools", "Cloud Platforms", "Data Warehousing", "ETL Processes"]
      },
      {
        "title": "Business Applications",
        "weeks": 4,
        "topics": ["Business Intelligence", "Reporting & Dashboards", "A/B Testing", "Predictive Analytics", "Communication Skills", "Portfolio Projects"]
      }
    ]
  }',
  24,
  3,
  520000.00,
  'adults',
  'intermediate',
  ARRAY['Basic mathematics and statistics', 'Programming experience preferred'],
  ARRAY['Analyze complex datasets', 'Build machine learning models', 'Create data visualizations and reports', 'Implement predictive analytics solutions', 'Communicate insights to stakeholders'],
  '/placeholder.svg?height=300&width=400',
  'active'
),
(
  'AI for Kids with Teachable Machine',
  'ai-kids-teachable-machine',
  'Introduce children to artificial intelligence through Google''s Teachable Machine. Learn to train AI models and create intelligent applications.',
  '{
    "modules": [
      {
        "title": "Introduction to AI",
        "weeks": 6,
        "topics": ["What is AI?", "AI in Daily Life", "Machine Learning Basics", "Teachable Machine Setup", "Image Recognition", "Sound Classification"]
      },
      {
        "title": "Building AI Models",
        "weeks": 8,
        "topics": ["Training Image Models", "Voice Recognition", "Pose Detection", "Data Collection", "Model Testing", "Improving Accuracy"]
      },
      {
        "title": "AI Applications",
        "weeks": 6,
        "topics": ["Smart Home Projects", "Educational Games", "Art with AI", "Music Generation", "Storytelling AI", "Problem-Solving Projects"]
      },
      {
        "title": "Sharing Your AI",
        "weeks": 4,
        "topics": ["Exporting Models", "Web Integration", "Mobile Apps", "Presentation Skills", "AI Ethics", "Future Learning Paths"]
      }
    ]
  }',
  24,
  2,
  280000.00,
  'kids',
  'beginner',
  ARRAY['Basic computer skills', 'Age 8-16 years'],
  ARRAY['Understand AI concepts', 'Train machine learning models', 'Create AI-powered projects', 'Present technical concepts', 'Develop problem-solving skills'],
  '/placeholder.svg?height=300&width=400',
  'active'
),
(
  'Mobile App Development with App Inventor',
  'app-inventor-kids',
  'Create mobile apps without coding using MIT''s App Inventor. Design, build, and publish apps that solve real-world problems.',
  '{
    "modules": [
      {
        "title": "App Inventor Basics",
        "weeks": 6,
        "topics": ["App Inventor Interface", "Visual Programming", "Components & Properties", "Event Handling", "User Interface Design", "Testing Apps"]
      },
      {
        "title": "Interactive Apps",
        "weeks": 8,
        "topics": ["Games & Animation", "Multimedia Apps", "Sensor Integration", "Location Services", "Camera & Gallery", "Sound & Music"]
      },
      {
        "title": "Data & Connectivity",
        "weeks": 6,
        "topics": ["Storing Data", "Web APIs", "Database Integration", "Sharing Features", "Cloud Storage", "Real-time Updates"]
      },
      {
        "title": "Publishing & Sharing",
        "weeks": 4,
        "topics": ["App Testing", "User Feedback", "App Store Basics", "Marketing Your App", "App Monetization", "Future Development"]
      }
    ]
  }',
  24,
  2,
  260000.00,
  'kids',
  'beginner',
  ARRAY['Basic computer skills', 'Age 10-16 years'],
  ARRAY['Build mobile applications', 'Understand app development process', 'Design user-friendly interfaces', 'Publish apps to app stores', 'Develop entrepreneurial thinking'],
  '/placeholder.svg?height=300&width=400',
  'active'
),
(
  'Game Development for Kids',
  'game-development-kids',
  'Create exciting games using Scratch and other kid-friendly tools. Learn programming concepts through game design and development.',
  '{
    "modules": [
      {
        "title": "Game Design Basics",
        "weeks": 6,
        "topics": ["Game Concepts", "Scratch Programming", "Sprites & Backgrounds", "Animation Basics", "Sound Effects", "Simple Games"]
      },
      {
        "title": "Advanced Game Features",
        "weeks": 8,
        "topics": ["Character Movement", "Collision Detection", "Scoring Systems", "Multiple Levels", "Power-ups", "Game Physics"]
      },
      {
        "title": "Game Genres",
        "weeks": 6,
        "topics": ["Platform Games", "Puzzle Games", "Racing Games", "Adventure Games", "Educational Games", "Multiplayer Basics"]
      },
      {
        "title": "Game Publishing",
        "weeks": 4,
        "topics": ["Game Testing", "User Experience", "Game Art", "Sharing Games", "Game Communities", "Career Paths"]
      }
    ]
  }',
  24,
  2,
  270000.00,
  'kids',
  'beginner',
  ARRAY['Basic computer skills', 'Age 8-14 years', 'Curiosity about numbers'],
  ARRAY['Create complete games', 'Understand programming logic', 'Design engaging gameplay', 'Apply creative problem-solving', 'Share projects with others'],
  '/placeholder.svg?height=300&width=400',
  'active'
),
-- Adding 3D Animation course for adults
(
  '3D Animation & Modeling',
  '3d-animation', -- Updated slug from '3d-animation-adults' to '3d-animation' to match expected URL
  'Master 3D animation and modeling using Blender and industry-standard techniques. Create stunning animations for games, films, and marketing.',
  '{
    "modules": [
      {
        "title": "3D Fundamentals",
        "weeks": 6,
        "topics": ["Blender Interface", "3D Modeling Basics", "Mesh Editing", "Materials & Textures", "Lighting Basics", "Camera Work"]
      },
      {
        "title": "Character Animation",
        "weeks": 8,
        "topics": ["Rigging Basics", "Keyframe Animation", "Character Movement", "Facial Animation", "Walk Cycles", "Acting for Animation"]
      },
      {
        "title": "Advanced Techniques",
        "weeks": 6,
        "topics": ["Particle Systems", "Fluid Simulation", "Cloth & Hair", "Compositing", "Rendering Optimization", "Post-Production"]
      },
      {
        "title": "Professional Portfolio",
        "weeks": 4,
        "topics": ["Portfolio Development", "Industry Standards", "Client Work", "Freelancing", "Animation Studios", "Career Guidance"]
      }
    ]
  }',
  24,
  3,
  550000.00,
  'adults',
  'intermediate',
  ARRAY['Basic computer skills', 'Creative mindset', 'Patience for detailed work'],
  ARRAY['Create professional 3D animations', 'Master Blender software', 'Develop strong portfolio', 'Understand animation principles', 'Prepare for animation industry'],
  '/placeholder.svg?height=300&width=400',
  'active'
),
-- Adding DevOps course
(
  'DevOps Engineering',
  'devops', -- Updated slug from 'devops-engineering' to 'devops' to match expected URL
  'Learn modern DevOps practices including CI/CD, containerization, cloud infrastructure, and automation tools for efficient software delivery.',
  '{
    "modules": [
      {
        "title": "DevOps Fundamentals",
        "weeks": 6,
        "topics": ["DevOps Culture", "Version Control", "Linux Administration", "Shell Scripting", "Infrastructure as Code", "Monitoring Basics"]
      },
      {
        "title": "Containerization & Orchestration",
        "weeks": 6,
        "topics": ["Docker Containers", "Kubernetes", "Container Registries", "Microservices", "Service Mesh", "Container Security"]
      },
      {
        "title": "CI/CD & Automation",
        "weeks": 6,
        "topics": ["Jenkins", "GitHub Actions", "GitLab CI", "Automated Testing", "Deployment Strategies", "Pipeline Optimization"]
      },
      {
        "title": "Cloud & Monitoring",
        "weeks": 6,
        "topics": ["AWS/Azure/GCP", "Infrastructure Monitoring", "Log Management", "Performance Optimization", "Incident Response", "Cost Management"]
      }
    ]
  }',
  24,
  3,
  580000.00,
  'adults',
  'intermediate',
  ARRAY['Programming experience', 'Basic Linux knowledge', 'Understanding of software development'],
  ARRAY['Implement CI/CD pipelines', 'Manage containerized applications', 'Deploy to cloud platforms', 'Monitor system performance', 'Automate infrastructure management'],
  '/placeholder.svg?height=300&width=400',
  'active'
),
-- Adding Cloud Computing course
(
  'Cloud Computing Mastery',
  'cloud-computing',
  'Master cloud platforms including AWS, Azure, and Google Cloud. Learn to design, deploy, and manage scalable cloud solutions.',
  '{
    "modules": [
      {
        "title": "Cloud Fundamentals",
        "weeks": 6,
        "topics": ["Cloud Computing Concepts", "Service Models", "Deployment Models", "AWS Basics", "Azure Fundamentals", "Google Cloud Platform"]
      },
      {
        "title": "Infrastructure Services",
        "weeks": 6,
        "topics": ["Virtual Machines", "Storage Solutions", "Networking", "Load Balancing", "Auto Scaling", "Security Groups"]
      },
      {
        "title": "Platform Services",
        "weeks": 6,
        "topics": ["Serverless Computing", "Container Services", "Database Services", "API Management", "Message Queues", "Caching Solutions"]
      },
      {
        "title": "Cloud Architecture",
        "weeks": 6,
        "topics": ["Well-Architected Framework", "Cost Optimization", "Security Best Practices", "Disaster Recovery", "Multi-Cloud Strategies", "Certification Prep"]
      }
    ]
  }',
  24,
  3,
  560000.00,
  'adults',
  'intermediate',
  ARRAY['Basic networking knowledge', 'Programming experience', 'Understanding of system administration'],
  ARRAY['Design cloud architectures', 'Deploy scalable applications', 'Optimize cloud costs', 'Implement security best practices', 'Prepare for cloud certifications'],
  '/placeholder.svg?height=300&width=400',
  'active'
),
-- Adding Project Management course
(
  'Digital Project Management',
  'project-management',
  'Learn modern project management methodologies including Agile, Scrum, and traditional approaches for successful project delivery.',
  '{
    "modules": [
      {
        "title": "Project Management Fundamentals",
        "weeks": 6,
        "topics": ["Project Lifecycle", "Stakeholder Management", "Scope Definition", "Time Management", "Risk Assessment", "Communication Planning"]
      },
      {
        "title": "Agile & Scrum",
        "weeks": 6,
        "topics": ["Agile Principles", "Scrum Framework", "Sprint Planning", "Daily Standups", "Retrospectives", "User Stories"]
      },
      {
        "title": "Tools & Techniques",
        "weeks": 6,
        "topics": ["Project Management Software", "Gantt Charts", "Kanban Boards", "Resource Planning", "Budget Management", "Quality Assurance"]
      },
      {
        "title": "Leadership & Strategy",
        "weeks": 6,
        "topics": ["Team Leadership", "Conflict Resolution", "Change Management", "Strategic Planning", "Performance Metrics", "Professional Certification"]
      }
    ]
  }',
  24,
  3,
  420000.00,
  'adults',
  'beginner',
  ARRAY['Basic business understanding', 'Communication skills', 'Leadership interest'],
  ARRAY['Manage complex projects', 'Lead cross-functional teams', 'Implement Agile methodologies', 'Use project management tools', 'Prepare for PMP certification'],
  '/placeholder.svg?height=300&width=400',
  'active'
),
-- Adding Digital Marketing course
(
  'Digital Marketing Strategy',
  'digital-marketing',
  'Master digital marketing including SEO, social media, content marketing, and paid advertising to grow businesses online.',
  '{
    "modules": [
      {
        "title": "Digital Marketing Foundations",
        "weeks": 6,
        "topics": ["Marketing Strategy", "Customer Personas", "Digital Channels", "Analytics Setup", "Brand Building", "Content Planning"]
      },
      {
        "title": "Search & Content Marketing",
        "weeks": 6,
        "topics": ["SEO Optimization", "Content Creation", "Blog Marketing", "Video Marketing", "Email Campaigns", "Influencer Marketing"]
      },
      {
        "title": "Social Media & Paid Advertising",
        "weeks": 6,
        "topics": ["Social Media Strategy", "Facebook Ads", "Google Ads", "Instagram Marketing", "LinkedIn Marketing", "Ad Campaign Optimization"]
      },
      {
        "title": "Analytics & Growth",
        "weeks": 6,
        "topics": ["Google Analytics", "Conversion Tracking", "A/B Testing", "Growth Hacking", "Marketing Automation", "ROI Measurement"]
      }
    ]
  }',
  24,
  3,
  380000.00,
  'adults',
  'beginner',
  ARRAY['Basic computer skills', 'Interest in marketing', 'Creative thinking'],
  ARRAY['Develop marketing strategies', 'Create engaging content', 'Run successful ad campaigns', 'Analyze marketing performance', 'Build online brand presence'],
  '/placeholder.svg?height=300&width=400',
  'active'
),
-- Adding 3D Animation for kids
(
  '3D Animation for Kids',
  '3d-animation-kids',
  'Introduce children to 3D animation using kid-friendly tools like Tinkercad and Blender basics. Create fun animations and 3D models.',
  '{
    "modules": [
      {
        "title": "3D Basics for Kids",
        "weeks": 6,
        "topics": ["What is 3D?", "Tinkercad Introduction", "Basic Shapes", "3D Thinking", "Simple Models", "Fun Projects"]
      },
      {
        "title": "Animation Fundamentals",
        "weeks": 8,
        "topics": ["Movement Basics", "Keyframes", "Simple Animations", "Character Design", "Storytelling", "Scene Creation"]
      },
      {
        "title": "Creative Projects",
        "weeks": 6,
        "topics": ["Animated Stories", "Game Assets", "Educational Models", "Art Projects", "Collaborative Work", "Presentation Skills"]
      },
      {
        "title": "Sharing & Learning",
        "weeks": 4,
        "topics": ["Project Showcase", "Peer Review", "Online Safety", "Digital Citizenship", "Future Learning", "Career Exploration"]
      }
    ]
  }',
  24,
  2,
  290000.00,
  'kids',
  'beginner',
  ARRAY['Basic computer skills', 'Age 10-16 years', 'Creative interest'],
  ARRAY['Create 3D models and animations', 'Understand spatial thinking', 'Develop creative skills', 'Learn basic design principles', 'Build confidence in technology'],
  '/placeholder.svg?height=300&width=400',
  'active'
),
-- Adding Creative Writing for kids
(
  'Creative Writing & Storytelling',
  'creative-writing-kids',
  'Develop writing skills and creativity through storytelling, poetry, and digital publishing. Express ideas and build communication skills.',
  '{
    "modules": [
      {
        "title": "Writing Fundamentals",
        "weeks": 6,
        "topics": ["Story Structure", "Character Development", "Setting Creation", "Dialogue Writing", "Grammar Basics", "Vocabulary Building"]
      },
      {
        "title": "Different Writing Styles",
        "weeks": 8,
        "topics": ["Short Stories", "Poetry", "Scripts", "Journals", "Letters", "Creative Non-fiction"]
      },
      {
        "title": "Digital Publishing",
        "weeks": 6,
        "topics": ["Digital Tools", "Blog Writing", "E-book Creation", "Illustration Integration", "Online Publishing", "Social Media Writing"]
      },
      {
        "title": "Sharing & Performance",
        "weeks": 4,
        "topics": ["Reading Aloud", "Peer Feedback", "Writing Contests", "Publication Opportunities", "Writing Communities", "Continued Learning"]
      }
    ]
  }',
  24,
  2,
  250000.00,
  'kids',
  'beginner',
  ARRAY['Basic reading skills', 'Age 8-16 years', 'Interest in stories'],
  ARRAY['Write compelling stories', 'Develop strong communication skills', 'Express creativity through writing', 'Use digital publishing tools', 'Build confidence in self-expression'],
  '/placeholder.svg?height=300&width=400',
  'active'
),
-- Adding Mathematics for kids
(
  'Fun Mathematics & Problem Solving',
  'mathematics-kids',
  'Make mathematics exciting through games, puzzles, and real-world applications. Build strong mathematical foundations and problem-solving skills.',
  '{
    "modules": [
      {
        "title": "Number Magic",
        "weeks": 6,
        "topics": ["Number Patterns", "Mental Math Tricks", "Estimation Games", "Number Stories", "Calculator Skills", "Math in Daily Life"]
      },
      {
        "title": "Geometry & Shapes",
        "weeks": 6,
        "topics": ["Shape Recognition", "Measurement", "Area & Perimeter", "3D Shapes", "Symmetry", "Geometric Art"]
      },
      {
        "title": "Problem Solving",
        "weeks": 6,
        "topics": ["Logic Puzzles", "Word Problems", "Strategy Games", "Pattern Recognition", "Mathematical Reasoning", "Critical Thinking"]
      },
      {
        "title": "Math Applications",
        "weeks": 6,
        "topics": ["Math in Science", "Math in Art", "Math in Sports", "Financial Literacy", "Data & Statistics", "Math Competitions"]
      }
    ]
  }',
  24,
  2,
  240000.00,
  'kids',
  'beginner',
  ARRAY['Basic counting skills', 'Age 6-14 years', 'Curiosity about numbers'],
  ARRAY['Develop strong math foundations', 'Solve complex problems', 'Apply math to real situations', 'Build logical thinking skills', 'Gain confidence in mathematics'],
  '/placeholder.svg?height=300&width=400',
  'active'
),
-- Adding Mobile Development course for adults
(
  'Mobile Development Mastery',
  'mobile-development',
  'Build native and cross-platform mobile applications using React Native, Flutter, and native iOS/Android development. Create apps that reach millions of users.',
  '{
    "modules": [
      {
        "title": "Mobile Development Fundamentals",
        "weeks": 6,
        "topics": ["Mobile App Architecture", "UI/UX for Mobile", "Platform Guidelines", "Development Environment Setup", "Version Control", "App Store Guidelines"]
      },
      {
        "title": "Cross-Platform Development",
        "weeks": 8,
        "topics": ["React Native", "Flutter", "Expo Framework", "Navigation", "State Management", "API Integration"]
      },
      {
        "title": "Native Features",
        "weeks": 6,
        "topics": ["Camera & Gallery", "GPS & Maps", "Push Notifications", "Device Storage", "Sensors", "Offline Functionality"]
      },
      {
        "title": "Publishing & Monetization",
        "weeks": 4,
        "topics": ["App Store Submission", "Google Play Store", "App Testing", "Performance Optimization", "Analytics", "Monetization Strategies"]
      }
    ]
  }',
  24,
  3,
  500000.00,
  'adults',
  'intermediate',
  ARRAY['JavaScript/Dart programming experience', 'Basic understanding of mobile platforms'],
  ARRAY['Build cross-platform mobile apps', 'Implement native device features', 'Publish apps to app stores', 'Optimize app performance', 'Develop monetization strategies'],
  '/placeholder.svg?height=300&width=400',
  'active'
),
-- Adding Cybersecurity course for adults
(
  'Cybersecurity Fundamentals',
  'cybersecurity',
  'Master cybersecurity principles, ethical hacking, and digital defense strategies. Protect organizations from cyber threats and build a career in information security.',
  '{
    "modules": [
      {
        "title": "Security Fundamentals",
        "weeks": 6,
        "topics": ["Information Security Principles", "Risk Assessment", "Security Policies", "Compliance Standards", "Threat Landscape", "Security Awareness"]
      },
      {
        "title": "Network Security",
        "weeks": 6,
        "topics": ["Network Protocols", "Firewalls", "VPNs", "Intrusion Detection", "Wireless Security", "Network Monitoring"]
      },
      {
        "title": "Ethical Hacking",
        "weeks": 6,
        "topics": ["Penetration Testing", "Vulnerability Assessment", "Social Engineering", "Web Application Security", "System Exploitation", "Security Tools"]
      },
      {
        "title": "Incident Response",
        "weeks": 6,
        "topics": ["Incident Handling", "Digital Forensics", "Malware Analysis", "Recovery Procedures", "Security Operations", "Career Preparation"]
      }
    ]
  }',
  24,
  3,
  590000.00,
  'adults',
  'intermediate',
  ARRAY['Basic networking knowledge', 'Computer fundamentals', 'Ethical mindset'],
  ARRAY['Identify and mitigate security threats', 'Conduct ethical penetration testing', 'Implement security policies and procedures', 'Respond to security incidents', 'Prepare for cybersecurity certifications'],
  '/placeholder.svg?height=300&width=400',
  'active'
),
-- Adding UI/UX Design course for adults
(
  'UI/UX Design Mastery',
  'ui-ux-design',
  'Master user interface and user experience design principles. Create beautiful, functional designs for web and mobile applications using industry-standard tools.',
  '{
    "modules": [
      {
        "title": "Design Fundamentals",
        "weeks": 6,
        "topics": ["Design Principles", "Color Theory", "Typography", "Layout & Composition", "Visual Hierarchy", "Design Psychology"]
      },
      {
        "title": "User Experience Design",
        "weeks": 6,
        "topics": ["User Research", "Personas & User Stories", "Information Architecture", "User Journey Mapping", "Wireframing", "Usability Testing"]
      },
      {
        "title": "User Interface Design",
        "weeks": 6,
        "topics": ["Figma Mastery", "Adobe XD", "Prototyping", "Design Systems", "Responsive Design", "Mobile UI Patterns"]
      },
      {
        "title": "Professional Practice",
        "weeks": 6,
        "topics": ["Client Communication", "Design Handoff", "Portfolio Development", "Freelancing", "Design Agencies", "Career Growth"]
      }
    ]
  }',
  24,
  3,
  470000.00,
  'adults',
  'beginner',
  ARRAY['Creative mindset', 'Basic computer skills', 'Interest in design'],
  ARRAY['Create professional UI/UX designs', 'Master design tools like Figma', 'Conduct user research and testing', 'Build comprehensive design portfolio', 'Prepare for design career opportunities'],
  '/placeholder.svg?height=300&width=400',
  'active'
),
-- Adding Artificial Intelligence course for adults
(
  'Artificial Intelligence & Machine Learning',
  'artificial-intelligence',
  'Master artificial intelligence and machine learning concepts. Build intelligent systems using Python, TensorFlow, and modern AI frameworks for real-world applications.',
  '{
    "modules": [
      {
        "title": "AI Fundamentals",
        "weeks": 6,
        "topics": ["Introduction to AI", "Machine Learning Basics", "Python for AI", "Data Preprocessing", "Statistical Foundations", "AI Ethics"]
      },
      {
        "title": "Machine Learning Algorithms",
        "weeks": 8,
        "topics": ["Supervised Learning", "Unsupervised Learning", "Neural Networks", "Deep Learning", "TensorFlow & Keras", "Model Evaluation"]
      },
      {
        "title": "Advanced AI Applications",
        "weeks": 6,
        "topics": ["Computer Vision", "Natural Language Processing", "Reinforcement Learning", "AI in Business", "MLOps", "Model Deployment"]
      },
      {
        "title": "AI Project Development",
        "weeks": 4,
        "topics": ["Capstone Projects", "AI Portfolio", "Industry Applications", "Research Methods", "AI Career Paths", "Continuous Learning"]
      }
    ]
  }',
  24,
  3,
  620000.00,
  'adults',
  'advanced',
  ARRAY['Strong programming background', 'Mathematics and statistics knowledge', 'Python experience'],
  ARRAY['Build intelligent AI systems', 'Implement machine learning algorithms', 'Deploy AI models to production', 'Solve complex business problems with AI', 'Prepare for AI engineering roles'],
  '/placeholder.svg?height=300&width=400',
  'active'
);
