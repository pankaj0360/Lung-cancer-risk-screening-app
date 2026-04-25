import http from './httpClient';

export const getDashboardStats = async () => {
  try {
    const res = await http.get('/admin/risk-stats');

    return res.data;
  } catch (error: any) {
    console.log('Dashboard API Error:', error.response?.data || error.message);
    throw error;
  }
};
