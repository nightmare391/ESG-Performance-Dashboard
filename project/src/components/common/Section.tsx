import React from 'react';

interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ id, children, className = '' }) => {
  return (
    <section id={id} className={`py-16 w-full ${className}`}>
      <div className="container mx-auto px-4">
        {children}
      </div>
    </section>
  );
};

export default Section;