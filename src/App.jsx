import React, { useState, useCallback } from 'react'
import { FiCalendar } from 'react-icons/fi'
import { useScrollReveal } from './hooks/useScrollReveal'
import { useInteractions } from './hooks/useInteractions'
import Header from './components/Header'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Services from './components/Services'
import PriceList from './components/PriceList'
import Doctors from './components/Doctors'
import Gallery from './components/Gallery'
import Reviews from './components/Reviews'
import Footer from './components/Footer'
import BookingModal from './components/BookingModal'

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [priceTab, setPriceTab] = useState('prophylaxis')

  useScrollReveal()
  useInteractions()

  const openBooking = useCallback(() => setIsModalOpen(true), [])

  const showPrices = useCallback((tab) => {
    setPriceTab(tab)
    document.getElementById('prices')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <>
      <div className="scroll-progress" />
      <div className="cursor" />

      <Header onBooking={openBooking} />
      <main>
        <Hero onBooking={openBooking} />
        <Marquee />
        <About />
        <Services onShowPrices={showPrices} />
        <PriceList tab={priceTab} setTab={setPriceTab} onBooking={openBooking} />
        <Doctors />
        <Gallery />
        <Reviews />
      </main>
      <Footer onBooking={openBooking} />

      <div className="float-cta">
        <button className="btn" onClick={openBooking}>
          <FiCalendar size={18} /> Записатися на прийом
        </button>
      </div>

      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
