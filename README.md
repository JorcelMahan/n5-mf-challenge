# N5 Challenge - Microfrontend Architecture

This project demonstrates a microfrontend architecture using Vite and Module Federation with React applications.

## Architecture

- **Host Application** (`/host`): Main shell application that orchestrates remote modules
- **Remote1** (`/remote1`): Rick & Morty characters microfrontend
- **Remote2** (`/remote2`): Harry Potter characters microfrontend

## Features

- 🌐 Microfrontend architecture with Module Federation
- 🎨 Styled Components for styling
- 🌍 Internationalization (i18n) support
- 🧪 Unit testing with Vitest
- 📱 Responsive design
- 🔄 Hot reload and live updates

## Prerequisites

- Node.js 18+
- npm 9+

## Quick Start

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd n5-challenge
   ```

2. **Install dependencies for all applications**

   ```bash
   npm run install:all
   ```

3. **Start all applications in development mode**

   ```bash
   npm run dev
   ```

4. **Access the applications**
   - Host: http://localhost:5000
   - Remote1 (Rick & Morty): http://localhost:5001
   - Remote2 (Harry Potter): http://localhost:5002

## Development

### Individual Application Commands

**Host Application:**

```bash
cd host
npm run dev    # Start development server
npm run build  # Build for production
npm run test   # Run tests
npm run lint   # Run linting
```

**Remote1 (Rick & Morty):**

```bash
cd remote1
npm run dev    # Start development server
npm run build  # Build for production
npm run test   # Run tests
npm run lint   # Run linting
```

**Remote2 (Harry Potter):**

```bash
cd remote2
npm run dev    # Start development server
npm run build  # Build for production
npm run lint   # Run linting
```

### Root Level Commands

```bash
npm run dev         # Start all applications
npm run build       # Build all applications
npm run test        # Run all tests
npm run lint        # Lint all applications
npm run install:all # Install dependencies for all apps
```

## Project Structure

```
n5-challenge/
├── host/                  # Host application
│   ├── src/
│   │   ├── components/
│   │   ├── utils/i18/
│   │   └── ...
│   └── package.json
├── remote1/              # Rick & Morty microfrontend
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   └── package.json
├── remote2/              # Harry Potter microfrontend
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   └── package.json
├── package.json          # Root package.json
└── README.md
```

## Technologies Used

- **React 19** - UI Framework
- **Vite** - Build tool and dev server
- **Module Federation** - Microfrontend architecture
- **Styled Components** - CSS-in-JS styling
- **React i18next** - Internationalization
- **Vitest** - Testing framework
- **Testing Library** - Testing utilities

## Testing

Each application has its own test suite. Run tests individually or all at once:

```bash
# Run all tests
npm run test

# Run tests for specific app
npm run test:host
npm run test:remote1
```

## Deployment

1. **Build all applications:**

   ```bash
   npm run build
   ```

2. **Deploy each application to your hosting platform**
   - Each app in the `dist` folder can be deployed independently
   - Ensure the host application can access remote applications via their deployed URLs

## License

This project is for demonstration purposes.
