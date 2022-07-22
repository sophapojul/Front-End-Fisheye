import '../../css/style.scss';
import getPhotographers from '../utils/api';
import { displayModal } from '../utils/modal';
import photographerFactory from '../factories/photographer';
import mediaFactory from '../factories/media';
import {
    sortMediaByPopularity,
    sortMediaByTitle,
    sortMediaByDate,
} from '../utils/dropdownSort';
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
    const section = document.createElement('section');
    section.className = 'photographer_media';
    section.setAttribute('aria-label', 'Media');
    // section.setAttribute('role', 'region');
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
 * It creates a lightbox model, gets the lightbox DOM, gets the image DOM, appends the lightbox DOM to the body, adds a
 * class to the body to prevent scrolling, adds the inert attribute to all elements except the lightbox DOM, and traps
 * focus within the lightbox DOM
 * @param {PointerEvent | KeyboardEvent} ev - the event object
 * @param {String[]} img - array of images to display in the lightbox
 */
function lightboxOpen(ev, img) {
    ev.preventDefault();
    const lightboxModel = lightboxFactory(img);
    const lightboxDOM = lightboxModel.getLightboxDOM();
    lightboxModel.getImageDOM(ev.currentTarget.getAttribute('src'));
    document.body.appendChild(lightboxDOM);
    document.body.className = 'no-scroll';
    Array.from(document.body.children)
        .filter((el) => el !== lightboxDOM)
        .forEach((el) => el.setAttribute('inert', 'true'));
    // main.setAttribute('aria-hidden', 'true');
    document.querySelector('.lightbox_container>figure').focus();
    trapFocus(lightboxDOM);
}

/**
 * It takes all the links in the page, gets the unique images from them, and then adds an event listener to each link that
 * creates a lightbox model, gets the lightbox DOM from the model, gets the image DOM from the model, and then appends the
 * lightbox DOM to the body
 */
function displayLightbox() {
    const imgList = Array.from(
        document.querySelectorAll('.product>*:not(figcaption)')
    );
    // get unique images
    const images = Array.from(
        new Set(imgList.map((link) => link.getAttribute('src')))
    );
    imgList.forEach((link) => {
        link.addEventListener('click', (ev) => lightboxOpen(ev, images));
        link.addEventListener('keydown', (ev) => {
            if (ev.key === 'Enter' || ev.key === ' ') {
                lightboxOpen(ev, images);
            }
        });
    });
}

/**
 * It sorts the media by the selected value in the dropdown menu
 * @param {Object[]} media - the array of media to sort
 * @returns {Object[]} the sorted media.
 */
function sortMedia(media) {
    const selectedValue = document.querySelector(
        '[aria-selected="true"]'
    ).textContent;
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
 * It takes an event and a number of likes, and then increments the number of likes by one
 * @param {PointerEvent|KeyboardEvent} ev - the event object
 * @param {HTMLSpanElement} likes - span element which contains the number of likes the post has
 */
function displayIncrementLike(ev, likes) {
    ev.preventDefault();
    const likesCount = document.querySelector('.likes_count');
    incrementLike(likes);
    incrementLike(likesCount);
}

/**
 * It takes in the data from the API, gets the photographer's id, gets the media for that photographer, gets the likes for
 * each media, gets the price for that photographer, creates a likes model, gets the likes DOM, appends the likes DOM to
 * the main element, and adds an event listener to each heart icon that increments the likes and sets the aria-label
 * attribute to the number of likes
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
    document.querySelectorAll('.product-heart').forEach((el) => {
        el.addEventListener(
            'click',
            (ev) => {
                const productLikes =
                    ev.target.parentElement.parentElement.firstElementChild;
                displayIncrementLike(ev, productLikes);
                el.setAttribute(
                    'aria-label',
                    `${productLikes.textContent} likes`
                );
            },
            { once: true }
        );
        el.addEventListener('keydown', (ev) => {
            if (ev.key === 'Enter' || ev.key === ' ') {
                const productLikes = ev.target.parentElement.firstElementChild;
                displayIncrementLike(ev, productLikes);
                el.setAttribute(
                    'aria-label',
                    `${productLikes.textContent} likes`
                );
            }
        });
    });
}

/**
 * It creates a dropdown menu, adds it to the DOM, adds event listeners to the dropdown menu, and then displays the media
 * @param {Object[]} media - an array of objects that contain the media information
 */
async function displayDropdownMenu(media) {
    const dropdownModel = dropdownFactory();
    const dropdownDOM = dropdownModel.getDropdownDOM();
    main.appendChild(dropdownDOM);
    const comboInput = document.querySelector('.combo-input');
    const options = document.querySelectorAll('.combo-option');
    comboInput.addEventListener('keydown', dropdownModel.onKeyDown);
    comboInput.addEventListener('click', dropdownModel.openDropdown);
    const observer = new MutationObserver(() => {
        document.querySelector('.photographer_media').remove();
        const sortedMedia = sortMedia(media);
        displayMedia(sortedMedia);
    });
    observer.observe(comboInput, {
        attributes: true,
        attributeFilter: ['aria-activedescendant'],
    });
    await displayMedia(sortMedia(media));
    options.forEach((option) => {
        option.addEventListener('click', (ev) =>
            dropdownModel.onClick(ev.target)
        );
        option.addEventListener('keydown', (ev) =>
            dropdownModel.onKeyDown(ev.target)
        );
    });
}

/* An immediately invoked function expression. */
(async () => {
    const { photographers, media } = await getPhotographers();
    const photograph = getPhotograph(photographers);
    await displayPhotographerHeader(photograph);
    await displayDropdownMenu(getMedia(media));
    displayLightbox();
    displayLikes({ photographers, media });
    document.querySelector('header>a').addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter' || ev.key === ' ') {
            ev.preventDefault();
            window.location.href = '/';
        }
    });
    const contactBtn = document.querySelector('.photographer_contact');
    contactBtn.addEventListener('click', () => displayModal(photograph));
})();
