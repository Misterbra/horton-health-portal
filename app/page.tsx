"use client"

import React, { useState, useEffect, ChangeEvent } from 'react';
import { 
  AlertCircle, Calendar, Activity, Phone, 
  BookOpen, ChevronDown, ChevronRight, Settings, 
  Bell, BookMarked, Leaf, Brain, LineChart,
  Sun, Moon, Search, BarChart3, FileText,
  Clock, Heart, Info
} from 'lucide-react';

// Importations individuelles des composants shadcn/ui
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

import { useLocalStorage } from '@/hooks/useLocalStorage';
import dynamic from 'next/dynamic';

const DynamicLineChart = dynamic(
  () => import('@/components/charts/SymptomChart'),
  { ssr: false }
);

interface UserPreferences {
  darkMode: boolean;
  notifications: boolean;
  language: 'fr' | 'en';
  fontSize: 'normal' | 'large';
}

interface SymptomLog {
  id: string;
  date: string;
  intensity: number;
  symptoms: string[];
  notes: string;
  medications: string[];
  triggers?: string[];
}

const initialPreferences: UserPreferences = {
  darkMode: false,
  notifications: true,
  language: 'fr',
  fontSize: 'normal'
};

const EmergencyAlert = () => (
  <Alert variant="destructive" className="mb-6">
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>En cas d'urgence</AlertTitle>
    <AlertDescription>
      Si vous ressentez des symptômes sévères ou inhabituels, contactez immédiatement votre médecin 
      ou composez le 15/112 (SAMU).
    </AlertDescription>
  </Alert>
);

const DashboardView = ({ symptomLogs }: { symptomLogs: SymptomLog[] }) => {
  const recentLogs = symptomLogs.slice(-7);
  
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Aperçu des Symptômes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DynamicLineChart data={recentLogs} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Prochain Rendez-vous
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <p className="text-lg font-semibold">Dr. Martin</p>
            <p className="text-gray-600 dark:text-gray-400">15 Novembre 2024</p>
            <Badge variant="outline" className="w-fit">14:30</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Traitement Actuel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <Badge>Prednisone</Badge>
              <span>10mg/jour</span>
            </li>
            <li className="flex items-center gap-2">
              <Badge variant="outline">Méthotrexate</Badge>
              <span>15mg/semaine</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

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
    medications: [],
    notes: ''
  });

  const symptomOptions = [
    "Maux de tête", "Douleur temporale", "Fatigue",
    "Raideur de la nuque", "Troubles visuels", "Fièvre"
  ];

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewLog({...newLog, date: e.target.value});
  };

  const handleIntensityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewLog({...newLog, intensity: parseInt(e.target.value, 10)});
  };

  const handleSymptomSelect = (value: string) => {
    setNewLog({
      ...newLog,
      symptoms: [...(newLog.symptoms || []), value]
    });
  };

  const handleNotesChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewLog({...newLog, notes: e.target.value});
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Ajouter un Journal de Symptômes</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block mb-2">Date</label>
                <Input
                  type="date"
                  value={newLog.date}
                  onChange={handleDateChange}
                />
              </div>
              <div>
                <label className="block mb-2">Intensité (1-10)</label>
                <Input
                  type="number"
                  min="0"
                  max="10"
                  value={newLog.intensity}
                  onChange={handleIntensityChange}
                />
              </div>
            </div>
            
            <div>
              <label className="block mb-2">Symptômes</label>
              <Select onValueChange={handleSymptomSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez les symptômes" />
                </SelectTrigger>
                <SelectContent>
                  {symptomOptions.map((symptom) => (
                    <SelectItem key={symptom} value={symptom}>
                      {symptom}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block mb-2">Notes</label>
              <Input
                type="text"
                value={newLog.notes}
                onChange={handleNotesChange}
                className="h-24"
              />
            </div>

            <Button
              type="button"
              onClick={() => {
                if (newLog.date && typeof newLog.intensity === 'number') {
                  onLogSymptom({
                    id: Date.now().toString(),
                    date: newLog.date,
                    intensity: newLog.intensity,
                    symptoms: newLog.symptoms || [],
                    medications: newLog.medications || [],
                    notes: newLog.notes || ''
                  });
                  setNewLog({
                    date: new Date().toISOString().split('T')[0],
                    intensity: 0,
                    symptoms: [],
                    medications: [],
                    notes: ''
                  });
                }
              }}
            >
              Enregistrer
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Historique des Symptômes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {logs.map((log) => (
              <div key={log.id} className="border-b pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{new Date(log.date).toLocaleDateString('fr-FR')}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Intensité: {log.intensity}/10
                    </p>
                  </div>
                  <div className="flex gap-2 flex-wrap justify-end">
                    {log.symptoms.map((symptom) => (
                      <Badge key={symptom} variant="outline">
                        {symptom}
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

const HortonDiseasePage = () => {
  const [preferences, setPreferences] = useLocalStorage<UserPreferences>(
    'userPreferences',
    initialPreferences
  );
  const [symptomLogs, setSymptomLogs] = useLocalStorage<SymptomLog[]>(
    'symptomLogs',
    []
  );
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', preferences.darkMode);
  }, [preferences.darkMode]);

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${preferences.darkMode ? 'dark' : ''}`}>
      <nav className="fixed top-0 w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Portail Maladie de Horton
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Rechercher..."
                  className="pl-10 w-64"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPreferences({
                  ...preferences,
                  darkMode: !preferences.darkMode
                })}
              >
                {preferences.darkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-10 h-10 p-0"
              >
                <Bell className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-10 h-10 p-0"
              >
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EmergencyAlert />
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8">
              <TabsTrigger value="dashboard">
                <BarChart3 className="h-4 w-4 mr-2" />
                Tableau de bord
              </TabsTrigger>
              <TabsTrigger value="symptoms">
                <Activity className="h-4 w-4 mr-2" />
                Symptômes & Suivi
              </TabsTrigger>
              <TabsTrigger value="treatments">
                <FileText className="h-4 w-4 mr-2" />
                Traitements
              </TabsTrigger>
              <TabsTrigger value="natural">
                <Leaf className="h-4 w-4 mr-2" />
                Approches Naturelles
              </TabsTrigger>
              <TabsTrigger value="science">
                <Brain className="h-4 w-4 mr-2" />
                Comprendre la Maladie
              </TabsTrigger>
              <TabsTrigger value="resources">
                <Info className="h-4 w-4 mr-2" />
                Ressources
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <DashboardView symptomLogs={symptomLogs} />
            </TabsContent>

            <TabsContent value="symptoms">
              <SymptomsView 
                logs={symptomLogs}
                onLogSymptom={(log) => setSymptomLogs([...symptomLogs, log])}
              />
            </TabsContent>

            <TabsContent value="treatments">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Traitements Actuels</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Contenu des traitements */}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="natural">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Approches Complémentaires</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Contenu des approches naturelles */}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="science">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>La Science derrière la Maladie</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Contenu scientifique */}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="resources">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Ressources Utiles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <h3 className="font-semibold">Associations de Patients</h3>
                      <ul className="list-disc pl-4 space-y-2">
                        <li>Association France Vascularites</li>
                        <li>Alliance Maladies Rares</li>
                      </ul>
                      
                      <h3 className="font-semibold mt-6">Documentation Médicale</h3>
                      <ul className="list-disc pl-4 space-y-2">
                        <li>Guide HAS - Protocole National de Diagnostic et de Soins</li>
                        <li>Orphanet - Maladie de Horton</li>
                      </ul>
                      
                      <h3 className="font-semibold mt-6">Contacts Utiles</h3>
                      <ul className="list-disc pl-4 space-y-2">
                        <li>Centre de Référence des Maladies Auto-immunes Systémiques Rares</li>
                        <li>Ligne d'urgence 24/7</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Médias et Publications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <h3 className="font-semibold">Dernières Publications</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start space-x-3">
                          <BookMarked className="h-5 w-5 mt-1 flex-shrink-0" />
                          <span>Nouvelles recommandations de traitement (2024)</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <BookMarked className="h-5 w-5 mt-1 flex-shrink-0" />
                          <span>Études sur les biomarqueurs</span>
                        </li>
                      </ul>
                      
                      <h3 className="font-semibold mt-6">Vidéos Éducatives</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start space-x-3">
                          <Phone className="h-5 w-5 mt-1 flex-shrink-0" />
                          <span>Comprendre la maladie de Horton en 3 minutes</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <Phone className="h-5 w-5 mt-1 flex-shrink-0" />
                          <span>Témoignages de patients</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2024 Portail Maladie de Horton. Tous droits réservés.
            </p>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                Mentions légales
              </Button>
              <Button variant="ghost" size="sm">
                Politique de confidentialité
              </Button>
              <Button variant="ghost" size="sm">
                Contact
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HortonDiseasePage;