import React from 'react';
import Section from './common/Section';
import MetricCard from './MetricCard';
import { metricsList } from '../data/metrics';

const MetricsSection = () => {
  return (
    <Section id="metrics" className="relative w-full bg-green-50 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2672&q=80")',
          backgroundAttachment: 'fixed'
        }}
      />
      
      <div className="relative mb-12">
        <div className="absolute inset-0" style={{
          clipPath: "polygon(0 0, 100% 0, 95% 100%, 5% 100%)"
        }}>
          <div className="h-full bg-green-100"></div>
        </div>
        <h2 className="relative text-3xl font-bold text-center text-gray-800 py-8">
          Key ESG Metrics
        </h2>
      </div>
      
      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {metricsList.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>
    </Section>
  );
};

export default MetricsSection;