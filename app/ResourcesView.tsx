import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Phone, Building2, FileText, AlertCircle } from 'lucide-react';

// Type definitions
interface Association {
  name: string;
  description: string;
  website?: string;
  contact?: string;
  services?: string[];
  available?: string;
}

interface MedicalLocation {
  name: string;
  address: string;
  speciality: string;
  contact: string;
}

interface MedicalCenter {
  type: string;
  locations: MedicalLocation[];
}

interface Document {
  title: string;
  format: string;
  description: string;
  downloadLink: string;
}

interface Resources {
  associations: Association[];
  medical: MedicalCenter[];
  documents: Document[];
}

const ResourcesView: React.FC = () => {
  const resources: Resources = {
    associations: [
      {
        name: "France Vascularite",
        description: "Association nationale de soutien aux patients",
        website: "www.france-vascularite.fr",
        contact: "+33 X XX XX XX XX",
        services: [
          "Groupes de parole",
          "Documentation",
          "Accompagnement administratif",
          "Ateliers d'éducation thérapeutique"
        ]
      },
      {
        name: "SOS Horton",
        description: "Ligne d'urgence et conseil",
        contact: "15 ou numéro dédié",
        available: "24h/24, 7j/7"
      }
    ],
    medical: [
      {
        type: "Centres de référence",
        locations: [
          {
            name: "Hôpital X",
            address: "Paris",
            speciality: "Centre expert vascularites",
            contact: "+33 X XX XX XX XX"
          }
        ]
      }
    ],
    documents: [
      {
        title: "Guide du Patient",
        format: "PDF",
        description: "Information complète sur la maladie",
        downloadLink: "#"
      },
      {
        title: "Carnet de suivi",
        format: "PDF",
        description: "Pour noter vos symptômes",
        downloadLink: "#"
      }
    ]
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Ressources et Support
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="associations">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="associations">Associations</TabsTrigger>
              <TabsTrigger value="medical">Centres Médicaux</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="urgences">Urgences</TabsTrigger>
            </TabsList>

            <TabsContent value="associations">
              <div className="grid gap-6">
                {resources.associations.map((assoc, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-medium text-blue-700 dark:text-blue-300">
                      {assoc.name}
                    </h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      {assoc.description}
                    </p>
                    {assoc.services && (
                      <div className="mt-4">
                        <h4 className="font-medium mb-2">Services proposés :</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          {assoc.services.map((service, idx) => (
                            <li key={idx} className="text-gray-600 dark:text-gray-400">
                              {service}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="mt-4 flex items-center space-x-4">
                      {assoc.website && (
                        <a
                          href={assoc.website}
                          className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FileText className="h-4 w-4" />
                          Site web
                        </a>
                      )}
                      {assoc.contact && (
                        <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          Contact: {assoc.contact}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="medical">
              <div className="grid gap-6">
                {resources.medical.map((center, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-medium text-green-700 dark:text-green-300">
                      {center.type}
                    </h3>
                    <div className="mt-4 space-y-4">
                      {center.locations.map((location, idx) => (
                        <div key={idx} className="border-l-4 border-green-500 pl-4">
                          <h4 className="font-medium">{location.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {location.address}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {location.speciality}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2 mt-2">
                            <Phone className="h-4 w-4" />
                            {location.contact}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="documents">
              <div className="grid gap-6">
                {resources.documents.map((doc, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <h3 className="text-lg font-medium">{doc.title}</h3>
                    </div>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      {doc.description}
                    </p>
                    <div className="mt-4">
                      <a
                        href={doc.downloadLink}
                        className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Télécharger ({doc.format})
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="urgences">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  En cas d'urgence, composez le 15 ou contactez directement votre centre de référence.
                  Pour les urgences ophtalmologiques, rendez-vous immédiatement aux urgences les plus proches.
                </AlertDescription>
              </Alert>
              <div className="mt-6 bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-red-700 dark:text-red-300">
                  Signes d'alerte
                </h3>
                <ul className="mt-4 space-y-2 list-disc list-inside">
                  <li>Perte brutale de la vision</li>
                  <li>Diplopie (vision double)</li>
                  <li>Douleur temporale intense</li>
                  <li>Fièvre élevée persistante</li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourcesView;