import React from 'react';
import { ArrowUp, Send } from 'lucide-react';
import { Metric } from '../../types/metrics';
import MetricCard from '../upload/MetricCard';

interface CustomMetricsSectionProps {
  metrics: Metric[];
  onMetricUpdate: (index: number, newValue: string) => void;
  onAddMore: () => void;
  onSubmit: () => void;
}

const CustomMetricsSection: React.FC<CustomMetricsSectionProps> = ({ 
  metrics, 
  onMetricUpdate,
  onAddMore,
  onSubmit
}) => {
  if (metrics.length === 0) return null;

  const getGridCols = (count: number) => {
    if (count === 1) return 'grid-cols-1 max-w-md mx-auto';
    if (count === 2) return 'grid-cols-2 max-w-4xl mx-auto';
    if (count <= 5) return 'grid-cols-3 lg:grid-cols-5';
    return 'grid-cols-3 lg:grid-cols-5';
  };

  return (
    <div className="w-full bg-gray-50" style={{width: "92vw"}}>
      <div id="custom-metrics" className="py-12 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">
            Custom Metrics Added
          </h2>
          
          <div className={`grid ${getGridCols(metrics.length)} gap-6 mb-12`}>
            {metrics.map((metric, index) => (
              <MetricCard
                key={`${metric.name}-${index}`}
                category={metric.category}
                metricName={metric.name}
                value={metric.value}
                onSave={(newValue) => onMetricUpdate(index, newValue)}
                onDelete={() => onMetricUpdate(index, '__DELETE__')}
              />
            ))}
          </div>

          <div className="flex flex-col items-center space-y-6">
            <button
              onClick={onAddMore}
              className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg
                hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-md
                hover:shadow-lg active:scale-95 active:shadow-inner"
            >
              <ArrowUp className="w-5 h-5" />
              <span>Add More Metrics</span>
            </button>

            <button
              onClick={onSubmit}
              className="flex items-center space-x-2 px-8 py-3 bg-green-600 text-white rounded-lg
                hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-md
                hover:shadow-lg active:scale-95 active:shadow-inner"
            >
              <Send className="w-5 h-5" />
              <span>Submit Metrics</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomMetricsSection;