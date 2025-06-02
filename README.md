# Projet ODD 2030 - Sensibilisation aux Objectifs de Développement Durable

## Description du Site

Ce site web a été créé dans un but éducatif pour présenter les 17 Objectifs de Développement Durable (ODD) définis par l'ONU. Il vise à informer les visiteurs sur les grands enjeux mondiaux et les principes qui les sous-tendent (Personnes & Prospérité, Planète, Paix & Justice, Partenariats).

L'objectif est de rendre ces informations accessibles et de montrer comment chacun peut, à son échelle, s'informer et potentiellement s'engager.

## Fonctionnalités Principales

Le site intègre plusieurs fonctionnalités pour une expérience utilisateur interactive et informative :

1.  Navigation et Structure des Pages :
    * Le site est structuré avec plusieurs pages HTML (Accueil, Nos Principes, pages de détail pour chaque principe, Contact, Nous Rejoindre).
    * L'organisation de base d'une page HTML (Doctype, `<html>`, `<head>`, `<body>`, balises sémantiques comme `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>`) a été mise en place en suivant les enseignements du cours de Programmation Web.
    * *Ressource complémentaire :* [Apprendre les bases du HTML - OpenClassrooms](https://openclassrooms.com/fr/courses/1603881-apprenez-a-creer-votre-site-web-avec-html5-et-css3)

2.  Stylisation et Design Responsive :
    * L'apparence du site est gérée par une feuille de style CSS externe (`style.css`).
    * Nous avons utilisé des sélecteurs CSS, les propriétés pour les couleurs, polices, marges, paddings, et le modèle de boîte. Ces bases sont expliquées dans le cours.
    * La mise en page utilise Flexbox pour organiser les éléments. Ce concept a été vu en cours[cite: 1].
        * *Ressource complémentaire Flexbox :* [Flexbox CSS - Guide complet et exemples - YouTube (Grafikart)](https://www.youtube.com/watch?v=0YE79RyNYJ4)
    * Le site est *responsive*, il s'adapte à différentes tailles d'écran grâce aux Media Queries, une technique expliquée dans le cours[cite: 1].
        * *Ressource complémentaire Media Queries :* [Les Media Queries CSS pour le Responsive Design - MDN Web Docs](https://developer.mozilla.org/fr/docs/Web/CSS/Media_Queries/Using_media_queries)

3.  Interactivité avec JavaScript :
    * Manipulation du DOM : De nombreux éléments de la page sont rendus dynamiques grâce à JavaScript, qui modifie le DOM. Les bases de la manipulation du DOM sont issues du cours[cite: 3].
        * *Ressource complémentaire DOM :* [Introduction au DOM - MDN Web Docs](https://developer.mozilla.org/fr/docs/Web/API/Document_Object_Model/Introduction)
    * Gestion des événements : Le site réagit à des actions de l'utilisateur (clics, défilement) grâce aux écouteurs d'événements JavaScript, un concept fondamental du cours.
        * *Ressource complémentaire événements JS :* [Événements JavaScript : Guide complet - YouTube (Pierre Giraud)](https://www.youtube.com/watch?v=CsudbpLGl88)
    * Animation de l'en-tête au défilement : L'en-tête du site change d'apparence ou se cache/réapparaît lors du défilement.
        * *Explication/Inspiration :* [Tutoriel JavaScript : Créer un Header qui disparaît au scroll - YouTube (FromScratch)](https://www.youtube.com/watch?v=0YE79RyNYJ4)
    * Animation des éléments au défilement (`IntersectionObserver`) : Les sections apparaissent progressivement.
        * *Explication/Inspiration :* [Tutoriel Intersection Observer en JavaScript pour animer au scroll - [Intersection Observer API - MDN Web Docs](https://developer.mozilla.org/fr/docs/Web/API/Intersection_Observer_API)
    * Validation de formulaire côté client : Le formulaire de contact vérifie les champs.
        * *Explication/Inspiration :* [Validation des formulaires HTML et JavaScript - OpenClassrooms](https://openclassrooms.com/fr/courses/7696886-validez-les-donnees-utilisateur-avec-javascript/8015900-validez-les-formulaires-html-avec-javascript) et pour la validation d'email avec Regex : [Expressions régulières - JavaScript | MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Regular_expressions)
    * Carte Interactive (OpenStreetMap et Nominatim) : Carte sur la page d'accueil.
        * *Explication/Inspiration :* Affichage OSM via `<iframe>`. Pour le géocodage avec Nominatim et `fetch` : [API Nominatim - Wiki OpenStreetMap](https://wiki.openstreetmap.org/wiki/FR:Nominatim#Utilisation) et [Utilisation de l’API Fetch - MDN Web Docs](https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch).

4.  Intégration d'une API d'Intelligence Artificielle (Perplexity) :
    * La carte interactive utilise l'API de Perplexity pour une analyse des enjeux urbains. L'appel se fait avec `fetch` en JavaScript (concept vu dans le cours).
    * Note Importante : Pour ce projet éducatif, une clé API Perplexity a été directement intégrée dans le code JavaScript côté client. Nous sommes conscients que ce n'est pas une pratique sécurisée pour un projet en production. Cependant, l'objectif ici était de démontrer l'intégration d'une API et de rendre le site fonctionnel dans le cadre de ce projet. Nous ne nous sommes pas attardés sur l'optimisation ou l'interprétation détaillée des résultats fournis par l'IA, le focus du projet restant la programmation web et l'interaction avec des services externes.

## Comment Lancer le Site

1.  Téléchargez les fichiers du projet.
2.  Gardez la structure des dossiers :
    ```
    ODD_2030_Projet/
    ├── html/
    │   ├── accueil.html
    │   ├── principes.html
    │   ├── principes_pages/
    │   │   ├── principe1.html
    │   │   └── ... (principe2, 3, 4.html)
    │   ├── contact.html
    │   └── formulaire.html
    ├── css/
    │   └── style.css
    ├── js/
    │   └── script.js
    └── images/
        └── ... (vos images ici)
    ```
3.  Ouvrez le fichier `html/accueil.html` dans un navigateur web.

---