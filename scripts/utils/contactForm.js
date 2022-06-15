let modal;
modal = null;
const focusableElts = 'img, button,  input,  textarea, [tabindex]:not([tabindex="-1"])';
let focusables = [];
let previouslyFocusedElement = null
export function displayModal() {
    modal = document.getElementById('contact_modal');
    focusables = Array.from(modal.querySelectorAll(focusableElts));
    previouslyFocusedElement = document.querySelector(':focus')
    modal.style.display = 'block';
    focusables[0].focus()
    modal.removeAttribute('aria-hidden');
    modal.setAttribute('aria-modal', 'true');
    modal.addEventListener('click', closeModal);
    modal.querySelector('.modal_close').addEventListener('click', closeModal);
    modal.querySelector('.modal').addEventListener('click', (e) => e.stopPropagation());
};

export function closeModal() {
    if (!modal) return
    if (previouslyFocusedElement !== null) previouslyFocusedElement.focus()
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('aria-modal', 'false');
    modal.removeEventListener('click', closeModal);
    modal.querySelector('.modal_close').removeEventListener('click', closeModal);
    modal.querySelector('.modal').removeEventListener('click', (e) => e.stopPropagation());
    modal = null;
};
const focusInModal = (e) => {
    e.preventDefault();
    let index = focusables.findIndex(f => f === modal.querySelector(':focus'))
    if (e.shiftKey === true) {
        index--
    } else {
        index++
    }
    if (index >= focusables.length) {
        index = 0
    }
    if (index < 0) {
        index = focusables.length - 1
        console.log(index)
    }
    focusables[index].focus()
};
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal(e);
    }
    if (e.key === 'Tab' && modal) {
        focusInModal(e);
    }
});
