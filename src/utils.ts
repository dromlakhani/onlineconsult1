import { PatientInfo } from './types';

export function savePatientData(data: PatientInfo): void {
  const existingData = localStorage.getItem('patientData');
  const patientData = existingData ? JSON.parse(existingData) : [];
  
  // Add timestamp to the data
  const dataWithTimestamp = {
    ...data,
    timestamp: new Date().toISOString()
  };
  
  patientData.push(dataWithTimestamp);
  localStorage.setItem('patientData', JSON.stringify(patientData));
  
  // Convert to CSV and store
  const csvData = convertToCSV(patientData);
  localStorage.setItem('patientDataCSV', csvData);
}

function convertToCSV(data: any[]): string {
  const headers = [
    'timestamp',
    'name',
    'consultation_type',
    'email',
    'contact_number',
    'city',
    'payment_screenshot',
    'previous_prescription',
    'investigation_report'
  ];
  const csvRows = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => row[header] !== undefined ? `"${row[header].toString().replace(/"/g, '""')}"` : '').join(',')
    )
  ];
  return csvRows.join('\n');
}

// Admin function to get CSV data
export function getPatientDataCSV(): string {
  return localStorage.getItem('patientDataCSV') || '';
}
