import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sun, Moon, Smartphone, Monitor, Share2, QrCode, BarChart3,
  Paintbrush, Links, Palette, Sparkles, Layers, CheckCircle2, Copy
} from 'lucide-react';
import { BioProfile } from './types/bio';
import { BackgroundEngine } from './components/BackgroundEngine';
import { LinkCard } from './components/LinkCard';

const INITIAL_PROFILE: BioProfile = {
  subdomain: 'joao',
  name: 'João Silva',
  bio: 'Especialista em Software SaaS & Design System. Criando soluções digitais de alta performance.',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  verified: true,
  background: {
    type: 'gradient',
    gradient: { colorStart: '#0f172a', colorEnd: '#020617', direction: '135deg', opacity: 1 },
    image: { url: '', zoom: 100, position: 'center', overlayDarkness: 0.4, blur: 0 },
    video: { url: '', overlayDarkness: 0.5, blur: 0 }
  },
  colors: {
    buttonBg: 'rgba(255, 255, 255, 0.05)',
    buttonText: '#ffffff',
    cardBg: 'rgba(15, 23, 42, 0.65)',
    cardBorder: 'rgba(255, 255, 255, 0.1)',
    neonAccent: '#6366f1',
    textPrimary: '#ffffff',
    textSecondary: '#94a3b8',
    priceBadgeBg: '#6366f1',
    priceBadgeText: '#ffffff',
    icons: '#818cf8',
  },
  globalAnimation: 'neon-pulse',
  links: [
    { id: '1', title: 'Acessar Mentoria VIP', url: 'https://example.com', iconName: 'Sparkles', price: 'R$ 497', animation: 'neon-pulse', enabled: true, clicks: 124 },
    { id: '2', title: 'E-book Arquitetura SaaS', url: 'https://example.com', iconName: 'BookOpen', price: 'Grátis', animation: 'shine', enabled: true, clicks: 89 },
    { id: '3', title: 'Canal no YouTube', url: 'https://example.com', iconName: 'Youtube', animation: 'float', enabled: true, clicks: 310 },
  ]
};

export const App: React.FC = () => {
  const [profile, setProfile] = useState<BioProfile>(INITIAL_PROFILE);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState<'content' | 'appearance' | 'analytics'>('appearance');
  const [previewMode, setPreviewMode] = useState<'mobile' | 'desktop'>('mobile');
  const [copied, setCopied] = useState(false);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleShare = () => {
    navigator.clipboard.writeText(`https://${profile.subdomain}.seusite.com`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTrackClick = (id: string) => {
    setProfile(prev => ({
      ...prev,
      links: prev.links.map(l => l.id === id ? { ...l, clicks: l.clicks + 1 } : l)
    }));
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-[#07090e] text-slate-100' : 'bg-slate-50 text-slate-900'} transition-colors duration-300 font-sans`}>
      {/* Header Superior Desktop */}
      <header className="h-16 border-b border-slate-200 dark:border-slate-800/80 glass-panel sticky top-0 z-50 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/30">
            L
          </div>
          <span className="font-semibold text-lg tracking-tight hidden sm:inline">LinkBio Premium</span>
          <span className="text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-full font-mono">
            {profile.subdomain}.seusite.com
          </span>
        </div>

        {/* Alternadores e Ações Rápidas */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex bg-slate-200 dark:bg-slate-800 p-1 rounded-xl gap-1">
            <button
              onClick={() => setPreviewMode('mobile')}
              className={`p-1.5 rounded-lg transition-all ${previewMode === 'mobile' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'opacity-60'}`}
              title="Visão Mobile"
            >
              <Smartphone size={18} />
            </button>
            <button
              onClick={() => setPreviewMode('desktop')}
              className={`p-1.5 rounded-lg transition-all ${previewMode === 'desktop' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'opacity-60'}`}
              title="Visão Desktop"
            >
              <Monitor size={18} />
            </button>
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {isDarkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-slate-600" />}
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
          >
            {copied ? <CheckCircle2 size={16} /> : <Share2 size={16} />}
            <span className="hidden sm:inline">{copied ? 'Copiado!' : 'Compartilhar'}</span>
          </button>
        </div>
      </header>

      {/* Grid Principal do App */}
      <div className="flex flex-col lg:grid lg:grid-cols-12 h-[calc(100vh-4rem)] overflow-hidden">
        
        {/* Painel de Controle Lateral (Configurações Editor) */}
        <div className="lg:col-span-6 xl:col-span-5 border-r border-slate-200 dark:border-slate-800/80 flex flex-col h-full overflow-y-auto">
          {/* Navegação de Abas */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 p-2 gap-1 bg-slate-100/50 dark:bg-slate-900/50">
            <button
              onClick={() => setActiveTab('appearance')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-xl transition-all ${
                activeTab === 'appearance' ? 'bg-white dark:bg-slate-800 shadow-sm text-indigo-500' : 'opacity-60 hover:opacity-100'
              }`}
            >
              <Palette size={16} />
              Aparência
            </button>
            <button
              onClick={() => setActiveTab('content')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-xl transition-all ${
                activeTab === 'content' ? 'bg-white dark:bg-slate-800 shadow-sm text-indigo-500' : 'opacity-60 hover:opacity-100'
              }`}
            >
              <Links size={16} />
              Links
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-xl transition-all ${
                activeTab === 'analytics' ? 'bg-white dark:bg-slate-800 shadow-sm text-indigo-500' : 'opacity-60 hover:opacity-100'
              }`}
            >
              <BarChart3 size={16} />
              Analytics
            </button>
          </div>

          {/* Conteúdo da Aba Ativa */}
          <div className="p-6 space-y-8 flex-1">
            {activeTab === 'appearance' && (
              <>
                {/* Seleção do Tipo de Fundo */}
                <section className="space-y-4">
                  <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <Layers size={16} /> Fundo Dinâmico
                  </h3>
                  <div className="grid grid-cols-3 gap-2 p-1 bg-slate-200 dark:bg-slate-800/60 rounded-xl">
                    {(['gradient', 'image', 'video'] as const).map(type => (
                      <button
                        key={type}
                        onClick={() => setProfile({ ...profile, background: { ...profile.background, type } })}
                        className={`py-2 text-xs font-semibold capitalize rounded-lg transition-all ${
                          profile.background.type === type ? 'bg-white dark:bg-slate-700 text-indigo-500 shadow-sm' : 'opacity-60'
                        }`}
                      >
                        {type === 'gradient' ? 'Gradiente' : type === 'image' ? 'Imagem' : 'Vídeo'}
                      </button>
                    ))}
                  </div>

                  {/* Configurações Específicas de Fundo */}
                  {profile.background.type === 'gradient' && (
                    <div className="space-y-3 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-medium">Cor Inicial</label>
                        <input
                          type="color"
                          value={profile.background.gradient.colorStart}
                          onChange={e => setProfile({
                            ...profile,
                            background: {
                              ...profile.background,
                              gradient: { ...profile.background.gradient, colorStart: e.target.value }
                            }
                          })}
                          className="w-8 h-8 rounded-lg cursor-pointer border-0"
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-medium">Cor Final</label>
                        <input
                          type="color"
                          value={profile.background.gradient.colorEnd}
                          onChange={e => setProfile({
                            ...profile,
                            background: {
                              ...profile.background,
                              gradient: { ...profile.background.gradient, colorEnd: e.target.value }
                            }
                          })}
                          className="w-8 h-8 rounded-lg cursor-pointer border-0"
                        />
                      </div>
                    </div>
                  )}

                  {profile.background.type === 'image' && (
                    <div className="space-y-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
                      <div>
                        <label className="text-xs font-medium block mb-1">URL da Imagem</label>
                        <input
                          type="text"
                          placeholder="https://images.unsplash.com/..."
                          value={profile.background.image.url}
                          onChange={e => setProfile({
                            ...profile,
                            background: {
                              ...profile.background,
                              image: { ...profile.background.image, url: e.target.value }
                            }
                          })}
                          className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Desfoque (Blur)</span>
                          <span>{profile.background.image.blur}px</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="20"
                          value={profile.background.image.blur}
                          onChange={e => setProfile({
                            ...profile,
                            background: {
                              ...profile.background,
                              image: { ...profile.background.image, blur: Number(e.target.value) }
                            }
                          })}
                          className="w-full accent-indigo-500"
                        />
                      </div>
                    </div>
                  )}
                </section>

                {/* Personalização Individual de Cores */}
                <section className="space-y-4">
                  <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <Paintbrush size={16} /> Paleta de Cores do Botão
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-xs font-medium">Acento Neon</span>
                      <input
                        type="color"
                        value={profile.colors.neonAccent}
                        onChange={e => setProfile({ ...profile, colors: { ...profile.colors, neonAccent: e.target.value } })}
                        className="w-7 h-7 rounded-md cursor-pointer border-0"
                      />
                    </div>
                    <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-xs font-medium">Texto do Botão</span>
                      <input
                        type="color"
                        value={profile.colors.buttonText}
                        onChange={e => setProfile({ ...profile, colors: { ...profile.colors, buttonText: e.target.value } })}
                        className="w-7 h-7 rounded-md cursor-pointer border-0"
                      />
                    </div>
                  </div>
                </section>
              </>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Métricas de Acesso</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-indigo-500/5">
                    <span className="text-xs text-slate-500 block">Total de Clicks</span>
                    <span className="text-2xl font-bold text-indigo-500">
                      {profile.links.reduce((acc, curr) => acc + curr.clicks, 0)}
                    </span>
                  </div>
                  <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-emerald-500/5">
                    <span className="text-xs text-slate-500 block">Taxa de Conversão</span>
                    <span className="text-2xl font-bold text-emerald-500">4.8%</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Viewport de Pré-visualização Live (Desktop & Mobile Simulator) */}
        <div className="lg:col-span-6 xl:col-span-7 bg-slate-100/80 dark:bg-slate-950/80 flex items-center justify-center p-4 sm:p-8 relative overflow-hidden h-full">
          
          <div className={`transition-all duration-500 w-full flex justify-center items-center ${
            previewMode === 'mobile' ? 'max-w-[380px] h-[680px]' : 'max-w-4xl h-full max-h-[750px]'
          }`}>
            
            {/* Moldura do Dispositivo */}
            <div className={`w-full h-full relative rounded-[40px] border-[8px] border-slate-800 dark:border-slate-800/90 shadow-2xl overflow-hidden flex flex-col`}>
              
              {/* Renderização da Engine de Fundo */}
              <BackgroundEngine settings={profile.background} />

              {/* Viewport Interno com Scroll Customizado */}
              <div className="relative z-10 flex-1 overflow-y-auto px-6 py-8 flex flex-col items-center">
                
                {/* Header de Perfil */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center text-center mb-6"
                >
                  <div className="relative mb-3">
                    <img
                      src={profile.avatarUrl}
                      alt={profile.name}
                      className="w-20 h-20 rounded-full object-cover ring-2 ring-indigo-500/50 shadow-xl"
                    />
                    {profile.verified && (
                      <CheckCircle2
                        size={18}
                        className="absolute bottom-0 right-0 text-indigo-500 bg-slate-950 rounded-full p-0.5"
                      />
                    )}
                  </div>
                  <h2 className="text-xl font-bold tracking-tight" style={{ color: profile.colors.textPrimary }}>
                    {profile.name}
                  </h2>
                  <p className="text-xs sm:text-sm mt-1 max-w-xs opacity-80" style={{ color: profile.colors.textSecondary }}>
                    {profile.bio}
                  </p>
                </motion.div>

                {/* Lista Dinâmica de Links */}
                <div className="w-full space-y-3.5">
                  {profile.links.filter(l => l.enabled).map((link) => (
                    <LinkCard
                      key={link.id}
                      link={link}
                      globalColors={profile.colors}
                      onTrackClick={handleTrackClick}
                    />
                  ))}
                </div>

                {/* Footer do Bio */}
                <footer className="mt-auto pt-8 text-center">
                  <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest">
                    Powered by LinkBio
                  </span>
                </footer>

              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default App;