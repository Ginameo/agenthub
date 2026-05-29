'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAccount, useReadContract } from 'wagmi';
import { AGENT_REGISTRY_ADDRESS, AGENT_REGISTRY_ABI, JOB_ESCROW_ADDRESS, JOB_ESCROW_ABI } from '@/lib/contracts/abis';

export default function DashboardPage() {
  const { address, isConnected } = useAccount();

  // Read user's agents
  const { data: agentIds } = useReadContract({
    address: AGENT_REGISTRY_ADDRESS,
    abi: AGENT_REGISTRY_ABI,
    functionName: 'getAgentsByOwner',
    args: address ? [address] : undefined,
  });

  // Read user's jobs
  const { data: jobIds } = useReadContract({
    address: JOB_ESCROW_ADDRESS,
    abi: JOB_ESCROW_ABI,
    functionName: 'getJobsByClient',
    args: address ? [address] : undefined,
  });

  if (!isConnected) {
    return (
      <div className="min-h-screen pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Dashboard</h1>
          <div className="card py-20">
            <h3 className="text-2xl font-bold mb-4">Connect Your Wallet</h3>
            <p className="text-gray-400 mb-6">
              Connect your wallet to view your dashboard
            </p>
          </div>
        </div>
      </div>
    );
  }

  const myAgents = agentIds as bigint[] || [];
  const myJobs = jobIds as bigint[] || [];

  return (
    <div className="min-h-screen pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-4">Dashboard</h1>
        <p className="text-xl text-gray-400 mb-12">
          Manage your agents and track your jobs
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="card text-center">
            <div className="text-5xl font-bold mb-2">{myAgents.length}</div>
            <div className="text-gray-400 text-sm uppercase tracking-wider">My Agents</div>
          </div>
          <div className="card text-center">
            <div className="text-5xl font-bold mb-2">{myJobs.length}</div>
            <div className="text-gray-400 text-sm uppercase tracking-wider">Jobs Created</div>
          </div>
          <div className="card text-center">
            <div className="text-5xl font-bold mb-2">0.00</div>
            <div className="text-gray-400 text-sm uppercase tracking-wider">Total Earned (ETH)</div>
          </div>
        </div>

        {/* My Agents */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">My Agents</h2>
            <Link href="/register" className="btn-primary">
              Register New Agent
            </Link>
          </div>

          {myAgents.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-gray-400 mb-4">You haven't registered any agents yet</p>
              <Link href="/register" className="btn-primary inline-block">
                Register Your First Agent
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myAgents.map((agentId) => (
                <AgentCard key={agentId.toString()} agentId={agentId} />
              ))}
            </div>
          )}
        </div>

        {/* My Jobs */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">My Jobs</h2>
            <Link href="/agents" className="btn-secondary">
              Create New Job
            </Link>
          </div>

          {myJobs.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-gray-400 mb-4">You haven't created any jobs yet</p>
              <Link href="/agents" className="btn-primary inline-block">
                Browse Agents
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myJobs.map((jobId) => (
                <JobCard key={jobId.toString()} jobId={jobId} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AgentCard({ agentId }: { agentId: bigint }) {
  const { data: agent } = useReadContract({
    address: AGENT_REGISTRY_ADDRESS,
    abi: AGENT_REGISTRY_ABI,
    functionName: 'getAgent',
    args: [agentId],
  });

  if (!agent) return null;

  const { owner, name, description, skills, pricePerJob, isActive, totalJobs, successfulJobs } = agent as any;

  return (
    <Link href={`/agents/${agentId}`}>
      <div className="card cursor-pointer h-full">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold">{name}</h3>
          <span className={`badge ${isActive ? 'badge-success' : 'badge-warning'}`}>
            {isActive ? 'Online' : 'Offline'}
          </span>
        </div>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
          <div>
            <div className="text-sm text-gray-400">Price</div>
            <div className="font-bold">{(Number(pricePerJob) / 1e18).toFixed(4)} ETH</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">Jobs</div>
            <div className="font-bold">{totalJobs.toString()}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function JobCard({ jobId }: { jobId: bigint }) {
  const { data: job } = useReadContract({
    address: JOB_ESCROW_ADDRESS,
    abi: JOB_ESCROW_ABI,
    functionName: 'getJob',
    args: [jobId],
  });

  if (!job) return null;

  const { agentId, description, payment, status } = job as any;
  const statusLabels = ['Created', 'In Progress', 'Completed', 'Disputed', 'Cancelled'];
  const statusColors = ['badge-warning', 'badge', 'badge-success', 'badge-warning', 'badge'];

  return (
    <div className="card">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-sm text-gray-400 mb-1">Job #{jobId.toString()}</div>
          <span className={`badge ${statusColors[status]}`}>
            {statusLabels[status]}
          </span>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400">Payment</div>
          <div className="font-bold">{(Number(payment) / 1e18).toFixed(4)} ETH</div>
        </div>
      </div>
      <p className="text-gray-300 text-sm mb-4 line-clamp-2">{description}</p>
      <div className="pt-4 border-t border-gray-800">
        <div className="text-sm text-gray-400">Agent</div>
        <Link href={`/agents/${agentId}`} className="text-purple-400 hover:text-purple-300">
          #{agentId.toString()}
        </Link>
      </div>
    </div>
  );
}
