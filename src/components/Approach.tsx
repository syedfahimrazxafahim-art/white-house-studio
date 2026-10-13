import React from 'react';

export const Approach: React.FC = () => {
  const pillars = [
    {
      num: '01',
      title: 'Emotion',
      description:
        'Documenting spontaneous, honest feeling over stiff posed smiles. The tears, quiet smiles, and unplanned laughter that form the emotional spine of your celebration.',
      image:
        'https://res.cloudinary.com/fzobzdco/image/upload/v1791852802/818491890_17907938244490459_5771278054743782137_n.jpg',
    },
    {
      num: '02',
      title: 'Connection',
      description:
        'Understanding the rhythm of your day and moving quietly alongside your closest people. Anticipating fleeting interactions without interrupting them.',
      image:
        'https://res.cloudinary.com/fzobzdco/image/upload/v1791852802/819146620_17907938151490459_2122054225148768658_n.jpg',
    },
    {
      num: '03',
      title: 'Timeless Imagery',
      description:
        'Compositions crafted to look as evocative decades from now as they do today. Rooted in cinematic tonality, natural lighting, and architectural balance.',
      image:
        'https://res.cloudinary.com/fzobzdco/image/upload/v1791852805/819828439_17907938187490459_4028310259905292333_n.jpg',
    },
  ];

  return (
    <section id="approach" className="relative py-24 md:py-32 bg-[#050505] border-t border-[#27272A]/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs uppercase tracking-[0.24em] text-[#D4D4D8] font-light block mb-3">
            The Philosophy
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#F5F5F2] font-normal tracking-tight">
            How We Document Your Day
          </h2>
        </div>

        {/* 3 Pillars Grid with Provided Visual Anchors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {pillars.map((pillar) => (
            <div
              key={pillar.num}
              className="group flex flex-col justify-between bg-[#0A0A0A] border border-[#27272A]/60 p-6 sm:p-8 transition-colors duration-300 hover:border-[#D4D4D8]/40"
            >
              <div>
                {/* Number & Headline */}
                <div className="flex items-center justify-between border-b border-[#27272A]/50 pb-4 mb-6">
                  <span className="text-xs font-mono text-[#8E8E93] tracking-widest">
                    {pillar.num}
                  </span>
                  <span className="text-xs tracking-[0.2em] uppercase text-[#8E8E93]">
                    Perspective
                  </span>
                </div>

                {/* Aspect-ratio photo showcase */}
                <div className="aspect-[4/3] overflow-hidden mb-6 bg-[#141414]">
                  <img
                    src={pillar.image}
                    alt={`White House studio approach - ${pillar.title}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <h3 className="text-2xl font-serif text-[#F5F5F2] font-normal mb-3">
                  {pillar.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#A1A1AA] font-light leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
