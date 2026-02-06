



/**----------------------\
 * DOM variables
\ ----------------------*/

const modal = document.querySelector(".modal");
const flaux = document.querySelector(".flaux")

const main_header_btn = document.querySelector(".main_header_btn");
const annuler_btn = document.querySelector('.anule_btn');


/**----------------------\
 * Variables
\ ----------------------*/





/**----------------------\
 * Functions
\ ----------------------*/


const showModal = () => {
    modal.classList.remove("hidden");
    flaux.classList.remove("hidden");

    annuler_btn.addEventListener('click', () => {
      modal.classList.add("hidden");
      flaux.classList.add("hidden");
      modal.querySelectorAll("input").forEach((el) => {
        el.value = '';
      })
    })
    
}


main_header_btn.addEventListener('click', showModal);