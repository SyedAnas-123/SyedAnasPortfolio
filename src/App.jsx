import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Github, Linkedin, Mail, ExternalLink, Brain, Code, Database, Terminal, ChevronDown, Cpu, Layers, Network, ChevronRight, Layout, Server } from 'lucide-react';

// --- Configuration Data ---

const PROJECTS_DATA = {
  "AI & GenAI": [
    {
      title: "RAG Based Medical Assistant Chatbot",
      desc: "A medical chatbot built using LangChain, Pinecone, and OpenAI that retrieves answers from custom medical PDFs. Uses semantic search + RAG for source-backed responses and is deployed with Docker and CI/CD for real-time, reliable medical insights.",
      tech: ["Python", "LangChain", "Pinecone", "OpenAI", "AWS EC2", "Docker", "HuggingFace"],
      links: {
        live: "https://huggingface.co/spaces/syeddddaaaa/Medical_Ai_chatbot-Rag_Based_System",
        github: "https://github.com/SyedAnas-123/End-to-End-Medical-Chatbot-Hosted-on-Cloud-Platform-Vector-Base"
      },
      image: "RAGBOT.png" 
    }
  ],
  "Computer Vision": [
    {
      title: "Real-Time Vehicle Detection,Tracking and Counting System",
      desc: "A real-time computer vision system that detects, tracks, and classifies vehicles/people using YOLOv11 and BoT-SORT. Includes line-crossing logic, unique ID assignment, density monitoring, and analytics for traffic automation and safety.",
      tech: ["YOLOv11", "OpenCV", "BOT-SORT", "Python"],
      links: {
        live: "https://drive.google.com/drive/folders/1tIyoWq02-mXKbWbJjOQxIDPssAM24xvy",
        github: "https://github.com/SyedAnas-123/RealTime-Vehicle-Detection-Tracking-Class-wise-Counting-using-AI-BoT-SORT-Tracking-Algorithm"
      },
      image: "YOLOV11.png"
    }
  ],
  "Deep Learning & NLP": [
    {
      title: "ReviewSense – Deep Learning Sentiment Engine",
      desc: "A deep learning NLP app built with TensorFlow/Keras that classifies sentiment on 50K+ IMDb reviews. Features a Streamlit web interface and automated CI/CD deployment for real-time text analysis.",
      tech: ["TensorFlow", "Keras", "LSTM", "Streamlit", "CI/CD"],
      links: {
        live: "https://movie-sentiment-analysis-app-7kpf.onrender.com",
        github: "https://github.com/SyedAnas-123/Movie-Sentiment-Analysis-App"
      },
      image: "sentiment.png"
    }
  ],
  "Healthcare AI": [
    {
      title: "AI Powered Medical Diagnosis Assistant",
      desc: "A predictive web app that estimates diabetes risk based on key health metrics (age, glucose, BMI, etc.). Designed as an early-warning AI tool to support proactive healthcare decisions.",
      tech: ["Machine Learning", "Scikit-learn", "Flask", "Python"],
      links: {
        live: "https://medical-app-29n3.onrender.com",
        github: "https://github.com/SyedAnas-123/Medical-Analysis-Assitant_for-_Diabetes_and_Hypertension"
      },
      image: "diabetes.png"
    }
  ],
  "Data Analysis": [
    {
      title: "Zomato Delivery App Analysis",
      desc: "An exploratory analysis of Zomato delivery data to uncover trends in customer behavior, delivery efficiency, and restaurant performance, with visual insights to support business decision-making.",
      tech: ["Pandas", "Matplotlib", "Seaborn", "EDA"],
      links: {
        github: "https://github.com/SyedAnas-123"
      },
      image: "zomato.png"
    }
  ],
  "Research Publications": [
    {
      title: "Research Publication – GANs & Web-Scraped Data for Stock Market Forecasting",
      desc: "Lead author of a research paper (under review) analyzing how Generative Adversarial Networks, combined with web-scraped financial data, can improve stock market forecasting in emerging economies. I designed the research framework, synthesized existing studies, and evaluated AI-driven forecasting methods—demonstrating my ability to contribute both practical and academic advancements in AI",
      tech: ["GANs", "Web Scraping", "Research", "PSX"],
      links: {
        github: "https://github.com/SyedAnas-123"
      },
      image: "research.png"
    }
  ]
};

const SKILLS_DATA = [
  {
    category: "AI & Machine Learning",
    icon: Brain,
    skills: [
      "Agentic AI (LangChain, LangGraph)",
      "OpenAI Agents SDK",
      "Generative AI & LLMs",
      "RAG Pipelines",
      "Neural Networks (TensorFlow, Keras)",
      "Deep Learning"
    ]
  },
  {
    category: "Data Science & Analytics",
    icon: Database,
    skills: [
      "Statistical Analysis",
      "Data Mining (ETL)",
      "Exploratory Data Analysis (EDA)",
      "Power BI & Tableau",
      "Predictive Analytics"
    ]
  },
  {
    category: "MLOps & Deployment",
    icon: Server,
    skills: [
      "CI/CD (GitHub Actions)",
      "Docker Containerization",
      "Cloud (Render, Vercel, Railway)",
      "Hugging Face Spaces"
    ]
  },
  {
    category: "Programming & Dev",
    icon: Code,
    skills: [
      "Python (Pandas, NumPy, Scikit-learn)",
      "Full Stack (Flask, HTML, CSS, JS)",
      "3D Frameworks (Three.js)",
      "SQL & Vector Databases (MongoDB, Pinecone)"
    ]
  }
];

// --- Components ---

// 1. Scroll Animation Component
const RevealOnScroll = ({ children, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
    >
      {children}
    </div>
  );
};

// 2. Custom Cursor Component (High Contrast Fuchsia)
const CustomCursor = () => {
  const cursorRef = useRef(null);
  const trailerRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const trailer = trailerRef.current;

    const moveCursor = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      if (cursor) {
        cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      if (trailer) {
        trailer.animate({
          transform: `translate3d(${x - 20}px, ${y - 20}px, 0)`
        }, {
          duration: 500,
          fill: "forwards"
        });
      }
    };

    window.addEventListener('mousemove', moveCursor);
    
    const handleMouseOver = () => trailer?.classList.add('hovering');
    const handleMouseOut = () => trailer?.classList.remove('hovering');

    const hoverables = document.querySelectorAll('a, button, .project-item, .cursor-bloom');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', handleMouseOver);
      el.addEventListener('mouseleave', handleMouseOut);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      hoverables.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseOver);
        el.removeEventListener('mouseleave', handleMouseOut);
      });
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="fixed top-0 left-0 w-2 h-2 bg-fuchsia-500 rounded-full pointer-events-none z-[9999] shadow-[0_0_10px_rgba(217,70,239,0.8)]" />
      <div ref={trailerRef} className="fixed top-0 left-0 w-10 h-10 border border-fuchsia-500/50 rounded-full pointer-events-none z-[9998] transition-all duration-300 ease-out flex items-center justify-center custom-cursor-trailer" />
      <style>{`
        .custom-cursor-trailer.hovering {
          width: 60px;
          height: 60px;
          background-color: rgba(217, 70, 239, 0.1);
          border-color: #d946ef;
          box-shadow: 0 0 20px rgba(217, 70, 239, 0.4);
        }
      `}</style>
    </>
  );
};

// 3. 3D Background
const NeuralNetworkBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.002);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    const particleCount = 150;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
      velocities.push({
        x: (Math.random() - 0.5) * 0.05,
        y: (Math.random() - 0.5) * 0.05,
        z: (Math.random() - 0.5) * 0.05,
      });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const material = new THREE.PointsMaterial({
      color: 0x00ffff,
      size: 0.7,
      transparent: true,
      opacity: 0.8,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x8a2be2,
      transparent: true,
      opacity: 0.15,
    });

    const linesGeometry = new THREE.BufferGeometry();
    const lines = new THREE.LineSegments(linesGeometry, lineMaterial);
    scene.add(lines);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX - windowHalfX) * 0.05;
      mouseY = (event.clientY - windowHalfY) * 0.05;
    };

    document.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);
      targetX = mouseX * 0.001;
      targetY = mouseY * 0.001;
      particles.rotation.y += 0.05 * (targetX - particles.rotation.y);
      particles.rotation.x += 0.05 * (targetY - particles.rotation.x);
      lines.rotation.y = particles.rotation.y;
      lines.rotation.x = particles.rotation.x;

      const posAttribute = geometry.attributes.position;
      for (let i = 0; i < particleCount; i++) {
        let x = posAttribute.getX(i);
        let y = posAttribute.getY(i);
        let z = posAttribute.getZ(i);
        x += velocities[i].x;
        y += velocities[i].y;
        z += velocities[i].z;
        if (x > 50 || x < -50) velocities[i].x *= -1;
        if (y > 50 || y < -50) velocities[i].y *= -1;
        if (z > 50 || z < -50) velocities[i].z *= -1;
        posAttribute.setXYZ(i, x, y, z);
      }
      posAttribute.needsUpdate = true;

      const linePositions = [];
      const nodePositions = particles.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dist = Math.sqrt(
            (nodePositions[i * 3] - nodePositions[j * 3]) ** 2 +
            (nodePositions[i * 3 + 1] - nodePositions[j * 3 + 1]) ** 2 +
            (nodePositions[i * 3 + 2] - nodePositions[j * 3 + 2]) ** 2
          );
          if (dist < 15) {
            linePositions.push(nodePositions[i * 3], nodePositions[i * 3 + 1], nodePositions[i * 3 + 2]);
            linePositions.push(nodePositions[j * 3], nodePositions[j * 3 + 1], nodePositions[j * 3 + 2]);
          }
        }
      }
      lines.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full -z-10 bg-[#050505]" />;
};

// 4. UI Components

const SectionHeading = ({ title, subtitle }) => (
  <div className="mb-12 text-center relative z-10">
    <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-4">
      {title}
    </h2>
    <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full"></div>
    {subtitle && <p className="text-gray-400 mt-4 max-w-2xl mx-auto">{subtitle}</p>}
  </div>
);

const GlassCard = ({ children, className = "" }) => (
  <div className={`backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 shadow-xl hover:shadow-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300 ${className}`}>
    {children}
  </div>
);

// UPDATED: Physics-based "Air Drag" Preview Component
const ProjectPreview = ({ activeImage, mousePos }) => {
  const previewRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0 });
  const rotRef = useRef({ x: 0, y: 0 }); // Store smoothed rotation
  const rafRef = useRef(null);

  // Reset position when an image is first shown
  useEffect(() => {
    if (activeImage) {
      posRef.current = { x: mousePos.x, y: mousePos.y + 60 };
      rotRef.current = { x: 0, y: 0 };
    }
  }, [activeImage]);

  useEffect(() => {
    const animate = () => {
      if (!previewRef.current || !activeImage) return;

      // 1. Target Calculation
      // Place image nicely below cursor
      const targetX = mousePos.x + 30; 
      const targetY = mousePos.y + 70; 

      // 2. Physics Constants
      const positionEase = 0.1;     // How fast it chases the cursor (0.1 = smooth lag)
      const rotationEase = 0.12;    // Inertia: how fast rotation reacts to movement
      const maxTilt = 25;           // Limit maximum angle so it doesn't flip
      const tiltSensitivity = 0.35; // Strength of the air resistance effect

      // 3. Calculate "Velocity" (Distance to target)
      const dx = targetX - posRef.current.x;
      const dy = targetY - posRef.current.y;

      // 4. Update Position (Lerp)
      posRef.current.x += dx * positionEase;
      posRef.current.y += dy * positionEase;

      // 5. Calculate Target Rotation (Air Resistance Model)
      // Move Right (dx > 0) -> Air hits right edge -> Tilt Right Edge Back (rotateY positive)
      // Move Left (dx < 0) -> Air hits left edge -> Tilt Left Edge Back (rotateY negative)
      const targetRotateY = dx * tiltSensitivity; 

      // Move Down (dy > 0) -> Air hits bottom edge -> Tilt Bottom Back (rotateX negative)
      // Move Up (dy < 0) -> Air hits top edge -> Tilt Top Back (rotateX positive)
      const targetRotateX = -dy * tiltSensitivity; 

      // 6. Smooth Rotation (Lerp for Inertia)
      rotRef.current.x += (targetRotateX - rotRef.current.x) * rotationEase;
      rotRef.current.y += (targetRotateY - rotRef.current.y) * rotationEase;

      // 7. Apply Transforms with Perspective
      // Using large perspective (1000px) for realistic 3D depth
      previewRef.current.style.transform = `
        translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) 
        perspective(1000px) 
        rotateX(${Math.max(Math.min(rotRef.current.x, maxTilt), -maxTilt)}deg) 
        rotateY(${Math.max(Math.min(rotRef.current.y, maxTilt), -maxTilt)}deg)
      `;
      
      rafRef.current = requestAnimationFrame(animate);
    };

    if (activeImage) {
      rafRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [mousePos, activeImage]);

  if (!activeImage) return null;

  return (
    <div 
      ref={previewRef}
      className="fixed top-0 left-0 z-50 pointer-events-none hidden md:block will-change-transform"
      style={{ 
        // Initial placement to avoid jumping
        transform: `translate3d(${mousePos.x}px, ${mousePos.y + 60}px, 0)` 
      }}
    >
      <div className="w-80 h-52 bg-black/90 rounded-xl overflow-hidden border border-cyan-500/50 shadow-[0_20px_50px_rgba(6,182,212,0.3)] relative">
        <img 
          src={activeImage} 
          alt="Project Preview" 
          className="w-full h-full object-cover opacity-90"
          onError={(e) => {
             e.target.src = `https://placehold.co/600x400/000000/06b6d4?text=Preview+Image`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
        <div className="absolute bottom-3 left-4 flex items-center gap-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-cyan-300 font-mono tracking-widest">LIVE PREVIEW</span>
        </div>
      </div>
    </div>
  );
};

const ProjectList = ({ setPreviewImage, setMousePos }) => {
  const [activeCategory, setActiveCategory] = useState("Computer Vision");

  return (
    <div className="w-full max-w-5xl mx-auto min-h-[600px] flex flex-col md:flex-row gap-8">
      {/* Categories Sidebar */}
      <div className="md:w-1/3 space-y-2">
        {Object.keys(PROJECTS_DATA).map((category) => (
          <RevealOnScroll key={category}>
            <button
              onClick={() => setActiveCategory(category)}
              className={`w-full text-left px-6 py-4 rounded-lg transition-all duration-300 flex justify-between items-center group ${
                activeCategory === category 
                  ? 'bg-gradient-to-r from-cyan-900/40 to-transparent border-l-4 border-cyan-400 text-white' 
                  : 'hover:bg-white/5 text-gray-400 hover:text-cyan-200'
              }`}
            >
              <span className="font-medium tracking-wide">{category}</span>
              <ChevronRight className={`transition-transform duration-300 ${activeCategory === category ? 'text-cyan-400 translate-x-1' : 'opacity-0 group-hover:opacity-50'}`} size={16} />
            </button>
          </RevealOnScroll>
        ))}
      </div>

      {/* Projects List */}
      <div className="md:w-2/3 space-y-6">
        <div className="animate-fade-in">
           <RevealOnScroll>
              <h3 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
                <span className="text-white opacity-50">//</span> {activeCategory}
              </h3>
           </RevealOnScroll>
           
           <div className="space-y-6">
             {PROJECTS_DATA[activeCategory].map((project, idx) => (
               <RevealOnScroll key={idx}>
                 <div 
                   className="project-item group relative p-6 bg-white/5 border border-white/10 rounded-xl hover:border-cyan-500/50 hover:bg-white/10 transition-all duration-300 cursor-none-target"
                   data-preview-img={project.image}
                   onMouseEnter={(e) => {
                     setPreviewImage(project.image);
                     setMousePos({ x: e.clientX, y: e.clientY });
                   }}
                   onMouseMove={(e) => {
                     setMousePos({ x: e.clientX, y: e.clientY });
                   }}
                   onMouseLeave={() => setPreviewImage(null)}
                 >
                   <div className="flex justify-between items-start mb-3">
                     <h4 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{project.title}</h4>
                     <div className="flex gap-3">
                       {project.links.live && (
                         <a href={project.links.live} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors cursor-bloom" title="Live Demo">
                           <ExternalLink size={18} />
                         </a>
                       )}
                       {project.links.github && (
                         <a href={project.links.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors cursor-bloom" title="GitHub Code">
                           <Github size={18} />
                         </a>
                       )}
                     </div>
                   </div>
                   
                   <p className="text-gray-300 text-sm leading-relaxed mb-4 border-l-2 border-purple-500/30 pl-4">
                     {project.desc}
                   </p>

                   <div className="flex flex-wrap gap-2">
                     {project.tech.map((t, i) => (
                       <span key={i} className="px-2 py-1 text-xs font-mono text-cyan-300 bg-cyan-900/20 rounded border border-cyan-500/10">
                         {t}
                       </span>
                     ))}
                   </div>
                 </div>
               </RevealOnScroll>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Portfolio Component ---

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [previewImage, setPreviewImage] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen text-white font-sans selection:bg-cyan-500/30 selection:text-cyan-100 cursor-none">
      <CustomCursor />
      <NeuralNetworkBackground />
      
      {/* CSS for Drop and Bounce Animation */}
      <style>{`
        @keyframes dropBounce {
          0% { transform: translateY(-100vh); opacity: 0; }
          20% { transform: translateY(0); opacity: 1; }
          35% { transform: translateY(-60px); }
          50% { transform: translateY(0); }
          65% { transform: translateY(-30px); }
          80% { transform: translateY(0); }
          90% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }
        .animate-drop-bounce {
          animation: dropBounce 4s ease-out forwards;
        }
      `}</style>

      {/* 3D Hover Preview Portal */}
      <ProjectPreview activeImage={previewImage} mousePos={mousePos} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-40 backdrop-blur-lg bg-[#050505]/70 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 cursor-pointer cursor-bloom" onClick={() => scrollToSection('home')}>
            SYED.ANAS
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
            {['Home', 'About', 'Experience', 'Projects', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="hover:text-cyan-400 transition-colors uppercase tracking-widest text-xs cursor-bloom"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center px-6 pt-16">
        {/* REPLACED RevealOnScroll with new animate-drop-bounce class */}
        <div className="w-full animate-drop-bounce">
          <div className="max-w-4xl mx-auto text-center z-10">
            <div className="inline-block mb-4 px-4 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-cyan-400 text-xs font-mono tracking-widest">AVAILABLE FOR HIRE</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight mb-6 leading-tight">
              AI ENGINEER <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
                & DEVELOPER
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Innovative Junior AI Engineer specializing in Agentic AI, Generative Models, and RAG pipelines. 
              Turning complex data into intelligent solutions.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => scrollToSection('projects')}
                className="cursor-bloom px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-full transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
              >
                View My Work
              </button>
              <a 
                href="https://www.linkedin.com/in/syed-anas91" 
                target="_blank" 
                rel="noreferrer"
                className="cursor-bloom px-8 py-3 bg-transparent border border-white/20 hover:bg-white/5 text-white font-medium rounded-full transition-all flex items-center gap-2"
              >
                <Linkedin size={18} /> LinkedIn
              </a>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-gray-500" size={32} />
        </div>
      </section>

      {/* About & Skills Section */}
      <section id="about" className="py-24 px-6 relative z-20">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <SectionHeading title="Expertise & Skills" subtitle="A comprehensive overview of my technical arsenal." />
          </RevealOnScroll>
          
          <div className="grid md:grid-cols-2 gap-12 mt-12">
            {/* About Text */}
            <RevealOnScroll>
              <div className="space-y-6 text-gray-400 leading-relaxed">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <Brain className="text-cyan-400" /> My Journey
                </h3>
                <p>
                  I am an Innovative Junior AI Engineer and Agentic AI Developer based in Karachi. 
                  My passion lies in leveraging cutting-edge AI to solve complex challenges in healthcare, 
                  automation, and intelligent systems.
                </p>
                <p>
                  Currently completing my Bachelor's in Artificial Intelligence at Hamdard University, 
                  I have hands-on experience building LLM-powered applications, Medical RAG pipelines, 
                  and scalable MLOps workflows.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="text-3xl font-bold text-cyan-400">6+</div>
                    <div className="text-xs uppercase tracking-wider mt-1">Major Projects</div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="text-3xl font-bold text-purple-400">10+</div>
                    <div className="text-xs uppercase tracking-wider mt-1">Tech Tools</div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="text-3xl font-bold text-cyan-400">2+</div>
                    <div className="text-xs uppercase tracking-wider mt-1">Major Studies</div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            {/* Detailed Skills Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SKILLS_DATA.map((group, idx) => (
                <RevealOnScroll key={idx}>
                  <GlassCard className="p-5 h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <group.icon className="text-cyan-400" size={24} />
                      <h4 className="font-bold text-white">{group.category}</h4>
                    </div>
                    <ul className="space-y-2">
                      {group.skills.map((skill, sIdx) => (
                        <li key={sIdx} className="text-sm text-gray-400 flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-purple-500"></div>
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-6 bg-gradient-to-b from-transparent to-[#0a0a0a]">
        <div className="max-w-4xl mx-auto">
          <RevealOnScroll>
            <SectionHeading title="Work Experience" />
          </RevealOnScroll>
          <div className="mt-12 space-y-12">
            {/* Experience Item 1 */}
            <RevealOnScroll>
              <div className="relative pl-8 border-l border-white/10">
                 <div className="absolute -left-1.5 top-0 w-3 h-3 bg-cyan-500 rounded-full shadow-[0_0_10px_#06b6d4]"></div>
                 <div className="text-cyan-400 font-mono text-sm mb-1">August 2025 - October 2025</div>
                 <h3 className="text-xl font-bold text-white">AI / Data Analyst Intern</h3>
                 <div className="text-purple-400 text-sm mb-4">DARC Technologies - Karachi</div> 
                 <p className="text-gray-400 text-sm">Worked as an AI/Data Analyst Intern prepared and annotated custom datasets for CV models (players, ball, referee, staff, vehicles) using Roboflow, ensuring high-quality bounding boxes and clean training data.
Developed and tested RAG pipelines and LangChain agents by connecting company document stores to LLMs for automated FAQ and knowledge-query responses</p>
              </div>
            </RevealOnScroll>

            {/* Experience Item 2 */}
            <RevealOnScroll>
              <div className="relative pl-8 border-l border-white/10">
                 <div className="absolute -left-1.5 top-0 w-3 h-3 bg-cyan-500 rounded-full shadow-[0_0_10px_#06b6d4]"></div>
                 <div className="text-cyan-400 font-mono text-sm mb-1">May 2025 - June 2025</div>
                 <h3 className="text-xl font-bold text-white">Call Center Representative</h3>
                 <div className="text-purple-400 text-sm mb-4">Mars Bpo - Karachi</div> 
                 <p className="text-gray-400 text-sm">Handled high-volume outbound calls for an HVAC campaign at Mars BPO, assisting customers with service inquiries and promotions.
Provided clear communication and maintained excellent customer satisfaction while meeting daily performance targets</p>
              </div>
            </RevealOnScroll>

            {/* Experience Item 3 */}
            <RevealOnScroll>
              <div className="relative pl-8 border-l border-white/10">
                 <div className="absolute -left-1.5 top-0 w-3 h-3 bg-cyan-500 rounded-full shadow-[0_0_10px_#06b6d4]"></div>
                 <div className="text-cyan-400 font-mono text-sm mb-1">March 2025 - May 2025</div>
                 <h3 className="text-xl font-bold text-white">ML Engineer Intern</h3>
                 <div className="text-purple-400 text-sm mb-4">Elevvo Pathways - Cairo, Egypt</div> 
                 <p className="text-gray-400 text-sm">Worked on regression, classification, clustering, recommendations, and forecasting, improving models using CNNs, transfer learning, tuning, and SMOTE.
Built strong ML engineering skills with the ability to choose the right algorithm for each business problem</p>
              </div>
            </RevealOnScroll>

            {/* Experience Item 4 */}
            <RevealOnScroll>
               <div className="relative pl-8 border-l border-white/10">
                 <div className="absolute -left-1.5 top-0 w-3 h-3 bg-cyan-500 rounded-full shadow-[0_0_10px_#06b6d4]"></div>
                 <div className="text-cyan-400 font-mono text-sm mb-1">January 2025 - March 2025</div>
                 <h3 className="text-xl font-bold text-white">Generative AI Intern</h3>
                 <div className="text-purple-400 text-sm mb-4">CodeCraft Infotech - Gujrat, India</div>
                 <p className="text-gray-400 text-sm">Built generative AI models using GPT-2, Stable Diffusion, neural style transfer, and pix2pix GANs for creative transformations.
Gained hands-on experience with LLMs, diffusion models, and practical creative AI workflows</p>
               </div>
            </RevealOnScroll>

            {/* Experience Item 5 */}
            <RevealOnScroll>
              <div className="relative pl-8 border-l border-white/10">
                 <div className="absolute -left-1.5 top-0 w-3 h-3 bg-cyan-500 rounded-full shadow-[0_0_10px_#06b6d4]"></div>
                 <div className="text-cyan-400 font-mono text-sm mb-1">Dec 2020 - May 2021</div>
                 <h3 className="text-xl font-bold text-white">Call Center Representative</h3>
                 <div className="text-purple-400 text-sm mb-4">Development Generation - Karachi</div>
                 <p className="text-gray-400 text-sm">Generated leads through cold calling and targeted lists, qualifying prospects based on needs and product fit</p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 relative min-h-screen">
        <RevealOnScroll>
          <SectionHeading 
            title="Featured Projects" 
            subtitle="Explore my work by category. Hover over projects to see previews."
          />
        </RevealOnScroll>
        <ProjectList setPreviewImage={setPreviewImage} setMousePos={setMousePos} />
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <RevealOnScroll>
            <GlassCard className="text-center py-16 px-6">
              <h2 className="text-4xl font-bold text-white mb-4">Let's Work Together</h2>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                I'm currently open for new opportunities in AI Engineering and Data Science.
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 mb-10">
                <a href="mailto:syedanas.2041@gmail.com" className="cursor-bloom flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
                  <Mail size={20} /> syedanas.2041@gmail.com
                </a>
                <a href="tel:03477048223" className="cursor-bloom flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
                  <span>📞</span> 0347-7048223
                </a>
              </div>

              <div className="flex justify-center gap-4">
                <a href="https://github.com/SyedAnas-123" target="_blank" rel="noreferrer" className="cursor-bloom p-4 rounded-full bg-white/5 hover:bg-white/10 hover:text-cyan-400 transition-all">
                  <Github size={24} />
                </a>
                <a href="https://www.linkedin.com/in/syed-anas91" target="_blank" rel="noreferrer" className="cursor-bloom p-4 rounded-full bg-white/5 hover:bg-white/10 hover:text-cyan-400 transition-all">
                  <Linkedin size={24} />
                </a>
              </div>
            </GlassCard>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}