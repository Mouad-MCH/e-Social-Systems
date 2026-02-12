import { JOUR_ECHEANCE, TAUX_PENALITE_BASE, TAUX_PENALITE_MAX } from "../utils/constants.js";

export const calculerJoursRetard = (dateDeclaration, mois) => {
    const [annee, moisNum] = mois.split('-');
    const dateEcheance = new Date(annee, moisNum - 1, JOUR_ECHEANCE);
    const dateDecl = new Date(dateDeclaration);

    const diff = dateDecl - dateEcheance;
    const jours = Math.floor(diff / (1000 * 60 * 60 * 24));

    return jours > 0 ? jours : 0;
};

export const calculerPenalite = (montantCotisation, joursRetard) => {
    if(joursRetard <= 0) return 0;

    const moisRetard = Math.ceil(joursRetard / 30);
    const tauxPenalite = Math.min(moisRetard * TAUX_PENALITE_BASE, TAUX_PENALITE_MAX);

    return montantCotisation * tauxPenalite;
};

export const calculerTotalAvecPenalite = (montantCotisation, dateDeclaration, mois) => {
    const joursRetard = calculerJoursRetard(dateDeclaration, mois);
    const penalite = calculerPenalite(montantCotisation, joursRetard);

    return {
        montantBase: montantCotisation,
        penalite: penalite,
        total: montantCotisation + penalite,
        joursRetard: joursRetard
    };
};
