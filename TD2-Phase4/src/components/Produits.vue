<template>
    <article>
        <h3>{{ nom }}</h3>
        <p>{{ description }}</p>
        <p>Prix: {{ prix }} €</p>
        <p :class="status === 'En stock' ? 'statut-stock' : 'statut-epuise'">status: {{ status }}</p>
        <img :src="image" alt="Image du produit" width="200" height="150">
    </article>
</template>

<script>
export default {
    name: "Produit",
    props: {
        id: { type: [Number, String], required: true },
        nom: { type: String, required: true },
        description: { type: String, required: true },
        prix: { type: [Number, String], required: true },
        status: { type: String, required: true },
        image: { type: String, default: "" }
    }
}
</script>

<style scoped>
article {
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    height: 400px;
    width: 280px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
}
article h3 {
    font-size: 15px;
    font-weight: 500;
}

article p:nth-of-type(1) {
    font-size: 13px;
    color: #666;
}

article p:nth-of-type(2) {
    font-size: 15px;
    font-weight: 500;
    color: #1a1a1a;
}

article img {
    width: 100%;
    flex: 1;
    min-height: 0;
    object-fit: cover;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
    margin-top: 4px;
}

.statut-stock {
    display: inline-block;
    font-size: 12px;
    padding: 3px 10px;
    border-radius: 6px;
    background-color: #eaf3de;
    color: #3b6d11;
    align-self: flex-start;
}

.statut-epuise {
    display: inline-block;
    font-size: 12px;
    padding: 3px 10px;
    border-radius: 6px;
    background-color: #fbe1e1;
    color: #a32626;
    align-self: flex-start;
}
</style>