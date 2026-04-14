import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

interface PageLayoutProps {
  children: React.ReactNode
}

const PageLayout = React.memo(function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-brut-bg">
      <Navbar />
      <main id="main-content" role="main" className="flex-1 pt-16 md:pt-20">
        {children}
      </main>
      <Footer />
    </div>
  )
})

export default PageLayout
