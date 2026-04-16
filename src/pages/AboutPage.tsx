/**
 * Root About page composition for CareerKick.
 */
import { MotionConfig } from 'framer-motion'
import { memo } from 'react'
import BrandStory from '../components/about/BrandStory'
import CTABanner from '../components/about/CTABanner'
import HeroSection from '../components/about/HeroSection'
import ImpactStats from '../components/about/ImpactStats'
import JourneyTimeline from '../components/about/JourneyTimeline'
import LeadershipTeam from '../components/about/LeadershipTeam'
import MissionVision from '../components/about/MissionVision'
import OfficeLocations from '../components/about/OfficeLocations'
import ServicesGrid from '../components/about/ServicesGrid'
import TestimonialMarquee from '../components/about/TestimonialMarquee'
import WhyChooseUs from '../components/about/WhyChooseUs'
import YouTubeChannels from '../components/about/YouTubeChannels'
import FeatureSection from '../components/about/FeatureSection'

function AboutPageComponent() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="bg-white text-brand-navy">
        <HeroSection />
        <BrandStory />
        {/* <ImpactStats /> */}
        <MissionVision />
        <ServicesGrid />
        <FeatureSection />
        {/* <WhyChooseUs /> */}
        {/* <LeadershipTeam /> */}
        {/* <YouTubeChannels /> */}
        {/* <OfficeLocations /> */}
        {/* <TestimonialMarquee /> */}
        {/* <JourneyTimeline /> */}
        {/* <CTABanner /> */}
      </main>
    </MotionConfig>
  )
}

export default memo(AboutPageComponent)

