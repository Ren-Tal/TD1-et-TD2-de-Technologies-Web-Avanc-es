<template>
    <section class="section-form">
        <form class="formulaire" @submit.prevent="soumettreFormulaire">
            <h2>Ajouter un produit</h2><br><br>
            <input type="text" placeholder="Nom du produit" v-model="nom"><br><br>
            <input type="text" placeholder="Description du produit" v-model="description"><br><br>
            <input type="number" placeholder="Prix du produit" v-model="prix"><br><br>
            <select v-model="status">
                <option value="">Sélectionner un statut</option>
                <option value="En stock">En stock</option>
                <option value="Épuisé">Épuisé</option>
            </select><br><br>
            <input type="file" accept="image/*" @change="gererImage" ref="inputImage"><br><br>
            <button type="submit">
                Ajouter le produit
            </button>
        </form>
    </section>
</template>

<script>
export default {
    name: "Form",
    emits: ["ajouter-produit"],
    data() {
        return {
            nom: "",
            description: "",
            prix: "",
            status: "",
            image: "" // contiendra le base64 une fois converti
        }
    },
    methods: {
        gererImage(event) {
            const fichier = event.target.files[0];
            if (!fichier) {
                this.image = "";
                return;
            }

            // FileReader est asynchrone, on attend onload avant de stocker le résultat
            const reader = new FileReader();
            reader.onload = (e) => {
                this.image = e.target.result; // image en base64
            };
            reader.readAsDataURL(fichier);
        },

        soumettreFormulaire() {
            if (this.nom === "") {
                alert("Veuillez remplir le champ Nom.");
                return;
            }

            if (this.prix === "") {
                alert("Veuillez remplir le champ Prix.");
                return;
            }

            const statusFinal = this.status === "" ? "En stock" : this.status;

            this.$emit("ajouter-produit", {
                nom: this.nom,
                description: this.description,
                prix: this.prix,
                status: statusFinal,
                image: this.image
            });

            this.resetFormulaire();
        },

        resetFormulaire() {
            this.nom = "";
            this.description = "";
            this.prix = "";
            this.status = "";
            this.image = "";
            this.$refs.inputImage.value = ""; // reset manuel car v-model ne marche pas sur type="file"
        }
    }
}
</script>

<style scoped>
.section-form {
    display: block;
    padding: 1.5rem;
}

.formulaire {
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    max-width: 480px;
    box-sizing: border-box;
}

.formulaire input[type="text"],
.formulaire input[type="number"],
.formulaire select,
.formulaire input[type="file"] {
    box-sizing: border-box;
    width: 100%;
    padding: 0.45rem 0.75rem;
    border: 1px solid #d0d0d0;
    border-radius: 8px;
    font-size: 14px;
    outline: none;
}

.formulaire input[type="file"] {
    background-color: #ffffff;
    cursor: pointer;
}

.formulaire input[type="file"]::file-selector-button {
    padding: 0.35rem 0.9rem;
    margin-right: 0.75rem;
    background-color: #1a1a1a;
    color: #ffffff;
    border: none;
    border-radius: 6px;
    font-size: 13px;
    cursor: pointer;
}

.formulaire input[type="file"]::file-selector-button:hover {
    background-color: #333;
}

.formulaire input:focus,
.formulaire select:focus {
    border-color: #888;
}

.formulaire button[type="submit"] {
    align-self: flex-start;
    padding: 0.45rem 1.1rem;
    background-color: #1a1a1a;
    color: #ffffff;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    box-sizing: border-box;
}

.formulaire button:hover {
    background-color: #333;
}
</style>