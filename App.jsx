react
import React, { useEffect, useRef, useState } from 'react';
import { 
  ChefHat, 
  Route, 
  ShoppingCart, 
  Cpu, 
  Lightbulb, 
  Users, 
  Scaling, 
  ChevronRight, 
  Mail, 
  Twitter, 
  Linkedin, 
  Github,
  ArrowRight,
  Menu,
  X
} from 'lucide-react';

// --- CUSTOM HOOKS ---

// Hook for scroll animations
const useScrollReveal = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

// --- COMPONENTS ---

const ScrollReveal = ({ children, className = '', delay = 0 }) => {
  const { ref, isVisible } = useScrollReveal();
  
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// NEW LOGO matching the uploaded image
const Logo = ({ className = "w-12 h-12" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="goldGrad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#997300" />
        <stop offset="25%" stopColor="#D4AF37" />
        <stop offset="50%" stopColor="#FFF2CD" />
        <stop offset="75%" stopColor="#D4AF37" />
        <stop offset="100%" stopColor="#997300" />
      </linearGradient>
      <filter id="softGlow">
        <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    {/* Outer Ring (Broken at top right) */}
    <path d="M 75 20 A 42 42 0 1 0 25 80 A 42 42 0 0 0 85 45" fill="none" stroke="url(#goldGrad)" strokeWidth="3" strokeLinecap="round" filter="url(#softGlow)"/>

    {/* Origin Dot at bottom left */}
    <circle cx="17" cy="72" r="3.5" fill="url(#goldGrad)" filter="url(#softGlow)"/>

    {/* Left Sweep (Main curve of 'A' to arrow tip) */}
    <path d="M 20 71 C 40 71, 48 35, 75 15" fill="none" stroke="url(#goldGrad)" strokeWidth="6" strokeLinecap="round" filter="url(#softGlow)"/>

    {/* Right Sweep (Inner leg of 'A') */}
    <path d="M 73 17 C 55 35, 60 60, 78 70" fill="none" stroke="url(#goldGrad)" strokeWidth="5" strokeLinecap="round" filter="url(#softGlow)"/>

    {/* Arrow Head at top right */}
    <path d="M 64 18 L 81 10 L 73 26 Z" fill="url(#goldGrad)" filter="url(#softGlow)"/>

    {/* Inner Circuit Details / Tech Nodes */}
    <path d="M 45 55 C 50 45, 55 35, 65 25" fill="none" stroke="url(#goldGrad)" strokeWidth="1" opacity="0.8" />
    <circle cx="65" cy="25" r="1.5" fill="url(#goldGrad)"/>

    <path d="M 40 61 C 48 50, 52 40, 60 30" fill="none" stroke="url(#goldGrad)" strokeWidth="1" opacity="0.8" />
    <circle cx="60" cy="30" r="1.5" fill="url(#goldGrad)"/>

    <path d="M 52 60 C 55 52, 58 45, 62 38" fill="none" stroke="url(#goldGrad)" strokeWidth="1" opacity="0.8" />
    <circle cx="62" cy="38" r="1.5" fill="url(#goldGrad)"/>
  </svg>
);

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }
      draw() {
        ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      resize();
      particles = [];
      for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(212, 175, 55, ${0.1 - distance/1000})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', init);
    init();
    animate();

    return () => {
      window.removeEventListener('resize', init);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-50" />;
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0B1622]/80 backdrop-blur-lg border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Logo className="w-10 h-10" />
          <span className="text-2xl font-bold tracking-wider font-poppins text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
            ARBeez
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 font-inter text-sm text-gray-300">
          <a href="#about" className="hover:text-[#D4AF37] transition-colors">About</a>
          <a href="#products" className="hover:text-[#D4AF37] transition-colors">Products</a>
          <a href="#ecosystem" className="hover:text-[#D4AF37] transition-colors">Ecosystem</a>
          <a href="#contact" className="px-5 py-2 rounded-full border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0B1622] transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.15)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]">
            Contact Us
          </a>
        </div>

        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#0B1622]/95 backdrop-blur-xl border-b border-white/10 py-6 px-6 flex flex-col gap-4 md:hidden">
          <a href="#about" className="text-gray-300 hover:text-[#D4AF37]" onClick={() => setMobileMenuOpen(false)}>About</a>
          <a href="#products" className="text-gray-300 hover:text-[#D4AF37]" onClick={() => setMobileMenuOpen(false)}>Products</a>
          <a href="#ecosystem" className="text-gray-300 hover:text-[#D4AF37]" onClick={() => setMobileMenuOpen(false)}>Ecosystem</a>
          <a href="#contact" className="text-[#D4AF37]" onClick={() => setMobileMenuOpen(false)}>Contact Us</a>
        </div>
      )}
    </nav>
  );
};

// --- MAIN APP COMPONENT ---

export default function App() {
  return (
    <div className="min-h-screen bg-[#0B1622] text-white font-inter overflow-x-hidden selection:bg-[#D4AF37] selection:text-[#0B1622]">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Poppins:wght@400;500;600;700&display=swap');
        
        .font-poppins { font-family: 'Poppins', sans-serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        
        .text-gradient-gold {
          background: linear-gradient(135deg, #FFF1A0 0%, #D4AF37 50%, #AA8222 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .bg-gradient-gold {
          background: linear-gradient(135deg, #D4AF37 0%, #AA8222 100%);
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        }

        .glass-card:hover {
          border-color: rgba(212, 175, 55, 0.3);
          box-shadow: 0 10px 40px rgba(212, 175, 55, 0.1);
          transform: translateY(-5px);
        }

        @keyframes flow {
          0% { stroke-dashoffset: 100; }
          100% { stroke-dashoffset: 0; }
        }
        .animate-flow {
          stroke-dasharray: 10;
          animation: flow 2s linear infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .sweep-hover {
          position: relative;
          overflow: hidden;
        }
        .sweep-hover::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent);
          transform: skewX(-20deg);
          transition: all 0.7s ease;
        }
        .sweep-hover:hover::after {
          left: 150%;
        }
      `}} />

      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <ParticleBackground />
        
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <ScrollReveal>
            <div className="flex justify-center mb-8 animate-float">
              <Logo className="w-24 h-24 md:w-36 md:h-36 drop-shadow-[0_0_30px_rgba(212,175,55,0.5)]" />
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-poppins tracking-tight mb-6 leading-tight">
              AI-Powered Innovation <br/>
              <span className="text-gradient-gold">for Everyday Life</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10 font-inter leading-relaxed">
              ARBeez creates intelligent applications that transform cooking, mobility, and commerce through cutting-edge artificial intelligence.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={600} className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="sweep-hover group relative px-8 py-4 bg-gradient-gold text-[#0B1622] font-semibold rounded-full shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_50px_rgba(212,175,55,0.6)] transition-all flex items-center gap-2">
              Launch AI Chef
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-white/5 border border-white/10 hover:border-[#D4AF37]/50 text-white font-semibold rounded-full backdrop-blur-md transition-all hover:bg-white/10 flex items-center gap-2">
              Learn More
            </button>
          </ScrollReveal>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center opacity-50">
          <span className="text-xs text-gray-400 mb-2 uppercase tracking-widest">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#D4AF37] to-transparent"></div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-24 relative z-10">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-8">
                About <span className="text-gradient-gold">ARBeez</span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed font-light mb-8">
                ARBeez is an innovative software company founded by <span className="text-white font-medium">Anandhu</span>, focused on building intelligent applications powered by artificial intelligence.
              </p>
              <p className="text-xl text-gray-400 leading-relaxed font-light">
                Our goal is to create a connected ecosystem of products that help people <span className="text-[#D4AF37]">cook smarter</span>, <span className="text-[#D4AF37]">travel easier</span>, and <span className="text-[#D4AF37]">shop better</span>.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section id="products" className="py-24 relative z-10 bg-[#070D14]">
        {/* Subtle background lines */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="container mx-auto px-6 relative">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-4">Our Products</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">Discover our suite of intelligent solutions designed to enhance your daily routines.</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Product 1: AI Chef (Featured) */}
            <ScrollReveal delay={100} className="lg:col-span-1">
              <div className="glass-card rounded-2xl p-8 relative h-full transition-all duration-500 overflow-hidden group border-[#D4AF37]/30 shadow-[0_0_30px_rgba(212,175,55,0.15)]">
                <div className="absolute top-0 right-0 p-4">
                  <span className="bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
                    Available Now
                  </span>
                </div>
                
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#D4AF37]/20 to-transparent flex items-center justify-center mb-6 border border-[#D4AF37]/30 text-[#D4AF37] group-hover:scale-110 transition-transform duration-500">
                  <ChefHat className="w-8 h-8" />
                </div>
                
                <h3 className="text-2xl font-poppins font-bold mb-3 text-white">AI Chef</h3>
                <p className="text-gray-400 mb-6 min-h-[80px]">
                  An intelligent cooking assistant that helps users create delicious meals using artificial intelligence.
                </p>
                
                <ul className="space-y-3 mb-8 text-sm text-gray-300">
                  {['Recipe generation', 'Ingredient-based suggestions', 'Meal planning', 'Nutrition insights', 'Voice cooking guidance', 'Smart kitchen assistance'].map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-[#D4AF37] mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className="w-full py-3 mt-auto bg-[#D4AF37] text-[#0B1622] font-semibold rounded-xl hover:bg-[#FFF1A0] transition-colors shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                  Launch AI Chef
                </button>
              </div>
            </ScrollReveal>

            {/* Product 2: Transitra */}
            <ScrollReveal delay={200}>
              <div className="glass-card rounded-2xl p-8 relative h-full transition-all duration-500 group">
                <div className="absolute top-0 right-0 p-4">
                  <span className="bg-white/10 text-gray-300 border border-white/10 text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
                    Coming Soon
                  </span>
                </div>
                
                <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 text-gray-300 group-hover:text-[#D4AF37] group-hover:border-[#D4AF37]/30 transition-all duration-500">
                  <Route className="w-8 h-8" />
                </div>
                
                <h3 className="text-2xl font-poppins font-bold mb-3 text-white">ARBeez Transitra</h3>
                <p className="text-gray-400 mb-6 min-h-[80px]">
                  A smart mobility platform designed to improve transportation experiences through intelligent route planning.
                </p>
                
                <ul className="space-y-3 mb-8 text-sm text-gray-300">
                  {['Smart route optimization', 'Real-time travel support', 'Mobility analytics', 'Transport management', 'AI-powered navigation'].map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-gray-500 mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className="w-full py-3 mt-auto bg-white/5 border border-white/10 text-gray-400 font-semibold rounded-xl cursor-not-allowed">
                  Coming Soon
                </button>
              </div>
            </ScrollReveal>

            {/* Product 3: Market */}
            <ScrollReveal delay={300}>
              <div className="glass-card rounded-2xl p-8 relative h-full transition-all duration-500 group">
                <div className="absolute top-0 right-0 p-4">
                  <span className="bg-white/10 text-gray-300 border border-white/10 text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
                    Coming Soon
                  </span>
                </div>
                
                <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 text-gray-300 group-hover:text-[#D4AF37] group-hover:border-[#D4AF37]/30 transition-all duration-500">
                  <ShoppingCart className="w-8 h-8" />
                </div>
                
                <h3 className="text-2xl font-poppins font-bold mb-3 text-white">ARBeez Market</h3>
                <p className="text-gray-400 mb-6 min-h-[80px]">
                  An AI-powered ecommerce platform delivering personalized shopping experiences and smart business solutions.
                </p>
                
                <ul className="space-y-3 mb-8 text-sm text-gray-300">
                  {['AI recommendations', 'Smart product discovery', 'Secure transactions', 'Personalized shopping', 'Business insights'].map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-gray-500 mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className="w-full py-3 mt-auto bg-white/5 border border-white/10 text-gray-400 font-semibold rounded-xl cursor-not-allowed">
                  Coming Soon
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ECOSYSTEM SECTION */}
      <section id="ecosystem" className="py-32 relative z-10 overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#D4AF37]/5 rounded-[100%] blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-6 relative">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-4">The ARBeez Ecosystem</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">Building a connected future where AI helps people cook, move, and shop seamlessly.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="relative max-w-4xl mx-auto h-[400px] md:h-[500px] flex flex-col items-center justify-between">
              
              {/* Central Node */}
              <div className="z-10 bg-[#0B1622] border-2 border-[#D4AF37] px-8 py-4 rounded-2xl shadow-[0_0_30px_rgba(212,175,55,0.4)] flex items-center gap-3">
                <Logo className="w-8 h-8" />
                <span className="text-2xl font-bold font-poppins text-gradient-gold tracking-widest">ARBeez</span>
              </div>

              {/* Animated SVG Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                <defs>
                  <linearGradient id="lineGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#D4AF37" stopOpacity="1" />
                    <stop offset="50%" stopColor="#FFF1A0" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                
                {/* Left Line (Chef) */}
                <path d="M50% 10% C 50% 40%, 15% 40%, 15% 85%" fill="none" stroke="url(#lineGlow)" strokeWidth="2" className="animate-flow opacity-60" />
                <path d="M50% 10% C 50% 40%, 15% 40%, 15% 85%" fill="none" stroke="url(#lineGlow)" strokeWidth="6" className="animate-flow opacity-20 blur-sm" />

                {/* Center Line (Transitra) */}
                <path d="M50% 10% L 50% 85%" fill="none" stroke="url(#lineGlow)" strokeWidth="2" className="animate-flow opacity-60" style={{ animationDelay: '0.5s' }} />
                <path d="M50% 10% L 50% 85%" fill="none" stroke="url(#lineGlow)" strokeWidth="6" className="animate-flow opacity-20 blur-sm" style={{ animationDelay: '0.5s' }} />

                {/* Right Line (Market) */}
                <path d="M50% 10% C 50% 40%, 85% 40%, 85% 85%" fill="none" stroke="url(#lineGlow)" strokeWidth="2" className="animate-flow opacity-60" style={{ animationDelay: '1s' }} />
                <path d="M50% 10% C 50% 40%, 85% 40%, 85% 85%" fill="none" stroke="url(#lineGlow)" strokeWidth="6" className="animate-flow opacity-20 blur-sm" style={{ animationDelay: '1s' }} />
              </svg>

              {/* Bottom Nodes */}
              <div className="w-full flex justify-between z-10 px-4 md:px-0">
                {/* Chef Node */}
                <div className="flex flex-col items-center gap-3 w-1/3">
                  <div className="w-16 h-16 rounded-full bg-[#0B1622] border border-[#D4AF37]/50 flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                    <ChefHat className="w-8 h-8 text-[#D4AF37]" />
                  </div>
                  <span className="font-poppins font-semibold text-white text-sm md:text-base">AI Chef</span>
                </div>
                
                {/* Transitra Node */}
                <div className="flex flex-col items-center gap-3 w-1/3">
                  <div className="w-16 h-16 rounded-full bg-[#0B1622] border border-white/20 flex items-center justify-center">
                    <Route className="w-8 h-8 text-gray-300" />
                  </div>
                  <span className="font-poppins font-semibold text-gray-300 text-sm md:text-base">Transitra</span>
                </div>

                {/* Market Node */}
                <div className="flex flex-col items-center gap-3 w-1/3">
                  <div className="w-16 h-16 rounded-full bg-[#0B1622] border border-white/20 flex items-center justify-center">
                    <ShoppingCart className="w-8 h-8 text-gray-300" />
                  </div>
                  <span className="font-poppins font-semibold text-gray-300 text-sm md:text-base">Market</span>
                </div>
              </div>

            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 bg-[#070D14] relative z-10">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-4">Why Choose Us</h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Cpu className="w-8 h-8"/>, title: "Artificial Intelligence", desc: "Powered by state-of-the-art models." },
              { icon: <Lightbulb className="w-8 h-8"/>, title: "Innovation", desc: "Pioneering the future of everyday tech." },
              { icon: <Users className="w-8 h-8"/>, title: "User-Centered", desc: "Designed intuitively for real human needs." },
              { icon: <Scaling className="w-8 h-8"/>, title: "Scalability", desc: "Built to grow alongside your demands." }
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 150}>
                <div className="glass-card p-8 rounded-2xl text-center group h-full">
                  <div className="w-16 h-16 mx-auto bg-white/5 rounded-2xl flex items-center justify-center mb-6 text-gray-400 group-hover:text-[#D4AF37] group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500 border border-white/5 group-hover:border-[#D4AF37]/30 group-hover:shadow-[0_10px_30px_rgba(212,175,55,0.2)]">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-poppins font-semibold mb-3 text-white">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER SECTION */}
      <section className="py-32 relative z-10 overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-[#D4AF37]/5 to-transparent pointer-events-none"></div>
        
        <div className="container mx-auto px-6">
          <div className="glass-card border border-white/10 rounded-3xl p-8 md:p-16 max-w-5xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-gold"></div>
            
            <div className="flex flex-col md:flex-row items-center gap-12">
              <ScrollReveal className="w-full md:w-1/3 flex justify-center">
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-full p-2 bg-gradient-to-br from-[#D4AF37] to-[#0B1622] relative">
                  <div className="w-full h-full rounded-full bg-[#0B1622] overflow-hidden border-4 border-[#0B1622] flex items-center justify-center relative">
                    <Users className="w-24 h-24 text-white/20" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1622] to-transparent opacity-60"></div>
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={200} className="w-full md:w-2/3 text-center md:text-left">
                <span className="text-[#D4AF37] font-semibold tracking-wider uppercase text-sm mb-2 block">Meet the Founder</span>
                <h2 className="text-4xl md:text-5xl font-poppins font-bold mb-8">Anandhu</h2>
                
                <blockquote className="relative">
                  <span className="absolute -top-6 -left-6 text-6xl text-white/10 font-serif">"</span>
                  <p className="text-xl md:text-2xl font-light text-gray-300 leading-relaxed italic relative z-10">
                    Technology should make everyday life simpler, smarter, and more accessible. ARBeez is built to bring that vision to reality.
                  </p>
                  <span className="absolute -bottom-10 right-0 text-6xl text-white/10 font-serif">"</span>
                </blockquote>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 bg-[#070D14] relative z-10 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-poppins font-bold mb-4">
                Let's Build the <span className="text-gradient-gold">Future</span> Together
              </h2>
              <p className="text-gray-400">Get in touch to learn more about our AI solutions or partnership opportunities.</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <ScrollReveal delay={100}>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">First Name</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/50 transition-colors" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Last Name</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/50 transition-colors" placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email</label>
                  <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/50 transition-colors" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Message</label>
                  <textarea rows="4" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/50 transition-colors" placeholder="How can we help you?"></textarea>
                </div>
                <button type="button" className="sweep-hover w-full py-4 bg-gradient-gold text-[#0B1622] font-semibold rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all">
                  Send Message
                </button>
              </form>
            </ScrollReveal>

            <ScrollReveal delay={300} className="flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-poppins font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <a href="mailto:hello@arbeez.ai" className="flex items-center gap-4 text-gray-400 hover:text-[#D4AF37] transition-colors group">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#D4AF37]/10 transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <span className="text-lg">hello@arbeez.ai</span>
                  </a>
                  
                  <div className="pt-8">
                    <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Follow Us</h4>
                    <div className="flex gap-4">
                      {[Twitter, Linkedin, Github].map((Icon, i) => (
                        <a key={i} href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-[#0B1622] hover:bg-[#D4AF37] transition-all hover:scale-110">
                          <Icon className="w-5 h-5" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 glass-card p-8 rounded-2xl border-white/10">
                <h4 className="text-xl font-poppins font-bold mb-2">Subscribe to our Newsletter</h4>
                <p className="text-sm text-gray-400 mb-6">Get the latest news and updates on our AI products.</p>
                <div className="flex gap-2">
                  <input type="email" placeholder="Email address" className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D4AF37]/50" />
                  <button className="px-6 py-2 bg-white text-[#0B1622] font-semibold rounded-lg hover:bg-[#D4AF37] transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-12 bg-[#0B1622] relative z-10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <Logo className="w-8 h-8" />
            <span className="text-xl font-bold font-poppins text-white">ARBeez</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400 font-inter">
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Home</a>
            <a href="#products" className="hover:text-[#D4AF37] transition-colors">Products</a>
            <a href="#about" className="hover:text-[#D4AF37] transition-colors">About</a>
            <a href="#contact" className="hover:text-[#D4AF37] transition-colors">Contact</a>
          </div>

          <div className="text-sm text-gray-500 text-center md:text-right">
            <p>ARBeez © 2026</p>
            <p>Building the Future with Artificial Intelligence.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}


```
