import { declarations } from "../data/declaration.js";
import { assures } from "../data/assures.js";
import { calculerCotisationTotale } from "./cotisation.service.js";
import { JOURS_VALIDATION_PAR_MOIS, JOURS_MIN_ELIGIBILITE } from "../utils/constants.js";

export const obtenirMoisDeclares = (assureId) => {
    let moisDeclares = 0;
    declarations.forEach(declaration => {
        if (declaration.salaries.some(s => s.assureId === assureId)) {
            moisDeclares++;
        }
    });
    return moisDeclares;
};

export const obtenirCotisationsTotales = (assureId) => {
    let totalCotisations = 0;
    declarations.forEach(declaration => {
        declaration.salaries.forEach(salaire => {
            if (salaire.assureId === assureId) {
                totalCotisations += calculerCotisationTotale(salaire.montant);
            }
        });
    });
    return totalCotisations;
};

export const verifierEligibilite = (assureId) => {
    const moisDeclares = obtenirMoisDeclares(assureId);
    const joursValidation = moisDeclares * JOURS_VALIDATION_PAR_MOIS;

    return {
        eligible: joursValidation >= JOURS_MIN_ELIGIBILITE,
        joursValidation: joursValidation
    };
};

export const consulterDroits = (assureId) => {
    const assure = assures.find(a => a.id === assureId);
    if(!assure) return { erreur: "Assure non trouve" };

    const moisDeclares = obtenirMoisDeclares(assureId);
    const cotisationsTotales = obtenirCotisationsTotales(assureId);
    const eligibilite = verifierEligibilite(assureId);

    let totalSalaires = 0;
    let declarationsCount = 0;
    declarations.forEach(declaration => {
        declaration.salaries.forEach(salaire => {
            if (salaire.assureId === assureId) {
                totalSalaires += salaire.montant;
                declarationsCount++;
            }
        });
    });

    const salaireMoyen = declarationsCount > 0 ? totalSalaires / declarationsCount : assure.salaireMensuel;

    return {
        assureId: assure.id,
        nom: assure.name,
        employeurId: assure.employeurId,
        moisDeclares: moisDeclares,
        joursValidation: eligibilite.joursValidation,
        cotisationsTotales: cotisationsTotales,
        salaireMoyen: salaireMoyen,
        eligible: eligibilite.eligible
    };
};
