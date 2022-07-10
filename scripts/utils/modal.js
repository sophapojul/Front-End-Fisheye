let modal;
modal = null;
const focusableEls =
    'img, button,  input,  textarea, [tabindex]:not([tabindex="-1"])';
let focusable = [];
let previouslyFocusedElement = null;

const closeModalOnEscape = (e) => {
    if (e.key === 'Escape') {
        closeModal(e);
    }
};

// const focusInModal = (e) => {
//     e.preventDefault();
//     let index = focusable.findIndex((f) => f === modal.querySelector(':focus'));
//     if (e.shiftKey === true) {
//         index -= 1;
//     } else {
//         index += 1;
//     }
//     if (index >= focusable.length) {
//         index = 0;
//     }
//     if (index < 0) {
//         index = focusable.length - 1;
//     }
//     focusable[index].focus();
// };

export function closeModal() {
    if (!modal) return;
    if (previouslyFocusedElement !== null) previouslyFocusedElement.focus();
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('aria-modal', 'false');
    modal.removeEventListener('click', closeModal);
    modal
        .querySelector('.modal_close')
        .removeEventListener('click', closeModal);
    modal
        .querySelector('.modal')
        .removeEventListener('click', (e) => e.stopPropagation());
    // modal.removeEventListener('keydown', focusInModal);
    modal.removeEventListener('keydown', closeModalOnEscape);
    modal = null;
}

export function displayModal() {
    modal = document.getElementById('contact_modal');
    focusable = Array.from(modal.querySelectorAll(focusableEls));
    previouslyFocusedElement = document.querySelector(':focus');
    modal.style.display = 'block';
    focusable[0].focus();
    modal.removeAttribute('aria-hidden');
    modal.setAttribute('aria-modal', 'true');
    modal.addEventListener('click', closeModal);
    modal.querySelector('.modal_close').addEventListener('click', closeModal);
    modal
        .querySelector('.modal')
        .addEventListener('click', (e) => e.stopPropagation());
    // modal.addEventListener('keydown', focusInModal);
    modal.addEventListener('keydown', closeModalOnEscape);
}
