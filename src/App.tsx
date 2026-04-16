import React from 'react'
import PageLayout from '@/components/layout/PageLayout'
import Hero from '@/components/sections/Hero'
import MarqueeStrip from '@/components/ui/MarqueeStrip'
import Services from '@/components/sections/Services'
import Work from '@/components/sections/Work'
import About from '@/components/sections/About'
import Process from '@/components/sections/Process'
import Pricing from '@/components/sections/Pricing'
import StartProject from '@/components/sections/StartProject'

const App = React.memo(function App() {
  return (
    <PageLayout>
      <Hero />
      <MarqueeStrip />
      <Services />
      <Work />
      <About />
      <Process />
      <Pricing />
      <StartProject />
    </PageLayout>
  )
})

export default App

