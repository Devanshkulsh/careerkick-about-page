/**
 * Final call-to-action banner section.
 */
import { motion } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'
import { memo, useCallback } from 'react'
import type { CtaBannerContent } from '../../types/about.types'
import { SectionWrapper } from '../shared/SectionWrapper'

const CTA_BANNER_CONTENT: CtaBannerContent = {
  title: 'Ready To Plan Your Dream Admission Journey?',
  description:
    "Connect with CareerKick's expert counselors and build a personalized strategy for your next admission cycle.",
  primaryAction: {
    label: 'Book Counseling Session',
    href: 'https://careerkick.in',
  },
  secondaryAction: {
    label: 'Call Us Now',
    href: 'tel:+919876543210',
  },
}

function CTABannerComponent() {
  const handlePrimaryClick = useCallback(() => {
    window.open(CTA_BANNER_CONTENT.primaryAction.href, '_blank', 'noopener,noreferrer')
  }, [CTA_BANNER_CONTENT.primaryAction.href])

  const handleSecondaryClick = useCallback(() => {
    window.location.href = CTA_BANNER_CONTENT.secondaryAction.href
  }, [CTA_BANNER_CONTENT.secondaryAction.href])

  return (
    <SectionWrapper id="cta-banner" className="bg-brand-navy px-6 py-20 sm:px-8 lg:px-14">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as const }}
        className="mx-auto w-full max-w-6xl rounded-[2rem] border border-white/20 bg-gradient-to-br from-brand-royal via-brand-dark to-brand-navy px-8 py-12 text-white shadow-[0_34px_90px_-36px_rgba(15,52,96,0.72)]"
      >
        <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{CTA_BANNER_CONTENT.title}</h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/85">{CTA_BANNER_CONTENT.description}</p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <motion.button
            type="button"
            onClick={handlePrimaryClick}
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 rounded-full bg-brand-cta px-6 py-3 text-sm font-semibold text-white"
          >
            {CTA_BANNER_CONTENT.primaryAction.label}
            <ArrowRight size={16} />
          </motion.button>
          <motion.button
            type="button"
            onClick={handleSecondaryClick}
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white"
          >
            <Phone size={16} />
            {CTA_BANNER_CONTENT.secondaryAction.label}
          </motion.button>
        </div>
      </motion.div>
    </SectionWrapper>
  )
}

export default memo(CTABannerComponent)



