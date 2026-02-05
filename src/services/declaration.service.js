import Declaration from "../models/Declaration.js";
import { declarations } from "../data/declaration.js";
import { generateId } from "../utils/helpers.js";


// fonction pour creer declaration
export const creerDeclaration = (employeurId, mois, salaires, dateDeclaration) => {

    // verifier si declaration existe deja
    const existe = declarations.find(d => d.employeurId === employeurId && d.month === mois);
    if(existe) {
        return { erreur: "declaration deja existante" };
    }

    const declaration = new Declaration(generateId(), employeurId, mois, salaires, dateDeclaration);
    declarations.push(declaration);
    return declaration;
};


// fonction obtenir toutes declarations
export const obtenirDeclarations = () => {
    return declarations;
};


// obtenir historique par employeur
export const obtenirHistorique = (employeurId) => {
    return declarations.filter(d => d.employeurId === employeurId);
};

// filtrer declarations par periode
export const filtrerParPeriode = (annee,mois = null) => {
    return declarations.filter(d => {
        const [a, m] = d.month.split('-');
        if(mois) {
            return a === annee && m === mois;
        }
        return a === annee;
    });
};
