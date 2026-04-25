export const mapAnswers = (answers: any[], questions: any[]) => {
  return answers.map(ans => {
    const question = questions.find(q => q.id === ans.questionId);

    const option = question?.options.find(
      (opt: any) => opt.id === ans.optionId,
    );

    return {
      question: question?.questionText || 'Unknown Question',
      answer: option?.optionText || 'Unknown Answer',
    };
  });
};
