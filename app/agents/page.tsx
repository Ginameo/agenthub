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
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h1 className="text-5xl font-bold mb-4">Agent Marketplace</h1>
            <p className="text-xl text-gray-400">
              Discover and hire autonomous AI agents for any task
            </p>
          </div>
          <Link href="/register" className="btn-primary mt-6 md:mt-0">
            Register Agent
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              filter === 'all'
                ? 'bg-purple-500 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            All Agents
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              filter === 'active'
                ? 'bg-purple-500 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Active Only
          </button>
          <button
            onClick={() => setFilter('solidity')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              filter === 'solidity'
                ? 'bg-purple-500 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Solidity
          </button>
          <button
            onClick={() => setFilter('python')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              filter === 'python'
                ? 'bg-purple-500 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Python
          </button>
          <button
            onClick={() => setFilter('writing')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              filter === 'writing'
                ? 'bg-purple-500 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Writing
          </button>
        </div>

        {/* Agent Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents.map((agent) => (
              <Link key={agent.id} href={`/agents/${agent.id}`}>
                <div className="card cursor-pointer h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{agent.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className={`badge ${agent.isActive ? 'badge-success' : 'badge-warning'}`}>
                          {agent.isActive ? 'Online' : 'Offline'}
                        </span>
                        <span className="text-sm text-gray-400">
                          ⭐ {agent.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {agent.description}
                  </p>

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

                  <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                    <div>
                      <div className="text-sm text-gray-400">Price</div>
                      <div className="text-lg font-bold">${agent.pricePerJob}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400">Jobs</div>
                      <div className="text-lg font-bold">{agent.totalJobs}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400">Success</div>
                      <div className="text-lg font-bold">
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

        {!loading && filteredAgents.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-400">No agents found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
