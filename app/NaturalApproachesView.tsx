import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Leaf } from "lucide-react"

// Type definitions
interface DietaryItem {
  name: string;
  sources?: string[];
  benefits?: string;
  dosage?: string;
  usage?: string;
  precautions?: string;
  importance?: string;
  timing?: string;
}

interface DietaryCategory {
  category: string;
  items: DietaryItem[];
}

interface LifestyleRecommendation {
  type: string;
  frequency?: string;
  benefits: string;
  precautions?: string;
}

interface LifestyleCategory {
  category: string;
  recommendations: LifestyleRecommendation[];
}

interface NaturalApproaches {
  dietary: DietaryCategory[];
  lifestyle: LifestyleCategory[];
}

const NaturalApproachesView = () => {
  const naturalApproaches: NaturalApproaches = {
    dietary: [
      {
        category: "Aliments Anti-inflammatoires",
        items: [
          {
            name: "Oméga-3",
            sources: ["Poissons gras", "Graines de lin", "Noix"],
            benefits: "Réduction de l'inflammation",
            dosage: "2-3 portions par semaine"
          },
          {
            name: "Curcuma",
            benefits: "Puissant anti-inflammatoire naturel",
            usage: "1-3g par jour avec du poivre noir",
            precautions: "Consulter avant usage si sous anticoagulants"
          },
          {
            name: "Gingembre",
            benefits: "Propriétés anti-inflammatoires",
            usage: "Frais ou en complément"
          }
        ]
      },
      {
        category: "Compléments Alimentaires",
        items: [
          {
            name: "Vitamine D",
            dosage: "En fonction du taux sanguin",
            importance: "Crucial sous corticoïdes"
          },
          {
            name: "Calcium",
            dosage: "1000-1200mg/jour",
            timing: "À distance des corticoïdes"
          },
          {
            name: "Magnésium",
            benefits: "Réduction fatigue et stress",
            dosage: "300-400mg/jour"
          }
        ]
      }
    ],
    lifestyle: [
      {
        category: "Activité Physique Adaptée",
        recommendations: [
          {
            type: "Marche douce",
            frequency: "30 minutes/jour",
            benefits: "Circulation et moral"
          },
          {
            type: "Yoga adapté",
            benefits: "Souplesse et relaxation",
            precautions: "Éviter positions tête en bas"
          },
          {
            type: "Natation",
            benefits: "Sport complet sans impact",
            frequency: "2-3 fois/semaine"
          }
        ]
      }
    ]
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Leaf className="mr-2 h-5 w-5" />
            Approches Naturelles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="alimentation">
            <TabsList>
              <TabsTrigger value="alimentation">Alimentation</TabsTrigger>
              <TabsTrigger value="complements">Compléments</TabsTrigger>
              <TabsTrigger value="lifestyle">Mode de Vie</TabsTrigger>
              <TabsTrigger value="meditation">Méditation & Stress</TabsTrigger>
            </TabsList>

            <TabsContent value="alimentation">
              <div className="grid gap-6">
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Aliments Recommandés</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {naturalApproaches.dietary[0].items.map((item, index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                        <h4 className="font-medium text-green-700 dark:text-green-300">{item.name}</h4>
                        {item.sources && (
                          <p className="text-sm mt-2">
                            Sources: {item.sources.join(', ')}
                          </p>
                        )}
                        <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">
                          {item.benefits}
                        </p>
                        {item.dosage && (
                          <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">
                            Dosage: {item.dosage}
                          </p>
                        )}
                        {item.precautions && (
                          <p className="text-sm mt-1 text-yellow-600 dark:text-yellow-400">
                            ⚠️ {item.precautions}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Aliments à Éviter</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <li className="flex items-center space-x-2">
                      <span className="text-red-500">•</span>
                      <span>Aliments transformés riches en sel</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-red-500">•</span>
                      <span>Sucres raffinés</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-red-500">•</span>
                      <span>Alcool</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-red-500">•</span>
                      <span>Excès de café</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="complements">
              <div className="grid gap-4">
                {naturalApproaches.dietary[1].items.map((item, index) => (
                  <div key={index} className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h3 className="font-medium text-blue-700 dark:text-blue-300">
                      {item.name}
                    </h3>
                    <div className="mt-2 space-y-2">
                      <p className="text-sm">Dosage: {item.dosage}</p>
                      {item.benefits && (
                        <p className="text-sm">{item.benefits}</p>
                      )}
                      {item.importance && (
                        <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                          Important: {item.importance}
                        </p>
                      )}
                      {item.timing && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Timing: {item.timing}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="lifestyle">
              <div className="space-y-6">
                {naturalApproaches.lifestyle.map((section, index) => (
                  <div key={index} className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
                    <h3 className="text-lg font-medium mb-4">{section.category}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {section.recommendations.map((rec, idx) => (
                        <div key={idx} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                          <h4 className="font-medium text-purple-700 dark:text-purple-300">
                            {rec.type}
                          </h4>
                          <p className="text-sm mt-2">{rec.benefits}</p>
                          {rec.frequency && (
                            <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">
                              Fréquence: {rec.frequency}
                            </p>
                          )}
                          {rec.precautions && (
                            <p className="text-sm mt-1 text-yellow-600 dark:text-yellow-400">
                              ⚠️ {rec.precautions}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="meditation">
              <div className="grid gap-6">
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Techniques de Relaxation</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                      <h4 className="font-medium text-indigo-700 dark:text-indigo-300">
                        Méditation Pleine Conscience
                      </h4>
                      <p className="text-sm mt-2">
                        Pratiquez 10-15 minutes par jour pour réduire le stress et l'anxiété.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default NaturalApproachesView;