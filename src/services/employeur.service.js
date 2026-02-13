import Employeur from "../models/Employeur.js";
import { employeurs } from "../data/employeurs.js";
import { generateId } from "../utils/helpers.js";


export const createEmployeur = (raisonSociale, secteur) => {
  const employeur = new Employeur(generateId(), raisonSociale, secteur);
  employeurs.push(employeur);
  return employeur;
}


export const getEmployeur = () => {
  return employeurs;
}



