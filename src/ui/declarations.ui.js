import { creerDeclaration, obtenirDeclarations, genererRecapitulatif } from '../services/declaration.service.js';
import { calculerTotalDeclaration } from '../services/declaration.service.js';
import { getEmployeur } from '../services/employeur.service.js';

const modal = document.querySelector(".modal");
const detailsModal = document.getElementById("detailsModal");
const detailsContent = document.getElementById("detailsContent");
const closeDetailsBtn = document.getElementById("closeDetailsBtn");
const flaux = document.querySelector(".flaux");

const main_header_btn = document.querySelector(".main_header_btn");
const annuler_btn = document.querySelector('.anule_btn');
const ajoute_btn = document.querySelector('.ajoute_btn');

const tbody = document.querySelector("tbody");
const employeurSelect = document.querySelector("#employeur");



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
                    <button class="detail" data-id="${decl.id}">Détails</button>
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

const showDetailsModal = (id) => {
    const recap = genererRecapitulatif(id);
    if(recap.erreur) {
        alert(recap.erreur);
        return;
    }
    
    const employeur = getEmployeur().find(e => e.id === recap.employeurId);
    
    detailsContent.innerHTML = `
        <div class="grid grid-cols-2 gap-4 mb-4">
            <p><strong>Employeur:</strong> ${employeur ? employeur.raisonSociale : 'N/A'}</p>
            <p><strong>Mois:</strong> ${recap.mois}</p>
            <p><strong>Date:</strong> ${recap.dateDeclaration}</p>
            <p><strong>Salariés:</strong> ${recap.nombreSalaries}</p>
        </div>
        <div class="mt-4 border-t pt-4">
            <h3 class="font-bold mb-2">Détails Salariés</h3>
            <div class="max-h-40 overflow-y-auto">
                <table class="w-full text-sm text-left">
                    <thead>
                        <tr class="bg-gray-100">
                            <th class="p-2">Salaire</th>
                            <th class="p-2">Cotisation</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${recap.detailsSalaries.map(d => `
                            <tr class="border-b">
                                <td class="p-2">${d.salaire} DH</td>
                                <td class="p-2">${d.cotisationTotale.toFixed(2)} DH</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
        <div class="mt-4 border-t pt-4 space-y-2">
            <p class="flex justify-between"><span>Cotisations:</span> <span>${recap.montantCotisations.toFixed(2)} DH</span></p>
            <p class="flex justify-between text-red-600"><span>Pénalité (${recap.joursRetard}j):</span> <span>${recap.penalite.toFixed(2)} DH</span></p>
            <p class="flex justify-between text-lg font-bold text-primary border-t pt-2"><span>Total à Payer:</span> <span>${recap.totalAPayer.toFixed(2)} DH</span></p>
        </div>
    `;

    detailsModal.classList.remove("hidden");
    flaux.classList.remove("hidden");
}

const closeDetailsModal = () => {
    detailsModal.classList.add("hidden");
    flaux.classList.add("hidden");
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

const initDeclarations = () => {
    loadEmployeurs();
    addDeclarationsToTable();

    main_header_btn.addEventListener('click', showModal);
    ajoute_btn.addEventListener('click', handleSubmit);
    annuler_btn.addEventListener('click', hideModal);

    tbody.addEventListener('click', (e) => {
        if(e.target.classList.contains('detail')) {
            const id = Number(e.target.getAttribute('data-id'));
            showDetailsModal(id);
        }
    });

    if(closeDetailsBtn) {
        closeDetailsBtn.addEventListener('click', closeDetailsModal);
    }
}

initDeclarations();
