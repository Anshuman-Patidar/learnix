import React, { useState, useEffect } from 'react'
import {
  Sparkles,
  Bot,
  Send,
  Loader2,
  Clock,
  CheckCircle,
  Copy,
  Check,
  RotateCcw,
  HelpCircle,
  History,
  Trash2,
  ArrowRight,
  BookOpen
} from 'lucide-react'
import { doubtApi } from '../services/api'

const QUICK_PROMPTS = [
  'How do Django REST Framework serializers handle nested relations?',
  'Why does useEffect run twice on mount in React with Vite?',
  'What is the difference between useMemo and useCallback with examples?',
  'How to implement JWT authentication securely in full stack apps?'
]

function Doubts() {
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeSolution, setActiveSolution] = useState(null)
  const [copied, setCopied] = useState(false)
  
  // History of doubts asked in this session / stored locally
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('learnix_doubts_history')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Save history on changes
  useEffect(() => {
    try {
      localStorage.setItem('learnix_doubts_history', JSON.stringify(history))
    } catch (e) {
      console.error(e)
    }
  }, [history])

  const handleAskDoubt = async (queryText) => {
    const q = (queryText || question).trim()
    if (!q) return

    try {
      setLoading(true)
      setError(null)
      const res = await doubtApi.askAi(q)
      
      let parsed = res?.data || res
      if (typeof parsed === 'string') {
        try {
          parsed = JSON.parse(parsed)
        } catch {
          parsed = {
            Greeting: 'Hello Learner!',
            title: `Explanation for: ${q}`,
            content: parsed,
            steps: [],
            last_message: 'Keep practicing!'
          }
        }
      }

      // If backend wrapped inside an additional data key
      if (parsed && parsed.data && typeof parsed.data === 'object') {
        parsed = parsed.data
      }

      const doubtRecord = {
        id: Date.now(),
        question: q,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        solution: parsed
      }

      setActiveSolution(doubtRecord)
      setHistory((prev) => [doubtRecord, ...prev.filter((item) => item.question !== q)])
      setQuestion('')
    } catch (err) {
      console.error('Failed to get answer from doubts API:', err)
      setError(
        'Unable to reach AI mentor. Please ensure your Django backend is running at http://localhost:8000'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    if (!activeSolution?.solution) return
    const s = activeSolution.solution
    const stepsText = (s.steps || [])
      .map((st, i) => `${i + 1}. ${st.Step_title} (${st.duration || ''})\n   ${st.Step_desc}`)
      .join('\n\n')

    const fullText = `${s.Greeting || ''}\n\n${s.title || ''}\n\n${s.content || ''}\n\nSteps:\n${stepsText}\n\n${s.last_message || ''}`

    navigator.clipboard.writeText(fullText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleClearHistory = () => {
    if (window.confirm('Clear all question history?')) {
      setHistory([])
      localStorage.removeItem('learnix_doubts_history')
      setActiveSolution(null)
    }
  }

  const current = activeSolution?.solution

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 font-semibold text-xs uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Learnix AI Mentorship
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Ask Your Doubts
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Get instant, structured solutions directly from our Gemini-powered backend API.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold self-start sm:self-auto">
          <Bot className="w-4 h-4 text-emerald-600" />
          <span>Gemini 3.8 Flash Connected</span>
        </div>
      </div>

      {/* Main Doubt Submission Box */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-4">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          What are you stuck on?
        </label>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleAskDoubt()
          }}
          className="space-y-3"
        >
          <div className="relative">
            <textarea
              rows={3}
              required
              placeholder="Describe your doubt, paste an error message, or ask for a concept roadmap..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder-slate-400"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
            {/* Quick Prompts */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-[11px] font-semibold text-slate-400 shrink-0">Try:</span>
              {QUICK_PROMPTS.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setQuestion(p)
                    handleAskDoubt(p)
                  }}
                  className="whitespace-nowrap text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-600 transition-colors"
                >
                  {p.slice(0, 30)}...
                </button>
              ))}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading || !question.trim()}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 active:scale-95 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-emerald-600/20 transition-all disabled:opacity-50 disabled:pointer-events-none shrink-0"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Thinking...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Ask AI Assistant</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Error alert */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center justify-between gap-3">
          <span>{error}</span>
          <button
            onClick={() => handleAskDoubt()}
            className="px-3 py-1 bg-rose-600 text-white font-semibold rounded-lg hover:bg-rose-700"
          >
            Retry
          </button>
        </div>
      )}

      {/* History and Solution Layout */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* Solution View Area (7 cols on large) */}
        <div className="lg:col-span-8 space-y-6">
          {loading && (
            <div className="bg-white rounded-3xl border border-slate-200/90 p-8 text-center space-y-4 shadow-xs animate-pulse">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <Bot className="w-6 h-6 animate-bounce" />
              </div>
              <h3 className="text-base font-bold text-slate-800">
                AI Mentor is formulating your solution...
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Analyzing question structure, generating step-by-step guidance, and calculating time estimates.
              </p>
            </div>
          )}

          {!loading && current && (
            <div className="bg-white rounded-3xl border border-emerald-100 p-6 sm:p-8 shadow-md space-y-6 animate-in fade-in duration-200">
              {/* Question Context & Actions */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                    {current.Greeting || 'Hello Learner!'}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                    {current.title || activeSolution.question}
                  </h2>
                </div>

                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold shrink-0 transition-colors"
                  title="Copy full explanation"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Core Content */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Overview & Explanation
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50/70 p-4 rounded-2xl border border-slate-200/70">
                  {current.content}
                </p>
              </div>

              {/* Steps (JSON schema steps array) */}
              {Array.isArray(current.steps) && current.steps.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Recommended Action Plan
                  </h4>
                  <div className="grid gap-3">
                    {current.steps.map((step, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-emerald-200 transition-colors flex items-start justify-between gap-4"
                      >
                        <div className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <div className="space-y-1">
                            <h5 className="text-sm font-bold text-slate-900">
                              {step.Step_title}
                            </h5>
                            <p className="text-xs text-slate-600 leading-relaxed">
                              {step.Step_desc}
                            </p>
                          </div>
                        </div>

                        {step.duration && (
                          <span className="whitespace-nowrap inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60 shrink-0">
                            <Clock className="w-3 h-3 text-emerald-600" />
                            {step.duration}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Closing Message */}
              {current.last_message && (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80 flex items-center gap-3 text-xs font-medium text-emerald-900">
                  <Sparkles className="w-5 h-5 text-emerald-600 shrink-0" />
                  <p>{current.last_message}</p>
                </div>
              )}
            </div>
          )}

          {!loading && !current && (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center space-y-4 shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <HelpCircle className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">No active doubt selected</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                Type your programming question or doubt in the box above. The AI mentor will parse it and return a step-by-step roadmap with time estimates.
              </p>
            </div>
          )}
        </div>

        {/* History Sidebar (4 cols on large) */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-emerald-600" />
              <h3 className="font-bold text-sm text-slate-900">Recent Questions</h3>
            </div>
            {history.length > 0 && (
              <button
                onClick={handleClearHistory}
                title="Clear question history"
                className="text-xs text-slate-400 hover:text-rose-600 p-1 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {history.length > 0 ? (
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {history.map((item) => {
                const isSelected = activeSolution?.id === item.id

                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveSolution(item)}
                    className={`p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950 font-medium shadow-2xs'
                        : 'bg-slate-50/70 border-slate-200/70 hover:bg-slate-100/70 text-slate-700'
                    }`}
                  >
                    <p className="text-xs font-bold line-clamp-2">{item.question}</p>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2">
                      <span>{item.timestamp}</span>
                      <span className="text-emerald-700 font-semibold flex items-center gap-0.5">
                        View <ArrowRight className="w-2.5 h-2.5" />
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="py-8 text-center space-y-2 text-slate-400">
              <BookOpen className="w-8 h-8 mx-auto opacity-50" />
              <p className="text-xs">No questions asked yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Doubts
