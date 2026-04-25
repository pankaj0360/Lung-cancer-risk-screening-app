import http from './httpClient';
export const submitRisk = async (answers: any) => {
  try {
    const res = await http.post('/api/risk/assess', answers);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
