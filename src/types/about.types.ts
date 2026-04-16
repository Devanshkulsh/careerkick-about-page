/**
 * Type definitions for CareerKick About page data and component contracts.
 */
import type { LucideIcon } from 'lucide-react'

export interface HeroContent {
  title: string
  subtitle: string
  tagline: string
  primaryCta: {
    label: string
    href: string
  }
  secondaryCta: {
    label: string
    sectionId: string
  }
}

export interface StoryHighlight {
  id: string
  title: string
  description: string
  imageUrl: string
}

export interface BrandStoryContent {
  title: string
  paragraphs: string[]
  highlights: StoryHighlight[]
}

export interface StatItem {
  id: string
  value: number
  suffix: string
  label: string
  icon: LucideIcon
}

export interface MissionVisionItem {
  id: string
  title: string
  description: string
  icon: LucideIcon
  points: string[]
}

export interface ServiceItem {
  id: string
  title: string
  description: string
  icon: LucideIcon
}

export interface WhyChooseUsItem {
  id: string
  title: string
  description: string
  icon: LucideIcon
}

export interface LeadershipMember {
  id: string
  name: string
  role: string
  bio: string
}

export interface YouTubeChannel {
  id: string
  name: string
  description: string
  subscribers: string
  channelUrl: string
}

export interface OfficeLocation {
  id: string
  city: string
  address: string
  hours: string
}

export interface Testimonial {
  name: string
  review: string
  rating: number
  date: string
}

export interface Milestone {
  year: string
  title: string
  description: string
  highlight?: boolean
}

export interface CtaBannerContent {
  title: string
  description: string
  primaryAction: {
    label: string
    href: string
  }
  secondaryAction: {
    label: string
    href: string
  }
}

export interface AboutPageContent {
  hero: HeroContent
  story: BrandStoryContent
  stats: StatItem[]
  missionVision: MissionVisionItem[]
  services: ServiceItem[]
  whyChooseUs: WhyChooseUsItem[]
  leadershipTeam: LeadershipMember[]
  youtubeChannels: YouTubeChannel[]
  offices: OfficeLocation[]
  testimonials: Testimonial[]
  milestones: Milestone[]
  ctaBanner: CtaBannerContent
}


