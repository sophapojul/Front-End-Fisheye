import '../../css/style.scss';
import photographerFactory from '../factories/photographer';
import getPhotographers from '../utils/api';

async function displayData(photographers) {
    const main = document.querySelector('main');
    const ul = document.createElement('ul');
    ul.className = 'photographer_list';
    ul.setAttribute('aria-label', 'Liste des Photographes');
    ul.setAttribute('tabindex', '0');
    main.appendChild(ul);
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        ul.appendChild(userCardDOM);
    });
}

(async function init() {
    const { photographers } = await getPhotographers();
    await displayData(photographers);
})();
