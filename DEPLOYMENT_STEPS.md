# Deployment Steps - Quick Guide

## Step 1: Commit and Push Your Changes

```bash
# Add all changes
git add .

# Commit with a message
git commit -m "Add WakaTime API integration and cleanup codebase"

# Push to GitHub
git push origin master
```

## Step 2: Set Up Vercel (if not already done)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Import your repository: `therohitpatwa/Portfolio`
4. Vercel will auto-detect Astro settings
5. Click **"Deploy"**

## Step 3: Add Environment Variable in Vercel

**This is the most important step for the API to work!**

1. In your Vercel project dashboard, go to **Settings** → **Environment Variables**
2. Click **"Add New"**
3. Fill in:
   - **Key**: `PUBLIC_WAKATIME_API_KEY`
   - **Value**: Your WakaTime API key (get it from https://wakatime.com/settings/api-key)
   - **Environment**: Select all three (Production, Preview, Development)
4. Click **"Save"**

## Step 4: Redeploy

1. Go to **Deployments** tab
2. Click the **three dots (⋯)** on your latest deployment
3. Select **"Redeploy"**
4. Wait for deployment to complete

## Step 5: Verify

Visit your deployed site and check:
- ✅ The "Online in IntelliJ" status appears
- ✅ It shows your coding activity time
- ✅ Everything works as expected

---

## Alternative: Deploy via Vercel CLI

If you prefer command line:

```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Add environment variable
vercel env add PUBLIC_WAKATIME_API_KEY
# (Enter your API key when prompted)

# Redeploy
vercel --prod
```

---

## Troubleshooting

**API not working?**
- Check that environment variable is set in Vercel
- Make sure variable name is exactly: `PUBLIC_WAKATIME_API_KEY`
- Redeploy after adding the variable
- Check browser console for errors

**Build fails?**
- Check Vercel build logs
- Ensure all dependencies are in `package.json`
- Verify `astro.config.mjs` is correct

