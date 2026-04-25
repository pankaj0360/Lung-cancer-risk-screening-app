import http from './httpClient';

// 🔹 Update Profile API
export const updateProfileApi = async (user: any) => {
  try {
    const res = await http.put('/patient/profile/update', user);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
// 🔹 Get Profile API
export const getProfileApi = async () => {
  const res = await http.get('/api/user/profile');
  return res.data;
};
