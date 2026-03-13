import { useState } from 'react'
import './App.css'
import Intro from './component/Intro'
import Hero from './component/Hero'
import Profile from './component/Profile'
import Index from './component/Index'
import Closing from './component/Closing'
import Project from './component/Project'

function App() {
  return (
    <>
      {/* 글로벌 노이즈 오버레이 */}
      <div className="noise-overlay"></div>
      <Intro />
      <div className="mian">
        <Hero />
        <Profile/>
        <Index/>
        <Project/>
        <Closing/>
      </div>
    </>
  )
}

export default App