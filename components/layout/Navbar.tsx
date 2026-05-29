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
        <div className="flex items-center">
          {/* Logo - Left (fixed width) */}
          <div className="w-[200px] flex-shrink-0">
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
                className="text-xl font-bold tracking-wider whitespace-nowrap"
                style={{ 
                  fontFamily: 'Audiowide, sans-serif',
                  color: '#1e2329'
                }}
              >
                AgentHub
              </span>
            </Link>
          </div>

          {/* Nav Links - Center (flex-1 for spacing) */}
          <div className="flex-1 flex items-center justify-center">
            <div 
              className="hidden md:flex items-center gap-6"
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
          </div>

          {/* Wallet + Theme Toggle - Right (fixed width to match left) */}
          <div className="w-[200px] flex-shrink-0 flex items-center justify-end gap-3">
            <ThemeToggle />
            <WalletConnect />
          </div>
        </div>
      </div>
    </nav>
  );
}
