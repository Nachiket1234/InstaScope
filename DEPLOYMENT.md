# Deployment Guide

This guide covers different deployment options for the Instagram Influencer Profile Page application.

## 🚀 Quick Deploy Options

### Vercel (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/instagram-influencer-profile)

1. **Connect GitHub Repository**
   - Fork the repository to your GitHub account
   - Connect your GitHub account to Vercel
   - Import the repository

2. **Configure Environment Variables**
   ```
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

3. **Deploy**
   - Vercel will automatically build and deploy
   - Your app will be available at `https://your-app.vercel.app`

### Netlify
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/instagram-influencer-profile)

1. **Connect Repository**
   - Fork the repository
   - Connect to Netlify via GitHub

2. **Build Configuration**
   ```
   Build command: npm run build
   Publish directory: dist
   ```

3. **Environment Variables**
   Add the same Supabase environment variables in Netlify's dashboard

## 🏗️ Manual Deployment

### Prerequisites
- Node.js 18+
- Supabase project set up
- Domain/hosting provider (optional)

### Build for Production

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment**
   Create `.env.production` file:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Build Application**
   ```bash
   npm run build
   ```

4. **Test Production Build**
   ```bash
   npm run preview
   ```

### Static Hosting (GitHub Pages, S3, etc.)

The application builds to static files in the `dist/` directory:

```bash
npm run build
# Upload contents of dist/ folder to your static hosting provider
```

## ☁️ Backend Deployment (Supabase)

### Supabase Setup

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note your project URL and API keys

2. **Deploy Edge Functions**
   ```bash
   # Install Supabase CLI
   npm install -g supabase

   # Login to Supabase
   supabase login

   # Link to your project
   supabase link --project-ref your-project-ref

   # Deploy functions
   supabase functions deploy
   ```

3. **Configure Database**
   The application uses a key-value store pattern. The required table should be automatically created through the edge functions.

### Environment Variables

Set up the following environment variables in your deployment platform:

| Variable | Description | Required |
|----------|-------------|----------|
| `SUPABASE_URL` | Your Supabase project URL | Yes |
| `SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (backend only) | Yes |

## 🔧 Advanced Deployment Options

### Docker Deployment

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine AS builder
   
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   
   COPY . .
   RUN npm run build
   
   FROM nginx:alpine
   COPY --from=builder /app/dist /usr/share/nginx/html
   COPY nginx.conf /etc/nginx/nginx.conf
   
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. **Build and Run**
   ```bash
   docker build -t influencer-profile .
   docker run -p 3000:80 influencer-profile
   ```

### AWS Amplify

1. **Connect Repository**
   - Connect your GitHub repository to AWS Amplify

2. **Build Settings**
   ```yaml
   version: 1
   applications:
     - frontend:
         phases:
           preBuild:
             commands:
               - npm ci
           build:
             commands:
               - npm run build
         artifacts:
           baseDirectory: dist
           files:
             - '**/*'
         cache:
           paths:
             - node_modules/**/*
   ```

3. **Environment Variables**
   Add Supabase environment variables in Amplify console

## 🌐 Custom Domain Setup

### Vercel Custom Domain
1. Go to your project settings in Vercel
2. Add your custom domain
3. Configure DNS records as instructed

### Netlify Custom Domain
1. Go to Domain settings in Netlify
2. Add custom domain
3. Update DNS records at your domain provider

## 📊 Performance Optimization

### Build Optimizations
- **Code Splitting**: Automatically handled by Vite
- **Asset Optimization**: Images and assets are optimized during build
- **Tree Shaking**: Unused code is automatically removed

### Runtime Optimizations
- **CDN**: Use Vercel's or Netlify's global CDN
- **Caching**: Configure appropriate cache headers
- **Compression**: Enable gzip/brotli compression

## 🔒 Security Considerations

### Environment Variables
- Never commit API keys to version control
- Use different keys for development and production
- Rotate keys regularly

### CORS Configuration
- Ensure backend CORS settings match your domain
- Configure Supabase for your deployment domain

### HTTPS
- Always deploy with HTTPS enabled
- Most modern platforms handle this automatically

## 🚨 Troubleshooting

### Common Deployment Issues

**Build Failures**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Environment Variable Issues**
- Ensure all required variables are set
- Check variable names match exactly
- Verify Supabase keys are correct

**Supabase Connection Issues**
- Verify project URL and keys
- Check if Edge Functions are deployed
- Ensure database is accessible

**Runtime Errors**
- Check browser console for errors
- Verify API endpoints are accessible
- Test with mock data fallback

## 📞 Support

For deployment issues:
1. Check the troubleshooting section above
2. Review platform-specific documentation
3. Open an issue on GitHub with deployment details

## 🔄 Continuous Deployment

### GitHub Actions (Example)
```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

### Automated Testing Before Deployment
```yaml
name: Test and Deploy
on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run type-check
      - run: npm run build
```

This ensures your application is tested before every deployment, maintaining high quality and reliability.