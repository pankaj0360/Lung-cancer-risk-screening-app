import http from './httpClient';
export const getQuestions = async () => {
  try {
    const res = await http.get('/admin/get/all/questions');
    return res.data;
  } catch (error) {
    console.log('Get Questions Error:', error);
    return [];
  }
};
export const getQuestionsPatient = async () => {
  try {
    const res = await http.get('/patient/get/all/questions');
    return res.data;
  } catch (error) {
    console.log('Get Questions Error:', error);
    return [];
  }
};
export const deleteQuestionApi = async (id: number) => {
  const res = await http.delete(`/admin/delete/question/${id}`);
  return res.data;
};
export const addQuestionApi = async (data: any) => {
  const res = await http.post('/admin/create/question', data);
  return res.data;
};
