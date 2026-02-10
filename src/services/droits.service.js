import { declarations } from "../data/declaration.js";
import { assures } from "../data/assures.js";
import { calculerCotisationTotale } from "./cotisation.service.js";
import { JOURS_VALIDATION_PAR_MOIS, JOURS_MIN_ELIGIBILITE } from "../utils/constants.js";

export const obtenirMoisDeclares = (assureId) => {
    const assure = assures.find(a => a.id === assureId);
    if(!assure) return 0;

    return declarations.filter(d =>
        d.employeurId === assure.employeurId &&
        d.salaries.length > 0
    ).length;
};

export const obtenirCotisationsTotales = (assureId) => {
    const assure = assures.find(a => a.id === assureId);
    if(!assure) return 0;

    return declarations
        .filter(d => d.employeurId === assure.employeurId)
        .reduce((total, decl) => {
            const cotisationDeclaration = decl.salaries.reduce((sum, salaire) =>
                sum + calculerCotisationTotale(salaire), 0
            );
            return total + cotisationDeclaration;
        }, 0);
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
    if(!assure) return { erreur: "Assuré introuvable" };

    const moisDeclares = obtenirMoisDeclares(assureId);
    const cotisationsTotales = obtenirCotisationsTotales(assureId);
    const eligibilite = verifierEligibilite(assureId);

    const declarationsAssure = declarations.filter(d => d.employeurId === assure.employeurId);
    const salaireMoyen = declarationsAssure.length > 0
        ? declarationsAssure.reduce((sum, d) => {
            const totalSalaires = d.salaries.reduce((s, sal) => s + sal, 0);
            return sum + totalSalaires;
        }, 0) / (declarationsAssure.reduce((count, d) => count + d.salaries.length, 0))
        : assure.salaireMensuel;

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
