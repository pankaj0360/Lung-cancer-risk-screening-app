import http from './httpClient';

export const saveRiskAssessment = async (
  totalScore: number,
  riskLevel: string,
  answers: any,
) => {
  try {
    const res = await http.post('/risk/save', {
      totalScore,
      riskLevel,
      answers,
    });

    return res.data;
  } catch (error) {
    console.log('Risk Save Error:', error);
    return null;
  }
};
