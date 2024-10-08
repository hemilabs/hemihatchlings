# Hemi Hatchlings Api

Hemi Hatchlings API was developed using Domain-Driven Design (DDD) principles to facilitate interaction with the Hemi network. This document provides instructions for setting up, running, and contributing to the project.

## Architecture

The API is organized into the following layers:

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

This layer contains the user interface or the API routes of the application.

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

- `RPC_URL`: The RPC (Remote Procedure Call) URL of the Hemi network.[Hemi Docs](https://github.com/hemilabs/infrastructure/blob/main/NETWORK_INFO.md).

- `PORT`: The port where the API should listen to calls.

Example of the .env file

```
RPC_URL=https://testnet.rpc.hemi.network/rpc
PORT=3000
```

## Contribution
If you want to contribute to this project and make it better, your help is very welcome.
You can find more information about how to contribute in the [`CONTRIBUTING.md`](../../CONTRIBUTING.md) file.

## License
This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.
