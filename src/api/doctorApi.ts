import http from './httpClient';

// ➕ ADD DOCTOR
export const addDoctorApi = async (data: any) => {
  try {
    const res = await http.post('/admin/create/doctor', data);
    return res.data;
  } catch (e) {
    console.log('error', e);
  }
};

// 📥 GET ALL DOCTORS
export const getDoctorsApi = async () => {
  try {
    const res = await http.get('/admin/get/all/doctor');
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// ❌ DELETE DOCTOR
export const deleteDoctorApi = async (id: number) => {
  const res = await http.delete(`/admin/${id}`);
  return res.data;
};

// ✏️ UPDATE DOCTOR
export const updateDoctorApi = async (id: number, data: any) => {
  const res = await http.patch(`/admin/${id}`, data);
  return res.data;
};
