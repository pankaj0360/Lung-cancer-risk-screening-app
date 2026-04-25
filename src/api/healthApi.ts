import http from './httpClient';

export const getHealthSummary = async () => {
  try {
    const res = await http.get('/patient/risk-history');

    return res.data; // array
  } catch (error) {
    console.log('Health API Error:', error);
    throw error;
  }
};
