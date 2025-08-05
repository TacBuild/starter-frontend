## TAC Starter Frontend

A Next.js starter template for building hybrid dApps that connect TON and EVM ecosystems using the TAC SDK.

> This repository is part of the full starter application provided through the create-tac-app CLI tool.

### Features

- Next.js 15 with App Router
- Tailwind and Shadcn UI components
- TON Connect wallet integration
- TAC SDK for cross-chain messaging

### Prerequisites

- Node.js 18.17.0 or higher
- A TON wallet (Tonkeeper or TON Space recommended)
- Some testnet TON tokens for testing

### Installation

```
# Clone this repository (or use create-tac-app)
git clone https://github.com/tacbuild/starter-frontend.git my-tac-app
cd my-tac-app

# Install dependencies
npm install
```

### Configuration

This starter is pre-configured to work with example contracts deployed on the TAC testnet. The contract addresses are defined in lib/constants.ts:

```tsx
export const CONTRACT_ADDRESS = {
  // TAC Proxy Contract Address for the Simple Message Contract
  MESSAGE_PROXY: "0xe3E475d7F7EA690875C65C30856547fcE3E28F20",
} as const;
```

If you've deployed your own contracts, update these addresses accordingly.

### Development Server

```
npm run dev
```

Open http://localhost:3000 to see your application.
