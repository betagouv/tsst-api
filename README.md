# Tarification Sociale et Solidaire des Transports (TSST)

L'application web développée dans le cadre de la phase d'investigation de la startup TSST, ayant pour but de lutter contre le non-recours aux aides sociales lors de l'achat d'un titre de transport.

# Prérequis

-   npm v14
-   node v16

# Installation

Cloner ce repo

```bash
git clone https://github.com/betagouv/tsst-api.git
cd tsst-api
npm i
cp .env.example .env
```

Remplissez les valeurs du fichier `.env` avec votre base de données locale.

# Migrations

## Générer automatiquement une migration

-   modifier un fichier `entity` (ex: ajouter une propriété `is_student` à `src/modules/users/entity/User.ts`)
-   s'assurer que l'entité est référencée dans `src/dataSource.ts`
-   `npm run migration:generate --name=add-is-student-to-user`
-   vérifier le contenu de la migration créée

## Appliquer une migration

`npm run migration:run`

## Annuler la dernière migration

`npm run migration:rollback`

# Lancer le projet localement

```bash
npm run startDev
```
