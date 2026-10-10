import React from 'react'
import { Link } from 'react-router-dom'
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'
import { Search, Bell, Sparkles } from 'lucide-react'

function NevBar() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-emerald-900/10 shadow-xs shadow-emerald-950/[0.02]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <img
            src="/Logo.jpg"
            alt="Learnix Logo"
            className="h-10 w-10 rounded-xl object-cover shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-emerald-950 to-teal-900 bg-clip-text text-transparent">
                Learnix
              </span>
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                <Sparkles className="w-2.5 h-2.5" /> PRO
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium hidden sm:block -mt-0.5">
              Empowering Lifelong Learners
            </span>
          </div>
        </Link>

        {/* Global Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search courses, mentors, doubts..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50/70 hover:bg-slate-100/70 focus:bg-white text-slate-700 placeholder-slate-400 border border-slate-200/90 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-150"
            />
          </div>
        </div>

        {/* Right Actions & Auth */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="p-2 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50/60 rounded-xl transition-colors duration-150 relative"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white"></span>
          </button>

          <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>

          {/* Clerk Auth Integration */}
          <div className="flex items-center gap-2">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-emerald-900 hover:bg-emerald-50/70 rounded-xl transition-all duration-150">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 active:scale-95 rounded-xl shadow-sm shadow-emerald-500/20 transition-all duration-150">
                  Get Started
                </button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <div className="flex items-center gap-2 pl-1">
                <UserButton afterSignOutUrl="/" />
              </div>
            </Show>
          </div>
        </div>
      </div>
    </header>
  )
}

export default NevBar
