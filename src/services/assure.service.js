import Assure from "../models/Assure.js";
import { assures } from "../data/assures.js";
import { generateId } from "../utils/helpers.js";
import { employeurs } from "../data/employeurs.js";


// function create new assures

export const createAssures = (name,salaireMensuel, employeurId) => {
    let assure = new Assure(generateId() , name, salaireMensuel, employeurId);

    linkEmployeurToAssure(employeurId,assure.id);

    assures.push(assure);
    return assure;
}


// function Update salair

export const updateSalair = (assureId , newSalair) => {
    let assur = assures.find(a => a.id === assureId);
    
    if(!assur) return "id invalide";
    assur.salaireMensuel = newSalair;

    return assur
}

// function link between assusre and Employeur


export const linkEmployeurToAssure = (employeurId , assureId) => {
    
    let emp = employeurs.find(e => e.id === employeurId);
    if(!emp) return "employeur not fund";

    if(!emp.assures.includes(assureId)) emp.assures.push(assureId);

    return emp
}


