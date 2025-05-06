import React from 'react';
import LearnMoreButton from './LearnMoreButton';

const AboutContent = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-lime-600 to-green-600 bg-clip-text text-transparent">
        Understanding ESG Dashboard
      </h2>
      <div className="prose prose-lg text-gray-600">
        <p className="mb-6">
          An ESG (Environmental, Social, and Governance) dashboard is a crucial tool for modern businesses 
          to track and visualize their sustainability and ethical performance metrics. It provides 
          comprehensive insights into a company's environmental impact, social responsibility, and 
          governance practices.
        </p>
        <p className="mb-6">
          In today's business landscape, ESG metrics have become increasingly important as investors, 
          customers, and stakeholders demand greater transparency and accountability in corporate 
          sustainability practices. This dashboard helps organizations monitor, analyze, and improve 
          their ESG performance while making data-driven decisions.
        </p>
        <p className="mb-6">
          By tracking these metrics, companies can identify areas for improvement, set meaningful 
          targets, and demonstrate their commitment to sustainable and responsible business practices.
        </p>
        <LearnMoreButton />
      </div>
    </div>
  );
};

export default AboutContent;