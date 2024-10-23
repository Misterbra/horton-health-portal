import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Brain, AlertCircle, LineChart, Microscope, ArrowRight } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ScientificDetail {
  title: string;
  content: string[];
}

const ScientificView = () => {
  const [showDetails, setShowDetails] = useState<{[key: string]: boolean}>({
    mechanisms: false,
    diagnosis: false,
    evolution: false,
    research: false
  });

  const mechanismDetails: ScientificDetail[] = [
    {
      title: "Processus inflammatoire",
      content: [
        "Infiltration lymphocytaire T CD4+ de la paroi artérielle",
        "Production de cytokines pro-inflammatoires (IL-6, IL-17, IFN-γ)",
        "Activation des cellules dendritiques et des macrophages",
        "Remodelage vasculaire avec hyperplasie intimale"
      ]
    },
    {
      title: "Facteurs de risque",
      content: [
        "Âge > 50 ans",
        "Prédisposition génétique (HLA-DRB1*04)",
        "Sexe féminin (ratio F/H : 3/1)",
        "Facteurs environnementaux suspectés"
      ]
    }
  ];

  const diagnosticCriteria = [
    {
      category: "Critères ACR 1990",
      items: [
        "Âge ≥ 50 ans au début de la maladie",
        "Céphalées d'apparition récente ou de type nouveau",
        "Anomalie de l'artère temporale à la palpation",
        "VS ≥ 50 mm à la première heure",
        "Biopsie d'artère temporale montrant une vascularite"
      ],
      note: "Au moins 3 critères sur 5 sont nécessaires pour le diagnostic"
    },
    {
      category: "Examens complémentaires",
      items: [
        "Biopsie d'artère temporale (gold standard)",
        "Imagerie : écho-doppler, angio-IRM, TEP-scanner",
        "Bilan biologique inflammatoire",
        "Recherche de complications associées"
      ]
    }
  ];

  const evolutionData = {
    phases: [
      {
        name: "Phase initiale",
        characteristics: [
          "Installation progressive des symptômes",
          "Risque de complications ophtalmologiques",
          "Nécessité d'un diagnostic et traitement rapides"
        ]
      },
      {
        name: "Sous traitement",
        characteristics: [
          "Amélioration rapide des symptômes sous corticoïdes",
          "Décroissance progressive sur 18-24 mois",
          "Surveillance étroite des rechutes"
        ]
      },
      {
        name: "Long terme",
        characteristics: [
          "Risque de rechute : 40-50% des cas",
          "Complications possibles de la corticothérapie",
          "Nécessité d'un suivi prolongé"
        ]
      }
    ]
  };

  const recentResearch = [
    {
      title: "Biomarqueurs",
      findings: [
        "Identification de nouvelles signatures moléculaires",
        "Recherche de marqueurs prédictifs de rechute",
        "Étude des microARN circulants"
      ]
    },
    {
      title: "Thérapeutiques",
      findings: [
        "Développement de biothérapies ciblées",
        "Études sur la réduction de la durée de corticothérapie",
        "Essais cliniques sur nouveaux immunomodulateurs"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="mr-2 h-5 w-5" />
            Comprendre la Maladie de Horton
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="mecanismes">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="mecanismes">Mécanismes</TabsTrigger>
              <TabsTrigger value="diagnostic">Diagnostic</TabsTrigger>
              <TabsTrigger value="evolution">Évolution</TabsTrigger>
              <TabsTrigger value="recherche">Recherches</TabsTrigger>
            </TabsList>

            <TabsContent value="mecanismes">
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Mécanisme de la Maladie</h3>
                  <p className="text-sm leading-relaxed">
                    La maladie de Horton est une vascularite des vaisseaux de moyen et gros calibre,
                    touchant préférentiellement les artères temporales et les branches de la carotide externe.
                    Une réaction immunitaire complexe conduit à l'inflammation et au remodelage vasculaire.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => setShowDetails({...showDetails, mechanisms: !showDetails.mechanisms})}
                  >
                    {showDetails.mechanisms ? "Moins de détails" : "Plus de détails"}
                  </Button>
                  
                  {showDetails.mechanisms && (
                    <div className="mt-6 space-y-4">
                      {mechanismDetails.map((detail, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-md">
                          <h4 className="font-medium mb-2">{detail.title}</h4>
                          <ul className="list-disc list-inside space-y-1">
                            {detail.content.map((item, idx) => (
                              <li key={idx} className="text-sm text-gray-600 dark:text-gray-400">
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="diagnostic">
              <div className="space-y-4">
                {diagnosticCriteria.map((criteria, index) => (
                  <div key={index} className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                    <h3 className="text-lg font-medium mb-4">{criteria.category}</h3>
                    <ul className="list-disc list-inside space-y-2">
                      {criteria.items.map((item, idx) => (
                        <li key={idx} className="text-sm text-gray-600 dark:text-gray-400">
                          {item}
                        </li>
                      ))}
                    </ul>
                    {criteria.note && (
                      <Alert className="mt-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{criteria.note}</AlertDescription>
                      </Alert>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="evolution">
              <div className="space-y-4">
                {evolutionData.phases.map((phase, index) => (
                  <div key={index} className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
                    <h3 className="text-lg font-medium mb-4 flex items-center">
                      <LineChart className="mr-2 h-4 w-4" />
                      {phase.name}
                    </h3>
                    <ul className="space-y-2">
                      {phase.characteristics.map((char, idx) => (
                        <li key={idx} className="flex items-start text-sm">
                          <ArrowRight className="mr-2 h-4 w-4 mt-0.5 flex-shrink-0" />
                          <span>{char}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="recherche">
              <div className="space-y-4">
                {recentResearch.map((research, index) => (
                  <div key={index} className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-lg">
                    <h3 className="text-lg font-medium mb-4 flex items-center">
                      <Microscope className="mr-2 h-4 w-4" />
                      {research.title}
                    </h3>
                    <ul className="space-y-2">
                      {research.findings.map((finding, idx) => (
                        <li key={idx} className="flex items-start text-sm">
                          <ArrowRight className="mr-2 h-4 w-4 mt-0.5 flex-shrink-0" />
                          <span>{finding}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScientificView;