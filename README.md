# Funnel Flow Orchestrator (FFO)

FFO est une application web (Next.js) orientée **pilotage et orchestration de funnel de conversion**. Elle propose un tableau de bord opérationnel, des analytics (visualisation du funnel et parcours utilisateurs), un gestionnaire de règles d’orchestration, la gestion des webhooks (monitoring + création), l’import/export de règles (backup & migration) et l’administration des utilisateurs/permissions.

## Idée du projet

L’idée de FFO est de **centraliser la logique de conversion** (règles + actions) au même endroit, au lieu de la disperser dans le code, plusieurs outils marketing, ou des automatisations non versionnées. Concrètement, l’objectif est de piloter un funnel comme un “moteur de décision” : mesurer ce qui se passe (analytics/monitoring), définir des règles d’orchestration (qui fait quoi, quand, pour quel segment), puis déclencher des actions via webhooks. Le projet vise autant les équipes **marketing/growth** (itération rapide sur les parcours) que les équipes **produit/tech** (traçabilité, gouvernance, import/export des règles, gestion des accès).

## Fonctionnalités

- **Dashboard** : KPIs (règles actives, volume de requêtes, latence, succès webhooks) + actions rapides.
- **Analytics** : visualisation du funnel et table des parcours utilisateurs.
- **Rules Manager** : création/gestion des règles d’orchestration.
- **Webhooks Manager** : monitoring des endpoints + création d’un webhook.
- **Import/Export** : sauvegarde et migration des règles entre instances.
- **User Management** : gestion des membres et des rôles/permissions.

## Stack technique

- Next.js (App Router) + React
- Tailwind CSS + composants UI (Radix)
- Formulaires via React Hook Form + Zod

## Prérequis

- Node.js (version récente recommandée)
- npm (ou un autre gestionnaire de paquets, mais les scripts ci-dessous utilisent npm)

## Lancer le projet en local

1) Installer les dépendances :

```bash
npm install
```

2) Démarrer en mode développement :

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
