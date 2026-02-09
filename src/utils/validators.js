export const validerSalaire = (salaire) => {
    if (typeof salaire !== 'number' || salaire <= 0) {
        return { valide: false, erreur: "Salaire invalide" };
    }
    return { valide: true };
};

export const validerMois = (mois) => {
    const regex = /^\d{4}-(0[1-9]|1[0-2])$/;
    if (!regex.test(mois)) {
        return { valide: false, erreur: "Format mois invalide (YYYY-MM)" };
    }
    return { valide: true };
};

export const validerDate = (date) => {
    const d = new Date(date);
    if (isNaN(d.getTime())) {
        return { valide: false, erreur: "Date invalide" };
    }
    return { valide: true };
};

export const validerEmployeur = (raisonSociale, secteur) => {
    if (!raisonSociale || raisonSociale.trim() === '') {
        return { valide: false, erreur: "Raison sociale requise" };
    }
    if (!secteur || secteur.trim() === '') {
        return { valide: false, erreur: "Secteur requis" };
    }
    return { valide: true };
};

export const validerAssure = (name, salaireMensuel, employeurId) => {
    if (!name || name.trim() === '') {
        return { valide: false, erreur: "Nom requis" };
    }
    const salValidation = validerSalaire(salaireMensuel);
    if (!salValidation.valide) {
        return salValidation;
    }
    if (!employeurId) {
        return { valide: false, erreur: "Employeur requis" };
    }
    return { valide: true };
};
