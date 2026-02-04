

export default class Declaration {
  constructor(id, employeurId, month, salaries, declaredAt) {
    this.id = id;
    this.employeurId = employeurId;
    this.salaries = salaries;
    this.month = month;
    this.declaredAt = declaredAt;
  }
}