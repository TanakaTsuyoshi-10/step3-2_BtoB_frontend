# DB & API Connectivity Incident Report

**Date**: 2025-08-23  
**Incident ID**: API-AUTH-2025-08-23  
**Status**: Partial Resolution - **JWT Authentication Issue Remains**  
**Priority**: High  

## Executive Summary

Initial 403 Forbidden errors in frontend dashboard were traced to API routing and authentication issues. While significant progress was made in fixing API routing and backend permissions, **JWT authentication validation continues to fail** with "Could not validate credentials" errors.

## Incident Timeline

### Initial Symptoms (User Reported)
- ✅ **Fixed**: Frontend hitting wrong API domain (`node-oshima2` instead of `py-oshima2`)
- ❌ **Ongoing**: 403 Forbidden on all `/api/v1/metrics/*` endpoints despite successful login

### Investigation Results

#### ✅ **Successfully Resolved Issues**

1. **Backend Health**: 
   - ✅ Database connection: Healthy
   - ✅ App status: Running (version 1.0.0)
   - ✅ Basic endpoints: Accessible

2. **API Routing**: 
   - ✅ Frontend now correctly targets `https://app-002-gen10-step3-2-py-oshima2.azurewebsites.net/api/v1`
   - ✅ Default API fallback implemented in `src/lib/apiClient.ts`

3. **Authentication Flow**:
   - ✅ Login endpoint: Working (`/api/v1/login/access-token`)
   - ✅ Token generation: Successful
   - ✅ Token format: Valid JWT (3 segments, correct structure)

4. **Backend Authorization Logic**:
   - ✅ Superuser permissions: Fixed for metrics access
   - ✅ Company association: Superusers can now access any company data

5. **CORS Configuration**:
   - ✅ Frontend domain properly whitelisted in `ALLOWED_ORIGINS`

#### ❌ **Remaining Critical Issue**

**JWT Token Validation Failure**:
```
Error: {"detail":"Could not validate credentials"}
Status: 403 
Endpoint: All /api/v1/metrics/* endpoints
```

**Analysis**:
- **Token Generation**: ✅ Success
- **Token Format**: ✅ Valid JWT structure  
- **Token Validation**: ❌ Fails on backend

**Probable Cause**: `SECRET_KEY` configuration inconsistency between token generation and validation

## Technical Changes Implemented

### Backend Changes (`step3-2_BtoB_backend`)

#### Branch: `fix/db-connection-cors-auth-and-redeploy` → `main`

1. **Permission System Fix** (`app/api/v1/helpers.py`)
   ```python
   async def get_user_company_id():
       # Superusers can access any company data
       if current_user.is_superuser:
           company_result = db.execute(text("SELECT id FROM companies LIMIT 1"))
           return company_result[0] if company_result else 1
   ```

2. **SECRET_KEY Configuration** (`app/core/config.py`)
   ```python
   SECRET_KEY: str = os.environ.get("SECRET_KEY", "fallback-secret-key...")
   ```

3. **Debug Endpoints** (`app/api/v1/endpoints/debug.py`)
   ```python
   @router.get("/debug/config") # Check JWT settings
   @router.get("/debug/env")    # Check environment variables
   ```

#### Commits Applied:
- `6e370a5`: fix(auth): allow superuser access to metrics without company association
- `dd5e878`: fix(config): add fallback SECRET_KEY for JWT authentication  
- `32b062c`: feat(debug): add configuration debug endpoints
- `3e0702e`: fix(config): explicit SECRET_KEY environment variable handling

### Frontend Changes (`step3-2_BtoB_frontend`)

#### Branch: `fix/api-auth-db-wire-and-redeploy`

1. **API Base URL Security** (`src/lib/apiClient.ts`)
   ```typescript
   const DEFAULT_API_BASE = "https://app-002-gen10-step3-2-py-oshima2.azurewebsites.net/api/v1";
   const apiBase = process.env.NEXT_PUBLIC_API_BASE || DEFAULT_API_BASE;
   ```

2. **Unified API Routing**: All fetch calls converted to use `apiClient` with `path()` normalization

## Current Status

### ✅ Working Components
- Database connectivity: Healthy
- Basic app functionality: Operational
- API routing: Correctly pointing to backend
- Login process: Functional (tokens generated successfully)
- CORS configuration: Proper
- Frontend build: Successful

### ❌ Critical Issue
- **JWT Authentication Validation**: FAILING
- **Metrics endpoints**: Inaccessible (403 errors)
- **Dashboard data**: Not loading

## Root Cause Analysis

### Primary Hypothesis: SECRET_KEY Environment Variable

**Evidence**:
1. Login works (token generation successful)
2. Token format is valid JWT
3. Validation fails with "Could not validate credentials"
4. Error occurs in `jwt.decode()` process (line 31-35 in `app/auth/deps.py`)

**Most Likely Causes**:
1. **Azure App Service Configuration**: SECRET_KEY environment variable not set or incorrectly configured
2. **Deployment Timing**: Changes may not be fully deployed yet
3. **Environment Override**: Azure overriding fallback values with empty/incorrect values

## Immediate Next Steps (High Priority)

### 1. Verify Azure App Service Environment Variables
```bash
# Check Azure App Service Configuration
az webapp config appsettings list --name app-002-gen10-step3-2-py-oshima2 --resource-group <resource-group>
```

### 2. Set Explicit SECRET_KEY in Azure
```bash
# Set SECRET_KEY in Azure App Service
az webapp config appsettings set --name app-002-gen10-step3-2-py-oshima2 \
  --resource-group <resource-group> \
  --settings SECRET_KEY="secure-production-secret-key-here"
```

### 3. Verify Debug Endpoints (if deployed)
```bash
# Check configuration status
curl "https://app-002-gen10-step3-2-py-oshima2.azurewebsites.net/api/v1/debug/config"
curl "https://app-002-gen10-step3-2-py-oshima2.azurewebsites.net/api/v1/debug/env"
```

### 4. Production Test Sequence
```bash
# 1. Login
TOKEN=$(curl -s -X POST "https://app-002-gen10-step3-2-py-oshima2.azurewebsites.net/api/v1/login/access-token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  --data "username=admin@example.com&password=admin123" \
  | python3 -c "import json, sys; data=json.load(sys.stdin); print(data['access_token'])")

# 2. Test metrics
for endpoint in kpi monthly-usage co2-trend; do
  curl -s -H "Authorization: Bearer $TOKEN" \
    "https://app-002-gen10-step3-2-py-oshima2.azurewebsites.net/api/v1/metrics/$endpoint"
done
```

## Success Criteria

**✅ Incident Resolved When**:
1. `curl` tests return HTTP 200 with data (not 403)
2. Frontend dashboard shows actual metrics data (not 0 values)
3. Browser DevTools Network tab shows successful API calls

**🎯 Expected Final Result**:
- Unauthenticated requests: HTTP 401 (expected)
- Authenticated requests: HTTP 200 with JSON data
- Dashboard displays: Live charts and metrics

## Prevention & Monitoring

### Immediate Monitoring
- Add health check for JWT authentication in CI/CD
- Implement proper SECRET_KEY validation on startup
- Add debug endpoints for production troubleshooting

### Long-term Prevention
- Document Azure App Service environment variable requirements
- Add automated tests for authentication flow
- Implement proper secret management (Azure Key Vault)

## Files Modified

### Backend
- `app/api/v1/helpers.py` (created)
- `app/api/v1/endpoints/metrics.py`
- `app/core/config.py`
- `app/api/v1/endpoints/debug.py` (created)

### Frontend
- `src/lib/apiClient.ts`
- `src/lib/api/metrics.ts`
- `src/lib/api/mobile.ts`
- `src/lib/api/points.ts`
- `apps/mobile/app/dashboard/page.tsx`
- `apps/mobile/lib/api/index.ts`

## Incident Resolution Status

**Current**: 🟡 **Partial Resolution** - API routing fixed, JWT validation pending  
**Next Actions**: Azure App Service SECRET_KEY configuration  
**ETA**: Should be resolvable within 1-2 hours once Azure configuration is corrected  

---

*This incident demonstrates the critical importance of environment variable configuration in production deployments and the need for comprehensive authentication testing in CI/CD pipelines.*