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
        const modal = addElement(contactModal, 'div', '', {
            class: 'modal',
            role: 'document',
        });
        const header = addElement(modal, 'div', '', {
            class: 'modal_header',
            role: 'heading',
            'aria-level': '2',
        });
        addElement(header, 'h2', 'Contactez-moi', {
            class: 'modal_title',
            id: 'contact_modal_title',
        });
        const btn = addElement(header, 'button', '', {
            type: 'button',
            'aria-label': 'fermer le formulaire de contact',
            class: 'modal_close',
            id: 'modal_close',
        });
        btn.innerHTML = `
        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M42 4.23L37.77 0L21 16.77L4.23 0L0 4.23L16.77 21L0 37.77L4.23 42L21 25.23L37.77 42L42 37.77L25.23 21L42 4.23Z" fill="white"/>
        </svg>
        `;
        // addElement(
        //     header,
        //     'svg',
        //     `<path d="M42 4.23L37.77 0L21 16.77L4.23 0L0 4.23L16.77 21L0 37.77L4.23 42L21 25.23L37.77 42L42 37.77L25.23 21L42 4.23Z" fill="white"/>`,
        //     {
        //         width: '42',
        //         height: '42',
        //         'aria-hidden': 'true',
        //         viewBox: '0 0 42 42',
        //         fill: 'white',
        //         xmlns: 'http://www.w3.org/2000/svg',
        //     }
        // );
        const form = addElement(modal, 'form', '', {
            id: 'modal_form',
            class: 'modal_form',
            name: 'modal_form',
        });
        addElement(form, 'p', `${name}`, { class: 'modal_name' });
        addElement(form, 'label', 'Prénom', { for: 'firstname' });
        addElement(form, 'input', '', {
            type: 'text',
            id: 'firstname',
            name: 'firstname',
        });
        addElement(form, 'label', 'Nom', { for: 'lastname' });
        addElement(form, 'input', '', {
            type: 'text',
            id: 'lastname',
            name: 'lastname',
        });
        addElement(form, 'label', 'Email', { for: 'email' });
        addElement(form, 'input', '', {
            type: 'email',
            id: 'email',
            name: 'email',
        });
        addElement(form, 'label', 'Votre message', { for: 'message' });
        addElement(form, 'textarea', '', {
            id: 'message',
            name: 'message',
            rows: '10',
            cols: '70',
        });
        addElement(form, 'button', 'Envoyer', {
            class: 'modal_submit',
            type: 'submit',
            'aria-label': 'envoyer le formulaire de contact',
        });
        return contactModal;
    }

    return {
        getUserCardDOM,
        getUserHeaderDOM,
        getUserModalDOM,
    };
}
