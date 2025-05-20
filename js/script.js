// Script JavaScript simple pour la page d'accueil
document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour gérer le menu responsive
    const setupResponsiveMenu = () => {
        // Cette fonction pourrait être étendue pour ajouter un menu hamburger
        // sur les petits écrans si nécessaire dans une version future
        
        // Pour l'instant, nous nous assurons simplement que les liens sont actifs
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Nous ne prévenons pas le comportement par défaut pour permettre la navigation
                // Mais nous pourrions ajouter des animations ou transitions ici
                console.log('Navigation vers: ' + this.getAttribute('href'));
            });
        });
    };

    // Initialisation
    setupResponsiveMenu();
    
    // Message de bienvenue dans la console
    console.log('Bienvenue sur le site des Objectifs de Développement Durable 2030!');
});
