import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const courseApi = {
  getAll: async () => {
    const res = await apiClient.get('/api/courses/getcourses/')
    return res.data
  },
  getById: async (id) => {
    const res = await apiClient.get(`/api/courses/getcourse/${id}/`)
    return res.data
  },
  create: async (courseData) => {
    const res = await apiClient.post('/api/courses/addcourse/', courseData)
    return res.data
  },
}

export const blogApi = {
  getAll: async () => {
    const res = await apiClient.get('/api/blogs/blogs/')
    return res.data
  },
  getById: async (id) => {
    const res = await apiClient.get(`/api/blogs/blogs/${id}/`)
    return res.data
  },
  create: async (blogData) => {
    const res = await apiClient.post('/api/blogs/addblogs/', blogData)
    return res.data
  },
}

export const doubtApi = {
  askAi: async (question) => {
    const res = await apiClient.post('/api/doubts/ask', { question })
    return res.data
  },
}

export const getMediaUrl = (path) => {
  if (!path) return null
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  return `${API_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`
}

export default apiClient
