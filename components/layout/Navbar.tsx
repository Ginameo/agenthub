'use client';

import Link from 'next/link';
import { WalletConnect } from '@/components/wallet/WalletConnect';
import ThemeToggle from '@/components/ThemeToggle';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary border-b border-subtle backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                 style={{
                   background: 'linear-gradient(135deg, #0052ff, #3b82f6)',
                   boxShadow: '0 2px 8px rgba(0, 82, 255, 0.2)'
                 }}>
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="text-2xl font-bold tracking-wider text-primary"
                  style={{ fontFamily: 'Audiowide, sans-serif' }}>
              AgentHub
            </span>
          </Link>

          {/* Nav Links - Desktop */}
          <div className="hidden md:flex items-center gap-6 flex-1 justify-center" 
               style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            <Link 
              href="/agents" 
              className="text-secondary hover:text-accent transition-colors font-medium text-sm"
            >
              Agents
            </Link>
            <Link 
              href="/jobs" 
              className="text-secondary hover:text-accent transition-colors font-medium text-sm"
            >
              Jobs
            </Link>
            <Link 
              href="/dashboard" 
              className="text-secondary hover:text-accent transition-colors font-medium text-sm"
            >
              Dashboard
            </Link>
          </div>

          {/* Right side: Theme Toggle + Wallet */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <ThemeToggle />
            <WalletConnect />
          </div>
        </div>
      </div>
    </nav>
  );
}
