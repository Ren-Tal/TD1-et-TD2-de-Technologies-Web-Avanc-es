<template>
  <nav>
    <h1>Gestionnaire de Stock</h1>
    <br /><br />
    <input type="search" placeholder="Rechercher un produit... " v-model="recherche" /><br /><br />
    <select v-model="filtreStatus">
      <option value="">Filtrer par statut</option>
      <option value="En stock">En stock</option>
      <option value="Épuisé">Épuisé</option>
    </select>
    <input
      type="number"
      placeholder="Prix minimum"
      v-model="prixMin"
      min="0"
      max="1000"
      step="10"
    />
    <input
      type="number"
      placeholder="Prix maximum"
      v-model="prixMax"
      min="0"
      max="1000"
      step="10"
    />
  </nav>

  <section class="produits">
    <Produit
      v-for="produit in produitsFiltres"
      :key="produit.id"
      :id="produit.id"
      :nom="produit.nom"
      :description="produit.description"
      :prix="produit.prix"
      :status="produit.status"
      :image="produit.image"
    />
  </section>

  <p v-if="produitsFiltres.length === 0" class="aucun-resultat">
    Aucun produit ne correspond à votre recherche.
  </p>

  <Form @ajouter-produit="ajouterProduit" />
</template>

<script>
import Produit from './components/Produits.vue'
import Form from './components/Form.vue'

export default {
  name: 'App',
  components: {
    Produit,
    Form,
  },
  data() {
    return {
      produits: [
        {
          id: 1,
          nom: 'Clavier Mecanique',
          description: 'clavier mecanique bon etat',
          prix: 49.99,
          status: 'En stock',
          image: '/clavier.jpg',
        },
        {
          id: 2,
          nom: 'Souris',
          description: 'souris bon etat',
          prix: 29.99,
          status: 'En stock',
          image: '/souris.jpg',
        },
      ],
      nextId: 2,

      recherche: '',
      filtreStatus: '',
      prixMin: '',
      prixMax: '',
    }
  },
  computed: {
    produitsFiltres() {
      const terme = this.recherche.toLowerCase()
      const min = this.prixMin === '' ? 0 : parseFloat(this.prixMin)
      const max = this.prixMax === '' ? Infinity : parseFloat(this.prixMax)

      return this.produits.filter((produit) => {
        const correspondNom = produit.nom.toLowerCase().includes(terme)
        const correspondStatus = this.filtreStatus === '' || produit.status === this.filtreStatus
        const correspondPrix = produit.prix >= min && produit.prix <= max

        return correspondNom && correspondStatus && correspondPrix
      })
    },
  },
  methods: {
    ajouterProduit(nouveauProduit) {
      this.nextId++
      this.produits.push({
        id: this.nextId,
        ...nouveauProduit,
      })
    },
  },
}
</script>

<style scoped>
nav {
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

nav h1 {
  font-size: 20px;
  font-weight: 500;
  white-space: nowrap;
}

nav input[type='search'] {
  flex: 1;
  min-width: 180px;
  max-width: 320px;
  padding: 0.4rem 0.75rem;
  border: 1px solid #d0d0d0;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
}

nav select,
nav input[type='number'] {
  padding: 0.4rem 0.75rem;
  border: 1px solid #d0d0d0;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  background-color: #ffffff;
}

nav select {
  cursor: pointer;
}

nav input[type='number'] {
  width: 130px;
}

nav input[type='search']:focus,
nav select:focus,
nav input[type='number']:focus {
  border-color: #888;
}

.produits {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  flex-wrap: wrap;
}

.aucun-resultat {
  text-align: center;
  color: #666;
  padding: 1rem 1.5rem;
  font-size: 14px;
}
</style>
