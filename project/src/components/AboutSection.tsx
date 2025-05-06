import React from 'react';
import Section from './common/Section';
import AboutContent from './about/AboutContent';
import ESGVectors from './about/ESGVectors';

const AboutSection = () => {
  return (
    <Section id="about" className="w-full bg-white">
      <AboutContent />
      <div className="mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ESGVectors />
        </div>
      </div>
    </Section>
  );
};

export default AboutSection;