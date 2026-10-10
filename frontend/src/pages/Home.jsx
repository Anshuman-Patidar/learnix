import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  PlayCircle,
  BookOpen,
  Sparkles,
  ArrowRight,
  TrendingUp
} from 'lucide-react'
import { courseApi } from '../services/api'
import CourseCard from '../components/CourseCard'

function Home() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [enrolledIds, setEnrolledIds] = useState(() => {
    try {
      const saved = localStorage.getItem('learnix_enrolled_courses')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    const fetchHomeCourses = async () => {
      try {
        setLoading(true)
        const res = await courseApi.getAll()
        if (res && res.data) {
          setCourses(res.data)
        } else if (Array.isArray(res)) {
          setCourses(res)
        }
      } catch (err) {
        console.error('Failed to load courses for home:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchHomeCourses()
  }, [])

  const handleEnroll = (course) => {
    if (enrolledIds.includes(course.id)) return
    const updated = [...enrolledIds, course.id]
    setEnrolledIds(updated)
    localStorage.setItem('learnix_enrolled_courses', JSON.stringify(updated))
  }

  const enrolledCourses = courses.filter((c) => enrolledIds.includes(c.id))
  const featuredCourse = courses.length > 0 ? courses[0] : null

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white p-6 sm:p-8 lg:p-10 shadow-xl shadow-emerald-950/15 border border-emerald-700/30">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 backdrop-blur-md border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>AI-Driven Learning Platform</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
            Master Full-Stack & AI with <span className="underline decoration-emerald-300 decoration-wavy">Learnix</span>
          </h1>

          <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
            Real-time courses powered by our Django API and automated doubt solving with Google Gemini AI.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              to="/all-courses"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-emerald-900 font-bold text-xs sm:text-sm shadow-md hover:bg-emerald-50 active:scale-95 transition-all duration-150"
            >
              <BookOpen className="w-4 h-4 text-emerald-600" />
              Explore All Courses ({courses.length})
            </Link>

            <Link
              to="/doubts"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 border border-teal-300/30 text-white font-medium text-xs sm:text-sm transition-all duration-150"
            >
              <Sparkles className="w-4 h-4 text-teal-300" />
              Ask AI Doubts
            </Link>
          </div>
        </div>

        {/* Decorative blur elements */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-16 -right-8 w-72 h-72 bg-emerald-500/30 rounded-full blur-2xl pointer-events-none"></div>
      </div>

      {/* Dynamic Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 block">Available Courses</span>
          <p className="text-2xl font-black text-slate-900 mt-2">{courses.length}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 block">Your Enrolled Courses</span>
          <p className="text-2xl font-black text-emerald-700 mt-2">{enrolledIds.length}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 block">Total Community Learners</span>
          <p className="text-2xl font-black text-teal-700 mt-2">
            {courses.reduce((acc, curr) => acc + (curr.totalstudents || 0), 0).toLocaleString()}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 block">AI Mentor Status</span>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <p className="text-sm font-bold text-slate-900">Gemini Online</p>
          </div>
        </div>
      </div>

      {/* Enrolled Courses Quick Section (if any enrolled) */}
      {enrolledCourses.length > 0 && (
        <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PlayCircle className="w-5 h-5 text-emerald-600" />
              <h2 className="text-lg font-bold text-slate-900">Resume Your Learning</h2>
            </div>
            <Link
              to="/my-courses"
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              Go to My Courses <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {enrolledCourses.slice(0, 3).map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                isEnrolled={true}
                actionLabel="Continue"
                onAction={() => window.location.assign('/my-courses')}
              />
            ))}
          </div>
        </section>
      )}

      {/* Featured Tracks from Backend Courses API */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-bold text-slate-900">Live Course Catalog</h2>
          </div>
          <Link
            to="/all-courses"
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 group"
          >
            Browse All ({courses.length})
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-3xl border border-slate-200 p-5 space-y-3 animate-pulse">
                <div className="h-44 bg-slate-100 rounded-2xl"></div>
                <div className="h-5 bg-slate-100 rounded w-3/4"></div>
                <div className="h-4 bg-slate-100 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : courses.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.slice(0, 6).map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                isEnrolled={enrolledIds.includes(course.id)}
                onEnroll={handleEnroll}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No courses available</h3>
            <p className="text-xs text-slate-500">Courses added in the Django admin will appear here.</p>
          </div>
        )}
      </section>
    </div>
  )
}

export default Home
