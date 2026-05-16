import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Layout from '@/components/layout/Layout.jsx'
import PageLoader from '@/components/common/PageLoader.jsx'

const Home = lazy(() => import('@/pages/Home.jsx'))
const ServicesPage = lazy(() => import('@/pages/ServicesPage.jsx'))
const IndustriesPage = lazy(() => import('@/pages/IndustriesPage.jsx'))
const AboutPage = lazy(() => import('@/pages/AboutPage.jsx'))
const ContactPage = lazy(() => import('@/pages/ContactPage.jsx'))
const NotFound = lazy(() => import('@/pages/NotFound.jsx'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }) }, [pathname])
  return null
}

const pageVariants = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -10, transition: { duration: 0.3 } },
}

function PageShell({ children }) {
  return (
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative"
    >
      {children}
    </motion.main>
  )
}

export default function App() {
  const location = useLocation()
  return (
    <Layout>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageShell><Home /></PageShell>} />
            <Route path="/services" element={<PageShell><ServicesPage /></PageShell>} />
            <Route path="/industries" element={<PageShell><IndustriesPage /></PageShell>} />
            <Route path="/about" element={<PageShell><AboutPage /></PageShell>} />
            <Route path="/contact" element={<PageShell><ContactPage /></PageShell>} />
            <Route path="*" element={<PageShell><NotFound /></PageShell>} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </Layout>
  )
}
