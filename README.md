# Pulseboard

Pulseboard is an editorial operations dashboard built from scratch with Vue 3. It uses the public [DummyJSON](https://dummyjson.com/) service through Axios and demonstrates authentication, protected and lazy-loaded routes, dynamic routing, loading/error states, and complete CRUD operations.

## Demo credentials

- Email: `editor@pulseboard.dev`
- Password: `pulse2026`

## Pages

- Overview dashboard (`/`)
- Story library with create, edit, and delete (`/stories`)
- Dynamic story details (`/stories/:id`)
- Contributor directory (`/people`)
- About / project documentation (`/about`)
- Custom 404 page (any unknown route)
- Sign-in (`/login`)

## Setup

```bash
npm install
npm run dev
```

For a production build:

```bash
npm run build
npm run preview
```

## API behavior

DummyJSON simulates POST, PUT, and DELETE requests but does not permanently mutate its server data. Pulseboard applies successful API responses to local state so CRUD changes are visible for the current session.
