'use client';

import Link from 'next/link';
import { WalletConnect } from '@/components/wallet/WalletConnect';

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
            <button 
              className="theme-toggle w-9 h-9 flex items-center justify-center rounded-lg transition-colors"
              style={{
                backgroundColor: '#f8f9fa',
                border: '1px solid #e6e8ea'
              }}
              aria-label="Toggle theme"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth="1.5" 
                stroke="currentColor"
                className="w-5 h-5"
                style={{ color: '#707a8a' }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
              </svg>
            </button>
            <WalletConnect />
          </div>
        </div>
      </div>
    </nav>
  );
}
