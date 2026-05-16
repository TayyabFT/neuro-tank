import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import { useLenisScroll } from '@/hooks/useLenisScroll'

export default function Layout({ children }) {
  useLenisScroll()
  return (
    <div className="relative min-h-screen text-ink-100">
      <Navbar />
      <div className="relative">
        {children}
      </div>
      <Footer />
    </div>
  )
}
