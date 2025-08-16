# Azure App Service Deployment Troubleshooting Guide

## 🚨 Common Deployment Errors & Solutions

### 1. SCM Container Restart Errors

**Error:** "The SCM site '...' is being restarted due to a configuration change"

**Causes:**
- Node.js version mismatch between local and Azure
- Oryx build system conflicts
- Simultaneous deployments

**Solutions:**
```bash
# A. Fix Node.js version in Azure Portal
# Go to: Configuration > General Settings
# Set Stack: Node.js
# Set Node.js version: 20 LTS (recommended)

# B. Add application settings in Azure Portal
WEBSITE_NODE_DEFAULT_VERSION=~20
SCM_DO_BUILD_DURING_DEPLOYMENT=false

# C. Wait between deployments
# Allow 2-3 minutes between deployment attempts
```

### 2. ZIP Deploy Failed Errors

**Error:** "Failed to deploy web package to App Service"

**Causes:**
- Package size too large
- Incorrect file structure in ZIP
- Missing essential files

**Solutions:**
```bash
# A. Optimize deployment package
# Remove unnecessary files before deployment:
rm -rf node_modules/.cache
rm -rf .next/cache
npm prune --production

# B. Verify package structure
# Ensure package contains:
# - .next/ folder
# - package.json
# - next.config.js
# - node_modules/ (production only)

# C. Manual deployment verification
az webapp deploy --resource-group YOUR_RG \
  --name app-002-gen10-step3-2-node-oshima2 \
  --src-path deployment.zip \
  --type zip
```

### 3. Build Process Failures

**Error:** "npm ERR! missing script: build"

**Solutions:**
```json
// Ensure package.json has correct scripts:
{
  "scripts": {
    "dev": "next dev",
    "build": "next build", 
    "start": "next start",
    "lint": "next lint"
  }
}
```

### 4. Runtime Startup Failures

**Error:** "Application failed to start"

**Diagnostic Steps:**
```bash
# A. Check Azure logs
az webapp log tail --name app-002-gen10-step3-2-node-oshima2 --resource-group YOUR_RG

# B. SSH into container (Azure Portal > SSH)
cd /home/site/wwwroot
ls -la
npm start

# C. Test locally with same Node version
nvm use 20
npm run build
npm start
```

## 🔧 Preventive Configuration

### Azure App Service Settings

#### General Settings
```
Stack: Node.js
Major Version: Node
Minor Version: 20 LTS
Startup Command: npm start
```

#### Application Settings
```
NEXT_PUBLIC_API_URL=https://app-002-gen10-step3-2-py-oshima2.azurewebsites.net
WEBSITE_NODE_DEFAULT_VERSION=~20
SCM_DO_BUILD_DURING_DEPLOYMENT=false
WEBSITE_RUN_FROM_PACKAGE=0
```

#### Path Mappings (if needed)
```
Virtual Path: /
Physical Path: site\wwwroot
```

### GitHub Actions Best Practices

#### 1. Node.js Version Consistency
```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '20.x'  # Match Azure setting
    cache: 'npm'
```

#### 2. Optimized Build Process
```yaml
- name: Install and build
  run: |
    npm ci --production=false
    npm run build
    npm prune --production
```

#### 3. Deployment Package Optimization
```yaml
- name: Create deployment package
  run: |
    mkdir deploy-package
    cp -r .next deploy-package/
    cp -r public deploy-package/ 
    cp package*.json deploy-package/
    cp next.config.js deploy-package/
    cd deploy-package && npm ci --production
    cd .. && zip -r deployment.zip deploy-package/
```

## 🔍 Monitoring & Diagnostics

### Real-time Monitoring Commands
```bash
# 1. Live log streaming
az webapp log tail --name app-002-gen10-step3-2-node-oshima2 --resource-group YOUR_RG

# 2. Check app status
az webapp show --name app-002-gen10-step3-2-node-oshima2 --resource-group YOUR_RG --query state

# 3. List recent deployments
az webapp deployment list --name app-002-gen10-step3-2-node-oshima2 --resource-group YOUR_RG

# 4. Health check
curl -I https://app-002-gen10-step3-2-node-oshima2.azurewebsites.net
```

### Log Analysis
```bash
# SSH into Azure container
cd /home/site/wwwroot

# Check Node.js version
node --version

# Check package.json scripts
cat package.json | grep -A 10 scripts

# Test startup manually
npm start
```

## 🚀 Emergency Recovery Procedures

### 1. Rollback to Previous Deployment
```bash
# Via Azure CLI
az webapp deployment list --name app-002-gen10-step3-2-node-oshima2 --resource-group YOUR_RG
az webapp deployment source config-zip --name app-002-gen10-step3-2-node-oshima2 --resource-group YOUR_RG --src PREVIOUS_PACKAGE.zip
```

### 2. Quick Fix Deployment
```bash
# Local emergency build and deploy
npm run build
zip -r emergency-deploy.zip .next package.json next.config.js public/
az webapp deploy --resource-group YOUR_RG --name app-002-gen10-step3-2-node-oshima2 --src-path emergency-deploy.zip --type zip
```

### 3. Configuration Reset
```bash
# Reset problematic app settings
az webapp config appsettings delete --name app-002-gen10-step3-2-node-oshima2 --resource-group YOUR_RG --setting-names SCM_DO_BUILD_DURING_DEPLOYMENT
az webapp config set --name app-002-gen10-step3-2-node-oshima2 --resource-group YOUR_RG --startup-file "npm start"
```

## 📋 Deployment Checklist

Before deploying, ensure:

- [ ] Node.js version matches between local (20.x) and Azure (20 LTS)
- [ ] `npm run build` succeeds locally
- [ ] `package.json` has correct `start` script
- [ ] No static web app configs present (staticwebapp.config.json removed)
- [ ] API URL correctly configured for backend communication
- [ ] GitHub secrets properly configured (AZURE_WEBAPP_PUBLISH_PROFILE)
- [ ] Previous deployment completed (wait 2-3 minutes between deployments)

## 🆘 Contact & Support

If issues persist:
1. Check Azure Service Health: https://status.azure.com/
2. Review Azure App Service documentation
3. Contact Azure support through Azure Portal
4. Check GitHub Actions logs for build failures