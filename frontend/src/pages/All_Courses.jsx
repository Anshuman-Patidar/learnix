import React, { useState, useEffect } from 'react'
import {
  Search,
  Sparkles,
  Plus,
  BookOpen,
  ArrowUpDown,
  CheckCircle,
  Loader2,
  RefreshCw,
  X
} from 'lucide-react'
import { courseApi } from '../services/api'
import CourseCard from '../components/CourseCard'

function All_Courses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('popular')
  const [enrolledIds, setEnrolledIds] = useState(() => {
    try {
      const saved = localStorage.getItem('learnix_enrolled_courses')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Add Course Modal State
  const [showAddModal, setShowAddModal] = useState(false)
  const [creating, setCreating] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newPrice, setNewPrice] = useState('')
  const [newTotalStudents, setNewTotalStudents] = useState('')
  const [toastMessage, setToastMessage] = useState(null)

  const fetchCourses = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await courseApi.getAll()
      // res format from django: { status: 'success', data: [...] }
      if (res && res.data) {
        setCourses(res.data)
      } else if (Array.isArray(res)) {
        setCourses(res)
      }
    } catch (err) {
      console.error('Failed to load courses from backend:', err)
      setError('Unable to load courses from backend. Ensure Django server is running at http://localhost:8000')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  const handleEnroll = (course) => {
    if (enrolledIds.includes(course.id)) return
    const updated = [...enrolledIds, course.id]
    setEnrolledIds(updated)
    localStorage.setItem('learnix_enrolled_courses', JSON.stringify(updated))

    setToastMessage(`Enrolled in "${course.title}"! Track progress in My Courses.`)
    setTimeout(() => setToastMessage(null), 3500)
  }

  const handleCreateCourse = async (e) => {
    e.preventDefault()
    if (!newTitle.trim() || !newDescription.trim()) return

    try {
      setCreating(true)
      const payload = {
        title: newTitle.trim(),
        description: newDescription.trim(),
        price: parseFloat(newPrice) || 0.0,
        totalstudents: parseInt(newTotalStudents, 10) || 0,
      }
      const res = await courseApi.create(payload)
      if (res && (res.data || res.status === 'success')) {
        setToastMessage('Course added successfully to Django database!')
        setShowAddModal(false)
        setNewTitle('')
        setNewDescription('')
        setNewPrice('')
        setNewTotalStudents('')
        fetchCourses()
      }
    } catch (err) {
      console.error('Failed to create course:', err)
      alert('Error creating course. Please verify required fields and backend connection.')
    } finally {
      setCreating(false)
      setTimeout(() => setToastMessage(null), 3500)
    }
  }

  // Filter & Sort
  const filteredCourses = courses
    .filter((course) => {
      const q = searchQuery.toLowerCase()
      const titleMatch = (course.title || '').toLowerCase().includes(q)
      const descMatch = (course.description || '').toLowerCase().includes(q)
      return titleMatch || descMatch
    })
    .sort((a, b) => {
      if (sortBy === 'popular') return (b.totalstudents || 0) - (a.totalstudents || 0)
      if (sortBy === 'price-low') return (a.price || 0) - (b.price || 0)
      if (sortBy === 'price-high') return (b.price || 0) - (a.price || 0)
      if (sortBy === 'title') return (a.title || '').localeCompare(b.title || '')
      return 0
    })

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-900 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-emerald-700 animate-in slide-in-from-top-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 font-semibold text-xs uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Backend Course Catalog
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Explore All Courses
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-xl">
            Live course offerings retrieved directly from your Django database API.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold text-xs shadow-md shadow-emerald-600/20 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Course</span>
          </button>
          <button
            onClick={fetchCourses}
            title="Refresh from backend"
            className="p-2.5 bg-white border border-slate-200 text-slate-600 hover:text-emerald-700 rounded-xl hover:bg-emerald-50 transition-colors shadow-2xs"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-emerald-600' : ''}`} />
          </button>
        </div>
      </div>

      {/* Search and Sorting Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by course title or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
          <span className="text-xs font-medium text-slate-500">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer"
          >
            <option value="popular">Most Students</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="title">Alphabetical (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="bg-white rounded-3xl border border-slate-200/80 p-5 space-y-4 animate-pulse"
            >
              <div className="h-44 bg-slate-100 rounded-2xl w-full"></div>
              <div className="h-5 bg-slate-100 rounded-lg w-3/4"></div>
              <div className="h-4 bg-slate-100 rounded-lg w-full"></div>
              <div className="h-4 bg-slate-100 rounded-lg w-1/2"></div>
              <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                <div className="h-6 bg-slate-100 rounded w-16"></div>
                <div className="h-8 bg-slate-100 rounded-xl w-24"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 p-6 rounded-3xl text-center space-y-3">
          <BookOpen className="w-8 h-8 text-rose-500 mx-auto" />
          <h3 className="font-bold text-sm sm:text-base">Unable to connect to backend server</h3>
          <p className="text-xs text-rose-600 max-w-md mx-auto">{error}</p>
          <button
            onClick={fetchCourses}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Courses Grid using unified CourseCard */}
      {!loading && !error && filteredCourses.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              isEnrolled={enrolledIds.includes(course.id)}
              onEnroll={handleEnroll}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredCourses.length === 0 && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center space-y-4">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">No courses match your criteria</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {searchQuery
              ? `No courses matching "${searchQuery}". Clear your search or add a new course.`
              : 'There are currently no courses in the database. Click "Add Course" above to create one!'}
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
            >
              Clear Search
            </button>
          )}
        </div>
      )}

      {/* Add Course Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-lg w-full p-6 sm:p-7 shadow-2xl relative space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Add New Course</h3>
                  <p className="text-xs text-slate-400">Stores directly in the Django database</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCourse} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Course Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Next.js 15 & Server Components"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Description <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Brief overview of curriculum and learning outcomes..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="49.99"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Initial Enrolled Students
                  </label>
                  <input
                    type="number"
                    placeholder="120"
                    value={newTotalStudents}
                    onChange={(e) => setNewTotalStudents(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl shadow-md transition-colors disabled:opacity-50"
                >
                  {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  <span>{creating ? 'Saving...' : 'Create Course'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default All_Courses
