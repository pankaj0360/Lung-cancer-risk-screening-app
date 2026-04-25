export const questionData = [
  {
    category: 'Smoking History',
    questions: [
      {
        id: 1,
        question: 'Do you currently smoke cigarettes?',
        options: [
          { label: 'Never smoked', value: 0 },
          { label: 'Used to smoke but quit', value: 1 },
          { label: 'Occasionally smoke', value: 3 },
          { label: 'Regular smoker', value: 5 },
        ],
      },
      {
        id: 2,
        question: 'For how many years have you been smoking?',
        options: [
          { label: 'Never smoked', value: 0 },
          { label: 'Less than 5 years', value: 1 },
          { label: '5–10 years', value: 4 },
          { label: 'More than 10 years', value: 7 },
        ],
      },
      {
        id: 3,
        question: 'Are you exposed to second-hand smoke from others?',
        options: [
          { label: 'Never', value: 0 },
          { label: 'Rarely', value: 1 },
          { label: 'Sometimes', value: 2 },
          { label: 'Frequently', value: 4 },
        ],
      },
      {
        id: 4,
        question:
          'Do you consume smokeless tobacco such as gutka, pan masala, or khaini?',
        options: [
          { label: 'Never', value: 0 },
          { label: 'Occasionally', value: 1 },
          { label: 'Daily', value: 3 },
          { label: 'Multiple times per day', value: 4 },
        ],
      },
    ],
  },

  {
    category: 'Environmental Exposure',
    questions: [
      {
        id: 5,
        question: 'Are you frequently exposed to air pollution or dust?',
        options: [
          { label: 'Rarely', value: 0 },
          { label: 'Sometimes', value: 1 },
          { label: 'Often', value: 2 },
          { label: 'Daily exposure', value: 4 },
        ],
      },
      {
        id: 6,
        question:
          'Do you work in environments with chemicals, asbestos, or industrial dust?',
        options: [
          { label: 'No exposure', value: 0 },
          { label: 'Occasional exposure', value: 1 },
          { label: 'Frequent exposure', value: 3 },
          { label: 'Daily exposure', value: 4 },
        ],
      },
      {
        id: 18,
        question:
          'Are you regularly exposed to smoke from cooking fuels like wood or coal?',
        options: [
          { label: 'No exposure', value: 0 },
          { label: 'Rare exposure', value: 1 },
          { label: 'Sometimes', value: 2 },
          { label: 'Daily exposure', value: 4 },
        ],
      },
      {
        id: 19,
        question: 'Do you live in a highly polluted urban area?',
        options: [
          { label: 'No', value: 0 },
          { label: 'Sometimes', value: 1 },
          { label: 'Often', value: 2 },
          { label: 'Daily exposure', value: 3 },
        ],
      },
    ],
  },

  {
    category: 'Symptoms',
    questions: [
      {
        id: 7,
        question: 'Do you have a cough lasting more than three weeks?',
        options: [
          { label: 'No cough', value: 0 },
          { label: 'Occasional cough', value: 1 },
          { label: 'Frequent cough', value: 3 },
          { label: 'Persistent cough', value: 5 },
        ],
      },
      {
        id: 8,
        question:
          'Do you experience shortness of breath during normal activities?',
        options: [
          { label: 'Never', value: 0 },
          { label: 'Rarely', value: 1 },
          { label: 'Sometimes', value: 2 },
          { label: 'Often', value: 4 },
        ],
      },
      {
        id: 9,
        question: 'Do you experience chest pain when breathing or coughing?',
        options: [
          { label: 'Never', value: 0 },
          { label: 'Occasionally', value: 1 },
          { label: 'Sometimes', value: 2 },
          { label: 'Frequently', value: 4 },
        ],
      },
      {
        id: 10,
        question: 'Have you coughed up blood recently?',
        options: [
          { label: 'Never', value: 0 },
          { label: 'Once', value: 2 },
          { label: 'Occasionally', value: 4 },
          { label: 'Frequently', value: 6 },
        ],
      },
      {
        id: 11,
        question: 'Have you experienced unexplained weight loss recently?',
        options: [
          { label: 'No', value: 0 },
          { label: 'Slight weight loss', value: 1 },
          { label: 'Moderate weight loss', value: 3 },
          { label: 'Significant weight loss', value: 5 },
        ],
      },
      {
        id: 12,
        question: 'Do you often feel unusual fatigue or weakness?',
        options: [
          { label: 'Never', value: 0 },
          { label: 'Occasionally', value: 1 },
          { label: 'Often', value: 2 },
          { label: 'Almost every day', value: 3 },
        ],
      },
      {
        id: 21,
        question: 'Do you experience frequent wheezing while breathing?',
        options: [
          { label: 'Never', value: 0 },
          { label: 'Occasionally', value: 1 },
          { label: 'Sometimes', value: 2 },
          { label: 'Frequently', value: 3 },
        ],
      },
      {
        id: 22,
        question: 'Have you experienced hoarseness in your voice recently?',
        options: [
          { label: 'Never', value: 0 },
          { label: 'Rarely', value: 1 },
          { label: 'Sometimes', value: 2 },
          { label: 'Often', value: 3 },
        ],
      },
      {
        id: 23,
        question: 'Do you experience pain in shoulders or back without injury?',
        options: [
          { label: 'Never', value: 0 },
          { label: 'Occasionally', value: 1 },
          { label: 'Sometimes', value: 2 },
          { label: 'Frequently', value: 3 },
        ],
      },
      {
        id: 24,
        question: 'Have you lost appetite recently?',
        options: [
          { label: 'No', value: 0 },
          { label: 'Slightly reduced appetite', value: 1 },
          { label: 'Moderate appetite loss', value: 2 },
          { label: 'Severe appetite loss', value: 3 },
        ],
      },
      {
        id: 25,
        question: 'Do you often feel difficulty taking deep breaths?',
        options: [
          { label: 'Never', value: 0 },
          { label: 'Rarely', value: 1 },
          { label: 'Sometimes', value: 2 },
          { label: 'Often', value: 4 },
        ],
      },
    ],
  },

  {
    category: 'Medical History',
    questions: [
      {
        id: 13,
        question: 'Do you have frequent respiratory infections?',
        options: [
          { label: 'Never', value: 0 },
          { label: 'Rarely', value: 1 },
          { label: 'Sometimes', value: 2 },
          { label: 'Often', value: 3 },
        ],
      },
      {
        id: 14,
        question: 'Have you ever been diagnosed with tuberculosis (TB)?',
        options: [
          { label: 'No', value: 0 },
          { label: 'Not sure', value: 1 },
          { label: 'Yes, treated before', value: 3 },
          { label: 'Currently under treatment', value: 4 },
        ],
      },
      {
        id: 15,
        question: 'Have you ever been diagnosed with asthma or COPD?',
        options: [
          { label: 'No', value: 0 },
          { label: 'Mild respiratory issues', value: 1 },
          { label: 'Diagnosed condition', value: 3 },
          { label: 'Chronic respiratory disease', value: 4 },
        ],
      },
      {
        id: 16,
        question: 'Has anyone in your immediate family had lung cancer?',
        options: [
          { label: 'No', value: 0 },
          { label: 'Not sure', value: 1 },
          { label: 'Distant relative', value: 2 },
          { label: 'Close family member', value: 4 },
        ],
      },
    ],
  },

  {
    category: 'Lifestyle',
    questions: [
      {
        id: 17,
        question: 'How old are you?',
        options: [
          { label: 'Below 30', value: 0 },
          { label: '30-45', value: 1 },
          { label: '46-60', value: 3 },
          { label: 'Above 60', value: 4 },
        ],
      },
      {
        id: 20,
        question: 'Do you exercise regularly?',
        options: [
          { label: 'Yes, regularly', value: 0 },
          { label: 'Occasionally', value: 1 },
          { label: 'Rarely', value: 2 },
          { label: 'Never', value: 3 },
        ],
      },
    ],
  },
];
