

export default class Employeur {
  constructor(id , raisonSociale, secteur) {
    this.id = id;
    this.raisonSociale  = raisonSociale ;
    this.secteur = secteur;
    this.assures = [];
  }
}