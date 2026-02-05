import Employeur from "../models/Employeur.js";
import { employeurs } from "../data/employeurs.js";
import { generateId } from "../utils/helpers.js";


// function add an emplayeur 
export const createEmployeur = (raisonSociale, secteur) => {

  const employ = new Employeur(generateId(), raisonSociale, secteur);
  employeurs.push(employ);
  return employ;
}


// function get all emplayeurs

export const getEmployeur = () => {
  return employeurs;
}


//  link employeur with assure

export const linkAssureToEmployeur = (emplayeurId, assureId) => {

  const em = employeurs.find(e => e.id === emplayeurId);

  if(!em) {
    return "Employeurs not fund"
  }

  if(!em.assures.includes(assureId)) em.assures.push(assureId);
  else return "is alridy exist";
}



