import React, { useState, useRef, MouseEvent } from 'react';
import { GoogleGenAI } from "@google/genai";
import { PRODUCTS, BACKGROUND_IMAGE, WHATSAPP_NUMBER } from './constants';
import { Sparkles, ShoppingBag, Wand2, Send, MessageCircle, Loader2, ArrowRight } from 'lucide-react';
import { Product } from './types';

const App = () => {
  const [oraclePrompt, setOraclePrompt] = useState('');
  const [oracleResponse, setOracleResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const productsRef = useRef<HTMLDivElement>(null);

  const scrollToShop = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOrder = (product: Product) => {
    const message = `Hello! I would like to order the ${product.title} for ${product.price} ${product.currency}.`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleOracleConsultation = () => {
    if (!oracleResponse) return;
    const message = `Greetings Wizard. I consulted the Oracle with the theme: "${oraclePrompt}" and received this prophecy:\n\n${oracleResponse}\n\nI wish to bring this to life.`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const consultOracle = async () => {
    if (!oraclePrompt.trim()) return;
    
    setIsLoading(true);
    setOracleResponse(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are the Sticker Oracle for a magical shop called "Ali's Enchanted Adhesives". 
        The user will give you a theme or a vibe. 
        Generate 3 creative, funny, or whimsical sticker design ideas based on that theme. 
        Format the output as a bulleted list. Keep it brief and charming.
        
        User Theme: ${oraclePrompt}`,
      });
      
      setOracleResponse(response.text || "The mists are too thick to see clearly... try again.");
    } catch (error) {
      console.error("Oracle Error:", error);
      setOracleResponse("The magical connection was severed. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Simple 3D tilt effect helper
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg rotation
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  };

  return (
    <div className="min-h-screen bg-wizard-dark font-sans text-parchment relative overflow-x-hidden selection:bg-wizard-gold selection:text-wizard-dark">
      {/* Background Image with Overlay */}
      <div 
        className="fixed inset-0 z-0 opacity-20 pointer-events-none"
        style={{ 
          backgroundImage: `url(${BACKGROUND_IMAGE})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />
      
      {/* Floating Particles Effect (Simulated with CSS) */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-transparent via-wizard-dark/60 to-wizard-dark"></div>

      {/* Header */}
      <nav className="relative z-20 p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="font-serif text-2xl md:text-3xl text-wizard-gold font-bold tracking-wider flex items-center gap-2 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
          <Sparkles className="w-6 h-6 animate-pulse text-white" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-wizard-gold via-white to-wizard-gold">
            Ali's Enchanted Adhesives
          </span>
        </div>
        <button 
          onClick={scrollToShop}
          className="group relative bg-black/40 hover:bg-wizard-gold/10 border border-wizard-gold/50 px-6 py-2 rounded-full transition-all duration-300 font-serif text-sm tracking-wide flex items-center gap-2 backdrop-blur-sm shadow-[0_4px_14px_0_rgba(0,0,0,0.39)] hover:shadow-[0_6px_20px_rgba(255,215,0,0.23)] hover:-translate-y-1"
        >
          <ShoppingBag className="w-4 h-4 group-hover:text-white transition-colors" />
          <span className="group-hover:text-white transition-colors">Visit Shop</span>
        </button>
      </nav>

      {/* Hero Section */}
      <header className="relative z-10 container mx-auto px-6 pt-12 pb-32 text-center min-h-[85vh] flex flex-col justify-center items-center perspective-1000">
        <div className="animate-float transform-style-3d">
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-wizard-gold via-yellow-200 to-amber-700 mb-8 drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] leading-tight relative">
            Stick Magic <br/> 
            <span className="relative inline-block transform hover:scale-105 transition-transform duration-500 cursor-default">
              Everywhere
            </span>
          </h1>
        </div>
        <p className="text-xl md:text-2xl text-parchment/90 max-w-2xl mb-12 font-light leading-relaxed drop-shadow-md bg-black/20 p-4 rounded-xl backdrop-blur-sm border border-white/5">
          Handcrafted enchanted adhesives for wizards, witches, and muggles alike. 
          Turn the mundane into the magical with our 3D-defying designs.
        </p>
        <div className="flex flex-col md:flex-row gap-8 perspective-500">
          <button 
            onClick={scrollToShop}
            className="group relative px-10 py-5 bg-gradient-to-br from-wizard-gold to-amber-600 text-wizard-dark font-serif font-bold text-xl rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.5),inset_0_-4px_0_rgba(0,0,0,0.2)] hover:shadow-[0_20px_30px_rgba(255,215,0,0.3),inset_0_-4px_0_rgba(0,0,0,0.2)] active:shadow-[inset_0_4px_10px_rgba(0,0,0,0.3)] active:translate-y-1 transition-all duration-200 transform hover:-translate-y-1"
          >
            <span className="relative z-10 flex items-center gap-2">
              Browse Collection <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          <a 
            href="#oracle"
            className="group px-10 py-5 bg-wizard-dark/50 border border-parchment/30 hover:border-wizard-gold text-parchment hover:text-wizard-gold rounded-xl backdrop-blur-md shadow-[0_10px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(255,215,0,0.1)] transition-all duration-300 transform hover:-translate-y-1 font-serif font-bold text-xl animate-mystic-pulse hover:animate-none"
          >
            <span className="flex items-center gap-2">
              Consult the Oracle <Wand2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </span>
          </a>
        </div>
      </header>

      {/* Products Section */}
      <section id="shop" ref={productsRef} className="relative z-10 py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/40 to-black/0 pointer-events-none" />
        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-20">
            <h2 className="font-serif text-5xl md:text-6xl text-wizard-gold mb-4 drop-shadow-[0_0_10px_rgba(255,215,0,0.3)]">The Artifacts</h2>
            <div className="h-1 w-32 bg-gradient-to-r from-transparent via-wizard-gold to-transparent mx-auto shadow-[0_0_10px_rgba(255,215,0,0.5)]"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto perspective-1000">
            {PRODUCTS.map((product) => (
              <div 
                key={product.id}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="group relative bg-wizard-dark border border-white/10 rounded-2xl transition-all duration-100 ease-out shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:shadow-[0_30px_60px_rgba(255,215,0,0.1)] hover:z-10"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {product.popular && (
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-wizard-gold to-amber-500 text-wizard-dark text-sm font-bold px-4 py-2 rounded-full z-30 shadow-[0_4px_10px_rgba(0,0,0,0.3)] border border-white/20 transform translate-z-20">
                    MOST POPULAR
                  </div>
                )}
                
                <div className="aspect-[4/5] overflow-hidden relative rounded-t-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-wizard-dark via-transparent to-transparent opacity-80 z-10"/>
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                
                <div className="p-8 relative z-20 -mt-24 bg-gradient-to-t from-wizard-dark via-wizard-dark to-transparent pt-24 rounded-b-2xl transform-style-3d">
                  <h3 className="font-serif text-3xl text-white mb-3 transform translate-z-10">{product.title}</h3>
                  <p className="text-parchment/70 text-sm mb-6 h-12 transform translate-z-5">{product.description}</p>
                  
                  <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/10 transform translate-z-10">
                    <span className="font-serif text-2xl text-wizard-gold drop-shadow-[0_0_5px_rgba(255,215,0,0.5)]">
                      {product.price} {product.currency}
                    </span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOrder(product);
                      }}
                      className="flex items-center gap-2 bg-whatsapp hover:bg-green-500 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-[0_4px_14px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.4)] hover:-translate-y-1 active:translate-y-0"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Acquire
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Oracle Section */}
      <section id="oracle" className="relative z-10 py-32 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto relative">
            {/* Glowing background blob */}
            <div className="absolute -inset-1 bg-gradient-to-r from-wizard-gold via-purple-500 to-amber-600 rounded-3xl blur-2xl opacity-20 animate-pulse pointer-events-none"></div>
            
            <div className="relative bg-black/60 border border-wizard-gold/30 rounded-3xl p-8 md:p-16 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] transform-style-3d perspective-1000">
              <div className="text-center mb-12">
                <div className="inline-block p-4 rounded-full bg-wizard-gold/10 mb-6 border border-wizard-gold/20 shadow-[0_0_20px_rgba(255,215,0,0.2)]">
                  <Wand2 className="w-12 h-12 text-wizard-gold animate-float" />
                </div>
                <h2 className="font-serif text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-br from-parchment to-wizard-gold mb-4">The Sticker Oracle</h2>
                <p className="text-parchment/60 text-lg">Whisper your vibe to the machine spirit, and receive a vision.</p>
              </div>

              <div className="space-y-6 max-w-2xl mx-auto">
                <div className="relative group">
                  <input
                    type="text"
                    value={oraclePrompt}
                    onChange={(e) => setOraclePrompt(e.target.value)}
                    placeholder="e.g., A cyberpunk wizard drinking coffee..."
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-8 py-6 text-lg text-parchment placeholder-white/20 focus:outline-none focus:border-wizard-gold/50 focus:ring-2 focus:ring-wizard-gold/20 transition-all shadow-inner"
                    onKeyDown={(e) => e.key === 'Enter' && consultOracle()}
                  />
                  <button
                    onClick={consultOracle}
                    disabled={isLoading || !oraclePrompt}
                    className="absolute right-3 top-3 bottom-3 bg-wizard-gold hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed text-wizard-dark px-6 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 shadow-[0_4px_10px_rgba(0,0,0,0.2)] hover:shadow-[0_0_15px_rgba(255,215,0,0.6)]"
                  >
                    {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
                  </button>
                </div>

                {oracleResponse && (
                  <div className="mt-10 animate-float">
                    <div className="relative bg-gradient-to-br from-wizard-gold/10 to-transparent border border-wizard-gold/30 rounded-2xl p-8 overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
                        <Sparkles className="w-24 h-24 text-wizard-gold" />
                      </div>
                      
                      <h4 className="font-serif text-2xl text-wizard-gold mb-6 flex items-center gap-3 border-b border-wizard-gold/20 pb-4">
                        <Sparkles className="w-5 h-5" /> The Prophecy Revealed
                      </h4>
                      
                      <div className="prose prose-invert prose-p:text-parchment/90 prose-li:text-parchment/80 mb-8">
                        {oracleResponse.split('\n').map((line, i) => (
                          <p key={i} className="mb-2 last:mb-0 text-lg leading-relaxed">{line}</p>
                        ))}
                      </div>

                      <button
                        onClick={handleOracleConsultation}
                        className="w-full bg-whatsapp hover:bg-green-500 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-[0_4px_14px_rgba(0,0,0,0.25)] hover:shadow-[0_6px_25px_rgba(37,211,102,0.4)] flex items-center justify-center gap-3 hover:-translate-y-1"
                      >
                        <MessageCircle className="w-6 h-6" />
                        Manifest this Prophecy (WhatsApp)
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-16 bg-black text-center border-t border-white/5 text-parchment/30 text-sm">
        <div className="max-w-md mx-auto space-y-4">
          <p className="font-serif text-wizard-gold/50 text-lg">Ali's Enchanted Adhesives</p>
          <p>&copy; 2024. Crafted in the void. <br/>Magical items are non-refundable if curse is activated.</p>
        </div>
      </footer>

      {/* Global Floating Whatsapp */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-whatsapp hover:bg-green-500 text-white p-5 rounded-full shadow-[0_0_30px_rgba(37,211,102,0.4)] transition-all hover:scale-110 hover:rotate-12 border-4 border-black/20 backdrop-blur-sm"
      >
        <MessageCircle className="w-8 h-8" />
      </a>
    </div>
  );
};

export default App;