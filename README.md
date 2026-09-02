# python-utils-97

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A focused TypeScript library for cryptocurrency development. It provides reliable tools for wallet operations, transaction handling, and price data retrieval across major blockchains.

## Features

- Generate and manage HD wallets for Bitcoin, Ethereum, and Solana using BIP39 and BIP44 standards
- Sign and verify transactions with built-in support for ECDSA and Ed25519
- Fetch real-time and historical prices through an aggregated API client
- Validate addresses and convert between formats with chain-specific checksums

## Installation

```bash
npm install python-utils-97
```

## Usage

```ts
import { createWallet, signMessage, fetchPrice } from 'python-utils-97';

const wallet = createWallet('ethereum');
const signature = await signMessage(wallet.privateKey, 'Verify ownership');

const price = await fetchPrice('bitcoin', { currency: 'usd' });
console.log(price);
```

## License

MIT