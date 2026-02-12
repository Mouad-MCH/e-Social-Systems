import { createAssures, updateSalair } from "../services/assure.service.js";
import { assures } from "../data/assures.js";
import { findAssureById } from '../utils/helpers.js';

const hidden = document.querySelector(".hidden");
const ajout = document.getElementById("ajouter");
const ajouterAssuré = document.querySelector(".ajouterAssuré");
const icon = document.querySelector(".fa-solid");
const Annuler = document.querySelector(".Annuler");
const ajouter = document.querySelector(".ajot");
const modifier = document.querySelector(".modifier");
const icons = document.querySelector(".icons");
const anuul = document.querySelector(".Annul");

 const newsalair=document.getElementById("newSalaire")

let nom = document.querySelector(".Nom");
let employeu = document.querySelector(".employer");
let salair = document.querySelector(".salaire");

let id = 0;

ajout.addEventListener("click", () => {
  ajouterAssuré.style.visibility = "visible";
  hidden.style.visibility = "visible";
  nom.value = ""
  employeu.value=""
  salair.value=""
});

icon.addEventListener("click", () => {
  ajouterAssuré.style.visibility = "hidden";
  hidden.style.visibility = "hidden";
});
Annuler.addEventListener("click", () => {
  ajouterAssuré.style.visibility = "hidden";
  hidden.style.visibility = "hidden";
});

ajouter.addEventListener("click", () => {
  let input = [nom, employeu, salair];
  input.forEach((el) => {
    el.style.border = "1px solid black";
  });
  let name = nom.value;
  let emp = employeu.value;
  let salar = salair.value;

  if (name === "") {
    nom.style.border = "1px solid red";
    return;
  } else if (emp === "") {
    employeu.style.border = "1px solid red";
    return;
  } else if (salar === "") {
    salair.style.border = "1px solid red ";
    return;
  } else {
    createAssures(name, salar, emp);
    addToTable();
  }

  modal();
});

function addToTable() {
  const tbody = document.querySelector("tbody");

  tbody.innerHTML = "";

  assures.forEach((el, i) => {
    tbody.innerHTML += `

        <tr>
          <td>${el.id}</td>
          <td>${el.name}</td>
          <td>${el.employeurId}</td>
          <td>${el.salaireMensuel}</td>
       
          <td><button class="mo">Modifier le Salaire</button></td>
        </tr>
`;
  });
}

icons.addEventListener("click", () => {
  modifier.style.visibility = "hidden";
  hidden.style.visibility = "hidden";
});

anuul.addEventListener("click", (e) => {
  e.preventDefault();
  modifier.style.visibility = "hidden";
  hidden.style.visibility = "hidden";
});


// modif
function modal() {
  let mo = document.querySelectorAll(".mo");
  const Modifier = document.querySelector(".Modifier");

  let assu;

  mo.forEach((el) => {
    el.addEventListener("click", (e) => {
      
      let x = e.target.parentElement.parentElement.children[0];
      
      assu = findAssureById(Number(x.innerHTML));

      let nomAssure = document.getElementById("nomAssure");
      let oldSalaire = document.getElementById("oldSalaire");

      nomAssure.innerHTML = assu.name;
      oldSalaire.innerHTML = assu.salaireMensuel;

      modifier.style.visibility = "visible";
      hidden.style.visibility = "visible";
    });
  });


let nam = document.querySelector(".Nom").value;
let employe = document.querySelector(".employer").value;
let salairee = document.querySelector(".salaire").value;


  Modifier.addEventListener("click", (e) => {
    e.preventDefault();
    const newSalaire = document.getElementById("newSalaire").value;
   

    if (newSalaire.length == 0) return;

    updateSalair(assu.id, newSalaire);
    assu = {};
    addToTable();
    modal();
  });
  anuul.addEventListener("click",()=>{
newsalair.value=""
  })
  // ajot.addEventListener("click",()=>{
  //   nam.value=""
  // })
}
addToTable()
modal() 