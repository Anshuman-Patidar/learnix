import React from 'react'
import { BrowserRouter, NavLink } from 'react-router-dom'
import NevBar from './components/NevBar'
import SideBar from './components/SideBar'
import Routing from './Routing'
import { Home, Compass, BookOpen, MessageSquare, Newspaper } from 'lucide-react'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-800">
        {/* Sticky Top Navigation */}
        <NevBar />

        {/* Dashboard Body */}
        <div className="flex flex-1 max-w-7xl w-full mx-auto">
          {/* Desktop Sidebar */}
          <SideBar />

          {/* Main Page Content */}
          <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 pb-20 md:pb-8">
            <Routing />
          </main>
        </div>

        {/* Mobile Bottom Navigation Bar */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-emerald-950/10 px-3 py-2 flex items-center justify-around">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 text-[11px] font-medium transition-colors ${
                isActive ? 'text-emerald-700 font-bold' : 'text-slate-500'
              }`
            }
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </NavLink>
          <NavLink
            to="/all-courses"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 text-[11px] font-medium transition-colors ${
                isActive ? 'text-emerald-700 font-bold' : 'text-slate-500'
              }`
            }
          >
            <Compass className="w-5 h-5" />
            <span>Courses</span>
          </NavLink>
          <NavLink
            to="/my-courses"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 text-[11px] font-medium transition-colors ${
                isActive ? 'text-emerald-700 font-bold' : 'text-slate-500'
              }`
            }
          >
            <BookOpen className="w-5 h-5" />
            <span>My Learning</span>
          </NavLink>
          <NavLink
            to="/doubts"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 text-[11px] font-medium transition-colors ${
                isActive ? 'text-emerald-700 font-bold' : 'text-slate-500'
              }`
            }
          >
            <MessageSquare className="w-5 h-5" />
            <span>Doubts</span>
          </NavLink>
          <NavLink
            to="/blogs"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 text-[11px] font-medium transition-colors ${
                isActive ? 'text-emerald-700 font-bold' : 'text-slate-500'
              }`
            }
          >
            <Newspaper className="w-5 h-5" />
            <span>Blogs</span>
          </NavLink>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
