import { declarations } from "../data/declaration.js";
import { calculerCotisationTotale } from "./cotisation.service.js";


// fonction obtenir montant total cotisations
export const obtenirMontantTotal = () => {
    return declarations.reduce((total, decl) => {
        const cotisationDecl = decl.salaries.reduce((sum, ligne) => sum + calculerCotisationTotale(ligne.montant), 0);
        return total + cotisationDecl;
    }, 0);
};


// trouver l'employeur avec plus de cotisations
export const obtenirTopEmployeur = () => {
    const cotisationsParEmployeur = {};

    declarations.forEach(decl => {
        const cotisation = decl.salaries.reduce((sum, ligne) => sum + calculerCotisationTotale(ligne.montant), 0);

        if(!cotisationsParEmployeur[decl.employeurId]) {
            cotisationsParEmployeur[decl.employeurId] = 0;
        }
        cotisationsParEmployeur[decl.employeurId] += cotisation;
    });

    let topEmployeurId = null;
    let maxCotisation = 0;

    Object.entries(cotisationsParEmployeur).forEach(([id, montant]) => {
        if(montant > maxCotisation) {
            maxCotisation = montant;
            topEmployeurId = id;
        }
    });

    return { employeurId: topEmployeurId, montantTotal: maxCotisation };
};


// calculer salaire moyen
export const obtenirSalaireMoyen = () => {
    const tousSalaires = declarations.flatMap(d => d.salaries);

    if(tousSalaires.length === 0) return 0;

    const total = tousSalaires.reduce((sum, ligne) => sum + ligne.montant, 0);
    return total / tousSalaires.length;
};
