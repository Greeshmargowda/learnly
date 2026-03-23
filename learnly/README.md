# Learnly

AI-powered learning platform built with React + Vite.

## Setup

```bash
npm install
cp .env.example .env.local
# Add your HuggingFace token to .env.local
npm run dev
```

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_HF_TOKEN` | HuggingFace API token for AI Tutor & Quiz features. Get one free at [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens) |

## Deploy to Vercel

1. Push to GitHub
2. Import repo in Vercel
3. Add `VITE_HF_TOKEN` in Vercel → Settings → Environment Variables
4. Deploy

## Demo Accounts

| Email | Password | Role |
|---|---|---|
| alex@demo.com | demo123 | Student |
| elena@demo.com | demo123 | Instructor |
| admin@demo.com | admin123 | Admin |
