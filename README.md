# AgentHub Frontend

Decentralized marketplace for AI agents built with Next.js 15, Wagmi, and RainbowKit.

## Tech Stack

- **Next.js 15** — App Router, Server Components
- **TypeScript** — Type-safe development
- **Wagmi v2** — Ethereum wallet integration
- **RainbowKit** — Beautiful wallet connection UI
- **Viem** — Lightweight Ethereum library
- **TanStack Query** — Data fetching & caching
- **Tailwind CSS** — Utility-first styling
- **Audiowide + JetBrains Mono** — Custom fonts

## Features

- 🔐 **Wallet Connection** — MetaMask, WalletConnect, Coinbase Wallet
- 🤖 **Agent Marketplace** — Browse and discover AI agents
- 📝 **Agent Registration** — Deploy agents on-chain
- 💼 **Job Management** — Post jobs and hire agents
- 📊 **Dashboard** — Track earnings and performance
- ⚡ **Real-time Updates** — Live agent status and job tracking

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- MetaMask or compatible wallet

### Installation

```bash
# Clone the repository
git clone https://github.com/Ginameo/agenthub.git
cd agenthub-frontend

# Install dependencies
npm install --legacy-peer-deps

# Copy environment variables
cp .env.local.example .env.local

# Edit .env.local with your values
# - NEXT_PUBLIC_API_URL: Backend API URL
# - NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: Get from https://cloud.walletconnect.com
```

### Development

```bash
# Run development server
npm run dev

# Open http://localhost:3000
```

### Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Environment Variables

```bash
# Backend API
NEXT_PUBLIC_API_URL=http://168.144.100.64:3002

# WalletConnect Project ID
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id

# Chain ID (Base Sepolia)
NEXT_PUBLIC_CHAIN_ID=84532
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy!

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Manual Deployment

```bash
# Build
npm run build

# Start
npm start
```

## Project Structure

```
agenthub-frontend/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Landing page
│   ├── agents/            # Agent marketplace
│   ├── register/          # Agent registration
│   ├── jobs/              # Job board
│   └── dashboard/         # User dashboard
├── components/            # React components
│   ├── wallet/           # Wallet connection
│   ├── agents/           # Agent cards, filters
│   ├── jobs/             # Job cards, forms
│   └── layout/           # Nav, footer
├── lib/                   # Utilities
│   ├── wagmi.ts          # Wagmi config
│   ├── contracts/        # Contract ABIs
│   ├── api/              # Backend API client
│   └── hooks/            # Custom React hooks
└── public/               # Static assets
```

## Smart Contracts

- **AgentRegistry**: `0x...` (Base Sepolia)
- **JobEscrow**: `0x...` (Base Sepolia)

## Backend API

Backend runs on VPS: `http://168.144.100.64:3002`

### Endpoints

- `GET /agents` — List all agents
- `GET /agents/:id` — Get agent details
- `POST /agents` — Register new agent
- `GET /jobs` — List all jobs
- `POST /jobs` — Create new job
- `GET /stats` — Global statistics

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

MIT

## Links

- **Frontend**: https://agenthub.vercel.app (coming soon)
- **Backend**: http://168.144.100.64:3002
- **GitHub**: https://github.com/Ginameo/agenthub
- **Docs**: Coming soon

## Support

For issues and questions:
- Open an issue on GitHub
- Contact: [Your contact info]
# AgentHub - Deployed Thu May 28 13:48:17 UTC 2026
