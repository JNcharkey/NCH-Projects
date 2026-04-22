import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Target, 
  Heart, 
  Briefcase, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Loader2,
  TrendingUp,
  Users,
  Lightbulb,
  Compass,
  RefreshCcw,
  LayoutDashboard,
  Download
} from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export default function App() {
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    strengths: '',
    targetAudience: '',
    tone: 'Professional'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [results, setResults] = useState<{
    companyName: string;
    mission: string;
    vision: string;
    coreValues: { title: string; desc: string }[];
    services: { title: string; desc: string }[];
  } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    // Simulate AI / Data Processing delay
    setTimeout(() => {
      const name = formData.companyName || 'Your Company';
      const ind = formData.industry || 'your industry';
      const aud = formData.targetAudience || 'your clients';
      const str = formData.strengths || 'innovative solutions';
      const tone = formData.tone;

      let tonePrefix = "To formally";
      if (tone === "Friendly") tonePrefix = "To warmly";
      if (tone === "Innovative") tonePrefix = "To radically";

      setResults({
        companyName: name,
        mission: `${tonePrefix} empower ${aud} by delivering ${str}, ensuring sustainable growth and competitive advantage in the ${ind} landscape.`,
        vision: `To be the recognized standard of excellence and leadership within the ${ind} sector, driven by our unique strengths in ${str}.`,
        coreValues: [
          { title: 'Unwavering Integrity', desc: 'We uphold the highest ethical standards in all our business dealings.' },
          { title: 'Client-Centric Approach', desc: `Constantly evolving to meet the unique needs of ${aud}.` },
          { title: 'Relentless Excellence', desc: 'Committing to outstanding quality and continuous improvement.' },
          { title: 'Collaborative Growth', desc: 'Building strong partnerships that foster mutual success.' }
        ],
        services: [
          { title: 'Strategic Consulting', desc: `Tailored blueprints to navigate the complexities of the ${ind} market.` },
          { title: 'Operational Optimization', desc: 'Streamlining processes to maximize efficiency and reduce overheads.' },
          { title: 'Market Expansion', desc: `Data-driven strategies to reach and engage ${aud} effectively.` }
        ]
      });
      setIsGenerating(false);
      
      // Scroll to results smoothly
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 2500);
  };

  const resetForm = () => {
    setFormData({ companyName: '', industry: '', strengths: '', targetAudience: '', tone: 'Professional' });
    setResults(null);
    document.getElementById('builder')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExportPDF = async () => {
    const element = document.getElementById('profile-content-to-export');
    if (!element) return;
    
    setIsExporting(true);
    try {
      const canvas = await html2canvas(element, { 
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'px',
        format: [canvas.width / 2, canvas.height / 2]
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);
      pdf.save(`${results?.companyName.replace(/\s+/g, '_') || 'Company'}_Profile.pdf`);
    } catch (error) {
      console.error('Failed to export PDF', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-blue-200">
      {/* Header */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
                <LayoutDashboard className="text-white w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-slate-900 tracking-tight">NCH<span className="text-blue-600 font-light">BUILDER</span></span>
            </div>
            <div className="hidden md:flex space-x-6 text-sm font-semibold text-slate-500 items-center">
              <a href="#how-it-works" className="hover:text-blue-600 transition-colors">How It Works</a>
              <a href="#builder" className="hover:text-blue-600 text-blue-600 bg-blue-50 px-4 py-2 rounded-full transition-all">Start Building</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-white to-white opacity-70"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-6 border border-blue-100">
                <Sparkles className="w-4 h-4" />
                The NCH Business Profile Builder
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
                Build your corporate profile in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">seconds.</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
                No more staring at a blank page. Outline your company's mission, establish a clear vision, establish your core values, and detail your services with our smart generation tool.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href="#builder" className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all group">
                  Generate Your Profile Draft
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: '1. Input Details', desc: 'Tell us your company name, target audience, and primary industry.' },
              { icon: Lightbulb, title: '2. Processing Engine', desc: 'Our system analyzes your strengths and applies a professional structure.' },
              { icon: Briefcase, title: '3. Receive Your Profile', desc: 'Get a clean, structured output of your mission, vision, and core values.' }
            ].map((val, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                  <val.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{val.title}</h4>
                <p className="text-slate-600 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Tool Section */}
      <section id="builder" className="py-24 bg-white border-t border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            
            {/* Form Side */}
            <div className="w-full lg:w-5/12 lg:sticky lg:top-24">
              <div className="mb-8">
                <h2 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">Business Profile Inputs</h2>
                <p className="text-slate-600">
                  Fill out the parameters below to draft a comprehensive corporate identity for your enterprise.
                </p>
              </div>

              <form onSubmit={handleGenerate} className="space-y-5 bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-sm">
                <div>
                  <label htmlFor="companyName" className="block text-sm font-semibold text-slate-700 mb-2">Company Name</label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    required
                    placeholder="e.g. NCH Solutions"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                  />
                </div>
                <div>
                  <label htmlFor="industry" className="block text-sm font-semibold text-slate-700 mb-2">Primary Industry</label>
                  <input
                    type="text"
                    id="industry"
                    name="industry"
                    required
                    placeholder="e.g. Corporate Consulting"
                    value={formData.industry}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                  />
                </div>
                <div>
                  <label htmlFor="targetAudience" className="block text-sm font-semibold text-slate-700 mb-2">Target Audience</label>
                  <input
                    type="text"
                    id="targetAudience"
                    name="targetAudience"
                    required
                    placeholder="e.g. Mid-sized enterprises"
                    value={formData.targetAudience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                  />
                </div>
                <div>
                  <label htmlFor="strengths" className="block text-sm font-semibold text-slate-700 mb-2">Core Strengths / Key Offering</label>
                  <textarea
                    id="strengths"
                    name="strengths"
                    required
                    rows={3}
                    placeholder="e.g. Operational scaling, digital transformation, actionable insights"
                    value={formData.strengths}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow resize-none"
                  />
                </div>
                <div>
                  <label htmlFor="tone" className="block text-sm font-semibold text-slate-700 mb-2">Desired Brand Tone</label>
                  <select
                    id="tone"
                    name="tone"
                    value={formData.tone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow appearance-none"
                  >
                    <option value="Professional">Professional & Formal</option>
                    <option value="Innovative">Innovative & Bold</option>
                    <option value="Friendly">Friendly & Approachable</option>
                  </select>
                </div>
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isGenerating || !formData.companyName || !formData.industry}
                    className="w-full flex items-center justify-center px-6 py-4 text-base font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-md shadow-blue-200"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Processing Guidelines...
                      </>
                    ) : (
                      'Generate Company Profile'
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Results Side */}
            <div className="w-full lg:w-7/12" id="results-section">
              <AnimatePresence mode="wait">
                {!results && !isGenerating && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full min-h-[600px] flex flex-col items-center justify-center text-center p-12 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl"
                  >
                    <div className="w-20 h-20 bg-white shadow-sm rounded-full flex items-center justify-center mb-6">
                      <LayoutDashboard className="w-10 h-10 text-slate-300" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-700 mb-2">Dashboard Ready</h3>
                    <p className="text-slate-500 max-w-sm">Complete the form parameters to view your new, fully-formatted corporate profile insight report.</p>
                  </motion.div>
                )}

                {isGenerating && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full min-h-[600px] flex flex-col items-center justify-center text-center p-12 bg-blue-50 border border-blue-100 rounded-3xl"
                  >
                    <div className="relative">
                      <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                      <Sparkles className="w-6 h-6 text-blue-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <h3 className="text-xl font-bold text-blue-900 mt-8 mb-2">Constructing Identity...</h3>
                    <p className="text-blue-700/70 max-w-sm">Structuring your mission, parsing your vision, and formatting your core services catalog.</p>
                  </motion.div>
                )}

                {results && !isGenerating && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden"
                    id="profile-content-to-export"
                  >
                    {/* Results Header */}
                    <div className="bg-slate-900 p-8 text-white relative overflow-hidden flex justify-between items-start">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 opacity-20 rounded-full blur-3xl -mr-20 -mt-20"></div>
                      <div className="relative z-10">
                        <h3 className="text-sm font-bold tracking-widest text-blue-400 uppercase mb-2">Corporate Profile Document</h3>
                        <h2 className="text-3xl font-extrabold">{results.companyName}</h2>
                      </div>
                      <div className="relative z-10 flex gap-2" data-html2canvas-ignore="true">
                        <button 
                          onClick={handleExportPDF}
                          disabled={isExporting}
                          className="flex items-center gap-2 text-sm font-semibold text-white hover:text-blue-200 transition-colors bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm disabled:opacity-50"
                          title="Export to PDF"
                        >
                          {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                          Export PDF
                        </button>
                        <button 
                          onClick={resetForm}
                          className="text-slate-400 hover:text-white transition-colors bg-white/10 p-2 rounded-lg backdrop-blur-sm"
                          title="Start Over"
                        >
                          <RefreshCcw className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="p-8 space-y-10">
                      {/* Mission and Vision */}
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                          <div className="flex items-center gap-3 mb-4">
                            <Target className="w-6 h-6 text-blue-600" />
                            <h4 className="font-bold text-slate-900 text-lg">Mission Statement</h4>
                          </div>
                          <p className="text-slate-700 leading-relaxed font-medium">{results.mission}</p>
                        </div>
                        <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                          <div className="flex items-center gap-3 mb-4">
                            <Compass className="w-6 h-6 text-indigo-600" />
                            <h4 className="font-bold text-slate-900 text-lg">Vision Statement</h4>
                          </div>
                          <p className="text-slate-700 leading-relaxed font-medium">{results.vision}</p>
                        </div>
                      </div>

                      {/* Core Values */}
                      <div>
                        <h4 className="font-bold text-xl text-slate-900 mb-6 flex items-center gap-2">
                          <Heart className="w-5 h-5 text-rose-500" />
                          Core Values
                        </h4>
                        <div className="grid sm:grid-cols-2 gap-4">
                          {results.coreValues.map((val, idx) => (
                            <div key={idx} className="flex gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                              <div className="mt-1 flex-shrink-0">
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                              </div>
                              <div>
                                <h5 className="font-bold text-slate-900">{val.title}</h5>
                                <p className="text-sm text-slate-600 mt-1">{val.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <hr className="border-slate-100" />

                      {/* Services */}
                      <div>
                        <h4 className="font-bold text-xl text-slate-900 mb-6 flex items-center gap-2">
                          <Briefcase className="w-5 h-5 text-amber-500" />
                          Services Overview
                        </h4>
                        <div className="space-y-4 shadow-sm border border-slate-100 rounded-2xl overflow-hidden">
                          {results.services.map((svc, idx) => (
                            <div key={idx} className={`p-5 flex flex-col md:flex-row md:items-center gap-4 ${idx !== results.services.length - 1 ? 'border-b border-slate-100 bg-white' : 'bg-white'}`}>
                              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0 border border-slate-100">
                                <span className="font-bold text-slate-400">{idx + 1}</span>
                              </div>
                              <div>
                                <h5 className="font-bold text-slate-900 text-lg mb-1">{svc.title}</h5>
                                <p className="text-slate-600 text-sm md:text-base">{svc.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-10 text-center border-t border-slate-800 text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5 text-blue-500" />
            <span className="font-bold text-white tracking-tight">NCH<span className="font-normal text-slate-400">BUILDER</span></span>
          </div>
          <p className="text-sm">&copy; {new Date().getFullYear()} NCH Business Profile Builder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

