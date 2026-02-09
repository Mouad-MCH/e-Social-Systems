import { employeurs } from "../data/employeurs.js";
import { assures } from "../data/assures.js";
import { declarations } from "../data/declaration.js";


let employersEl = document.getElementById("employers")
employersEl.innerHTML = employeurs.length

let assuresEl = document.getElementById("assures")
assuresEl.innerHTML = assures.length

let declaration = document.getElementById("declarations")
declaration.innerHTML = declarations.length