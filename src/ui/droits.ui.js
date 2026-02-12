import { consulterDroits } from "../services/droits.service.js";
import { assures } from "../data/assures.js";
import { employeurs } from "../data/employeurs.js";

document.addEventListener('DOMContentLoaded', () => {
    const assureSelect = document.querySelector('.droits-box .select');
    const assureName = document.querySelector('.assure-card h2');
    const assureCompany = document.querySelector('.assure-card .company');
    const moisDeclaresStat = document.querySelector('.assure-card .stats .stat:nth-child(1) strong.blue');
    const joursValidationStat = document.querySelector('.assure-card .stats .stat:nth-child(2) strong.blue');
    const salaireMoyenStat = document.querySelector('.assure-card .stats .stat:nth-child(3) strong.blue');
    const cotisationsTotalesStat = document.querySelector('.assure-card .stats .stat:nth-child(4) strong.blue');

    assures.forEach(assure => {
        const option = document.createElement('option');
        option.value = assure.id;
        option.textContent = assure.name;
        assureSelect.appendChild(option);
    });

    const displayDroits = (assureId) => {
        const droits = consulterDroits(assureId);
        if (droits.erreur) {
            assureName.textContent = 'Assure non trouve';
            assureCompany.textContent = '';
            moisDeclaresStat.textContent = '0';
            joursValidationStat.textContent = '0';
            salaireMoyenStat.textContent = '0 DH';
            cotisationsTotalesStat.textContent = '0 DH';
            return;
        }

        const employeur = employeurs.find(emp => emp.id === droits.employeurId);
        assureName.textContent = droits.nom;
        assureCompany.textContent = employeur ? employeur.raisonSociale : 'N/A';
        moisDeclaresStat.textContent = droits.moisDeclares;
        joursValidationStat.textContent = droits.joursValidation;
        salaireMoyenStat.textContent = `${droits.salaireMoyen.toFixed(2)} DH`;
        cotisationsTotalesStat.textContent = `${droits.cotisationsTotales.toFixed(2)} DH`;
    };

    assureSelect.addEventListener('change', (event) => {
        displayDroits(parseInt(event.target.value));
    });

    if (assures.length > 0) {
        assureSelect.value = assures[0].id;
        displayDroits(assures[0].id);
    }
});
