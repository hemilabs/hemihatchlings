# Hemi Hatchlings
Hemi Hatchlings offers an immersive introduction to the [Hemi Network's](https://hemi.xyz) approach to scaling the Ethereum and Bitcoin networks, merging elemental lore with blockchain finality principles.

This document provides instructions on how to set up, run, and contribute to the project.

## The Lore

Kick off your journey by selecting an egg (transaction) endowed with elemental power:

1. 🥚 Choose Your Elemental Egg

🔥 Fire
💧 Water
🌍 Earth

This choice sets the stage for your journey…

2. 🐣 Ethereum's Role: The Journey of Growing from Hatchling Into an Adolescent

As soon as you select your egg, the magic is set in motion (a transaction is created), and your elemental egg instantly transforms into a baby hatchling. It must prepare to travel into the mystical forest (the Hemi network).

As your hatchling continues, it is guided towards the celestial sanctuary (Ethereum). Here, the legendary Forest Guardians (Ethereum validators), who have proven their worth and commitment by offering a part of their magic (staking their ETH), watch over the hatchling. Their role is to keep it safe and ensure everything runs smoothly. They rely on the integrity of the wise sage's preparations, assuming that the hatchlings meet all necessary criteria unless proven otherwise during a challenge period (a story for another time).

In the enchanting forest, Ethereum's finality ensures that the transformation of your hatchling into an adolescent is significant. Just as guardians protect the forest, Ethereum's validators secure the network, guaranteeing every hatchling's growth is an important moment recorded for all time.

3. 🐥 Bitcoin's Role: The Hatchling's Transition to Adulthood

As our adolescent grows, it embarks on a quest beyond the magical forest (the Ethereum network) and into the vast mountains (the Bitcoin network). Here, the terrain is governed by ancient miners (miners) who delve deep into the mountain's heart, extracting magical crystals (solving cryptographic puzzles) to forge the path ahead, one step (block) at a time.

The adolescent ventures through these mountains, seeking the blessings of the ancient miners. Each blessing (block confirmation) is like a rite of passage, strengthening the adolescent and preparing it for the final transformation. The journey is arduous, and many blessings are needed for it to mature into an adult fully.

With their vigilant oversight, Ethereum's guardians ensure that every hatchling becoming an adolescent is recorded with permanence. Then, Bitcoin's ancient miners extend and secure this protection, forging a path of growth and transformation celebrated across both lands (networks).

Together, Ethereum's proof-of-stake mechanism and Bitcoin's proof-of-work consensus act as twin pillars of strength, ensuring that from the moment of adolescence to the ascent into adulthood, every milestone is engraved on-chain.

## Folder Structure
The project is organized into the following folders:

- `apps`: Contains the API and the Web application.
- `packages`: Contains the components shared between the apps.
- `infrastucture`: Contains the necessary files to deploy the project.

## Architecture
This project is a monorepo composed of two applications: the API and the Web application and it is managed by [Turborepo](https://turbo.build/repo/docs).

Both the API and the Web application follow the Domain-Driven Design (DDD) principles. You can find more information about the architecture in the `README.md` file of each project.

## Getting Started

### Prerequisites

- Node.js

### Installation

1. Clone the repository:

```bash
git clone git@github.com:hemilabs/hemihatchlings.git
```

2. Open the project folder:

```bash
cd hemihatchlings
```

3. Install the dependencies:

```bash
npm install
```

4. Build the project:

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

## Deployment
We have two environments: `stage` and `production`.
The project is automatically deployed using GitHub Actions. 

### Stage
The `stage` environment is automatically deployed when a Commit is pushed to the `main` branch.

### Production
The `production` environment is automatically deployed when a new tag is created. The tag must follow the pattern `v*.*.*`. For example, `v1.0.0`.

## Contributing
If you want to contribute to this project and make it better, your help is very welcome.
You can find more information about how to contribute in the [`CONTRIBUTING.md`](https://github.com/hemilabs/.github/blob/main/CONTRIBUTING.md) file.

## License
This project is licensed under the MIT License - see the [`LICENSE`](./LICENSE) file for details.
