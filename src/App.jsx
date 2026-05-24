import React, { useState, useEffect } from 'react'
import { useScrollReveal } from './hooks/useScrollReveal'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Doctors from './components/Doctors'
import Gallery from './components/Gallery'
import Reviews from './components/Reviews'
import Footer from './components/Footer'
import BookingModal from './components/BookingModal'
import './App.css'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useScrollReveal()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="app">
      <Header
        isScrolled={isScrolled}
        onBooking={() => setIsModalOpen(true)}
      />
      <main>
        <Hero onBooking={() => setIsModalOpen(true)} />
        <About />
        <Services />
        <Doctors />
        <Gallery />
        <Reviews />
      </main>
      <Footer onBooking={() => setIsModalOpen(true)} />
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}

export default App
