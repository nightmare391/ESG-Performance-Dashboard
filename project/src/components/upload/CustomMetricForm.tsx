import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { esgMetrics } from '../../data/esgMetrics';
import { Metric } from '../../types/metrics';
import CustomMetricsSection from '../metrics/CustomMetricsSection';

const CustomMetricForm = () => {
  const [selectedMetric, setSelectedMetric] = useState('');
  const [customValue, setCustomValue] = useState('');
  const [metrics, setMetrics] = useState<Metric[]>([]);

  const getMetricCategory = (metricName: string) => {
    if (esgMetrics.environmental.includes(metricName)) return 'environmental';
    if (esgMetrics.social.includes(metricName)) return 'social';
    return 'governance';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMetric && customValue) {
      const newMetric = {
        category: getMetricCategory(selectedMetric),
        name: selectedMetric,
        value: customValue
      };
      setMetrics([...metrics, newMetric]);
      setSelectedMetric('');
      setCustomValue('');
      
      // Scroll to the new metric after a brief delay
      setTimeout(() => {
        document.getElementById('custom-metrics')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleMetricUpdate = (index: number, newValue: string) => {
    if (newValue === '__DELETE__') {
      const updatedMetrics = metrics.filter((_, i) => i !== index);
      setMetrics(updatedMetrics);
    } else {
      const updatedMetrics = [...metrics];
      updatedMetrics[index] = { ...updatedMetrics[index], value: newValue };
      setMetrics(updatedMetrics);
    }
  };

  const scrollToForm = () => {
    document.getElementById('metric-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmitMetrics = () => {
    console.log('Submitting metrics:', metrics);
    // Add your submission logic here
  };

  return (
    <>
      <div id="metric-form" className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800">Add Custom Metric</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Metric Name</label>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                focus:border-green-500 focus:ring-green-500 text-gray-900"
            >
              <option value="">Select a metric</option>
              <optgroup label="Environmental">
                {esgMetrics.environmental.map(metric => (
                  <option key={metric} value={metric}>{metric}</option>
                ))}
              </optgroup>
              <optgroup label="Social">
                {esgMetrics.social.map(metric => (
                  <option key={metric} value={metric}>{metric}</option>
                ))}
              </optgroup>
              <optgroup label="Governance">
                {esgMetrics.governance.map(metric => (
                  <option key={metric} value={metric}>{metric}</option>
                ))}
              </optgroup>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Value</label>
            <input
              type="text"
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                focus:border-green-500 focus:ring-green-500 text-gray-900"
              placeholder="e.g., 1000 tons"
            />
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent 
              rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700
              transition-all duration-300"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Metric
          </button>
        </form>
      </div>

      {metrics.length > 0 && (
        <CustomMetricsSection
          metrics={metrics}
          onMetricUpdate={handleMetricUpdate}
          onAddMore={scrollToForm}
          onSubmit={handleSubmitMetrics}
        />
      )}
    </>
  );
};

export default CustomMetricForm;