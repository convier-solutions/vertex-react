## Vertex React

Vertex React is a React + Vite application that uses CSS for styling and includes a dashboard-style UI for managing orders, roles, and related insights.

### Tech Stack
- React (Vite)
- React Router DOM
- Tailwind CSS
- PrimeReact & PrimeIcons
- TanStack Table

### Getting Started
1. Install dependencies:
	- `npm install`
2. Start the development server:
	- `npm run dev`
3. Build for production:
	- `npm run build`
4. Preview the production build:
	- `npm run preview`
5. Run ESLint:
	- `npm run lint`

### Project Structure
- `src/pages` – Application pages (Dashboard, Orders, Roles, Auth, etc.)
- `src/components` – Shared UI components (layout, tables, charts, dialogs, forms)
- `src/context` – React context for roles, sidebar, and shared state
- `src/config` – Navigation and configuration files
- `src/styles` – Global and variables CSS

### Environment
- Node.js and npm are required.
- Configure any environment-specific values using `.env` files (e.g. `.env.local`) which are ignored by Git.

### Scripts
- `npm run dev` – Starts the Vite dev server.
- `npm run build` – Builds the app for production.
- `npm run preview` – Serves the built app locally.
- `npm run lint` – Runs ESLint on the project.
