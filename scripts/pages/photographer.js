import '../../css/style.scss';
import getPhotographers from '../utils/api';
import { displayModal } from '../utils/contactForm';
import photographerFactory, {
    addElement,
    mediaFactory,
} from '../factories/photographer';

const getId = () => {
    const url = new URL(window.location.href);
    const params = url.searchParams.get('id');
    return parseInt(params, 10);
};

const getPhotograph = (data) => {
    const id = getId();
    return data.find((el) => el.id === id);
};

const getMedia = (data) => {
    const id = getId();
    return data.filter((obj) => obj.photographerId === id);
};

async function displayMedia(userMedia) {
    const main = document.querySelector('main');
    const mainSection = addElement(main, 'section', '', {
        class: 'photographer_media',
    });
    userMedia.forEach((media) => {
        const mediaModel = mediaFactory(media);
        const mediaDOM = mediaModel.getUserMediaDOM();
        mainSection.appendChild(mediaDOM);
    });
}

async function displayPhotographerHeader(photographer) {
    const main = document.querySelector('main');
    const photographHeaderModel = photographerFactory(photographer);
    const userHeaderCardDOM = photographHeaderModel.getUserHeaderDOM();
    main.appendChild(userHeaderCardDOM);
}

function displayPhotographerModal(photographer) {
    const photographerModalModel = photographerFactory(photographer);
    const photographerModalDOM = photographerModalModel.getUserModalDOM();
    document.body.appendChild(photographerModalDOM);
}

(async () => {
    const { photographers } = await getPhotographers();
    const { media } = await getPhotographers();
    const photograph = getPhotograph(photographers);
    await displayPhotographerHeader(photograph);
    await displayPhotographerModal(photograph);
    await displayMedia(getMedia(media));
    const contactBtn = document.querySelector('.photographer_contact');
    contactBtn.addEventListener('click', displayModal);
})();
