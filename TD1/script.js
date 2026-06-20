document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("formulaire");

    const table = document.querySelector("#table1 tbody");
    
    var idCounter = 2; // Compteur pour l'ID

    form.addEventListener("submit", function(event) {

        event.preventDefault();

        const port = document.getElementById("Port")?.value;
        const ip = document.getElementById("IP")?.value;
        const type = document.getElementById("Type").value;
        const severity = document.getElementById("Severite").value;

        const action = document.querySelector('input[name="Action"]:checked')?.value;
        
        if(port===""){
            alert("Veuillez remplir le champ Port.");
            return;
        }

        if(ip===""){
            alert("Veuillez remplir le champ IP.");
            return;
        }

        if(action===null){
            alert("Veuillez sélectionner une action.");
            return;
        }
        

        const newRow = table.insertRow();
        newRow.insertCell().textContent = idCounter++; // Attribuer un ID unique
        newRow.insertCell().textContent = new Date().toLocaleDateString();
        newRow.insertCell().textContent = ip+":"+port;
        newRow.insertCell().textContent = type;
        newRow.insertCell().textContent = severity;
        newRow.insertCell().innerHTML = '<button type="button">Effacer</button>';

        form.reset();
    });
});

function deleteRow(button) {
    const row = button.parentNode.parentNode;
    if(row.rowIndex === 0) {
        alert("Impossible de supprimer la ligne d'en-tête.");
        return;
    }
    row.parentNode.removeChild(row);
}