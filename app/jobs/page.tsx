'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAccount, useReadContract } from 'wagmi';
import { JOB_ESCROW_ADDRESS, JOB_ESCROW_ABI } from '@/lib/contracts/abis';

interface Job {
  jobId: bigint;
  agentId: bigint;
  client: string;
  description: string;
  payment: bigint;
  status: number;
  createdAt: bigint;
}

const statusLabels = ['Created', 'In Progress', 'Completed', 'Disputed', 'Cancelled'];
const statusColors = ['badge-warning', 'badge', 'badge-success', 'badge-warning', 'badge'];

export default function JobsPage() {
  const { address, isConnected } = useAccount();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filter, setFilter] = useState('all');

  // Read job count
  const { data: jobCount } = useReadContract({
    address: JOB_ESCROW_ADDRESS,
    abi: JOB_ESCROW_ABI,
    functionName: 'jobCount',
  });

  // Load jobs (simplified - in production, use events or backend)
  useEffect(() => {
    if (jobCount) {
      // Mock data for now - in production, fetch from events or backend
      const mockJobs: Job[] = [];
      setJobs(mockJobs);
    }
  }, [jobCount]);

  const filteredJobs = jobs.filter(job => {
    if (filter === 'all') return true;
    if (filter === 'my-jobs' && isConnected) return job.client.toLowerCase() === address?.toLowerCase();
    if (filter === 'active') return job.status === 0 || job.status === 1;
    if (filter === 'completed') return job.status === 2;
    return true;
  });

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h1 className="text-5xl font-bold mb-4">Job Board</h1>
            <p className="text-xl text-gray-400">
              Browse available jobs or track your submissions
            </p>
          </div>
          <Link href="/agents" className="btn-primary mt-6 md:mt-0">
            Hire an Agent
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
            All Jobs
          </button>
          {isConnected && (
            <button
              onClick={() => setFilter('my-jobs')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                filter === 'my-jobs'
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              My Jobs
            </button>
          )}
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              filter === 'active'
                ? 'bg-purple-500 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              filter === 'completed'
                ? 'bg-purple-500 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Completed
          </button>
        </div>

        {/* Jobs Grid */}
        {!isConnected ? (
          <div className="card text-center py-20">
            <h3 className="text-2xl font-bold mb-4">Connect Your Wallet</h3>
            <p className="text-gray-400 mb-6">
              Connect your wallet to view and manage jobs
            </p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="card text-center py-20">
            <h3 className="text-2xl font-bold mb-4">No Jobs Yet</h3>
            <p className="text-gray-400 mb-6">
              Be the first to create a job!
            </p>
            <Link href="/agents" className="btn-primary inline-block">
              Browse Agents
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div key={job.jobId.toString()} className="card">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Job #{job.jobId.toString()}</div>
                    <span className={`badge ${statusColors[job.status]}`}>
                      {statusLabels[job.status]}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400">Payment</div>
                    <div className="text-lg font-bold">{(Number(job.payment) / 1e18).toFixed(4)} ETH</div>
                  </div>
                </div>

                <p className="text-gray-300 mb-4 line-clamp-3">{job.description}</p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                  <div>
                    <div className="text-sm text-gray-400">Agent</div>
                    <Link href={`/agents/${job.agentId}`} className="text-purple-400 hover:text-purple-300">
                      #{job.agentId.toString()}
                    </Link>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400">Client</div>
                    <div className="font-mono text-xs">{job.client.slice(0, 6)}...{job.client.slice(-4)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
