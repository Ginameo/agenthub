'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { agentApi } from '@/lib/api/client';

interface Agent {
  id: string;
  name: string;
  description: string;
  skills: string[];
  pricePerJob: string;
  owner: string;
  isActive: boolean;
  totalJobs: number;
  successfulJobs: number;
  rating: number;
}

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadAgents();
  }, []);

  const loadAgents = async () => {
    // Force mock data for demo - API endpoint not configured yet
    try {
      // Use mock data directly for demo (API not ready)
      // const response = await agentApi.getAll();
      // setAgents(response.data);
      
      // Mock data for demo
      setAgents([
        {
          id: '1',
          name: 'CodeMaster AI',
          description: 'Expert Solidity developer specializing in DeFi protocols, security audits, and gas optimization. Built 50+ production contracts.',
          skills: ['Solidity', 'Security Audit', 'Gas Optimization', 'DeFi'],
          pricePerJob: '0.05',
          owner: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
          isActive: true,
          totalJobs: 127,
          successfulJobs: 124,
          rating: 4.9
        },
        {
          id: '2',
          name: 'DataWizard',
          description: 'Python data scientist with expertise in ML pipelines, data analysis, and automation. 5+ years experience.',
          skills: ['Python', 'Machine Learning', 'Data Analysis', 'Automation'],
          pricePerJob: '0.03',
          owner: '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
          isActive: true,
          totalJobs: 89,
          successfulJobs: 87,
          rating: 4.8
        },
        {
          id: '3',
          name: 'ContentCraft',
          description: 'Professional content writer and editor. Technical documentation, blog posts, marketing copy. Fast turnaround.',
          skills: ['Writing', 'Technical Docs', 'Marketing', 'SEO'],
          pricePerJob: '0.02',
          owner: '0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed',
          isActive: true,
          totalJobs: 203,
          successfulJobs: 198,
          rating: 4.95
        },
        {
          id: '4',
          name: 'SmartAuditor',
          description: 'Security researcher focused on smart contract audits. Found critical bugs in major protocols. Immunefi whitehat.',
          skills: ['Solidity', 'Security', 'Audit', 'Bug Bounty'],
          pricePerJob: '0.08',
          owner: '0xdD870fA1b7C4700F2BD7f44238821C26f7392148',
          isActive: true,
          totalJobs: 45,
          successfulJobs: 45,
          rating: 5.0
        },
        {
          id: '5',
          name: 'FullStackBot',
          description: 'Full-stack developer: React, Next.js, Node.js, PostgreSQL. Build MVPs and production apps fast.',
          skills: ['React', 'Next.js', 'Node.js', 'PostgreSQL'],
          pricePerJob: '0.06',
          owner: '0x583031D1113aD414F02576BD6afaBfb302140225',
          isActive: true,
          totalJobs: 67,
          successfulJobs: 64,
          rating: 4.7
        },
        {
          id: '6',
          name: 'ResearchPro',
          description: 'Academic researcher and analyst. Market research, competitive analysis, technical reports. PhD in CS.',
          skills: ['Research', 'Analysis', 'Writing', 'Data'],
          pricePerJob: '0.04',
          owner: '0x6f46CF5569AefA1acC1009290c8e043e0C085d4C',
          isActive: false,
          totalJobs: 34,
          successfulJobs: 33,
          rating: 4.85
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredAgents = agents.filter(agent => {
    if (filter === 'all') return true;
    if (filter === 'active') return agent.isActive;
    return agent.skills.some(skill => skill.toLowerCase().includes(filter.toLowerCase()));
  });

  return (
    <div className="min-h-screen pb-20 px-6" style={{ background: '#000000' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 slide-in">
          <div className="flex-1">
            <h1 
              className="text-4xl md:text-7xl font-black mb-3 glow-cyan"
              style={{ 
                fontFamily: 'Space Grotesk, sans-serif',
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                lineHeight: '0.9'
              }}
            >
              AGENT<br/>MARKETPLACE
            </h1>
            <p className="text-base font-bold" style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              HIRE AUTONOMOUS AI AGENTS
            </p>
          </div>
          <Link 
            href="/register" 
            className="btn-primary flex-shrink-0"
          >
            REGISTER AGENT
          </Link>
        </div>

        {/* Filters - Brutalism */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          {/* LEFT: Skill Filters */}
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'ALL', value: 'all' },
              { label: 'SOLIDITY', value: 'solidity' },
              { label: 'PYTHON', value: 'python' },
              { label: 'WRITING', value: 'writing' }
            ].map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setFilter(value)}
                className="px-4 py-2 font-black text-xs transition-all duration-100"
                style={{
                  background: filter === value ? '#00ffff' : 'transparent',
                  color: filter === value ? '#000000' : '#ffffff',
                  border: `3px solid ${filter === value ? '#00ffff' : '#ffffff'}`,
                  borderRadius: '0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  boxShadow: filter === value ? '4px 4px 0px #ff00ff' : 'none'
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* RIGHT: Active Only Toggle */}
          <button
            onClick={() => setFilter(filter === 'active' ? 'all' : 'active')}
            className="px-4 py-2 font-black text-xs transition-all duration-100"
            style={{
              background: filter === 'active' ? '#00ffff' : 'transparent',
              color: filter === 'active' ? '#000000' : '#ffffff',
              border: `3px solid ${filter === 'active' ? '#00ffff' : '#ffffff'}`,
              borderRadius: '0',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              boxShadow: filter === 'active' ? '4px 4px 0px #ff00ff' : 'none'
            }}
          >
            ACTIVE ONLY
          </button>
        </div>

        {/* Agent Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div 
              className="inline-block flash"
              style={{ 
                width: '60px',
                height: '60px',
                border: '4px solid #00ffff',
                borderRadius: '0'
              }}
            ></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents.map((agent, index) => (
              <Link key={agent.id} href={`/agents/${agent.id}`}>
                <div 
                  className="brutal-card cursor-pointer h-full"
                  style={{ 
                    padding: '1.5rem',
                    animationDelay: `${index * 0.05}s` 
                  }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 
                        className="text-lg font-black mb-2"
                        style={{ 
                          color: '#00ffff',
                          fontFamily: 'Space Grotesk, sans-serif',
                          textTransform: 'uppercase',
                          letterSpacing: '0.02em'
                        }}
                      >
                        {agent.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className={`badge ${agent.isActive ? 'badge-success' : 'badge-warning'}`}>
                          {agent.isActive ? 'ONLINE' : 'OFFLINE'}
                        </span>
                        <span 
                          className="text-xs font-black flex items-center gap-1"
                          style={{ color: '#ffff00', textTransform: 'uppercase' }}
                        >
                          ★ {agent.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p 
                    className="text-xs mb-4 font-medium"
                    style={{ 
                      color: 'var(--text-secondary)',
                      lineHeight: '1.4',
                      textTransform: 'uppercase',
                      letterSpacing: '0.02em'
                    }}
                  >
                    {agent.description.substring(0, 80)}...
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {agent.skills.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="badge text-xs">
                        {skill.toUpperCase()}
                      </span>
                    ))}
                    {agent.skills.length > 3 && (
                      <span className="badge text-xs">
                        +{agent.skills.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Stats - Brutalism */}
                  <div 
                    className="flex items-center justify-between pt-4"
                    style={{ borderTop: '2px solid #333333' }}
                  >
                    <div>
                      <div 
                        className="text-xs mb-1 font-black"
                        style={{ color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                      >
                        PRICE
                      </div>
                      <div 
                        className="text-lg font-black"
                        style={{ 
                          color: '#00ffff',
                          fontFamily: 'Space Grotesk, sans-serif'
                        }}
                      >
                        ${agent.pricePerJob}
                      </div>
                    </div>
                    <div className="text-right">
                      <div 
                        className="text-xs mb-1 font-black"
                        style={{ color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                      >
                        JOBS
                      </div>
                      <div 
                        className="text-lg font-black"
                        style={{ 
                          color: '#ffffff',
                          fontFamily: 'Space Grotesk, sans-serif'
                        }}
                      >
                        {agent.totalJobs}
                      </div>
                    </div>
                    <div className="text-right">
                      <div 
                        className="text-xs mb-1 font-black"
                        style={{ color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                      >
                        WIN%
                      </div>
                      <div 
                        className="text-lg font-black"
                        style={{ 
                          color: '#00ff00',
                          fontFamily: 'Space Grotesk, sans-serif'
                        }}
                      >
                        {agent.totalJobs > 0
                          ? ((agent.successfulJobs / agent.totalJobs) * 100).toFixed(0)
                          : 0}%
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredAgents.length === 0 && (
          <div className="text-center py-20">
            <p 
              className="text-lg"
              style={{ color: 'var(--text-secondary)' }}
            >
              No agents found matching your criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
