import React from 'react'
import { Users, BookOpen, CheckCircle } from 'lucide-react'
import { getMediaUrl } from '../services/api'

function CourseCard({
  course,
  isEnrolled = false,
  onEnroll,
  actionLabel,
  onAction,
  showProgress = false,
  progress = 0
}) {
  if (!course) return null

  const posterUrl = getMediaUrl(course.poster)
  const formattedPrice =
    typeof course.price === 'number'
      ? course.price > 0
        ? `$${course.price.toFixed(2)}`
        : 'Free'
      : course.price || 'Free'

  const formattedStudents =
    typeof course.totalstudents === 'number'
      ? course.totalstudents.toLocaleString()
      : course.totalstudents || '0'

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-emerald-300/80 transition-all duration-200 flex flex-col justify-between group">
      {/* Poster Image / Header */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-900">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-tr from-emerald-950 via-teal-900 to-slate-900 p-4 flex flex-col justify-between text-white relative">
            <div className="flex items-center justify-between z-10">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white">
                Course #{course.id}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-400 text-slate-950 shadow-xs">
                <Users className="w-3 h-3" />
                {formattedStudents}
              </span>
            </div>
            
            <div className="z-10 flex items-center gap-2">
              <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md text-emerald-300">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-emerald-200">
                Learnix Curriculum
              </span>
            </div>
            
            {/* Subtle light glow */}
            <div className="absolute -bottom-8 -right-8 w-28 h-28 bg-emerald-500/20 rounded-full blur-xl pointer-events-none"></div>
          </div>
        )}

        {/* Overlay badges if posterUrl exists */}
        {posterUrl && (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
            <div className="absolute top-3 left-3 z-10">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-900/60 backdrop-blur-md text-white border border-white/20">
                Course #{course.id}
              </span>
            </div>
            <div className="absolute top-3 right-3 z-10">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-400 text-slate-950 shadow-xs">
                <Users className="w-3 h-3" />
                {formattedStudents}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Card Content directly matching courseModle fields */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="font-bold text-base sm:text-lg text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
            {course.title}
          </h3>

          <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
            {course.description || 'No description provided for this course.'}
          </p>
        </div>

        {/* Optional Progress Bar for My Courses */}
        {showProgress && (
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-600">Progress</span>
              <span className="text-emerald-700">{progress}%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Card Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 block font-medium uppercase tracking-wider">
              Price
            </span>
            <span className="text-lg font-black text-slate-900">
              {formattedPrice}
            </span>
          </div>

          {actionLabel ? (
            <button
              onClick={() => onAction && onAction(course)}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white shadow-md shadow-emerald-700/20 active:scale-95 transition-all"
            >
              {actionLabel}
            </button>
          ) : (
            <button
              onClick={() => onEnroll && onEnroll(course)}
              disabled={isEnrolled}
              className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all duration-150 flex items-center gap-1.5 ${
                isEnrolled
                  ? 'bg-emerald-100 text-emerald-800 cursor-default'
                  : 'bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white shadow-md shadow-emerald-700/20'
              }`}
            >
              {isEnrolled ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5" /> Enrolled
                </>
              ) : (
                'Enroll Now'
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default CourseCard
