import '../../css/style.scss';
import photographerFactory from '../factories/photographer';
import getPhotographers from '../utils/api';

/**
 * It creates a list of photographers and appends it to the main element
 * @param {Object[]} photographers - an array of objects containing the data of each photographer
 */
async function displayData(photographers) {
    const main = document.querySelector('main');
    const ul = document.createElement('ul');
    ul.className = 'photographer_list';
    ul.setAttribute('aria-label', 'Liste des Photographes');
    // ul.setAttribute('tabindex', '0');
    main.appendChild(ul);
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        ul.appendChild(userCardDOM);
    });
}

/* It's an IIFE (Immediately Invoked Function Expression) */
(async function init() {
    const { photographers } = await getPhotographers();
    await displayData(photographers);
})();
