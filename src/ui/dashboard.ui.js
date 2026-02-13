import './layout/sidebar.js';
import { employeurs } from "../data/employeurs.js";
import { assures } from "../data/assures.js";
import { declarations } from "../data/declaration.js";
import { obtenirMontantTotal } from "../services/statistics.service.js";
import { obtenirDeclarations } from "../services/declaration.service.js";
import { getEmployeur } from "../services/employeur.service.js";
import { calculerTotalDeclaration } from "../services/declaration.service.js";


// Remplir les cardes dans la page dashboard
const employersEl = document.getElementById("employers");
if(employersEl) employersEl.innerHTML = employeurs.length;

const assuresEl = document.getElementById("assures");
if(assuresEl) assuresEl.innerHTML = assures.length;

const declarationsEl = document.getElementById("declarations");
if(declarationsEl) declarationsEl.innerHTML = declarations.length;

const montantTotal = obtenirMontantTotal();
const cotisationsElement = document.querySelector('article:nth-child(3) .text-gray-600');
if(cotisationsElement) {
    cotisationsElement.innerHTML = `${montantTotal.toFixed(2)} DH`;
}


// Dernières déclarations (dashboard) 
const lastDeclarationsTbody = document.querySelector(".dashboard-last-declarations tbody");

if(lastDeclarationsTbody){
  const declarations = obtenirDeclarations()
    .sort((a,b) => new Date(b.declaredAt) - new Date(a.declaredAt))
    .slice(0,5);

  lastDeclarationsTbody.innerHTML = "";

  declarations.forEach(decl => {
    const emp = getEmployeur().find(e => e.id === decl.employeurId);
    const total = calculerTotalDeclaration(decl.id);

    const statut = total.penalite > 0 ? "En retard" : "À temps";
    const statutClass = total.penalite > 0 ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600";

    lastDeclarationsTbody.innerHTML += `
      <tr>
        <td>${emp ? emp.raisonSociale : "N/A"}</td>
        <td>${decl.month}</td>
        <td>${total.totalAPayer.toFixed(2)} DH</td>
        <td>
          <span class="px-2 py-1 rounded-full text-xs font-semibold ${statutClass}">
            ${statut}
          </span>
        </td>
      </tr>
    `;
  });
}



// alertes et anomalies dynamique
const alertesContainer = document.querySelector('.alertes-container');

if(alertesContainer){
    const declarations = obtenirDeclarations(); // toutes les déclarations
    alertesContainer.innerHTML = ''; // reset

    declarations.forEach(decl => {
        const total = calculerTotalDeclaration(decl.id);
        if(total.penalite > 0){
            const employeur = getEmployeur().find(e => e.id === decl.employeurId);
            const alertDiv = document.createElement('div');
            alertDiv.className = "bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded mb-2";
            alertDiv.innerHTML = `
                <p class="font-medium">Déclaration en retard</p>
                <p>${employeur ? employeur.raisonSociale : 'N/A'} - ${decl.month} (Pénalité: ${total.penalite.toFixed(2)} DH)</p>
            `;
            alertesContainer.appendChild(alertDiv);
        }
    });
}
