import { assures } from "../data/assures.js";
import { employeurs } from "../data/employeurs.js";

// ginerate IDs


export const generateId = () => {
    return Date.now();
}


// find assure by ID

export const findAssureById = (id) => {
    return assures.find(e => e.id === id);
}


// find employeur by ID

export const findEmployeurById = (id) => {
    return employeurs.find(e => e.id === Number(id));
}