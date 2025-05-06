import React, { useState } from 'react';
import Section from './common/Section';
import FileUpload from './upload/FileUpload';
import CustomMetricForm from './upload/CustomMetricForm';
import DashboardSection from './DashboardSection';

const UploadSection = () => {
  const [showDashboard, setShowDashboard] = useState(false);

  const handleUploadComplete = () => {
    setShowDashboard(true);
  };

  return (
    <>
      <Section id="upload" className="w-full">
        <div className="grid md:grid-cols-2 gap-8">
          <FileUpload onUploadComplete={handleUploadComplete} />
          <CustomMetricForm />
        </div>
      </Section>
      
      {showDashboard && <DashboardSection />}
    </>
  );
};

export default UploadSection;