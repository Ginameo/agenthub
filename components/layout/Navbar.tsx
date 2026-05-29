'use client';

import Link from 'next/link';
import { WalletConnect } from '@/components/wallet/WalletConnect';
import ThemeToggle from '@/components/ThemeToggle';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b transition-colors duration-200"
         style={{
           background: 'var(--bg-primary)',
           borderColor: 'var(--border-subtle)',
           boxShadow: '0 1px 3px var(--card-shadow)'
         }}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200"
                 style={{
                   background: 'linear-gradient(135deg, #0052ff, #3b82f6)',
                   boxShadow: '0 2px 8px rgba(0, 82, 255, 0.2)'
                 }}>
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="text-2xl font-bold tracking-wider transition-colors duration-200"
                  style={{ 
                    fontFamily: 'Audiowide, sans-serif',
                    color: 'var(--text-primary)'
                  }}>
              AgentHub
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-6" 
               style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            <Link 
              href="/agents" 
              className="transition-colors duration-200 font-medium text-sm"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-primary)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              Agents
            </Link>
            <Link 
              href="/jobs" 
              className="transition-colors duration-200 font-medium text-sm"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-primary)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              Jobs
            </Link>
            <Link 
              href="/dashboard" 
              className="transition-colors duration-200 font-medium text-sm"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-primary)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              Dashboard
            </Link>
          </div>

          {/* Right side: Theme Toggle + Wallet */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <WalletConnect />
          </div>
        </div>
      </div>
    </nav>
  );
}
