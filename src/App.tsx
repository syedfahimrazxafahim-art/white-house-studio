/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PerspectiveCarousel } from './components/PerspectiveCarousel';
import { About } from './components/About';
import { Approach } from './components/Approach';
import { FaqAccordion } from './components/FaqAccordion';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F2] selection:bg-[#F5F5F2]/20 selection:text-[#F5F5F2]">
      {/* Refined Minimal Header */}
      <Header />

      <main>
        {/* Full-viewport Cinematic Hero with Wave Grid Animation & Provided Background */}
        <Hero />

        {/* 3D Perspective Carousel & Portfolio Gallery */}
        <PerspectiveCarousel />

        {/* Editorial About Section */}
        <About />

        {/* Experience & Approach Section */}
        <Approach />

        {/* Frequently Asked Questions */}
        <FaqAccordion />

        {/* Contact & Booking Section */}
        <Contact />
      </main>

      {/* Understated Luxury Footer */}
      <Footer />
    </div>
  );
}
