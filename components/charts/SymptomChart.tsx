import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SymptomLogData {
  id: string;
  date: string;
  intensity: number;
  symptoms: string[];
  notes: string;
  medications: string[];
}

interface SymptomChartProps {
  data: SymptomLogData[];
}

const SymptomChart: React.FC<SymptomChartProps> = ({ data }) => {
  const chartData = data.map(log => ({
    date: new Date(log.date).toLocaleDateString('fr-FR'),
    intensity: log.intensity
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis domain={[0, 10]} />
        <Tooltip />
        <Line 
          type="monotone" 
          dataKey="intensity" 
          stroke="#8884d8" 
          strokeWidth={2}
          dot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SymptomChart;