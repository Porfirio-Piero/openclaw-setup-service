# Deploy WaitlistPro to Vercel

## Quick Deploy

### Option 1: Vercel CLI (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
cd waitlist-pro
vercel --prod
```

### Option 2: GitHub + Vercel Integration

1. Push to GitHub:
```bash
cd waitlist-pro
git remote add origin https://github.com/YOUR_USERNAME/waitlist-pro.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com) and import your GitHub repository

3. Add environment variables in Vercel dashboard:
   - `BLOB_READ_WRITE_TOKEN` (get from Vercel Blob)

4. Deploy!

### Option 3: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/waitlist-pro)

## Environment Variables

Set these in your Vercel project settings:

| Variable | Required | Description |
|----------|----------|-------------|
| `BLOB_READ_WRITE_TOKEN` | Yes | Vercel Blob storage token |
| `BLOB_BASE_URL` | No | Custom blob base URL |

## Getting Vercel Blob Token

1. Go to [vercel.com](https://vercel.com)
2. Create a new project or select existing
3. Go to Settings → Environment Variables
4. The `BLOB_READ_WRITE_TOKEN` is automatically set when you add Vercel Blob to your project

## Post-Deployment

1. Visit your deployed URL
2. Create your first waitlist at `/dashboard/new`
3. Share your waitlist page!

## Features Ready to Use

- ✅ 5 Beautiful Templates
- ✅ Email Capture with Validation
- ✅ Referral Tracking System
- ✅ Analytics Dashboard
- ✅ CSV Export
- ✅ Custom Branding
- ✅ Free & Pro Plan Structure
