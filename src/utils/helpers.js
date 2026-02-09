import { assures } from "../data/assures.js";


// ginerate IDs


export const generateId = () => {
    return Date.now();
}


// find assure by ID

export const findAssureById = (id) => {
    return assures.find(e => e.id === id);
}