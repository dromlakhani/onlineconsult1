import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Send } from 'lucide-react';
import PatientForm from './components/PatientForm';
import ProgressBar from './components/ProgressBar';
import AdminPage from './components/AdminPage';
import { PatientInfo } from './types';
import { savePatientData } from './utils';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<PatientInfo>({
    name: '',
    consultation_type: '',
    email: '',
    contact_number: '',
    city: '',
    payment_confirmed: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [isAdminView, setIsAdminView] = useState(false);

  const steps = ['Name', 'Consultation Type', 'Email', 'Contact Number', 'City', 'Payment'];

  const handleInputChange = (field: keyof PatientInfo, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    if (!formData.payment_confirmed) {
      setSubmitMessage('Please confirm that you have made the payment before submitting.');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');
    try {
      savePatientData(formData);
      console.log('Submission successful:', formData);
      setSubmitMessage('Thank you! Your information has been submitted successfully.');
      // Reset form
      setFormData({
        name: '',
        consultation_type: '',
        email: '',
        contact_number: '',
        city: '',
        payment_confirmed: false,
      });
      setCurrentStep(0);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitMessage('An error occurred while submitting your information. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleAdminView = () => {
    setIsAdminView(!isAdminView);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8">
        {isAdminView ? (
          <AdminPage onBack={toggleAdminView} />
        ) : (
          <>
            <ProgressBar currentStep={currentStep} totalSteps={steps.length} />
            <PatientForm
              currentStep={currentStep}
              formData={formData}
              handleInputChange={handleInputChange}
            />
            {submitMessage && (
              <div className={`mt-4 p-3 rounded ${submitMessage.includes('error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {submitMessage}
              </div>
            )}
            <div className="flex justify-between mt-8">
              {currentStep > 0 && (
                <button
                  onClick={handlePrevious}
                  className="flex items-center text-blue-600 hover:text-blue-800"
                  disabled={isSubmitting}
                >
                  <ChevronLeft size={20} />
                  Previous
                </button>
              )}
              {currentStep < steps.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="flex items-center text-blue-600 hover:text-blue-800 ml-auto"
                  disabled={isSubmitting}
                >
                  Next
                  <ChevronRight size={20} />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 ml-auto disabled:bg-blue-300"
                  disabled={isSubmitting || !formData.payment_confirmed}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                  <Send size={20} className="ml-2" />
                </button>
              )}
            </div>
            <button
              onClick={toggleAdminView}
              className="mt-4 text-sm text-gray-500 hover:text-gray-700"
            >
              AA
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;