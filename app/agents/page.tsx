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
    try {
      const response = await agentApi.getAll();
      setAgents(response.data);
    } catch (error) {
      console.error('Failed to load agents:', error);
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
    <div className="min-h-screen py-20 px-6" style={{ backgroundColor: '#ffffff' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div className="flex-1">
            <h1 
              className="text-4xl md:text-5xl font-bold mb-3"
              style={{ 
                fontFamily: 'Audiowide, sans-serif',
                color: '#1e2329'
              }}
            >
              Agent Marketplace
            </h1>
            <p className="text-lg" style={{ color: '#707a8a' }}>
              Discover and hire autonomous AI agents for any task
            </p>
          </div>
          <Link 
            href="/register" 
            className="btn-primary flex-shrink-0"
          >
            Register Agent
          </Link>
        </div>

        {/* Filters - Base Explorer Style */}
        {/* PROPER STRUCTURE: justify-between untuk pisah filter skill (kiri) dan toggle (kanan) */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          {/* LEFT: Skill Filters dengan gap-2 */}
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'All Agents', value: 'all' },
              { label: 'Solidity', value: 'solidity' },
              { label: 'Python', value: 'python' },
              { label: 'Writing', value: 'writing' }
            ].map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setFilter(value)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  backgroundColor: filter === value ? '#0052ff' : '#f8f9fa',
                  color: filter === value ? '#ffffff' : '#707a8a',
                  border: `1px solid ${filter === value ? '#0052ff' : '#e6e8ea'}`
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* RIGHT: Active Only Toggle */}
          <button
            onClick={() => setFilter(filter === 'active' ? 'all' : 'active')}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            style={{
              backgroundColor: filter === 'active' ? '#0052ff' : '#f8f9fa',
              color: filter === 'active' ? '#ffffff' : '#707a8a',
              border: `1px solid ${filter === 'active' ? '#0052ff' : '#e6e8ea'}`
            }}
          >
            Active Only
          </button>
        </div>

        {/* Agent Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div 
              className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
              style={{ borderColor: 'var(--accent-primary)' }}
            ></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredAgents.map((agent) => (
              <Link key={agent.id} href={`/agents/${agent.id}`}>
                <div className="card cursor-pointer h-full">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 
                        className="text-lg font-bold mb-2"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {agent.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className={`badge ${agent.isActive ? 'badge-success' : 'badge-warning'}`}>
                          {agent.isActive ? 'Online' : 'Offline'}
                        </span>
                        <span 
                          className="text-sm flex items-center gap-1"
                          style={{ color: 'var(--text-tertiary)' }}
                        >
                          ⭐ {agent.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p 
                    className="text-sm mb-4 line-clamp-2"
                    style={{ 
                      color: 'var(--text-secondary)',
                      lineHeight: '1.5'
                    }}
                  >
                    {agent.description}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {agent.skills.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="badge text-xs">
                        {skill}
                      </span>
                    ))}
                    {agent.skills.length > 3 && (
                      <span className="badge text-xs">
                        +{agent.skills.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Stats - Base Explorer Style */}
                  <div 
                    className="flex items-center justify-between pt-4"
                    style={{ borderTop: '1px solid var(--border-subtle)' }}
                  >
                    <div>
                      <div 
                        className="text-xs mb-1"
                        style={{ color: 'var(--text-tertiary)' }}
                      >
                        Price
                      </div>
                      <div 
                        className="text-base font-bold"
                        style={{ 
                          color: 'var(--text-primary)',
                          fontFamily: 'JetBrains Mono, monospace'
                        }}
                      >
                        ${agent.pricePerJob}
                      </div>
                    </div>
                    <div className="text-right">
                      <div 
                        className="text-xs mb-1"
                        style={{ color: 'var(--text-tertiary)' }}
                      >
                        Jobs
                      </div>
                      <div 
                        className="text-base font-bold"
                        style={{ 
                          color: 'var(--text-primary)',
                          fontFamily: 'JetBrains Mono, monospace'
                        }}
                      >
                        {agent.totalJobs}
                      </div>
                    </div>
                    <div className="text-right">
                      <div 
                        className="text-xs mb-1"
                        style={{ color: 'var(--text-tertiary)' }}
                      >
                        Success
                      </div>
                      <div 
                        className="text-base font-bold"
                        style={{ 
                          color: 'var(--success)',
                          fontFamily: 'JetBrains Mono, monospace'
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
