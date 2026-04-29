# AnGi Frontend

AI-powered food recommendation app frontend.

## Tech Stack

- **Framework**: Next.js 14.2.0 (App Router)
- **Language**: TypeScript 5.4.0
- **Styling**: Tailwind CSS 3.4.0
- **Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Animation**: Framer Motion
- **State Management**: 
  - Server state: @tanstack/react-query
  - Client state: Zustand
- **Forms**: react-hook-form + Zod
- **HTTP Client**: Axios

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Environment Variables

Create `.env.local` file based on `.env.local.example`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-oauth-client-id
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-maps-api-key
NEXT_PUBLIC_ANALYTICS_ID=your-posthog-key
NEXTAUTH_SECRET=your-random-secret
```

## Project Structure

```
src/
├── app/                 # Next.js App Router
├── components/          # React components
├── lib/                 # Utilities and configurations
├── types/               # TypeScript types
└── styles/              # Global styles
```

## Documentation

See `docs/` folder for detailed documentation and `implement.md` for implementation plan.
