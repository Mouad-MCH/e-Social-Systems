// taux de cotisations
const TAUX_SALARIE = 0.0448;
const TAUX_PATRONAL = 0.1601;
const PLAFOND = 6000;

// fonction calculer cotisation salariale
export const calculerCotisationSalariale = (salaire) => {
    const salaireBase = Math.min(salaire, PLAFOND);
    return salaireBase * TAUX_SALARIE;
};

// calcul cotisation patronale
export const calculerCotisationPatronale = (salaire) => {
    const salaireBase = Math.min(salaire,PLAFOND);
    return salaireBase * TAUX_PATRONAL;
};

// calcul total
export const calculerCotisationTotale = (salaire) => {
    return calculerCotisationSalariale(salaire) + calculerCotisationPatronale(salaire);
};
