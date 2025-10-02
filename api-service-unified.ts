import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/accounts/token/refresh/`, {
            refresh: refreshToken,
          });

          const { access } = response.data;
          localStorage.setItem('accessToken', access);

          originalRequest.headers.Authorization = `Bearer ${access}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export const authAPI = {
  login: async (credentials: { username: string; password: string }) => {
    const response = await api.post('/accounts/token/', credentials);
    return response.data;
  },

  logout: async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      try {
        await api.post('/accounts/token/blacklist/', { refresh: refreshToken });
      } catch (error) {
        console.error('Error blacklisting token:', error);
      }
    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },

  getCurrentUser: async () => {
    const response = await api.get('/accounts/me/');
    return response.data;
  },

  refreshToken: async (refreshToken: string) => {
    const response = await api.post('/accounts/token/refresh/', {
      refresh: refreshToken,
    });
    return response.data;
  },
};

export const usersAPI = {
  list: async (params?: any) => {
    const response = await api.get('/accounts/users/', { params });
    return response.data;
  },

  retrieve: async (id: number) => {
    const response = await api.get(`/accounts/users/${id}/`);
    return response.data;
  },

  create: async (userData: any) => {
    const response = await api.post('/accounts/users/', userData);
    return response.data;
  },

  update: async (id: number, userData: any) => {
    const response = await api.patch(`/accounts/users/${id}/`, userData);
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/accounts/users/${id}/`);
  },
};

export const farmersAPI = {
  list: async (params?: any) => {
    const response = await api.get('/accounts/farmers/', { params });
    return response.data;
  },

  retrieve: async (id: number) => {
    const response = await api.get(`/accounts/farmers/${id}/`);
    return response.data;
  },

  create: async (farmerData: any) => {
    const response = await api.post('/accounts/farmers/', farmerData);
    return response.data;
  },

  update: async (id: number, farmerData: any) => {
    const response = await api.patch(`/accounts/farmers/${id}/`, farmerData);
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/accounts/farmers/${id}/`);
  },

  getMyFarm: async () => {
    const response = await api.get('/accounts/farmers/my_farm/');
    return response.data;
  },
};

export const farmsAPI = {
  list: async (params?: any) => {
    const response = await api.get('/farms/farms/', { params });
    return response.data;
  },

  retrieve: async (id: number) => {
    const response = await api.get(`/farms/farms/${id}/`);
    return response.data;
  },

  create: async (farmData: any) => {
    const response = await api.post('/farms/farms/', farmData);
    return response.data;
  },

  update: async (id: number, farmData: any) => {
    const response = await api.patch(`/farms/farms/${id}/`, farmData);
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/farms/farms/${id}/`);
  },
};

export const devicesAPI = {
  list: async (params?: any) => {
    const response = await api.get('/farms/devices/', { params });
    return response.data;
  },

  retrieve: async (id: number) => {
    const response = await api.get(`/farms/devices/${id}/`);
    return response.data;
  },

  create: async (deviceData: any) => {
    const response = await api.post('/farms/devices/', deviceData);
    return response.data;
  },

  update: async (id: number, deviceData: any) => {
    const response = await api.patch(`/farms/devices/${id}/`, deviceData);
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/farms/devices/${id}/`);
  },

  getByFarm: async (farmId: number) => {
    const response = await api.get(`/farms/devices/?farm=${farmId}`);
    return response.data;
  },
};

export const batchesAPI = {
  list: async (params?: any) => {
    const response = await api.get('/batches/batches/', { params });
    return response.data;
  },

  retrieve: async (id: number) => {
    const response = await api.get(`/batches/batches/${id}/`);
    return response.data;
  },

  create: async (batchData: any) => {
    const response = await api.post('/batches/batches/', batchData);
    return response.data;
  },

  update: async (id: number, batchData: any) => {
    const response = await api.patch(`/batches/batches/${id}/`, batchData);
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/batches/batches/${id}/`);
  },

  getByFarm: async (farmId: number) => {
    const response = await api.get(`/batches/batches/?farmID=${farmId}`);
    return response.data;
  },
};

export const activitySchedulesAPI = {
  list: async (params?: any) => {
    const response = await api.get('/batches/activity-schedules/', { params });
    return response.data;
  },

  retrieve: async (id: number) => {
    const response = await api.get(`/batches/activity-schedules/${id}/`);
    return response.data;
  },

  create: async (scheduleData: any) => {
    const response = await api.post('/batches/activity-schedules/', scheduleData);
    return response.data;
  },

  update: async (id: number, scheduleData: any) => {
    const response = await api.patch(`/batches/activity-schedules/${id}/`, scheduleData);
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/batches/activity-schedules/${id}/`);
  },

  getByBatch: async (batchId: number) => {
    const response = await api.get(`/batches/activity-schedules/?batchID=${batchId}`);
    return response.data;
  },
};

export const breedTypesAPI = {
  list: async (params?: any) => {
    const response = await api.get('/breeds/breed-types/', { params });
    return response.data;
  },

  retrieve: async (id: number) => {
    const response = await api.get(`/breeds/breed-types/${id}/`);
    return response.data;
  },

  create: async (data: any) => {
    const response = await api.post('/breeds/breed-types/', data);
    return response.data;
  },

  update: async (id: number, data: any) => {
    const response = await api.patch(`/breeds/breed-types/${id}/`, data);
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/breeds/breed-types/${id}/`);
  },
};

export const breedsAPI = {
  list: async (params?: any) => {
    const response = await api.get('/breeds/breeds/', { params });
    return response.data;
  },

  retrieve: async (id: number) => {
    const response = await api.get(`/breeds/breeds/${id}/`);
    return response.data;
  },

  create: async (data: any) => {
    const response = await api.post('/breeds/breeds/', data);
    return response.data;
  },

  update: async (id: number, data: any) => {
    const response = await api.patch(`/breeds/breeds/${id}/`, data);
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/breeds/breeds/${id}/`);
  },
};

export const activityTypesAPI = {
  list: async (params?: any) => {
    const response = await api.get('/breeds/activity-types/', { params });
    return response.data;
  },

  retrieve: async (id: number) => {
    const response = await api.get(`/breeds/activity-types/${id}/`);
    return response.data;
  },

  create: async (data: any) => {
    const response = await api.post('/breeds/activity-types/', data);
    return response.data;
  },

  update: async (id: number, data: any) => {
    const response = await api.patch(`/breeds/activity-types/${id}/`, data);
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/breeds/activity-types/${id}/`);
  },
};

export const breedActivitiesAPI = {
  list: async (params?: any) => {
    const response = await api.get('/breeds/breed-activities/', { params });
    return response.data;
  },

  retrieve: async (id: number) => {
    const response = await api.get(`/breeds/breed-activities/${id}/`);
    return response.data;
  },

  create: async (data: any) => {
    const response = await api.post('/breeds/breed-activities/', data);
    return response.data;
  },

  update: async (id: number, data: any) => {
    const response = await api.patch(`/breeds/breed-activities/${id}/`, data);
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/breeds/breed-activities/${id}/`);
  },
};

export const conditionTypesAPI = {
  list: async (params?: any) => {
    const response = await api.get('/breeds/condition-types/', { params });
    return response.data;
  },

  retrieve: async (id: number) => {
    const response = await api.get(`/breeds/condition-types/${id}/`);
    return response.data;
  },

  create: async (data: any) => {
    const response = await api.post('/breeds/condition-types/', data);
    return response.data;
  },

  update: async (id: number, data: any) => {
    const response = await api.patch(`/breeds/condition-types/${id}/`, data);
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/breeds/condition-types/${id}/`);
  },
};

export const breedConditionsAPI = {
  list: async (params?: any) => {
    const response = await api.get('/breeds/breed-conditions/', { params });
    return response.data;
  },

  retrieve: async (id: number) => {
    const response = await api.get(`/breeds/breed-conditions/${id}/`);
    return response.data;
  },

  create: async (data: any) => {
    const response = await api.post('/breeds/breed-conditions/', data);
    return response.data;
  },

  update: async (id: number, data: any) => {
    const response = await api.patch(`/breeds/breed-conditions/${id}/`, data);
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/breeds/breed-conditions/${id}/`);
  },
};

export const foodTypesAPI = {
  list: async (params?: any) => {
    const response = await api.get('/breeds/food-types/', { params });
    return response.data;
  },

  retrieve: async (id: number) => {
    const response = await api.get(`/breeds/food-types/${id}/`);
    return response.data;
  },

  create: async (data: any) => {
    const response = await api.post('/breeds/food-types/', data);
    return response.data;
  },

  update: async (id: number, data: any) => {
    const response = await api.patch(`/breeds/food-types/${id}/`, data);
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/breeds/food-types/${id}/`);
  },
};

export const breedFeedingsAPI = {
  list: async (params?: any) => {
    const response = await api.get('/breeds/breed-feedings/', { params });
    return response.data;
  },

  retrieve: async (id: number) => {
    const response = await api.get(`/breeds/breed-feedings/${id}/`);
    return response.data;
  },

  create: async (data: any) => {
    const response = await api.post('/breeds/breed-feedings/', data);
    return response.data;
  },

  update: async (id: number, data: any) => {
    const response = await api.patch(`/breeds/breed-feedings/${id}/`, data);
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/breeds/breed-feedings/${id}/`);
  },
};

export const breedGrowthsAPI = {
  list: async (params?: any) => {
    const response = await api.get('/breeds/breed-growths/', { params });
    return response.data;
  },

  retrieve: async (id: number) => {
    const response = await api.get(`/breeds/breed-growths/${id}/`);
    return response.data;
  },

  create: async (data: any) => {
    const response = await api.post('/breeds/breed-growths/', data);
    return response.data;
  },

  update: async (id: number, data: any) => {
    const response = await api.patch(`/breeds/breed-growths/${id}/`, data);
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/breeds/breed-growths/${id}/`);
  },
};

export const patientHealthsAPI = {
  list: async (params?: any) => {
    const response = await api.get('/knowledge/patient-healths/', { params });
    return response.data;
  },

  retrieve: async (id: number) => {
    const response = await api.get(`/knowledge/patient-healths/${id}/`);
    return response.data;
  },

  create: async (data: any) => {
    const response = await api.post('/knowledge/patient-healths/', data);
    return response.data;
  },

  update: async (id: number, data: any) => {
    const response = await api.patch(`/knowledge/patient-healths/${id}/`, data);
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/knowledge/patient-healths/${id}/`);
  },
};

export const recommendationsAPI = {
  list: async (params?: any) => {
    const response = await api.get('/knowledge/recommendations/', { params });
    return response.data;
  },

  retrieve: async (id: number) => {
    const response = await api.get(`/knowledge/recommendations/${id}/`);
    return response.data;
  },

  create: async (data: any) => {
    const response = await api.post('/knowledge/recommendations/', data);
    return response.data;
  },

  update: async (id: number, data: any) => {
    const response = await api.patch(`/knowledge/recommendations/${id}/`, data);
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/knowledge/recommendations/${id}/`);
  },
};

export const exceptionDiseasesAPI = {
  list: async (params?: any) => {
    const response = await api.get('/knowledge/exception-diseases/', { params });
    return response.data;
  },

  retrieve: async (id: number) => {
    const response = await api.get(`/knowledge/exception-diseases/${id}/`);
    return response.data;
  },

  create: async (data: any) => {
    const response = await api.post('/knowledge/exception-diseases/', data);
    return response.data;
  },

  update: async (id: number, data: any) => {
    const response = await api.patch(`/knowledge/exception-diseases/${id}/`, data);
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/knowledge/exception-diseases/${id}/`);
  },
};

export const anomaliesAPI = {
  list: async (params?: any) => {
    const response = await api.get('/knowledge/anomalies/', { params });
    return response.data;
  },

  retrieve: async (id: number) => {
    const response = await api.get(`/knowledge/anomalies/${id}/`);
    return response.data;
  },

  create: async (data: any) => {
    const response = await api.post('/knowledge/anomalies/', data);
    return response.data;
  },

  update: async (id: number, data: any) => {
    const response = await api.patch(`/knowledge/anomalies/${id}/`, data);
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/knowledge/anomalies/${id}/`);
  },
};

export const medicationsAPI = {
  list: async (params?: any) => {
    const response = await api.get('/knowledge/medications/', { params });
    return response.data;
  },

  retrieve: async (id: number) => {
    const response = await api.get(`/knowledge/medications/${id}/`);
    return response.data;
  },

  create: async (data: any) => {
    const response = await api.post('/knowledge/medications/', data);
    return response.data;
  },

  update: async (id: number, data: any) => {
    const response = await api.patch(`/knowledge/medications/${id}/`, data);
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/knowledge/medications/${id}/`);
  },
};

export const sensorTypesAPI = {
  list: async (params?: any) => {
    const response = await api.get('/sensors/sensor-types/', { params });
    return response.data;
  },

  retrieve: async (id: number) => {
    const response = await api.get(`/sensors/sensor-types/${id}/`);
    return response.data;
  },

  create: async (data: any) => {
    const response = await api.post('/sensors/sensor-types/', data);
    return response.data;
  },

  update: async (id: number, data: any) => {
    const response = await api.patch(`/sensors/sensor-types/${id}/`, data);
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/sensors/sensor-types/${id}/`);
  },
};

export const readingsAPI = {
  list: async (params?: any) => {
    const response = await api.get('/sensors/readings/', { params });
    return response.data;
  },

  retrieve: async (id: number) => {
    const response = await api.get(`/sensors/readings/${id}/`);
    return response.data;
  },

  create: async (data: any) => {
    const response = await api.post('/sensors/readings/', data);
    return response.data;
  },

  update: async (id: number, data: any) => {
    const response = await api.patch(`/sensors/readings/${id}/`, data);
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/sensors/readings/${id}/`);
  },

  getByDevice: async (deviceId: number) => {
    const response = await api.get(`/sensors/readings/?deviceID=${deviceId}`);
    return response.data;
  },

  getLatest: async (deviceId: number) => {
    const response = await api.get(`/sensors/readings/?deviceID=${deviceId}&latest=true`);
    return response.data;
  },
};

export const subscriptionTypesAPI = {
  list: async (params?: any) => {
    const response = await api.get('/subscriptions/subscription-types/', { params });
    return response.data;
  },

  retrieve: async (id: number) => {
    const response = await api.get(`/subscriptions/subscription-types/${id}/`);
    return response.data;
  },

  create: async (data: any) => {
    const response = await api.post('/subscriptions/subscription-types/', data);
    return response.data;
  },

  update: async (id: number, data: any) => {
    const response = await api.patch(`/subscriptions/subscription-types/${id}/`, data);
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/subscriptions/subscription-types/${id}/`);
  },
};

export const farmerSubscriptionsAPI = {
  list: async (params?: any) => {
    const response = await api.get('/subscriptions/farmer-subscriptions/', { params });
    return response.data;
  },

  retrieve: async (id: number) => {
    const response = await api.get(`/subscriptions/farmer-subscriptions/${id}/`);
    return response.data;
  },

  create: async (data: any) => {
    const response = await api.post('/subscriptions/farmer-subscriptions/', data);
    return response.data;
  },

  update: async (id: number, data: any) => {
    const response = await api.patch(`/subscriptions/farmer-subscriptions/${id}/`, data);
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/subscriptions/farmer-subscriptions/${id}/`);
  },

  getStats: async () => {
    const response = await api.get('/subscriptions/stats/');
    return response.data;
  },
};

export const resourcesAPI = {
  list: async (params?: any) => {
    const response = await api.get('/subscriptions/resources/', { params });
    return response.data;
  },

  retrieve: async (id: number) => {
    const response = await api.get(`/subscriptions/resources/${id}/`);
    return response.data;
  },

  create: async (data: any) => {
    const response = await api.post('/subscriptions/resources/', data);
    return response.data;
  },

  update: async (id: number, data: any) => {
    const response = await api.patch(`/subscriptions/resources/${id}/`, data);
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/subscriptions/resources/${id}/`);
  },
};

export const dashboardAPI = {
  getAdminStats: async () => {
    try {
      const [usersRes, farmersRes, farmsRes, devicesRes, batchesRes, subscriptionsRes] = await Promise.allSettled([
        usersAPI.list(),
        farmersAPI.list(),
        farmsAPI.list(),
        devicesAPI.list(),
        batchesAPI.list(),
        farmerSubscriptionsAPI.list(),
      ]);

      return {
        totalUsers: usersRes.status === 'fulfilled' ? usersRes.value.count || 0 : 0,
        totalFarmers: farmersRes.status === 'fulfilled' ? farmersRes.value.count || 0 : 0,
        activeFarms: farmsRes.status === 'fulfilled' ? farmsRes.value.count || 0 : 0,
        totalDevices: devicesRes.status === 'fulfilled' ? devicesRes.value.count || 0 : 0,
        activeBatches: batchesRes.status === 'fulfilled' ? batchesRes.value.count || 0 : 0,
        activeSubscriptions: subscriptionsRes.status === 'fulfilled' ? subscriptionsRes.value.count || 0 : 0,
        systemHealth: 95,
        pendingAlerts: 0,
      };
    } catch (error) {
      console.error('Error fetching admin stats:', error);
      throw error;
    }
  },

  getFarmerStats: async (farmId: number) => {
    try {
      const [batchesRes, devicesRes, readingsRes] = await Promise.allSettled([
        batchesAPI.getByFarm(farmId),
        devicesAPI.getByFarm(farmId),
        readingsAPI.list({ limit: 10 }),
      ]);

      const batches = batchesRes.status === 'fulfilled' ? batchesRes.value.results || batchesRes.value : [];
      const devices = devicesRes.status === 'fulfilled' ? devicesRes.value.results || devicesRes.value : [];
      const readings = readingsRes.status === 'fulfilled' ? readingsRes.value.results || readingsRes.value : [];

      return {
        totalBatches: batches.length,
        activeBatches: batches.filter((b: any) => b.status === 'Active').length,
        totalBirds: batches.reduce((sum: number, b: any) => sum + (b.current_count || 0), 0),
        totalDevices: devices.length,
        activeDevices: devices.filter((d: any) => d.is_active).length,
        recentReadings: readings.slice(0, 5),
        avgTemperature: readings.length > 0
          ? readings.reduce((sum: number, r: any) => sum + (r.value || 0), 0) / readings.length
          : 0,
        farmHealth: 92,
      };
    } catch (error) {
      console.error('Error fetching farmer stats:', error);
      throw error;
    }
  },
};

export const alertsAPI = {
  list: async (params?: any) => {
    return {
      count: 3,
      results: [
        {
          id: 1,
          title: 'High Temperature Alert',
          message: 'Temperature exceeded threshold in Coop A',
          severity: 'high',
          type: 'temperature',
          is_read: false,
          created_at: new Date().toISOString(),
        },
        {
          id: 2,
          title: 'Feeding Schedule',
          message: 'Batch #3 feeding due at 2:00 PM',
          severity: 'medium',
          type: 'feeding',
          is_read: true,
          created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 3,
          title: 'Low Humidity',
          message: 'Humidity dropped below 60% in Coop B',
          severity: 'low',
          type: 'humidity',
          is_read: false,
          created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        },
      ],
    };
  },

  markAsRead: async (id: number) => {
    return { id, is_read: true };
  },

  delete: async (id: number) => {
    return { success: true };
  },
};

export default api;
