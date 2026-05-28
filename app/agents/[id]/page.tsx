'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { AGENT_REGISTRY_ADDRESS, AGENT_REGISTRY_ABI, JOB_ESCROW_ADDRESS, JOB_ESCROW_ABI } from '@/lib/contracts/abis';

export default function AgentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const agentId = params.id as string;

  const [jobDescription, setJobDescription] = useState('');
  const [jobPayment, setJobPayment] = useState('');

  // Read agent data from contract
  const { data: agent, isLoading } = useReadContract({
    address: AGENT_REGISTRY_ADDRESS,
    abi: AGENT_REGISTRY_ABI,
    functionName: 'getAgent',
    args: [BigInt(agentId)],
  });

  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      alert('Please connect your wallet');
      return;
    }

    try {
      writeContract({
        address: JOB_ESCROW_ADDRESS,
        abi: JOB_ESCROW_ABI,
        functionName: 'createJob',
        args: [BigInt(agentId), jobDescription],
        value: parseEther(jobPayment),
      });
    } catch (error) {
      console.error('Job creation failed:', error);
      alert('Failed to create job');
    }
  };

  if (isSuccess) {
    setTimeout(() => router.push('/jobs'), 2000);
  }

  if (isLoading) {
    return (
      <div className="min-h-screen py-20 px-6 flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="min-h-screen py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Agent Not Found</h1>
          <Link href="/agents" className="btn-primary inline-block">
            Back to Agents
          </Link>
        </div>
      </div>
    );
  }

  const { owner, name, description, skills, pricePerJob, isActive, totalJobs, successfulJobs } = agent as any;
  const successRate = totalJobs > 0 ? (Number(successfulJobs) / Number(totalJobs)) * 100 : 0;

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <Link href="/agents" className="text-gray-400 hover:text-white mb-8 inline-block">
          ← Back to Agents
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Agent Info */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{name}</h1>
                  <div className="flex items-center gap-3">
                    <span className={`badge ${isActive ? 'badge-success' : 'badge-warning'}`}>
                      {isActive ? 'Online' : 'Offline'}
                    </span>
                    <span className="text-sm text-gray-400">
                      Agent #{agentId}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-gray-300 text-lg mb-6">{description}</p>

              <div className="mb-6">
                <h3 className="text-xl font-bold mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill: string, idx: number) => (
                    <span key={idx} className="badge">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-800">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Price per Job</div>
                  <div className="text-2xl font-bold">{(Number(pricePerJob) / 1e18).toFixed(4)} ETH</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Total Jobs</div>
                  <div className="text-2xl font-bold">{totalJobs.toString()}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Successful</div>
                  <div className="text-2xl font-bold">{successfulJobs.toString()}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Success Rate</div>
                  <div className="text-2xl font-bold">{successRate.toFixed(0)}%</div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-800">
                <div className="text-sm text-gray-400">Owner</div>
                <div className="font-mono text-sm mt-1">{owner}</div>
              </div>
            </div>
          </div>

          {/* Hire Form */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Hire This Agent</h2>

              {!isConnected ? (
                <div className="text-center py-8">
                  <p className="text-gray-400 mb-4">Connect your wallet to hire this agent</p>
                </div>
              ) : !isActive ? (
                <div className="text-center py-8">
                  <p className="text-gray-400">This agent is currently offline</p>
                </div>
              ) : (
                <form onSubmit={handleCreateJob} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Job Description</label>
                    <textarea
                      className="input"
                      rows={4}
                      placeholder="Describe what you need..."
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Payment (ETH)</label>
                    <input
                      type="number"
                      step="0.0001"
                      className="input"
                      placeholder={(Number(pricePerJob) / 1e18).toFixed(4)}
                      value={jobPayment}
                      onChange={(e) => setJobPayment(e.target.value)}
                      required
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Minimum: {(Number(pricePerJob) / 1e18).toFixed(4)} ETH
                    </p>
                  </div>

                  <div className="card bg-purple-500/10 border-purple-500/20">
                    <p className="text-sm text-gray-400">
                      Payment will be held in escrow until job completion. You can dispute if unsatisfied.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isPending || isConfirming}
                    className="btn-primary w-full disabled:opacity-50"
                  >
                    {isPending || isConfirming ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></span>
                        {isPending ? 'Confirming...' : 'Creating Job...'}
                      </span>
                    ) : isSuccess ? (
                      'Job Created! Redirecting...'
                    ) : (
                      'Create Job'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
