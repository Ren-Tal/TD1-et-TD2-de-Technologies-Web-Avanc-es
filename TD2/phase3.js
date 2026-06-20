document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("formulaire");
    const search = document.getElementById("recherche");
    const filtre = document.getElementById("filtre");
    const prixMinInput = document.getElementById("prixMin");
    const prixMaxInput = document.getElementById("prixMax");
    const produitsSection = document.getElementById("produits");

    var id = 2; // Compteur pour l'ID

    // Charge les produits sauvegardés (images en base64) au démarrage
    function chargerProduitsSauvegardes() {
        const sauvegardes = JSON.parse(localStorage.getItem("produitsAjoutes") || "[]");
        sauvegardes.forEach(p => {
            id = Math.max(id, p.id);
            ajouterArticleDOM(p.nom, p.description, p.prix, p.status, p.image, p.id);
        });
    }

    // Crée et insère l'article dans le DOM (réutilisé au chargement ET à l'ajout)
    function ajouterArticleDOM(nom, description, prix, status, imageSrc, articleId) {
        const newArticle = document.createElement("article");
        newArticle.id = articleId;
        newArticle.innerHTML = `
            <h3>${nom}</h3>
            <p>${description}</p>
            <p>Prix: ${prix} €</p>
            <p class="${status === 'En stock' ? 'statut-stock' : 'statut-epuise'}">status: ${status}</p>
            <img src="${imageSrc || ''}" alt="Image du produit" width="200" height="150">
        `;
        produitsSection.appendChild(newArticle);
    }

    chargerProduitsSauvegardes();

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const nom = document.getElementById("Nom")?.value;
        const description = document.getElementById("Description")?.value;
        const prix = document.getElementById("Prix")?.value;
        let status = document.getElementById("Status").value;
        const imageFile = document.getElementById("Image")?.files[0];

        if (nom === "") {
            alert("Veuillez remplir le champ Nom.");
            return;
        }

        if (prix === "") {
            alert("Veuillez remplir le champ Prix.");
            return;
        }

        if (status === "") {
            status = "En stock";
        }

        const nouvelId = ++id;

        // Fonction qui finalise l'ajout une fois qu'on a l'image (ou pas)
        function finaliserAjout(imageSrc) {
            ajouterArticleDOM(nom, description, prix, status, imageSrc, nouvelId);

            // Sauvegarde dans le localStorage pour persister après rechargement
            const sauvegardes = JSON.parse(localStorage.getItem("produitsAjoutes") || "[]");
            sauvegardes.push({ id: nouvelId, nom, description, prix, status, image: imageSrc });
            localStorage.setItem("produitsAjoutes", JSON.stringify(sauvegardes));

            form.reset();
        }

        if (imageFile) {
            // FileReader convertit le fichier en base64 (asynchrone -> on attend onload)
            const reader = new FileReader();
            reader.onload = function(e) {
                finaliserAjout(e.target.result); // e.target.result = image en base64
            };
            reader.readAsDataURL(imageFile);
        } else {
            finaliserAjout(""); // pas d'image choisie
        }
    });

    function filtrerProduits() {
        const searchTerm = search.value.toLowerCase();
        const statusFilter = filtre.value;

        let prixMin = prixMinInput.value === "" ? 0 : parseFloat(prixMinInput.value);
        let prixMax = prixMaxInput.value === "" ? Infinity : parseFloat(prixMaxInput.value);

        const articles = document.querySelectorAll("#produits article");
        let resultatsVisibles = 0;

        articles.forEach(article => {
            const nom = article.querySelector("h3").textContent.toLowerCase();
            const prix = parseFloat(
                article.querySelector("p:nth-of-type(2)").textContent.replace("Prix: ", "").replace(" €", "")
            );
            const status = article.querySelector("p:nth-of-type(3)").textContent.replace("status: ", "");

            const correspondNom = nom.includes(searchTerm);
            const correspondStatus = statusFilter === "" || status === statusFilter;
            const correspondPrix = prix >= prixMin && prix <= prixMax;

            if (correspondNom && correspondStatus && correspondPrix) {
                article.style.display = "";
                resultatsVisibles++;
            } else {
                article.style.display = "none";
            }
        });

        const messageVide = document.getElementById("aucun-resultat");
        messageVide.style.display = resultatsVisibles === 0 ? "block" : "none";
    }

    search.addEventListener("input", filtrerProduits);
    filtre.addEventListener("change", filtrerProduits);
    prixMinInput.addEventListener("input", filtrerProduits);
    prixMaxInput.addEventListener("input", filtrerProduits);
});