import addElement from '../utils/addElement';

/**
 * It takes an id as a parameter, creates a new URL object with the photographer.html file as the path, appends the id to
 * the URL as a query string, and then opens the URL in the current window
 * @param {number} id - The id of the photographer.
 */
function openWindow(id) {
    /** @const {URL} url */
    const urlPhotograph = new URL('photographer.html', window.location.href);
    urlPhotograph.search = `?id=${id}`;
    window.open(urlPhotograph, '_self');
}

export default function photographerFactory(data) {
    const { id, name, portrait, city, country, tagline, price } = data;
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        article.classList.add('photographer');
        addElement(article, 'img', '', {
            class: 'photographer_picture',
            src: picture,
            alt: `photo représentant ${name}`,
        });
        addElement(article, 'h2', `${name}`, { class: 'photographer_name' });
        addElement(article, 'p', `${city}, ${country}`, {
            class: 'photographer_location',
        });
        addElement(article, 'q', `${tagline}`, {
            class: 'photographer_tagline',
        });
        addElement(article, 'p', `${price}€/jour`, {
            class: 'photographer_price',
        });
        const img = article.querySelector('img');
        img.addEventListener('click', () => openWindow(id));
        return article;
    }

    function getUserHeaderDOM() {
        const header = document.createElement('div');
        header.classList.add('photographer_header');
        header.setAttribute('role', 'heading');
        header.setAttribute('aria-level', '2');
        const section = addElement(header, 'section', '', {
            class: 'photographer_details',
        });
        addElement(section, 'h1', `${name}`, { class: 'photographer_name' });
        addElement(section, 'p', `${city}, ${country}`, {
            class: 'photographer_location',
        });
        addElement(section, 'q', `${tagline}`, {
            class: 'photographer_tagline',
        });
        addElement(header, 'button', 'Contactez-moi', {
            class: 'photographer_contact',
            type: 'button',
            role: 'button',
            'aria-label': 'ouvrir le formulaire de contact',
        });
        addElement(header, 'img', '', {
            class: 'photographer_picture',
            src: picture,
            alt: `photo représentant ${name}`,
        });
        return header;
    }

    function getUserModalDOM() {
        function setAttributes(element, attributes) {
            Object.keys(attributes).forEach((attr) => {
                element.setAttribute(attr, attributes[attr]);
            });
        }

        const attributes = {
            id: 'contact_modal',
            class: 'contact_modal',
            role: 'dialog',
            'aria-hidden': 'true',
            'aria-modal': 'false',
            'aria-labelledby': 'contact_modal_title',
            style: 'display: none',
        };
        const contactModal = document.createElement('div');
        setAttributes(contactModal, attributes);
        contactModal.innerHTML = `
            <div class="modal" role="document">
                <div class="modal_header" >
                    <h1 class="modal_title" id="contact_modal_title">Contactez-moi<span> ${name}</span></h1>
                    <button type="button" aria-label="fermer le formulaire de contact" class="modal_close" id="modal_close">
                        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M42 4.23L37.77 0L21 16.77L4.23 0L0 4.23L16.77 21L0 37.77L4.23 42L21 25.23L37.77 42L42 37.77L25.23 21L42 4.23Z" fill="white"></path>
                        </svg>
                    </button>
                </div>
                <form id="modal_form" class="modal_form" name="modal_form" action="" method="POST">
                    <label for="firstname" id="firstname">Prénom</label>
                    <input type="text" name="firstname" aria-labelledby="firstname">
                    <label for="lastname" id="lastname">Nom</label>
                    <input type="text" name="lastname" aria-labelledby="lastname">
                    <label for="email" id="email">Email</label>
                    <input type="email" name="email" aria-labelledby="email">
                    <label for="message" id="message">Votre message</label>
                    <textarea name="message" rows="4" aria-labelledby="message"></textarea>
                    <button class="modal_submit" type="submit" aria-label="envoyer le formulaire de contact">Envoyer</button>
                </form>
            </div>
        `;
        return contactModal;
    }

    return {
        getUserCardDOM,
        getUserHeaderDOM,
        getUserModalDOM,
    };
}
