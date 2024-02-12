# Frontend Developer Challenge: Bookstore

This project is a web application that works as an online bookstore. Users can browse a list of available books, view detailed information about each book, and make purchases.

## Demo

You can see the live demo [here](https://cirbook-challenge.netlify.app/).

## Figma Prototype

You can see the Figma prototype [here](https://www.figma.com/file/ctK4GfWiA3fU7c16BRjDqu/Untitled?type=design&node-id=89%3A83&mode=design&t=TRPNYE3Y530Cg2w0-1)

## Technologies

- Vue 3 + TypeScript
- Pinia
- Vitest
- Tailwind
- Eslint
- Prettier

## Code Structure

In this project, the code is organized into the following directories:

- Components
  - Atoms
  - Layouts
  - Molecules
  - Organisms
- Entities
- Router
- Services
- Stores
- Tests
- Views

## Additional Features:

Caching system that saves the last fetch of the books.

## Testing and Deployment

### Testing

Unit testing with Vitest.

### Deployment

Frontend: Netlify.
Backend: AWS Lambda + Beanstalk.
Load balancer and CloudFront.

## Customize configuration

clone the repository and run the following commands:

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

```sh
npm run build
npm run test:e2e
```
