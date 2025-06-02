// Attend que tout le HTML soit bien charge avant de lancer nos scripts
document.addEventListener('DOMContentLoaded', function() {

    console.log('Script principal chargé. Prêt à dynamiser la page ODD 2030 !');

    // --- Animation de l'en-tete au defilement ---
    // Combine l'idee du header qui se cache (Site 2) et le changement de style (Site 1)
    function initialiserAnimationEnTete() {
        const enTete = document.querySelector('header');
        if (!enTete) return; // Si pas d'en-tete, on arrete la

        let dernierDefilement = 0;
        const hauteurEnTete = enTete.offsetHeight; // Pour savoir quand le cacher

        window.addEventListener('scroll', function() {
            const defilementActuel = window.pageYOffset || document.documentElement.scrollTop;

            if (defilementActuel > dernierDefilement && defilementActuel > hauteurEnTete) {
                // On descend et on a depasse la hauteur de l'en-tete
                enTete.style.transform = 'translateY(-100%)'; // Cache l'en-tete
            } else {
                // On monte ou on est pres du haut
                enTete.style.transform = 'translateY(0)'; // Montre l'en-tete
            }
            
            // Ajoute/enleve une classe pour le style de fond/ombre (style Site 1)
            if (defilementActuel > 50) {
                enTete.classList.add('entete-defilement-actif');
            } else {
                enTete.classList.remove('entete-defilement-actif');
            }

            dernierDefilement = defilementActuel <= 0 ? 0 : defilementActuel;
        });
    }
    initialiserAnimationEnTete();


    // --- Defilement fluide vers les ancres internes (si utilisees) ---
    function initialiserDefilementDoux() {
        const liensAncres = document.querySelectorAll('a[href^="#"]');
        if (liensAncres.length === 0) return;

        const enTete = document.querySelector('header');
        let hauteurEnTeteFixe = 0;
        if (enTete && getComputedStyle(enTete).position === 'sticky' || getComputedStyle(enTete).position === 'fixed') {
            hauteurEnTeteFixe = enTete.offsetHeight;
        }

        liensAncres.forEach(function(lien) {
            lien.addEventListener('click', function(event) {
                const idCible = lien.getAttribute('href').substring(1);
                const elementCible = document.getElementById(idCible);

                if (elementCible) {
                    event.preventDefault();
                    const positionElementCible = elementCible.getBoundingClientRect().top + window.pageYOffset;
                    const positionFinale = positionElementCible - hauteurEnTeteFixe;
                    
                    window.scrollTo({
                        top: positionFinale,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    initialiserDefilementDoux();


    // --- Animation des elements au defilement (IntersectionObserver) ---
    function initialiserRevelationAuDefilement() {
        const elementsAReveler = document.querySelectorAll('.element-a-reveler');
        if (elementsAReveler.length === 0) return;

        const optionsObserveur = {
            root: null, // Par rapport au viewport
            rootMargin: '0px',
            threshold: 0.1 // 10% de l'element visible
        };

        const observateurIntersection = new IntersectionObserver(function(entrees, observateur) {
            entrees.forEach(function(entree, index) {
                if (entree.isIntersecting) {
                    // Appliquer un delai si l'element est dans un conteneur de blocs ou d'equipe
                    // Pour un effet de cascade leger, inspire du script 1
                    if (entree.target.closest('.conteneur-blocs') || entree.target.closest('.conteneur-equipe') || entree.target.closest('.grille-principes')) {
                        // Le delai est mieux gere par CSS via nth-child si on veut etre precis,
                        // ou en ajoutant une propriete de delai au style de l'element ici.
                        // Pour simplifier et eviter trop de JS direct sur le style, 
                        // on s'appuie sur la transition CSS et le fait que les elements sont observes un par un.
                        // entree.target.style.transitionDelay = `${index * 0.05}s`; // Peut causer des sauts si mal gere
                    }
                    entree.target.classList.add('revele');
                    observateur.unobserve(entree.target); // Ne plus observer une fois revele
                }
            });
        }, optionsObserveur);

        elementsAReveler.forEach(element => {
            observateurIntersection.observe(element);
        });
    }
    initialiserRevelationAuDefilement();


    // --- Validation du Formulaire de Contact ---
    function initialiserValidationFormulaire() {
        const formulaire = document.querySelector('.formulaire-participation');
        if (!formulaire) return;

        formulaire.addEventListener('submit', function(evenement) {
            effacerAnciensMessagesErreur(formulaire); // On nettoie avant de re-verifier
            let estValide = true;

            // Recuperation des champs par leur ID francise
            const champNom = formulaire.querySelector('#nom-utilisateur');
            const champEmail = formulaire.querySelector('#email-utilisateur');
            const champSujet = formulaire.querySelector('#sujet-message'); // Sujet est optionnel, mais on peut le valider si besoin
            const champMessage = formulaire.querySelector('#corps-message');

            // Validation du nom
            if (champNom && champNom.value.trim() === '') {
                estValide = false;
                afficherErreurPourChamp(champNom, 'Le nom est requis.');
            }

            // Validation de l'email
            if (champEmail && champEmail.value.trim() === '') {
                estValide = false;
                afficherErreurPourChamp(champEmail, 'L\'adresse email est requise.');
            } else if (champEmail && !emailEstCorrect(champEmail.value.trim())) {
                estValide = false;
                afficherErreurPourChamp(champEmail, 'L\'adresse email n\'est pas valide.');
            }
            
            // Validation du message (simple verification de non-vide)
            if (champMessage && champMessage.value.trim() === '') {
                estValide = false;
                afficherErreurPourChamp(champMessage, 'Le message ne peut pas être vide.');
            }

            if (!estValide) {
                evenement.preventDefault(); // Empeche l'envoi du formulaire
                // On pourrait mettre le focus sur le premier champ en erreur
                const premierChampEnErreur = formulaire.querySelector('.champ-avec-erreur');
                if(premierChampEnErreur) premierChampEnErreur.focus();
            } else {
                // Si valide et action="mailto:", le navigateur devrait ouvrir le client mail.
                // On pourrait afficher un message de succes ici, mais pour un mailto, c'est moins courant.
                // alert('Formulaire prêt à être "envoyé" (via client mail) !');
            }
        });
    }

    function emailEstCorrect(email) {
        // Regex simple pour validation email - une erreur d'etudiant serait de ne pas utiliser une regex assez complete
        const regex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/; // Doit finir par au moins 2 lettres apres le .
        return regex.test(email);
    }

    function afficherErreurPourChamp(elementInput, message) {
        const groupeDuChamp = elementInput.closest('.groupe-champ'); // On trouve le parent .groupe-champ
        if(!groupeDuChamp) return;

        let elementMessageErreur = groupeDuChamp.querySelector('.texte-message-erreur');
        if (!elementMessageErreur) {
            elementMessageErreur = document.createElement('p');
            elementMessageErreur.className = 'texte-message-erreur'; // Sera style par CSS
            // Insere le message d'erreur apres l'input, a l'interieur du groupe-champ
            elementInput.parentNode.insertBefore(elementMessageErreur, elementInput.nextSibling);
        }
        elementMessageErreur.textContent = message;
        elementInput.classList.add('champ-avec-erreur'); // Pour styler l'input lui-meme
    }

    function effacerAnciensMessagesErreur(formulaire) {
        const messagesErreurAffiches = formulaire.querySelectorAll('.texte-message-erreur');
        messagesErreurAffiches.forEach(msg => msg.remove()); // On enleve les messages precedents
        
        const champsAvecErreurAvant = formulaire.querySelectorAll('.champ-avec-erreur');
        champsAvecErreurAvant.forEach(input => input.classList.remove('champ-avec-erreur'));
    }
    initialiserValidationFormulaire();


    // --- Fonctionnalite Carte Interactive (Accueil) ---
    function initialiserCarteInteractive() {
        const champVille = document.getElementById('champVille');
        const boutonRechercheVille = document.getElementById('boutonRechercheVille');
        const iframeCarte = document.getElementById('carteAffichageOsm'); // ID francise de l'HTML
        const divErreurCarte = document.getElementById('carteErreur');
        const divResultatsAnalyse = document.getElementById('resultatsAnalyse');
        const divErreurAnalyse = document.getElementById('erreurAnalyse');
        const spanNomVilleAnalyse = document.getElementById('nomVilleAnalyse');

        if (!boutonRechercheVille || !champVille || !iframeCarte) { // Si les elements cles ne sont pas la, on n'initialise pas
            console.log('Elements de la carte non trouves, fonctionnalite desactivee.');
            return;
        }
        
        // ATTENTION : Cle API visible dans le code source client.
        // Pour un vrai projet, il faudrait la proteger via un serveur proxy.
        const CLE_API_PERPLEXITY = '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'; 

        function afficherMsgErreurCarte(message) {
            if(divErreurCarte) divErreurCarte.textContent = message;
            if(divResultatsAnalyse) divResultatsAnalyse.innerHTML = '<p>L\'analyse des problématiques de la ville sélectionnée apparaîtra ici.</p>';
            if(spanNomVilleAnalyse) spanNomVilleAnalyse.textContent = '-';
            if(divErreurAnalyse) divErreurAnalyse.textContent = '';
        }

        function afficherRetourPerplexity(message, typeErreur = false) {
            if (typeErreur) {
                if(divErreurAnalyse) divErreurAnalyse.textContent = message;
                if(divResultatsAnalyse) divResultatsAnalyse.innerHTML = '<p>L\'analyse des problématiques de la ville sélectionnée apparaîtra ici.</p>';
            } else {
                const messageAvecFormat = message
                    .replace(/Problématiques clés:/gi, '\n<strong>Problématiques clés:</strong>')
                    .replace(/Solutions existantes:/gi, '\n<strong>Solutions existantes:</strong>')
                    .replace(/Perspectives:/gi, '\n<strong>Perspectives:</strong>')
                    .trim();
                if(divResultatsAnalyse) divResultatsAnalyse.innerHTML = `<p>${messageAvecFormat.replace(/\n/g, '<br>')}</p>`;
                if(divErreurAnalyse) divErreurAnalyse.textContent = ''; 
            }
        }

        function reinitialiserMessages() {
            if(divErreurCarte) divErreurCarte.textContent = '';
            if(divErreurAnalyse) divErreurAnalyse.textContent = '';
            if(divResultatsAnalyse) divResultatsAnalyse.innerHTML = '<p>L\'analyse des problématiques de la ville sélectionnée apparaîtra ici.</p>';
            if(spanNomVilleAnalyse) spanNomVilleAnalyse.textContent = '-';
        }

        async function actualiserAffichageCarte(latitude, longitude, boite) {
            let strBoite;
            if (boite && boite.length === 4) { // Nominatim: [sudLat, nordLat, ouestLon, estLon]
                strBoite = `${boite[2]},${boite[0]},${boite[3]},${boite[1]}`; // OSM: ouestLon,sudLat,estLon,nordLat
            } else {
                const delta = 0.05; // Zoom un peu plus serre
                strBoite = `${longitude - delta},${latitude - delta},${longitude + delta},${latitude + delta}`;
            }
            const urlMap = `https://www.openstreetmap.org/export/embed.html?bbox=${strBoite}&layer=mapnik&marker=${latitude},${longitude}`;
            iframeCarte.src = urlMap;
        }

        async function recupererAnalyseVille(nomVillePourAnalyse) {
            if(spanNomVilleAnalyse) spanNomVilleAnalyse.textContent = nomVillePourAnalyse;
            afficherRetourPerplexity('Analyse en cours...', false);

            const corpsDeRequete = {
                model: "sonar", 
                messages: [
                    { role: "system", content: "Fournis une analyse concise des enjeux urbains de la ville demandée en 100 mots maximum. Structure si possible en: 'Problématiques clés :', 'Solutions existantes :', 'Perspectives :'. Sois neutre." },
                    { role: "user", content: `Quels sont les enjeux urbains pour ${nomVillePourAnalyse} ?` }
                ]
            };

            try {
                const reponseApi = await fetch('https://api.perplexity.ai/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${CLE_API_PERPLEXITY}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(corpsDeRequete)
                });

                if (!reponseApi.ok) {
                    const erreurData = await reponseApi.json().catch(() => ({})); // Eviter crash si pas de JSON
                    console.error('Erreur API Perplexity:', reponseApi.status, erreurData);
                    afficherRetourPerplexity(`Erreur ${reponseApi.status}: ${erreurData.error?.message || reponseApi.statusText || 'Impossible de contacter le service.'}`, true);
                    return;
                }

                const donnees = await reponseApi.json();
                if (donnees.choices && donnees.choices.length > 0 && donnees.choices[0].message && donnees.choices[0].message.content) {
                    afficherRetourPerplexity(donnees.choices[0].message.content);
                } else {
                    afficherRetourPerplexity("Réponse inattendue du service d'analyse.", true);
                }
            } catch (erreurExecution) { // Erreur reseau ou autre
                console.error('Erreur fetch vers Perplexity API:', erreurExecution);
                afficherRetourPerplexity("Connexion impossible au service d'analyse. Vérifiez votre réseau.", true);
            }
        }

        async function chercherCoordonneesEtAnalyser(nomVilleRecherchee) {
            reinitialiserMessages();
            iframeCarte.src = 'about:blank'; // Vide la carte en attendant
            if(spanNomVilleAnalyse) spanNomVilleAnalyse.textContent = nomVilleRecherchee;
            afficherRetourPerplexity('Recherche en cours...', false);

            try {
                const urlNominatim = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(nomVilleRecherchee)}&format=json&limit=1&addressdetails=1`;
                const reponseGeo = await fetch(urlNominatim);

                if (!reponseGeo.ok) {
                    afficherMsgErreurCarte(`Erreur de géocodage: ${reponseGeo.statusText || 'service indisponible'}`);
                    return;
                }
                const donneesGeo = await reponseGeo.json();

                if (donneesGeo && donneesGeo.length > 0) {
                    const infoVille = donneesGeo[0];
                    const latitude = parseFloat(infoVille.lat);
                    const longitude = parseFloat(infoVille.lon);
                    
                    if(divErreurCarte) divErreurCarte.textContent = ''; 
                    actualiserAffichageCarte(latitude, longitude, infoVille.boundingbox);
                    
                    const nomOfficiel = infoVille.address?.city || infoVille.address?.town || infoVille.address?.village || nomVilleRecherchee;
                    recupererAnalyseVille(nomOfficiel);
                } else {
                    afficherMsgErreurCarte(`Ville "${nomVilleRecherchee}" non trouvée. Veuillez vérifier l'orthographe.`);
                }
            } catch (erreurExecution) {
                console.error('Erreur dans le processus de recherche:', erreurExecution);
                afficherMsgErreurCarte("Une erreur s'est produite lors de la recherche.");
            }
        }
        
        function carteFranceAuDemarrage() {
            const boiteFrance = "-5.5,41.0,10.0,51.5"; // ouestLon,sudLat,estLon,nordLat
            iframeCarte.src = `https://www.openstreetmap.org/export/embed.html?bbox=${boiteFrance}&layer=mapnik`;
            if(divResultatsAnalyse) divResultatsAnalyse.innerHTML = '<p>Entrez un nom de ville et cliquez sur "Rechercher".</p>';
        }

        boutonRechercheVille.addEventListener('click', function() {
            const nomDeVille = champVille.value.trim();
            if (nomDeVille) {
                chercherCoordonneesEtAnalyser(nomDeVille);
            } else {
                afficherMsgErreurCarte("Veuillez entrer un nom de ville.");
            }
        });
        champVille.addEventListener('keypress', function(evenement) {
            if (evenement.key === 'Enter') {
                evenement.preventDefault(); 
                boutonRechercheVille.click(); // Simule le clic sur le bouton
            }
        });
        
        carteFranceAuDemarrage(); // Charge la carte de France au debut
    }
    initialiserCarteInteractive();

    // --- Petites animations supplementaires (style Site 2, si on veut) ---
    // Par exemple, un effet de "parallaxe" simple pour la section objectifs
    function effetParallaxeObjectifs() {
        const sectionObj = document.querySelector('.rubrique-objectifs-odd'); // Classe francisee
        if (!sectionObj) return;

        window.addEventListener('scroll', function() {
            // On verifie si la section est a peu pres visible pour eviter de calculer pour rien
            const rect = sectionObj.getBoundingClientRect();
            if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
                const defilement = window.pageYOffset;
                // On applique un decalage base sur la position de la section par rapport au haut de la page
                // et la position de defilement. Le facteur (0.1 ou 0.2) determine la vitesse du parallaxe.
                // Un etudiant pourrait faire une erreur de calcul ici, ou un effet trop fort/faible.
                const vitesseParallaxe = 0.15; // Vitesse de l'effet
                sectionObj.style.backgroundPositionY = `${(defilement - sectionObj.offsetTop) * vitesseParallaxe}px`;
            }
        });
    }
    effetParallaxeObjectifs();

}); // Fin de DOMContentLoaded