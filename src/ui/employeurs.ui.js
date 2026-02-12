
import { createEmployeur, getEmployeur } from '../services/employeur.service.js';
import { findAssureById } from '../utils/helpers.js';

/**----------------------\
 * DOM variables
\ ----------------------*/

const modal = document.querySelector(".modal");
const flaux = document.querySelector(".flaux")

const main_header_btn = document.querySelector(".main_header_btn");
const annuler_btn = document.querySelector('.anule_btn');
const ajoute_btn = document.querySelector('.ajoute_btn');

const tbody = document.querySelector("tbody");


/**----------------------\
 * Variables
\ ----------------------*/





/**----------------------\
 * Functions
\ ----------------------*/




export const initEmployeur = () => {

  addEmployeurToTabe()

  main_header_btn.addEventListener('click', showModal);
  
  // Event listeners setup once
  ajoute_btn.addEventListener('click', handleSubmit);
  annuler_btn.addEventListener('click', hideModal);
}


function addEmployeurToTabe() {

  tbody.innerHTML='';
  getEmployeur().forEach((el,i) => {
    tbody.innerHTML += ` 
          <tr>
              <td>${i}</td>
              <td>${el.raisonSociale}</td>
              <td>${el.secteur}</td>
              <td>${el.assures.length}</td>
              <td>
                  <button class="detail">Détails</button>
              </td>
          </tr>
    `
  })

  detail();
}

function detail(e) {
  
  tbody.querySelectorAll(".detail").forEach(el => {
    
    el.addEventListener("click", (e) => {
      let x = e.target.parentElement.parentElement.children[0];
      let emp = getEmployeur()[Number(x.innerHTML)];

      let assuerAll = emp.assures.map(el => {
        let assure = findAssureById(el);
        return `${assure.name} : ${assure.salaireMensuel} MAD`
      }).join("\n  -")

      alert(`
        id: ${emp.id}
        Raison sociale: ${emp.raisonSociale}
        Secteur: ${emp.secteur}

        Assures:
          - ${assuerAll || "Not fund"}
        `)
    })
  })
  
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
    })
}

const handleSubmit = () => {
    let social = document.querySelector("#social").value;
    let secteur = document.querySelector('#secteur').value;

    createEmployeur(social, secteur);
    addEmployeurToTabe();
    hideModal();
}

initEmployeur()