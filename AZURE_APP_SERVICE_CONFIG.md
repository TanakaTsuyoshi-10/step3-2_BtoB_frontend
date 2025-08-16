# Azure App Service Configuration Guide

## 🎯 Target App Service
**Name:** app-002-gen10-step3-2-node-oshima2  
**Type:** Next.js Frontend  
**Stack:** Node.js 20 LTS

## ⚙️ Required Azure Portal Configurations

### 1. General Settings
Navigate to: **Azure Portal > App Services > app-002-gen10-step3-2-node-oshima2 > Configuration > General settings**

```
Platform settings:
├── Stack: Node.js
├── Major version: Node
├── Minor version: 20 LTS
├── Startup command: npm start
├── Platform: Linux
└── Always On: On (recommended)

HTTP version: 2.0
Managed pipeline version: Integrated
FTP state: FTPS Only
```

### 2. Application Settings
Navigate to: **Configuration > Application settings**

| Name | Value | Required |
|------|-------|----------|
| `NEXT_PUBLIC_API_URL` | `https://app-002-gen10-step3-2-py-oshima2.azurewebsites.net` | ✅ |
| `WEBSITE_NODE_DEFAULT_VERSION` | `~20` | ✅ |
| `SCM_DO_BUILD_DURING_DEPLOYMENT` | `false` | ✅ |
| `WEBSITE_RUN_FROM_PACKAGE` | `0` | ✅ |
| `NODE_ENV` | `production` | ✅ |

**Additional settings for troubleshooting:**
| Name | Value | Optional |
|------|-------|----------|
| `WEBSITE_HTTPLOGGING_RETENTION_DAYS` | `7` | 🔧 |
| `WEBSITE_TIME_ZONE` | `Tokyo Standard Time` | 🔧 |

### 3. Path Mappings
Navigate to: **Configuration > Path mappings**

| Virtual path | Physical path | Type |
|-------------|---------------|------|
| `/` | `site\wwwroot` | Application |

### 4. TLS/SSL Settings
Navigate to: **TLS/SSL settings**

```
HTTPS Only: Enabled
Minimum TLS Version: 1.2
```

## 🔒 Security & Networking

### CORS Configuration
**Important:** CORS is handled by the backend (FastAPI), not the frontend.

Ensure the **backend** has these CORS origins configured:
```python
# Backend CORS settings should include:
BACKEND_CORS_ORIGINS=[
    "https://app-002-gen10-step3-2-node-oshima2.azurewebsites.net",
    "http://localhost:3000"  # for development
]
```

### Outbound IP Addresses
```bash
# Get frontend outbound IPs (for backend firewall if needed)
az webapp show --resource-group YOUR_RG --name app-002-gen10-step3-2-node-oshima2 --query possibleOutboundIpAddresses --output tsv
```

## 📊 Monitoring & Logging

### Application Insights (Recommended)
1. Create Application Insights resource
2. Add to App Service:
   ```
   APPINSIGHTS_INSTRUMENTATIONKEY=your-key-here
   APPLICATIONINSIGHTS_CONNECTION_STRING=your-connection-string
   ```

### Log Stream
Enable real-time log monitoring:
```bash
az webapp log config --resource-group YOUR_RG --name app-002-gen10-step3-2-node-oshima2 --application-logging filesystem --level information
```

## 🛠️ Deployment Configuration

### GitHub Actions Integration
1. **Download Publish Profile:**
   - Azure Portal > App Service > Get publish profile
   
2. **GitHub Secrets Required:**
   ```
   AZURE_WEBAPP_PUBLISH_PROFILE: [entire .publishsettings file content]
   ```

3. **GitHub Actions Environment Variables:**
   ```yaml
   env:
     AZURE_WEBAPP_NAME: 'app-002-gen10-step3-2-node-oshima2'
     NODE_VERSION: '20.x'
   ```

### Manual Deployment Commands
```bash
# Option 1: ZIP deployment
az webapp deploy --resource-group YOUR_RG --name app-002-gen10-step3-2-node-oshima2 --src-path deployment.zip --type zip

# Option 2: Git deployment (if configured)
git remote add azure https://[username]@app-002-gen10-step3-2-node-oshima2.scm.azurewebsites.net/app-002-gen10-step3-2-node-oshima2.git
git push azure main
```

## 🔍 Health Checks & Verification

### Application Health Check
Create a simple health endpoint (optional):
```javascript
// pages/api/health.js or app/api/health/route.js
export async function GET() {
  return Response.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version 
  });
}
```

### Verification URLs
```
🌐 Application: https://app-002-gen10-step3-2-node-oshima2.azurewebsites.net
🔧 Kudu/SCM: https://app-002-gen10-step3-2-node-oshima2.scm.azurewebsites.net
📋 Health: https://app-002-gen10-step3-2-node-oshima2.azurewebsites.net/api/health
```

### Verification Commands
```bash
# 1. App status check
curl -I https://app-002-gen10-step3-2-node-oshima2.azurewebsites.net

# 2. Backend connectivity test (from frontend)
curl -I https://app-002-gen10-step3-2-py-oshima2.azurewebsites.net

# 3. Live logs
az webapp log tail --resource-group YOUR_RG --name app-002-gen10-step3-2-node-oshima2
```

## 🚨 Troubleshooting Common Issues

### Issue 1: App won't start
```bash
# Check in Azure Portal > SSH
cd /home/site/wwwroot
ls -la
node --version
npm start
```

### Issue 2: Backend connection failed
1. Verify `NEXT_PUBLIC_API_URL` setting
2. Check backend CORS configuration
3. Test backend URL independently

### Issue 3: Build failures
```bash
# Verify package.json scripts
{
  "scripts": {
    "start": "next start",
    "build": "next build"
  }
}
```

## 📋 Configuration Checklist

Apply these settings in Azure Portal:

**General Settings:**
- [ ] Stack: Node.js
- [ ] Version: 20 LTS  
- [ ] Startup command: npm start
- [ ] Always On: Enabled

**Application Settings:**
- [ ] NEXT_PUBLIC_API_URL configured
- [ ] WEBSITE_NODE_DEFAULT_VERSION=~20
- [ ] SCM_DO_BUILD_DURING_DEPLOYMENT=false
- [ ] NODE_ENV=production

**Security:**
- [ ] HTTPS Only: Enabled
- [ ] TLS 1.2 minimum

**Backend Integration:**
- [ ] Backend CORS includes frontend URL
- [ ] Backend health check accessible
- [ ] API endpoints returning data

**GitHub Actions:**
- [ ] Publish profile secret configured
- [ ] Workflow runs successfully
- [ ] Health checks passing

## 🔄 Configuration Scripts

### Quick Setup Script
```bash
#!/bin/bash
RG="YOUR_RESOURCE_GROUP"
APP="app-002-gen10-step3-2-node-oshima2"

# Set application settings
az webapp config appsettings set --resource-group $RG --name $APP --settings \
  NEXT_PUBLIC_API_URL="https://app-002-gen10-step3-2-py-oshima2.azurewebsites.net" \
  WEBSITE_NODE_DEFAULT_VERSION="~20" \
  SCM_DO_BUILD_DURING_DEPLOYMENT="false" \
  NODE_ENV="production"

# Set startup command
az webapp config set --resource-group $RG --name $APP --startup-file "npm start"

# Enable HTTPS only
az webapp update --resource-group $RG --name $APP --https-only true

echo "✅ Configuration applied successfully"
```