function App() {
  return (
    <div className="min-h-screen bg-white">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#d2d2d7]/40">
        <div className="max-w-[980px] mx-auto px-6 h-12 flex items-center justify-between">
          <span className="text-sm font-semibold tracking-tight text-[#1d1d1f]">krito</span>
          <div className="flex items-center gap-5">
            <a href="https://react.dev" target="_blank" rel="noopener noreferrer" className="text-xs text-[#424245] hover:text-[#1d1d1f] transition-colors">React</a>
            <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer" className="text-xs text-[#424245] hover:text-[#1d1d1f] transition-colors">Vite</a>
            <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="text-xs text-[#424245] hover:text-[#1d1d1f] transition-colors">Tailwind</a>
            <a href="https://www.npmjs.com/package/krito" target="_blank" rel="noopener noreferrer" className="text-xs text-[#424245] hover:text-[#1d1d1f] transition-colors">npm</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-[980px] mx-auto text-center">
          <p className="text-sm font-medium text-[#6e6e73] mb-4 tracking-wide uppercase">Full-Stack Starter</p>
          <h1 className="text-[56px] md:text-[80px] font-bold leading-[1.05] tracking-[-0.03em] text-[#1d1d1f] mb-6">
            Start building.<br />Right now.
          </h1>
          <p className="text-xl md:text-2xl text-[#6e6e73] max-w-[600px] mx-auto leading-relaxed font-light">
            Your project is set up and ready to go. Frontend, backend, database — everything in place.
          </p>
        </div>
      </section>

      {/* Terminal */}
      <section className="pb-24 px-6">
        <div className="max-w-[680px] mx-auto">
          <div className="bg-[#1d1d1f] rounded-2xl overflow-hidden shadow-2xl shadow-black/10">
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.06]">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
              <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
              <span className="ml-3 text-xs text-white/30 font-mono">Terminal</span>
            </div>
            <div className="p-6 font-mono text-sm leading-7">
              <div className="text-white/40"># Start your frontend</div>
              <div><span className="text-[#28c840]">$</span> <span className="text-white/90">cd frontend && npm run dev</span></div>
              <div className="text-white/20 mt-3 mb-3">───</div>
              <div className="text-white/40"># Start your backend</div>
              <div><span className="text-[#28c840]">$</span> <span className="text-white/90">cd backend && npm run dev</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stack — Frontend / Backend */}
      <section className="bg-[#f5f5f7] py-24 px-6">
        <div className="max-w-[980px] mx-auto">
          <h2 className="text-center text-4xl md:text-5xl font-bold text-[#1d1d1f] tracking-tight mb-4">What's included.</h2>
          <p className="text-center text-lg text-[#6e6e73] mb-20 max-w-[500px] mx-auto">A curated set of tools chosen for speed, simplicity, and developer happiness.</p>

          <div className="grid md:grid-cols-2 gap-16">
            {/* Frontend */}
            <div>
              <p className="text-xs font-semibold text-[#6e6e73] uppercase tracking-widest mb-8">Frontend</p>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-[#1d1d1f] mb-1">React</h3>
                  <p className="text-[15px] text-[#6e6e73] leading-relaxed">Build interactive UIs with components. The most popular library for modern web apps.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#1d1d1f] mb-1">Vite</h3>
                  <p className="text-[15px] text-[#6e6e73] leading-relaxed">Lightning-fast dev server and build tool. Hot module replacement that just works.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#1d1d1f] mb-1">Tailwind CSS</h3>
                  <p className="text-[15px] text-[#6e6e73] leading-relaxed">Style directly in your markup. Ship faster without leaving your JSX.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#1d1d1f] mb-1">React Router</h3>
                  <p className="text-[15px] text-[#6e6e73] leading-relaxed">Client-side routing for multi-page navigation without full page reloads.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#1d1d1f] mb-1">Axios</h3>
                  <p className="text-[15px] text-[#6e6e73] leading-relaxed">Make HTTP requests to your backend API. Clean syntax, built-in error handling.</p>
                </div>
              </div>
            </div>

            {/* Backend */}
            <div>
              <p className="text-xs font-semibold text-[#6e6e73] uppercase tracking-widest mb-8">Backend</p>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-[#1d1d1f] mb-1">Express</h3>
                  <p className="text-[15px] text-[#6e6e73] leading-relaxed">Minimal Node.js framework for APIs. Define routes, handle requests, send responses.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#1d1d1f] mb-1">MongoDB</h3>
                  <p className="text-[15px] text-[#6e6e73] leading-relaxed">Store data as flexible JSON-like documents. No rigid table schemas to worry about.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#1d1d1f] mb-1">Mongoose</h3>
                  <p className="text-[15px] text-[#6e6e73] leading-relaxed">Define data models and validate before saving. The bridge between your code and MongoDB.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#1d1d1f] mb-1">Nodemon</h3>
                  <p className="text-[15px] text-[#6e6e73] leading-relaxed">Auto-restarts your server when you save. Never manually restart during development again.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Structure */}
      <section className="py-24 px-6">
        <div className="max-w-[680px] mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] tracking-tight mb-4 text-center">Your project at a glance.</h2>
          <p className="text-center text-[#6e6e73] mb-12">A clean structure you can grow with.</p>

          <div className="bg-[#f5f5f7] rounded-2xl p-8">
            <div className="font-mono text-sm leading-8 text-[#1d1d1f]">
              <div className="text-[#6e6e73]">your-project/</div>
              <div className="ml-4">
                <div>frontend/</div>
                <div className="ml-6 text-[#86868b]">src/<span className="text-[#6e6e73]"> — your React components</span></div>
                <div className="ml-6 text-[#86868b]">public/<span className="text-[#6e6e73]"> — static assets</span></div>
                <div className="ml-6 text-[#86868b]">.env<span className="text-[#6e6e73]"> — API URL, app name</span></div>
              </div>
              <div className="ml-4 mt-2">
                <div>backend/</div>
                <div className="ml-6 text-[#86868b]">server.js<span className="text-[#6e6e73]"> — Express entry point</span></div>
                <div className="ml-6 text-[#86868b]">routes/<span className="text-[#6e6e73]"> — API endpoints</span></div>
                <div className="ml-6 text-[#86868b]">models/<span className="text-[#6e6e73]"> — Mongoose schemas</span></div>
                <div className="ml-6 text-[#86868b]">controllers/<span className="text-[#6e6e73]"> — request handlers</span></div>
                <div className="ml-6 text-[#86868b]">config/<span className="text-[#6e6e73]"> — database connection</span></div>
                <div className="ml-6 text-[#86868b]">.env<span className="text-[#6e6e73]"> — port, MongoDB URI</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-[#f5f5f7] py-24 px-6">
        <div className="max-w-[980px] mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] tracking-tight mb-16 text-center">Where to go from here.</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8">
              <p className="text-3xl mb-4">01</p>
              <h3 className="text-lg font-semibold text-[#1d1d1f] mb-2">Build your UI</h3>
              <p className="text-[15px] text-[#86868b] leading-relaxed">Open <span className="text-[#1d1d1f] font-medium">src/App.jsx</span> and start creating components. Tailwind makes styling fast.</p>
            </div>
            <div className="bg-white rounded-2xl p-8">
              <p className="text-3xl mb-4">02</p>
              <h3 className="text-lg font-semibold text-[#1d1d1f] mb-2">Create your API</h3>
              <p className="text-[15px] text-[#86868b] leading-relaxed">Add routes in <span className="text-[#1d1d1f] font-medium">backend/routes/</span> and connect them with controllers and models.</p>
            </div>
            <div className="bg-white rounded-2xl p-8">
              <p className="text-3xl mb-4">03</p>
              <h3 className="text-lg font-semibold text-[#1d1d1f] mb-2">Connect the dots</h3>
              <p className="text-[15px] text-[#86868b] leading-relaxed">Use <span className="text-[#1d1d1f] font-medium">Axios</span> to call your backend API from React. Your .env files are already configured.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-[#d2d2d7]/30">
        <div className="max-w-[980px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#86868b]">
            Built by <a href="https://www.npmjs.com/package/krito" target="_blank" rel="noopener noreferrer" className="text-[#424245] hover:text-[#1d1d1f] transition-colors">Satyam Rana</a> — for developers who'd rather build than configure.
          </p>
          <div className="flex items-center gap-5 text-xs text-[#86868b]">
            <span>Frontend — localhost:5173</span>
            <span>Backend — localhost:5000</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App