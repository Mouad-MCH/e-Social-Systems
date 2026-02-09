import { TAUX_SALARIE, TAUX_PATRONAL, PLAFOND_COTISATION } from "../utils/constants.js";

export const calculerCotisationSalariale = (salaire) => {
    const salaireBase = Math.min(salaire, PLAFOND_COTISATION);
    return salaireBase * TAUX_SALARIE;
};

export const calculerCotisationPatronale = (salaire) => {
    const salaireBase = Math.min(salaire, PLAFOND_COTISATION);
    return salaireBase * TAUX_PATRONAL;
};

export const calculerCotisationTotale = (salaire) => {
    return calculerCotisationSalariale(salaire) + calculerCotisationPatronale(salaire);
};
