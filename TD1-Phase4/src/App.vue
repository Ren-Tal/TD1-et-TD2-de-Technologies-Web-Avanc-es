<template>
  <header>
    <img v-bind:src="lapin" width="100" height="100"/>
    <h1>Serveur Sécurité - Monitoring</h1>
  </header>
    <h1>Alertes de sécurité</h1>
    <table border="1" id="table1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Adresse IP source</th>
          <th>Type d'alerte</th>
          <th>Niveau de Sévérité</th>
          <th>Button</th>
        </tr>
      </thead>
      <tbody>
          <tr v-for="alertes in alertes" :key="alertes.id">
            <td>{{ alertes.id }}</td>
            <td>{{ alertes.date }}</td>
            <td>{{ alertes.adresse }}</td>
            <td>{{ alertes.type }}</td>
            <td>{{ alertes.severite }}</td>
            <td><button type="button" @click='deleteRow(alertes.id)'>Effacer</button></td>
          </tr>
      </tbody>       
    </table>
    <h1>Ajouter une règle</h1>
    <form id="formulaire">
      <label for="Port">Port:</label>
      <input type="number" id="Port" name="Port" class="zonetext"/><br><br/>
      <label for="IP">IP Source:</label>
      <input type="text" id="IP" name="IP" class="zonetext"/><br><br/>
      <label for="Type">Type:</label>
      <select id="Type" name="type">
        <option value="Intrusion">Intrusion</option>
        <option value="DDoS">DDoS</option>
        <option value="Malware">Malware</option>
        <option value="scan">Scan de ports</option>
      </select><br><br/>
      <label for="Severite">Sévérité:</label>
      <select id="Severite" name="Severite">
        <option value="Faible">Faible</option>
        <option value="Moyen">Moyen</option>
        <option value="Élevé">Élevé</option>
      </select><br><br/>
      <label for="Action">Action:</label>
        <div>
          <label for="authorize">Autoriser<input type="radio" id="authorize" name="Action" value="authorize"/></label><br><br/>
          <label for="block">Bloquer<input type="radio" id="block" name="Action" value="block"/></label>
        </div><br><br/>
      <button type="submit" @click='submitForm'>Ajouter</button>
    </form>
    <h1>Veille Sécurité</h1>
    <article>
      <h2>Nouvelle faille détectée</h2>
      <p>Une vulnérabilité critique a été identifiée sur certainis serveurs web.</p>
      <a href="https://nolimitpets.org/?gad_source=1&gad_campaignid=23353814081&gbraid=0AAAAA-gKzGV-SaqeoUCjLlyX-GrAuKqRa&gclid=Cj0KCQjwh-HPBhCIARIsAC0p3cfd0v6g3WR6718i29SdWr6U7sHaGq_xpYKSAXx5gMCd7njmQ2xDaRAaAvHBEALw_wcB">Plus d'informations</a>
    </article>
    <article>
      <h2>Mise à jour de Sécurité</h2>
      <p>Un correctif important est disponible pour les systemes Linux.</p>
      <a href="https://nolimitpets.org/?gad_source=1&gad_campaignid=23353814081&gbraid=0AAAAA-gKzGV-SaqeoUCjLlyX-GrAuKqRa&gclid=Cj0KCQjwh-HPBhCIARIsAC0p3cfd0v6g3WR6718i29SdWr6U7sHaGq_xpYKSAXx5gMCd7njmQ2xDaRAaAvHBEALw_wcB">Plus d'informations</a>
    </article>
</template>

<script>
import lapin from './assets/lapin.jpg';

export default {
  name: 'App',
  data(){
    return {
      lapin,
      idCounter: 2,
      alertes: [  
          { id: 1, date: '2024-06-01', adresse: '192.168.1.100', type: 'Intrusion', severite: 'Élevé' },
        ],
    }
  },
  methods: {
    ajouterAlerte(formData) {
      this.alertes.push({
        id: this.idCounter++,
        date: new Date().toLocaleDateString(),
        adresse: `${formData.ip}:${formData.port}`,
        type: formData.type,
        severite: formData.severite,
      })
    },
    submitForm(event) {
      event.preventDefault();
      const formData = {
        ip: document.getElementById('IP').value,
        port: document.getElementById('Port').value,
        type: document.getElementById('Type').value,
        severite: document.getElementById('Severite').value,
      }
      this.ajouterAlerte(formData);
    },
    deleteRow(id) {
      this.alertes = this.alertes.filter(alerte => alerte.id !== id );
    },
  }
}
</script>

<style scoped>
header {
    display: flex;
    align-items: center;
    gap: 20px;

    background-color: #207792ba;
    color: white;

    border-radius: 10px;
    padding: 10px;
}

header img {    
    width: 60px;
    height: 60px;
    border-radius: 5px;
}

body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #48566672;
}

h1 {
    color: #333;
    font-size: 24px;
}

h2 {
    color: #555;
    font-size: 20px;
}

h3 {
    color: #777;
    font-size: 18px;
}   

table {
    width: 100%;
    border-collapse: collapse; /* bordures propres */
    margin: 20px 0;
}

th {
    background-color: #334155;
    color: white;
    padding: 10px;
}

td {
    padding: 10px;
    border: 1px solid #ccc;
}

/* lignes alternées */
tr:nth-child(even) {
    background-color: #f2f2f2;
}

form {
    background: white;
    padding: 20px;
    margin: 20px 0;
    border-radius: 10px;
}

label {
    display: block; 
    margin-top: 10px;
}

input.zonetext, select {
    width: 90%; 
    padding: 8px;
    margin-top: 5px;
}

input[type="radio"] {
    padding: 50px;
}

button {
    margin-top: 15px;
    padding: 10px;
    background-color: #2563eb;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
}

button:hover {
    background-color: #1d4ed8;
}

article {
    background: white;
    padding: 15px;
    margin: 15px 0;
    border-left: 5px solid #2563eb;
    border-radius: 5px;
}

article h2 {
    margin-top: 0;
}

article a {
    color: #2563eb;
    text-decoration: none;
}

article a:hover {
    text-decoration: underline;
}
</style>
