

import { employeurs } from "./data/employeurs.js";
import { createEmployeur , getEmployeur, linkAssureToEmployeur} from "./services/employeur.service.js";


console.log(createEmployeur(1, "mouad", "ecommerce"));
console.log(createEmployeur(2, "adam", "ecommerce"));


linkAssureToEmployeur(1, 2)
linkAssureToEmployeur(1, 3)
linkAssureToEmployeur(1, 4)
linkAssureToEmployeur(2, 2)

console.log(linkAssureToEmployeur(4, 2)) 

console.log(getEmployeur())