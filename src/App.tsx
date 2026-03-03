/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link, 
  useParams, 
  useLocation,
  useNavigate
} from 'react-router-dom';
import { 
  Globe, 
  GraduationCap, 
  BookOpen, 
  CheckCircle, 
  Phone, 
  MessageCircle, 
  ChevronRight, 
  Star, 
  Users, 
  Clock, 
  Award,
  Menu,
  X,
  ArrowRight,
  MapPin,
  Calendar,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Constants & Data ---

const WHATSAPP_LINK = "https://wa.me/919878755542";
const PHONE_NUMBER = "+91 79863 23691";

const COUNTRIES = [
  { 
    id: 'australia',
    name: 'Australia', 
    flag: '🇦🇺', 
    curriculum: 'ACARA, NSW (HSC), VCE, QCE, SACE, WACE, IB, IGCSE',
    details: 'Our Australian program is meticulously aligned with the ACARA standards. We provide specialized coaching for NAPLAN and state-specific senior secondary certificates like HSC (NSW) and VCE (Victoria).',
    exams: ['NAPLAN', 'OC Test', 'ACER Scholarship', 'HSC', 'VCE'],
    image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80&w=800',
    secondaryImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 'usa',
    name: 'USA', 
    flag: '🇺🇸', 
    curriculum: 'Common Core, AP, SAT Prep, IB, IGCSE',
    details: 'For students in the US, we focus on Common Core standards and advanced placement (AP) courses. Our SAT/ACT prep modules are designed to help students secure admissions in top-tier universities.',
    exams: ['SAT', 'ACT', 'AP Exams', 'PSAT'],
    image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&q=80&w=800',
    secondaryImage: 'https://images.unsplash.com/photo-1517483000871-1dbf64a6e1c6?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 'canada',
    name: 'Canada', 
    flag: '🇨🇦', 
    curriculum: 'Ontario, British Columbia, IB, IGCSE',
    details: 'We cover provincial curricula including Ontario (OSSD) and British Columbia. Our tutors help students navigate the transition between Canadian standards and international IB/IGCSE requirements.',
    exams: ['EQAO', 'OSSST', 'IB Diploma'],
    image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&q=80&w=800',
    secondaryImage: 'https://images.unsplash.com/photo-1517090504586-fde19ea6066f?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 'uk',
    name: 'UK', 
    flag: '🇬🇧', 
    curriculum: 'National Curriculum, IGCSE, A-Levels, IB',
    details: 'Our UK-focused sessions cover the Key Stages (KS1-KS4), GCSEs, and A-Levels. We emphasize deep subject knowledge required for the rigorous British examination boards.',
    exams: ['GCSE', 'IGCSE', 'A-Levels', '11+ Plus'],
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800',
    secondaryImage: 'https://images.unsplash.com/photo-1454165833767-027ffea9e778?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 'uae',
    name: 'UAE', 
    flag: '🇦🇪', 
    curriculum: 'CBSE, British, IB, IGCSE, Cambridge',
    details: 'Serving the large NRI community in the UAE, we offer specialized CBSE coaching alongside British and IB curriculum support, catering to schools across Dubai, Abu Dhabi, and Sharjah.',
    exams: ['CBSE Boards', 'IGCSE', 'IB MYP/DP'],
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800',
    secondaryImage: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 'singapore',
    name: 'Singapore', 
    flag: '🇸🇬', 
    curriculum: 'Singapore National, Cambridge, IB, IGCSE',
    details: 'Singapore\'s curriculum is world-renowned for its math and science standards. Our tutors are trained to deliver high-level conceptual clarity required for Singapore national exams.',
    exams: ['PSLE', 'O-Levels', 'A-Levels', 'IB'],
    image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&q=80&w=800',
    secondaryImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 'germany',
    name: 'Germany', 
    flag: '🇩🇪', 
    curriculum: 'Abitur, International Support, IB, IGCSE',
    details: 'We support students in international schools in Germany, focusing on IB and IGCSE, while also providing supplementary help for those following the local Abitur track.',
    exams: ['IB', 'IGCSE', 'Abitur Support'],
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=800',
    secondaryImage: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 'spain',
    name: 'Spain', 
    flag: '🇪🇸', 
    curriculum: 'ESO, Bachillerato, IB, IGCSE',
    details: 'Our Spanish program covers both the local ESO/Bachillerato requirements and international curricula common in expat communities.',
    exams: ['Selectividad', 'ESO', 'IB'],
    image: 'https://images.unsplash.com/photo-1583341612074-ccea5cd64f6a?auto=format&fit=crop&q=80&w=800',
    secondaryImage: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 'france',
    name: 'France', 
    flag: '🇫🇷', 
    curriculum: 'French National, IB, IGCSE',
    details: 'We provide academic support for students in France, helping them balance the rigorous French national curriculum with international standards.',
    exams: ['Brevet', 'Baccalauréat', 'IB'],
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800',
    secondaryImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 'sweden',
    name: 'Sweden', 
    flag: '🇸🇪', 
    curriculum: 'Swedish National, IB, IGCSE',
    details: 'Supporting students in the Nordic region with a focus on IB schools and the Swedish national curriculum requirements.',
    exams: ['Nationella prov', 'IB', 'IGCSE'],
    image: 'https://images.unsplash.com/photo-1509339022327-1e1e25360a41?auto=format&fit=crop&q=80&w=800',
    secondaryImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800'
  },
];

const SUBJECTS = [
  { name: 'Mathematics', icon: '📐', color: 'bg-blue-500' },
  { name: 'Physics', icon: '⚛️', color: 'bg-purple-500' },
  { name: 'Chemistry', icon: '🧪', color: 'bg-emerald-500' },
  { name: 'Biology', icon: '🧬', color: 'bg-rose-500' },
  { name: 'English', icon: '📚', color: 'bg-amber-500' },
];

// --- Components ---

const FlippingText = () => {
  const words = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-[1.2em] overflow-hidden inline-flex items-center align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.5, ease: "backOut" }}
          className="text-indigo-600 block"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-indigo-600 p-2 rounded-xl group-hover:rotate-12 transition-transform">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              BHANU <span className="text-indigo-600">TUITION</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Home</Link>
            {isHome ? (
              <>
                <a href="#curriculum" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Curriculum</a>
                <a href="#subjects" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Subjects</a>
              </>
            ) : (
              <Link to="/#curriculum" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Curriculum</Link>
            )}
            <a 
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-indigo-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 hover:-translate-y-0.5"
            >
              Free Demo Class
            </a>
          </div>

          <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white border-b border-slate-200 absolute w-full"
          >
            <div className="px-4 py-6 space-y-4">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="block text-lg font-bold text-slate-900">Home</Link>
              <a href="#curriculum" onClick={() => setIsMenuOpen(false)} className="block text-lg font-bold text-slate-900">Curriculum</a>
              <a 
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-indigo-600 text-white text-center py-4 rounded-xl font-bold"
              >
                Book Free Demo
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-slate-900 text-white py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight">
              BHANU <span className="text-indigo-400">TUITION</span>
            </span>
          </div>
          <p className="text-slate-400 text-lg leading-relaxed max-w-md">
            Empowering NRI students worldwide with world-class Indian teaching expertise. Personalized 1:1 learning for global success.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold mb-6 text-indigo-400 uppercase tracking-widest text-sm">Quick Links</h4>
          <ul className="space-y-4">
            {COUNTRIES.slice(0, 5).map(c => (
              <li key={c.id}><Link to={`/country/${c.id}`} className="text-slate-300 hover:text-white transition-colors">{c.name} Tuition</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-indigo-400 uppercase tracking-widest text-sm">Contact</h4>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-slate-300">
              <Phone className="w-5 h-5 text-indigo-500" />
              <a href={`tel:${PHONE_NUMBER}`} className="hover:text-white">{PHONE_NUMBER}</a>
            </li>
            <li className="flex items-center gap-3 text-slate-300">
              <MessageCircle className="w-5 h-5 text-emerald-500" />
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-white">WhatsApp Support</a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} Bhanu Online Tuition. Supporting NRI Students Worldwide.</p>
        <div className="flex gap-8">
          <span className="hover:text-slate-300 cursor-pointer">Privacy</span>
          <span className="hover:text-slate-300 cursor-pointer">Terms</span>
        </div>
      </div>
    </div>
  </footer>
);

const HomePage = () => {
  return (
    <div className="bg-slate-50 relative">
      {/* Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.4]" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      
      <div className="relative z-10">
        {/* Hero */}
        <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-48 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-indigo-100/40 rounded-full blur-[120px] opacity-60" />
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2000" 
            alt="Students learning" 
            className="absolute top-0 right-0 w-1/3 h-full object-cover opacity-10 hidden lg:block grayscale"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:w-2/3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold uppercase tracking-wider mb-8">
                <Zap className="w-4 h-4" /> Excellence & Results Guaranteed
              </span>
              <h1 className="text-6xl lg:text-8xl font-black tracking-tighter text-slate-900 mb-8 leading-[0.9]">
                Global Education, <br />
                <span className="text-indigo-600">Indian Expertise.</span>
              </h1>
              <div className="text-2xl lg:text-3xl font-bold text-slate-800 mb-8 flex items-center gap-3 flex-wrap">
                Master <FlippingText /> with 1:1 Expert Tutors
              </div>
              <p className="text-xl lg:text-2xl text-slate-600 max-w-xl mb-12 leading-relaxed font-medium">
                1:1 Personalized Online Tuition for NRI students across 10+ countries. Master any curriculum with expert tutors.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <a 
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center gap-3 bg-indigo-600 text-white px-10 py-6 rounded-2xl text-xl font-bold hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-200 hover:-translate-y-1"
                >
                  Book Free Demo <ArrowRight className="w-6 h-6" />
                </a>
                <div className="flex items-center gap-4 px-6 py-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                      <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-10 h-10 rounded-full border-2 border-white" alt="Student" />
                    ))}
                  </div>
                  <div className="text-sm font-bold text-slate-700">
                    <div className="flex items-center gap-1 text-yellow-500"><Star className="w-3 h-3 fill-current" /> 4.9/5</div>
                    500+ Happy Parents
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Country Grid */}
      <section id="curriculum" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-6 tracking-tight">Tuition for NRI Students in 10+ Countries</h2>
              <p className="text-lg text-slate-600 font-medium">Select your country to see specialized curriculum details and exam preparation programs.</p>
            </div>
            <div className="hidden lg:block">
              <div className="px-6 py-3 bg-indigo-50 text-indigo-700 rounded-2xl font-bold border border-indigo-100">
                100% Online • 1:1 Classes
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COUNTRIES.map((country, idx) => (
              <motion.div 
                key={country.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link 
                  to={`/country/${country.id}`}
                  className="group block relative h-[400px] rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-indigo-200/50 transition-all"
                >
                  <img 
                    src={country.image} 
                    alt={country.name} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  
                  <div className="absolute bottom-0 left-0 p-10 w-full">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-4xl">{country.flag}</span>
                      <h3 className="text-3xl font-black text-white">{country.name}</h3>
                    </div>
                    <p className="text-slate-300 text-sm font-medium mb-6 line-clamp-2">
                      {country.curriculum}
                    </p>
                    <div className="flex items-center gap-2 text-white font-bold text-sm uppercase tracking-widest">
                      Explore Curriculum <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="subjects" className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-8 leading-tight">Master Any Subject with Personalized 1:1 Coaching</h2>
              <p className="text-lg text-slate-600 mb-12 font-medium">We don't just teach; we build foundations. Our tutors are experts in simplifying complex concepts for students worldwide.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {SUBJECTS.map((sub) => (
                  <div key={sub.name} className="flex items-center gap-4 p-5 bg-white rounded-3xl border border-slate-200 shadow-sm hover:border-indigo-200 transition-colors">
                    <div className={`w-12 h-12 rounded-2xl ${sub.color} flex items-center justify-center text-2xl shadow-lg shadow-slate-100`}>
                      {sub.icon}
                    </div>
                    <span className="font-bold text-slate-800">{sub.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-indigo-600/5 rounded-[3rem] blur-2xl" />
              <div className="relative bg-white p-10 rounded-[3rem] border border-slate-200 shadow-2xl">
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600">
                      <ShieldCheck className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-2">15+ Years Experience</h4>
                      <p className="text-slate-500">A legacy of academic excellence and proven results in international education.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                      <Clock className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-2">Flexible Timings</h4>
                      <p className="text-slate-500">Classes scheduled according to your timezone, ensuring zero disruption to school life.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600">
                      <Users className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-2">100% One-to-One</h4>
                      <p className="text-slate-500">No group classes. Every minute is dedicated solely to your child's progress.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Life Gallery */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-6">Empowering Global Learners</h2>
            <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">Our interactive 1:1 sessions bring the classroom to your home, no matter where you are in the world.</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4 lg:space-y-8"
            >
              <img src="https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&q=80&w=600" alt="Student studying" className="rounded-[2rem] w-full h-64 object-cover shadow-lg" referrerPolicy="no-referrer" />
              <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600" alt="Online class" className="rounded-[2rem] w-full h-80 object-cover shadow-lg" referrerPolicy="no-referrer" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-4 lg:space-y-8 pt-12"
            >
              <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=600" alt="Writing" className="rounded-[2rem] w-full h-80 object-cover shadow-lg" referrerPolicy="no-referrer" />
              <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600" alt="Group of students" className="rounded-[2rem] w-full h-64 object-cover shadow-lg" referrerPolicy="no-referrer" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4 lg:space-y-8"
            >
              <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600" alt="Collaboration" className="rounded-[2rem] w-full h-64 object-cover shadow-lg" referrerPolicy="no-referrer" />
              <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600" alt="Teacher" className="rounded-[2rem] w-full h-80 object-cover shadow-lg" referrerPolicy="no-referrer" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-4 lg:space-y-8 pt-12"
            >
              <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=600" alt="Learning" className="rounded-[2rem] w-full h-80 object-cover shadow-lg" referrerPolicy="no-referrer" />
              <img src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80&w=600" alt="University" className="rounded-[2rem] w-full h-64 object-cover shadow-lg" referrerPolicy="no-referrer" />
            </motion.div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
};

const CountryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const country = COUNTRIES.find(c => c.id === id);

  if (!country) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold mb-4">Country Not Found</h1>
        <Link to="/" className="text-indigo-600 font-bold hover:underline">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Country Hero */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center overflow-hidden">
        <img 
          src={country.image} 
          alt={country.name} 
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-white/80 hover:text-white mb-8 font-bold uppercase tracking-widest text-sm transition-colors"
            >
              <ChevronRight className="w-5 h-5 rotate-180" /> Back to Countries
            </button>
            <div className="flex items-center gap-6 mb-6">
              <span className="text-7xl">{country.flag}</span>
              <h1 className="text-6xl lg:text-8xl font-black text-white tracking-tighter">
                {country.name} <span className="text-indigo-400">Tuition</span>
              </h1>
            </div>
            <p className="text-2xl text-slate-200 max-w-3xl font-medium leading-relaxed">
              Specialized academic support for NRI students in {country.name}, covering {country.curriculum}.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <h2 className="text-4xl font-black text-slate-900 mb-8">Curriculum & Standards</h2>
              <p className="text-xl text-slate-600 mb-12 leading-relaxed">
                {country.details}
              </p>
              
              <div className="grid sm:grid-cols-2 gap-8 mb-16">
                <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <MapPin className="text-indigo-600" /> Local Curriculum
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    We ensure students master the local requirements of {country.name}, helping them excel in their school assessments and national exams.
                  </p>
                </div>
                <div className="p-8 bg-indigo-50 rounded-[2rem] border border-indigo-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Globe className="text-indigo-600" /> International Track
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    For students in International schools, we provide rigorous coaching for IB (PYP, MYP, DP) and IGCSE/Cambridge curricula.
                  </p>
                </div>
              </div>

              <h3 className="text-3xl font-black text-slate-900 mb-8">Exam Preparation Focus</h3>
              <div className="flex flex-wrap gap-4 mb-16">
                {country.exams.map(exam => (
                  <div key={exam} className="px-8 py-4 bg-white border-2 border-slate-100 rounded-2xl font-bold text-slate-700 hover:border-indigo-200 transition-colors">
                    {exam}
                  </div>
                ))}
              </div>

              {country.secondaryImage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-slate-50"
                >
                  <img src={country.secondaryImage} alt={`${country.name} Education`} className="w-full h-[400px] object-cover" referrerPolicy="no-referrer" />
                </motion.div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-32 p-10 bg-slate-900 rounded-[3rem] text-white shadow-2xl">
                <h3 className="text-2xl font-bold mb-6">Book a Free Demo</h3>
                <p className="text-slate-400 mb-8">Experience our 1:1 personalized teaching style tailored for {country.name}.</p>
                
                <div className="space-y-4">
                  <a 
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full bg-emerald-500 text-white py-5 rounded-2xl font-bold hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-900/20"
                  >
                    <MessageCircle className="w-6 h-6" /> WhatsApp Us
                  </a>
                  <a 
                    href={`tel:${PHONE_NUMBER}`}
                    className="flex items-center justify-center gap-3 w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-900/20"
                  >
                    <Phone className="w-6 h-6" /> Call Support
                  </a>
                </div>

                <div className="mt-10 pt-10 border-t border-white/10 space-y-4">
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <CheckCircle className="w-5 h-5 text-emerald-500" /> 100% Personalized
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <CheckCircle className="w-5 h-5 text-emerald-500" /> Flexible Timings
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <CheckCircle className="w-5 h-5 text-emerald-500" /> Expert Indian Tutors
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/country/:id" element={<CountryPage />} />
          </Routes>
        </main>
        <Footer />
        
        {/* Floating Phone */}
        <a 
          href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`}
          className="fixed bottom-8 right-8 z-50 bg-indigo-600 text-white p-5 rounded-full shadow-2xl hover:scale-110 transition-transform active:scale-95 group"
        >
          <Phone className="w-8 h-8" />
          <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-slate-900 px-4 py-2 rounded-xl text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-slate-100">
            Call Support
          </span>
        </a>
      </div>
    </Router>
  );
}
