function addElement(parent, tag, text, {...attributes}) {
    const el = document.createElement(tag);
    el.innerHTML = text;
    Object.keys(attributes).forEach(key => el.setAttribute(key, attributes[key]));
    return parent.appendChild(el);
}

function openWindow(id) {
    const urlPhotograph = new URL('photographer.html', window.location.href);
    urlPhotograph.search = `?id=${id}`;
    window.open(urlPhotograph, '_self');
}

export function photographerFactory(data) {
    const {id, name, portrait, city, country, tagline, price} = data;
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        article.classList.add('photographer');
        addElement(article, 'img', '', {
            class: 'photographer_picture',
            src: picture,
            alt: `photo représentant ${name}`
        });
        addElement(article, 'h2', `${name}`, {class: 'photographer_name'});
        addElement(article, 'p', `${city}, ${country}`, {class: 'photographer_location'});
        addElement(article, 'q', `${tagline}`, {class: 'photographer_tagline'});
        addElement(article, 'p', `${price}€/jour`, {class: 'photographer_price'});
        const img = article.querySelector('img');
        img.addEventListener('click', () => openWindow(id));
        return article;
    }

    function getUserHeaderDOM() {
        const header = document.createElement('header');
        header.classList.add('photographer_header');
        const section = addElement(header, 'section', '', {class: 'photographer_details'});
        addElement(section, 'h1', `${name}`, {class: 'photographer_name'});
        addElement(section, 'p', `${city}, ${country}`, {class: 'photographer_location'});
        addElement(section, 'q', `${tagline}`, {class: 'photographer_tagline'});
        addElement(header, 'button', 'Contactez-moi', {
            class: 'photographer_contact',
            ariaLabel: 'ouvrir le formulaire de contact',
            ariaLabelledby: 'contact_modal'
        });
        addElement(header, 'img', '', {class: 'photographer_picture', src: picture, alt: `photo représentant ${name}`});
        return header;
    }

    function getUserModalDOM() {
        function setAttributes(element, attributes) {
            Object.keys(attributes).forEach(attr => {
                element.setAttribute(attr, attributes[attr]);
            });
        }

        const attributes = {
            id: 'contact_modal',
            class: 'contact_modal',
            role: 'dialog',
            ariaHidden: 'true',
            ariaModal: 'false',
            ariaLabelledby: 'contact_modal_title',
            style: 'display: none'
        };
        const contact_modal = document.createElement('div');
        setAttributes(contact_modal, attributes);
        const modal = addElement(contact_modal, 'div', '', {class: 'modal', role: 'document'});
        const header = addElement(modal, 'header', '', {class: 'modal_header'});
        addElement(header, 'h2', 'Contactez-moi', {class: 'modal_title', id: 'contact_modal_title'});
        addElement(header, 'input', '', {
            class: 'modal_close',
            id: 'modal_close',
            type: 'image',
            src: 'assets/icons/close.svg',
            height: '42px',
            width: '42px',
            alt: 'croix',
            ariaLabel: 'fermer la fenêtre modale',
            role: 'button',
            tabIndex: '0'
        });
        const form = addElement(modal, 'form', '', {id: 'modal_form', class: 'modal_form', name: 'modal_form'});
        addElement(form, 'p', `${name}`, {class: 'modal_name'});
        addElement(form, 'label', 'Prénom', {for: 'firstname'});
        addElement(form, 'input', '', {type: 'text', id: 'firstname', name: 'firstname'});
        addElement(form, 'label', 'Nom', {for: 'lastname'});
        addElement(form, 'input', '', {type: 'text', id: 'lastname', name: 'lastname'});
        addElement(form, 'label', 'Email', {for: 'email'});
        addElement(form, 'input', '', {type: 'email', id: 'email', name: 'email' });
        addElement(form, 'label', 'Votre message', {for: 'message'});
        addElement(form, 'textarea', '', {id: 'message', name: 'message', rows: '10', cols: '70'});
        addElement(form, 'button', 'Envoyer', {class: 'modal_submit', type: 'submit'});
        return contact_modal;
    }
        return {getUserCardDOM, getUserHeaderDOM, getUserModalDOM};
    }