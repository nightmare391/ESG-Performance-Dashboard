import React, { useState } from 'react';
import Section from './common/Section';
import { ExternalLink, FileDown, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const DashboardSection = () => {
  const [hasError, setHasError] = useState(false);
  const dashboardUrl = "https://app.powerbi.com/view?r=eyJrIjoiYTVlOTllM2MtZDQ3OS00ZWZkLTlkMjYtMTFkMGVkZTY2NjQ4IiwidCI6IjA4MWQ0MTBlLTk4OTItNDE4Yi05ODg2LTdhM2NkNWRiMWYzNyJ9";
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Performance metrics data
  const environmentalMetrics = [
    { metric: 'Carbon Emissions', value: '150,000', unit: 'tCO2e', benchmark: '180,000', score: '85', status: 'Good' },
    { metric: 'Energy Consumption', value: '45', unit: '% Renewable', benchmark: '35', score: '90', status: 'Excellent' },
    { metric: 'Water Usage', value: '500,000', unit: 'm³', benchmark: '600,000', score: '80', status: 'Good' },
    { metric: 'Waste Recycling', value: '85', unit: '%', benchmark: '75', score: '88', status: 'Excellent' }
  ];

  const socialMetrics = [
    { metric: 'Employee Diversity', value: '42', unit: '% Women', benchmark: '40', score: '82', status: 'Good' },
    { metric: 'Safety Incidents', value: '0', unit: 'Incidents', benchmark: '2', score: '100', status: 'Excellent' },
    { metric: 'Training Hours', value: '45', unit: 'hrs/employee', benchmark: '40', score: '85', status: 'Good' },
    { metric: 'Community Investment', value: '2.5', unit: '% Revenue', benchmark: '2.0', score: '90', status: 'Excellent' }
  ];

  const governanceMetrics = [
    { metric: 'Board Independence', value: '80', unit: '%', benchmark: '75', score: '92', status: 'Excellent' },
    { metric: 'ESG Policies', value: '95', unit: '% Coverage', benchmark: '90', score: '88', status: 'Good' },
    { metric: 'Risk Assessment', value: '100', unit: '% Coverage', benchmark: '95', score: '95', status: 'Excellent' },
    { metric: 'Data Security', value: '0', unit: 'Breaches', benchmark: '0', score: '100', status: 'Excellent' }
  ];

  const generateReport = () => {
    const doc = new jsPDF();
    let yPos = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;

    // Helper function for wrapped text
    const addWrappedText = (text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
      const lines = doc.splitTextToSize(text, maxWidth);
      doc.text(lines, x, y);
      return y + (lines.length * lineHeight);
    };

    // Title
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 0);
    doc.text('ESG Performance Report', margin, yPos);
    yPos += 10;

    // Date
    doc.setFontSize(12);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, margin, yPos);
    yPos += 20;

    // Executive Summary
    doc.setFontSize(16);
    doc.text('Executive Summary', margin, yPos);
    yPos += 10;
    doc.setFontSize(12);
    const executiveSummary = `This report provides a comprehensive analysis of our organization's Environmental, Social, and Governance (ESG) performance. Overall, we have demonstrated strong progress across all ESG dimensions, with notable achievements in emissions reduction, diversity initiatives, and governance practices.`;
    yPos = addWrappedText(executiveSummary, margin, yPos, pageWidth - 2 * margin, 7);
    yPos += 15;

    // Overall Performance by Category
    doc.setFontSize(16);
    doc.text('Overall Performance by Category', margin, yPos);
    yPos += 10;

    const overallScores = [
      ['Category', 'Score', 'Status'],
      ['Environmental', '88%', 'Strong Performance'],
      ['Social', '85%', 'Good Progress'],
      ['Governance', '92%', 'Industry Leading']
    ];

    (doc as any).autoTable({
      startY: yPos,
      head: [overallScores[0]],
      body: overallScores.slice(1),
      theme: 'grid',
      headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255] }
    });

    yPos = (doc as any).lastAutoTable.finalY + 15;

    // Environmental Performance
    doc.setFontSize(16);
    doc.text('Environmental Performance', margin, yPos);
    yPos += 10;

    // Environmental Metrics Table
    (doc as any).autoTable({
      startY: yPos,
      head: [['Metric', 'Your Value', 'Unit', 'Benchmark', 'Score', 'Status']],
      body: environmentalMetrics.map(m => [m.metric, m.value, m.unit, m.benchmark, m.score, m.status]),
      theme: 'grid',
      headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255] }
    });

    yPos = (doc as any).lastAutoTable.finalY + 10;

    // Environmental Strengths and Improvements
    doc.setFontSize(14);
    doc.text('Key Strengths:', margin, yPos);
    yPos += 7;
    const envStrengths = [
      'Industry-leading renewable energy adoption',
      'Successful implementation of waste reduction programs',
      'Effective water conservation initiatives'
    ];
    envStrengths.forEach(strength => {
      doc.setFontSize(12);
      doc.text(`• ${strength}`, margin + 5, yPos);
      yPos += 7;
    });

    yPos += 7;
    doc.setFontSize(14);
    doc.text('Areas for Improvement:', margin, yPos);
    yPos += 7;
    const envImprovements = [
      'Further reduce carbon emissions through operational efficiency',
      'Expand renewable energy infrastructure',
      'Enhance supply chain sustainability'
    ];
    envImprovements.forEach(improvement => {
      doc.setFontSize(12);
      doc.text(`• ${improvement}`, margin + 5, yPos);
      yPos += 7;
    });

    // Add new page for Social Performance
    doc.addPage();
    yPos = 20;

    // Social Performance
    doc.setFontSize(16);
    doc.text('Social Performance', margin, yPos);
    yPos += 10;

    // Social Metrics Table
    (doc as any).autoTable({
      startY: yPos,
      head: [['Metric', 'Your Value', 'Unit', 'Benchmark', 'Score', 'Status']],
      body: socialMetrics.map(m => [m.metric, m.value, m.unit, m.benchmark, m.score, m.status]),
      theme: 'grid',
      headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255] }
    });

    yPos = (doc as any).lastAutoTable.finalY + 10;

    // Social Strengths and Improvements
    doc.setFontSize(14);
    doc.text('Key Strengths:', margin, yPos);
    yPos += 7;
    const socialStrengths = [
      'Strong workplace safety record',
      'Above-target diversity metrics',
      'Comprehensive employee development programs'
    ];
    socialStrengths.forEach(strength => {
      doc.setFontSize(12);
      doc.text(`• ${strength}`, margin + 5, yPos);
      yPos += 7;
    });

    yPos += 7;
    doc.setFontSize(14);
    doc.text('Areas for Improvement:', margin, yPos);
    yPos += 7;
    const socialImprovements = [
      'Enhance diversity in senior leadership positions',
      'Expand community engagement programs',
      'Strengthen supplier diversity initiatives'
    ];
    socialImprovements.forEach(improvement => {
      doc.setFontSize(12);
      doc.text(`• ${improvement}`, margin + 5, yPos);
      yPos += 7;
    });

    // Add new page for Governance Performance
    doc.addPage();
    yPos = 20;

    // Governance Performance
    doc.setFontSize(16);
    doc.text('Governance Performance', margin, yPos);
    yPos += 10;

    // Governance Metrics Table
    (doc as any).autoTable({
      startY: yPos,
      head: [['Metric', 'Your Value', 'Unit', 'Benchmark', 'Score', 'Status']],
      body: governanceMetrics.map(m => [m.metric, m.value, m.unit, m.benchmark, m.score, m.status]),
      theme: 'grid',
      headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255] }
    });

    yPos = (doc as any).lastAutoTable.finalY + 10;

    // Governance Strengths and Improvements
    doc.setFontSize(14);
    doc.text('Key Strengths:', margin, yPos);
    yPos += 7;
    const govStrengths = [
      'High board independence ratio',
      'Comprehensive ESG oversight',
      'Strong risk management framework'
    ];
    govStrengths.forEach(strength => {
      doc.setFontSize(12);
      doc.text(`• ${strength}`, margin + 5, yPos);
      yPos += 7;
    });

    yPos += 7;
    doc.setFontSize(14);
    doc.text('Areas for Improvement:', margin, yPos);
    yPos += 7;
    const govImprovements = [
      'Further enhance board diversity',
      'Strengthen ESG-linked compensation metrics',
      'Expand stakeholder engagement programs'
    ];
    govImprovements.forEach(improvement => {
      doc.setFontSize(12);
      doc.text(`• ${improvement}`, margin + 5, yPos);
      yPos += 7;
    });

    // Add new page for Conclusions and Recommendations
    doc.addPage();
    yPos = 20;

    // Conclusions and Recommendations
    doc.setFontSize(16);
    doc.text('Conclusions and Recommendations', margin, yPos);
    yPos += 15;

    doc.setFontSize(14);
    doc.text('Key Conclusions:', margin, yPos);
    yPos += 10;
    const conclusions = [
      'Strong overall ESG performance with room for strategic improvements',
      'Industry-leading governance practices',
      'Significant progress in environmental initiatives',
      'Robust social performance metrics'
    ];
    conclusions.forEach(conclusion => {
      doc.setFontSize(12);
      doc.text(`• ${conclusion}`, margin + 5, yPos);
      yPos += 7;
    });

    yPos += 10;
    doc.setFontSize(14);
    doc.text('Strategic Recommendations:', margin, yPos);
    yPos += 10;
    const recommendations = [
      'Accelerate carbon reduction initiatives to meet 2030 targets',
      'Implement comprehensive supplier ESG assessment program',
      'Enhance diversity in senior leadership positions',
      'Expand community engagement and impact measurement',
      'Strengthen ESG data collection and verification processes'
    ];
    recommendations.forEach(recommendation => {
      doc.setFontSize(12);
      doc.text(`• ${recommendation}`, margin + 5, yPos);
      yPos += 7;
    });

    // Add page numbers
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(`Page ${i} of ${pageCount}`, pageWidth - margin, doc.internal.pageSize.getHeight() - 10, { align: 'right' });
    }

    // Save the PDF
    doc.save('ESG_Performance_Report.pdf');
  };

  const suggestions = {
    environmental: {
      title: "Environmental Improvement Areas",
      items: [
        {
          heading: "Energy Management",
          details: [
            "Implement real-time energy monitoring systems across all facilities",
            "Develop facility-specific energy reduction targets",
            "Install smart lighting and HVAC controls",
            "Conduct regular energy audits",
            "Invest in on-site renewable energy generation"
          ]
        },
        {
          heading: "Waste Reduction",
          details: [
            "Implement comprehensive recycling programs",
            "Establish composting facilities for organic waste",
            "Develop circular economy initiatives",
            "Create waste reduction targets for each department",
            "Partner with sustainable waste management providers"
          ]
        },
        {
          heading: "Water Conservation",
          details: [
            "Install water-efficient fixtures and equipment",
            "Implement rainwater harvesting systems",
            "Develop water recycling programs",
            "Monitor and fix water leaks promptly",
            "Create department-specific water reduction goals"
          ]
        }
      ]
    },
    social: {
      title: "Social Improvement Areas",
      items: [
        {
          heading: "Employee Development",
          details: [
            "Expand professional development programs",
            "Implement mentorship initiatives",
            "Create clear career progression paths",
            "Offer cross-functional training opportunities",
            "Develop leadership development programs"
          ]
        },
        {
          heading: "Diversity & Inclusion",
          details: [
            "Establish diverse recruitment channels",
            "Implement unconscious bias training",
            "Create employee resource groups",
            "Develop inclusive leadership programs",
            "Set measurable diversity targets"
          ]
        },
        {
          heading: "Community Engagement",
          details: [
            "Expand local partnership programs",
            "Increase employee volunteering opportunities",
            "Develop community education initiatives",
            "Create impact measurement frameworks",
            "Establish regular community feedback channels"
          ]
        }
      ]
    },
    governance: {
      title: "Governance Improvement Areas",
      items: [
        {
          heading: "Risk Management",
          details: [
            "Enhance ESG risk assessment procedures",
            "Implement regular risk monitoring systems",
            "Develop crisis management protocols",
            "Create comprehensive risk reporting frameworks",
            "Establish clear risk mitigation strategies"
          ]
        },
        {
          heading: "Board Oversight",
          details: [
            "Increase board diversity",
            "Enhance ESG expertise on the board",
            "Implement regular ESG performance reviews",
            "Develop clear ESG accountability measures",
            "Create board-level ESG committees"
          ]
        },
        {
          heading: "Transparency",
          details: [
            "Enhance ESG disclosure practices",
            "Implement stakeholder engagement programs",
            "Develop regular ESG reporting mechanisms",
            "Create clear communication channels",
            "Establish data verification processes"
          ]
        }
      ]
    },
    summary: {
      title: "Overall Summary",
      content: `Our ESG performance analysis reveals significant progress in several areas while highlighting opportunities for enhancement. Key achievements include reduced carbon emissions, improved water management, and strengthened governance practices. However, there are areas requiring attention to achieve our sustainability goals and maintain industry leadership.`
    },
    strengths: {
      title: "Areas of Strength",
      items: [
        "Strong commitment to renewable energy adoption",
        "Robust employee safety programs with zero incidents",
        "Comprehensive waste management system",
        "High board independence ratio",
        "Strong community engagement initiatives",
        "Advanced data collection and reporting systems"
      ]
    },
    priorities: {
      title: "Priority Improvement Areas",
      items: [
        {
          area: "Carbon Footprint Reduction",
          impact: "High",
          timeline: "Immediate",
          description: "Accelerate emissions reduction initiatives to meet 2030 targets"
        },
        {
          area: "Supply Chain Sustainability",
          impact: "High",
          timeline: "Medium-term",
          description: "Enhance supplier assessment and engagement programs"
        },
        {
          area: "Diversity in Leadership",
          impact: "High",
          timeline: "Short-term",
          description: "Accelerate progress toward diversity targets in senior positions"
        },
        {
          area: "Water Management",
          impact: "Medium",
          timeline: "Short-term",
          description: "Implement advanced water conservation technologies"
        }
      ]
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <Section id="dashboard" className="w-full bg-white">
      <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-lime-600 to-green-600 bg-clip-text text-transparent">
        ESG Analytics Dashboard
      </h2>

      {hasError ? (
        <div className="w-full rounded-lg overflow-hidden shadow-lg bg-white p-8">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <p className="text-gray-600 max-w-lg">
              To view the dashboard, please click on the below link.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={dashboardUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg
                  hover:bg-green-700 transition-all duration-300 space-x-2 shadow-md hover:shadow-lg"
              >
                <span>Open Dashboard</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                onClick={generateReport}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg
                  hover:bg-blue-700 transition-all duration-300 space-x-2 shadow-md hover:shadow-lg"
              >
                <span>Generate Report</span>
                <FileDown className="w-4 h-4 ml-2" />
              </button>
              <button
                onClick={() => setShowSuggestions(!showSuggestions)}
                className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg
                  hover:bg-purple-700 transition-all duration-300 space-x-2 shadow-md hover:shadow-lg"
              >
                <span>Suggestions</span>
                <Lightbulb className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>

          {showSuggestions && (
            <div className="mt-8 bg-gray-50 rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-center mb-8">ESG Performance Analysis & Recommendations</h3>
              
              {/* Overall Summary */}
              <div className="mb-8 bg-white rounded-lg p-6 shadow-md">
                <h4 className="text-xl font-semibold mb-4 text-green-600">{suggestions.summary.title}</h4>
                <p className="text-gray-700 leading-relaxed">{suggestions.summary.content}</p>
              </div>

              {/* Main Sections */}
              <div className="space-y-6">
                {/* Environmental Section */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <button
                    onClick={() => toggleSection('environmental')}
                    className="w-full px-6 py-4 flex items-center justify-between bg-green-50 hover:bg-green-100 transition-colors"
                  >
                    <h4 className="text-lg font-semibold text-green-700">{suggestions.environmental.title}</h4>
                    {expandedSection === 'environmental' ? (
                      <ChevronUp className="w-5 h-5 text-green-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-green-600" />
                    )}
                  </button>
                  {expandedSection === 'environmental' && (
                    <div className="p-6">
                      {suggestions.environmental.items.map((item, index) => (
                        <div key={index} className="mb-6 last:mb-0">
                          <h5 className="font-semibold text-gray-800 mb-3">{item.heading}</h5>
                          <ul className="space-y-2">
                            {item.details.map((detail, idx) => (
                              <li key={idx} className="flex items-start text-gray-600">
                                <span className="inline-block w-2 h-2 mt-2 mr-2 bg-green-400 rounded-full" />
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Social Section */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <button
                    onClick={() => toggleSection('social')}
                    className="w-full px-6 py-4 flex items-center justify-between bg-blue-50 hover:bg-blue-100 transition-colors"
                  >
                    <h4 className="text-lg font-semibold text-blue-700">{suggestions.social.title}</h4>
                    {expandedSection === 'social' ? (
                      <ChevronUp className="w-5 h-5 text-blue-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-blue-600" />
                    )}
                  </button>
                  {expandedSection === 'social' && (
                    <div className="p-6">
                      {suggestions.social.items.map((item, index) => (
                        <div key={index} className="mb-6 last:mb-0">
                          <h5 className="font-semibold text-gray-800 mb-3">{item.heading}</h5>
                          <ul className="space-y-2">
                            {item.details.map((detail, idx) => (
                              <li key={idx} className="flex items-start text-gray-600">
                                <span className="inline-block w-2 h-2 mt-2 mr-2 bg-blue-400 rounded-full" />
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Governance Section */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <button
                    onClick={() => toggleSection('governance')}
                    className="w-full px-6 py-4 flex items-center justify-between bg-purple-50 hover:bg-purple-100 transition-colors"
                  >
                    <h4 className="text-lg font-semibold text-purple-700">{suggestions.governance.title}</h4>
                    {expandedSection === 'governance' ? (
                      <ChevronUp className="w-5 h-5 text-purple-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-purple-600" />
                    )}
                  </button>
                  {expandedSection === 'governance' && (
                    <div className="p-6">
                      {suggestions.governance.items.map((item, index) => (
                        <div key={index} className="mb-6 last:mb-0">
                          <h5 className="font-semibold text-gray-800 mb-3">{item.heading}</h5>
                          <ul className="space-y-2">
                            {item.details.map((detail, idx) => (
                              <li key={idx} className="flex items-start text-gray-600">
                                <span className="inline-block w-2 h-2 mt-2 mr-2 bg-purple-400 rounded-full" />
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Areas of Strength */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <button
                    onClick={() => toggleSection('strengths')}
                    className="w-full px-6 py-4 flex items-center justify-between bg-emerald-50 hover:bg-emerald-100 transition-colors"
                  >
                    <h4 className="text-lg font-semibold text-emerald-700">{suggestions.strengths.title}</h4>
                    {expandedSection === 'strengths' ? (
                      <ChevronUp className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-emerald-600" />
                    )}
                  </button>
                  {expandedSection === 'strengths' && (
                    <div className="p-6">
                      <ul className="space-y-3">
                        {suggestions.strengths.items.map((item, index) => (
                          <li key={index} className="flex items-start text-gray-600">
                            <span className="inline-block w-2 h-2 mt-2 mr-2 bg-emerald-400 rounded-full" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Priority Improvement Areas */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <button
                    onClick={() => toggleSection('priorities')}
                    className="w-full px-6 py-4 flex items-center justify-between bg-amber-50 hover:bg-amber-100 transition-colors"
                  >
                    <h4 className="text-lg font-semibold text-amber-700">{suggestions.priorities.title}</h4>
                    {expandedSection === 'priorities' ? (
                      <ChevronUp className="w-5 h-5 text-amber-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-amber-600" />
                    )}
                  </button>
                  {expandedSection === 'priorities' && (
                    <div className="p-6">
                      <div className="grid gap-4">
                        {suggestions.priorities.items.map((item, index) => (
                          <div key={index} className="border rounded-lg p-4 bg-amber-50">
                            <div className="flex justify-between items-start mb-2">
                              <h5 className="font-semibold text-gray-800">{item.area}</h5>
                              <div className="flex gap-2">
                                <span className="px-2 py-1 text-xs rounded bg-amber-100 text-amber-800">
                                  Impact: {item.impact}
                                </span>
                                <span className="px-2 py-1 text-xs rounded bg-amber-100 text-amber-800">
                                  Timeline: {item.timeline}
                                </span>
                              </div>
                            </div>
                            <p className="text-gray-600">{item.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full aspect-[16/9] rounded-lg overflow-hidden shadow-lg">
          <iframe
            title="ESG Analytics Dashboard"
            width="100%"
            height="100%"
            src={dashboardUrl}
            frameBorder="0"
            allowFullScreen
            onError={() => setHasError(true)}
            onLoad={(e) => {
              try {
                // @ts-ignore
                const frameDoc = e.target.contentDocument;
                if (!frameDoc) {
                  setHasError(true);
                }
              } catch (error) {
                setHasError(true);
              }
            }}
          />
        </div>
      )}
    </Section>
  );
};

export default DashboardSection;