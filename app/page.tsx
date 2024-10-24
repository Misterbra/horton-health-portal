"use client"

import React, { useState, useEffect } from 'react';
import { LucideIcon } from 'lucide-react';
import { 
  Activity, Brain, BookOpen, Leaf, 
  Sun, Moon, Clock,
  Menu, X, ChevronRight, Heart, Shield,
  Zap, Coffee, Battery, Star, Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Composants UI
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Types
interface EnhancedCardProps {
  title: string;
  icon: LucideIcon;
  gradient?: string;
  children: React.ReactNode;
}

interface InfoTooltipProps {
  content: string;
  children: React.ReactNode;
}

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

interface TimelineItemProps {
  title: string;
  date: string;
  description: string;
  icon: LucideIcon;
  isActive: boolean;
}

// Constantes
const COLORS = {
  primary: 'from-blue-500 to-indigo-600',
  secondary: 'from-purple-500 to-pink-500',
  success: 'from-green-500 to-emerald-600',
  warning: 'from-yellow-400 to-orange-500',
  danger: 'from-red-500 to-rose-600',
  info: 'from-cyan-500 to-blue-500'
};

// Animations
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

// Composants de base
const EnhancedCard: React.FC<EnhancedCardProps> = ({ 
  title, 
  icon: Icon, 
  gradient = COLORS.primary,
  children 
}) => (
  <motion.div
    initial="initial"
    whileInView="animate"
    viewport={{ once: true }}
    variants={fadeIn}
    className="relative"
  >
    <Card className={`
      overflow-hidden
      transition-all duration-300
      hover:shadow-xl hover:-translate-y-1
      bg-gradient-to-br ${gradient}
      text-white
    `}>
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Icon size={80} />
      </div>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon size={24} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  </motion.div>
);

const InfoTooltip: React.FC<InfoTooltipProps> = ({ content, children }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        {children}
      </TooltipTrigger>
      <TooltipContent className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-3 rounded-lg shadow-xl">
        {content}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

// Composant Timeline
const TimelineItem: React.FC<TimelineItemProps> = ({ 
  title, 
  date, 
  description, 
  icon: Icon, 
  isActive 
}) => (
  <motion.div 
    variants={fadeIn}
    className={`
      relative pl-8 pb-8 border-l-2
      ${isActive ? 'border-blue-500' : 'border-gray-200 dark:border-gray-700'}
    `}
  >
    <div className={`
      absolute left-[-9px] p-1 rounded-full
      ${isActive ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'}
    `}>
      <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-gray-500'}`} />
    </div>
    <div className="space-y-2">
      <p className="text-sm text-gray-500 dark:text-gray-400">{date}</p>
      <h4 className="font-medium">{title}</h4>
      <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  </motion.div>
);

// Navigation Mobile
const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose, activeTab, setActiveTab }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: "spring", bounce: 0.25 }}
        className="fixed inset-y-0 right-0 w-64 bg-white dark:bg-gray-800 shadow-2xl z-50"
      >
        <div className="p-4">
          <button 
            onClick={onClose}
            className="mb-8 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="space-y-4">
            {[
              { id: 'practical', label: 'Guide Pratique', icon: Clock },
              { id: 'research', label: 'Recherches', icon: Brain },
              { id: 'protocol', label: 'Protocole', icon: Leaf }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  onClose();
                }}
                className={`
                  w-full px-4 py-2 rounded-lg text-left flex items-center gap-3
                  transition-all duration-200
                  ${activeTab === tab.id 
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }
                `}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

// Section Protocole
const ProtocolSection: React.FC = () => (
  <div className="space-y-8">
    <motion.div variants={fadeIn}>
      <EnhancedCard 
        title="Comprendre le Jeûne & Chronobiologie" 
        icon={Clock}
        gradient={COLORS.primary}
      >
        <div className="relative overflow-hidden rounded-xl p-6 bg-white/10 backdrop-blur-sm">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Coffee size={100} />
          </div>
          <h3 className="text-xl font-semibold mb-4">Planning Quotidien Expliqué</h3>
          <p className="mb-4 text-white/90">
            Le timing de prise des compléments et des repas a été optimisé selon les dernières 
            recherches sur l&apos;inflammation et le rythme circadien. La période de jeûne de 14h permet 
            de réduire naturellement l&apos;inflammation vasculaire.
          </p>
          <div className="space-y-4">
            <TimelineItem
              title="Réveil & Hydratation"
              date="6h00-7h00"
              description={`L'eau tiède citronnée active le système digestif et le citron, riche en vitamine C, 
              soutient la production de collagène, essentiel pour la santé vasculaire. La respiration profonde 
              réduit le stress oxydatif.`}
              icon={Sun}
              isActive={true}
            />
            <TimelineItem
              title="Thé Vert Bio"
              date="7h00-9h00"
              description={`L'EGCG du thé vert est un puissant antioxydant qui aide à protéger les vaisseaux sanguins. 
              Son absorption est optimale le matin à jeun. Boire lentement permet une meilleure assimilation.`}
              icon={Coffee}
              isActive={true}
            />
            <TimelineItem
              title="Prise des Compléments à Jeun"
              date="9h00"
              description="Prise des compléments anti-inflammatoires et des enzymes à jeun pour une absorption optimale. 
              Ces horaires sont basés sur les études montrant une meilleure biodisponibilité le matin."
              icon={Shield}
              isActive={true}
            />
            <TimelineItem
              title="Petit-déjeuner Anti-inflammatoire"
              date="9h30"
              description="Premier repas de la journée après l'absorption des compléments. Ce délai de 30 minutes est 
              crucial pour l'efficacité des enzymes et garantit une meilleure biodisponibilité."
              icon={Battery}
              isActive={true}
            />
          </div>
        </div>

        <div className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                time: "9h00 (À jeun)",
                explanation: "Ces compléments sont pris à jeun pour maximiser leur absorption et leur efficacité. Les études montrent une biodisponibilité jusqu'à 200% supérieure dans ces conditions.",
                supplements: [
                  { 
                    name: "Bromélaïne",
                    dose: "500mg",
                    detail: "Enzyme naturelle qui aide à réduire l'inflammation vasculaire et améliore la circulation sanguine. Plus efficace à jeun car elle n'est pas utilisée pour la digestion. Les études montrent une réduction significative des marqueurs inflammatoires avec cette dose."
                  },
                  { 
                    name: "Nattokinase",
                    dose: "2000 FU",
                    detail: "Enzyme issue du natto japonais, elle aide à prévenir la formation de caillots et améliore la fluidité sanguine. La dose de 2000 FU est basée sur les études cliniques montrant une amélioration significative de la circulation."
                  },
                  { 
                    name: "Curcumine + pipérine",
                    dose: "1000mg",
                    detail: "La curcumine est un puissant anti-inflammatoire naturel qui inhibe spécifiquement les voies inflammatoires impliquées dans la maladie de Horton. La pipérine augmente son absorption de 2000%. La prise matinale correspond au pic d'inflammation."
                  }
                ]
              },
              {
                time: "13h00 (Avec repas)",
                explanation: "Les compléments de l'après-midi sont spécifiquement choisis pour être pris avec un repas contenant des graisses saines. Cette synergie améliore leur absorption et leur efficacité.",
                supplements: [
                  { 
                    name: "Curcumine + pipérine",
                    dose: "1000mg",
                    detail: "Seconde prise stratégique pour maintenir des niveaux constants dans le sang tout au long de la journée. Les études cliniques montrent qu'une double prise quotidienne offre une meilleure protection anti-inflammatoire continue."
                  },
                  { 
                    name: "Oméga-3",
                    dose: "1g",
                    detail: "Les acides gras oméga-3 EPA/DHA réduisent spécifiquement l'inflammation vasculaire et améliorent la fonction endothéliale. La prise avec le repas augmente leur absorption de 300%. Dose basée sur les études montrant une réduction significative des marqueurs inflammatoires."
                  },
                  { 
                    name: "Resvératrol",
                    dose: "200mg",
                    detail: "Polyphénol qui active les sirtuines, protéines qui régulent l'inflammation vasculaire. Plus efficace quand pris avec des graisses saines car liposoluble. Cette dose est optimale selon les études sur l'inflammation vasculaire."
                  }
                ]
              }
            ].map((timing, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-xl bg-white/10 backdrop-blur-sm"
              >
                <h4 className="font-semibold mb-3">{timing.time}</h4>
                <p className="text-sm mb-4 text-white/80">{timing.explanation}</p>
                <ul className="space-y-2">
                  {timing.supplements.map((supp, index) => (
                    <InfoTooltip 
                      key={index}
                      content={supp.detail}
                    >
                      <li className="flex items-center gap-2 cursor-help group hover:bg-white/5 p-2 rounded-lg transition-all duration-200">
                        <Shield className="h-4 w-4 group-hover:text-blue-400 transition-colors" />
                        <span>{supp.name}: </span>
                        <span className="font-medium">{supp.dose}</span>
                      </li>
                    </InfoTooltip>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </EnhancedCard>
    </motion.div>

    {/* Recommandations alimentaires */}
    <motion.div variants={fadeIn}>
      <EnhancedCard 
        title="Alimentation Thérapeutique" 
        icon={Heart}
        gradient={COLORS.secondary}
      >
        <div className="mb-6 bg-white/10 backdrop-blur-sm p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Principes Fondamentaux</h3>
          <p className="text-white/90 mb-4">
            L&apos;alimentation joue un rôle crucial dans la maladie de Horton en influençant 
            directement les mécanismes inflammatoires et la santé vasculaire. Les choix 
            alimentaires peuvent soit atténuer soit exacerber l&apos;inflammation systémique et 
            l&apos;activation de la voie mTOR, récemment identifiée comme centrale dans la maladie.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Star className="h-5 w-5" />
              Aliments Bénéfiques
            </h4>
            <div className="space-y-6">
              {[
                {
                  category: "Fruits et Baies Antioxydantes",
                  items: [
                    {
                      name: "Myrtilles, Cassis, Mûres",
                      desc: "Riches en anthocyanes qui réduisent spécifiquement l'inflammation vasculaire et renforcent les parois des vaisseaux sanguins. Les études montrent une réduction de 25% des marqueurs inflammatoires.",
                      timing: "À consommer idéalement le matin pour maximiser l'effet des antioxydants"
                    },
                    {
                      name: "Cerises, Grenades",
                      desc: "Contiennent des polyphénols qui inhibent les voies inflammatoires NF-kB et réduisent la CRP. Particulièrement efficaces dans les maladies vasculaires.",
                      timing: "Excellentes en collation entre les repas"
                    }
                  ]
                },
                {
                  category: "Légumes Anti-inflammatoires",
                  items: [
                    {
                      name: "Brocoli, Chou-fleur, Chou kale",
                      desc: "Contiennent du sulforaphane qui active Nrf2, un régulateur majeur de la réponse anti-inflammatoire. Réduisent aussi l'activation de mTOR, impliquée dans la maladie de Horton.",
                      timing: "À consommer crus ou légèrement cuits pour préserver les enzymes actives"
                    }
                  ]
                },
                {
                  category: "Épices Thérapeutiques",
                  items: [
                    {
                      name: "Curcuma + Poivre noir",
                      desc: "Le curcuma inhibe NF-κB et la voie mTOR. La pipérine du poivre noir augmente son absorption de 2000%. Synergie prouvée dans les études.",
                      timing: "À incorporer dans les plats chauds avec une source de gras sain"
                    },
                    {
                      name: "Gingembre frais",
                      desc: "Contient des gingérols qui réduisent spécifiquement l'inflammation vasculaire et améliorent la circulation sanguine.",
                      timing: "Peut être consommé en tisane ou ajouté aux plats quotidiens"
                    }
                  ]
                },
                {
                  category: "Sources de Protéines et Graisses Anti-inflammatoires",
                  items: [
                    {
                      name: "Poissons gras (sardines, maquereau, saumon sauvage)",
                      desc: "Riches en EPA/DHA qui régulent directement les médiateurs pro-inflammatoires et améliorent la fonction endothéliale. Études montrent une réduction significative de l'inflammation vasculaire.",
                      timing: "2-3 portions par semaine, privilégier la cuisson douce"
                    }
                  ]
                }
              ].map((category) => (
                <div key={category.category} className="space-y-3">
                  <h5 className="font-medium text-white/90">{category.category}</h5>
                  {category.items.map((item) => (
                    <InfoTooltip 
                      key={item.name} 
                      content={`${item.desc}\n\nMoment optimal: ${item.timing}`}
                    >
                      <div className="pl-4 border-l-2 border-green-500/30 cursor-help group hover:bg-white/5 p-2 rounded-lg transition-all duration-200">
                        <p className="font-medium flex items-center gap-2">
                          <Award className="h-4 w-4 text-green-300 group-hover:text-green-400 transition-colors" />
                          {item.name}
                        </p>
                      </div>
                    </InfoTooltip>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <X className="h-5 w-5" />
                Aliments à Éviter
              </h4>
              {[
                {
                  category: "Sucres et Glucides Inflammatoires",
                  items: [
                    {
                      name: "Sucres raffinés, sodas, jus industriels",
                      desc: "Provoquent des pics glycémiques qui augmentent l'inflammation systémique et la CRP. Activent aussi la voie mTOR impliquée dans la maladie de Horton.",
                      impact: "Peuvent déclencher des poussées inflammatoires dans les 24-48h suivant la consommation"
                    },
                    {
                      name: "Farines blanches, produits ultra-transformés",
                      desc: "Index glycémique élevé qui perturbe la réponse immunitaire et active les voies pro-inflammatoires",
                      impact: "Effet pro-inflammatoire cumulatif, particulièrement nocif pour les vaisseaux"
                    }
                  ]
                },
                {
                  category: "Graisses Pro-inflammatoires",
                  items: [
                    {
                      name: "Huiles raffinées, graisses trans",
                      desc: "Perturbent directement la fonction endothéliale et augmentent le stress oxydatif vasculaire. Études montrent une augmentation des marqueurs d'inflammation.",
                      impact: "Effets délétères directs sur la santé des vaisseaux sanguins"
                    }
                  ]
                },
                {
                  category: "Protéines Pro-inflammatoires",
                  items: [
                    {
                      name: "Viandes rouges en excès, charcuteries",
                      desc: "Riches en fer héminique et composés pro-inflammatoires. Activent la voie mTOR et augmentent le stress oxydatif vasculaire.",
                      impact: "Limiter impérativement à 2 portions par semaine maximum"
                    }
                  ]
                }
              ].map((category) => (
                <div key={category.category} className="mb-6">
                  <h5 className="font-medium text-white/90 mb-3">{category.category}</h5>
                  {category.items.map((item) => (
                    <InfoTooltip 
                      key={item.name} 
                      content={`${item.desc}\n\nImpact sur la maladie: ${item.impact}`}
                    >
                      <div className="pl-4 border-l-2 border-red-500/30 cursor-help mb-3 group hover:bg-white/5 p-2 rounded-lg transition-all duration-200">
                        <p className="font-medium flex items-center gap-2">
                          <X className="h-4 w-4 text-red-300 group-hover:text-red-400 transition-colors" />
                          {item.name}
                        </p>
                      </div>
                    </InfoTooltip>
                  ))}
                </div>
              ))}
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <h4 className="font-semibold mb-4">Conseils Pratiques d&apos;Application</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-4 w-4 mt-1 flex-shrink-0" />
                  <span>Préparer ses repas à l&apos;avance pour éviter les écarts alimentaires</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-4 w-4 mt-1 flex-shrink-0" />
                  <span>Maintenir une hydratation optimale (2L/jour minimum) pour la santé vasculaire</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-4 w-4 mt-1 flex-shrink-0" />
                  <span>Respecter strictement les périodes de jeûne pour maximiser les effets anti-inflammatoires</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </EnhancedCard>
    </motion.div>
  </div>
);


// Section Recherche
const ResearchSection: React.FC = () => (
  <div className="space-y-8">
    <motion.div variants={fadeIn}>
      <EnhancedCard 
        title="Dernières Découvertes" 
        icon={Brain}
        gradient={COLORS.info}
      >
        <div className="space-y-6">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Rôle clé de mTOR
            </h3>
            <p className="mb-4">
              Découverte majeure sur le mécanisme de formation des myofibroblastes 
              luminaux via la voie mTOR.
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Activation",
                  description: "mTOR activé dans les cellules musculaires lisses",
                  details: "Joue un rôle crucial dans l'inflammation vasculaire"
                },
                {
                  title: "Corrélation",
                  description: "Lien avec la sévérité de l'inflammation",
                  details: "Biomarqueur potentiel de l'activité de la maladie"
                },
                {
                  title: "Thérapeutique",
                  description: "Potentiel des inhibiteurs de mTOR",
                  details: "Nouvelle cible thérapeutique prometteuse"
                }
              ].map((item, idx) => (
                <InfoTooltip key={idx} content={item.details}>
                  <div className="bg-black/20 p-4 rounded-lg cursor-help">
                    <h4 className="font-medium mb-2">{item.title}</h4>
                    <p className="text-sm">{item.description}</p>
                  </div>
                </InfoTooltip>
              ))}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Activity className="h-5 w-5" />
              VAP-1 et Inflammation
            </h3>
            <p className="mb-4">
              Nouvelles découvertes sur le rôle de la protéine d&apos;adhésion vasculaire 1 (VAP-1).
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-black/20 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Implications Cliniques</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4" />
                    Biomarqueur potentiel d&apos;activité
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4" />
                    Cible thérapeutique prometteuse
                  </li>
                </ul>
              </div>
              <div className="bg-black/20 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Perspectives Thérapeutiques</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4" />
                    Développement d&apos;inhibiteurs spécifiques
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4" />
                    Thérapies ciblées en développement
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Publications Récentes
            </h3>
            <div className="space-y-4">
              {[
                {
                  journal: "EMBO Reports (2024)",
                  title: "mTOR signalling controls the formation of smooth muscle cell-derived luminal myofibroblasts during vasculitis",
                  doi: "10.1038/s44319-024-00251-1"
                },
                {
                  journal: "Frontiers in Medicine (2024)",
                  title: "Vascular-adhesion protein 1 in giant cell arteritis and polymyalgia rheumatica",
                  doi: "10.3389/fmed.2024.1448157"
                }
              ].map((pub, idx) => (
                <div key={idx} className="border-l-4 border-white/20 pl-4">
                  <h4 className="font-medium">{pub.journal}</h4>
                  <p className="text-sm mt-1">{pub.title}</p>
                  <p className="text-xs mt-1 opacity-75">DOI: {pub.doi}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </EnhancedCard>
    </motion.div>
  </div>
);

const TreatmentProtocolSection: React.FC = () => (
  <div className="space-y-8">
    <motion.div variants={fadeIn}>
      <EnhancedCard 
        title="Protocole Thérapeutique" 
        icon={Heart}
        gradient={COLORS.primary}
      >
        <div className="space-y-6">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Traitement Conventionnel</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-medium mb-2">Corticothérapie</h4>
                <ul className="space-y-2">
                  <li>• Attaque: Prednisone 0.7mg/kg/jour</li>
                  <li>• Décroissance progressive sur 12-18 mois</li>
                  <li>• Surveillance régulière des effets secondaires</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Tocilizumab</h4>
                <ul className="space-y-2">
                  <li>• 162mg sous-cutané/semaine</li>
                  <li>• Permet de réduire les corticoïdes</li>
                  <li>• Surveillance biologique régulière</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Surveillance et suivi */}
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Suivi et Surveillance</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-medium mb-2">Examens de Surveillance</h4>
                <ul className="space-y-2">
                  <li>• NFS, CRP tous les mois</li>
                  <li>• Bilan hépatique régulier</li>
                  <li>• Examen ophtalmologique</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Points de Vigilance</h4>
                <ul className="space-y-2">
                  <li>• Surveillance tension artérielle</li>
                  <li>• Glycémie à jeun</li>
                  <li>• Densitométrie osseuse annuelle</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </EnhancedCard>
    </motion.div>
  </div>
);

// Composant principal
const HortonDiseasePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('practical');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Gestion du scroll
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Gestion du dark mode
  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(isDark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      {/* Barre de progression */}
      <motion.div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 z-50"
        style={{ width: `${scrollProgress}%` }}
        initial={{ width: "0%" }}
        animate={{ width: `${scrollProgress}%` }}
        transition={{ duration: 0.1 }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Maladie de Horton
              </h1>
            </motion.div>

            {/* Navigation desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="w-10 h-10 rounded-full"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring" }}
                >
                  {isDarkMode ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </motion.div>
              </Button>
            </div>

            {/* Menu mobile */}
            <div className="md:hidden flex items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Menu mobile */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="pt-20 pb-8 min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Alerte d'urgence */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Alert className="border-l-4 border-red-500 bg-red-50/50 dark:bg-red-900/20 backdrop-blur-sm">
              <AlertTitle className="flex items-center gap-2 text-red-800 dark:text-red-200">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <Activity className="h-5 w-5" />
                </motion.div>
                En cas d&apos;urgence
              </AlertTitle>
              <AlertDescription className="text-red-700 dark:text-red-300">
                En cas de perte soudaine de vision, maux de tête sévères ou douleur intense 
                de la tempe, contactez immédiatement le 15 ou rendez-vous aux urgences.
              </AlertDescription>
            </Alert>
          </motion.div>

          {/* Onglets */}
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab} 
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <TabsList className="inline-flex p-1 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl">
                {[
                  { id: 'practical', label: 'Guide Pratique', icon: Clock },
                  { id: 'research', label: 'Recherches', icon: Brain },
                  { id: 'protocol', label: 'Protocole', icon: Leaf }
                ].map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="relative px-6 py-3 rounded-lg transition-all duration-300"
                  >
                    <motion.div
                      className="flex items-center gap-2"
                      whileTap={{ scale: 0.95 }}
                    >
                      <tab.icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </motion.div>
                  </TabsTrigger>
                ))}
              </TabsList>
            </motion.div>

            {/* Contenu des onglets */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <TabsContent value="practical" className="space-y-6">
                  <ProtocolSection />
                </TabsContent>

                <TabsContent value="research" className="space-y-6">
                  <ResearchSection />
                </TabsContent>

                <TabsContent value="protocol" className="space-y-6">
                <TreatmentProtocolSection />
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Ces informations sont mises à jour selon les dernières recherches scientifiques.
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
              Dernière mise à jour: Octobre 2024
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default HortonDiseasePage;