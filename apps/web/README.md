# Hemi Hatchlings Web App

This is the web application of the Hemi Hatchlings project. It is a front-end application that allows users to visualize activities on the [Hemi network](https://hemi.xyz).

## Architecture

The Web App is organized into the following layers:

- Application
- Domain
- Infrastructure
- Presentation

## Application

This layer contains the use cases of the application. It is the entry point for the business logic and it is responsible for coordinating the domain layer and the infrastructure layer (always using dependency injection).

## Domain

This layer contains the business logic of the application. It is the core of the application and it is responsible for the entities and value objects.

## Infrastructure

This layer contains the implementation of the interfaces/repositories. It is responsible for the connections with database and/or other external services.

## Presentation

This layer contains the user interface implemented with React. The components are responsible for the style and the interface,displaying its state and redirecting the user actions.

## Getting Started

### Prerequisites

- Node.js

### Installation

1. Install the dependencies:

```bash
npm install
```

2. Build the project:

```bash
npm run build
```

### Running the Project

1. On the root folder, run the following command:

```bash
npm run dev
```

2. Open your browser and access the URL provided in the terminal. Normally, it is `http://localhost:5173/`.

### Running the Tests

To run the tests, you can use the following command:

```bash
npm run test
```

### Lint the Code

```bash
npm run lint
```

### Test the Code Coverage

```bash
npm run test:cov
```

### Environment Variables

The environment variables are defined in the `.env` file. The following variables are used:

- `VITE_API_URL`: The URL of the Hemi Hatchlings API.
- `VITE_CHAIN_ID`: The Hemi Network's Chain ID.
- `VITE_CHAIN_NAME`: The Hemi Network's Chain Name.
- `VITE_CHAIN_NETWORK`: The Hemi Network's Chain Network.
- `VITE_CHAIN_RPC_URL`: The Hemi Network's RPC URL.
- `VITE_CHAIN_BLOCK_EXPLORER_URL`: The Hemi Network's URL of the block explorer.
- `VITE_CHAIN_CURRENCY_NAME`: The Hemi Network's Currency Name.
- `VITE_CHAIN_CURRENCY_SYMBOL`: The Hemi Network's Currency Symbol.
- `VITE_CHAIN_CURRENCY_DECIMALS`: The Hemi Network's Currency Decimals.
- `VITE_FIRE_SMART_CONTRACT_ADDRESS`: The Hemi Network's Smart Contract Address for Fire Element.
- `VITE_WATER_SMART_CONTRACT_ADDRESS`: The Hemi Network's Smart Contract Address for Water Element.
- `VITE_EARTH_SMART_CONTRACT_ADDRESS`: The Hemi Network's Smart Contract Address for Earth Element.
- `VITE_FIRE_SOLD_OUT`: Boolean value to set if the Fire Element NFT collection is sold out.
- `VITE_WATER_SOLD_OUT`: Boolean value to set if the Water Element NFT collection is sold out.
- `VITE_EARTH_SOLD_OUT`: Boolean value to set if the Earth Element NFT collection is sold out.

```env
VITE_API_URL=http://hemihatchlings-api-service:3000

# Hemi Testnet Network 
VITE_CHAIN_ID='0xB56C7'
VITE_CHAIN_NAME='Hemi Testnet'
VITE_CHAIN_NETWORK='testnet'
VITE_CHAIN_RPC_URL='https://testnet.rpc.hemi.network/rpc'
VITE_CHAIN_BLOCK_EXPLORER_URL='https://testnet.explorer.hemi.network'
VITE_CHAIN_CURRENCY_NAME='thETH'
VITE_CHAIN_CURRENCY_SYMBOL='thETH'
VITE_CHAIN_CURRENCY_DECIMALS=18
VITE_FIRE_SMART_CONTRACT_ADDRESS='0xB0b76280Aa233e68cfaaafe132B1e95963c64f79'
VITE_WATER_SMART_CONTRACT_ADDRESS='0xa5C85f5d93B2cD1384A1eE9037236c44b70acB54'
VITE_EARTH_SMART_CONTRACT_ADDRESS='0xF1f4847207213177bE246306f0fC521758a5A996'
VITE_FIRE_SOLD_OUT='true'
VITE_WATER_SOLD_OUT='true'
VITE_EARTH_SOLD_OUT='true'
```

## Contribution

If you want to contribute to this project and make it better, your help is very welcome.
You can find more information about how to contribute in the [`CONTRIBUTING.md`](https://github.com/hemilabs/.github/blob/main/CONTRIBUTING.md) file.

## License

This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.
