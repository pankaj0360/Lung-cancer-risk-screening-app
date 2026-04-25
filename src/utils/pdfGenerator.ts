//@ts-ignore
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Toast from 'react-native-toast-message';
export const generatePDF = async (user: any, report: any, answers: any[]) => {
  const answerHTML = answers
    .slice(0, 5)
    .map(
      (q, i) => `
      <div style="margin-bottom:10px;">
        <p style="margin:0;"><b>Q${i + 1}:</b> ${q.question}</p>
        <p style="margin:0;color:#555;">${q.answer}</p>
      </div>
    `,
    )
    .join('');

  const color =
    report.riskLevel === 'HIGH'
      ? '#D32F2F'
      : report.riskLevel === 'MEDIUM'
      ? '#F9A825'
      : '#2E7D32';

  const html = `
  <div style="font-family: Arial; padding: 0; background:#F4F8FB;">

    <!-- HEADER -->
    <div style="
      background:#0B4F8A;
      padding:20px;
      color:white;
      text-align:center;
    ">
      <h1 style="margin:0;">🫁 Lung Risk Screening</h1>
      <p style="margin:0;font-size:12px;">
        AI-assisted lung health awareness report
      </p>
    </div>

    <div style="padding:20px;">

      <!-- PATIENT CARD -->
      <div style="
        background:white;
        padding:15px;
        border-radius:10px;
        margin-bottom:15px;
      ">
        <h3 style="color:#0B4F8A;">Patient Details</h3>
        <p><b>Name:</b> ${user.name || '-'}</p>
        <p><b>Mobile:</b> ${user.mobileNumber || '-'}</p>
        <p><b>Email:</b> ${user.email || '-'}</p>
      </div>

      <!-- RISK CARD -->
      <div style="
        background:white;
        padding:15px;
        border-radius:10px;
        margin-bottom:15px;
      ">
        <h3 style="color:#0B4F8A;">Assessment Result</h3>

        <p style="font-size:18px;">
          <b>Risk Score:</b> ${report.riskScore}%
        </p>

        <p>
          <b>Risk Level:</b>
          <span style="color:${color}; font-weight:bold;">
            ${report.riskLevel}
          </span>
        </p>

        <!-- Progress Bar -->
        <div style="
          background:#eee;
          border-radius:10px;
          height:12px;
          width:100%;
        ">
          <div style="
            width:${report.riskScore}%;
            background:${color};
            height:12px;
            border-radius:10px;
          "></div>
        </div>

        <p style="font-size:12px;color:#777;margin-top:5px;">
          ${new Date(report.date).toDateString()}
        </p>
      </div>

      <!-- ANSWERS -->
      <div style="
        background:white;
        padding:15px;
        border-radius:10px;
        margin-bottom:15px;
      ">
        <h3 style="color:#0B4F8A;">Answer Summary</h3>
        ${answerHTML}
      </div>

      <!-- SUGGESTIONS -->
      <div style="
        background:white;
        padding:15px;
        border-radius:10px;
        margin-bottom:15px;
      ">
        <h3 style="color:#0B4F8A;">Health Suggestions</h3>
        <ul>
          <li>Avoid smoking and polluted areas</li>
          <li>Maintain regular exercise</li>
          <li>Consult doctor if symptoms persist</li>
        </ul>
      </div>

      <!-- FOOTER -->
      <div style="
        text-align:center;
        font-size:11px;
        color:#777;
        margin-top:20px;
      ">
        ⚠ This is not a medical diagnosis.  
        It is an AI-based screening tool.
      </div>

    </div>
  </div>
  `;

  const file = await RNHTMLtoPDF.convert({
    html,
    fileName: 'Lung_Risk_Report',
    directory: 'Documents',
  });
  Toast.show({
    type: 'success',
    text1: 'PDF Generated',
    text2: `Saved to: ${file.filePath}`,
  });
  return file;
};
