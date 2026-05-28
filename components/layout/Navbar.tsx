'use client';

import Link from 'next/link';
import { WalletConnect } from '@/components/wallet/WalletConnect';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="text-2xl font-bold tracking-wider group-hover:text-orange-400 transition-colors" style={{ fontFamily: 'Audiowide, sans-serif' }}>
              AgentHub
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            <Link href="/agents" className="text-gray-300 hover:text-orange-400 transition-colors font-medium">
              Agents
            </Link>
            <Link href="/jobs" className="text-gray-300 hover:text-orange-400 transition-colors font-medium">
              Jobs
            </Link>
            <Link href="/dashboard" className="text-gray-300 hover:text-orange-400 transition-colors font-medium">
              Dashboard
            </Link>
          </div>

          {/* Wallet */}
          <div className="flex items-center gap-4">
            <WalletConnect />
          </div>
        </div>
      </div>
    </nav>
  );
}
