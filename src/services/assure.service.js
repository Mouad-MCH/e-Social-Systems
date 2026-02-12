import Assure from "../models/Assure.js";
import { assures } from "../data/assures.js";
import { generateId } from "../utils/helpers.js";
import { employeurs } from "../data/employeurs.js";


// function create new assures

export const createAssures = (name, salaireMensuel, employeurId) => {
    // Ensure numeric types
    const salaire = Number(salaireMensuel);
    const empId = Number(employeurId);

    if (isNaN(salaire) || salaire <= 0) return { error: "Salaire invalide" };
    if (!empId) return { error: "Employeur invalide" };

    const assure = new Assure(generateId(), name, salaire, empId);

    const linkResult = linkEmployeurToAssure(empId, assure.id);
    if (linkResult.error) return linkResult;

    assures.push(assure);
    return assure;
}


export const updateSalair = (assureId, newSalair) => {
    const salaire = Number(newSalair);
    if (isNaN(salaire) || salaire <= 0) return { error: "Salaire invalide" };

    let assur = assures.find(a => a.id === assureId);
    
    if(!assur) return { error: "Assuré non trouvé" };
    assur.salaireMensuel = salaire;

    return assur;
}

// function link between assusre and Employeur


export const linkEmployeurToAssure = (employeurId, assureId) => {
    
    let emp = employeurs.find(e => e.id === employeurId);
    if(!emp) return { error: "Employeur non trouvé" };

    if(!emp.assures.includes(assureId)) emp.assures.push(assureId);

    return emp;
}


