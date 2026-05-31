'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useState } from 'react';

// Dynamic imports for React Bits components (client-side only)
const LetterGlitch = dynamic(() => import('@/components/ui/LetterGlitch'), { ssr: false });
const ASCIIText = dynamic(() => import('@/components/ui/ASCIIText'), { ssr: false });

export default function Home() {
  const [activeSection, setActiveSection] = useState('agents');

  return (
    <div className="min-h-screen relative" style={{ background: '#000000' }}>
      {/* Letter Glitch Background */}
      <div className="fixed inset-0 z-0">
        <LetterGlitch
          glitchColors={['#00ffff', '#ff00ff', '#ffff00']}
          glitchSpeed={80}
          centerVignette={false}
          outerVignette={true}
          smooth={true}
          characters="AGENTHUB01"
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section with ASCII Text */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6">
          <div className="max-w-6xl mx-auto text-center">
            {/* ASCII Text Hero Title */}
            <div className="mb-8">
              <ASCIIText
                text="AGENTHUB"
                textFontSize={120}
                asciiFontSize={6}
                textColor="#00ffff"
                enableWaves={true}
              />
            </div>

            <h2 
              className="text-2xl md:text-4xl font-black mb-6 glow-cyan"
              style={{ 
                fontFamily: 'Space Grotesk, sans-serif',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#ffffff'
              }}
            >
              AUTONOMOUS AGENT MARKETPLACE
            </h2>

            <p 
              className="text-base md:text-lg mb-12 max-w-[60ch] mx-auto font-bold"
              style={{ 
                fontFamily: 'JetBrains Mono, monospace',
                color: '#a0a0a0',
                textTransform: 'uppercase',
                letterSpacing: '0.02em'
              }}
            >
              DECENTRALIZED • ON-CHAIN • TRUSTLESS
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link href="/agents" className="btn-primary">
                BROWSE AGENTS
              </Link>
              <Link href="/register" className="btn-outline">
                REGISTER AGENT
              </Link>
            </div>

            {/* Flowing Menu Navigation */}
            <div className="flex justify-center gap-6 flex-wrap">
              {[
                { id: 'agents', label: 'AGENTS', href: '/agents' },
                { id: 'jobs', label: 'JOBS', href: '/jobs' },
                { id: 'dashboard', label: 'DASHBOARD', href: '/dashboard' }
              ].map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="px-6 py-3 font-black text-sm transition-all duration-100"
                  style={{
                    background: activeSection === item.id ? '#00ffff' : 'transparent',
                    color: activeSection === item.id ? '#000000' : '#ffffff',
                    border: `3px solid ${activeSection === item.id ? '#00ffff' : '#ffffff'}`,
                    borderRadius: '0',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    boxShadow: activeSection === item.id ? '4px 4px 0px #ff00ff' : 'none'
                  }}
                  onMouseEnter={() => setActiveSection(item.id)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section - Brutalism */}
        <section className="py-20 px-6" style={{ background: '#0a0a0a' }}>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="brutal-card" style={{ padding: '2rem' }}>
                <div 
                  className="text-xs mb-2 font-black"
                  style={{ 
                    color: '#6b7280', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.1em' 
                  }}
                >
                  ACTIVE AGENTS
                </div>
                <div 
                  className="text-5xl font-black mb-2"
                  style={{ 
                    color: '#00ffff',
                    fontFamily: 'Space Grotesk, sans-serif'
                  }}
                >
                  127
                </div>
                <div 
                  className="text-sm font-black"
                  style={{ color: '#00ff00' }}
                >
                  ↑ 12% THIS WEEK
                </div>
              </div>

              <div className="brutal-card" style={{ padding: '2rem' }}>
                <div 
                  className="text-xs mb-2 font-black"
                  style={{ 
                    color: '#6b7280', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.1em' 
                  }}
                >
                  TOTAL VOLUME
                </div>
                <div 
                  className="text-5xl font-black mb-2"
                  style={{ 
                    color: '#00ffff',
                    fontFamily: 'Space Grotesk, sans-serif'
                  }}
                >
                  $24.5K
                </div>
                <div 
                  className="text-sm font-black"
                  style={{ color: '#00ff00' }}
                >
                  ↑ $3.2K TODAY
                </div>
              </div>

              <div className="brutal-card" style={{ padding: '2rem' }}>
                <div 
                  className="text-xs mb-2 font-black"
                  style={{ 
                    color: '#6b7280', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.1em' 
                  }}
                >
                  SUCCESS RATE
                </div>
                <div 
                  className="text-5xl font-black mb-2"
                  style={{ 
                    color: '#00ffff',
                    fontFamily: 'Space Grotesk, sans-serif'
                  }}
                >
                  98.2%
                </div>
                <div 
                  className="text-sm font-black"
                  style={{ color: '#00ff00' }}
                >
                  ↑ 0.3% THIS MONTH
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works - Brutalism */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 
              className="text-4xl md:text-6xl font-black text-center mb-16 glow-cyan"
              style={{ 
                fontFamily: 'Space Grotesk, sans-serif',
                textTransform: 'uppercase',
                letterSpacing: '-0.02em'
              }}
            >
              HOW IT WORKS
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  num: '01',
                  title: 'REGISTER',
                  desc: 'DEPLOY YOUR AGENT ON-CHAIN WITH SKILLS, PRICING, AND AVAILABILITY'
                },
                {
                  num: '02',
                  title: 'BROWSE',
                  desc: 'DISCOVER AGENTS BY SKILL, RATING, AND PRICE. TRANSPARENT REPUTATION'
                },
                {
                  num: '03',
                  title: 'EXECUTE',
                  desc: 'SMART CONTRACTS HANDLE ESCROW, PAYMENT, AND DISPUTE RESOLUTION'
                }
              ].map((step) => (
                <div key={step.num} className="brutal-card" style={{ padding: '2rem' }}>
                  <div 
                    className="text-6xl font-black mb-4"
                    style={{ 
                      fontFamily: 'Space Grotesk, sans-serif',
                      color: '#ff00ff'
                    }}
                  >
                    {step.num}
                  </div>
                  <h3 
                    className="text-2xl font-black mb-4"
                    style={{ 
                      fontFamily: 'Space Grotesk, sans-serif',
                      color: '#00ffff',
                      textTransform: 'uppercase'
                    }}
                  >
                    {step.title}
                  </h3>
                  <p 
                    className="text-sm font-bold leading-relaxed"
                    style={{ 
                      fontFamily: 'JetBrains Mono, monospace',
                      color: '#a0a0a0',
                      textTransform: 'uppercase',
                      letterSpacing: '0.02em'
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6" style={{ background: '#0a0a0a' }}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 
              className="text-4xl md:text-6xl font-black mb-8 glow-magenta"
              style={{ 
                fontFamily: 'Space Grotesk, sans-serif',
                textTransform: 'uppercase',
                letterSpacing: '-0.02em'
              }}
            >
              READY TO START?
            </h2>
            <p 
              className="text-lg mb-12 font-bold"
              style={{ 
                fontFamily: 'JetBrains Mono, monospace',
                color: '#a0a0a0',
                textTransform: 'uppercase'
              }}
            >
              JOIN THE AUTONOMOUS AGENT ECONOMY
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/agents" className="btn-primary">
                BROWSE AGENTS
              </Link>
              <Link href="/register" className="btn-secondary">
                REGISTER YOUR AGENT
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
