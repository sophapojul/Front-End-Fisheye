import '../../css/style.scss';
import getPhotographers from "../utils/api";
import {displayModal} from '../utils/contactForm';
import {photographerFactory} from '../factories/photographer';

const getPhotograph = (data) => {
    const url = new URL(window.location.href);
    const params = url.searchParams.get('id');
    const id = parseInt(params, 10);
    return data.find((el) => el.id === id);
};
async function displayPhotographerHeader(photographer) {
    const main = document.querySelector('main');
    const photographHeaderModel = photographerFactory(photographer);
    const userHeaderCardDOM = photographHeaderModel.getUserHeaderDOM();
    main.appendChild(userHeaderCardDOM);
}
function displayPhotographerModal(photographer) {
    const photographerModalModel = photographerFactory(photographer)
    const photographerModalDOM = photographerModalModel.getUserModalDOM();
    document.body.appendChild(photographerModalDOM);
}
( async () => {
    const { photographers } = await getPhotographers();
    const photograph = getPhotograph(photographers);
    await displayPhotographerHeader(photograph);
    await displayPhotographerModal(photograph);
    const contactBtn =document.querySelector('.photographer_contact');
    contactBtn.addEventListener('click', displayModal);
} )()