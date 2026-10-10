import React, { useState, useEffect } from 'react'
import {
  Clock,
  Sparkles,
  Bookmark,
  Plus,
  RefreshCw,
  BookOpen,
  CheckCircle,
  X,
  Loader2,
  FileText
} from 'lucide-react'
import { blogApi, getMediaUrl } from '../services/api'

const TYPE_LABELS = {
  All: 'All Articles',
  Tech: 'Technical & Engineering',
  Non_Tech: 'Career & Soft Skills',
  Job: 'Job & Interview Preparation',
}

const TYPE_COLORS = {
  Tech: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
  Non_Tech: 'bg-teal-50 text-teal-700 border-teal-200/60',
  Job: 'bg-amber-50 text-amber-800 border-amber-200/60',
}

function Blogs() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedType, setSelectedType] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [bookmarked, setBookmarked] = useState({})
  
  // Create Blog Modal State
  const [showAddModal, setShowAddModal] = useState(false)
  const [creating, setCreating] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')
  const [newType, setNewType] = useState('Tech')
  const [toastMessage, setToastMessage] = useState(null)

  // Full article view state
  const [activeArticle, setActiveArticle] = useState(null)

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await blogApi.getAll()
      if (res && res.data) {
        setBlogs(res.data)
      } else if (Array.isArray(res)) {
        setBlogs(res)
      }
    } catch (err) {
      console.error('Failed to load blogs:', err)
      setError('Unable to load articles from backend. Please ensure Django is running.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  const toggleBookmark = (id) => {
    setBookmarked((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleCreateBlog = async (e) => {
    e.preventDefault()
    if (!newTitle.trim() || !newContent.trim()) return

    try {
      setCreating(true)
      const payload = {
        title: newTitle.trim(),
        content: newContent.trim(),
        type: newType,
      }
      const res = await blogApi.create(payload)
      if (res && (res.data || res.status === 'success')) {
        setToastMessage('Article published successfully!')
        setShowAddModal(false)
        setNewTitle('')
        setNewContent('')
        setNewType('Tech')
        fetchBlogs()
      }
    } catch (err) {
      console.error('Failed to publish article:', err)
      alert('Error creating article. Please verify fields and backend connection.')
    } finally {
      setCreating(false)
      setTimeout(() => setToastMessage(null), 3500)
    }
  }

  const filteredBlogs = blogs.filter((blog) => {
    const matchesType = selectedType === 'All' || blog.type === selectedType
    const q = searchQuery.toLowerCase()
    const matchesSearch =
      (blog.title || '').toLowerCase().includes(q) ||
      (blog.content || '').toLowerCase().includes(q)
    return matchesType && matchesSearch
  })

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-900 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-emerald-700 animate-in slide-in-from-top-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 font-semibold text-xs uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Learnix Engineering Publication
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Articles & Tech Guides
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Curated engineering insights, interview playbooks, and career roadmaps from the database.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold text-xs shadow-md shadow-emerald-600/20 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Write Article</span>
          </button>
          <button
            onClick={fetchBlogs}
            title="Refresh articles"
            className="p-2.5 bg-white border border-slate-200 text-slate-600 hover:text-emerald-700 rounded-xl hover:bg-emerald-50 transition-colors shadow-2xs"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-emerald-600' : ''}`} />
          </button>
        </div>
      </div>

      {/* Type Filter Pills & Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {['All', 'Tech', 'Non_Tech', 'Job'].map((typeKey) => (
            <button
              key={typeKey}
              onClick={() => setSelectedType(typeKey)}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 ${
                selectedType === typeKey
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xs font-semibold'
                  : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-emerald-50/60 hover:text-emerald-900'
              }`}
            >
              {TYPE_LABELS[typeKey] || typeKey}
            </button>
          ))}
        </div>

        <div className="w-full md:w-64">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
          />
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-4 animate-pulse">
              <div className="h-6 bg-slate-100 rounded-lg w-1/3"></div>
              <div className="h-6 bg-slate-100 rounded-lg w-3/4"></div>
              <div className="h-16 bg-slate-100 rounded-xl w-full"></div>
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {!loading && error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 p-6 rounded-3xl text-center space-y-3">
          <BookOpen className="w-8 h-8 text-rose-500 mx-auto" />
          <h3 className="font-bold text-sm">Failed to connect to Django blogs API</h3>
          <p className="text-xs text-rose-600">{error}</p>
          <button
            onClick={fetchBlogs}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl"
          >
            Retry
          </button>
        </div>
      )}

      {/* Articles Grid */}
      {!loading && !error && filteredBlogs.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => {
            const isBookmarked = !!bookmarked[blog.id]
            const posterSrc = getMediaUrl(blog.poster)
            const badgeStyle = TYPE_COLORS[blog.type] || 'bg-slate-100 text-slate-700'

            return (
              <article
                key={blog.id}
                className="bg-white rounded-3xl border border-slate-200/80 p-6 flex flex-col justify-between shadow-xs hover:shadow-lg hover:border-emerald-200 transition-all duration-200 group"
              >
                <div className="space-y-3">
                  {/* Poster if available */}
                  {posterSrc && (
                    <div className="h-36 rounded-2xl overflow-hidden mb-3">
                      <img src={posterSrc} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${badgeStyle}`}>
                      {blog.type}
                    </span>
                    <button
                      onClick={() => toggleBookmark(blog.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isBookmarked ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-emerald-600' : ''}`} />
                    </button>
                  </div>

                  <h3 className="font-bold text-base sm:text-lg text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-4">
                    {blog.content}
                  </p>
                </div>

                <div className="pt-5 border-t border-slate-100 flex items-center justify-between mt-4">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>~4 min read</span>
                  </div>

                  <button
                    onClick={() => setActiveArticle(blog)}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-900 hover:underline"
                  >
                    Read Full Story →
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredBlogs.length === 0 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
          <FileText className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No articles found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No articles found for the selected category. Click "Write Article" to publish the first one!
          </p>
        </div>
      )}

      {/* Article Detail Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative space-y-5 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${TYPE_COLORS[activeArticle.type] || 'bg-slate-100'}`}>
                {activeArticle.type}
              </span>
              <button
                onClick={() => setActiveArticle(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              {activeArticle.title}
            </h2>

            <div className="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {activeArticle.content}
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setActiveArticle(null)}
                className="px-5 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Article Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-lg w-full p-6 sm:p-7 shadow-2xl relative space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Write New Article</h3>
                  <p className="text-xs text-slate-400">Stores into the Django backend</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateBlog} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Article Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Modern Full Stack Architecture with Django & React"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Category Type <span className="text-rose-500">*</span>
                </label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer"
                >
                  <option value="Tech">Tech (Technical & Engineering)</option>
                  <option value="Non_Tech">Non_Tech (Career & Learning Strategies)</option>
                  <option value="Job">Job (Interviews & Career Opportunities)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Content <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={6}
                  required
                  placeholder="Write your article body here..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
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
                  <span>{creating ? 'Publishing...' : 'Publish Article'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Blogs
