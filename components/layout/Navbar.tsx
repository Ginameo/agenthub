'use client';

import Link from 'next/link';
import { WalletConnect } from '@/components/wallet/WalletConnect';
import ThemeToggle from '@/components/ThemeToggle';

export function Navbar() {
  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-lg bg-black border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 overflow-hidden">
        {/* PROPER STRUCTURE: justify-between untuk spread left/right */}
        <div className="flex items-center justify-between text-gray-900">
          
          {/* LEFT SIDE: Logo + Nav Links */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-500 shadow-lg shadow-blue-500/20">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-xl font-bold tracking-wider whitespace-nowrap text-gray-900 dark:text-white font-audiowide">
                AgentHub
              </span>
            </Link>

            {/* Nav Links - gap-6 untuk spacing */}
            <div className="flex items-center gap-6 font-jetbrains">
              <Link 
                href="/agents" 
                className="font-medium text-sm transition-colors hover:text-blue-600 whitespace-nowrap text-gray-600 dark:text-gray-300"
              >
                Agents
              </Link>
              <Link 
                href="/jobs" 
                className="font-medium text-sm transition-colors hover:text-blue-600 whitespace-nowrap text-gray-600 dark:text-gray-300"
              >
                Jobs
              </Link>
              <Link 
                href="/dashboard" 
                className="font-medium text-sm transition-colors hover:text-blue-600 whitespace-nowrap text-gray-600 dark:text-gray-300"
              >
                Dashboard
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE: Theme Toggle + Wallet - gap-3 untuk spacing */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <ThemeToggle />
            <WalletConnect />
          </div>
        </div>
      </div>
    </nav>
  );
}
