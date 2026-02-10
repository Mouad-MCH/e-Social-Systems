import { employeurs } from "../data/employeurs.js";
import { assures } from "../data/assures.js";
import { declarations } from "../data/declaration.js";
import { obtenirMontantTotal } from "../services/statistics.service.js";

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