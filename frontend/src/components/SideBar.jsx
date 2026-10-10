import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  Home,
  Compass,
  BookOpen,
  MessageSquare,
  Newspaper,
  Flame,
  ArrowUpRight,
} from 'lucide-react'

const navItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'All Courses', path: '/all-courses', icon: Compass },
  { name: 'My Courses', path: '/my-courses', icon: BookOpen },
  { name: 'Doubts & Q&A', path: '/doubts', icon: MessageSquare, badge: 'Active' },
  { name: 'Blogs & Articles', path: '/blogs', icon: Newspaper },
]

function SideBar() {
  return (
    <aside className="w-64 shrink-0 hidden md:flex flex-col justify-between border-r border-emerald-950/10 bg-white min-h-[calc(100vh-4rem)] p-4">
      {/* Navigation Links */}
      <div className="space-y-6">
        <div>
          <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Menu
          </p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
                      isActive
                        ? 'bg-emerald-50/80 text-emerald-800 shadow-2xs border border-emerald-200/70 font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50/80'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`w-4 h-4 transition-colors ${
                            isActive
                              ? 'text-emerald-600'
                              : 'text-slate-400 group-hover:text-slate-600'
                          }`}
                        />
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200/50">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              )
            })}
          </nav>
        </div>

        {/* Learning Streak Banner */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-200/50">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1.5 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-500 text-white shadow-xs">
              <Flame className="w-3.5 h-3.5 fill-white" />
            </span>
            <span className="text-xs font-bold text-emerald-950">4-Day Streak!</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Keep it up! Complete 1 lesson today to reach your 5-day goal.
          </p>
        </div>
      </div>

      {/* Footer Support Card */}
      <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/70">
        <p className="text-xs font-semibold text-slate-800">Learnix Community</p>
        <p className="text-[11px] text-slate-500 mt-0.5">
          Join 15,000+ students on Discord to collaborate.
        </p>
        <a
          href="https://discord.com"
          target="_blank"
          rel="noreferrer"
          className="mt-2.5 inline-flex items-center gap-1 text-xs font-semibold text-teal-700 hover:text-emerald-700"
        >
          Join Discord <ArrowUpRight className="w-3 h-3" />
        </a>
      </div>
    </aside>
  )
}

export default SideBar
