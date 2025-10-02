# API Endpoint Mapping for Admin & Farmer Sections

## Base URL
```
http://127.0.0.1:8000/api/v1
```

---

## 🔐 AUTHENTICATION ENDPOINTS

### For Both Admin & Farmer
| Endpoint | Method | Purpose | Used By |
|----------|--------|---------|---------|
| `/accounts/token/` | POST | Login (get access & refresh tokens) | Login Page |
| `/accounts/token/refresh/` | POST | Refresh access token | Auto (interceptor) |
| `/accounts/token/blacklist/` | POST | Logout (blacklist refresh token) | Logout Action |
| `/accounts/me/` | GET | Get current user details | Profile, Dashboard |

**Request Body (Login):**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "access": "jwt_token",
  "refresh": "jwt_token",
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@example.com",
    "role": "Admin" | "Farmer"
  }
}
```

---

## 👥 USER MANAGEMENT (ADMIN ONLY)

### Users API
| Endpoint | Method | Purpose | Section |
|----------|--------|---------|---------|
| `/accounts/users/` | GET | List all users | Admin > Users |
| `/accounts/users/` | POST | Create new user | Admin > Users > Add |
| `/accounts/users/{id}/` | GET | Get user details | Admin > Users > View |
| `/accounts/users/{id}/` | PATCH | Update user | Admin > Users > Edit |
| `/accounts/users/{id}/` | DELETE | Delete user | Admin > Users > Delete |

### Farmers API
| Endpoint | Method | Purpose | Section |
|----------|--------|---------|---------|
| `/accounts/farmers/` | GET | List all farmers | Admin > Farmers |
| `/accounts/farmers/` | POST | Create farmer account | Admin > Farmers > Add |
| `/accounts/farmers/{id}/` | GET | Get farmer details | Admin > Farmers > View |
| `/accounts/farmers/{id}/` | PATCH | Update farmer | Admin > Farmers > Edit |
| `/accounts/farmers/{id}/` | DELETE | Delete farmer | Admin > Farmers > Delete |
| `/accounts/farmers/my_farm/` | GET | Get current farmer's farm | Farmer > Dashboard |

---

## 🏡 FARM MANAGEMENT

### Farms API (Admin & Farmer)
| Endpoint | Method | Purpose | Section |
|----------|--------|---------|---------|
| `/farms/farms/` | GET | List all farms | Admin > Farms, Farmer > Farms |
| `/farms/farms/` | POST | Create new farm | Admin > Farms > Add |
| `/farms/farms/{id}/` | GET | Get farm details | Admin/Farmer > Farm Details |
| `/farms/farms/{id}/` | PATCH | Update farm | Admin/Farmer > Farm Edit |
| `/farms/farms/{id}/` | DELETE | Delete farm | Admin > Farms > Delete |

**Query Params:**
- `?farmer={farmer_id}` - Filter farms by farmer

### Devices API (Admin & Farmer)
| Endpoint | Method | Purpose | Section |
|----------|--------|---------|---------|
| `/farms/devices/` | GET | List all devices | Admin > Devices, Farmer > Devices |
| `/farms/devices/` | POST | Add new device | Admin/Farmer > Devices > Add |
| `/farms/devices/{id}/` | GET | Get device details | Device Details |
| `/farms/devices/{id}/` | PATCH | Update device | Device Edit |
| `/farms/devices/{id}/` | DELETE | Delete device | Device Delete |
| `/farms/devices/?farm={id}` | GET | Get devices by farm | Farm > Devices Tab |

---

## 🐔 BATCH MANAGEMENT

### Batches API (Admin & Farmer)
| Endpoint | Method | Purpose | Section |
|----------|--------|---------|---------|
| `/batches/batches/` | GET | List all batches | Admin > Batches, Farmer > Batches |
| `/batches/batches/` | POST | Create new batch | Farmer > Batches > Add |
| `/batches/batches/{id}/` | GET | Get batch details | Batch Details |
| `/batches/batches/{id}/` | PATCH | Update batch | Batch Edit |
| `/batches/batches/{id}/` | DELETE | Delete batch | Batch Delete |
| `/batches/batches/?farmID={id}` | GET | Get batches by farm | Farmer > My Batches |

### Activity Schedules API (Farmer)
| Endpoint | Method | Purpose | Section |
|----------|--------|---------|---------|
| `/batches/activity-schedules/` | GET | List activity schedules | Farmer > Schedule |
| `/batches/activity-schedules/` | POST | Create schedule | Farmer > Schedule > Add |
| `/batches/activity-schedules/{id}/` | GET | Get schedule details | Schedule Details |
| `/batches/activity-schedules/{id}/` | PATCH | Update schedule | Schedule Edit |
| `/batches/activity-schedules/{id}/` | DELETE | Delete schedule | Schedule Delete |
| `/batches/activity-schedules/?batchID={id}` | GET | Get schedules by batch | Batch > Schedule Tab |

---

## 🦃 BREED MANAGEMENT (ADMIN MASTER DATA)

### Breed Types API
| Endpoint | Method | Purpose | Section |
|----------|--------|---------|---------|
| `/breeds/breed-types/` | GET | List breed types | Admin > Master Data > Breed Types |
| `/breeds/breed-types/` | POST | Create breed type | Admin > Master Data > Add |
| `/breeds/breed-types/{id}/` | PATCH | Update breed type | Edit |
| `/breeds/breed-types/{id}/` | DELETE | Delete breed type | Delete |

### Breeds API
| Endpoint | Method | Purpose | Section |
|----------|--------|---------|---------|
| `/breeds/breeds/` | GET | List breeds | Admin > Master Data > Breeds |
| `/breeds/breeds/` | POST | Create breed | Admin > Master Data > Add |
| `/breeds/breeds/{id}/` | PATCH | Update breed | Edit |
| `/breeds/breeds/{id}/` | DELETE | Delete breed | Delete |

### Activity Types API
| Endpoint | Method | Purpose | Section |
|----------|--------|---------|---------|
| `/breeds/activity-types/` | GET | List activity types | Admin > Master Data > Activity Types |
| `/breeds/activity-types/` | POST | Create activity type | Add |
| `/breeds/activity-types/{id}/` | PATCH | Update | Edit |
| `/breeds/activity-types/{id}/` | DELETE | Delete | Delete |

### Breed Activities API
| Endpoint | Method | Purpose | Section |
|----------|--------|---------|---------|
| `/breeds/breed-activities/` | GET | List breed activities | Admin > Master Data > Activities |
| `/breeds/breed-activities/` | POST | Create activity | Add |
| `/breeds/breed-activities/{id}/` | PATCH | Update activity | Edit |
| `/breeds/breed-activities/{id}/` | DELETE | Delete activity | Delete |

### Condition Types API
| Endpoint | Method | Purpose | Section |
|----------|--------|---------|---------|
| `/breeds/condition-types/` | GET | List condition types | Admin > Master Data > Conditions |
| `/breeds/condition-types/` | POST | Create condition type | Add |
| `/breeds/condition-types/{id}/` | PATCH | Update | Edit |
| `/breeds/condition-types/{id}/` | DELETE | Delete | Delete |

### Breed Conditions API
| Endpoint | Method | Purpose | Section |
|----------|--------|---------|---------|
| `/breeds/breed-conditions/` | GET | List breed conditions | Admin > Master Data |
| `/breeds/breed-conditions/` | POST | Create condition | Add |
| `/breeds/breed-conditions/{id}/` | PATCH | Update condition | Edit |
| `/breeds/breed-conditions/{id}/` | DELETE | Delete condition | Delete |

### Food Types API
| Endpoint | Method | Purpose | Section |
|----------|--------|---------|---------|
| `/breeds/food-types/` | GET | List food types | Admin > Master Data > Food |
| `/breeds/food-types/` | POST | Create food type | Add |
| `/breeds/food-types/{id}/` | PATCH | Update | Edit |
| `/breeds/food-types/{id}/` | DELETE | Delete | Delete |

### Breed Feedings API
| Endpoint | Method | Purpose | Section |
|----------|--------|---------|---------|
| `/breeds/breed-feedings/` | GET | List breed feeding schedules | Admin > Master Data |
| `/breeds/breed-feedings/` | POST | Create feeding schedule | Add |
| `/breeds/breed-feedings/{id}/` | PATCH | Update | Edit |
| `/breeds/breed-feedings/{id}/` | DELETE | Delete | Delete |

### Breed Growths API
| Endpoint | Method | Purpose | Section |
|----------|--------|---------|---------|
| `/breeds/breed-growths/` | GET | List breed growth data | Admin > Master Data |
| `/breeds/breed-growths/` | POST | Create growth record | Add |
| `/breeds/breed-growths/{id}/` | PATCH | Update | Edit |
| `/breeds/breed-growths/{id}/` | DELETE | Delete | Delete |

---

## 📚 KNOWLEDGE BASE (ADMIN MASTER DATA)

### Patient Healths API
| Endpoint | Method | Purpose | Section |
|----------|--------|---------|---------|
| `/knowledge/patient-healths/` | GET | List health records | Admin > Knowledge > Health |
| `/knowledge/patient-healths/` | POST | Create health record | Add |
| `/knowledge/patient-healths/{id}/` | PATCH | Update | Edit |
| `/knowledge/patient-healths/{id}/` | DELETE | Delete | Delete |

### Recommendations API
| Endpoint | Method | Purpose | Section |
|----------|--------|---------|---------|
| `/knowledge/recommendations/` | GET | List recommendations | Admin > Knowledge |
| `/knowledge/recommendations/` | POST | Create recommendation | Add |
| `/knowledge/recommendations/{id}/` | PATCH | Update | Edit |
| `/knowledge/recommendations/{id}/` | DELETE | Delete | Delete |

### Exception Diseases API
| Endpoint | Method | Purpose | Section |
|----------|--------|---------|---------|
| `/knowledge/exception-diseases/` | GET | List diseases | Admin > Knowledge > Diseases |
| `/knowledge/exception-diseases/` | POST | Create disease record | Add |
| `/knowledge/exception-diseases/{id}/` | PATCH | Update | Edit |
| `/knowledge/exception-diseases/{id}/` | DELETE | Delete | Delete |

### Anomalies API
| Endpoint | Method | Purpose | Section |
|----------|--------|---------|---------|
| `/knowledge/anomalies/` | GET | List anomalies | Admin > Knowledge |
| `/knowledge/anomalies/` | POST | Create anomaly | Add |
| `/knowledge/anomalies/{id}/` | PATCH | Update | Edit |
| `/knowledge/anomalies/{id}/` | DELETE | Delete | Delete |

### Medications API
| Endpoint | Method | Purpose | Section |
|----------|--------|---------|---------|
| `/knowledge/medications/` | GET | List medications | Admin > Knowledge > Meds |
| `/knowledge/medications/` | POST | Create medication | Add |
| `/knowledge/medications/{id}/` | PATCH | Update | Edit |
| `/knowledge/medications/{id}/` | DELETE | Delete | Delete |

---

## 📡 SENSOR & READINGS (FARMER)

### Sensor Types API
| Endpoint | Method | Purpose | Section |
|----------|--------|---------|---------|
| `/sensors/sensor-types/` | GET | List sensor types | Admin > Master Data |
| `/sensors/sensor-types/` | POST | Create sensor type | Add |
| `/sensors/sensor-types/{id}/` | PATCH | Update | Edit |
| `/sensors/sensor-types/{id}/` | DELETE | Delete | Delete |

### Readings API
| Endpoint | Method | Purpose | Section |
|----------|--------|---------|---------|
| `/sensors/readings/` | GET | List sensor readings | Farmer > Sensors, Dashboard |
| `/sensors/readings/` | POST | Create reading (IoT) | Device Auto-Post |
| `/sensors/readings/{id}/` | GET | Get reading details | Reading Details |
| `/sensors/readings/{id}/` | PATCH | Update reading | Edit |
| `/sensors/readings/{id}/` | DELETE | Delete reading | Delete |
| `/sensors/readings/?deviceID={id}` | GET | Get readings by device | Device > Readings Tab |
| `/sensors/readings/?deviceID={id}&latest=true` | GET | Get latest reading | Dashboard Widget |

---

## 💳 SUBSCRIPTIONS (ADMIN)

### Subscription Types API
| Endpoint | Method | Purpose | Section |
|----------|--------|---------|---------|
| `/subscriptions/subscription-types/` | GET | List subscription plans | Admin > Subscriptions > Plans |
| `/subscriptions/subscription-types/` | POST | Create plan | Add Plan |
| `/subscriptions/subscription-types/{id}/` | PATCH | Update plan | Edit |
| `/subscriptions/subscription-types/{id}/` | DELETE | Delete plan | Delete |

### Farmer Subscriptions API
| Endpoint | Method | Purpose | Section |
|----------|--------|---------|---------|
| `/subscriptions/farmer-subscriptions/` | GET | List all subscriptions | Admin > Subscriptions |
| `/subscriptions/farmer-subscriptions/` | POST | Create subscription | Admin > Assign |
| `/subscriptions/farmer-subscriptions/{id}/` | PATCH | Update subscription | Edit |
| `/subscriptions/farmer-subscriptions/{id}/` | DELETE | Cancel subscription | Delete |
| `/subscriptions/stats/` | GET | Get subscription stats | Admin > Dashboard |

### Resources API
| Endpoint | Method | Purpose | Section |
|----------|--------|---------|---------|
| `/subscriptions/resources/` | GET | List resources | Admin > Resources |
| `/subscriptions/resources/` | POST | Create resource | Add |
| `/subscriptions/resources/{id}/` | PATCH | Update resource | Edit |
| `/subscriptions/resources/{id}/` | DELETE | Delete resource | Delete |

---

## 📊 DASHBOARD APIS

### Admin Dashboard
**Aggregated Stats:**
```typescript
dashboardAPI.getAdminStats()
```

Returns:
```json
{
  "totalUsers": 45,
  "totalFarmers": 32,
  "activeFarms": 28,
  "totalDevices": 156,
  "activeBatches": 87,
  "activeSubscriptions": 25,
  "systemHealth": 95,
  "pendingAlerts": 3
}
```

### Farmer Dashboard
**Farm-Specific Stats:**
```typescript
dashboardAPI.getFarmerStats(farmId)
```

Returns:
```json
{
  "totalBatches": 5,
  "activeBatches": 3,
  "totalBirds": 5000,
  "totalDevices": 8,
  "activeDevices": 7,
  "recentReadings": [...],
  "avgTemperature": 25.4,
  "farmHealth": 92
}
```

---

## 🔔 ALERTS (MOCK - TO BE IMPLEMENTED)

| Endpoint | Method | Purpose | Section |
|----------|--------|---------|---------|
| `/alerts/` | GET | List alerts | Admin/Farmer > Alerts |
| `/alerts/{id}/mark-read/` | POST | Mark alert as read | Alert Action |
| `/alerts/{id}/` | DELETE | Delete alert | Alert Delete |

---

## 📋 API RESPONSE FORMAT

### Paginated Response
```json
{
  "count": 100,
  "next": "http://api.example.com/endpoint/?page=2",
  "previous": null,
  "results": [...]
}
```

### Error Response
```json
{
  "detail": "Error message",
  "field_errors": {
    "field_name": ["Error description"]
  }
}
```

---

## 🔑 AUTHENTICATION HEADERS

Every request (except login) must include:
```
Authorization: Bearer {access_token}
```

The axios interceptor automatically adds this header.

---

## 🎯 SECTION-SPECIFIC API USAGE

### ADMIN SECTIONS:
1. **Dashboard** - `dashboardAPI.getAdminStats()`
2. **Users** - `usersAPI.*`
3. **Farmers** - `farmersAPI.*`
4. **Farms** - `farmsAPI.*`
5. **Devices** - `devicesAPI.*`
6. **Batches** - `batchesAPI.*`
7. **Master Data** - All breed/knowledge APIs
8. **Subscriptions** - `subscriptionTypesAPI.*`, `farmerSubscriptionsAPI.*`

### FARMER SECTIONS:
1. **Dashboard** - `dashboardAPI.getFarmerStats(farmId)`
2. **My Farm** - `farmsAPI.retrieve(farmId)`
3. **Batches** - `batchesAPI.getByFarm(farmId)`
4. **Devices** - `devicesAPI.getByFarm(farmId)`
5. **Sensors** - `readingsAPI.getByDevice(deviceId)`
6. **Schedule** - `activitySchedulesAPI.getByBatch(batchId)`
7. **Profile** - `authAPI.getCurrentUser()`

---

## ✅ TESTING CHECKLIST

### Before Integration:
- [ ] Backend server running on `http://127.0.0.1:8000`
- [ ] Database migrations applied
- [ ] Test user accounts created (Admin & Farmer)
- [ ] CORS configured for frontend origin

### After Integration:
- [ ] Login/logout working for both roles
- [ ] Token refresh working automatically
- [ ] All list pages loading data
- [ ] Create operations working
- [ ] Update operations working
- [ ] Delete operations working
- [ ] Error handling displaying properly
- [ ] Loading states showing
- [ ] Empty states showing when no data
