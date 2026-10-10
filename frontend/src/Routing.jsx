import React from 'react'
import { Routes, Route } from 'react-router-dom'

// pages
import Home from './pages/Home'
import My_Courses from './pages/My_Courses'
import Doubts from './pages/Doubts'
import All_courses from './pages/All_Courses'
import Blogs from './pages/Blogs'

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/my-courses" element={<My_Courses />} />
      <Route path="/doubts" element={<Doubts />} />
      <Route path="/all-courses" element={<All_courses />} />
      <Route path="/blogs" element={<Blogs />} />
    </Routes>
  )
}

export default Routing
