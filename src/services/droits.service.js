import { declarations } from "../data/declaration.js";
import { assures } from "../data/assures.js";
import { calculerCotisationTotale } from "./cotisation.service.js";

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
            const cotisation = calculerCotisationTotale(assure.salaireMensuel);
            return total + cotisation;
        }, 0);
};

export const verifierEligibilite = (assureId) => {
    const moisDeclares = obtenirMoisDeclares(assureId);
    const joursValidation = moisDeclares * 26;

    return {
        eligible: joursValidation >= 54,
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
        ? declarationsAssure.reduce((sum, d) => sum + assure.salaireMensuel, 0) / declarationsAssure.length
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
