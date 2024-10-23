import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pill } from 'lucide-react';

// Définition des types
interface TreatmentPhase {
  phase: string;
  dosage?: string;
  duration: string;
  notes?: string;
  milestones?: string[];
}

interface TreatmentOption {
  name: string;
  usage: string;
  dosage?: string;
  administration?: string;
}

interface ConventionalTreatment {
  name: string;
  details?: TreatmentPhase[];
  precautions?: string[];
  options?: TreatmentOption[];
}

interface TreatmentLog {
  date: string;
  medication: string;
  dosage: string;
  notes?: string;
}

const TreatmentsView = () => {
  const [treatmentLogs, setTreatmentLogs] = useState<TreatmentLog[]>([]);
  const [newLog, setNewLog] = useState<TreatmentLog>({
    date: new Date().toISOString().split('T')[0],
    medication: '',
    dosage: '',
    notes: ''
  });

  const treatments: { conventional: ConventionalTreatment[] } = {
    conventional: [
      {
        name: "Corticothérapie",
        details: [
          {
            phase: "Attaque",
            dosage: "0.7 à 1mg/kg/jour",
            duration: "2-4 semaines",
            notes: "Jusqu'à rémission clinique et biologique"
          },
          {
            phase: "Décroissance progressive",
            milestones: [
              "15-20mg à 3 mois",
              "10mg à 6 mois",
              "5mg à 12 mois"
            ],
            duration: "18-24 mois total"
          }
        ],
        precautions: [
          "Ne jamais arrêter brutalement",
          "Surveillance glycémie et tension",
          "Protection gastrique si nécessaire",
          "Supplémentation calcium et vitamine D"
        ]
      },
      {
        name: "Traitements d'épargne cortisonique",
        options: [
          {
            name: "Méthotrexate",
            usage: "En cas de corticodépendance",
            dosage: "Selon prescription médicale"
          },
          {
            name: "Tocilizumab",
            usage: "Formes réfractaires",
            administration: "Injection sous-cutanée"
          }
        ]
      }
    ]
  };

  const handleAddTreatmentLog = (e: React.FormEvent) => {
    e.preventDefault();
    setTreatmentLogs([...treatmentLogs, newLog]);
    setNewLog({
      date: new Date().toISOString().split('T')[0],
      medication: '',
      dosage: '',
      notes: ''
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Pill className="mr-2 h-5 w-5" />
            Traitements Médicamenteux
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="corticoides">
            <TabsList>
              <TabsTrigger value="corticoides">Corticoïdes</TabsTrigger>
              <TabsTrigger value="epargne">Épargne Cortisonique</TabsTrigger>
              <TabsTrigger value="surveillance">Surveillance</TabsTrigger>
            </TabsList>

            <TabsContent value="corticoides">
              <div className="grid gap-4">
                {treatments.conventional[0].details?.map((phase, index) => (
                  <div key={index} className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h3 className="font-medium text-lg mb-2">{phase.phase}</h3>
                    <div className="space-y-2">
                      {phase.dosage && (
                        <p className="text-sm">Dosage: {phase.dosage}</p>
                      )}
                      {phase.duration && (
                        <p className="text-sm">Durée: {phase.duration}</p>
                      )}
                      {phase.milestones && (
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Objectifs :</p>
                          <ul className="list-disc list-inside text-sm">
                            {phase.milestones.map((milestone, idx) => (
                              <li key={idx}>{milestone}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <h3 className="font-medium text-lg mb-2">Précautions importantes</h3>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {treatments.conventional[0].precautions?.map((precaution, index) => (
                      <li key={index}>{precaution}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="epargne">
              <div className="grid gap-4">
                {treatments.conventional[1].options?.map((option, index) => (
                  <div key={index} className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <h3 className="font-medium text-lg mb-2">{option.name}</h3>
                    <p className="text-sm">Usage: {option.usage}</p>
                    {option.administration && (
                      <p className="text-sm mt-1">Administration: {option.administration}</p>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="surveillance">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Suivi Biologique</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc list-inside space-y-2">
                        <li>NFS, CRP tous les mois</li>
                        <li>Glycémie à jeun</li>
                        <li>Bilan lipidique</li>
                        <li>Fonction rénale</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Suivi Clinique</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Tension artérielle</li>
                        <li>Poids</li>
                        <li>Examen ophtalmologique</li>
                        <li>Densitométrie osseuse</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Journal de Traitement Interactif</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddTreatmentLog} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <Input
                  type="date"
                  value={newLog.date}
                  onChange={(e) => setNewLog({...newLog, date: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Médicament</label>
                <Input
                  type="text"
                  value={newLog.medication}
                  onChange={(e) => setNewLog({...newLog, medication: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Dosage</label>
                <Input
                  type="text"
                  value={newLog.dosage}
                  onChange={(e) => setNewLog({...newLog, dosage: e.target.value})}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Notes</label>
              <textarea
                className="w-full rounded-md border border-gray-300 p-2"
                value={newLog.notes}
                onChange={(e) => setNewLog({...newLog, notes: e.target.value})}
                rows={2}
              />
            </div>
            <Button type="submit">Ajouter une entrée</Button>
          </form>

          <div className="mt-6 space-y-4">
            {treatmentLogs.map((log, index) => (
              <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{log.medication}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Dosage: {log.dosage}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">
                    {new Date(log.date).toLocaleDateString()}
                  </p>
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

export default TreatmentsView;