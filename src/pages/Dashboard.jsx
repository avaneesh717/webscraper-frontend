import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Dashboard() {
  const [url, setUrl] = useState("")
  const [scrapedData, setScrapedData] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const API_URL = import.meta.env.VITE_API_URL

  useEffect(() => {
    if (!localStorage.getItem("user")) navigate("/")
  }, [navigate])

  const logout = () => {
    localStorage.removeItem("user")
    navigate("/")
  }

  const fetchData = async () => {
    if (!url) return 
    setLoading(true)
    setScrapedData(null)
    try {
      const res = await axios.get(`${API_URL}/scrape?url=${encodeURIComponent(url)}`)
      setScrapedData(res.data)
    } catch (err) {
      console.error(err)
      alert("Failed to reach source. Ensure the URL is valid.")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen mesh-gradient text-foreground pb-20">
      {/* Navigation */}
      <nav className="glass sticky top-0 z-50 border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
              <div className="w-4 h-4 text-primary font-bold text-xs">SP</div>
            </div>
            <span className="font-bold text-xl tracking-tight">Scraper<span className="text-primary font-medium">Portal</span></span>
          </div>
          <button 
            onClick={logout}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2 rounded-lg hover:bg-white/5"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-12 animate-stagger-fade-in">
        {/* Header Section */}
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-5xl font-extrabold mb-4 tracking-tighter bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent italic">
            Intelligence Center
          </h2>
          <p className="text-muted-foreground text-xl max-w-2xl">
            Enter a destination to deconstruct its digital architecture and extract deep-layer intelligence.
          </p>
        </div>

        {/* Enhanced Search Bar */}
        <div className="glass p-3 rounded-[2rem] flex flex-col md:flex-row items-stretch gap-3 mb-16 border-glow focus-within:ring-2 ring-primary/20 transition-all duration-500">
          <div className="flex-1 flex items-center px-6 gap-4 bg-white/5 rounded-2xl border border-white/5 group">
            <svg className="w-6 h-6 text-muted-foreground group-focus-within:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="https://intelligence-source.io/path"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchData()}
              className="w-full py-5 bg-transparent focus:outline-none text-xl placeholder:text-muted-foreground/30 font-light"
            />
          </div>
          <button 
            onClick={fetchData}
            disabled={loading}
            className="px-10 py-5 bg-primary hover:scale-[1.02] active:scale-[0.98] text-primary-foreground font-bold rounded-2xl transition-all shadow-[0_0_30px_rgba(138,43,226,0.4)] disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          >
            {loading ? (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                <span>Analyzing...</span>
              </div>
            ) : (
              <span className="flex items-center gap-2">
                Deploy Scraper
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 7l5 5m0 0l-5 5m5-5H6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            )}
          </button>
        </div>

        {/* Results Flow */}
        {scrapedData ? (
          <div className="space-y-12 animate-stagger-fade-in">
            
            {/* Metadata Summary */}
            <section className="glass p-8 rounded-[2.5rem] border border-primary/20 shadow-[0_0_40px_rgba(138,43,226,0.1)]">
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                {scrapedData.metadata.favicon && (
                  <div className="w-24 h-24 rounded-3xl bg-white/5 p-4 flex items-center justify-center border border-white/10 shrink-0 shadow-inner">
                    <img src={scrapedData.metadata.favicon} alt="Favicon" className="w-12 h-12 object-contain" onError={(e) => e.target.style.display='none'}/>
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                    <span className="px-3 py-1 bg-primary/20 text-primary text-[10px] font-bold rounded-full uppercase tracking-tighter border border-primary/30">Target Identified</span>
                    <span className="text-xs text-muted-foreground/60 font-mono truncate max-w-xs">{scrapedData.metadata.url}</span>
                  </div>
                  <h3 className="text-4xl font-extrabold mb-3 tracking-tight">{scrapedData.metadata.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">
                    {scrapedData.metadata.description || "The target system did not provide an manifest description. Core content analysis proceedes below."}
                  </p>
                </div>
              </div>
            </section>

            {/* Image Gallery */}
            {scrapedData.images && scrapedData.images.length > 0 && (
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/10"></div>
                  <h4 className="text-sm font-bold uppercase tracking-[0.3em] text-muted-foreground/50">Visual Intelligence</h4>
                  <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/10"></div>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide snap-x">
                  {scrapedData.images.map((img, i) => (
                    <div key={i} className="snap-center shrink-0 w-64 aspect-video glass rounded-2xl overflow-hidden group relative cursor-pointer border-white/5 hover:border-primary/50 transition-all duration-300">
                      <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-end items-end">
                        <p className="text-[10px] uppercase font-bold text-white tracking-widest truncate">{img.alt || "Resource Image"}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Content Sections */}
            <div className="grid gap-8">
              <div className="flex items-center gap-4 mb-2">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/10"></div>
                <h4 className="text-sm font-bold uppercase tracking-[0.3em] text-muted-foreground/50">Core Structure</h4>
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/10"></div>
              </div>
              {scrapedData.sections && scrapedData.sections.length > 0 ? (
                scrapedData.sections.map((section, idx) => (
                  <div key={idx} className="glass p-10 rounded-[2.5rem] group hover:border-primary/40 transition-all duration-500 border-white/5">
                    <div className="flex items-start justify-between mb-8">
                      <div className="flex-1">
                        <span className="text-primary font-mono text-xs mb-2 block tracking-widest">LAYER_{String(idx + 1).padStart(3, '0')}</span>
                        <h3 className="text-3xl font-bold group-hover:text-primary transition-colors pr-8 leading-tight">{section.heading}</h3>
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold text-muted-foreground/40">{idx + 1}</span>
                      </div>
                    </div>
                    <div className="space-y-6">
                      {section.content.map((para, i) => (
                        <p key={i} className="text-muted-foreground leading-relaxed text-xl border-l-4 border-white/5 pl-6 group-hover:border-primary/30 transition-all duration-700 font-light italic">
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground italic py-10">System detected minimal textual headers. Content analysis complete.</p>
              )}
            </div>

          </div>
        ) : !loading && (
          <div className="glass py-32 rounded-[3rem] text-center border-dashed border-2 border-white/10 max-w-3xl mx-auto shadow-2xl">
            <div className="w-24 h-24 bg-white/5 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-primary shadow-inner">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold mb-3 tracking-tight">Scanner Offline</h3>
            <p className="text-muted-foreground text-lg px-12">Submit a data source above to begin deep extraction of assets and textual intelligence.</p>
          </div>
        )}
      </main>
      
      {/* Footer Decal */}
      <footer className="mt-20 text-center opacity-20 hover:opacity-100 transition-opacity duration-1000">
        <p className="text-[10px] font-mono tracking-[0.5em] uppercase">Built for High-Level Extraction &trade;</p>
      </footer>
    </div>
  )
}
