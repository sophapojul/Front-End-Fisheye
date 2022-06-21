import '../../css/style.scss';
import getPhotographers from '../utils/api';
import { displayModal } from '../utils/contactForm';
import photographerFactory, {
    addElement,
    mediaFactory,
    lightboxFactory,
} from '../factories/photographer';

const main = document.querySelector('main');

const getId = () => {
    const url = new URL(window.location.href);
    const params = url.searchParams.get('id');
    return parseInt(params, 10);
};

const getPhotograph = (data) => {
    const id = getId();
    return data.find((el) => el.id === id);
};

/**
 * Get the media for the photographer with the id that matches the id of the photographer that is currently logged in.
 * @param {Object[]} data - The array of objects that we want to filter through.
 * @returns {Object} An array of objects that have a photographerId property that matches the id of the photographer.
 */
const getMedia = (data) => {
    const id = getId();
    return data.filter((obj) => obj.photographerId === id);
};

async function displayMedia(userMedia) {
    // const main = document.querySelector('main');
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
    // const main = document.querySelector('main');
    const photographHeaderModel = photographerFactory(photographer);
    const userHeaderCardDOM = photographHeaderModel.getUserHeaderDOM();
    main.appendChild(userHeaderCardDOM);
}

function displayPhotographerModal(photographer) {
    const photographerModalModel = photographerFactory(photographer);
    const photographerModalDOM = photographerModalModel.getUserModalDOM();
    document.body.appendChild(photographerModalDOM);
}

function displayLightbox() {
    const links = Array.from(document.querySelectorAll('.product a'));
    const images = [...new Set(links.map((link) => link.getAttribute('href')))];
    links.forEach((link) =>
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const lightboxModel = lightboxFactory(images);
            const lightboxDOM = lightboxModel.getLightboxDOM();
            lightboxModel.getImageDOM(e.currentTarget.getAttribute('href'));
            document.body.appendChild(lightboxDOM);
        })
    );
}

(async () => {
    const { photographers } = await getPhotographers();
    const { media } = await getPhotographers();
    const photograph = getPhotograph(photographers);
    await displayPhotographerHeader(photograph);
    await displayPhotographerModal(photograph);
    await displayMedia(getMedia(media));
    displayLightbox();
    const contactBtn = document.querySelector('.photographer_contact');
    contactBtn.addEventListener('click', displayModal);
})();
