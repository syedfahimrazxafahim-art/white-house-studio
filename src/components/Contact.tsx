import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Copy,
  Check,
  Send,
  Instagram,
  Facebook,
} from 'lucide-react';
import { STUDIO_DETAILS } from '../data/photography';
import { LiquidMetalButton } from './LiquidMetalButton';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    coupleNames: '',
    email: '',
    phone: '',
    weddingDate: '',
    location: '',
    message: '',
  });

  const [copied, setCopied] = useState(false);
  const [submittedStatus, setSubmittedStatus] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Prepares the formatted mailto URL
  const generateMailtoUrl = () => {
    const subject = encodeURIComponent(
      `Wedding Photography Inquiry - ${formData.coupleNames || 'New Inquiry'} (${formData.weddingDate || 'Date TBD'})`
    );
    const bodyText = `Hello White House studio,

I would like to inquire about wedding photography coverage:

Couple Names: ${formData.coupleNames || 'Not specified'}
Preferred Wedding Date: ${formData.weddingDate || 'Not specified'}
Venue / Location: ${formData.location || 'New York'}
Email: ${formData.email || 'Not specified'}
Phone: ${formData.phone || 'Not specified'}

Vision & Details:
${formData.message || 'Please let us know your availability.'}

Best regards,
${formData.coupleNames || 'Prospective Client'}`;

    return `mailto:${STUDIO_DETAILS.email}?subject=${subject}&body=${encodeURIComponent(bodyText)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = generateMailtoUrl();
    window.location.href = mailtoUrl;
    setSubmittedStatus('Email client opened. You can review and send your inquiry directly.');
  };

  const handleCopyDetails = () => {
    const textToCopy = `To: ${STUDIO_DETAILS.email}
Couple: ${formData.coupleNames || 'Not specified'}
Date: ${formData.weddingDate || 'TBD'}
Location: ${formData.location || 'New York'}
Contact: ${formData.email} / ${formData.phone}
Notes: ${formData.message}`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-[#050505] border-t border-[#27272A]/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Studio Contact & Socials */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-[0.24em] text-[#D4D4D8] font-light block mb-3">
                Inquiries & Reservations
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#F5F5F2] font-normal tracking-tight mb-6">
                Let's Tell Your Story.
              </h2>
              <p className="text-sm text-[#A1A1AA] font-light leading-relaxed mb-10 max-w-md">
                We accept a limited number of wedding commissions each season to ensure
                every couple receives our dedicated creative attention. Contact White
                House studio directly to check availability for your date.
              </p>

              {/* Verified Contact Details List */}
              <div className="space-y-6 border-t border-[#27272A]/50 pt-8">
                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-[#101010] border border-[#27272A] text-[#D4D4D8]">
                    <MapPin size={17} />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.18em] text-[#8E8E93] block mb-0.5">
                      Studio Base
                    </span>
                    <span className="text-sm text-[#F5F5F2] font-medium">
                      {STUDIO_DETAILS.location}
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-[#101010] border border-[#27272A] text-[#D4D4D8]">
                    <Mail size={17} />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.18em] text-[#8E8E93] block mb-0.5">
                      Email Address
                    </span>
                    <a
                      href={`mailto:${STUDIO_DETAILS.email}`}
                      className="text-sm text-[#F5F5F2] hover:underline transition-all"
                    >
                      {STUDIO_DETAILS.email}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-[#101010] border border-[#27272A] text-[#D4D4D8]">
                    <Phone size={17} />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.18em] text-[#8E8E93] block mb-0.5">
                      Telephone
                    </span>
                    <a
                      href={`tel:${STUDIO_DETAILS.phoneTel}`}
                      className="text-sm text-[#F5F5F2] hover:underline transition-all"
                    >
                      {STUDIO_DETAILS.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="mt-10 pt-8 border-t border-[#27272A]/50">
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#8E8E93] block mb-4">
                  Connect Online
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={STUDIO_DETAILS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs tracking-wider uppercase bg-[#101010] border border-[#27272A] text-[#D4D4D8] hover:text-white hover:border-[#D4D4D8] transition-colors"
                  >
                    <Instagram size={14} />
                    <span>Instagram</span>
                    <ExternalLink size={12} className="opacity-60" />
                  </a>

                  <a
                    href={STUDIO_DETAILS.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs tracking-wider uppercase bg-[#101010] border border-[#27272A] text-[#D4D4D8] hover:text-white hover:border-[#D4D4D8] transition-colors"
                  >
                    <Facebook size={14} />
                    <span>Facebook</span>
                    <ExternalLink size={12} className="opacity-60" />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Action Button */}
            <div className="mt-10 pt-6">
              <a
                href={`mailto:${STUDIO_DETAILS.email}?subject=Wedding%20Photography%20Inquiry`}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#D4D4D8] hover:text-white underline underline-offset-4"
              >
                <Mail size={14} /> Open direct email composer
              </a>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#0A0A0A] border border-[#27272A]/80 p-8 sm:p-10 shadow-2xl relative">
              <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#27272A]/50">
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif text-[#F5F5F2] font-normal">
                    Inquiry Form
                  </h3>
                  <p className="text-xs text-[#8E8E93] mt-1">
                    Send your date and venue details directly to pharadeen.90@gmail.com
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Couple Names */}
                  <div>
                    <label
                      htmlFor="coupleNames"
                      className="block text-[11px] uppercase tracking-[0.16em] text-[#8E8E93] mb-2"
                    >
                      Couple Names *
                    </label>
                    <input
                      type="text"
                      id="coupleNames"
                      name="coupleNames"
                      required
                      value={formData.coupleNames}
                      onChange={handleChange}
                      placeholder="e.g. Clara & Julian"
                      className="w-full bg-[#121214] border border-[#27272A] focus:border-[#D4D4D8] px-4 py-3 text-sm text-[#F5F5F2] placeholder-[#52525B] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Wedding Date */}
                  <div>
                    <label
                      htmlFor="weddingDate"
                      className="block text-[11px] uppercase tracking-[0.16em] text-[#8E8E93] mb-2"
                    >
                      Wedding Date
                    </label>
                    <input
                      type="text"
                      id="weddingDate"
                      name="weddingDate"
                      value={formData.weddingDate}
                      onChange={handleChange}
                      placeholder="e.g. October 2026 or Spring 2027"
                      className="w-full bg-[#121214] border border-[#27272A] focus:border-[#D4D4D8] px-4 py-3 text-sm text-[#F5F5F2] placeholder-[#52525B] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-[11px] uppercase tracking-[0.16em] text-[#8E8E93] mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className="w-full bg-[#121214] border border-[#27272A] focus:border-[#D4D4D8] px-4 py-3 text-sm text-[#F5F5F2] placeholder-[#52525B] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-[11px] uppercase tracking-[0.16em] text-[#8E8E93] mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-[#121214] border border-[#27272A] focus:border-[#D4D4D8] px-4 py-3 text-sm text-[#F5F5F2] placeholder-[#52525B] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Venue / Location */}
                <div>
                  <label
                    htmlFor="location"
                    className="block text-[11px] uppercase tracking-[0.16em] text-[#8E8E93] mb-2"
                  >
                    Venue / City / Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. New York Public Library, Brooklyn, or Destination"
                    className="w-full bg-[#121214] border border-[#27272A] focus:border-[#D4D4D8] px-4 py-3 text-sm text-[#F5F5F2] placeholder-[#52525B] focus:outline-none transition-colors"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-[11px] uppercase tracking-[0.16em] text-[#8E8E93] mb-2"
                  >
                    Your Vision & Story
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your celebration, estimated guest count, or any specific moments that mean the most to you..."
                    className="w-full bg-[#121214] border border-[#27272A] focus:border-[#D4D4D8] px-4 py-3 text-sm text-[#F5F5F2] placeholder-[#52525B] focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Action buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                  <LiquidMetalButton
                    type="submit"
                    variant="primary"
                    className="w-full sm:w-auto"
                  >
                    <Send size={13} className="mr-1" /> Send Inquiry via Email
                  </LiquidMetalButton>

                  <button
                    type="button"
                    onClick={handleCopyDetails}
                    className="w-full sm:w-auto px-5 py-3 text-xs tracking-[0.14em] uppercase text-[#D4D4D8] hover:text-white border border-[#27272A] hover:border-[#D4D4D8] bg-[#101010] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check size={14} className="text-white" />
                        <span>Copied to Clipboard</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy Draft Details</span>
                      </>
                    )}
                  </button>
                </div>

                {submittedStatus && (
                  <p className="text-xs text-[#D4D4D8] bg-[#141416] p-3 border border-[#27272A]">
                    {submittedStatus}
                  </p>
                )}

                <p className="text-[11px] text-[#8E8E93] font-light leading-relaxed">
                  Submitting will launch your email client with your answers prepared
                  for White House studio ({STUDIO_DETAILS.email}).
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
