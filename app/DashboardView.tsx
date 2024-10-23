import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DynamicLineChart } from '../components/charts/DynamicLineChart';

// Type definitions
export interface SymptomLog {
  date: string;
  intensity: number;
  symptom: string;
  notes?: string;
}

export interface DashboardViewProps {
  symptomLogs: SymptomLog[];
}

const DashboardView = ({ symptomLogs }: DashboardViewProps) => {
  const recentSymptoms = symptomLogs.slice(-5).reverse();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Résumé rapide */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Aperçu Général</CardTitle>
        </CardHeader>
        <CardContent>
          <DynamicLineChart data={symptomLogs} />
        </CardContent>
      </Card>

      {/* Prochaines actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions Prioritaires</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentSymptoms.map((log, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  log.intensity > 7 ? 'bg-red-500' :
                  log.intensity > 4 ? 'bg-yellow-500' :
                  'bg-green-500'
                }`} />
                <span>{new Date(log.date).toLocaleDateString()}</span>
                <span className="text-sm text-gray-500">
                  Intensité: {log.intensity}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Traitements en cours */}
      <Card className="md:col-span-3">
        <CardHeader>
          <CardTitle>Traitements Actuels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-medium">Corticoïdes</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Suivre la prescription médicale
              </p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h3 className="font-medium">Compléments</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Calcium + Vitamine D
              </p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h3 className="font-medium">Approches naturelles</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Exercices + Alimentation anti-inflammatoire
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardView;