# Frontend Cleanup Report

## 現状構造マップ

### Repository Structure Analysis (2025-08-23)

#### Root Level Configuration
- **Primary package.json**: Uses Next.js 14.0.0, React 18
- **Primary next.config**: Multiple configs detected (js, mjs)
- **Build target**: Root level (src/app)
- **Start command**: node server.js (custom server)

#### Directory Structure

```
/Users/tanakatsuyoshi/Desktop/3-2/step3-2_BtoB_frontend/
├── src/app/                    # Main Next.js app router (Admin UI focused)
│   ├── admin/                  # Admin dashboard pages
│   ├── dashboard/              # Main dashboard
│   ├── mobile/                 # Mobile routes (duplicate with mobile/)
│   ├── reports/                # Reporting system
│   ├── points/                 # Points management
│   └── layout.tsx              # Root layout
├── mobile/                     # Separate mobile app structure
│   ├── app/                    # Mobile-specific pages
│   ├── package.json            # Separate config (Next.js 15.1.3, React 19)
│   └── next.config.mjs         # Mobile-specific config
├── src/components/             # Shared UI components
├── src/lib/                    # Shared libraries and API clients
└── server.js                   # Custom Express server
```

#### Issues Identified
1. **Duplicate mobile structure**: Both `src/app/mobile/` and `mobile/` exist
2. **Multiple Next.js configs**: next.config.js, next.config.mjs at root + mobile/next.config.mjs
3. **Package dependency conflicts**: Node modules installation failing
4. **Duplicate API clients**: Multiple axios/api client implementations in src/lib/

#### Admin vs Mobile Classification
**Admin UI (src/app/)**:
- `/admin/*` - Admin dashboard, products, reports, points management
- `/dashboard` - Main KPI dashboard  
- `/reports/*` - Report generation and viewing
- `/points` - Points management system
- `/incentives` - Product/incentive management
- `/devices` - Device management
- `/energy-records` - Energy data management

**Mobile UI**:
- `mobile/app/*` - Mobile-optimized interfaces
- `src/app/mobile/*` - Duplicate mobile routes (redundant)

## Initial Setup Issues
- **npm ci failed**: Package lock file out of sync with package.json
- **npm install failed**: ENOTEMPTY errors with node_modules
- **next lint failed**: Next.js not available (installation issues)

## Cleanup Actions Performed

### 1. Apps Directory Structure Creation ✅
- Created `apps/admin/` and `apps/mobile/` directories
- Moved `src/app/` contents to `apps/admin/app/`
- Moved `mobile/` contents to `apps/mobile/`
- Removed duplicate mobile routes from admin (`apps/admin/app/mobile/`)

### 2. Proxy Re-exports Generated ✅
**Auto-generated proxy re-exports in `src/app/`**:
- `src/app/admin/page.tsx` → `apps/admin/app/admin/page.tsx`
- `src/app/admin/points/page.tsx` → `apps/admin/app/admin/points/page.tsx`
- `src/app/admin/products/page.tsx` → `apps/admin/app/admin/products/page.tsx`
- `src/app/admin/reports/page.tsx` → `apps/admin/app/admin/reports/page.tsx`
- `src/app/dashboard/page.tsx` → `apps/admin/app/dashboard/page.tsx`
- `src/app/devices/page.tsx` → `apps/admin/app/devices/page.tsx`
- `src/app/energy-records/page.tsx` → `apps/admin/app/energy-records/page.tsx`
- `src/app/incentives/page.tsx` → `apps/admin/app/incentives/page.tsx`
- `src/app/layout.tsx` → `apps/admin/app/layout.tsx`
- `src/app/login/page.tsx` → `apps/admin/app/login/page.tsx`
- `src/app/page.tsx` → `apps/admin/app/page.tsx`
- `src/app/points/page.tsx` → `apps/admin/app/points/page.tsx`
- `src/app/ranking/page.tsx` → `apps/admin/app/ranking/page.tsx`
- `src/app/register/page.tsx` → `apps/admin/app/register/page.tsx`
- `src/app/reports/[id]/page.tsx` → `apps/admin/app/reports/[id]/page.tsx`
- `src/app/reports/new/page.tsx` → `apps/admin/app/reports/new/page.tsx`
- `src/app/reports/page.tsx` → `apps/admin/app/reports/page.tsx`
- `src/app/rewards/page.tsx` → `apps/admin/app/rewards/page.tsx`

**Preserved mobile proxy routes**:
- `src/app/mobile/ai-analysis/page.tsx`
- `src/app/mobile/dashboard/page.tsx`
- `src/app/mobile/login/page.tsx`
- `src/app/mobile/page.tsx`
- `src/app/mobile/points/page.tsx`
- `src/app/mobile/ranking/page.tsx`
- `src/app/mobile/upload/page.tsx`

### 3. Files/Directories Removed ✅
- **Duplicate mobile routes**: Removed `apps/admin/app/mobile/` after copying
- **Temporary scripts**: Removed `create-proxies.js`

### 4. Files/Directories Moved ✅
- **Admin components**: `src/app/` → `apps/admin/app/`
- **Mobile components**: `mobile/` → `apps/mobile/`
- **Preserved shared resources**: `src/components/`, `src/lib/`, `src/hooks/` remain at root level

### 5. Build and Lint Status ⚠️
- **npm install**: Failed due to ENOTEMPTY errors with existing node_modules
- **Build verification**: Skipped due to dependency installation issues
- **Lint verification**: Skipped (Next.js not available)

### 6. API Endpoints Test Results ⚠️
**Tested endpoints with timeout of 10 seconds**:

```
/metrics/kpi: TIMEOUT (Request timed out after 10s)
/metrics/monthly-usage: TIMEOUT (Request timed out after 10s) 
/metrics/co2-trend: TIMEOUT (Request timed out after 10s)
```

**Target URL**: `https://app-002-gen10-step3-2-py-oshima2.azurewebsites.net/api/v1`

**Status**: API endpoints are not responding (timeout). This indicates either:
- Backend service is not running
- Network connectivity issues
- Service is overloaded

### 7. Import Path Analysis ✅
**API client configurations found**:
- `src/lib/axios.ts` - Uses `NEXT_PUBLIC_API_BASE`
- `src/lib/apiClient.ts` - Uses `NEXT_PUBLIC_API_BASE_URL` with path normalization
- `src/lib/http.ts` - Simple fetch wrapper with path normalization

**No broken imports detected** as shared resources (`src/components/`, `src/lib/`) maintained at root level.

## Final Structure

```
/Users/tanakatsuyoshi/Desktop/3-2/step3-2_BtoB_frontend/
├── apps/
│   ├── admin/
│   │   └── app/          # Admin UI sources (moved from src/app/)
│   └── mobile/           # Mobile UI sources (moved from mobile/)
├── src/
│   ├── app/              # Proxy re-exports only
│   ├── components/       # Shared UI components (unchanged)
│   ├── lib/              # Shared libraries (unchanged)
│   ├── hooks/            # Shared hooks (unchanged)
│   └── types/            # Shared types (unchanged)
├── package.json          # Main config (unchanged)
├── server.js             # Custom server (unchanged)
└── next.config.*         # Build configs (unchanged)
```

## Remaining Issues & Recommendations

### 1. Dependency Installation ❌
**Issue**: npm install fails with ENOTEMPTY errors
**Solution**: Manual cleanup required:
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### 2. API Connectivity ❌  
**Issue**: All `/api/v1/metrics/*` endpoints timeout
**Recommendation**: Verify backend service status before deployment

### 3. Build Verification ⏳
**Status**: Pending dependency resolution
**Next**: Run `npm run build` after successful `npm install`

### 4. Future Improvements 💡
- Consider monorepo structure for complete admin/mobile separation
- Implement separate build pipelines for admin and mobile apps
- Add environment-specific API configurations
- Set up proper CI/CD for both apps

---
*Report completed: 2025-08-23 18:00*
*Branch: chore/cleanup-structure-safe*