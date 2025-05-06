import { TreeDeciduous, Users, Building2, Droplets, Wind, Shield } from 'lucide-react';

export const metricsList = [
  {
    title: 'Carbon Emissions',
    description: 'Measures the total greenhouse gas emissions produced by company operations, including direct and indirect emissions.',
    icon: <TreeDeciduous className="w-8 h-8" />
  },
  {
    title: 'Water Usage',
    description: 'Tracks the total water consumption and efficiency measures implemented across all operations.',
    icon: <Droplets className="w-8 h-8" />
  },
  {
    title: 'Renewable Energy',
    description: 'Percentage of energy sourced from renewable sources like solar, wind, and hydroelectric power.',
    icon: <Wind className="w-8 h-8" />
  },
  {
    title: 'Employee Diversity',
    description: 'Measures workforce diversity across various dimensions including gender, ethnicity, and age groups.',
    icon: <Users className="w-8 h-8" />
  },
  {
    title: 'Corporate Governance',
    description: 'Evaluates the effectiveness of board structure, executive compensation, and shareholder rights.',
    icon: <Building2 className="w-8 h-8" />
  },
  {
    title: 'Data Security',
    description: 'Assesses the robustness of data protection measures and cybersecurity protocols.',
    icon: <Shield className="w-8 h-8" />
  }
];