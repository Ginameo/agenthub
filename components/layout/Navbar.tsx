'use client';

import Link from 'next/link';
import { WalletConnect } from '@/components/wallet/WalletConnect';
import ThemeToggle from '@/components/ThemeToggle';

export function Navbar() {
  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderColor: '#e6e8ea'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
          {/* Logo - Left (fixed width) */}
          <Link href="/" className="flex items-center gap-3 group">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #0052ff, #3b82f6)',
                boxShadow: '0 2px 8px rgba(0, 82, 255, 0.2)'
              }}
            >
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span 
              className="text-2xl font-bold tracking-wider whitespace-nowrap"
              style={{ 
                fontFamily: 'Audiowide, sans-serif',
                color: '#1e2329'
              }}
            >
              AgentHub
            </span>
          </Link>

          {/* Nav Links - Center (flexible, hidden on mobile) */}
          <div 
            className="hidden md:flex items-center justify-center gap-6"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            <Link 
              href="/agents" 
              className="font-medium text-sm transition-colors hover:text-blue-600 whitespace-nowrap"
              style={{ color: '#707a8a' }}
            >
              Agents
            </Link>
            <Link 
              href="/jobs" 
              className="font-medium text-sm transition-colors hover:text-blue-600 whitespace-nowrap"
              style={{ color: '#707a8a' }}
            >
              Jobs
            </Link>
            <Link 
              href="/dashboard" 
              className="font-medium text-sm transition-colors hover:text-blue-600 whitespace-nowrap"
              style={{ color: '#707a8a' }}
            >
              Dashboard
            </Link>
          </div>

          {/* Right side: Theme Toggle + Wallet (fixed width) */}
          <div className="flex items-center justify-end gap-3" style={{ minWidth: '200px' }}>
            <ThemeToggle />
            <div style={{ minWidth: '120px' }}>
              <WalletConnect />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
