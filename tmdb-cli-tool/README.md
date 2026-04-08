# TMDB CLI Tool

A tiny CLI to show top 5 TMDB movies by category

## Setup

```bash
npm install
npm link
```

Create a `.env` file:

```env
TMDB_API_KEY=tmdb_bearer_token
```

## Run

```bash
tmdb-app --type playing
```

Or

```bash
node movies-process-argv.js --type playing
```

Types: `playing`, `popular`, `top`, `upcoming`.