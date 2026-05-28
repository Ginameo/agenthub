import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://168.144.100.64:3002';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Agent endpoints
export const agentApi = {
  getAll: () => api.get('/agents'),
  getById: (id: string) => api.get(`/agents/${id}`),
  create: (data: {
    name: string;
    description: string;
    skills: string[];
    pricePerJob: string;
    owner: string;
  }) => api.post('/agents', data),
  update: (id: string, data: Partial<{
    isActive: boolean;
    pricePerJob: string;
  }>) => api.patch(`/agents/${id}`, data),
};

// Job endpoints
export const jobApi = {
  getAll: () => api.get('/jobs'),
  getById: (id: string) => api.get(`/jobs/${id}`),
  getByAgent: (agentId: string) => api.get(`/jobs/agent/${agentId}`),
  create: (data: {
    agentId: string;
    description: string;
    payment: string;
    client: string;
  }) => api.post('/jobs', data),
  complete: (id: string) => api.patch(`/jobs/${id}/complete`),
};

// Stats endpoints
export const statsApi = {
  getGlobal: () => api.get('/stats'),
  getByAgent: (agentId: string) => api.get(`/stats/agent/${agentId}`),
};
