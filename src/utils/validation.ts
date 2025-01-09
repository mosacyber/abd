// Utility functions for form validation
export function isNotEmpty(value: string): boolean {
  return value.trim().length > 0;
}

export interface FormData {
  schoolName: string;
  region: string;
  educationOffice: string;
  managerName: string;
  eventName: string;
  executor: string;
  location: string;
  target: string;
  targetCount: string;
  executionDate: string;
  objectives: string;
  uploadedImages: string[];
}

export function validateForm(formData: FormData): boolean {
  return (
    isNotEmpty(formData.schoolName) &&
    isNotEmpty(formData.region) &&
    isNotEmpty(formData.educationOffice) &&
    isNotEmpty(formData.managerName) &&
    isNotEmpty(formData.eventName) &&
    isNotEmpty(formData.executor) &&
    isNotEmpty(formData.location) &&
    isNotEmpty(formData.target) &&
    isNotEmpty(formData.targetCount) &&
    isNotEmpty(formData.executionDate) &&
    isNotEmpty(formData.objectives) &&
    formData.uploadedImages.length > 0
  );
}