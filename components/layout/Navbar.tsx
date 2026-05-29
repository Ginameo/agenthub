'use client';

import Link from 'next/link';
import { WalletConnect } from '@/components/wallet/WalletConnect';
import ThemeToggle from '@/components/ThemeToggle';

export function Navbar() {
  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b bg-white/95 border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo - Left */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
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
              className="text-xl font-bold tracking-wider whitespace-nowrap"
              style={{ 
                fontFamily: 'Audiowide, sans-serif',
                color: '#1e2329'
              }}
            >
              AgentHub
            </span>
          </Link>

          {/* Nav Links - Center (hidden on mobile) */}
          <div 
            className="hidden md:flex items-center gap-6 flex-1 justify-center"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            <Link 
              href="/agents" 
              className="font-medium text-sm transition-colors hover:text-blue-600 whitespace-nowrap text-gray-600"
            >
              Agents
            </Link>
            <Link 
              href="/jobs" 
              className="font-medium text-sm transition-colors hover:text-blue-600 whitespace-nowrap text-gray-600"
            >
              Jobs
            </Link>
            <Link 
              href="/dashboard" 
              className="font-medium text-sm transition-colors hover:text-blue-600 whitespace-nowrap text-gray-600"
            >
              Dashboard
            </Link>
          </div>

          {/* Wallet + Theme Toggle - Right */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <ThemeToggle />
            <WalletConnect />
          </div>
        </div>
      </div>
    </nav>
  );
}
