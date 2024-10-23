import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface SymptomLog {
  date: string;
  intensity: number;
  symptom: string;
  notes?: string;
}

interface DynamicLineChartProps {
  data: SymptomLog[];
}

export const DynamicLineChart: React.FC<DynamicLineChartProps> = ({ data }) => {
  const formattedData = data.map(log => ({
    ...log,
    date: new Date(log.date).toLocaleDateString(),
  }));

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={formattedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(value) => value}
          />
          <YAxis
            domain={[0, 10]}
            tickCount={6}
            label={{ value: 'Intensité', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="intensity"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            name="Intensité"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};