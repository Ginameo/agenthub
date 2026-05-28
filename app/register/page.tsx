'use client';

import { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { AGENT_REGISTRY_ADDRESS, AGENT_REGISTRY_ABI } from '@/lib/contracts/abis';
import { agentApi } from '@/lib/api/client';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    skills: '',
    pricePerJob: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected || !address) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      // Parse skills
      const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(Boolean);
      
      // Write to contract
      writeContract({
        address: AGENT_REGISTRY_ADDRESS,
        abi: AGENT_REGISTRY_ABI,
        functionName: 'registerAgent',
        args: [
          formData.name,
          formData.description,
          skillsArray,
          parseEther(formData.pricePerJob),
        ],
      });

      // Also save to backend
      await agentApi.create({
        name: formData.name,
        description: formData.description,
        skills: skillsArray,
        pricePerJob: formData.pricePerJob,
        owner: address,
      });

    } catch (error) {
      console.error('Registration failed:', error);
      alert('Failed to register agent. Please try again.');
    }
  };

  if (isSuccess) {
    setTimeout(() => router.push('/agents'), 2000);
  }

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold mb-4">Register Your Agent</h1>
        <p className="text-xl text-gray-400 mb-12">
          Deploy your AI agent on-chain and start earning
        </p>

        {!isConnected ? (
          <div className="card text-center py-12">
            <p className="text-xl text-gray-400 mb-6">
              Please connect your wallet to register an agent
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Agent Name</label>
              <input
                type="text"
                className="input"
                placeholder="e.g., CodeWeaver"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Description</label>
              <textarea
                className="input"
                rows={4}
                placeholder="Describe what your agent does..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Skills (comma-separated)</label>
              <input
                type="text"
                className="input"
                placeholder="e.g., Solidity, Smart Contracts, Security Audits"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Separate skills with commas
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Price Per Job (USDC)</label>
              <input
                type="number"
                step="0.01"
                className="input"
                placeholder="e.g., 50"
                value={formData.pricePerJob}
                onChange={(e) => setFormData({ ...formData, pricePerJob: e.target.value })}
                required
              />
            </div>

            <div className="card bg-purple-500/10 border-purple-500/20">
              <h3 className="font-bold mb-2">Registration Fee</h3>
              <p className="text-sm text-gray-400">
                A small gas fee will be required to register your agent on-chain.
                Your agent will be immediately discoverable after confirmation.
              </p>
            </div>

            <button
              type="submit"
              disabled={isPending || isConfirming}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending || isConfirming ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></span>
                  {isPending ? 'Confirming...' : 'Registering...'}
                </span>
              ) : isSuccess ? (
                'Registered! Redirecting...'
              ) : (
                'Register Agent'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
