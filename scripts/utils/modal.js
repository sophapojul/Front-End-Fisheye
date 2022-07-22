import photographerFactory from '../factories/photographer';
import trapFocus from './trapFocus';

let modal;
modal = null;
const focusableEls = 'img, button,  input,  textarea';
let focusable = [];
let previouslyFocusedElement = null;

/**
 * It removes the modal from the DOM, restores the focus to the previously focused element, removes the no-scroll class
 * from the body, removes the event listeners, and sets the modal variable to null
 * @returns A function that closes the modal.
 */
export function closeModal() {
    if (!modal) return;
    if (previouslyFocusedElement !== null) previouslyFocusedElement.focus();
    modal.remove();
    document.body.classList.remove('no-scroll');
    document.body.querySelectorAll('[aria-hidden="true"]').forEach((el) => {
        el.removeAttribute('aria-hidden');
    });
    modal.removeEventListener('click', closeModal);
    modal
        .querySelector('.modal_close')
        .removeEventListener('click', closeModal);
    modal
        .querySelector('.modal')
        .removeEventListener('click', (e) => e.stopPropagation());
    modal.removeEventListener('keydown', closeModalOnEscape);
    modal = null;
}

/**
 *
 * @param {KeyboardEvent} event
 */
const closeModalOnEscape = (e) => {
    if (e.key === 'Escape') {
        closeModal(e);
    }
};

/**
 * It creates a modal, adds it to the DOM, adds event listeners to the modal, and then focuses the first focusable element
 * in the modal
 * @param {Object[]} photographer - This is the photographer object that is passed to the function.
 */
export function displayModal(photographer) {
    const photographerModalModel = photographerFactory(photographer);
    const photographerModalDOM = photographerModalModel.getUserModalDOM();
    document.body.appendChild(photographerModalDOM);
    modal = document.getElementById('contact_modal');
    focusable = Array.from(modal.querySelectorAll(focusableEls));
    previouslyFocusedElement = document.querySelector(':focus');
    document.body.className = 'no-scroll';
    document.querySelector('main').setAttribute('aria-hidden', 'true');
    document.querySelector('header').setAttribute('aria-hidden', 'true');
    focusable[0].focus();
    modal.addEventListener('click', closeModal);
    modal.querySelector('.modal_close').addEventListener('click', closeModal);
    modal
        .querySelector('.modal')
        .addEventListener('click', (e) => e.stopPropagation());
    modal.addEventListener('keydown', closeModalOnEscape);
    document.querySelector('.modal_close').focus();
    trapFocus(photographerModalDOM);
    document
        .querySelector('#modal_form')
        .addEventListener('submit', function (ev) {
            ev.preventDefault();
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            console.table(data);
            closeModal();
        });
}
