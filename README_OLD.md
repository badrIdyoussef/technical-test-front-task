# 🧪 Visionyze – Starter _Skeleton_ (DummyJSON)

> **Important :** Ce starter ne contient **aucune logique métier**. Tout est à implémenter par le candidat, en partant d’une structure propre.

## 🚀 Démarrage

```bash
cp .env.example .env
npm i
npm run dev
# http://localhost:3000
```

`NEXT_PUBLIC_API_BASE=https://dummyjson.com`

## 🎯 Objectif

Construire un mini dashboard e‑commerce **front-only** en consommant l’API publique **DummyJSON** (uniquement GET).  
Les **mutations** (panier, checkout, commandes locales) sont **simulées côté front**.

## 📡 Endpoints à consommer

- `GET /products?limit=&skip=`
- `GET /products/search?q=&limit=&skip=`
- `GET /products/categories`
- `GET /products/category/{category}?limit=&skip=`
- `GET /carts?limit=&skip=`
- `GET /users?limit=&skip=`

## ✅ À implémenter (obligatoire)

- **Auth façade** (session simulée) + **guards** (rediriger `/login` si non connecté).
- **/products** : recherche (debounce), filtres catégories, pagination, états UI (loading/erreur/empty).
- **/orders** : lister **carts** DummyJSON (readonly) + (optionnel) section **“Local Orders”** créées après checkout simulé.
- **/metrics** : KPI users (DummyJSON), orders 7j & revenue 7j (locaux), mini chart.
- **Qualité** : code typé, composants réutilisables, accessibilité, responsive.

## 🧩 Fichiers clés à compléter

- `src/lib/api.ts` : **toutes** les fonctions fetch sont **TODO** (à écrire).
- `src/lib/auth.ts` : **TODO** (isAuthed, setToken, clearToken).
- `src/components/Guard.tsx` : activer la redirection une fois l’auth prête.
- `src/app/*/page.tsx` : implémentez chaque page (marqueurs **TODO**).

## 🧪 Tests (min)

- 2 tests composants + 1 test intégration léger (au choix).

---

## ⏱ Modalités

- **Fenêtre :** 48 h
- **Charge attendue :** 6–8 h
- **Livrables :**
  - Lien Git **ou** archive .zip
  - `README.md` clair (setup, choix techniques)
  - `.env.example` complet
- **Anti‑IA :** documentation autorisée ; **pas** de génération massive de code. Débrief 30 min sur **ton** code.

---

## 📈 Évaluation (100)

- Fonctionnel (pages & flux) – 35
- Qualité code & typage – 25
- UX/UI (états, responsive, a11y) – 20
- React Query (cache/pagination/retry) – 10
- Tests & DX – 10

Bonne chance ! 🚀
