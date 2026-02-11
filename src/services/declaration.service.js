import Declaration from "../models/Declaration.js";
import { declarations } from "../data/declaration.js";
import { generateId } from "../utils/helpers.js";
import { calculerCotisationTotale, calculerCotisationSalariale, calculerCotisationPatronale } from "./cotisation.service.js";
import { calculerTotalAvecPenalite } from "./penalty.service.js";
import { validerMois, validerDate, validerSalaire } from "../utils/validators.js";

export const creerDeclaration = (employeurId, mois, salaires, dateDeclaration) => {
    if(!employeurId) {
        return { erreur: "Employeur requis" };
    }

    const validationMois = validerMois(mois);
    if(!validationMois.valide) {
        return { erreur: validationMois.erreur };
    }

    const validationDate = validerDate(dateDeclaration);
    if(!validationDate.valide) {
        return { erreur: validationDate.erreur };
    }

    if(!Array.isArray(salaires) || salaires.length === 0) {
        return { erreur: "Salaires requis" };
    }

    for(let ligne of salaires) {
        if (!ligne.assureId) {
            return { erreur: "Assuré requis pour chaque salaire" };
        }
        const validationSalaire = validerSalaire(ligne.montant);
        if(!validationSalaire.valide) {
            return { erreur: validationSalaire.erreur };
        }
    }

    const existe = declarations.find(d => d.employeurId === employeurId && d.month === mois);
    if(existe) {
        return { erreur: "declaration deja existante" };
    }

    const declaration = new Declaration(generateId(), employeurId, mois, salaires, dateDeclaration);
    declarations.push(declaration);
    return declaration;
};

export const obtenirDeclarations = () => {
    return declarations;
};

export const obtenirHistorique = (employeurId) => {
    return declarations.filter(d => d.employeurId === employeurId);
};

export const filtrerParPeriode = (annee, mois = null) => {
    return declarations.filter(d => {
        const [a, m] = d.month.split('-');
        if(mois) {
            return a === annee && m === mois;
        }
        return a === annee;
    });
};

export const calculerTotalDeclaration = (declarationId) => {
    const declaration = declarations.find(d => d.id === declarationId);
    if(!declaration) return { erreur: "Declaration introuvable" };

    const montantCotisations = declaration.salaries.reduce((sum, ligne) =>
        sum + calculerCotisationTotale(ligne.montant), 0
    );

    const resultat = calculerTotalAvecPenalite(
        montantCotisations,
        declaration.declaredAt,
        declaration.month
    );

    return {
        declarationId: declaration.id,
        employeurId: declaration.employeurId,
        mois: declaration.month,
        montantCotisations: resultat.montantBase,
        penalite: resultat.penalite,
        joursRetard: resultat.joursRetard,
        totalAPayer: resultat.total
    };
};

export const genererRecapitulatif = (declarationId) => {
    const declaration = declarations.find(d => d.id === declarationId);
    if(!declaration) return { erreur: "Declaration introuvable" };

    const detailsSalaries = declaration.salaries.map(ligne => ({
        assureId: ligne.assureId,
        salaire: ligne.montant,
        cotisationSalariale: calculerCotisationSalariale(ligne.montant),
        cotisationPatronale: calculerCotisationPatronale(ligne.montant),
        cotisationTotale: calculerCotisationTotale(ligne.montant)
    }));

    const montantTotal = detailsSalaries.reduce((sum, d) => sum + d.cotisationTotale, 0);
    const resultatPenalite = calculerTotalAvecPenalite(
        montantTotal,
        declaration.declaredAt,
        declaration.month
    );

    return {
        declarationId: declaration.id,
        employeurId: declaration.employeurId,
        mois: declaration.month,
        dateDeclaration: declaration.declaredAt,
        nombreSalaries: declaration.salaries.length,
        detailsSalaries: detailsSalaries,
        montantCotisations: montantTotal,
        penalite: resultatPenalite.penalite,
        joursRetard: resultatPenalite.joursRetard,
        totalAPayer: resultatPenalite.total
    };
};

export const obtenirTotalParEmployeur = (employeurId) => {
    const declarationsEmployeur = declarations.filter(d => d.employeurId === employeurId);

    if(declarationsEmployeur.length === 0) return 0;

    return declarationsEmployeur.reduce((total, decl) => {
        const montantCotisations = decl.salaries.reduce((sum, ligne) =>
            sum + calculerCotisationTotale(ligne.montant), 0
        );
        const resultat = calculerTotalAvecPenalite(montantCotisations, decl.declaredAt, decl.month);
        return total + resultat.total;
    }, 0);
};
