# Deployment Guide - WakaTime API Setup

## Setting up WakaTime API Key for Deployment

The portfolio uses WakaTime API to display your IntelliJ activity status. To make it work in production, you need to set up the environment variable on your hosting platform.

### For Vercel Deployment:

1. **Go to your Vercel Dashboard**
   - Navigate to your project
   - Click on **Settings** → **Environment Variables**

2. **Add Environment Variable**
   - **Name**: `PUBLIC_WAKATIME_API_KEY`
   - **Value**: Your WakaTime API key (get it from https://wakatime.com/settings/api-key)
   - **Environment**: Select all (Production, Preview, Development)

3. **Redeploy**
   - After adding the variable, go to **Deployments**
   - Click the three dots on your latest deployment → **Redeploy**

### For Local Development:

1. Create a `.env` file in the root directory:
   ```
   PUBLIC_WAKATIME_API_KEY=your_wakatime_api_key_here
   ```

2. Restart your dev server:
   ```bash
   npm run dev
   ```

### Important Notes:

- The `.env` file is already in `.gitignore` - **never commit your API key to Git**
- The `PUBLIC_` prefix is required for Astro to expose the variable to the client-side
- Your API key should start with `waka_` (WakaTime format)

### Getting Your WakaTime API Key:

1. Go to https://wakatime.com/settings/api-key
2. Copy your API key
3. Use it in the environment variable setup above

