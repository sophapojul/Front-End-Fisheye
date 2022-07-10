import '../../css/style.scss';
import getPhotographers from '../utils/api';
import { displayModal, closeModal } from '../utils/modal';
import photographerFactory from '../factories/photographer';
import mediaFactory from '../factories/media';
import {
    sortMediaByPopularity,
    sortMediaByTitle,
    sortMediaByDate,
} from '../utils/dropdownMenu';
import lightboxFactory from '../factories/lightbox';
import dropdownFactory from '../factories/dropdown';
import { likesFactory, incrementLike } from '../factories/likes';
import trapFocus from '../utils/trapFocus';

const main = document.querySelector('main');

/**
 * It gets the id from the url
 * @returns {Number} The id of the current url
 */
const getId = () => {
    const url = new URL(window.location.href);
    const params = url.searchParams.get('id');
    return parseInt(params, 10);
};

/**
 * Return the photograph object from the data array that has the same id as the id in the URL.
 * @param {Object[]} data - the array of objects that we want to search through
 * @returns {Object} the element that has the same id as the id that is being passed in.
 */
const getPhotograph = (data) => {
    const id = getId();
    return data.find((el) => el.id === id);
};

/**
 * It takes an array of media objects, creates a media model for each one, and then appends the DOM element for each media
 * model to the DOM
 * @param {Object[]} userMedia - an array of media objects
 */
async function displayMedia(userMedia) {
    const section = document.createElement('div');
    section.className = 'photographer_media';
    main.appendChild(section);
    userMedia.forEach((media) => {
        const mediaModel = mediaFactory(media);
        const mediaDOM = mediaModel.getUserMediaDOM();
        section.appendChild(mediaDOM);
    });
}

/**
 * It takes a photographer object, creates a photographerFactory object, and then uses the photographerFactory object to
 * create a userHeaderCardDOM object
 * @param {Object} photographer - This is the photographer object that we are going to use to create the photographer header.
 */
async function displayPhotographerHeader(photographer) {
    const photographHeaderModel = photographerFactory(photographer);
    const userHeaderCardDOM = photographHeaderModel.getUserHeaderDOM();
    main.appendChild(userHeaderCardDOM);
}

/**
 * It takes a photographer object, creates a photographer model, gets the photographer modal DOM from the photographer
 * model, and appends the photographer modal DOM to the body.
 * @param {Object} photographer - The photographer object that was clicked on.
 */
function displayPhotographerModal(photographer) {
    const photographerModalModel = photographerFactory(photographer);
    const photographerModalDOM = photographerModalModel.getUserModalDOM();
    document.body.appendChild(photographerModalDOM);
    document.querySelector('.modal_close').focus();
    trapFocus(photographerModalDOM);
    document.querySelector('.modal_submit').addEventListener('click', (ev) => {
        ev.preventDefault();
        closeModal();
    });
}

/**
 * It takes all the links in the page, gets the unique images from them, and then adds an event listener to each link that
 * creates a lightbox model, gets the lightbox DOM from the model, gets the image DOM from the model, and then appends the
 * lightbox DOM to the body
 */
function displayLightbox() {
    const links = Array.from(document.querySelectorAll('.product a'));
    // get unique images
    const images = Array.from(
        new Set(links.map((link) => link.getAttribute('href')))
    );
    links.forEach((link) =>
        link.addEventListener('click', (ev) => {
            ev.preventDefault();
            const lightboxModel = lightboxFactory(images);
            const lightboxDOM = lightboxModel.getLightboxDOM();
            lightboxModel.getImageDOM(ev.currentTarget.getAttribute('href'));
            document.body.appendChild(lightboxDOM);
            document.querySelector('.lightbox_close').focus();
            trapFocus(lightboxDOM);
        })
    );
}

/**
 * It sorts the media by the selected value in the dropdown menu
 * @param {Object[]} media - the array of media to sort
 * @returns {Object[]} the sorted media.
 */
function sortMedia(media) {
    const selectedValue = document.querySelector('.option-current').textContent;
    // selectForm.sort_by[selectForm.sort_by.selectedIndex].value;
    switch (selectedValue) {
        case 'Popularité':
            return sortMediaByPopularity(media);
        case 'Titre':
            return sortMediaByTitle(media);
        case 'Date':
            return sortMediaByDate(media);
        default:
            return media;
    }
}

/**
 * Get the media for the photographer with the id that matches the id of the photographer that is currently logged in.
 * @param {Object[]} data - The array of objects that we want to filter through.
 * @param {Number} data[].photographerId - The id of the photographer that we want to get the media for.
 * @returns {Object} An array of objects that have a photographerId property that matches the id of the photographer.
 */
const getMedia = (data) => {
    const id = getId();
    return data.filter((el) => el.photographerId === id);
};

/**
 * It takes in a data object, gets the id of the photographer, gets the media of the photographer, adds up the likes of the
 * media, gets the price of the photographer, creates a likes model, gets the likes DOM, and appends it to the main element
 * @param {Object} data - The data object that was passed to the function.
 * @property {Object[]} data.photographers[] - The array of photographers.
 * @property {Number} id - The id of the photographer.
 * @property {Object[]} data.media[] - The array of media.
 * @property {Number} likes - The array of likes.
 */
function displayLikes(data) {
    const { photographers, media } = data;
    const { id } = getPhotograph(photographers);
    let likes = 0;
    getMedia(media).forEach((obj) => {
        likes += obj.likes;
    });
    const { price } = photographers.find((el) => el.id === id);
    const likesModel = likesFactory(likes, price);
    const likesDOM = likesModel.getLikesDOM();
    main.appendChild(likesDOM);
    const likesCount = document.querySelector('.likes_count');
    document.querySelectorAll('.product-heart').forEach((el) => {
        el.addEventListener(
            'click',
            (ev) => {
                ev.preventDefault();
                incrementLike(el.previousElementSibling);
                incrementLike(likesCount);
            },
            { once: true }
        );
    });
}

/**
 * If the value of the option is the same as the text content of the option, then add the class
 * 'dropdown-menu_selected-option-hidden' to the option
 * @param el - the element that we want to hide
 */
function hideSelectedOption(el) {
    const selectedValue = el.textContent;
    if (el.value === selectedValue) {
        el.classList.add('dropdown-menu_selected-option-hidden');
        // el.className = 'dropdown-menu_selected-option-hidden';
    } else {
        el.classList.remove('dropdown-menu_selected-option-hidden');
    }
}

/**
 * It displays a dropdown menu, and when an option is selected, it sorts the media and displays it
 * @param {Object[]} media - an array of objects that contain the media information
 */
async function displayDropdownMenu(media) {
    const dropdownModel = dropdownFactory();
    const dropdownDOM = dropdownModel.getDropdownDOM();
    main.appendChild(dropdownDOM);
    // const selected = document.querySelector('.dropdown-menu_filter-selected');
    const options = document.querySelectorAll('.combo-option');
    await displayMedia(sortMedia(media));
    document
        .querySelector('#combo1')
        .addEventListener('click', dropdownModel.openDropdown);
    // add event listener to each option to sort the media when it is clicked
    options.forEach((option) => {
        option.addEventListener('click', () => {
            options.forEach((el) => {
                el.classList.remove('option-current');
                el.removeAttribute('aria-selected');
            });
            hideSelectedOption(option);
            const comboInput = document.querySelector('.combo-input');
            comboInput.textContent = option.textContent;
            comboInput.setAttribute('aria-selected', 'true');
            comboInput.setAttribute('aria-label', option.textContent);
            option.classList.add('option-current');
            option.setAttribute('aria-selected', 'true');
            // remove all the media from the DOM
            document.querySelector('.photographer_media').remove();
            // display the media that was sorted
            const sortedMedia = sortMedia(media);
            displayMedia(sortedMedia);
        });
    });
}

(async () => {
    const { photographers, media } = await getPhotographers();
    const photograph = getPhotograph(photographers);
    await displayPhotographerHeader(photograph);
    await displayPhotographerModal(photograph);
    await displayDropdownMenu(getMedia(media));
    displayLightbox();
    displayLikes({ photographers, media });
    const contactBtn = document.querySelector('.photographer_contact');
    contactBtn.addEventListener('click', displayModal);
})();
