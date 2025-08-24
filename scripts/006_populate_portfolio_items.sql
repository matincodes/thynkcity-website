-- Insert portfolio items data
INSERT INTO public.portfolio_items (title, client_name, industry, challenge, solution, results, image_url, technologies, category) VALUES
(
  'Digital Banking Platform',
  'SecureBank Nigeria',
  'FinTech',
  'SecureBank needed a modern digital banking platform to compete with fintech startups while maintaining enterprise-grade security and regulatory compliance.',
  'We developed a comprehensive digital banking solution with mobile-first design, real-time transaction processing, and advanced fraud detection. The platform includes customer onboarding, account management, payments, and investment services.',
  'Increased digital adoption by 340%, reduced operational costs by 45%, and improved customer satisfaction scores by 60%. The platform now serves over 2 million active users.',
  '/placeholder.svg?height=400&width=600',
  ARRAY['React Native', 'Node.js', 'PostgreSQL', 'AWS', 'Microservices'],
  'FinTech'
),
(
  'E-commerce Marketplace',
  'AfriMart',
  'E-commerce',
  'AfriMart wanted to create a pan-African e-commerce platform that could handle multiple currencies, languages, and payment methods while providing a seamless shopping experience.',
  'Built a scalable marketplace platform with multi-vendor support, integrated payment gateways, inventory management, and logistics optimization. Implemented AI-powered product recommendations and fraud detection.',
  'Facilitated over $50M in transactions within the first year, onboarded 10,000+ vendors across 8 African countries, and achieved 4.8/5 customer satisfaction rating.',
  '/placeholder.svg?height=400&width=600',
  ARRAY['Next.js', 'Python', 'MongoDB', 'Redis', 'Stripe', 'Paystack'],
  'E-commerce'
),
(
  'Learning Management System',
  'EduTech Solutions',
  'Education',
  'EduTech needed a comprehensive LMS that could work offline, support multiple languages, and provide personalized learning paths for students across rural and urban areas.',
  'Developed a progressive web application with offline capabilities, adaptive learning algorithms, and multi-language support. Included features for live classes, assignments, assessments, and progress tracking.',
  'Improved student engagement by 85%, reduced dropout rates by 30%, and enabled learning for over 50,000 students in remote areas with limited internet connectivity.',
  '/placeholder.svg?height=400&width=600',
  ARRAY['Vue.js', 'Laravel', 'MySQL', 'WebRTC', 'PWA'],
  'Education'
),
(
  'Agricultural Supply Chain Platform',
  'FarmConnect',
  'Agriculture',
  'FarmConnect needed to digitize the agricultural supply chain, connecting smallholder farmers directly with buyers while ensuring fair pricing and quality control.',
  'Created a comprehensive platform with farmer profiles, crop tracking, quality assessment tools, logistics management, and integrated payment systems. Included mobile apps for farmers and web dashboards for buyers.',
  'Connected 25,000+ farmers with buyers, increased farmer income by 40%, reduced post-harvest losses by 25%, and processed over $30M in agricultural transactions.',
  '/placeholder.svg?height=400&width=600',
  ARRAY['React', 'Django', 'PostgreSQL', 'Mobile Apps', 'IoT Sensors'],
  'Agriculture'
),
(
  'Telemedicine Platform',
  'HealthBridge Africa',
  'Healthcare',
  'HealthBridge needed a telemedicine solution that could provide quality healthcare access to underserved communities while maintaining patient privacy and regulatory compliance.',
  'Built a secure telemedicine platform with video consultations, electronic health records, prescription management, and integration with local pharmacies. Included mobile apps for patients and web portals for healthcare providers.',
  'Provided healthcare access to 100,000+ patients in remote areas, reduced consultation costs by 60%, and improved health outcomes through continuous monitoring and follow-up care.',
  '/placeholder.svg?height=400&width=600',
  ARRAY['React', 'Node.js', 'MongoDB', 'WebRTC', 'HIPAA Compliance'],
  'Healthcare'
),
(
  'Coworking Space Management',
  'WorkHub Lagos',
  'Real Estate',
  'WorkHub needed a comprehensive management system for their network of coworking spaces, including booking management, member services, and facility optimization.',
  'Developed an integrated platform with space booking, member management, billing automation, facility monitoring, and community features. Included mobile apps for members and admin dashboards for space managers.',
  'Increased space utilization by 55%, improved member satisfaction by 70%, automated 80% of administrative tasks, and expanded to 15 locations across West Africa.',
  '/placeholder.svg?height=400&width=600',
  ARRAY['Angular', 'Express.js', 'MySQL', 'IoT Integration', 'Payment APIs'],
  'Real Estate'
);
