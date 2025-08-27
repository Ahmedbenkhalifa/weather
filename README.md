# Weather App

A modern, responsive weather application built with React, TypeScript, and Tailwind CSS.

## Features

- 🌤️ Real-time weather data
- 🌍 Location-based weather information
- 📱 Responsive design for all devices
- 🎨 Modern UI with Tailwind CSS
- ⚡ Built with Vite for fast development
- 🔍 Search functionality for different locations

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **State Management**: Zustand
- **Routing**: React Router
- **UI Components**: Shadcn/ui
- **Linting**: ESLint with TypeScript support

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended package manager)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Ahmedbenkhalifa/weather.git
cd weather
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint errors

## Project Structure

```
src/
├── common/           # Shared components and utilities
│   ├── components/   # Reusable UI components
│   └── layout/       # Layout components
├── hooks/           # Custom React hooks
├── pages/           # Page components
├── section/         # Section components
├── store/           # State management
└── types/           # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
