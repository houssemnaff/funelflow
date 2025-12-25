# Funnel Flow Orchestrator (FFO)

FFO est une application web (Next.js) orientée **pilotage et orchestration de funnel de conversion**. Elle propose un tableau de bord opérationnel, des analytics (visualisation du funnel et parcours utilisateurs), un gestionnaire de règles d’orchestration, la gestion des webhooks (monitoring + création), l’import/export de règles (backup & migration) et l’administration des utilisateurs/permissions.

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
```

3) Ouvrir l’application :

- http://localhost:3000

## Scripts utiles

- `npm run dev` : serveur de dev
- `npm run build` : build de production
- `npm run start` : démarrage en production (après build)
- `npm run lint` : lint ESLint

## Notes

- **Authentification** : l’auth de l’UI est simulée côté client (token stocké dans `localStorage`).
- Pages principales : `/` (landing), `/login`, `/register`, `/dashboard`, `/analytics`, `/rules`, `/webhooks`, `/import-export`, `/users`, `/monitoring`.
