import { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  MapPin, 
  BookOpen, 
  ShieldCheck, 
  ChevronRight, 
  Send, 
  Globe, 
  Info,
  X,
  Menu,
  Heart,
  Rocket,
  CheckCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Page, Lang, Clinic, HealthCard, Application } from './types';
import { CLINICS, HEALTH_CARDS } from './constants';
import { sendMessageToGemini } from './services/gemini';

export default function App() {
  const [activePage, setActivePage] = useState<Page>('home');
  const [lang, setLang] = useState<Lang>('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedClinicFilter, setSelectedClinicFilter] = useState('all');
  const [selectedCard, setSelectedCard] = useState<HealthCard | null>(null);

  // Application Form State
  const [appForm, setAppForm] = useState<Omit<Application, 'id' | 'status' | 'timestamp'>>({
    name: '',
    email: '',
    innovation: '',
    category: 'ASRH'
  });
  const [isAppSubmitted, setIsAppSubmitted] = useState(false);

  // Chat State
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string; time: string }[]>([
    { 
      role: 'ai', 
      text: lang === 'en' 
        ? "Hello! I'm YIGA, your confidential health companion. You can ask me anything about sexual and reproductive health, HIV, menstrual health, relationships, or finding services nearby. I'm here to help — no judgment, ever. What's on your mind?" 
        : "Muraho! Ndi YIGA, inshuti yawe y'ubuzima. Ushobora kumbaza ibibazo byose bijyanye n'ubuzima bw'imibonano, HIV, indwara z'abakobwa, cyangwa serivisi zo hafi yawe. I'm here to help — no judgment, ever. What's on your mind?",
      time: 'Now'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (text?: string) => {
    const query = text || inputValue.trim();
    if (!query || isLoading) return;

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { role: 'user', text: query, time: now }]);
    setInputValue('');
    setIsLoading(true);

    const response = await sendMessageToGemini(query, lang);
    
    setMessages(prev => [...prev, { 
      role: 'ai', 
      text: response, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    }]);
    setIsLoading(false);
  };

  const NavTab = ({ name, icon: Icon, page }: { name: string; icon: any; page: Page }) => (
    <button
      onClick={() => { setActivePage(page); setIsMenuOpen(false); }}
      className={`nav-tab flex items-center gap-2 ${activePage === page ? 'active font-bold text-forest' : 'text-muted hover:text-forest'}`}
    >
      <Icon size={18} />
      {name}
    </button>
  );

  return (
    <div className="min-h-screen font-sans">
      {/* Navigation */}
      <nav className="glass fixed top-0 w-full z-50 flex items-center justify-between px-6 md:px-10 py-4 shadow-sm backdrop-blur-md bg-cream/80">
        <div className="logo cursor-pointer text-2xl font-black text-forest font-serif" onClick={() => setActivePage('home')}>
          YIGA<span className="text-clay">.</span>health
        </div>

        <div className="hidden md:flex gap-6">
          <NavTab name="Home" icon={Heart} page="home" />
          <NavTab name="Ask Anonymously" icon={MessageCircle} page="chat" />
          <NavTab name="Find a Clinic" icon={MapPin} page="clinics" />
          <NavTab name="Learn" icon={BookOpen} page="learn" />
          {/* <NavTab name="iAccelerator Submit" icon={Rocket} page="apply" /> */}
        </div>

        <div className="flex items-center gap-4">
          <div className="privacy-badge hidden sm:flex items-center gap-2 bg-mint/20 px-4 py-1.5 rounded-full text-xs font-semibold text-forest border border-mint/30">
            <ShieldCheck size={14} /> Anonymous & Private
          </div>
          <button className="md:hidden text-forest" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed top-[72px] left-0 w-full bg-cream shadow-xl z-40 p-6 flex flex-col gap-4 border-b border-sage/10"
          >
            <NavTab name="Home" icon={Heart} page="home" />
            <NavTab name="Ask Anonymously" icon={MessageCircle} page="chat" />
            <NavTab name="Find a Clinic" icon={MapPin} page="clinics" />
            <NavTab name="Learn" icon={BookOpen} page="learn" />
            {/* <NavTab name="iAccelerator Submit" icon={Rocket} page="apply" /> */}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-[72px] min-h-screen">
        {activePage === 'home' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <section className="hero px-6 md:px-20 py-12 md:py-24 grid md:grid-cols-2 items-center gap-12 relative overflow-hidden">
              <div className="hero-content relative z-10">
                <div className="hero-eyebrow inline-flex items-center gap-2 bg-sun text-forest px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                  <Globe size={14} /> For Rwandan Youth · Free · Private
                </div>
                <h1 className="font-serif text-5xl md:text-7xl font-black text-forest leading-tight mb-6">
                  Your health questions,<br/>
                  <em className="italic text-clay not-italic">answered honestly.</em>
                </h1>
                <p className="text-muted text-lg leading-relaxed max-w-lg mb-8">
                  YIGA Health gives young people in Rwanda a safe, anonymous space to ask about sexual & reproductive health — with real answers, in Kinyarwanda or English.
                </p>
                <div className="flex flex-wrap gap-4 mb-12">
                  <button className="btn-primary cursor-pointer" onClick={() => setActivePage('chat')}>
                    <MessageCircle size={20} /> Ask a Question
                  </button>
                  <button className="btn-secondary cursor-pointer" onClick={() => setActivePage('clinics')}>
                    <MapPin size={20} /> Find a Clinic
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-8 pt-8 border-t border-sage/20">
                  <div>
                    <div className="font-serif text-3xl font-black text-clay">24%</div>
                    <div className="text-[10px] uppercase font-bold text-muted mt-1 leading-tight">new HIV infections<br/>aged 15–24</div>
                  </div>
                  <div>
                    <div className="font-serif text-3xl font-black text-clay">8%</div>
                    <div className="text-[10px] uppercase font-bold text-muted mt-1 leading-tight">girls 15–19<br/>ever pregnant</div>
                  </div>
                  <div>
                    <div className="font-serif text-3xl font-black text-clay">3.6M</div>
                    <div className="text-[10px] uppercase font-bold text-muted mt-1 leading-tight">youth in<br/>Rwanda (2024)</div>
                  </div>
                </div>
              </div>

              <div className="hidden md:flex justify-center items-center">
                <div className="card relative w-full max-w-sm shadow-2xl bg-white p-6">
                  <div className="absolute -top-3 right-5 bg-mint text-forest text-[10px] font-bold px-3 py-1 rounded-full border border-sage/20">
                    🔒 Anonymous
                  </div>
                  <div className="space-y-4">
                    <div className="bg-forest text-white p-3 rounded-2xl rounded-br-none text-sm self-end ml-auto max-w-[85%]">
                      How do I access contraception without my parents knowing?
                    </div>
                    <div className="bg-warm p-3 rounded-2xl rounded-bl-none text-sm max-w-[85%]">
                      <span className="text-[10px] font-bold text-sage block mb-1">✨ YIGA Health Assistant</span>
                      In Rwanda, anyone 15+ can visit youth-friendly health centers for confidential services. No parental consent is required...
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="bg-warm px-3 py-2 rounded-2xl rounded-bl-none flex gap-1">
                        <div className="w-1.5 h-1.5 bg-sage rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-sage rounded-full animate-bounce delay-100"></div>
                        <div className="w-1.5 h-1.5 bg-sage rounded-full animate-bounce delay-200"></div>
                      </div>
                      <span className="text-[10px] text-muted">YIGA is typing...</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="px-6 md:px-20 pb-20 grid sm:grid-cols-3 gap-6">
              <div className="card cursor-pointer group bg-white border border-sage/10 p-6 rounded-3xl" onClick={() => setActivePage('chat')}>
                <div className="w-12 h-12 bg-mint/20 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">🤖</div>
                <h3 className="font-serif text-xl font-bold text-forest mb-2">AI Health Assistant</h3>
                <p className="text-muted text-sm leading-relaxed">Ask anything about SRH, HIV, or periods. No judgment, no registration required.</p>
              </div>
              <div className="card cursor-pointer group bg-white border border-sage/10 p-6 rounded-3xl" onClick={() => setActivePage('clinics')}>
                <div className="w-12 h-12 bg-clay/15 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">🏥</div>
                <h3 className="font-serif text-xl font-bold text-forest mb-2">Find a Clinic</h3>
                <p className="text-muted text-sm leading-relaxed">Locate health centers offering confidential services — HIV testing, family planning, and more.</p>
              </div>
              <div className="card cursor-pointer group bg-white border border-sage/10 p-6 rounded-3xl" onClick={() => setActivePage('learn')}>
                <div className="w-12 h-12 bg-sun/20 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">📚</div>
                <h3 className="font-serif text-xl font-bold text-forest mb-2">Health Education</h3>
                <p className="text-muted text-sm leading-relaxed">Bite-sized, accurate cards on contraception, HIV/PrEP, and menstrual health.</p>
              </div>
            </section>
          </motion.div>
        )}

        {activePage === 'chat' && (
          <div className="max-w-4xl mx-auto px-4 h-[calc(100vh-72px)] flex flex-col py-4">
            <div className="bg-sun/20 border border-sun/50 rounded-2xl p-4 mb-4 text-sm text-forest flex gap-3">
              <Info className="shrink-0" size={18} />
              <p>This AI provides health information only — not medical diagnosis. For urgent concerns, visit a clinic. Your conversation is <strong>not saved</strong> and is anonymous.</p>
            </div>
            
            <div className="bg-white rounded-3xl shadow-xl flex-1 flex flex-col overflow-hidden border border-sage/10">
              <header className="p-4 border-b border-sage/10 flex items-center justify-between bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sage to-mint flex items-center justify-center text-2xl">🌿</div>
                  <div>
                    <h3 className="font-serif font-bold text-forest">YIGA Health Assistant</h3>
                    <div className="flex items-center gap-1.5 text-xs text-muted">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      Available 24/7 · Anonymous
                    </div>
                  </div>
                </div>
                <div className="flex bg-cream p-1 rounded-full gap-1 border border-sage/10">
                  <button onClick={() => setLang('en')} className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${lang === 'en' ? 'bg-forest text-white shadow-sm' : 'text-muted hover:text-forest'}`}>EN</button>
                  <button onClick={() => setLang('rw')} className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${lang === 'rw' ? 'bg-forest text-white shadow-sm' : 'text-muted hover:text-forest'}`}>RW</button>
                </div>
              </header>

              <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#fdfcf8]">
                {messages.map((msg, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={i} 
                    className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 shadow-sm
                      ${msg.role === 'user' ? 'bg-clay text-white' : 'bg-gradient-to-br from-sage to-mint text-white'}`}
                    >
                      {msg.role === 'user' ? 'YOU' : '🌿'}
                    </div>
                    <div className="max-w-[85%]">
                      <div className={`p-4 rounded-3xl text-sm leading-relaxed shadow-sm
                        ${msg.role === 'user' ? 'bg-forest text-white rounded-tr-none' : 'bg-warm text-text rounded-tl-none'}`}
                      >
                        {msg.text}
                      </div>
                      <div className={`text-[10px] text-muted mt-1 ${msg.role === 'user' ? 'text-right' : ''}`}>{msg.time}</div>
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sage to-mint text-white flex items-center justify-center text-xs shrink-0 shadow-sm">🌿</div>
                    <div className="bg-warm px-4 py-3 rounded-2xl rounded-tl-none flex gap-1 items-center shadow-sm">
                      <div className="w-1.5 h-1.5 bg-sage rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-sage rounded-full animate-bounce delay-100"></div>
                      <div className="w-1.5 h-1.5 bg-sage rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-sage/10 space-y-4 bg-white">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {(lang === 'en' ? [
                    "How do I prevent HIV?", "Contraception options", "My period is irregular", "Where to get tested?"
                  ] : [
                    "Nzirinda bite HIV?", "Uburyo bwo guteza inda", "Mihango yanjye", "Gupimwa HIV hafi"
                  ]).map((q, i) => (
                    <button 
                      key={i} 
                      onClick={() => handleSend(q)}
                      className="whitespace-nowrap px-4 py-1.5 rounded-full border border-sage/20 text-xs text-sage hover:bg-forest hover:text-white hover:border-forest transition-colors shadow-sm"
                    >
                      {q}
                    </button>
                  ))}
                </div>
                <div className="flex gap-3">
                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                    placeholder="Type your question anonymously..."
                    rows={1}
                    className="flex-1 bg-cream/50 border border-sage/20 rounded-2xl p-4 text-sm focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage resize-none shadow-inner"
                  />
                  <button 
                    onClick={() => handleSend()}
                    disabled={isLoading || !inputValue.trim()}
                    className="w-14 h-14 bg-forest text-white rounded-full flex items-center justify-center shadow-lg hover:bg-sage disabled:bg-warm disabled:cursor-not-allowed transition-all shrink-0"
                  >
                    <Send size={24} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activePage === 'clinics' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-6 md:px-20 py-12">
            <h2 className="font-serif text-4xl font-black text-forest mb-2">Find a Youth-Friendly Clinic</h2>
            <p className="text-muted mb-8">Confidential health services near you across Rwanda</p>
            
            <div className="flex flex-wrap gap-2 mb-10">
              {['all', 'hiv', 'fp', 'mhm', 'youth', 'mental'].map(filter => (
                <button
                  key={filter}
                  onClick={() => setSelectedClinicFilter(filter)}
                  className={`px-6 py-2 rounded-full text-xs font-bold transition-all border
                    ${selectedClinicFilter === filter 
                      ? 'bg-forest text-white border-forest shadow-lg' 
                      : 'bg-white text-muted border-sage/20 hover:border-forest shadow-sm'}`}
                >
                  {filter === 'all' ? 'All Services' : filter === 'hiv' ? 'HIV Testing' : filter === 'fp' ? 'Family Planning' : filter === 'mhm' ? 'Menstrual Health' : filter === 'youth' ? 'Youth Clinics' : 'Mental Health'}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CLINICS.filter(c => selectedClinicFilter === 'all' || c.type.includes(selectedClinicFilter)).map((clinic, i) => (
                <div key={i} className="card bg-white border border-sage/10 p-6 rounded-3xl flex flex-col h-full hover:shadow-xl transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-serif font-bold text-forest text-lg leading-tight pr-4">{clinic.name}</h3>
                    <div className="bg-clay/10 text-clay text-[10px] font-bold px-2 py-1 rounded-full whitespace-nowrap">📍 {clinic.dist}</div>
                  </div>
                  <p className="text-xs text-muted mb-4 grow font-medium">📌 {clinic.address}</p>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {clinic.tags.map(tag => (
                      <span key={tag} className="bg-mint/15 text-sage text-[10px] font-bold px-2 py-1 rounded-full border border-mint/20">{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-sage/10">
                    <div className="text-[10px] text-muted">
                      <span className="text-green-500 font-bold">Open</span> · {clinic.time}
                    </div>
                    <button 
                      onClick={() => { setActivePage('chat'); handleSend(`Tell me more about ${clinic.name}`); }}
                      className="text-xs font-bold text-forest flex items-center gap-1 hover:translate-x-1 transition-transform"
                    >
                      Ask YIGA <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activePage === 'learn' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-6 md:px-20 py-12">
            <h2 className="font-serif text-4xl font-black text-forest mb-2">Health Education</h2>
            <p className="text-muted mb-12">Accurate, bite-sized information to empower your decisions</p>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {HEALTH_CARDS.map(card => (
                <motion.div 
                  key={card.id} 
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedCard(card)}
                  className={`${card.colorClass} rounded-[32px] p-8 min-h-[260px] cursor-pointer flex flex-col justify-end relative overflow-hidden group shadow-xl transition-all`}
                >
                  <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white backdrop-blur-sm group-hover:bg-white group-hover:text-forest transition-all">
                    <ChevronRight size={20} />
                  </div>
                  <div className="text-5xl mb-6">{card.emoji}</div>
                  <h3 className="font-serif text-2xl font-bold text-white mb-2">{card.title}</h3>
                  <p className="text-white/80 text-[10px] leading-relaxed line-clamp-2 uppercase font-bold tracking-wider">{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

       {/*  {activePage === 'apply' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-6 md:px-20 py-12 max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-sun rounded-2xl flex items-center justify-center text-forest mx-auto mb-6 shadow-lg shadow-sun/20">
                <Rocket size={32} />
              </div>
              <h2 className="font-serif text-4xl font-black text-forest mb-4">iAccelerator Phase 7</h2>
              <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
                Calling all Rwandan social entrepreneurs! Submit your innovative solutions for ASRH, HIV, Menstrual Health, and Mental Health.
              </p>
            </div> 

            <div className="card bg-white p-8 md:p-12 border border-sage/10 rounded-[40px] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-mint via-sun to-clay" />
              
              {isAppSubmitted ? (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="py-20 text-center">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle size={48} />
                  </div>
                  <h3 className="font-serif text-3xl font-black text-forest mb-4">Application Received!</h3>
                  <p className="text-muted mb-10 max-w-md mx-auto">
                    Thank you for your innovation, {appForm.name}. Our team will review your project and get back to you soon.
                  </p>
                  <button 
                    onClick={() => { setIsAppSubmitted(false); setActivePage('home'); }}
                    className="btn-primary mx-auto"
                  >
                    Return Home
                  </button>
                </motion.div>
              ) : (
                <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); setIsAppSubmitted(true); }}>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted ml-1">Creator Name</label>
                      <input 
                        required
                        type="text" 
                        value={appForm.name}
                        onChange={(e) => setAppForm({...appForm, name: e.target.value})}
                        className="w-full bg-cream/50 border border-sage/20 rounded-2xl p-4 text-sm focus:outline-none focus:border-sage focus:ring-2 focus:ring-sage/20 transition-all font-medium"
                        placeholder="e.g. Jean Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted ml-1">Contact Email</label>
                      <input 
                        required
                        type="email" 
                        value={appForm.email}
                        onChange={(e) => setAppForm({...appForm, email: e.target.value})}
                        className="w-full bg-cream/50 border border-sage/20 rounded-2xl p-4 text-sm focus:outline-none focus:border-sage focus:ring-2 focus:ring-sage/20 transition-all font-medium"
                        placeholder="jean@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted ml-1">Innovation Category</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {['ASRH', 'HIV', 'Menstrual', 'Mental'].map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setAppForm({...appForm, category: cat as any})}
                          className={`p-4 rounded-2xl border text-xs font-bold transition-all shadow-sm
                            ${appForm.category === cat 
                              ? 'bg-forest text-white border-forest' 
                              : 'bg-white text-muted border-sage/10 hover:border-forest'}`}
                        >
                          {cat === 'Mental' ? 'Mental Health' : cat === 'ASRH' ? 'ASRH' : cat === 'HIV' ? 'HIV prevention' : 'Menstrual Health'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted ml-1">The Innovation Pitch</label>
                    <textarea 
                      required
                      placeholder="Describe your solution in 3-4 sentences. How does it help Rwandan youth?"
                      rows={5}
                      value={appForm.innovation}
                      onChange={(e) => setAppForm({...appForm, innovation: e.target.value})}
                      className="w-full bg-cream/50 border border-sage/20 rounded-2xl p-4 text-sm focus:outline-none focus:border-sage focus:ring-2 focus:ring-sage/20 transition-all font-medium resize-none"
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full shadow-2xl h-16 text-lg justify-center mt-4">
                    Submit to iAccelerator <Rocket size={24} />
                  </button>
                </form>
              )}
            </div> 

            <div className="mt-12 text-center p-8 bg-sage/5 rounded-[32px] border border-sage/10">
              <h4 className="font-serif text-lg font-bold text-forest mb-4">Why Apply?</h4>
              <div className="grid md:grid-cols-3 gap-6 text-sm text-muted">
                <div>
                  <div className="font-bold text-forest mb-1">Grant Funding</div>
                  Up to $10,000 to seed your project.
                </div>
                <div>
                  <div className="font-bold text-forest mb-1">Mentorship</div>
                  Guidance from Rwanda's top social entrepreneurs.
                </div>
                <div>
                  <div className="font-bold text-forest mb-1">National Scale</div>
                  Implement your solution across Rwanda.
                </div>
              </div>
            </div>
          </motion.div>
        )}*/}
      </main> 

      <AnimatePresence>
        {selectedCard && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCard(null)}
              className="absolute inset-0 bg-forest/70 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-white rounded-[40px] shadow-2xl p-8 md:p-12 overflow-y-auto max-h-[85vh] scrollbar-hide"
            >
              <button 
                onClick={() => setSelectedCard(null)}
                className="absolute top-8 right-8 bg-cream w-10 h-10 rounded-full flex items-center justify-center text-forest hover:bg-forest hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
              <div className="text-6xl mb-8">{selectedCard.emoji}</div>
              <h2 className="font-serif text-3xl font-black text-forest mb-6">{selectedCard.title}</h2>
              <div 
                className="text-muted text-sm leading-relaxed space-y-4 prose prose-sage prose-headings:font-serif"
                dangerouslySetInnerHTML={{ __html: selectedCard.content }}
              />
              <button 
                onClick={() => { setSelectedCard(null); setActivePage('chat'); handleSend(`I want to learn more about ${selectedCard.title}`); }}
                className="btn-primary w-full mt-10 justify-center h-14 text-lg"
              >
                Ask YIGA more questions
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="bg-forest py-16 px-6 md:px-20 text-white/50 text-xs text-center border-t border-white/5">
        <div className="logo text-white text-3xl font-black font-serif mb-6">
          YIGA<span className="text-clay">.</span>health
        </div>
        <p className="max-w-md mx-auto leading-relaxed mb-8 text-sm">
          Empowering Rwandan youth with safe, private, and accurate health information. 
          Your health is your journey. We are here to support you.
        </p>
        <div className="flex justify-center gap-8 mb-10 text-[10px] font-bold uppercase tracking-widest">
          <a href="#" className="hover:text-mint transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-mint transition-colors">Terms</a>
          <a href="#" className="hover:text-mint transition-colors">Contact</a>
        </div>
        <div className="w-16 h-px bg-white/10 mx-auto mb-8" />
        <p>&copy; {new Date().getFullYear()} YIGA Health Rwanda. All rights reserved.</p>
      </footer>
    </div>
  );
}
