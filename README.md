# NFT DApp with thirdweb and Next.js

This project is a starter template to build an on-chain [Next.js](https://nextjs.org/) using [thirdweb](https://thirdweb.com/) . It allows users to connect their wallets, view NFT metadata, and mint NFTs.

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Run Locally](#run-locally)
- [Functionality](#functionality)
- [Resources](#resources)
- [Need Help?](#need-help)

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file:

- `NEXT_PUBLIC_TEMPLATE_CLIENT_ID`: Your thirdweb client ID.

To learn how to create a client ID, refer to the [client documentation](https://portal.thirdweb.com/typescript/v5/client).

## Run Locally

Install dependencies:

```bash
yarn
```

Start the development server:

```bash
yarn dev
```

Create a production build:

```bash
yarn build
```

Preview the production build:

```bash
yarn start
```

## Functionality

### Connect Wallet

Users can connect their wallets using the `ConnectButton` component from thirdweb. This allows them to interact with the blockchain and perform transactions.

### View NFT Metadata

The app fetches and displays metadata for the NFTs, including images, names, and descriptions, using the `MediaRenderer` component.

### Mint NFTs

Users can mint new NFTs by specifying the quantity and clicking the mint button. The app handles the transaction and updates the UI upon successful minting.

### Display Total Supply

The app shows the total number of NFTs claimed and the total supply available.

## Screenshoots
