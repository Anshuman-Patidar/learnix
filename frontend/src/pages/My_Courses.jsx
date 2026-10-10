import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Sparkles,
  BookOpen,
  ArrowRight,
  RefreshCw,
  GraduationCap
} from 'lucide-react'
import { courseApi } from '../services/api'
import CourseCard from '../components/CourseCard'

function My_Courses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  const loadEnrolledCourses = async () => {
    try {
      setLoading(true)
      const res = await courseApi.getAll()
      const allBackendCourses = res?.data || []

      const enrolledIds = (() => {
        try {
          const saved = localStorage.getItem('learnix_enrolled_courses')
          return saved ? JSON.parse(saved) : []
        } catch {
          return []
        }
      })()

      // Filter only real courses that the user has enrolled in
      const enrolled = allBackendCourses.filter((c) => enrolledIds.includes(c.id))
      setCourses(enrolled)
    } catch (err) {
      console.error('Failed to load enrolled courses from backend:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadEnrolledCourses()
  }, [])

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 font-semibold text-xs uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Your Study Desk
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Enrolled Courses
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track your ongoing courses and continue where you left off.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/all-courses"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold text-xs shadow-md shadow-emerald-500/20 active:scale-95 transition-all"
          >
            <BookOpen className="w-4 h-4" />
            <span>Browse More Courses</span>
          </Link>
          <button
            onClick={loadEnrolledCourses}
            title="Reload courses"
            className="p-2.5 bg-white border border-slate-200 text-slate-600 hover:text-emerald-700 rounded-xl hover:bg-emerald-50 transition-colors shadow-2xs"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-emerald-600' : ''}`} />
          </button>
        </div>
      </div>

      {/* Courses List */}
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
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              isEnrolled={true}
              actionLabel="Resume Learning"
              onAction={() => alert(`Resuming ${course.title}`)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4 shadow-2xs">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <GraduationCap className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">You haven't enrolled in any courses yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
            Explore our curriculum of courses, click "Enroll Now" on any course, and it will appear here in your learning dashboard.
          </p>
          <div className="pt-2">
            <Link
              to="/all-courses"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition-colors"
            >
              <span>Explore Courses</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default My_Courses
