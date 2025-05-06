export type MetricCategory = 'environmental' | 'social' | 'governance';

export interface Metric {
  category: MetricCategory;
  name: string;
  value: string;
}

export interface MetricCardProps {
  category: MetricCategory;
  metricName: string;
  value: string;
  onSave: (newValue: string) => void;
  onDelete: () => void;
}

export interface CategoryColors {
  [key in MetricCategory]: string;
}