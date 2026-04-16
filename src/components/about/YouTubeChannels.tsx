/**
 * YouTube channel showcase section.
 */
import { motion } from 'framer-motion'
import { ExternalLink, PlayCircle } from 'lucide-react'
import { memo, useMemo } from 'react'
import type { YouTubeChannel } from '../../types/about.types'
import { SectionWrapper } from '../shared/SectionWrapper'

const YOUTUBE_CHANNELS: YouTubeChannel[] = [
  {
    id: 'jee-channel',
    name: 'CareerKick JEE',
    description: 'Counseling explainers, round-wise strategy, and rank analysis for JEE aspirants.',
    subscribers: '2,00,000+',
    channelUrl: 'https://www.youtube.com',
  },
  {
    id: 'neet-channel',
    name: 'CareerKick NEET',
    description: 'Medical admission guidance with detailed coverage of NEET counseling updates and options.',
    subscribers: '2,00,000+',
    channelUrl: 'https://www.youtube.com',
  },
  {
    id: 'mba-channel',
    name: 'CareerKick MBA',
    description: 'MBA college insights, selection strategy, and profile-building guidance for management aspirants.',
    subscribers: '2,00,000+',
    channelUrl: 'https://www.youtube.com',
  },
]

function YouTubeChannelsComponent() {
  const channelNodes = useMemo(() => {
    return YOUTUBE_CHANNELS.map((channel, index) => (
      <motion.article
        key={channel.id}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
        className="rounded-3xl border border-brand-navy/10 bg-white p-6"
      >
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-cta/12 text-brand-cta">
          <PlayCircle size={22} />
        </div>
        <h3 className="mt-5 text-xl font-semibold text-brand-navy">{channel.name}</h3>
        <p className="mt-1 text-sm font-medium text-brand-royal">{channel.subscribers} subscribers</p>
        <p className="mt-3 text-sm leading-relaxed text-brand-navy/75">{channel.description}</p>
        <a
          href={channel.channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-brand-navy/15 px-4 py-2 text-sm font-medium text-brand-navy transition-colors hover:border-brand-cta hover:text-brand-cta"
        >
          Visit Channel
          <ExternalLink size={15} />
        </a>
      </motion.article>
    ))
  }, [])

  return (
    <SectionWrapper id="youtube-channels" className="bg-white px-6 py-20 sm:px-8 lg:px-14">
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="font-heading text-center text-3xl font-semibold tracking-tight text-brand-navy sm:text-4xl">
          Community Reach Across YouTube
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-base text-brand-navy/75">
          2,00,000+ subscribers follow CareerKick across three specialized channels.
        </p>
        <div className="mt-12 grid gap-5 md:grid-cols-3">{channelNodes}</div>
      </div>
    </SectionWrapper>
  )
}

export default memo(YouTubeChannelsComponent)



