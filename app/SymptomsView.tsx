import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SymptomLog {
  date: string;
  intensity: number;
  symptoms: string[];
  notes: string;
}

interface SymptomOption {
  id: string;
  label: string;
}

const SymptomsView = ({ 
  logs, 
  onLogSymptom 
}: { 
  logs: SymptomLog[],
  onLogSymptom: (log: SymptomLog) => void 
}) => {
  const [newLog, setNewLog] = useState<Partial<SymptomLog>>({
    date: new Date().toISOString().split('T')[0],
    intensity: 0,
    symptoms: [],
    notes: ''
  });

  const symptomsOptions: SymptomOption[] = [
    { id: 'vision', label: 'Troubles de la vision' },
    { id: 'headache', label: 'Maux de tête' },
    { id: 'jaw', label: 'Douleurs mâchoire' },
    { id: 'fatigue', label: 'Fatigue' },
    { id: 'muscle', label: 'Douleurs musculaires' }
  ];

  // Fonction pour déterminer la variante du badge en fonction de l'intensité
  const getIntensityVariant = (intensity: number): "default" | "destructive" | "outline" | "secondary" => {
    if (intensity > 7) return "destructive";
    if (intensity > 4) return "secondary";
    return "default";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Enregistrer les Symptômes</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => {
            e.preventDefault();
            onLogSymptom(newLog as SymptomLog);
            setNewLog({
              date: new Date().toISOString().split('T')[0],
              intensity: 0,
              symptoms: [],
              notes: ''
            });
          }} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Date</label>
              <Input
                type="date"
                value={newLog.date}
                onChange={(e) => setNewLog({...newLog, date: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium">Intensité (1-10)</label>
              <input
                type="range"
                min="0"
                max="10"
                value={newLog.intensity}
                onChange={(e) => setNewLog({...newLog, intensity: Number(e.target.value)})}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Symptômes</label>
              <div className="space-y-2">
                {symptomsOptions.map((symptom) => (
                  <label key={symptom.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newLog.symptoms?.includes(symptom.id)}
                      onChange={(e) => {
                        const symptoms = e.target.checked
                          ? [...(newLog.symptoms || []), symptom.id]
                          : (newLog.symptoms || []).filter(s => s !== symptom.id);
                        setNewLog({...newLog, symptoms});
                      }}
                      className="mr-2"
                    />
                    {symptom.label}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">Notes</label>
              <textarea
                value={newLog.notes}
                onChange={(e) => setNewLog({...newLog, notes: e.target.value})}
                className="w-full mt-1 rounded-md border-gray-300"
                rows={3}
              />
            </div>

            <Button type="submit">Enregistrer</Button>
          </form>
        </CardContent>
      </Card>

      {/* Historique des symptômes */}
      <Card>
        <CardHeader>
          <CardTitle>Historique</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {logs.map((log, index) => (
              <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">
                    {new Date(log.date).toLocaleDateString()}
                  </span>
                  <Badge variant={getIntensityVariant(log.intensity)}>
                    Intensité: {log.intensity}
                  </Badge>
                </div>
                <div className="mt-2">
                  <div className="flex flex-wrap gap-2">
                    {log.symptoms.map((symptom) => (
                      <Badge key={symptom} variant="outline">
                        {symptomsOptions.find(s => s.id === symptom)?.label}
                      </Badge>
                    ))}
                  </div>
                </div>
                {log.notes && (
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {log.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SymptomsView;