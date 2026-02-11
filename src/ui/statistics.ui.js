
import { obtenirMontantTotal, obtenirTopEmployeur, obtenirSalaireMoyen } from "../services/statistics.service.js";
import { findEmployeurById } from "../utils/helpers.js";



const montent_total = document.querySelector("#montant_ttl_cotisation");
const salaire_moyeen = document.querySelector("#sal_moy_declarer");




document.addEventListener('DOMContentLoaded', () => {
    montent_total.innerHTML = obtenirMontantTotal();
    salaire_moyeen.innerHTML = obtenirSalaireMoyen();
    addOnTable()
})



const addOnTable = () => {
    const tbody = document.querySelector("tbody");

    tbody.innerHTML = '';

    let data = obtenirTopEmployeur();
    console.log("data: ", data )
    let emp = findEmployeurById(data.employeurId);
    console.log("emp: ",emp)

    tbody.innerHTML += `
                    <tr>
                        <td>${emp.id}</td>
                        <td>${emp.raisonSociale}</td>
                        <td>${emp.secteur}</td>
                        <td>${data.montantTotal} MAD</td>
                        <td>${emp.assures.length}</td>
                    </tr>
    
    `
    
}