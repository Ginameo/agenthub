'use client';

import Link from 'next/link';
import { WalletConnect } from '@/components/wallet/WalletConnect';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-wider" style={{ fontFamily: 'Audiowide, sans-serif' }}>
            AgentHub
          </Link>

          <div className="hidden md:flex items-center gap-8" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            <Link href="/agents" className="text-gray-300 hover:text-white transition-colors">
              Agents
            </Link>
            <Link href="/jobs" className="text-gray-300 hover:text-white transition-colors">
              Jobs
            </Link>
            <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
              Dashboard
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <WalletConnect />
          </div>
        </div>
      </div>
    </nav>
  );
}
