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
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
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
    <div className="min-h-screen flex">
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-[100] p-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-blue-800 text-white p-4 transform transition-transform duration-300 z-[99] ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center gap-2 mb-8">
          <h2 className="text-xl font-bold">صمم الشاهد</h2>
        </div>
        <nav>
          <Link 
            to="/" 
            className="flex items-center gap-2 p-2 hover:bg-blue-700 rounded-lg transition-colors"
          >
            الصفحة الرئيسية
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-50">
        <div className="max-w-[1600px] mx-auto">
          {/* Top Bar */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-8">
            <h1 className="text-2xl font-bold text-gray-800">صمم الشاهد</h1>
          </div>

          <div className="grid-responsive gap-8">
            {/* Form Section */}
            <div className="card animate-slide-in">
              <div className="p-8">
                <div className="space-y-6">
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

                  <div className="flex flex-col gap-4">
                    <DownloadButton onDownload={handleDownload} disabled={!isFormValid} />
                    <PdfButton onDownloadPdf={handleDownloadPdf} disabled={!isFormValid} />
                    <PrintButton onPrint={handlePrint} disabled={!isFormValid} />
                  </div>
                </div>
              </div>
            </div>

            {/* Preview Section */}
            <div className="card animate-slide-in">
              <div className="p-8">
                <h2 className="text-xl font-bold mb-6 text-gray-800 text-center">
                  معاينة النتيجة
                </h2>
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
