import React, { useState, useRef, useMemo } from 'react';
import { ImageCanvas } from './components/ImageCanvas';
import { TextInput } from './components/TextInput';
import { DateInput } from './components/DateInput';
import { DownloadButton } from './components/DownloadButton';
import { PrintButton } from './components/PrintButton';
import { PdfButton } from './components/PdfButton';
import { ImageUpload } from './components/ImageUpload';
import { Notification } from './components/Notification';
import { SuccessNotification } from './components/SuccessNotification';
import { RegionSelect } from './components/RegionSelect';
import { EducationOfficeSelect } from './components/RegionSelect/EducationOfficeSelect';
import { EducationOfficeInput } from './components/RegionSelect/EducationOfficeInput';
import { FormValidationOverlay } from './components/FormValidationOverlay';
import { ManagerInput } from './components/ManagerInput';
import { downloadCanvasImage } from './utils/imageUtils';
import { downloadCanvasAsPdf } from './utils/pdfUtils';
import { printCanvasImage } from './utils/printUtils';
import { validateForm } from './utils/validation';

export default function App() {
  const [schoolName, setSchoolName] = useState('');
  const [region, setRegion] = useState('');
  const [educationOffice, setEducationOffice] = useState('');
  const [isCustomOffice, setIsCustomOffice] = useState(false);
  const [managerName, setManagerName] = useState('');
  const [eventName, setEventName] = useState('');
  const [executor, setExecutor] = useState('');
  const [location, setLocation] = useState('');
  const [target, setTarget] = useState('');
  const [targetCount, setTargetCount] = useState('');
  const [executionDate, setExecutionDate] = useState('');
  const [objectives, setObjectives] = useState('');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageUrl = 'https://i.ibb.co/YQF7fjb/55555.jpg';

  const isFormValid = useMemo(() => {
    return validateForm({
      schoolName,
      region,
      educationOffice,
      managerName,
      eventName,
      executor,
      location,
      target,
      targetCount,
      executionDate,
      objectives,
      uploadedImages
    });
  }, [
    schoolName,
    region,
    educationOffice,
    managerName,
    eventName,
    executor,
    location,
    target,
    targetCount,
    executionDate,
    objectives,
    uploadedImages
  ]);

  const handleDownload = () => {
    if (!isFormValid) return;
    downloadCanvasImage(canvasRef.current);
    setShowSuccessNotification(true);
  };

  const handlePrint = () => {
    if (!isFormValid) return;
    printCanvasImage(canvasRef.current);
  };

  const handleDownloadPdf = () => {
    if (!isFormValid) return;
    downloadCanvasAsPdf(canvasRef.current);
    setShowSuccessNotification(true);
  };

  const handleImageLimitExceeded = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 5000);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 lg:p-8">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form Section */}
          <div className="lg:w-1/2 order-1 lg:order-2">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h1 className="text-2xl font-bold mb-4 text-gray-800">إضافة النصوص على الصورة</h1>
              
              <RegionSelect 
                value={region}
                onChange={(newRegion) => {
                  setRegion(newRegion);
                  setEducationOffice('');
                }}
              />

              {isCustomOffice ? (
                <EducationOfficeInput
                  value={educationOffice}
                  onChange={setEducationOffice}
                  onBack={() => setIsCustomOffice(false)}
                />
              ) : (
                <EducationOfficeSelect
                  value={educationOffice}
                  onChange={setEducationOffice}
                  region={region}
                  onCustomClick={() => setIsCustomOffice(true)}
                />
              )}

              <TextInput 
                value={schoolName}
                onChange={setSchoolName}
                placeholder="اكتب اسم المدرسة هنا"
              />

              <ManagerInput
                value={managerName}
                onChange={setManagerName}
              />

              <TextInput 
                value={eventName}
                onChange={setEventName}
                placeholder="اكتب اسم الفعالية هنا"
              />

              <TextInput 
                value={executor}
                onChange={setExecutor}
                placeholder="اكتب اسم المنفذ هنا"
              />

              <TextInput 
                value={location}
                onChange={setLocation}
                placeholder="اكتب مكان التنفيذ هنا"
              />

              <TextInput 
                value={target}
                onChange={setTarget}
                placeholder="اكتب المستهدفون هنا"
              />

              <TextInput 
                value={targetCount}
                onChange={setTargetCount}
                placeholder="عدد المستهدفون"
                type="number"
              />

              <DateInput 
                value={executionDate}
                onChange={setExecutionDate}
                placeholder="تاريخ التنفيذ"
              />

              <TextInput 
                value={objectives}
                onChange={setObjectives}
                placeholder="الأهداف"
                multiline={true}
              />

              <ImageUpload 
                onImagesChange={setUploadedImages} 
                maxImages={4}
                onLimitExceeded={handleImageLimitExceeded}
              />

              <div className="flex flex-col gap-2">
                <DownloadButton onDownload={handleDownload} disabled={!isFormValid} />
                <PdfButton onDownloadPdf={handleDownloadPdf} disabled={!isFormValid} />
                <PrintButton onPrint={handlePrint} disabled={!isFormValid} />
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:w-1/2 order-2 lg:order-1">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-8">
              <h2 className="text-xl font-bold mb-4 text-gray-800">معاينة</h2>
              <div className="relative">
                <FormValidationOverlay show={!isFormValid} />
                <ImageCanvas
                  ref={canvasRef}
                  imageUrl={imageUrl}
                  schoolName={schoolName}
                  region={region}
                  educationOffice={educationOffice}
                  managerName={managerName}
                  eventName={eventName}
                  executor={executor}
                  location={location}
                  target={target}
                  targetCount={targetCount}
                  executionDate={executionDate}
                  objectives={objectives}
                  uploadedImages={uploadedImages}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 text-sm text-gray-600">
          تم تطويره من قبل موسى بارقي 2025
        </div>
      </div>

      {showNotification && (
        <Notification
          message="الإصدار الحالي يدعم 4 صور كحد أقصى. سيتم إضافة المزيد من الخيارات قريباً!"
          onClose={() => setShowNotification(false)}
        />
      )}

      {showSuccessNotification && (
        <SuccessNotification
          message="تم تحميل الملف بنجاح!"
          onClose={() => setShowSuccessNotification(false)}
        />
      )}
    </div>
  );
}