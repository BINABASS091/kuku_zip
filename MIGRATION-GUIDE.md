# API Migration Guide: Old → New Unified Service

## Overview
This guide helps you migrate from the inconsistent API files to the new unified API service.

---

## 🔄 Key Changes

### 1. **Base URL Structure**
```typescript
// ❌ OLD (File 1)
const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';
// Endpoints: /token/, /users/, /farmers/

// ❌ OLD (File 2)
const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';
// Endpoints: /accounts/token/, /accounts/users/

// ✅ NEW (Unified)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1';
// Endpoints: /accounts/token/, /accounts/users/ (with module prefixes)
```

### 2. **Token Refresh Endpoint**
```typescript
// ❌ OLD (File 1)
await axios.post('http://127.0.0.1:8000/api/token/refresh/', { refresh: refreshToken });

// ✅ NEW (Unified)
await axios.post(`${API_BASE_URL}/accounts/token/refresh/`, { refresh: refreshToken });
```

### 3. **API Method Naming**
```typescript
// ❌ OLD (File 1)
userAPI.list()
userAPI.update()
userAPI.delete()

// ❌ OLD (File 2)
usersAPI.getAll()
usersAPI.getById()

// ✅ NEW (Unified - Consistent)
usersAPI.list()        // List all
usersAPI.retrieve()    // Get single
usersAPI.create()      // Create new
usersAPI.update()      // Update existing
usersAPI.delete()      // Delete
```

---

## 📝 Endpoint Mapping Changes

### Authentication
| Old Endpoint (File 1) | Old Endpoint (File 2) | New Endpoint (Unified) |
|-----------------------|-----------------------|------------------------|
| `/token/` | `/accounts/token/` | `/accounts/token/` ✅ |
| `/token/refresh/` | `/accounts/token/refresh/` | `/accounts/token/refresh/` ✅ |
| `/users/me/` | `/accounts/me/` | `/accounts/me/` ✅ |
| N/A | `/accounts/token/blacklist/` | `/accounts/token/blacklist/` ✅ |

### Users
| Old Endpoint (File 1) | Old Endpoint (File 2) | New Endpoint (Unified) |
|-----------------------|-----------------------|------------------------|
| `/users/` | `/accounts/users/` | `/accounts/users/` ✅ |
| `/users/{id}/` | `/accounts/users/{id}/` | `/accounts/users/{id}/` ✅ |

### Farmers
| Old Endpoint (File 1) | Old Endpoint (File 2) | New Endpoint (Unified) |
|-----------------------|-----------------------|------------------------|
| `/farmers/` | `/accounts/farmers/` | `/accounts/farmers/` ✅ |
| `/farmers/{id}/` | `/accounts/farmers/{id}/` | `/accounts/farmers/{id}/` ✅ |
| `/farmers/my_farm/` | N/A | `/accounts/farmers/my_farm/` ✅ |

### Farms
| Old Endpoint (File 1) | Old Endpoint (File 2) | New Endpoint (Unified) |
|-----------------------|-----------------------|------------------------|
| `/farms/` | `/farms/farms/` | `/farms/farms/` ✅ |
| `/farms/{id}/` | `/farms/farms/{id}/` | `/farms/farms/{id}/` ✅ |

### Devices
| Old Endpoint (File 1) | Old Endpoint (File 2) | New Endpoint (Unified) |
|-----------------------|-----------------------|------------------------|
| `/devices/` | `/farms/devices/` | `/farms/devices/` ✅ |
| `/devices/{id}/` | `/farms/devices/{id}/` | `/farms/devices/{id}/` ✅ |
| `/devices/?farm={id}` | `/farms/devices/?farm={id}` | `/farms/devices/?farm={id}` ✅ |

### Batches
| Old Endpoint (File 1) | Old Endpoint (File 2) | New Endpoint (Unified) |
|-----------------------|-----------------------|------------------------|
| `/batches/` | `/batches/batches/` | `/batches/batches/` ✅ |
| `/batches/{id}/` | `/batches/batches/{id}/` | `/batches/batches/{id}/` ✅ |
| N/A | `/batches/batches/?farmID={id}` | `/batches/batches/?farmID={id}` ✅ |

### Breeds
| Old Endpoint (File 1) | Old Endpoint (File 2) | New Endpoint (Unified) |
|-----------------------|-----------------------|------------------------|
| `/breeds/` | `/breeds/breeds/` | `/breeds/breeds/` ✅ |
| `/breed-types/` | `/breeds/breed-types/` | `/breeds/breed-types/` ✅ |
| `/breed-activities/` | `/breeds/breed-activities/` | `/breeds/breed-activities/` ✅ |
| `/activity-types/` | `/breeds/activity-types/` | `/breeds/activity-types/` ✅ |

### Sensors
| Old Endpoint (File 1) | Old Endpoint (File 2) | New Endpoint (Unified) |
|-----------------------|-----------------------|------------------------|
| `/readings/` | `/sensors/readings/` | `/sensors/readings/` ✅ |
| `/sensor-types/` | `/sensors/sensor-types/` | `/sensors/sensor-types/` ✅ |

---

## 🔧 Code Migration Examples

### Example 1: Authentication
```typescript
// ❌ OLD
import { authAPI } from './api';

const login = async () => {
  const response = await authAPI.login({ username, password });
  // Token refresh uses wrong endpoint
};

// ✅ NEW
import { authAPI } from './api-service-unified';

const login = async () => {
  const response = await authAPI.login({ username, password });
  // Token refresh uses correct /accounts/token/refresh/
};
```

### Example 2: Fetching Users
```typescript
// ❌ OLD (File 1)
import { userAPI } from './api-old';
const users = await userAPI.list();

// ❌ OLD (File 2)
import { usersAPI } from './api-old2';
const users = await usersAPI.getAll();

// ✅ NEW (Unified)
import { usersAPI } from './api-service-unified';
const users = await usersAPI.list();
```

### Example 3: Fetching Farms
```typescript
// ❌ OLD (File 1)
import { farmAPI } from './api-old';
const farms = await farmAPI.list();

// ❌ OLD (File 2)
import { farmsAPI } from './api-old2';
const farms = await farmsAPI.getAll();

// ✅ NEW (Unified)
import { farmsAPI } from './api-service-unified';
const farms = await farmsAPI.list();
```

### Example 4: Fetching Batches by Farm
```typescript
// ❌ OLD (File 1)
import { batchAPI } from './api-old';
const batches = await batchAPI.list(); // No farm filter

// ❌ OLD (File 2)
import { batchesAPI } from './api-old2';
const batches = await batchesAPI.getByFarm(farmId);

// ✅ NEW (Unified)
import { batchesAPI } from './api-service-unified';
const batches = await batchesAPI.getByFarm(farmId);
// OR
const batches = await batchesAPI.list({ farmID: farmId });
```

### Example 5: Dashboard Stats
```typescript
// ❌ OLD (File 1)
import { dashboardAPI } from './api-old';
const stats = await dashboardAPI.getStats();

// ❌ OLD (File 2)
import { dashboardAPI } from './api-old2';
const stats = await dashboardAPI.getStats(); // Different implementation

// ✅ NEW (Unified)
import { dashboardAPI } from './api-service-unified';

// For Admin
const adminStats = await dashboardAPI.getAdminStats();

// For Farmer
const farmerStats = await dashboardAPI.getFarmerStats(farmId);
```

---

## 📦 Import Statement Changes

### Replace All Imports
```typescript
// ❌ OLD
import {
  authAPI,
  userAPI,
  farmerAPI,
  farmAPI
} from './services/api';

// ✅ NEW
import {
  authAPI,
  usersAPI,      // Note: plural
  farmersAPI,    // Note: plural
  farmsAPI       // Note: plural
} from './services/api-service-unified';
```

---

## 🆕 New APIs Available

The unified service includes these NEW APIs not in old files:

### Knowledge Base APIs
```typescript
import {
  patientHealthsAPI,
  recommendationsAPI,
  exceptionDiseasesAPI,
  anomaliesAPI,
  medicationsAPI,
} from './api-service-unified';
```

### Extended Breed APIs
```typescript
import {
  conditionTypesAPI,
  breedConditionsAPI,
  foodTypesAPI,
  breedFeedingsAPI,
  breedGrowthsAPI,
} from './api-service-unified';
```

### Activity Schedules API
```typescript
import { activitySchedulesAPI } from './api-service-unified';

// Get schedules for a batch
const schedules = await activitySchedulesAPI.getByBatch(batchId);
```

### Subscription APIs
```typescript
import {
  subscriptionTypesAPI,
  farmerSubscriptionsAPI,
  resourcesAPI,
} from './api-service-unified';
```

---

## ✅ Migration Checklist

### Step 1: Replace Import Statements
- [ ] Find all files importing from old API files
- [ ] Replace with imports from `api-service-unified`
- [ ] Update API object names (singular → plural where needed)

### Step 2: Update Method Calls
- [ ] Replace `.getAll()` with `.list()`
- [ ] Replace `.getById(id)` with `.retrieve(id)`
- [ ] Keep `.create()`, `.update()`, `.delete()` as-is

### Step 3: Update Endpoint-Specific Calls
- [ ] Update `farmAPI` → `farmsAPI`
- [ ] Update `userAPI` → `usersAPI`
- [ ] Update `farmerAPI` → `farmersAPI`
- [ ] Update `batchAPI` → `batchesAPI`

### Step 4: Update Dashboard Calls
- [ ] Replace `dashboardAPI.getStats()` with:
  - `dashboardAPI.getAdminStats()` for Admin
  - `dashboardAPI.getFarmerStats(farmId)` for Farmer

### Step 5: Add New Features
- [ ] Implement Activity Schedules in Farmer section
- [ ] Implement Knowledge Base in Admin section
- [ ] Implement Subscription management in Admin section

### Step 6: Test Everything
- [ ] Test login/logout
- [ ] Test token refresh
- [ ] Test all CRUD operations
- [ ] Test filtering (by farm, by batch, etc.)
- [ ] Test error handling

---

## 🚨 Common Pitfalls

### 1. **Wrong Module Prefix**
```typescript
// ❌ WRONG
await api.get('/users/');

// ✅ CORRECT
await api.get('/accounts/users/');
```

### 2. **Inconsistent Method Names**
```typescript
// ❌ WRONG
await usersAPI.getAll();

// ✅ CORRECT
await usersAPI.list();
```

### 3. **Missing Farm ID in Farmer Sections**
```typescript
// ❌ WRONG (Returns all batches, not just farmer's)
const batches = await batchesAPI.list();

// ✅ CORRECT (Returns only farmer's batches)
const batches = await batchesAPI.getByFarm(currentFarmId);
```

### 4. **Hardcoded Base URL**
```typescript
// ❌ WRONG
const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', ...);

// ✅ CORRECT
const response = await api.post('/accounts/token/refresh/', ...);
```

---

## 📞 Need Help?

If you encounter issues during migration:

1. Check the endpoint exists in `API-ENDPOINT-MAPPING.md`
2. Verify the backend is running and accessible
3. Check browser console for CORS errors
4. Verify access tokens are being sent correctly
5. Check backend logs for API errors

---

## 🎯 Next Steps After Migration

1. **Remove old API files** to avoid confusion
2. **Update environment variables** with `VITE_API_BASE_URL`
3. **Test all user flows** for both Admin and Farmer roles
4. **Update documentation** to reflect new API structure
5. **Train team members** on new API patterns
