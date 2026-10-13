import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { STUDIO_DETAILS } from '../data/photography';

interface FaqItem {
  id: string;
  question: string;
  answer: React.ReactNode;
}

export const FaqAccordion: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const faqs: FaqItem[] = [
    {
      id: 'faq-1',
      question: 'Where is White House studio based?',
      answer: (
        <p>
          White House studio is based in {STUDIO_DETAILS.location}, documenting
          weddings and private celebrations locally and for destination events upon
          inquiry.
        </p>
      ),
    },
    {
      id: 'faq-2',
      question: 'How can I inquire about wedding photography?',
      answer: (
        <p>
          You can reach out directly via email at{' '}
          <a
            href={`mailto:${STUDIO_DETAILS.email}`}
            className="text-[#F5F5F2] underline hover:text-white transition-colors"
          >
            {STUDIO_DETAILS.email}
          </a>
          , or telephone at{' '}
          <a
            href={`tel:${STUDIO_DETAILS.phoneTel}`}
            className="text-[#F5F5F2] underline hover:text-white transition-colors"
          >
            {STUDIO_DETAILS.phone}
          </a>
          . You can also submit the inquiry form below with your wedding date and venue.
        </p>
      ),
    },
    {
      id: 'faq-3',
      question: 'How can I view the photography portfolio?',
      answer: (
        <p>
          Our featured photographs are presented directly on this website in the{' '}
          <a
            href="#portfolio"
            className="text-[#F5F5F2] underline hover:text-white transition-colors"
          >
            interactive portfolio section
          </a>
          , where you can explore ceremony moments, bridal portraits, and
          architectural atmosphere in both 3D perspective and full-resolution lightbox views.
        </p>
      ),
    },
    {
      id: 'faq-4',
      question: 'How do we discuss custom wedding coverage and dates?',
      answer: (
        <p>
          Every celebration has its own narrative and timeline. We invite couples to
          contact us with their prospective date, venue location, and overall vision so
          we can discuss tailored coverage directly.
        </p>
      ),
    },
    {
      id: 'faq-5',
      question: 'Are you available on social platforms?',
      answer: (
        <p>
          Yes, you can follow and connect with White House studio on Instagram at{' '}
          <a
            href={STUDIO_DETAILS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#F5F5F2] underline hover:text-white transition-colors"
          >
            @white_house.p
          </a>{' '}
          and on Facebook at{' '}
          <a
            href={STUDIO_DETAILS.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#F5F5F2] underline hover:text-white transition-colors"
          >
            White House Studio
          </a>
          .
        </p>
      ),
    },
  ];

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="relative py-24 md:py-32 bg-[#0A0A0A] border-t border-[#27272A]/40">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.24em] text-[#D4D4D8] font-light block mb-3">
            Questions & Inquiries
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#F5F5F2] font-normal tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Accordion List */}
        <div className="divide-y divide-[#27272A]/60 border-y border-[#27272A]/60">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className="group transition-colors">
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  className="w-full py-6 md:py-7 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                >
                  <span className="text-base sm:text-lg font-serif text-[#F5F5F2] group-hover:text-white transition-colors pr-6">
                    {faq.question}
                  </span>
                  <span
                    className={`shrink-0 p-2 text-[#8E8E93] group-hover:text-[#F5F5F2] transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#F5F5F2]' : 'rotate-0'
                    }`}
                  >
                    <ChevronDown size={18} />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${faq.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-7 text-xs sm:text-sm text-[#A1A1AA] font-light leading-relaxed max-w-3xl">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
