import React from 'react';
import { PatientInfo } from '../types';
import { FileUploaderMinimal, OutputFileEntry } from '@uploadcare/react-uploader';
import '@uploadcare/react-uploader/core.css';

interface PatientFormProps {
  currentStep: number;
  formData: PatientInfo;
  handleInputChange: (field: keyof PatientInfo, value: string | boolean) => void;
}

const PatientForm: React.FC<PatientFormProps> = ({
  currentStep,
  formData,
  handleInputChange,
}) => {
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              What's your name?
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
              required
            />
          </div>
        );
      case 1:
        return (
          <div className="mb-4">
            <label htmlFor="consultation_type" className="block text-sm font-medium text-gray-700 mb-2">
              What type of consultation do you need?
            </label>
            <select
              id="consultation_type"
              value={formData.consultation_type}
              onChange={(e) => handleInputChange('consultation_type', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Type of Consultation</option>
              <option value="new">New Consultation</option>
              <option value="followup">Follow-up consultation</option>
            </select>
          </div>
        );
      case 2:
        return (
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              What's your email address?
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email address"
              required
            />
          </div>
        );
      case 3:
        return (
          <div className="mb-4">
            <label htmlFor="contact_number" className="block text-sm font-medium text-gray-700 mb-2">
              What's your contact number?
            </label>
            <input
              type="tel"
              id="contact_number"
              value={formData.contact_number}
              onChange={(e) => handleInputChange('contact_number', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your contact number"
              required
            />
          </div>
        );
      case 4:
        return (
          <div className="mb-4">
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
              Enter the name of your city / town / village
            </label>
            <input
              type="text"
              id="city"
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your city / town / village"
              required
            />
          </div>
        );
      case 5:
        return (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Payment Information</h3>
            <p className="mb-4">Please make the payment of Rs. 1000 using the QR code given below or using the UPI id 9825957844@pthdfc</p>
            <img src="https://i.ibb.co/ts359vk/Clean-Shot-2024-10-05-at-06-eckysgnlkf.png" alt="Payment QR Code" className="w-full max-w-xs mx-auto mb-4" />
            <p className="mb-4">OR USE THE QR CODE GIVEN</p>
          </div>
        );
      case 6:
        return (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Upload Payment Screenshot</h3>
            <p className="mb-4">Please upload a screenshot of your payment confirmation:</p>
            <FileUploaderMinimal
              classNameUploader="uc-light"
              pubkey="16cd1af56844e9d6ec33"
              onChange={(info) => {
                const file = info.successEntries[0] as OutputFileEntry;
                if (file && file.cdnUrl) {
                  handleInputChange('payment_screenshot', file.cdnUrl);
                }
              }}
            />
          </div>
        );
      case 7:
        return (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Upload Previous Prescription</h3>
            <p className="mb-4">Please upload your previous prescription (if any):</p>
            <FileUploaderMinimal
              classNameUploader="uc-light"
              pubkey="16cd1af56844e9d6ec33"
              onChange={(info) => {
                const file = info.successEntries[0] as OutputFileEntry;
                if (file && file.cdnUrl) {
                  handleInputChange('previous_prescription', file.cdnUrl);
                }
              }}
            />
          </div>
        );
      case 8:
        return (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Upload Investigation Report</h3>
            <p className="mb-4">Please upload your current investigation report:</p>
            <FileUploaderMinimal
              classNameUploader="uc-light"
              pubkey="16cd1af56844e9d6ec33"
              onChange={(info) => {
                const file = info.successEntries[0] as OutputFileEntry;
                if (file && file.cdnUrl) {
                  handleInputChange('investigation_report', file.cdnUrl);
                }
              }}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Online Consultation with Dr. Om J Lakhani</h2>
      {renderStep()}
      {currentStep === 5 && (
        <div className="mt-4">
          <p>After making the payment, click "Next" to upload your payment screenshot.</p>
        </div>
      )}
    </div>
  );
};

export default PatientForm;
