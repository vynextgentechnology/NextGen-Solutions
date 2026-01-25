# NextGen Tech - IT Services Website

## Overview

This is a professional IT services and web development agency website built as a full-stack TypeScript application. The platform showcases services, handles contact form submissions, and processes website development orders. It features a modern, responsive design with smooth animations and a clean blue-and-white professional theme.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state and caching
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: shadcn/ui component library (New York style) with Radix UI primitives
- **Animations**: Framer Motion for scroll reveals and transitions
- **Forms**: React Hook Form with Zod validation via @hookform/resolvers
- **Smooth Scrolling**: react-scroll for single-page navigation

### Backend Architecture
- **Runtime**: Node.js with Express 5
- **Language**: TypeScript compiled with tsx
- **API Pattern**: REST endpoints with Zod schema validation
- **Build Tool**: esbuild for server bundling, Vite for client

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` contains all database table definitions
- **Validation**: drizzle-zod generates Zod schemas from database tables
- **Migrations**: Drizzle Kit manages schema migrations in `/migrations`

### Project Structure
```
├── client/           # React frontend application
│   └── src/
│       ├── components/   # UI components including shadcn/ui
│       ├── hooks/        # Custom React hooks
│       ├── lib/          # Utilities and query client
│       └── pages/        # Route page components
├── server/           # Express backend
│   ├── routes.ts     # API endpoint definitions
│   ├── storage.ts    # Database access layer
│   └── db.ts         # Database connection
├── shared/           # Shared code between client/server
│   ├── schema.ts     # Drizzle database schema
│   └── routes.ts     # API contract definitions with Zod
└── migrations/       # Database migrations
```

### API Design
The API uses a typed contract pattern defined in `shared/routes.ts`:
- Each endpoint specifies method, path, input schema, and response schemas
- Frontend and backend share the same validation schemas
- Two main endpoints: `/api/contact` for inquiries, `/api/orders` for website orders

### Database Schema
Two main tables:
1. `contact_messages` - Stores contact form submissions (name, email, phone, message)
2. `website_orders` - Stores website development orders (business details, website requirements)

### Build Configuration
- Development: Vite dev server with HMR proxied through Express
- Production: Vite builds to `dist/public`, esbuild bundles server to `dist/index.cjs`
- Path aliases configured: `@/` for client source, `@shared/` for shared code

## External Dependencies

### Database
- **PostgreSQL**: Primary database accessed via `DATABASE_URL` environment variable
- **Connection**: pg (node-postgres) connection pool

### Third-Party Services
- **Google Fonts**: Outfit and Plus Jakarta Sans font families loaded via CDN

### Key npm Packages
- **UI Framework**: Full shadcn/ui component set with Radix UI primitives
- **Animation**: framer-motion for motion effects
- **Icons**: lucide-react and react-icons
- **Date Handling**: date-fns
- **Session Storage**: connect-pg-simple for PostgreSQL session storage (available but not currently used)

### Replit Integrations
- `@replit/vite-plugin-runtime-error-modal` for error display
- `@replit/vite-plugin-cartographer` and `@replit/vite-plugin-dev-banner` for development features