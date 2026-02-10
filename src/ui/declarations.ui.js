import { creerDeclaration, obtenirDeclarations } from '../services/declaration.service.js';
import { calculerTotalDeclaration } from '../services/declaration.service.js';
import { getEmployeur } from '../services/employeur.service.js';

const modal = document.querySelector(".modal");
const flaux = document.querySelector(".flaux");

const main_header_btn = document.querySelector(".main_header_btn");
const annuler_btn = document.querySelector('.anule_btn');
const ajoute_btn = document.querySelector('.ajoute_btn');

const tbody = document.querySelector("tbody");
const employeurSelect = document.querySelector("#employeur");

const initDeclarations = () => {
    loadEmployeurs();
    addDeclarationsToTable();

    main_header_btn.addEventListener('click', showModal);
    ajoute_btn.addEventListener('click', handleSubmit);
    annuler_btn.addEventListener('click', hideModal);
}

function loadEmployeurs() {
    getEmployeur().forEach(emp => {
        const option = document.createElement('option');
        option.value = emp.id;
        option.textContent = emp.raisonSociale;
        employeurSelect.appendChild(option);
    });
}

function addDeclarationsToTable() {
    tbody.innerHTML = '';

    obtenirDeclarations().forEach((decl, i) => {
        const employeur = getEmployeur().find(e => e.id === decl.employeurId);
        const total = calculerTotalDeclaration(decl.id);

        tbody.innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td>${employeur ? employeur.raisonSociale : 'N/A'}</td>
                <td>${decl.month}</td>
                <td>${decl.salaries.length}</td>
                <td>${total.montantCotisations ? total.montantCotisations.toFixed(2) : '0.00'} DH</td>
                <td>${total.penalite ? total.penalite.toFixed(2) : '0.00'} DH</td>
                <td>${total.totalAPayer ? total.totalAPayer.toFixed(2) : '0.00'} DH</td>
                <td>
                    <button class="detail">Détails</button>
                </td>
            </tr>
        `;
    });
}

const showModal = () => {
    modal.classList.remove("hidden");
    flaux.classList.remove("hidden");
}

const hideModal = () => {
    modal.classList.add("hidden");
    flaux.classList.add("hidden");
    modal.querySelectorAll("input").forEach((el) => {
        el.value = '';
    });
    employeurSelect.value = '';
}

const handleSubmit = () => {
    const employeurId = parseInt(employeurSelect.value);
    const mois = document.querySelector("#mois").value;
    const salairesStr = document.querySelector("#salaires").value;
    const dateDeclaration = document.querySelector("#dateDeclaration").value;

    const salaires = salairesStr.split(',').map(s => parseFloat(s.trim())).filter(s => !isNaN(s));

    if(!employeurId || !mois || salaires.length === 0 || !dateDeclaration) {
        alert("Veuillez remplir tous les champs");
        return;
    }

    const result = creerDeclaration(employeurId, mois, salaires, dateDeclaration);

    if(result.erreur) {
        alert(result.erreur);
        return;
    }

    addDeclarationsToTable();
    hideModal();
}

initDeclarations();
