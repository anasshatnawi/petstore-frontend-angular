# PetStore Angular Frontend

## Getting started

This is a frontend app made with Angular 19, composed of 3 components (Pet , Order and User). Each component is a page that has CRUD operations (create , read , update , delete) and uses an external API as a data source.

## Running the App

### Prerequisites

NodeJS ^18.19.1 || ^20.11.1 || ^22.0.0.

### Configuration

You can change the SERVER_URL api base url inside of src/lib/constans.ts .

### Source code

```bash
git clone https://gitlab.forge.berger-levrault.com/bl-drit/bl.drit.experiments/software.engineering/ecodesing/stage-of-louay-2024/use-cases/petstore-frontend.git
```

### Running the App locally

#### Install npm dependencies.

```bash
npm install
```

#### Start the dev server.

```bash
npm run dev
```

Navigate to `http://localhost:4200/`.

## Building the App

```bash
npm run build
```

This will compile your project and store the build artifacts in the `dist/` directory. index.html is the entry point of the app.
